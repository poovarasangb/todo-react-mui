import { useCallback, useEffect, useState, lazy, Suspense, ReactElement } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import axios from "axios";

import { TodoContext } from './context/todoContext';
import { todoFetchURL } from "./utils";

const CountDetails = lazy(() => import("./component/countDetails"));
const TodoListing = lazy(() => import("./component/todoListing"));
const InputArea = lazy(() => import("./component/inputArea"));
const AlertMessage = lazy(() => import("./component/alerts"));

export const App = () : ReactElement => {
    const [todoList, setTodoList] = useState([]);

    const fetchList = useCallback(async () => {
        const { data } = await axios.get(todoFetchURL);
        setTodoList(() => data);
    }, []);

    useEffect(() => {
        fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const context = {
        todoList,
        setTodoList
    };

    return (
        <Container className='container' fixed>
            <Box className="todo-box">
                <TodoContext.Provider value={context}>
                    <Suspense fallback={null}>
                        <InputArea />
                    </Suspense>
                    <Suspense fallback={null}>
                        <CountDetails />
                    </Suspense>
                    <Suspense fallback={null}>
                        <TodoListing />
                    </Suspense>
                    <Suspense fallback={null}>
                        <AlertMessage />
                    </Suspense>
                </TodoContext.Provider>
            </Box>
        </Container>
    );
}