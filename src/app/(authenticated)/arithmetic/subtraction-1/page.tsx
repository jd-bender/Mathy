import ModuleLayout from "app/components/ModuleLayout";
import Lesson from "./Lesson";
import Practice from "./Practice";

export default function Page() {
    return <ModuleLayout Lesson={<Lesson />} Practice={<Practice />} />;
}
