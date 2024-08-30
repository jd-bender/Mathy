"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="p-12 mx-48 flex justify-evenly">
            <Button
                variant="contained"
                onClick={() => router.push("/arithmetic/addition-1")}
            >
                Addition 1
            </Button>

            <Button
                variant="contained"
                onClick={() => router.push("/arithmetic/subtraction-1")}
            >
                Subtraction 1
            </Button>
        </div>
    );
}
