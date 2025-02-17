import { VinResult } from "../models/vin-result";

const baseRoute = "http://127.0.0.1:5000/api";

export async function decodeVin(param: string) {
    try {
        const response = await fetch(`${baseRoute}/decodeVin/${param}`);
        if (!response.ok) {
            return { success: false, error: `Error: ${response.status} ${response.statusText}` };
        }

        const data: [VinResult] = await response.json();
        console.log(data);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}