"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getRandomNumber } from "utilities";
import { TextField, Button, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import ResetContext from "app/contexts/resetContext";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Page() {
    const minNumber = 0,
        maxNumber = 9;
    const rangeGap = 4;

    const [number1, setNumber1] = useState(null);
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
    const [resetState, setResetState] = useState(false);

    const resetEquation = useCallback(() => {
        setAnswer("");

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

        setShowSubmitButton(true);
        setAnswerInputDisabled(false);
        setShowExplanation(false);
        setResetState(true);

        setTimeout(() => {
            setResetState(false);
        }, 1000);
    }, [minNumber, maxNumber]);

    useEffect(() => {
        resetEquation();
        setNumbersSet(true);
    }, [resetEquation]);

    const submitAnswer = () => {
        let isCorrect = number1 + number2 === Number(answer);

        if (isCorrect) {
            setCorrectAnswerStreak(
                (correctAnswerStreak) => correctAnswerStreak + 1,
            );
            setAnswerStatusMessage("Correct!");
        } else {
            setCorrectAnswerStreak(0);
            setAnswerStatusMessage("Incorrect.");
        }

        setShowAnswerStatusMessage(true);
    };

    const responseTime = 1000;

    useEffect(() => {
        if (showAnswerStatusMessage) {
            setShowSubmitButton(false);
            setAnswerInputDisabled(true);

            setTimeout(() => {
                setShowAnswerStatusMessage(false);
                resetEquation();
                setShowSubmitButton(true);
            }, responseTime);
        }
    }, [showAnswerStatusMessage, resetEquation]);

    useEffect(() => {
        if (displayAnswerIncorrectMessage) {
            setTimeout(() => {
                setDisplayAnswerIncorrectMessage(false);
            }, responseTime);
        }
    }, [displayAnswerIncorrectMessage]);

    return (
        <span className="relative block">
            <div>
                Addition 1
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
                            explanationMode={true}
                            startPosition={number1}
                            endPosition={number1 + number2}
                            modifier={number2}
                        />
                    )}

                    <div className="my-2">
                        Correct answer streak: {correctAnswerStreak}
                    </div>
                    <div className="mb-2">
                        {number1} + {number2} = ?
                    </div>
                    <ResetContext.Provider value={resetState}>
                        <NumberLine
                            range={[numberLineRangeStart, numberLineRangeEnd]}
                            explanationMode={false}
                        />
                    </ResetContext.Provider>

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
