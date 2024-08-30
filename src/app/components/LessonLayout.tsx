"use client";
import { ReactNode, useState, useMemo, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import TabPanel from "app/components/TabPanel";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LessonLayout({ pages }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useMemo(
        () => new URLSearchParams(searchParams),
        [searchParams],
    );

    const setParam = useCallback(
        (name: string, value: string) => {
            params.set(name, value);
            router.push(pathname + "?" + params.toString());
        },
        [params, pathname, router],
    );

    let activePage = 0;

    if (params.get("page")) {
        activePage = Number(params.get("page"));
    }

    useEffect(() => {
        if (!params.get("page")) {
            setParam("page", "0");
        }
    }, [params, setParam]);

    const [activePageIndex, setActivePageIndex] = useState(activePage);

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

            <Box className="flex justify-between">
                <Button
                    onClick={goToLastPage}
                    variant="contained"
                    disabled={activePageIndex === 0}
                >
                    Back
                </Button>
                <Button
                    onClick={goToNextPage}
                    variant="contained"
                    disabled={activePageIndex === pages.length - 1}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
