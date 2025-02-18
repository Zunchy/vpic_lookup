import { useTitleLayoutContext } from "./TitleLayoutProvider";

export default function Navbar() {
	const { title } = useTitleLayoutContext();

	return (
		<div className="flex h-12 w-full font-bold shadow-xl">
			<div className="fixed flex h-12 w-full items-center justify-center bg-black dark:bg-gray-800 font-bold text-white shadow-xl">
				{title}
			</div>
		</div>
	);
}
