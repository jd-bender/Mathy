import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function ArithmeticLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <div>{children}</div>

            <Link href="/" className="absolute bottom-4 right-4">
                <Button variant="contained">Return</Button>
            </Link>
        </>
    );
}
