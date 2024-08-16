import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Transition } from "@headlessui/react";
import { page1Content, page2Content } from "./LessonContent";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Lesson() {
    const [lessonStarted, setLessonStarted] = useState(false);
    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [hideActivePageContent, setHideActivePageContent] = useState(false);
    const [activePageContent, setActivePageContent] = useState([
        <Transition show={true} key={0}></Transition>,
    ]);

    const startLesson = () => {
        setStartButtonDisabled(true);
        setLessonStarted(true);

        populatePage1Content();
    };

    const populatePage1Content = () => {
        page1Content.textContent.forEach((content, index) => {
            setTimeout(() => {
                if (index === 0) {
                    setPageLoading(true);
                }

                setActivePageContent((currentPage1) => [
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
                setActivePageContent((currentActivePageContent) => [
                    ...currentActivePageContent,
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

    const populatePage2Content = () => {
        setActivePageContent((currentActivePageContent) => [
            ...currentActivePageContent,
            <Transition show={true} appear={true} key={1}>
                <NumberLine
                    range={[0, 10]}
                    explanationMode={true}
                    startPosition={3}
                    endPosition={8}
                    modifier={5}
                />
            </Transition>,
        ]);

        page2Content.textContent.forEach((content, index) => {
            setTimeout(() => {
                setActivePageContent((currentActivePageContent) => [
                    ...currentActivePageContent,
                    <Transition show={true} appear={true} key={index + 2}>
                        <Typography
                            mb={2}
                            className={`transition-opacity ease-in-out duration-1000 data-[closed]:opacity-0`}
                        >
                            {content}
                        </Typography>
                    </Transition>,
                ]);
            }, page2Content.timeoutDurations[index]);
        });
    };

    const advanceToNextLessonPage = () => {
        setHideActivePageContent(true);

        setTimeout(() => {
            setActivePageContent([
                <Transition show={true} key={0}></Transition>,
            ]);
            setHideActivePageContent(false);
            populatePage2Content();
        }, 1000);
    };

    return (
        <Box className="relative">
            <span
                className={`${hideActivePageContent ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out duration-1000`}
            >
                {activePageContent}
            </span>

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
