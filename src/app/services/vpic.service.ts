import { Suggestion } from "../models/suggestion";
import { VinResult } from "../models/vin-result";

const baseRoute = "http://127.0.0.1:5000/api";

export async function decodeVin(param: string) {
	try {
		const response = await fetch(`${baseRoute}/decodeVin/${param}`);
		if (!response.ok) {
			return {
				success: false,
				error: `Error: ${response.status} ${response.statusText}`,
			};
		}

		const data: [VinResult] = await response.json();

		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function addSuggestion(suggestion: Suggestion) {
	try {
		const response = await fetch(`${baseRoute}/suggestion`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(suggestion)
		});

		if (!response.ok) {
			return {
				success: false,
				error: `Error: ${response.status} ${response.statusText}`,
			};
		}

		const data: [Suggestion] = await response.json();

		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}