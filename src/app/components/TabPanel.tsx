import { ReactNode } from "react";

interface TabPanelProps {
    children: ReactNode;
    index: number;
    value: number;
}

export default function TabPanel({ children, index, value }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && children}
        </div>
    );
}
