import { IParent } from "interfaces";
import { Box } from "@mui/material";
import Link from "next/link";

export default function DashboardLayout({ children }: IParent) {
    return (
        <Box>
            <Box className="w-full h-16 flex justify-center items-center bg-palette-1">
                <Link href="/" className="text-3xl font-medium">
                    Mathy
                </Link>
            </Box>

            <Box>{children}</Box>
        </Box>
    );
}
