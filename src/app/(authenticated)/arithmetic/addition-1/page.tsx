"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRandomNumber } from "utilities";
import { TextField, Button, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import NumberLineContext from "app/contexts/numberLineContext";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Page() {
    const [number1, setNumber1] = useState(null);
    const [number2, setNumber2] = useState(null);
    const [answer, setAnswer] = useState("");

    const [numberLineRangeStart, setNumberLineRangeStart] = useState(null);
    const [numberLineRangeEnd, setNumberLineRangeEnd] = useState(null);
    const [numbersSet, setNumbersSet] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [answerInputDisabled, setAnswerInputDisabled] = useState(false);
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);
    const [showAnswerStatusMessage, setShowAnswerStatusMessage] =
        useState(false);
    const [answerStatusMessage, setAnswerStatusMessage] = useState("Correct!");
    const [resetState, setResetState] = useState(false);
    const [selectedDots, setSelectedDots] = useState(0);

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

    const resetEquation = () => {
        setAnswer("");
        setNumbers();

        setSubmitButtonDisabled(false);
        setAnswerInputDisabled(false);
        setShowExplanation(false);
        setResetState(true);
        setSelectedDots(0);

        setTimeout(() => {
            setResetState(false);
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
                (correctAnswerStreak) => correctAnswerStreak + 1,
            );
            setAnswerInputDisabled(true);
        } else {
            setCorrectAnswerStreak(0);
        }

        setTimeout(() => {
            setShowAnswerStatusMessage(false);
            setSubmitButtonDisabled(false);

            if (isCorrect) {
                resetEquation();
            }
        }, responseTime);
    };

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
                        value={{ resetState, selectedDots, setSelectedDots }}
                    >
                        <NumberLine
                            range={[numberLineRangeStart, numberLineRangeEnd]}
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

            <Link href="/" className="absolute bottom-0 right-0">
                Return
            </Link>
        </span>
    );
}
