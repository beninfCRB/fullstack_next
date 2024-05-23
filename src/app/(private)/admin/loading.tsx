"use client"

import LoadingSVG from "@/components/loading-svg";

export default function LoadingMainPage() {
    return (
        <div
            className="max-w-max mx-auto flex justify-center items-center min-h-screen"
        >
            <LoadingSVG />
        </div>
    );
}
