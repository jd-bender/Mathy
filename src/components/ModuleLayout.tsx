import { useState, useEffect, SyntheticEvent } from "react";
import { Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import useQueryParams from "../hooks/useQueryParams";

export default function ModuleLayout({ Lesson, Practice }) {
    const [params, setParam, deleteParam] = useQueryParams();

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
    const [activeLessonPageIndex, setActiveLessonPageIndex] = useState(0);

    const handleSelectedTabChange = (
        _event: SyntheticEvent,
        newTab: string,
    ) => {
        setParam("tab", newTab === "0" ? "lesson" : "practice");

        if (newTab === "1") {
            deleteParam("page");
        }

        setSelectedTab(newTab);
    };

    return (
        <div className="w-full flex flex-col">
            <TabContext value={selectedTab}>
                <div className="border-b border-neutral-300 flex justify-center h-12">
                    <TabList onChange={handleSelectedTabChange}>
                        <Tab label="Lesson" value="0" />
                        <Tab label="Practice" value="1" />
                    </TabList>
                </div>

                <div className="relative mx-96 flex flex-1 overflow-y-auto">
                    <TabPanel value="0" keepMounted>
                        <Lesson
                            activePageIndex={activeLessonPageIndex}
                            setActivePageIndex={setActiveLessonPageIndex}
                        />
                    </TabPanel>
                    <TabPanel value="1" keepMounted>
                        <Practice />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    );
}
