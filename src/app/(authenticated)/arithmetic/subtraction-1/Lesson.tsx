import { plainTextMapping } from "utilities";
import { pages } from "./LessonContent";
import LessonLayout from "components/LessonLayout";

export default function Lesson({ activePageIndex, setActivePageIndex }) {
    const Page1 = pages[0].map(plainTextMapping);
    const Page2 = pages[1].map(plainTextMapping);
    const Page3 = pages[2].map(plainTextMapping);

    return (
        <LessonLayout
            pages={[Page1, Page2, Page3]}
            activePageIndex={activePageIndex}
            setActivePageIndex={setActivePageIndex}
        />
    );
}
