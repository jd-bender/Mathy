import { useState } from "react";
import Line from "./Line";
import Notch from "./Notch";

export default function NumberLine({ start, end }) {
    const [startPosition] = useState(start);
    const [endPosition] = useState(end);

    const notches = [];

    for (let i = startPosition; i <= endPosition; i++) {
        notches.push(<Notch position={i} key={i} />);
    }

    return (
        <span className="inline-block">
            <Line />
            <span className="flex flex-row space-x-4">{notches}</span>
        </span>
    );
}
