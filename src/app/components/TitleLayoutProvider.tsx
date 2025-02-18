"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface TitleLayoutContext {
	title: string;
	setTitle: (title: string) => void;
}

const LayoutContext = createContext<TitleLayoutContext>({
	title: "Home",
	setTitle: () => {},
});

export function TitleLayoutProvider({ children }: { children: ReactNode }) {
	const [title, setTitle] = useState("Home");

	return (
		<LayoutContext.Provider value={{ title, setTitle }}>
			{children}
		</LayoutContext.Provider>
	);
}

export function useTitleLayoutContext() {
	return useContext(LayoutContext);
}
