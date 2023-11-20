import React from "react";

// assets
import blackBrickBackground from "public/black-brick-wall-textured-background.jpg";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const bgStyling = {
        backgroundImage: `url(${blackBrickBackground.src})`,
        // <a href="https://www.freepik.com/free-photo/black-brick-wall-textured-background_3475675.htm#query=black%20brick%20wall&position=1&from_view=search&track=ais&uuid=b7b18b50-2020-476b-95e9-4440c4d181eb">Image by rawpixel.com</a> on Freepik
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "4vh 3vw",
    };
    return (
        <html lang="en">
            <body>
                <div className="h-screen bg-cover" style={bgStyling}>
                    {children}
                </div>
            </body>
        </html>
    );
}
