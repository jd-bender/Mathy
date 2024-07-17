import Arrow from "./Arrow";
import Line from "./Line";
import Notch from "./Notch";

export default function NumberLine({ startPosition, endPosition }) {
    const notches = [];

    notches.push(<Arrow direction="left" key={startPosition - 1} />);

    for (let i = startPosition; i <= endPosition; i++) {
        notches.push(
            <Notch
                position={i}
                isStartPosition={i === startPosition}
                isEndPosition={i === endPosition}
                key={i}
            />,
        );
    }

    notches.push(<Arrow direction="right" key={endPosition + 1} />);

    return (
        <>
            <span className="inline-block">
                <Line />
                <span className="flex flex-row">{notches}</span>
            </span>
        </>
    );
}
