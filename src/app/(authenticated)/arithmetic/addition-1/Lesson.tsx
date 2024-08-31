import { ILesson } from "interfaces";
import { Typography } from "@mui/material";
import { pages } from "./LessonContent";
import { plainTextMapping } from "utilities";
import NumberLine from "components/NumberLine/NumberLine";
import LessonLayout from "components/LessonLayout";

export default function Lesson({
    activePageIndex,
    setActivePageIndex,
}: ILesson) {
    const Page1 = pages[0].map(plainTextMapping);

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

    const Page3 = pages[2].map(plainTextMapping);

    return (
        <LessonLayout
            pages={[Page1, Page2, Page3]}
            activePageIndex={activePageIndex}
            setActivePageIndex={setActivePageIndex}
        />
    );
}
