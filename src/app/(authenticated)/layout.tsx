import { ReactNode } from "react";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Box className="w-full h-12 flex justify-center items-center bg-palette-1">
                <span className="text-xl">Mathy</span>
            </Box>

            <Box>{children}</Box>
        </Box>
    );
}
