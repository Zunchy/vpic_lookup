import {
    BoltIcon,
    InboxIcon,
    MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="ml-2 mt-6 h-[calc(100vh-48px)] border-r-2 border-black font-sans text-sm">
            <div className="space-y-6">
                <Link
                    href="/vin-decode"
                    className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black"
                >
                    <BoltIcon className="size-6 ml-2 transition duration-300 group-hover:text-white" />
                    <div className="transition duration-300 group-hover:text-white">
                        Vin Decoder
                    </div>
                </Link>
                <Link
                    href="/"
                    className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black"
                >
                    <MagnifyingGlassCircleIcon className="size-6 ml-2 transition duration-300 group-hover:text-white" />
                    <div className="transition duration-300 group-hover:text-white">
                        Vehicle Lookup
                    </div>
                </Link>
                <Link
                    href="/"
                    className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black"
                >
                    <InboxIcon className="size-6 ml-2 transition duration-300 group-hover:text-white" />
                    <div className="transition duration-300 group-hover:text-white">
                        Suggestions
                    </div>
                </Link>
            </div>
        </nav>
    );
}
