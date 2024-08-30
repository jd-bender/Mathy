import { Box, Button, Typography } from "@mui/material";
import TabPanel from "app/components/TabPanel";
import { pages } from "./LessonContent";
import NumberLine from "app/components/NumberLine/NumberLine";

export default function Lesson({ activePageIndex, setActivePageIndex }) {
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

    const PlainTextMapping = (content: string, index: number) => (
        <Typography mb={2} key={index}>
            {content}
        </Typography>
    );

    const Page1 = pages[0].map(PlainTextMapping);

    const Page2 = pages[1].map((content, index) => {
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

    const Page3 = pages[2].map(PlainTextMapping);

    return (
        <>
            <TabPanel value={activePageIndex} index={0}>
                {Page1}
            </TabPanel>
            <TabPanel value={activePageIndex} index={1}>
                {Page2}
            </TabPanel>
            <TabPanel value={activePageIndex} index={2}>
                {Page3}
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
        </>
    );
}
