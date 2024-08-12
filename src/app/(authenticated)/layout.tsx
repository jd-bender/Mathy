import { ReactNode } from "react";
import { Box } from "@mui/material";
import AppHeader from "app/components/AppHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Box className="w-full h-16 flex justify-center items-center bg-palette-1">
                <AppHeader />
            </Box>

            <Box>{children}</Box>
        </Box>
    );
}
