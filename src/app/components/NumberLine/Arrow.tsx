type ArrowProps = {
    direction: string;
    isRangeEnder: boolean;
};

export default function Arrow({ direction, isRangeEnder }: ArrowProps) {
    const rotation = direction === "left" ? "rotate-[135deg]" : "-rotate-45";
    const position = isRangeEnder
        ? "border-green-500 absolute left-6"
        : "border-black relative";
    return (
        <span
            className={`border-solid border-r-4 border-b-4 block p-1 w-1 h-1 top-0.5 ${position} ${rotation}`}
        ></span>
    );
}
