"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getRandomNumber } from "utilities";
import { TextField, Button } from "@mui/material";

export default function Arithmetic({ type, minNumber, maxNumber, level }) {
    const [number1, setNumber1] = useState(null);
    const [operator, setOperator] = useState("");
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");
    const [numbersSet, setNumbersSet] = useState(false);
    const [displayAnswerCorrectMessage, setDisplayAnswerCorrectMessage] =
        useState(false);
    const [displayAnswerIncorrectMessage, setDisplayAnswerIncorrectMessage] =
        useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(true);
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);

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
        }

        if (isCorrect) {
            setCorrectAnswerStreak(
                (correctAnswerStreak) => correctAnswerStreak + 1,
            );
            setDisplayAnswerIncorrectMessage(false);
            setDisplayAnswerCorrectMessage(true);
        } else {
            setCorrectAnswerStreak(0);
            setDisplayAnswerIncorrectMessage(true);
        }
    };

    useEffect(() => {
        if (displayAnswerCorrectMessage) {
            setShowSubmitButton(false);
            setAnswerInputDisabled(true);

            setTimeout(() => {
                setDisplayAnswerCorrectMessage(false);
                resetEquation();
                setShowSubmitButton(true);
            }, 3000);
        }
    }, [displayAnswerCorrectMessage, resetEquation]);

    useEffect(() => {
        if (displayAnswerIncorrectMessage) {
            setTimeout(() => {
                setDisplayAnswerIncorrectMessage(false);
            }, 3000);
        }
    }, [displayAnswerIncorrectMessage]);

    return (
        <>
            <h1>
                {type} {level}
            </h1>
            {numbersSet && (
                <>
                    <span>Correct answer streak: {correctAnswerStreak}</span>
                    <div>
                        {number1} {operator} {number2} = ?
                    </div>
                    {displayAnswerCorrectMessage && <h1>Correct!</h1>}
                    {displayAnswerIncorrectMessage && <h1>Incorrect.</h1>}
                    <TextField
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={answerInputDisabled}
                    />
                    {showSubmitButton && (
                        <Button onClick={submitAnswer}>Submit Answer</Button>
                    )}
                </>
            )}

            <Link href="/">Home</Link>
        </>
    );
}
