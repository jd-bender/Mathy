"use client";
import { useState, useEffect } from "react";
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
    const num1 = getRandomNumber(minNumber, maxNumber);
    const num2 = getRandomNumber(minNumber, maxNumber);

    const [number1, setNumber1] = useState(num1);
    const [number2, setNumber2] = useState(num2);
    const [answer, setAnswer] = useState("");
    const [numbersSet] = useState(true);

    let rangeStart: number;

    if (num1 - rangeGap < 0) {
        rangeStart = 0;
    } else {
        rangeStart = num1 - rangeGap;
    }

    const [numberLineRangeStart, setNumberLineRangeStart] =
        useState(rangeStart);
    const [numberLineRangeEnd, setNumberLineRangeEnd] = useState(
        num1 + num2 + rangeGap,
    );
    const [showExplanation, setShowExplanation] = useState(false);
    const [displayAnswerIncorrectMessage, setDisplayAnswerIncorrectMessage] =
        useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(false);
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);
    const [showAnswerStatusMessage, setShowAnswerStatusMessage] =
        useState(false);
    const [answerStatusMessage, setAnswerStatusMessage] = useState("Correct!");
    const [resetState, setResetState] = useState(false);

    const responseTime = 1000;

    const resetEquation = () => {
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
    };

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

        setShowSubmitButton(false);
        setAnswerInputDisabled(true);

        setTimeout(() => {
            setShowAnswerStatusMessage(false);
            resetEquation();
            setShowSubmitButton(true);
        }, responseTime);
    };

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
