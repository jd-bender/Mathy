import { IParent } from "interfaces";

interface ITabPanel extends IParent {
    index: number;
    value: number;
}

export default function TabPanel({ children, index, value }: ITabPanel) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && children}
        </div>
    );
}
