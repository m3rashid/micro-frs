import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		federation({ shared: ["react", "react-dom"] }),
	],
	base: "/app",
	server: {
		proxy: {
			"/app/apps": {
				target: "http://localhost:4001",
				changeOrigin: false,
				secure: false,
				// rewrite: (path) => path.replace(/^\/app/, ""),
			},
			"/config": {
				target: "http://localhost:4001",
				changeOrigin: false,
			},
		},
	},
	build: {
		modulePreload: true,
		target: "esnext",
		minify: true,
		cssCodeSplit: false,
	},
});
