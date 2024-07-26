import { createContext, SetStateAction, Dispatch } from "react";

interface INumberLineContext {
    resetState: boolean;
    selectedDots: number;
    setSelectedDots: Dispatch<SetStateAction<number>>;
}

const NumberLineContext = createContext<INumberLineContext>({
    resetState: false,
    selectedDots: 0,
    setSelectedDots: () => {},
});

export default NumberLineContext;
