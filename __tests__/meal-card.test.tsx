import { render, screen, fireEvent } from '@testing-library/react'
import MealCard from '@/components/cards/meal-card'

describe('MealCard Component', () => {
  describe('Component Rendering', () => {
    it('renders food name, price, and rating correctly', () => {
      render(
        <MealCard
          title="Vanilla Cupcake"
          price="1.99"
          status="Open Now"
          rating={4.5}
        />
      )

      // Verify food name is displayed
      expect(screen.getByText('Vanilla Cupcake')).toBeInTheDocument()

      // Verify price is displayed (component adds $ prefix)
      expect(screen.getByText('$1.99')).toBeInTheDocument()

      // Verify rating is displayed
      expect(screen.getByText('4.5')).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('triggers delete callback when delete button is clicked', async () => {
      const mockDelete = vi.fn()

      const { container } = render(
        <MealCard
          title="Test Food"
          price="5.00"
          status="Closed"
          rating={3}
          onDelete={mockDelete}
        />
      )

      // Open the menu using querySelector
      const menuButton = container.querySelector('[data-test-id="food-menu-btn"]') as HTMLButtonElement
      expect(menuButton).toBeTruthy()
      fireEvent.click(menuButton)
      
      // Click delete button using querySelector
      const deleteButton = container.querySelector('[data-test-id="food-delete-btn"]') as HTMLButtonElement
      expect(deleteButton).toBeTruthy()
      fireEvent.click(deleteButton)

      // Verify delete callback was called
      expect(mockDelete).toHaveBeenCalledTimes(1)
    })
  })
})
