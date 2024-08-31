import { Suspense } from "react";
import ModuleLayout from "components/ModuleLayout";
import Lesson from "./Lesson";
import Practice from "./Practice";

export default function Page() {
    return (
        <Suspense>
            <ModuleLayout Lesson={<Lesson />} Practice={<Practice />} />
        </Suspense>
    );
}
