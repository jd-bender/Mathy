"use client";
import { useState } from "react";

type DotProps = {
    explanationMode: boolean;
    autoSelected?: boolean;
};

export default function Dot({ explanationMode, autoSelected }: DotProps) {
    const [selected, setSelected] = useState(
        explanationMode ? autoSelected : false,
    );

    const showOnHover = "opacity-0 hover:opacity-100";

    return (
        <span
            onClick={() => !explanationMode && setSelected(!selected)}
            className={`h-3 w-3 bg-green-500 rounded-full absolute top-0.5 ${selected ? "opacity-100" : explanationMode ? "opacity-0" : showOnHover}`}
        ></span>
    );
}
