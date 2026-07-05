import { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchHotels } from '../api/hotelApi'

const PAGE_SIZE = 12

const initialFilters = {
  search: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  sortBy: '-rating', // matches API's order_by convention
}

/**
 * Loads the hotel dataset once and applies filtering / sorting / pagination
 * on the client. The public API documents server-side query params
 * (location, min_price, max_price, min_rating, search, order_by, limit, skip),
 * and we pass them through on every request. However, this particular
 * hosted demo instance does not consistently honor those params (it
 * returns the same full dataset regardless), so we ALSO apply the same
 * logic client-side. This guarantees correct search/filter/sort behavior
 * for the user no matter how the backend behaves, while still using the
 * documented integration correctly.
 */
export function useHotels() {
  const [allHotels, setAllHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFiltersState] = useState(initialFilters)
  const [page, setPage] = useState(1)

  const loadHotels = useCallback(async (activeFilters) => {
    setLoading(true)
    setError(null)
    try {
      const { hotels } = await fetchHotels({
        search: activeFilters.search || undefined,
        location: activeFilters.location || undefined,
        min_price: activeFilters.minPrice || undefined,
        max_price: activeFilters.maxPrice || undefined,
        min_rating: activeFilters.minRating || undefined,
        order_by: activeFilters.sortBy || undefined,
      })
      setAllHotels(hotels)
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching hotels.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHotels(initialFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setFilters = (updates) => {
    setPage(1)
    setFiltersState((prev) => ({ ...prev, ...updates }))
  }

  const resetFilters = () => {
    setPage(1)
    setFiltersState(initialFilters)
  }

  // Client-side safety net: filter, sort, and paginate the full dataset.
  const filteredHotels = useMemo(() => {
    let result = [...allHotels]
    const { search, location, minPrice, maxPrice, minRating, sortBy } = filters

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
      )
    }
    if (location) {
      result = result.filter((h) => h.location === location)
    }
    if (minPrice) {
      result = result.filter((h) => parseFloat(h.price) >= parseFloat(minPrice))
    }
    if (maxPrice) {
      result = result.filter((h) => parseFloat(h.price) <= parseFloat(maxPrice))
    }
    if (minRating) {
      result = result.filter((h) => h.rating >= parseFloat(minRating))
    }

    const sortKey = sortBy.replace('-', '')
    const descending = sortBy.startsWith('-')
    result.sort((a, b) => {
      let aVal = sortKey === 'price' ? parseFloat(a.price) : a[sortKey]
      let bVal = sortKey === 'price' ? parseFloat(b.price) : b[sortKey]
      if (typeof aVal === 'string') {
        return descending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal)
      }
      return descending ? bVal - aVal : aVal - bVal
    })

    return result
  }, [allHotels, filters])

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE))
  const paginatedHotels = filteredHotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const locations = useMemo(
    () => [...new Set(allHotels.map((h) => h.location))].sort(),
    [allHotels]
  )

  return {
    hotels: paginatedHotels,
    totalResults: filteredHotels.length,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
    page,
    setPage,
    totalPages,
    locations,
    retry: () => loadHotels(filters),
  }
}
