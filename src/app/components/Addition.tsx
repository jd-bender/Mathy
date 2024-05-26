import Arithmetic from "./Arithmetic";

export default function Addition({ minNumber, maxNumber, level }) {
    return (
        <Arithmetic
            type="Addition"
            minNumber={minNumber}
            maxNumber={maxNumber}
            level={level}
        />
    );
}
