import Arithmetic from "app/components/Arithmetic";

export default function Page() {
    return (
        <Arithmetic type="Subtraction" minNumber={0} maxNumber={9} level={1} />
    );
}
