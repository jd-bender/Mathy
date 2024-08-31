import Dot from "./Dot";
import Arrow from "./Arrow";

type NotchProps = {
    position: number;
    explanationMode: boolean;
    startPosition: number;
    endPosition: number;
    modifier: number;
};

export default function Notch({
    position,
    explanationMode,
    startPosition,
    endPosition,
    modifier,
}: NotchProps) {
    const isStartPosition = position === startPosition;
    const isEndPosition = position === endPosition;

    const lineDirection = position >= startPosition ? "right" : "left";

    const startAndEndSelected =
        typeof startPosition === "number" && typeof endPosition === "number";

    const inRange =
        lineDirection === "right"
            ? position >= startPosition && position < endPosition
            : position < startPosition && position >= endPosition;
    const greenHorizontalLineActive = startAndEndSelected ? inRange : false;

    const lastNotchInRange =
        lineDirection === "right"
            ? position === endPosition - 1
            : position === endPosition;

    const GreenHorizontalLine = () => (
        <span
            className={`bg-green-500 h-1 absolute top-1.5 w-7 z-10 ${lineDirection === "right" ? "left-3" : "left-5"}`}
        ></span>
    );
    const BlackVerticalLine = () => (
        <span className="bg-black w-1 h-4 block z-0"></span>
    );

    return (
        <span className="flex flex-col items-center relative">
            <Dot
                explanationMode={explanationMode}
                autoSelected={isStartPosition || isEndPosition}
                position={position}
                startPosition={startPosition}
                endPosition={endPosition}
            />

            {greenHorizontalLineActive && <GreenHorizontalLine />}

            {lastNotchInRange && modifier !== 0 && (
                <Arrow direction={lineDirection} isRangeEnder={true} />
            )}

            <span className="flex flex-col items-center w-[1.75rem]">
                <BlackVerticalLine />
                <span>{position}</span>
            </span>
        </span>
    );
}
