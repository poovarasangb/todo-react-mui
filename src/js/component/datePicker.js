import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Popover } from '@mui/material';
import { useCallback } from 'react';

const TodoDatePicker = ({
    id = "todoDatePicker",
    anchorEl,
    handleChange,
    setCalOpenStatus
}) => {

    const renderCalendar = () => (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateCalendar
                onChange={handleChange}
                minDate={new Date()}
            />
        </LocalizationProvider>
    );

    const handleClose = useCallback(() => {
        setCalOpenStatus(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Popover
            id={id}
            open
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
            {renderCalendar()}
        </Popover>
    );

};

export default TodoDatePicker;