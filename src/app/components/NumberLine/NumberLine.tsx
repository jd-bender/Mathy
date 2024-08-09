import Arrow from "./Arrow";
import Notch from "./Notch";

type NumberLineProps = {
    range: Array<number>;
    explanationMode: boolean;
    startPosition?: number;
    endPosition?: number;
    modifier?: number;
};

export default function NumberLine({
    range,
    explanationMode,
    startPosition,
    endPosition,
    modifier,
}: NumberLineProps) {
    const segments = [];

    segments.push(
        <Arrow direction="left" isRangeEnder={false} key={range[0] - 1} />,
    );

    for (let i = range[0]; i <= range[1]; i++) {
        segments.push(
            <Notch
                position={i}
                explanationMode={explanationMode}
                startPosition={startPosition}
                endPosition={endPosition}
                modifier={modifier}
                key={i}
            />,
        );
    }

    segments.push(
        <Arrow direction="right" isRangeEnder={false} key={range[1] + 1} />,
    );

    return (
        <span className="inline-block">
            <span className="bg-black h-1 block relative top-2.5"></span>
            <span className="flex">{segments}</span>
        </span>
    );
}
