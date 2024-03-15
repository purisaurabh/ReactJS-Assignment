import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import AddTodoForm from "../AddTodoForm"


describe("test cases", () => {
    it('renders without crashing', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm addTodo={mockAddTodo} />);
    });

    it('renders input field and button', () => {
        const mockAddTodo = jest.fn();
        const { getByPlaceholderText, getByText } = render(<AddTodoForm addTodo={mockAddTodo} />);
        fireEvent.change(getByPlaceholderText('what is in your mind'), { target: { value: 'do testing' } });
        fireEvent.click(getByText('Add Todo'));
        expect(mockAddTodo).toHaveBeenCalledWith('do testing');
    });

    it('clears input after addTodo', () => {
        const mockAddTodo = jest.fn();
        const { getByText, getByPlaceholderText } = render(<AddTodoForm addTodo={mockAddTodo} />);

        fireEvent.change(getByPlaceholderText('what is in your mind'), { target: { value: 'New Todo' } });
        fireEvent.click(getByText('Add Todo'));

        expect(getByPlaceholderText('what is in your mind').value).toBe('');
    });


    it("render the add button", () => {
        const mockAddTodo = jest.fn();
        const { getByText } = render(<AddTodoForm addTodo={mockAddTodo} />);
        expect(getByText('Add Todo')).toBeInTheDocument();
    })

}) 