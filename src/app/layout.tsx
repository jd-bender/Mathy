import "../globals.css";
import { IParent } from "interfaces";

export default function RootLayout({ children }: IParent) {
    return (
        <html lang="en">
            <head>
                <title>Mathy</title>
            </head>
            <body className="bg-palette-2 flex flex-col h-screen">
                {children}
            </body>
        </html>
    );
}
