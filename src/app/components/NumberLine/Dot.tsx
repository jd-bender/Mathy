"use client";
import { useState, useEffect, useContext } from "react";
import NumberLineContext from "app/components/NumberLine/numberLineContext";

type DotProps = {
    explanationMode: boolean;
    autoSelected: boolean;
    position: number;
};

export default function Dot({
    explanationMode,
    autoSelected,
    position,
}: DotProps) {
    const context = useContext(NumberLineContext);
    const {
        resetSignal,
        selectedDots,
        setSelectedDots,
        setStartPosition,
        setEndPosition,
    } = context;

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
            setSelectedDots((selectedDot) => {
                if (selectedDot + 1 === 1) {
                    setStartPosition(position);
                } else if (selectedDot + 1 === 2) {
                    setEndPosition(position);
                }
                return selectedDot + 1;
            });
        } else {
            setSelectedDots((selectedDot) => {
                if (selectedDot > 0) {
                    setEndPosition(null);
                    return selectedDot - 1;
                } else {
                    setStartPosition(null);
                    return 0;
                }
            });
        }
    }, [selected, setSelectedDots, position, setStartPosition, setEndPosition]);

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
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            className={`h-3 w-3 ${color} rounded-full absolute top-0.5 ${visible}`}
        ></span>
    );
}
