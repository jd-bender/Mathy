import { IParent } from "interfaces";
import Link from "next/link";

export default function DashboardLayout({ children }: IParent) {
    return (
        <>
            <div className="h-16 w-full text-center relative bg-palette-1">
                <Link href="/" className="text-3xl font-medium relative top-3">
                    Mathy
                </Link>
            </div>

            <>{children}</>
        </>
    );
}
