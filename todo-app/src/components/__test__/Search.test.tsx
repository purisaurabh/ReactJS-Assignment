import { fireEvent, getByText, render } from "@testing-library/react"
import Search from "../Search"
import "@testing-library/jest-dom"

// jest.mock('../customHooks/useFetch', () => () => {
//     [
//         { id: 1, title: 'Test Todo', completed: false },
//         { id: 2, title: 'Test Todo 2', completed: true },

//     ]
// })

describe("Search Component Test Case ", () => {
    it("Render Search Component", () => {
        render(<Search />)
    })

    // input testing
    it("Render input field", () => {
        const { getByPlaceholderText } = render(<Search />)
        expect(getByPlaceholderText('enter value to search..')).toBeInTheDocument();
    });

    //render search button
    it("render search  button", () => {
        const { getByText } = render(<Search />)
        expect(getByText('Search')).toBeInTheDocument();
    })

    // update the search
    const { getByPlaceholderText } = render(<Search />)
    const inputValue = getByPlaceholderText('enter value to search..') as HTMLInputElement
    fireEvent.change(inputValue, { target: { value: 'Test Todo' } })
    expect(inputValue.value).toBe('Test Todo')

    // get the filtered data
    // it("get the  filtered data", () => {
    //     const { getByPlaceholderText, getByText } = render(<Search />)
    //     const inputValue = getByPlaceholderText('enter value to search..') as HTMLInputElement
    //     const searchBtn = getByText("Search")

    //     fireEvent.change(inputValue, { target: { value: 'Test Todo' } })
    //     fireEvent.click(searchBtn)
    //     expect(getByText('Test Todo')).toBeInTheDocument();

    // })
})