import React from 'react';

interface TempButtonProps {
    onClick: () => void;
}

export default function TempButton({ onClick }: TempButtonProps) {
    return (
        <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded mt-5">
            Start/Restart Question Timer (temporary)
        </button>
    );
}
