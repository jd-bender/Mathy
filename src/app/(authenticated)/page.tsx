"use client";
import { useState } from "react";
import { List, Collapse } from "@mui/material";
import NavButton from "../components/NavButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [arithmeticOpen, setArithmeticOpen] = useState(false);
    const [additionOpen, setAdditionOpen] = useState(false);

    const router = useRouter();

    return (
        <List>
            <NavButton
                clickAction={() => setArithmeticOpen(!arithmeticOpen)}
                buttonText="Arithmetic"
                controlsCollapse={true}
                collapseOpen={arithmeticOpen}
            />
            <Collapse in={arithmeticOpen}>
                <NavButton
                    sx={{ pl: 4 }}
                    clickAction={() => setAdditionOpen(!additionOpen)}
                    buttonText="Addition"
                    controlsCollapse={true}
                    collapseOpen={additionOpen}
                />
                <Collapse in={additionOpen}>
                    <NavButton
                        sx={{ pl: 8 }}
                        clickAction={() =>
                            router.push("/arithmetic/addition-1")
                        }
                        buttonText="Addition 1"
                    />
                </Collapse>
            </Collapse>
        </List>
    );
}
