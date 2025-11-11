import { render, screen, fireEvent } from '@testing-library/react'
import MealModal from '@/components/modals/meal-modal'

describe('MealModal Component', () => {
  describe('Form Input and Submission', () => {
    it('accepts user input in form fields', () => {
      render(
        <MealModal
          open={true}
          mode="add"
          onClose={() => {}}
          onSubmit={() => {}}
        />
      )
      
      // Fill in form fields
      const nameInput = screen.getByPlaceholderText(/enter food name/i) as HTMLInputElement
      const ratingInput = screen.getByPlaceholderText(/food rating/i) as HTMLInputElement
      const imageInput = screen.getByPlaceholderText(/food image url/i) as HTMLInputElement
      const restaurantInput = screen.getByPlaceholderText(/restaurant name/i) as HTMLInputElement
      const logoInput = screen.getByPlaceholderText(/restaurant logo url/i) as HTMLInputElement
      
      fireEvent.change(nameInput, { target: { value: 'Pizza' } })
      fireEvent.change(ratingInput, { target: { value: '4.5' } })
      fireEvent.change(imageInput, { target: { value: 'https://example.com/pizza.jpg' } })
      fireEvent.change(restaurantInput, { target: { value: 'Pizza Palace' } })
      fireEvent.change(logoInput, { target: { value: 'https://example.com/logo.jpg' } })
      
      // Verify inputs were updated
      expect(nameInput.value).toBe('Pizza')
      expect(ratingInput.value).toBe('4.5')
      expect(imageInput.value).toBe('https://example.com/pizza.jpg')
      expect(restaurantInput.value).toBe('Pizza Palace')
      expect(logoInput.value).toBe('https://example.com/logo.jpg')
    })
  })
})
