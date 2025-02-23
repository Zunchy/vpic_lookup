"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import TitleBar from "./components/TitleBar";
import { TitleLayoutProvider } from "./components/TitleLayoutProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="dark" lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body
				className={`flex bg-white text-black dark:bg-black dark:text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TitleLayoutProvider>
					<div className="felx w-full flex-col">
						<div className="w-full">
							<TitleBar />
						</div>
						<div className="flex flex-col sm:flex-row">
							<div className="w-full sm:w-1/6 h-full">
								<Navbar />
							</div>
							<div className="flex w-full sm:w-5/6 items-center justify-center">
								{children}
							</div>
						</div>
					</div>
				</TitleLayoutProvider>
			</body>
		</html>
	);
}
