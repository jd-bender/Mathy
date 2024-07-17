export default function Arrow({ direction }) {
    const rotation = direction === "left" ? "rotate-[135deg]" : "-rotate-45";

    return (
        <span
            className={
                "border-solid border-black border-r-4 border-b-4 block p-1 w-1 h-1 relative top-0.5" +
                " " +
                rotation
            }
        ></span>
    );
}
