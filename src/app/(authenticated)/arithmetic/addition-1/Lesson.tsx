import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TabPanel from "app/components/TabPanel";
import { pages } from "./LessonContent";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Lesson() {
    const [activePageIndex, setActivePageIndex] = useState(0);

    const goToLastPage = () => {
        setActivePageIndex((oldActivePageIndex) => oldActivePageIndex - 1);
    };

    const goToNextPage = () => {
        setActivePageIndex((oldActivePageIndex) => oldActivePageIndex + 1);
    };

    return (
        <Box className="relative flex flex-col grow p-12 mx-96 m-w-96">
            <TabPanel value={activePageIndex} index={0}>
                {pages[0].map((content, index) => (
                    <Typography mb={2} key={index}>
                        {content}
                    </Typography>
                ))}
            </TabPanel>
            <TabPanel value={activePageIndex} index={1}>
                {pages[1].map((content, index) => {
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
                })}
            </TabPanel>
            <TabPanel value={activePageIndex} index={2}>
                {pages[2].map((content, index) => (
                    <Typography mb={2} key={index}>
                        {content}
                    </Typography>
                ))}
            </TabPanel>

            <Box className="flex justify-between">
                <Button
                    onClick={goToLastPage}
                    variant="contained"
                    disabled={activePageIndex === 0}
                >
                    Back
                </Button>
                <Button
                    onClick={goToNextPage}
                    variant="contained"
                    disabled={activePageIndex === pages.length - 1}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
