'use client';

import { useEffect, useRef, useState } from "react";
import { useTitleLayoutContext } from "./TitleLayoutProvider";
import { Suggestion } from "../models/suggestion";
import { useForm, SubmitHandler } from "react-hook-form"
import { addSuggestion } from "../services/vpic.service";

export default function SuggestionsComponent() {
    const { setTitle } = useTitleLayoutContext();
    const [error, setError] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const defaultPageTitle =
        "Have a Suggestion? Submit it below!";

    const isValidEmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const isValidPhonePattern = new RegExp(/^\d{3}-?\d{3}-?\d{4}$/);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Suggestion>()

    useEffect(() => {
        setTitle(defaultPageTitle);
    }, []);

    const onSubmit: SubmitHandler<Suggestion> = async (formData) => {
        const result = await addSuggestion(formData);

        if (result.success && result.data !== undefined) {
            setTitle('Successfully added Suggestion!');
            setError(false);
            setSubmitEnabled(false);
        } else {
            setError(true);
            console.log(result.error);
        }
    }

    const handleSuggestionsInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 items-center gap-4 border-2 border-black">
                <div className="w-full flex flex-row gap-4">
                    <input className="shadow-m min-h-12 w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        {...register("name", { required: true })}
                        placeholder="Name" />
                </div>
                {errors.name && <p className="text-xs text-red-500 flex items-center mt-2">Enter Name</p>}

                <div className="w-full flex flex-row gap-4">
                    <input className="shadow-m min-h-12 w-2/3 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        {...register("email", { required: true, pattern: isValidEmailPattern })}
                        placeholder="Email" />
                    {errors.email && <p className="text-xs text-red-500 flex items-center mt-2">Enter Valid Email</p>}

                    <input className="shadow-m min-h-12 w-1/3 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                        {...register("phoneNumber", { required: true, pattern: isValidPhonePattern })}
                        placeholder="Phone Number" />
                    {errors.phoneNumber && <p className="text-xs text-red-500 flex items-center mt-2">Enter Valid Phone Number</p>}
                </div>

                <textarea className="shadow-m min-h-12 max-h-[100px] w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                    {...register("suggestion", { required: true })}
                    ref={(el) => {
                        register("suggestion").ref(el);
                        textareaRef.current = el;
                    }}
                    onChange={handleSuggestionsInput}
                    rows={1}
                    placeholder="Suggestion" />
                {errors.suggestion && <p className="text-xs text-red-500 flex items-center mt-2">Enter Suggestion</p>}

                <button
                    disabled={!submitEnabled}
                    type="submit"
                    className="w-1/4 rounded border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 font-bold text-black dark:text-white transition duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                    Submit
                </button>
            </form>

            {/* from https://v1.tailwindcss.com/components/alerts */}
            {error && (
                <div
                    className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                    role="alert"
                >
                    <strong className="font-bold">Error Submitting Suggestion</strong>
                </div>
            )}
        </div >
    )
}