import { useCallback, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { useTodoContext } from "js/context/todoContext";
import { differenceBet2Arrays, todoFetchURL, todoHeader } from "js/utils";
import axios from "axios";


const sortData = function (prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        }
        if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
};

const formatDate = (date) => {
    if (date && date !== null){
        const _date = new Date(date);
        return `${_date.getDate() }/${ _date.getMonth() + 1 }/${ _date.getFullYear()}`;
    }
    return "--";
};

const ListView = ({
    type
}) => {
    const { todoList, setTodoList } = useTodoContext();
    const [loading, setLoading] = useState(true);
    const [todoRows, setTodoRows] = useState(() => ({
        rows: [],
        selectionModel: []
    }));

    const generateTodo = useCallback((list) => list.map(
        ({dueDate, ...rest}, index ) => ({
            index: index + 1,
            dueDate: formatDate(dueDate),
            ...rest
        })),
    []);

    useEffect(() => {
        let list = todoList;
        let selectionModel = [];
        if (type === "pending"){
            list = todoList.filter(({isCompleted}) => !isCompleted);
        } else {
            const completedList = todoList.filter(({isCompleted}) => isCompleted);
            selectionModel = completedList.map(({todoId}) => todoId);
            if (type === "all") {
                list = todoList.sort(sortData("dueDate")).sort(sortData("isCompleted"));
            } else {
                list = completedList;
            }
        }
        setTodoRows(() => ({
            rows: generateTodo(list),
            selectionModel
        }));
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoList, type]);

    const handleCellEditing = useCallback(async (editedRow, event) => {
        const { value } = event.target;
        const newArr = [...todoList];
        if (value === ""){
            setTodoList(() => newArr);
            return;
        }
        const index = newArr.findIndex((_todo) => _todo.todoId === editedRow.id);
        newArr[index].name = value;
        setTodoList(() => newArr);
        await axios.put(`${todoFetchURL}/${editedRow.id}`, {
            ...todoList[index]
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoList]);

    const handleSelectionModelChange = useCallback(async (newSelectionModel) => {
        const changedTodo = differenceBet2Arrays(todoRows.selectionModel, newSelectionModel);
        changedTodo.forEach(async (_changed) => {
            const updatedTodo = todoList.find((_todo) => _todo.todoId === _changed);
            updatedTodo.isCompleted = !updatedTodo.isCompleted;
            await axios.put(`${todoFetchURL}/${_changed}`, updatedTodo);
        });
        setTodoRows((prev) => ({
            ...prev,
            selectionModel: newSelectionModel
        }));
        const newArr = [...todoList];
        setTodoList(() => newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoList, todoRows.selectionModel]);

    const getRowID = useCallback((row) => row.todoId, []);
    return (
        <>
            <DataGrid
                slots={{
                    loadingOverlay: LinearProgress
                }}
                loading={loading}
                className="todo-app-lists"
                rows={todoRows.rows}
                columns={todoHeader}
                getRowId={getRowID}
                checkboxSelection
                onCellEditStop={handleCellEditing}
                rowSelectionModel={todoRows.selectionModel}
                onRowSelectionModelChange={handleSelectionModelChange}
            />
        </>
    );

};

export default ListView;