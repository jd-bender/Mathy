import { Typography } from "@mui/material";
import { pages } from "./LessonContent";
import NumberLine from "app/components/NumberLine/NumberLine";
import LessonLayout from "app/components/LessonLayout";

export default function Lesson() {
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

    return <LessonLayout pages={[Page1, Page2, Page3]} />;
}
