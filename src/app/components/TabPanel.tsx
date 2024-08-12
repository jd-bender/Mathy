import { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
    children: ReactNode;
    index: number;
    value: number;
}

export default function TabPanel({ children, index, value }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
