import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function Lesson() {
    const [lessonStarted, setLessonStarted] = useState(false);
    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [showFirstMessage, setShowFirstMessage] = useState(false);

    const startLesson = () => {
        setStartButtonDisabled(true);
        setLessonStarted(true);

        setTimeout(() => {
            setShowFirstMessage(true);
        }, 1000);
    };

    return (
        <Box className="relative">
            <Button
                className={`${lessonStarted ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out duration-1000`}
                onClick={startLesson}
                variant="contained"
                disabled={startButtonDisabled}
            >
                Start Lesson
            </Button>
            <p
                className={`${showFirstMessage ? "opacity-100 absolute top-0" : "opacity-0"} transition-opacity ease-in-out duration-1000`}
            >
                Welcome to Addition 1! This is the very first module of the
                course.
            </p>
        </Box>
    );
}
