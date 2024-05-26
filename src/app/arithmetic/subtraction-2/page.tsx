import Arithmetic from "app/components/Arithmetic";

export default function Page() {
    return (
        <Arithmetic
            type="Subtraction"
            minNumber={10}
            maxNumber={99}
            level={2}
        />
    );
}
