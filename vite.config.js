import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const target = "http://localhost:5000/api";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target,
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
