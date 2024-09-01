"use client";
import { ReactNode, useEffect } from "react";
import { Button } from "@mui/material";
import TabPanel from "components/TabPanel";
import useQueryParams from "../hooks/useQueryParams";

export default function LessonLayout({
    pages,
    activePageIndex,
    setActivePageIndex,
}) {
    const [params, setParam] = useQueryParams();

    useEffect(() => {
        if (params.get("page")) {
            setActivePageIndex(Number(params.get("page")));
        }

        if (params.get("tab") === "lesson" && !params.get("page")) {
            setParam("page", activePageIndex);
        }
    }, [params, setParam, activePageIndex, setActivePageIndex]);

    const goToLastPage = () => {
        setParam("page", String(activePageIndex - 1));
        setActivePageIndex(
            (oldActivePageIndex: number) => oldActivePageIndex - 1,
        );
    };

    const goToNextPage = () => {
        setParam("page", String(activePageIndex + 1));
        setActivePageIndex(
            (oldActivePageIndex: number) => oldActivePageIndex + 1,
        );
    };

    return (
        <>
            {pages.map((page: ReactNode, index: number) => (
                <TabPanel value={activePageIndex} index={index} key={index}>
                    {page}
                </TabPanel>
            ))}

            <Button
                onClick={goToLastPage}
                variant="contained"
                hidden={activePageIndex === 0}
            >
                Back
            </Button>
            <Button
                onClick={goToNextPage}
                variant="contained"
                hidden={activePageIndex === pages.length - 1}
                className="float-right"
            >
                Next
            </Button>
        </>
    );
}
