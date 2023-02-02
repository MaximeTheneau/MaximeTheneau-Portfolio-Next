import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home categories={undefined} experiences={undefined} accueil={undefined} />)

    const heading = screen.getByRole('heading', {
      name: "Theneau Maxime",
    })

    expect(heading).toBeInTheDocument()
  })
})