"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-6">
                        <div className="max-w-md text-center space-y-6">
                            {/* Glitch Effect Title */}
                            <h1 className="text-4xl font-bold text-red-500 animate-pulse">
                                SYSTEM MALFUNCTION
                            </h1>

                            {/* Error Message */}
                            <p className="text-gray-400 font-mono text-sm">
                                {this.state.error?.message || "An unexpected error occurred in the 3D renderer."}
                            </p>

                            {/* Error Code */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <code className="text-red-400 text-xs break-all">
                                    ERROR_CODE: CANVAS_CRASH_0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
                                </code>
                            </div>

                            {/* Retry Button */}
                            <button
                                onClick={this.handleRetry}
                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30"
                            >
                                REBOOT SYSTEM
                            </button>

                            {/* Subtle Hint */}
                            <p className="text-gray-600 text-xs">
                                If this persists, try refreshing the page or contact support.
                            </p>
                        </div>

                        {/* Scanlines Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-30" />
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
