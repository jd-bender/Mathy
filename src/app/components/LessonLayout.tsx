"use client";
import { ReactNode, useState } from "react";
import { Box, Button } from "@mui/material";
import TabPanel from "app/components/TabPanel";

export default function LessonLayout({ pages }) {
    const [activePageIndex, setActivePageIndex] = useState(0);

    const goToLastPage = () => {
        setActivePageIndex(
            (oldActivePageIndex: number) => oldActivePageIndex - 1,
        );
    };

    const goToNextPage = () => {
        setActivePageIndex(
            (oldActivePageIndex: number) => oldActivePageIndex + 1,
        );
    };

    return (
        <>
            {pages.map((page: ReactNode, index: number) => (
                <TabPanel value={activePageIndex} index={index} key={index}>
                    {page}
                </TabPanel>
            ))}
            {/* <TabPanel value={activePageIndex} index={0}>
                {Page1}
            </TabPanel>
            <TabPanel value={activePageIndex} index={1}>
                {Page2}
            </TabPanel>
            <TabPanel value={activePageIndex} index={2}>
                {Page3}
            </TabPanel> */}

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
        </>
    );
}
