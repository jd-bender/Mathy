import Arrow from "./Arrow";
import Line from "./Line";
import Notch from "./Notch";

export default function NumberLine({ range, startPosition, endPosition }) {
    const notches = [];

    notches.push(<Arrow direction="left" key={range[0] - 1} />);

    for (let i = range[0]; i <= range[1]; i++) {
        notches.push(
            <Notch
                position={i}
                isStartPosition={i === startPosition}
                isEndPosition={i === endPosition}
                key={i}
            />,
        );
    }

    notches.push(<Arrow direction="right" key={range[1] + 1} />);

    return (
        <>
            <span className="inline-block">
                <Line />
                <span className="flex flex-row">{notches}</span>
            </span>
        </>
    );
}
