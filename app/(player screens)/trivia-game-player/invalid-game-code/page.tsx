import React from 'react'
import Link from 'next/link'

// Page that is displayed when the game code is invalid
export default function page() {
  return (
    <div className="text-white text-center font-bold">
        <p>I&apos;m sorry, but the game code you entered is either invalid or has reached the maximum number of players allowed.</p>
        <Link href="/trivia-game-player">Please click here to retry.</Link>
    </div>
  )
}
