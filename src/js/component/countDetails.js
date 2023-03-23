import { useState, useEffect } from "react";
import {Link } from "@mui/material";

import { useTodoContext } from "js/context/todoContext";

const Counter = ({count, name}) => (
    <Link className='todo-count'>
        {`${name } : ${count}`}
    </Link>
);

const CountDetails = () => {
    const [count, setCount] = useState({
        all: 0,
        pending: 0,
        completed: 0
    });
    const { todoList } = useTodoContext();
    useEffect(() => {
        const all = todoList.length;
        const completed = todoList.filter((_todo) => _todo.isCompleted).length;
        setCount((prev) => ({
            ...prev,
            all,
            completed,
            pending: all - completed
        }));
    }, [todoList]);

    return (
        <div className='count-details'>
            <Counter name="All" count={count.all} />
            <Counter name="Pending" count={count.pending} />
            <Counter name="Completed" count={count.completed} />
        </div>
    );
};

export default CountDetails;