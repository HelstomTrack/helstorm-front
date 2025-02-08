import React from "react";

interface VideoProps {
    children: React.ReactNode;
}

export default function BackgroundVideo({ children }: VideoProps) {
    return (
        <div className="relative w-full">
            <div className="relative w-full h-screen ">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/bg-sport.mp4" type="video/mp4" />
                </video>

                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
