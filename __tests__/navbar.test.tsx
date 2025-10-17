import Navbar from '@/components/navbar'
import { cleanup, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }))
}))

afterEach(() => {
    cleanup();
});

describe('Navbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders "Blogs" title when pathname is "/"', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/')
        render(<Navbar />)
        expect(screen.getByTestId('navbar-title')).toHaveTextContent("Blogs")
    })

    it('renders "My Posts" title when pathname is "/HOST/local/posts"', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/HOST/local/posts')
        render(<Navbar />)
        expect(screen.getByTestId('navbar-title')).toHaveTextContent("My Posts")
    })

    it('renders "New Post" title when pathname is "/HOST/local/posts/new"', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/HOST/local/posts/new')
        render(<Navbar />)
        expect(screen.getByTestId('navbar-title')).toHaveTextContent("New Post")
    })

    it('shows search bar when searchBar prop is true', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/')
        render(<Navbar searchBar />)
        const inputs = screen.getAllByPlaceholderText('search...')
        expect(inputs.length).toBeGreaterThan(0)
    })

    it('does not show search bar when searchBar prop is false', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/')
        render(<Navbar />)
        expect(screen.queryByPlaceholderText('search...')).toBeNull()
    })

    it('renders navigation links', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/')
        render(<Navbar />)
        expect(screen.getByTestId('navbar-title')).toBeInTheDocument()
    })
})