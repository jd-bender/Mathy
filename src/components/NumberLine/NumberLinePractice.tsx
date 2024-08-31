"use client";
import { useState, useCallback, useEffect } from "react";
import { getRandomNumber } from "utilities";
import { TextField, Button } from "@mui/material";

import NumberLineContext from "components/NumberLine/numberLineContext";
import NumberLine from "components/NumberLine/NumberLine";

export default function NumberLinePractice({ mode }: { mode: string }) {
    const [number1, setNumber1] = useState(null);
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");

    const [numberLineRangeStart, setNumberLineRangeStart] = useState(null);
    const [numberLineRangeEnd, setNumberLineRangeEnd] = useState(null);
    const [numbersSet, setNumbersSet] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(false);
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);
    const [showAnswerStatusMessage, setShowAnswerStatusMessage] =
        useState(false);
    const [answerStatusMessage, setAnswerStatusMessage] = useState("");
    const [resetSignal, setResetSignal] = useState(false);
    const [selectedDots, setSelectedDots] = useState(0);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);
    const [explanationEndPosition, setExplanationEndPosition] = useState(null);

    const minNumber = 0,
        maxNumber = 9;
    const rangeGap = 4;
    const responseTime = 1000;

    const generateExerciseValues = useCallback(() => {
        let num1 = getRandomNumber(minNumber, maxNumber);
        let num2 = getRandomNumber(minNumber, maxNumber);

        if (mode === "subtraction") {
            while (num2 > num1) {
                num1 = getRandomNumber(minNumber, maxNumber);
                num2 = getRandomNumber(minNumber, maxNumber);
            }
        }

        setNumber1(num1);
        setNumber2(num2);

        switch (mode) {
            case "addition":
                setExplanationEndPosition(num1 + num2);
                setNumberLineRangeEnd(num1 + num2 + rangeGap);

                if (num1 - rangeGap < 0) {
                    setNumberLineRangeStart(0);
                } else {
                    setNumberLineRangeStart(num1 - rangeGap);
                }

                break;
            case "subtraction":
                setExplanationEndPosition(num1 - num2);
                setNumberLineRangeEnd(num1 + rangeGap);

                if (num2 - rangeGap < 0) {
                    setNumberLineRangeStart(0);
                } else {
                    setNumberLineRangeStart(num2 - rangeGap);
                }

                break;
        }
    }, [mode]);

    useEffect(() => {
        generateExerciseValues();
        setNumbersSet(true);
    }, [generateExerciseValues]);

    const resetState = () => {
        setAnswer("");
        generateExerciseValues();

        setButtonsDisabled(false);
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
        let isCorrect: boolean;

        switch (mode) {
            case "addition":
                isCorrect = number1 + number2 === Number(answer);
                break;
            case "subtraction":
                isCorrect = number1 - number2 === Number(answer);
                break;
        }

        const message = isCorrect ? "Correct!" : "Incorrect.";

        setAnswerStatusMessage(message);
        setShowAnswerStatusMessage(true);
        setButtonsDisabled(true);

        if (isCorrect) {
            setCorrectAnswerStreak(
                (correctAnswerStreak) => correctAnswerStreak + 1,
            );
            setAnswerInputDisabled(true);
        } else {
            setCorrectAnswerStreak(0);
        }

        setTimeout(() => {
            setShowAnswerStatusMessage(false);
            setButtonsDisabled(false);

            if (isCorrect) {
                resetState();
            }
        }, responseTime);
    };

    const triggerShowExplanation = () => {
        setCorrectAnswerStreak(0);
        setShowExplanation(!showExplanation);
    };

    return (
        <div className="relative block">
            <div className="mb-3">
                <Button
                    variant="contained"
                    onClick={triggerShowExplanation}
                    disabled={buttonsDisabled}
                >
                    {showExplanation ? "Hide" : "Show"} Explanation
                </Button>
            </div>

            {showExplanation && (
                <NumberLine
                    range={[numberLineRangeStart, numberLineRangeEnd]}
                    explanationMode={true}
                    startPosition={number1}
                    endPosition={explanationEndPosition}
                    modifier={number2}
                />
            )}

            <div className="my-2">
                Correct answer streak: {correctAnswerStreak}
            </div>
            {numbersSet && (
                <>
                    <div className="mb-2">
                        {number1} {mode === "addition" ? "+" : "-"} {number2} =
                        ?
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
                    disabled={buttonsDisabled || !answer}
                >
                    Submit Answer
                </Button>
            </div>
        </div>
    );
}
