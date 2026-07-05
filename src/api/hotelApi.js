const BASE_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/'

/**
 * Builds a query string from a params object, skipping empty/undefined values.
 */
function buildQuery(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, value)
    }
  })
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

/**
 * Fetches hotels from the API with optional filters.
 * Supported params: location, price, min_price, max_price, rating,
 * min_rating, max_rating, search, limit, skip, order_by
 */
export async function fetchHotels(params = {}) {
  const url = `${BASE_URL}${buildQuery(params)}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  const json = await res.json()
  return {
    hotels: json.data ?? [],
    count: json.count ?? 0,
    returned: json.returned ?? 0,
  }
}

/**
 * Fetches a single hotel by id.
 */
export async function fetchHotelById(id) {
  const res = await fetch(`${BASE_URL}${id}/`)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}
