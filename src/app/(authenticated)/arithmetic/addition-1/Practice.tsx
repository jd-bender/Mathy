"use client";
import { useState, useEffect } from "react";
import { getRandomNumber } from "utilities";
import { TextField, Button } from "@mui/material";

import NumberLineContext from "app/components/NumberLine/numberLineContext";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Practice({
    correctAnswerStreak,
    setCorrectAnswerStreak,
    showExplanation,
    setShowExplanation,
}) {
    const [number1, setNumber1] = useState(null);
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");

    const [numberLineRangeStart, setNumberLineRangeStart] = useState(null);
    const [numberLineRangeEnd, setNumberLineRangeEnd] = useState(null);
    const [numbersSet, setNumbersSet] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(false);
    const [showAnswerStatusMessage, setShowAnswerStatusMessage] =
        useState(false);
    const [answerStatusMessage, setAnswerStatusMessage] = useState("Correct!");
    const [resetSignal, setResetSignal] = useState(false);
    const [selectedDots, setSelectedDots] = useState(0);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);

    const minNumber = 0,
        maxNumber = 9;
    const rangeGap = 4;
    const responseTime = 1000;

    const setNumbers = () => {
        const num1 = getRandomNumber(minNumber, maxNumber);
        const num2 = getRandomNumber(minNumber, maxNumber);

        setNumber1(num1);
        setNumber2(num2);

        if (num1 - rangeGap < 0) {
            setNumberLineRangeStart(0);
        } else {
            setNumberLineRangeStart(num1 - rangeGap);
        }

        setNumberLineRangeEnd(num1 + num2 + rangeGap);
    };

    useEffect(() => {
        setNumbers();
        setNumbersSet(true);
    }, []);

    const resetState = () => {
        setAnswer("");
        setNumbers();

        setSubmitButtonDisabled(false);
        setAnswerInputDisabled(false);
        setShowExplanation(false);
        setResetSignal(true);
        setStartPosition(null);
        setEndPosition(null);
        setSelectedDots(0);

        setTimeout(() => {
            setResetSignal(false);
        }, responseTime);
    };

    const submitAnswer = () => {
        const isCorrect = number1 + number2 === Number(answer);
        const message = isCorrect ? "Correct!" : "Incorrect.";

        setAnswerStatusMessage(message);
        setShowAnswerStatusMessage(true);
        setSubmitButtonDisabled(true);

        if (isCorrect) {
            setCorrectAnswerStreak(
                (correctAnswerStreak: number) => correctAnswerStreak + 1,
            );
            setAnswerInputDisabled(true);
        } else {
            setCorrectAnswerStreak(0);
        }

        setTimeout(() => {
            setShowAnswerStatusMessage(false);
            setSubmitButtonDisabled(false);

            if (isCorrect) {
                resetState();
            }
        }, responseTime);
    };

    return (
        <div className="relative block">
            <div className="mb-3">
                <Button
                    variant="contained"
                    onClick={() => setShowExplanation(!showExplanation)}
                >
                    {showExplanation ? "Hide" : "Show"} Explanation
                </Button>
            </div>

            {showExplanation && (
                <NumberLine
                    range={[numberLineRangeStart, numberLineRangeEnd]}
                    explanationMode={true}
                    startPosition={number1}
                    endPosition={number1 + number2}
                    modifier={number2}
                />
            )}

            <div className="my-2">
                Correct answer streak: {correctAnswerStreak}
            </div>
            {numbersSet && (
                <>
                    <div className="mb-2">
                        {number1} + {number2} = ?
                    </div>
                    <NumberLineContext.Provider
                        value={{
                            resetSignal,
                            selectedDots,
                            setSelectedDots,
                            setStartPosition,
                            setEndPosition,
                        }}
                    >
                        <NumberLine
                            range={[numberLineRangeStart, numberLineRangeEnd]}
                            startPosition={startPosition}
                            endPosition={endPosition}
                            explanationMode={false}
                        />
                    </NumberLineContext.Provider>
                </>
            )}

            <h1 className={showAnswerStatusMessage ? "visible" : "invisible"}>
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
                <Button
                    onClick={submitAnswer}
                    variant="contained"
                    disabled={submitButtonDisabled || !answer}
                >
                    Submit Answer
                </Button>
            </div>
        </div>
    );
}
