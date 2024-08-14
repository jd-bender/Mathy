"use client";
import { useState, useEffect, useContext } from "react";
import NumberLineContext from "app/components/NumberLine/numberLineContext";

type DotProps = {
    explanationMode: boolean;
    autoSelected: boolean;
    position: number;
    startPosition: number;
    endPosition: number;
};

export default function Dot({
    explanationMode,
    autoSelected,
    position,
    startPosition,
    endPosition,
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
        explanationMode
            ? autoSelected
            : position === startPosition || position === endPosition,
    );

    useEffect(() => {
        if (resetSignal && selected) {
            setSelected(false);
        }
    }, [resetSignal, selected]);

    const handleClick = () => {
        let isSelected = false;

        if (selectedDots < 2) {
            isSelected = !selected;
        }

        if (isSelected) {
            if (selectedDots + 1 === 1) {
                setStartPosition(position);
            } else if (selectedDots + 1 === 2) {
                setEndPosition(position);
            }

            setSelectedDots((selectedDotCount) => {
                return selectedDotCount + 1;
            });
        } else {
            if (position === startPosition || position === endPosition) {
                if (selectedDots === 1) {
                    setStartPosition(null);
                } else if (selectedDots === 2 && position === startPosition) {
                    setStartPosition(endPosition);
                    setEndPosition(null);
                } else {
                    setEndPosition(null);
                }

                setSelectedDots((selectedDotCount) => {
                    if (selectedDotCount > 0) {
                        return selectedDotCount - 1;
                    } else {
                        return 0;
                    }
                });
            }
        }

        setSelected(isSelected);
    };

    const handleMouseEnter = () => {
        if (selectedDots === 1 && position !== startPosition) {
            setEndPosition(position);
        }
    };

    const handleMouseLeave = () => {
        if (selectedDots === 1) {
            setEndPosition(null);
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`h-3 w-3 ${color} rounded-full absolute top-0.5 ${visible} z-20`}
        ></span>
    );
}
