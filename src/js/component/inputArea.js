import { useCallback, useState } from 'react';
import { emitCustomEvent } from 'react-custom-events';

import { TextField, Button } from '@mui/material';

import PropTypes from "prop-types";
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { useTodoContext } from 'js/context/todoContext';
import { todoFetchURL } from 'js/utils';

const InputArea = ({
    id = "todo-detail",
    errorText = "Task details should not be empty",
    successMessage = "Todo Added Successfully..!"
}) => {
    const { setTodoList } = useTodoContext();
    const [helperText, setHelperText] = useState("");

    const handleFocus = useCallback(() => {
        setHelperText(() => "");
    }, []);

    const clearInput = useCallback(() => {
        document.getElementById(id).value = '';
    }, [id]);

    const handleAddTodo = useCallback(async (value) => {
        const todo = {
            name: value,
            isCompleted: false,
            todoId: uuid()
        };
        await axios.post(todoFetchURL, todo);
        setTodoList((prev) => [
            ...prev,
            todo
        ]);
        emitCustomEvent("show-alert", {
            message: successMessage
        });
        clearInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const emptyTextHandling = useCallback(() => {
        emitCustomEvent("show-alert", {
            message: errorText,
            severity: "warning"
        });
        setHelperText(() => errorText);
    }, [errorText]);

    const handleKeyPress = useCallback((event) => {
        if (helperText !== ""){
            setHelperText(() => "");
        }
        if (event.key === 'Enter'){
            const { value } = event.target;
            if (value === ""){
                return emptyTextHandling();
            }
            handleAddTodo(value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleButtonPress = useCallback(() => {
        const { value = '' } = document.getElementById(id);
        if (value === ""){
            return emptyTextHandling();
        }
        handleAddTodo(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTextField = () => (
        <TextField
            id={id}
            label='Enter Your Task To-Do'
            size='small'
            margin='normal'
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            color='info'
            focused
            fullWidth
            autoFocus
            error={helperText !== ""}
            helperText={helperText}
        />
    );

    return (
        <>
            {renderTextField()}
            <Button
                className='add-button'
                onClick={handleButtonPress}
                size='small'
                variant='contained'
                color='primary'
            >
                {'Add'}
            </Button>
        </>
    );
};

InputArea.propTypes = {
    errorText: PropTypes.string
};

export default InputArea;