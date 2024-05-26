import Arithmetic from "app/components/Arithmetic";

export default function Page() {
    return (
        <Arithmetic
            type="Subtraction"
            minNumber={100}
            maxNumber={999}
            level={3}
        />
    );
}
