import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/vin-decode',
				permanent: true,
			}
		]
	},
};

export default nextConfig;
