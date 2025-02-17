import { useTitleLayoutContext } from "./TitleLayoutProvider";

export default function Navbar() {
    const { title } = useTitleLayoutContext();

    return (
        <div className="flex h-12 w-full font-bold shadow-xl">
            <div className="fixed flex h-12 w-full bg-black text-white items-center font-bold justify-center shadow-xl">
                {title}
            </div>
        </div>
    );
}
