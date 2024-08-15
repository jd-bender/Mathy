import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Transition } from "@headlessui/react";
import { page1Content } from "./LessonContent";

export default function Lesson() {
    const [lessonStarted, setLessonStarted] = useState(false);
    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [page1, setPage1] = useState([
        <Transition show={true} key={0}></Transition>,
    ]);

    const startLesson = () => {
        setStartButtonDisabled(true);
        setLessonStarted(true);

        page1Content.textContent.forEach((content, index) => {
            setTimeout(() => {
                if (index === 0) {
                    setPageLoading(true);
                }

                setPage1((currentPage1) => [
                    ...currentPage1,
                    <Transition show={true} appear={true} key={index + 1}>
                        <Typography
                            mb={2}
                            className={`transition-opacity ease-in-out duration-1000 data-[closed]:opacity-0`}
                        >
                            {content}
                        </Typography>
                    </Transition>,
                ]);
            }, page1Content.timeoutDurations[index]);
        });

        setTimeout(
            () => {
                setPage1((currentPage1) => [
                    ...currentPage1,
                    <Transition
                        show={true}
                        appear={true}
                        key={page1Content.textContent.length + 1}
                    >
                        <Button
                            onClick={advanceToNextLessonPage}
                            variant="contained"
                            className={`transition-opacity ease-in-out duration-1000 data-[closed]:opacity-0`}
                        >
                            Next
                        </Button>
                    </Transition>,
                ]);
            },
            page1Content.timeoutDurations[
                page1Content.timeoutDurations.length - 1
            ],
        );
    };

    const advanceToNextLessonPage = () => {};

    return (
        <Box className="relative">
            {page1}
            <Button
                className={`${lessonStarted ? "opacity-0" : "opacity-100 absolute top-0 z-10"} ${pageLoading && "hidden"} transition-opacity ease-in-out duration-1000`}
                onClick={startLesson}
                variant="contained"
                disabled={startButtonDisabled}
            >
                Start Lesson
            </Button>
        </Box>
    );
}
