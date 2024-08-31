import { IParent } from "interfaces";
import Link from "next/link";
import { Button } from "@mui/material";

export default function ArithmeticLayout({ children }: IParent) {
    return (
        <>
            <div className="flex">{children}</div>

            <Link href="/" className="fixed bottom-4 right-4">
                <Button variant="contained">Return</Button>
            </Link>
        </>
    );
}
