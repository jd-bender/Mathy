import Dot from "./Dot";

export default function Notch({ position, isStartPosition, isEndPosition }) {
    console.log(isEndPosition);
    return (
        <span className="flex flex-col items-center">
            <Dot visibility={isStartPosition ? "visible" : "invisible"} />

            <span className="flex flex-col items-center w-7 mt-1">
                <span className="bg-black w-1 h-4 block"></span>
                <span>{position}</span>
            </span>
        </span>
    );
}
