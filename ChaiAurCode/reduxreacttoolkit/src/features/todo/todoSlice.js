import { createSlice, nanoid } from "@reduxjs/toolkit";

const intialState = {
  todos: [{ id: "1", text: "First Todo" }],
};

// function sayHello() {
//   console.log("Hello Redux Toolkit");
// }
export const todoSlice = createSlice({
  name: "todos",
  initialState: intialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },

  // PROPERTIES OR FUNCTION AATE H YAHAN (reducers)
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
