"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getRandomNumber } from "utilities";
import { TextField, Button, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import NumberLine from "./NumberLine/NumberLine";

export default function Arithmetic({ type, level }) {
    const [number1, setNumber1] = useState(null);
    const [operator, setOperator] = useState("");
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");
    const [numbersSet, setNumbersSet] = useState(false);
    const [numberLineRangeStart, setNumberLineRangeStart] = useState(null);
    const [numberLineRangeEnd, setNumberLineRangeEnd] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [displayAnswerIncorrectMessage, setDisplayAnswerIncorrectMessage] =
        useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(true);
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);
    const [showAnswerStatusMessage, setShowAnswerStatusMessage] =
        useState(false);
    const [answerStatusMessage, setAnswerStatusMessage] = useState("Correct!");

    let minNumber: number, maxNumber: number;

    switch (level) {
        case 1:
            minNumber = 0;
            maxNumber = 9;
            break;
        case 2:
            minNumber = 10;
            maxNumber = 99;
            break;
        case 3:
            minNumber = 100;
            maxNumber = 999;
            break;
    }

    const resetEquation = useCallback(() => {
        setAnswer("");

        if (type !== "Division") {
            const num1 = getRandomNumber(minNumber, maxNumber);
            const num2 = getRandomNumber(minNumber, maxNumber);

            setNumber1(num1);
            setNumber2(num2);

            const rangeGap = 4;

            if (num1 - rangeGap < 0) {
                setNumberLineRangeStart(0);
            } else {
                setNumberLineRangeStart(num1 - rangeGap);
            }

            setNumberLineRangeEnd(num1 + num2 + rangeGap);
        } else {
            let num1: number, num2: number;

            let numbersFound = false;

            while (!numbersFound) {
                num1 = getRandomNumber(minNumber, maxNumber);
                num2 = getRandomNumber(minNumber, maxNumber);

                if (
                    num1 % num2 === 0 &&
                    num1 !== num2 &&
                    num1 !== 0 &&
                    num2 !== 1
                ) {
                    numbersFound = true;
                }
            }

            setNumber1(num1);
            setNumber2(num2);
        }

        setShowSubmitButton(true);
        setAnswerInputDisabled(false);
    }, [type, minNumber, maxNumber]);

    useEffect(() => {
        switch (type) {
            case "Addition":
                setOperator("+");
                break;
            case "Subtraction":
                setOperator("-");
                break;
            case "Multiplication":
                setOperator("x");
                break;
            case "Division":
                setOperator("/");
                break;
        }
    }, [type]);

    useEffect(() => {
        resetEquation();
        setNumbersSet(true);
    }, [resetEquation]);

    const submitAnswer = () => {
        let isCorrect: boolean;

        switch (type) {
            case "Addition":
                isCorrect = number1 + number2 === Number(answer);
                break;
            case "Subtraction":
                isCorrect = number1 - number2 === Number(answer);
                break;
            case "Multiplication":
                isCorrect = number1 * number2 === Number(answer);
                break;
            case "Division":
                isCorrect = number1 / number2 === Number(answer);
                break;
        }

        if (isCorrect) {
            setCorrectAnswerStreak(
                (correctAnswerStreak) => correctAnswerStreak + 1,
            );
            setAnswerStatusMessage("Correct!");
            setShowAnswerStatusMessage(true);
        } else {
            setCorrectAnswerStreak(0);
            setAnswerStatusMessage("Incorrect.");
            setShowAnswerStatusMessage(true);
        }
    };

    useEffect(() => {
        if (showAnswerStatusMessage) {
            setShowSubmitButton(false);
            setAnswerInputDisabled(true);

            setTimeout(() => {
                setShowAnswerStatusMessage(false);
                resetEquation();
                setShowSubmitButton(true);
            }, 3000);
        }
    }, [showAnswerStatusMessage, resetEquation]);

    useEffect(() => {
        if (displayAnswerIncorrectMessage) {
            setTimeout(() => {
                setDisplayAnswerIncorrectMessage(false);
            }, 3000);
        }
    }, [displayAnswerIncorrectMessage]);

    return (
        <span className="relative block">
            <div>
                {type} {level}{" "}
                <Tooltip title="Explanation">
                    <HelpIcon
                        className="cursor-pointer"
                        onClick={() => setShowExplanation(!showExplanation)}
                    />
                </Tooltip>
            </div>
            {numbersSet && (
                <>
                    {showExplanation && (
                        <NumberLine
                            range={[numberLineRangeStart, numberLineRangeEnd]}
                            startPosition={number1}
                            endPosition={number1 + number2}
                        />
                    )}

                    <div className="my-2">
                        Correct answer streak: {correctAnswerStreak}
                    </div>
                    <div className="mb-2">
                        {number1} {operator} {number2} = ?
                    </div>
                    <h1
                        className={
                            showAnswerStatusMessage ? "visible" : "invisible"
                        }
                    >
                        {answerStatusMessage}
                    </h1>
                    <div className="flex justify-start gap-4">
                        <TextField
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={answerInputDisabled}
                            className="mr-2"
                            autoComplete="off"
                        />
                        {showSubmitButton && (
                            <Button
                                onClick={submitAnswer}
                                variant="contained"
                                disabled={!answer}
                            >
                                Submit Answer
                            </Button>
                        )}
                    </div>
                </>
            )}

            <Link href="/" className="absolute bottom-0 right-0">
                Return
            </Link>
        </span>
    );
}
