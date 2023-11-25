import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trivia Game",
    description: "Generated by create next app",
};

export default function RootLayout( { children }: { children: React.ReactNode }) {
    const bgStyling = {
        padding: "2vh 1vw"
    }
  return (
    <html lang="en">
        <body>
            <div style={bgStyling}>
                {children}
            </div>
        </body>
    </html>
  )
}
