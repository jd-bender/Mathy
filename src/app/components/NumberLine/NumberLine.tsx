import Arrow from "./Arrow";
import Line from "./Line";
import Notch from "./Notch";

export default function NumberLine({
    range,
    startPosition,
    endPosition,
    modifier,
}) {
    const segments = [];

    segments.push(
        <Arrow direction="left" isRangeEnder={false} key={range[0] - 1} />,
    );

    for (let i = range[0]; i <= range[1]; i++) {
        segments.push(
            <Notch
                position={i}
                isStartPosition={i === startPosition}
                isEndPosition={i === endPosition}
                inRange={i >= startPosition && i < endPosition}
                lastInRange={i === endPosition - 1}
                modifier={modifier}
                key={i}
            />,
        );
    }

    segments.push(
        <Arrow direction="right" isRangeEnder={false} key={range[1] + 1} />,
    );

    return (
        <>
            <span className="inline-block">
                <Line />
                <span className="flex">{segments}</span>
            </span>
        </>
    );
}
