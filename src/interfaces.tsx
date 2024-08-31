import { ReactNode } from "react";

export interface IParent {
    readonly children: ReactNode;
}

export interface ILesson {
    activePageIndex: number;
    readonly setActivePageIndex: Function;
}
