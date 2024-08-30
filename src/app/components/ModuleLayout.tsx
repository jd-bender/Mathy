"use client";
import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    SyntheticEvent,
    ReactNode,
} from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ModuleLayout({
    Lesson,
    Practice,
}: {
    Lesson: ReactNode;
    Practice: ReactNode;
}) {
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

    let activeTab = "0";

    if (params.get("tab")) {
        switch (params.get("tab")) {
            case "lesson":
                activeTab = "0";
                break;
            case "practice":
                activeTab = "1";
                break;
        }
    }

    useEffect(() => {
        if (!params.get("tab")) {
            setParam("tab", "lesson");
        }
    }, [params, setParam]);

    const [selectedTab, setSelectedTab] = useState(activeTab);

    const handleSelectedTabChange = (
        _event: SyntheticEvent,
        newTab: string,
    ) => {
        setParam("tab", newTab === "0" ? "lesson" : "practice");
        setSelectedTab(newTab);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <TabContext value={selectedTab}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <TabList onChange={handleSelectedTabChange}>
                        <Tab label="Lesson" value="0" />
                        <Tab label="Practice" value="1" />
                    </TabList>
                </Box>

                <Box className="relative flex flex-col items-center p-12 mx-96 m-w-96">
                    <TabPanel value="0" keepMounted>
                        {Lesson}
                    </TabPanel>
                    <TabPanel value="1" keepMounted>
                        {Practice}
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}
