import { forwardRef, useCallback } from "react";

import PropTypes from "prop-types";

import { Tooltip } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { OverridableStringUnion } from "@mui/types";

export interface SvgIconPropsColorOverrides {}
interface CalIconProps {
    setCalOpenStatus: Function;
    buttonColor?: OverridableStringUnion<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    SvgIconPropsColorOverrides
    >;
}

const CalendarIcon = forwardRef<SVGSVGElement, CalIconProps>(
    ({ setCalOpenStatus, buttonColor = "primary" }, ref) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
        const handleCalIconClick = useCallback(() => setCalOpenStatus((prev: any) => !prev), []);
        return (
            <Tooltip
                title="Due date"
                placement="bottom"
                arrow
            >
                <CalendarMonth
                    className="curPointer"
                    ref={ref}
                    onClick={handleCalIconClick}
                    color={buttonColor}
                />
            </Tooltip>
        );
    }
);

CalendarIcon.propTypes = {
    setCalOpenStatus: PropTypes.func.isRequired,
    buttonColor: PropTypes.string
} as any;

export default CalendarIcon;
