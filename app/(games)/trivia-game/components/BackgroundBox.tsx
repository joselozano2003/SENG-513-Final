import React from "react";

interface BackgroundBoxProps {
    children: React.ReactNode;
}

export default function BackgroundBox({ children }: BackgroundBoxProps) {
    return (
        <div className="bg-blue-200 border-5 border-black rounded m-5 p-4 w-full">{children}</div>
    );
}
