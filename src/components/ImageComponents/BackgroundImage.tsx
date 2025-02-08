import React from "react";

interface VideoProps {
    children: React.ReactNode;
    className?: string;
    imgSrc: string;
}

export default function BackgroundImage({ children, className, imgSrc }: VideoProps) {
    return (
        <div className="relative w-full">
            <div className="relative w-full h-screen ">
                <img className={className} src={imgSrc} alt="background" />
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
