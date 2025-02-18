import {
	BoltIcon,
	InboxIcon,
	MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
	return (
		<nav className="ml-2 mt-6 flex h-[calc(100vh-80px)] flex-col justify-between font-sans text-sm">
			<div className="fixed flex h-[calc(100vh-80px)] w-1/6 flex-col justify-between space-y-6 border-r-2 border-black dark:border-white">
				<div>
					<Link
						href="/vin-decode"
						className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black dark:hover:bg-white"
					>
						<BoltIcon className="ml-2 size-6 transition duration-300 group-hover:text-white dark:group-hover:text-black" />
						<div className="transition duration-300 group-hover:text-white dark:group-hover:text-black">
							Vin Decoder
						</div>
					</Link>
					<Link
						href="/"
						className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black dark:hover:bg-white"
					>
						<MagnifyingGlassCircleIcon className="ml-2 size-6 transition duration-300 group-hover:text-white dark:group-hover:text-black" />
						<div className="transition duration-300 group-hover:text-white dark:group-hover:text-black">
							Vehicle Lookup
						</div>
					</Link>
					<Link
						href="/suggestions"
						className="group mr-2 flex h-10 cursor-pointer items-center gap-6 rounded transition duration-300 hover:bg-black dark:hover:bg-white"
					>
						<InboxIcon className="ml-2 size-6 transition duration-300 group-hover:text-white dark:group-hover:text-black" />
						<div className="transition duration-300 group-hover:text-white dark:group-hover:text-black">
							Suggestions
						</div>
					</Link>
				</div>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
