"use client";
import { useState, useEffect } from "react";

type DotProps = {
    explanationMode: boolean;
    autoSelected: boolean;
    resetState?: boolean;
};

export default function Dot({
    explanationMode,
    autoSelected,
    resetState,
}: DotProps) {
    const [selected, setSelected] = useState(
        explanationMode ? autoSelected : false,
    );
    const [resetSignal] = useState(!!resetState);

    useEffect(() => {
        if (resetSignal) {
            setSelected(false);
        }
    }, [resetSignal]);

    useEffect(() => {
        if (!explanationMode) {
            console.log("selected changed: " + selected);
        }
    }, [explanationMode, selected]);

    const showOnHover = "opacity-0 hover:opacity-100";

    return (
        <span
            onClick={() => !explanationMode && setSelected(!selected)}
            className={`h-3 w-3 bg-green-500 rounded-full absolute top-0.5 ${selected ? "opacity-100" : explanationMode ? "opacity-0" : showOnHover}`}
        ></span>
    );
}
