"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="p-12 mx-48">
            <Button
                variant="contained"
                onClick={() => router.push("/arithmetic/addition-1")}
            >
                Addition 1
            </Button>
        </div>
    );
}
