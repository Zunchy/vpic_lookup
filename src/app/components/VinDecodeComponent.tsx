"use client";

import { useEffect, useState } from "react";
import { VinResult } from "../models/vin-result";
import { decodeVin } from "../services/vpic.service";
import { useTitleLayoutContext } from "./TitleLayoutProvider";
import { motion } from "framer-motion";

export default function VinDecodeComponent() {
  const { setTitle } = useTitleLayoutContext();

  const [vinValue, setVinValue] = useState("");
  const [decodedResults, setDecodedResults] = useState<[VinResult] | null>(
    null,
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultPageTitle =
    "Enter VIN Number Below and Decode to see Results!";

  useEffect(() => {
    setTitle(defaultPageTitle);
  }, []);

  const handleVinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVinValue(event.target.value);
  };

  const invokeDecodeVin = async () => {
    if (!vinValue) {
      return;
    }

    setLoading(true);

    const result = await decodeVin(vinValue);

    if (result.success && result.data !== undefined) {
      setTitle(`Showing Results for VIN: ${vinValue}`);
      setDecodedResults(result.data);
      setError(false);
    } else {
      setError(true);
      console.log(result.error);
    }

    setLoading(false);
  };

  const resetPage = async () => {
    setVinValue("");
    setDecodedResults(null);
    setTitle(defaultPageTitle);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {!loading && !decodedResults && (
        <div className="flex w-full flex-col items-center gap-8">
          <input
            value={vinValue}
            onChange={handleVinChange}
            className="shadow-m h-12 w-full rounded rounded-lg border-2 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-center text-2xl transition duration-300 focus:bg-white dark:focus:bg-black"
            placeholder="Enter VIN"
          ></input>

          <button
            onClick={invokeDecodeVin}
            className="w-1/2 rounded border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 font-bold text-black dark:text-white transition duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Decode
          </button>
        </div>
      )}

      {!loading &&
        decodedResults &&
        decodedResults
          .filter((i) => i.value)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex h-fit w-5/6 items-center justify-center sm:rounded sm:rounded-full border border-black dark:border-white p-2 shadow-xl first:mt-6 last:mb-2"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-fit font-bold">
                  {item.variable}:
                </div>
                <div className="w-fit">{item.value}</div>
              </div>
            </motion.div>
          ))}

      {!loading && decodedResults && (
        <button
          onClick={resetPage}
          className="mb-4 w-1/2 rounded border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 font-bold text-black dark:text-white transition duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Decode Another VIN
        </button>
      )}

      {/* from https://v1.tailwindcss.com/components/alerts */}
      {error && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error Decoding Vin</strong>
        </div>
      )}

      {/* from https://flowbite.com/docs/components/spinner/ */}
      {loading && !decodedResults && (
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
  );
}
