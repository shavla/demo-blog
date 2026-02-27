// src/components/SessionConflictPopup.tsx
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../customHooks/AuthHook";
import { getSocket } from "../utils/socketService";
import { useNavigate } from "react-router-dom";

const SessionConflictPopup = () => {
    const [visible, setVisible] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        setVisible(false);
        logout();
        navigate("/login");
    }, [logout, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return; // don't listen if not logged in

        const socket = getSocket();

        socket.on("session_conflict", () => {
            setVisible(true);
            setCountdown(30);
        });

        return () => {
            socket.off("session_conflict");
        };
    }, [isAuthenticated]);
    // Countdown timer — auto logout when it hits 0
    useEffect(() => {
        if (!visible) return;

        if (countdown === 0) {
            handleLogout();
            return;
        }

        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [visible, countdown, handleLogout]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-xl font-bold mb-3">New Login Detected</h2>
                <p className="text-gray-600 mb-6">
                    Your account was signed in from another device.
                    You will be logged out in{" "}
                    <span className="font-bold text-red-500">{countdown}s</span>.
                </p>
                <button
                    onClick={handleLogout}
                    className="btn btn-error w-full text-white"
                >
                    OK, Log Me Out
                </button>
            </div>
        </div>
    );
};

export default SessionConflictPopup;