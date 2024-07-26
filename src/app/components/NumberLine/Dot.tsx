"use client";
import { useState, useEffect, useContext } from "react";
import NumberLineContext from "app/contexts/numberLineContext";

type DotProps = {
    explanationMode: boolean;
    autoSelected: boolean;
};

export default function Dot({ explanationMode, autoSelected }: DotProps) {
    const context = useContext(NumberLineContext);
    const { resetSignal, selectedDots, setSelectedDots } = context;

    const [selected, setSelected] = useState(
        explanationMode ? autoSelected : false,
    );

    useEffect(() => {
        if (resetSignal) {
            setSelected(false);
        }
    }, [resetSignal]);

    useEffect(() => {
        if (selected) {
            setSelectedDots((selectedDot) => selectedDot + 1);
        } else {
            setSelectedDots((selectedDot) => {
                if (selectedDot > 0) {
                    return selectedDot - 1;
                } else {
                    return 0;
                }
            });
        }
    }, [selected, setSelectedDots]);

    const handleClick = () => {
        if (selectedDots < 2) {
            setSelected(!selected);
        } else {
            setSelected(false);
        }
    };

    const color = selected ? "bg-green-500" : "bg-green-400";
    const showOnHover =
        selectedDots < 2
            ? "opacity-0 hover:opacity-100 cursor-pointer"
            : "opacity-0";
    const visible = selected
        ? `opacity-100 ${!explanationMode ? "cursor-pointer" : ""}`
        : explanationMode
          ? "opacity-0"
          : showOnHover;

    return (
        <span
            onClick={() => !explanationMode && handleClick()}
            className={`h-3 w-3 ${color} rounded-full absolute top-0.5 ${visible}`}
        ></span>
    );
}
