'use client'
import Image from "next/image"

export default function MainNav() {
    return (
        <div className="columns-2 h-40 flex flex-row justfy-evenly items-center">
            <div className="w-2/5 h-16 flex justify-center">
                <Image
                    src="/Images/Logo.png"
                    width={433}
                    height={62}
                    alt="Dashboard DX Logo"
                />
            </div>
            <div className="w-3/5 flex justify-end"><h1>Menu and Login Here</h1></div>
        </div>
    )
}