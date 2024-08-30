"use client";
import { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import TabPanel from "app/components/TabPanel";
import Lesson from "./Lesson";
import Practice from "./Practice";

export default function Page() {
    const [selectedTab, setSelectedTab] = useState(0);

    const [activeLessonPage, setActiveLessonPage] = useState(0);

    const handleSelectedTabChange = (
        _event: SyntheticEvent,
        newTab: number,
    ) => {
        setSelectedTab(newTab);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Tabs value={selectedTab} onChange={handleSelectedTabChange}>
                    <Tab label="Lesson" />
                    <Tab label="Practice" />
                </Tabs>
            </Box>

            <Box className="relative flex flex-col grow p-12 mx-96 m-w-96">
                <TabPanel value={selectedTab} index={0}>
                    <Lesson
                        activePageIndex={activeLessonPage}
                        setActivePageIndex={setActiveLessonPage}
                    />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Practice />
                </TabPanel>
            </Box>
        </Box>
    );
}
