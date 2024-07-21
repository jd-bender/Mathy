"use client";
import { useState, useEffect, useContext } from "react";
import { ResetContext } from "app/contexts/resetContext";

type DotProps = {
    explanationMode: boolean;
    autoSelected: boolean;
    resetState?: boolean;
};

export default function Dot({ explanationMode, autoSelected }: DotProps) {
    const [selected, setSelected] = useState(
        explanationMode ? autoSelected : false,
    );
    const resetSignal = useContext(ResetContext);

    useEffect(() => {
        if (resetSignal) {
            setSelected(false);
        }
    }, [resetSignal]);

    const showOnHover = "opacity-0 hover:opacity-100";

    return (
        <span
            onClick={() => !explanationMode && setSelected(!selected)}
            className={`h-3 w-3 bg-green-500 rounded-full absolute top-0.5 ${selected ? "opacity-100" : explanationMode ? "opacity-0" : showOnHover}`}
        ></span>
    );
}
