import "../globals.css";
import { IParent } from "interfaces";

export default function RootLayout({ children }: IParent) {
    return (
        <html lang="en" className="h-full">
            <head>
                <title>Mathy</title>
            </head>
            <body className="bg-palette-2 h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
