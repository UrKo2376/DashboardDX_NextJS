'use-client'

export default function BottomBar() {

    const year = new Date().getFullYear();

    return(
        <div className="flex items-center h-12 bg-black pl-40">
            <p className="text-white">&copy; Copyright {year} D &amp; S Signs Limited - All Rights Reserved</p>
        </div>
    )
}