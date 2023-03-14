import { createContext, useContext } from "react";

const SeatsArrangementContext = createContext({});

const useSeatsArrangementContext = () => useContext(SeatsArrangementContext);

export {
    SeatsArrangementContext,
    useSeatsArrangementContext
};