import { useState } from "react";

export default function Notch(props) {
    const [position] = useState(props.position);

    return (
        <span className="flex flex-col items-center w-7">
            <span className="bg-black w-1 h-4 block"></span>
            <span>{position}</span>
        </span>
    );
}
