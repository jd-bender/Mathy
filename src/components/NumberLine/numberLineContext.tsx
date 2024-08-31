import { createContext, SetStateAction, Dispatch } from "react";

interface INumberLineContext {
    resetSignal: boolean;
    selectedDots: number;
    setSelectedDots: Dispatch<SetStateAction<number>>;
    setStartPosition: Dispatch<SetStateAction<number>>;
    setEndPosition: Dispatch<SetStateAction<number>>;
}

const NumberLineContext = createContext<INumberLineContext>({
    resetSignal: false,
    selectedDots: 0,
    setSelectedDots: () => {},
    setStartPosition: () => {},
    setEndPosition: () => {},
});

export default NumberLineContext;
