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

    const color = selected ? "bg-green-500" : "bg-green-400";
    const showOnHover = "opacity-0 hover:opacity-100";
    const visible = selected
        ? "opacity-100"
        : explanationMode
          ? "opacity-0"
          : showOnHover;

    return (
        <span
            onClick={() => !explanationMode && setSelected(!selected)}
            className={`h-3 w-3 ${color} rounded-full absolute top-0.5 ${visible}`}
        ></span>
    );
}
