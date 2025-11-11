import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFoodStore } from '@/store/food'

const mockFoodData = [
  {
    id: '1',
    food_name: 'Vanilla Cupcake',
    price: '$1.99',
    food_rating: 5,
    restaurant_status: 'Open Now',
    restaurant_name: 'Sweet Bakery',
  },
  {
    id: '2',
    food_name: 'Chocolate Cake',
    price: '$3.50',
    food_rating: 4.8,
    restaurant_status: 'Closed',
    restaurant_name: 'Cake House',
  },
]

describe('API Mocking - Food Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { setState } = useFoodStore as any
    setState({ items: [], loading: false, error: null, query: '' })
    vi.restoreAllMocks()
  })

  describe('Successful Data Fetch', () => {
    it('fetches and displays food items successfully', async () => {
      // Mock successful API response
      vi.stubGlobal('fetch', vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => mockFoodData,
      })) as any)

      // Trigger fetch
      await useFoodStore.getState().fetch()
      
      // Verify items are loaded
      const state = useFoodStore.getState()
      expect(state.items.length).toBeGreaterThan(0)
      expect(state.loading).toBe(false)
      expect(state.error).toBeNull()
      
      // Verify first item data
      const firstItem = state.items[0] as any
      expect(firstItem.food_name || firstItem.name).toBe('Vanilla Cupcake')
    })
  })

  describe('Error Handling', () => {
    it('handles failed API request and shows error message', async () => {
      // Mock failed API response
      vi.stubGlobal('fetch', vi.fn(async () => ({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      })) as any)

      // Trigger fetch
      await useFoodStore.getState().fetch()
      
      // Verify error state
      const state = useFoodStore.getState()
      expect(state.error).toBeTruthy()
      expect(state.error).toContain('Internal Server Error')
      expect(state.loading).toBe(false)
      expect(state.items).toEqual([])
    })
  })
})
