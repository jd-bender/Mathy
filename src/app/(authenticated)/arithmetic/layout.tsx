import { ReactNode } from "react";

export default function ArithmeticLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="m-8 p-4 rounded-lg bg-palette-3">{children}</div>;
}
