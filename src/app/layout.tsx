'use client';

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
			<head></head>
			<body
				className={`bg-white dark:bg-black text-black dark:text-white flex ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TitleLayoutProvider>
					<div className="felx flex-col w-full">
						<div className="w-full">
							<TitleBar />
						</div>
						<div className="flex flex-row">
							<div className="w-1/6">
								<Navbar />
							</div>
							<div className="flex w-5/6 items-center justify-center">
								{children}
							</div>
						</div>
					</div>
				</TitleLayoutProvider>
			</body>
		</html>
	);
}