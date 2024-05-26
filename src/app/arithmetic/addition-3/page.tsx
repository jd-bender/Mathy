import Arithmetic from "app/components/Arithmetic";

export default function Page() {
    return (
        <Arithmetic type="Addition" minNumber={100} maxNumber={999} level={3} />
    );
}
