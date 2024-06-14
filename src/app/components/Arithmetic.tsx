"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getRandomNumber } from "utilities";
import { TextField, Button } from "@mui/material";

export default function Arithmetic({ type, level }) {
    const [number1, setNumber1] = useState(null);
    const [operator, setOperator] = useState("");
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");
    const [numbersSet, setNumbersSet] = useState(false);
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
        setNumber1(getRandomNumber(minNumber, maxNumber));
        setNumber2(getRandomNumber(minNumber, maxNumber));
        setShowSubmitButton(true);
        setAnswerInputDisabled(false);
    }, [minNumber, maxNumber]);

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
                {type} {level}
            </div>
            {numbersSet && (
                <>
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
