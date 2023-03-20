import { createContext, useContext } from "react";

const TodoContext = createContext({});

const useTodoContext = () => useContext(TodoContext);

export {
    TodoContext,
    useTodoContext
};