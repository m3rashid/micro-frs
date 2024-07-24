import { useCallback, useRef, useState } from "react";
import { Mount } from "./types";
import { useDidMount } from "./didMount";
import ErrorBoundary from "./errorBoundary";

export type UiEmbed = {
	name: string;
	entry: string;
	mount: string;
	id: string;
	packageName: string;
	options?: {
		noPadding?: boolean;
		noHeader?: boolean;
		sizes?: string[];
	};
	params?: Record<string, any> | null;
	url: string;
	config: Record<string, any>;
};

const useEmbedData = ({ embed }: { embed: UiEmbed }) => {
	const embedRef = useRef<HTMLDivElement>(null);
	const [unmountFunctions, setUnmountFunctions] = useState<(() => void)[]>([]);

	const loadRemote = useCallback(async () => {
		let mount: Mount | null = null;
		const module = await import(/* @vite-ignore */ embed.entry);
		const componentLoader = await module.get(embed.mount);
		const component = await componentLoader();

		if (typeof component.mount === "function") mount = component.mount;
		else {
			const bootstrapLoader = await module.get("init");
			const bootstrap = await bootstrapLoader();
			if (typeof bootstrap.mount === "function") mount = bootstrap.mount;
		}

		if (mount && embedRef.current) {
			const unmount = await mount({
				mount: component,
				element: embedRef.current,
				state: { randomkey: "this is a state" },
				sdk: { sayHello: (name: string) => window.alert(name) },
			});

			if (unmount) setUnmountFunctions((prev) => [...prev, unmount]);
		}
	}, [embed]);

	useDidMount(() => {
		loadRemote();
	}, [embed]);

	useDidMount(() => {
		return () => {
			unmountFunctions.forEach((func) => {
				try {
					if (func) func();
				} catch (e) {
					console.log(e);
				}
			});
		};
	}, [unmountFunctions]);

	return { embedRef };
};

const Embed = (props: { embed: UiEmbed }) => {
	const { embedRef } = useEmbedData(props);

	return (
		<div id={`embed-${props.embed.id}`}>
			<div ref={embedRef} />
		</div>
	);
};

const LocationEmbed = () => {
	const [embed, setEmbed] = useState<UiEmbed | null>(null);

	useDidMount(() => {
		const loadEmbed = async () => {
			try {
				const res = await fetch("/config/app1/manifest.json");
				const data = await res.json();
				setEmbed({ ...data, mount: "hello", id: "hello", url: "" });
			} catch (err) {
				return { embed: null, path: "" };
			}
		};
		loadEmbed();
	}, []);

	if (!embed) return <div>Loading...</div>;
	return (
		<ErrorBoundary>
			<Embed embed={embed} />
		</ErrorBoundary>
	);
};

export default LocationEmbed;
