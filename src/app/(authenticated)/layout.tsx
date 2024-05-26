import { ReactNode } from "react";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Box className="w-full h-16 flex justify-center items-center bg-palette-1">
                <span className="text-3xl font-medium">Mathy</span>
            </Box>

            <Box>{children}</Box>
        </Box>
    );
}
