"use client";
import { useState } from "react";
import { Box, List, Collapse } from "@mui/material";
import NavButton from "./components/NavButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [arithmeticOpen, setArithmeticOpen] = useState(false);
    const [additionOpen, setAdditionOpen] = useState(false);
    const [subtractionOpen, setSubtractionOpen] = useState(false);
    const [multiplicationOpen, setMultiplicationOpen] = useState(false);

    const router = useRouter();

    return (
        <>
            <Box className="w-full h-12 flex justify-center items-center bg-palette-1">
                <span className="text-xl">Mathy</span>
            </Box>

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
                        controlsCollapse={true}
                        collapseOpen={subtractionOpen}
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

                    <NavButton
                        sx={{ pl: 4 }}
                        clickAction={() =>
                            setMultiplicationOpen(!multiplicationOpen)
                        }
                        buttonText="Multiplication"
                        controlsCollapse={true}
                        collapseOpen={multiplicationOpen}
                    />
                    <Collapse in={multiplicationOpen}>
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/multiplication-1")
                            }
                            buttonText="Multiplication 1"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/multiplication-2")
                            }
                            buttonText="Multiplication 2"
                        />
                        <NavButton
                            sx={{ pl: 8 }}
                            clickAction={() =>
                                router.push("/arithmetic/multiplication-3")
                            }
                            buttonText="Multiplication 3"
                        />
                    </Collapse>
                </Collapse>
            </List>
        </>
    );
}
