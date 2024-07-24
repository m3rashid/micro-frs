import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		federation({
			shared: ["react", "react-dom"],
			exposes: {
				init: "./src/expose/init",
				hello: "./src/expose/hello",
			},
		}) as any,
	],
	build: {
		modulePreload: true,
		target: "esnext",
		minify: true,
		cssCodeSplit: false,
	},
});
