'use client';

import { useEffect, useRef } from "react";
import { useTitleLayoutContext } from "./TitleLayoutProvider";

export default function SuggestionsComponent() {
    const { setTitle } = useTitleLayoutContext();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const defaultPageTitle =
        "Have a Suggestion? Submit it below!";

    useEffect(() => {
        setTitle(defaultPageTitle);
    }, []);

    function submit(formData) {
        const suggestionText = formData.get("suggestionText");
        alert(`You suggested: '${suggestionText}'`);
    }

    const handleSuggestionsInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const validateEmail = () => {
        // TODO - Ensure email format is valid
    };

    const validatePhoneNumber = () => {
        // TODO - Ensure phone number format is valid
    };

    return (
        <div className="w-full flex items-center justify-center">
            <form action={submit} className="flex flex-col p-4 items-center gap-4 border-2 border-black">
                <div className="w-full flex flex-row gap-4">
                    <input className="shadow-m min-h-12 w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        name="name"
                        placeholder="Name" />
                </div>
                <div className="w-full flex flex-row gap-4">
                    <input className="shadow-m min-h-12 w-2/3 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        name="email"
                        onChange={validateEmail}
                        placeholder="Email" />

                    <input className="shadow-m min-h-12 w-1/3 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        name="phoneNumber"
                        onChange={validatePhoneNumber}
                        placeholder="Phone Number" />
                </div>
                <textarea className="shadow-m min-h-12 max-h-[100px] w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                    ref={textareaRef}
                    name="suggestionText"
                    onChange={handleSuggestionsInput}
                    rows={1}
                    placeholder="Suggestion" />
                <button type="submit" className="w-1/4 rounded border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 font-bold text-black dark:text-white transition duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                    Submit
                </button>
            </form>
        </div >
    )
}