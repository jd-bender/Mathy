import { IParent } from "interfaces";
import Link from "next/link";

export default function DashboardLayout({ children }: IParent) {
    return (
        <>
            <div className="h-16 flex justify-center items-center bg-palette-1">
                <Link href="/" className="text-3xl font-medium">
                    Mathy
                </Link>
            </div>

            <div>{children}</div>
        </>
    );
}
