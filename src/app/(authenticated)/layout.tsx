import { IParent } from "interfaces";
import { Box } from "@mui/material";
import Link from "next/link";

export default function DashboardLayout({ children }: IParent) {
    return (
        <Box>
            <Box className="fixed top-0 w-full h-16 flex justify-center items-center bg-palette-1">
                <Link href="/" className="text-3xl font-medium">
                    Mathy
                </Link>
            </Box>

            <Box className="mt-16">{children}</Box>
        </Box>
    );
}
