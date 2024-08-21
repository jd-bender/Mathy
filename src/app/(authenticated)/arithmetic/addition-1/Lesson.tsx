import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { pages } from "./LessonContent";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Lesson() {
    const [lessonStarted, setLessonStarted] = useState(false);
    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [hideActivePageContent, setHideActivePageContent] = useState(true);
    const [activePageContent, setActivePageContent] = useState([]);

    const pageTransitionTime = 1000;

    const startLesson = () => {
        setStartButtonDisabled(true);
        setLessonStarted(true);

        setTimeout(() => {
            populatePage1Content();
        }, pageTransitionTime);
    };

    const populatePage1Content = () => {
        let currentPageContent = pages[0].map((content, index) => (
            <Typography mb={2} key={index + 1}>
                {content}
            </Typography>
        ));

        currentPageContent.push(
            <Button
                onClick={advanceToNextLessonPage}
                variant="contained"
                key={pages[0].length + 1}
            >
                Next
            </Button>,
        );

        setActivePageContent(currentPageContent);
        setHideActivePageContent(false);
    };

    const populatePage2Content = () => {
        let currentPageContent = pages[1].map((content, index) => {
            switch (index) {
                case 1:
                    return (
                        <NumberLine
                            range={[0, 10]}
                            explanationMode={true}
                            key={index}
                            className="mb-2"
                        />
                    );
                case 5:
                    return (
                        <NumberLine
                            range={[0, 10]}
                            explanationMode={true}
                            startPosition={3}
                            key={index}
                            className="mb-2"
                        />
                    );
                case 7:
                    return (
                        <NumberLine
                            range={[0, 10]}
                            explanationMode={true}
                            startPosition={3}
                            endPosition={8}
                            key={index}
                            className="mb-2"
                        />
                    );
                default:
                    return (
                        <Typography mb={2} key={index}>
                            {content}
                        </Typography>
                    );
            }
        });

        setActivePageContent(currentPageContent);
        setHideActivePageContent(false);
    };

    const advanceToNextLessonPage = () => {
        setHideActivePageContent(true);

        setTimeout(() => {
            setActivePageContent([]);
            setHideActivePageContent(false);
            populatePage2Content();
        }, pageTransitionTime);
    };

    return (
        <Box sx={{ position: "relative", marginX: "10%", minWidth: "768px" }}>
            <span
                className={`${hideActivePageContent ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out duration-1000`}
            >
                {activePageContent}
            </span>

            <Button
                className={`${lessonStarted ? "opacity-0" : "opacity-100 absolute top-0 z-10"} transition-opacity ease-in-out duration-1000`}
                onClick={startLesson}
                variant="contained"
                disabled={startButtonDisabled}
            >
                Start Lesson
            </Button>
        </Box>
    );
}
