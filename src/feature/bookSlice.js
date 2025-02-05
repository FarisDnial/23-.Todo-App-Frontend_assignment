import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: [],
    reducers: {
        // Add a new book
        addBook: (state, action) => {
            state.push(action.payload); // Directly mutating the state (Redux Toolkit allows this)
        },
        // Delete a book (you can implement your logic here)
        deleteBook: (state, action) => {
            return state.filter((book) => book.id !== action.payload.id);
        },
        // Update an existing book
        updateBook: (state, action) => {
            const index = state.findIndex((book) => book.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload }; // Update the book in place
            }
        },
    },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
