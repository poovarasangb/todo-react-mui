import { useCallback, useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import { useCustomEventListener } from 'react-custom-events';

const AlertMessage = () => {
    const [options, setOptions] = useState({
        message: ""
    });

    const handleAlertStatus = useCallback((_options = {}) => {
        setOptions(() => _options);
    }, []);

    const handleClose = useCallback(() => {
        setOptions(() => ({
            message: ""
        }));
    }, []);

    useCustomEventListener("show-alert", handleAlertStatus);
    return (
        <Snackbar
            open={options?.message !== ""}
            autoHideDuration={2000}
            key="alertTransition"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            onClose={handleClose}
        >
            <Alert
                severity={options.severity || "success"}
                variant="filled"
            >
                {options?.message}
            </Alert>
        </Snackbar>
    );

};

export default AlertMessage;