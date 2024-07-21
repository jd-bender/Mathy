import Dot from "./Dot";
import Arrow from "./Arrow";

type NotchProps = {
    position: number;
    explanationMode: boolean;
    isStartPosition: boolean;
    isEndPosition: boolean;
    inRange: boolean;
    lastInRange: boolean;
    modifier: number;
    resetState?: boolean;
};

export default function Notch({
    position,
    explanationMode,
    isStartPosition,
    isEndPosition,
    inRange,
    lastInRange,
    modifier,
    resetState,
}: NotchProps) {
    console.log("resetState in notch: " + resetState);
    return (
        <span className="flex flex-col items-center relative">
            <Dot
                explanationMode={explanationMode}
                autoSelected={isStartPosition || isEndPosition}
                resetState={resetState}
            />

            {explanationMode && (
                <>
                    {inRange && (
                        <span className="bg-green-500 h-1 absolute top-1.5 left-3 w-7 z-40"></span>
                    )}

                    {lastInRange && modifier !== 0 && (
                        <Arrow direction="right" isRangeEnder={true} />
                    )}
                </>
            )}

            <span className="flex flex-col items-center w-[1.75rem]">
                <span className="bg-black w-1 h-4 block"></span>
                <span>{position}</span>
            </span>
        </span>
    );
}
