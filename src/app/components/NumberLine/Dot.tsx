export default function Dot({ selected }) {
    return (
        <span
            className={`h-3 w-3 bg-green-500 rounded-full absolute top-0.5 ${selected ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
        ></span>
    );
}
