import { useCallback } from "react";

import { emitCustomEvent } from "react-custom-events";
import axios from "axios";

import { DeleteForever } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useTodoContext } from "js/context/todoContext";

const DeleteAction = ({
    deleted,
    todoFetchURL
}) => {
    const { todoList, setTodoList } = useTodoContext();

    const handleTodoDelete = useCallback(async (event) => {
        event.stopPropagation();
        const { id } = deleted;
        setTodoList((prev) => prev.filter((_todo) => _todo.todoId !== id));
        await axios.delete(`${todoFetchURL}/${id}`);
        emitCustomEvent("show-alert", {
            message: "Todo Deleted Successfully..!",
            severity: "error"
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleted, todoList]);

    return (
        <Tooltip
            title="Delete"
            placement="right"
            arrow
        >
            <DeleteForever
                className='actionItems'
                onClick={handleTodoDelete}
            />
        </Tooltip>
    );

};

export default DeleteAction;