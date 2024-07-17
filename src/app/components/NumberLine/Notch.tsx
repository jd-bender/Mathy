// import Dot from "./Dot";

export default function Notch({ position, isStartPosition, isEndPosition }) {
    return (
        <span className="flex flex-col items-center w-7">
            {isStartPosition && <></>}
            {isEndPosition && <></>}
            <span className="bg-black w-1 h-4 block"></span>
            <span>{position}</span>
        </span>
    );
}
