"use client";

import React from "react";

interface LogoutButtonProps {
    onLogout: () => void;
}


export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <button
            onClick={ onLogout }
            className="h-12 bg-green-500 rounded-sm text-white px-4 py-3 outline-none shadow-lg transform active:scale-x-75 hover:bg-green-600 transition-transform mx-2 flex"
        >
            Logout
        </button>
    )
}