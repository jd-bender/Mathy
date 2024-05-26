import Arithmetic from "./Arithmetic";

export default function Subtraction({ minNumber, maxNumber, level }) {
    return (
        <Arithmetic
            type="Subtraction"
            minNumber={minNumber}
            maxNumber={maxNumber}
            level={level}
        />
    );
}
