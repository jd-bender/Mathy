import Dot from "./Dot";
import Arrow from "./Arrow";

export default function Notch({
    position,
    isStartPosition,
    isEndPosition,
    inRange,
    lastInRange,
    modifier,
}) {
    return (
        <span className="flex flex-col items-center relative">
            <Dot selected={isStartPosition || isEndPosition} />
            {inRange && (
                <span className="bg-green-500 h-1 absolute top-1.5 left-3 w-7 z-40"></span>
            )}

            {lastInRange && modifier !== 0 && (
                <Arrow direction="right" isRangeEnder={true} />
            )}
            <span className="flex flex-col items-center w-[1.75rem]">
                <span className="bg-black w-1 h-4 block"></span>
                <span>{position}</span>
            </span>
        </span>
    );
}
