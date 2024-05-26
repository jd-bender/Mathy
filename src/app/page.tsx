"use client";
import { useState } from "react";
import { List, Collapse } from "@mui/material";
import NavButton from "./components/NavButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [arithmeticOpen, setArithmeticOpen] = useState(false);
    const [additionOpen, setAdditionOpen] = useState(false);
    const [subtractionOpen, setSubtractionOpen] = useState(false);

    const router = useRouter();

    return (
        <>
            <h1>home page</h1>

            <List>
                <NavButton
                    clickAction={() => setArithmeticOpen(!arithmeticOpen)}
                    buttonText="Arithmetic"
                />
                <Collapse in={arithmeticOpen}>
                    <NavButton
                        sx={{ pl: 4 }}
                        clickAction={() => setAdditionOpen(!additionOpen)}
                        buttonText="Addition"
                    />
                    <Collapse in={additionOpen}>
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/addition-1")
                            }
                            buttonText="Addition 1"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/addition-2")
                            }
                            buttonText="Addition 2"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/addition-3")
                            }
                            buttonText="Addition 3"
                        />
                    </Collapse>

                    <NavButton
                        sx={{ pl: 4 }}
                        clickAction={() => setSubtractionOpen(!subtractionOpen)}
                        buttonText="Subtraction"
                    />
                    <Collapse in={subtractionOpen}>
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/subtraction-1")
                            }
                            buttonText="Subtraction 1"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/subtraction-2")
                            }
                            buttonText="Subtraction 2"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/subtraction-3")
                            }
                            buttonText="Subtraction 3"
                        />
                    </Collapse>
                </Collapse>
            </List>
        </>
    );
}
