import Home from "@/app/page"
import { render, screen, waitFor } from "@testing-library/react"

jest.spyOn(console, 'log').mockImplementation(() => {});

jest.mock('@/components/navbar', () => () => <div>Mock Navbar</div>)

global.fetch = jest.fn()

describe('Home Component', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear()
    })

    it('shows loading text before data is fetched', () => {
        render(<Home/>)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('calls fetch once on mount', () => {
        render(<Home/>)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('/HOST')
    })

    it('renders blog cards when data is fetched', async () => {
        const mockBlogs = [
            { userId: 1, title: 'Post 1', body: 'This is a sample post' },
            { userId: 2, title: 'Post 2', body: 'Another blog body with more than fifty characters to test truncation logic' }
        ]

        ;(fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockBlogs)
        })

        render(<Home />)

        // Wait for blogs to render
        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument()
            expect(screen.getByText('Post 2')).toBeInTheDocument()
        })
    })

    it('truncates blog body longer than 50 chars', async () => {
        const longBlog = [{
            userId: 1,
            title: 'Long Blog',
            body: 'A'.repeat(60)
        }]
        ;(fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(longBlog)
        })

        render(<Home />)

        await waitFor(() => {
            expect(screen.getByText(/A{50}\.\.\./)).toBeInTheDocument()
        })
    })
})