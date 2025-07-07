'use-client'

export default function BottomBar() {

    const year = new Date().getFullYear();

    return(
        <div className="flex items-center !h-[40px] bg-black pl-2 w-full max-w-[1545px]">
            <p className="text-white text-sm">&copy; Copyright {year} D &amp; S Signs Limited - All Rights Reserved</p>
        </div>
    )
}