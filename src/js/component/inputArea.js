import { useCallback, useRef, useState } from 'react';
import { emitCustomEvent } from 'react-custom-events';

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Button, Tooltip } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';

import PropTypes from "prop-types";
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { useTodoContext } from 'js/context/todoContext';
import { todoFetchURL } from 'js/utils';

const CalendarIcon = ({
    setCalOpenStatus
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCalIconClick = useCallback(() => setCalOpenStatus((prev) => !prev), []);
    return (
        <Tooltip
            title="Due date"
            placement="bottom"
            arrow
        >
            <CalendarMonth
                onClick={handleCalIconClick}
                color="primary"
            />
        </Tooltip>
    );

};

const InputArea = ({
    id = "todo-detail",
    errorText = "Task details should not be empty",
    successMessage = "Todo Added Successfully..!"
}) => {
    const dueDate = useRef();
    const { setTodoList } = useTodoContext();
    const [helperText, setHelperText] = useState("");
    const [openCal, setCalOpenStatus] = useState(false);

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
            todoId: uuid(),
            dueDate: dueDate.current || null
        };
        setTodoList((prev) => [
            ...prev,
            todo
        ]);
        await axios.post(todoFetchURL, todo);
        emitCustomEvent("show-alert", {
            message: successMessage
        });
        clearInput();
        dueDate.current = null;
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
    }, [helperText]);

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
            InputProps={{endAdornment: <CalendarIcon setCalOpenStatus={setCalOpenStatus} />}}
        />
    );

    const handleChange = useCallback((selectedDate) => {
        if (dueDate.current !== null){
            dueDate.current = null;
        }
        dueDate.current = new Date(selectedDate).getTime();
        setCalOpenStatus((prev) => !prev);
    }, []);

    return (
        <>
            {renderTextField()}
            {
                openCal &&
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DateCalendar
                        onChange={handleChange}
                        minDate={new Date()}
                    />
                </LocalizationProvider>
            }
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