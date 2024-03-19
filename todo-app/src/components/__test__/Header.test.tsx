import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'
import Header from "../Header"
import { render } from "@testing-library/react"

describe('Header Test cases', () => {


    // rendering the component
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });


    it("Render Header Component", () => {
        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Show All')).toBeInTheDocument();
        expect(getByText('Search')).toBeInTheDocument();
        expect(getByText('Sort')).toBeInTheDocument();
        expect(getByText('Filter')).toBeInTheDocument();

    })
})