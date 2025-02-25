'use client';

import { useEffect, useRef, useState } from "react";
import { useTitleLayoutContext } from "./TitleLayoutProvider";
import { Suggestion } from "../models/suggestion";
import { useForm, SubmitHandler } from "react-hook-form"
import { addSuggestion } from "../services/vpic.service";

export default function SuggestionsComponent() {
    const { setTitle } = useTitleLayoutContext();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        const result = await addSuggestion(formData);

        if (result.success && result.data !== undefined) {
            setTitle('Successfully added Suggestion!');
            setError(false);
            setSubmitEnabled(false);
        } else {
            setError(true);
            console.log(result.error);
        }

        setLoading(false);
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
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 items-center gap-4 border-2 border-black dark:border-white">
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full">
                            <input className="shadow-m min-h-12 w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                                {...register("name", { required: true })}
                                placeholder="Name" />
                        </div>
                        {errors.name && <p className="text-xs text-red-500 flex items-center">Enter Name</p>}
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-2/3 flex flex-col items-center">
                            <input className="w-full shadow-m min-h-12 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                                {...register("email", { required: true, pattern: isValidEmailPattern })}
                                placeholder="Email" />
                            {errors.email && <p className="text-xs text-red-500 flex items-center">Enter Valid Email</p>}
                        </div>

                        <div className="w-full sm:w-1/3 flex flex-col items-center">
                            <input className="w-full shadow-m min-h-12 rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                                {...register("phoneNumber", { required: true, pattern: isValidPhonePattern })}
                                placeholder="Phone Number" />
                            {errors.phoneNumber && <p className="text-xs text-red-500 flex items-center">Enter Valid Phone Number</p>}
                        </div>
                    </div>

                    <div className="max-h-[100px] w-full flex flex-col items-center">
                        <textarea className="shadow-m min-h-12 max-h-[100px] w-full rounded rounded-lg resize-none border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-m transition duration-300 focus:bg-white dark:focus:bg-black"
                            {...register("suggestion", { required: true })}
                            ref={(el) => {
                                register("suggestion").ref(el);
                                textareaRef.current = el;
                            }}
                            onChange={handleSuggestionsInput}
                            rows={1}
                            placeholder="Suggestion" />
                        {errors.suggestion && <p className="text-xs text-red-500 flex items-center">Enter Suggestion</p>}
                    </div>

                    <button
                        disabled={!submitEnabled}
                        type="submit"
                        className="w-full sm:w-1/4 rounded border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 font-bold text-black dark:text-white transition duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                        Submit
                    </button>
                </form>
            }

            {/* from https://v1.tailwindcss.com/components/alerts */}
            {error && (
                <div
                    className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                    role="alert"
                >
                    <strong className="font-bold">Error Submitting Suggestion</strong>
                </div>
            )}
            {/* from https://flowbite.com/docs/components/spinner/ */}
            {loading && (
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="h-14 w-14 animate-spin fill-black dark:fill-white text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    )
}