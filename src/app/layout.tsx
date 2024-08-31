import "../globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Mathy</title>
            </head>
            <body className="bg-palette-2">{children}</body>
        </html>
    );
}
