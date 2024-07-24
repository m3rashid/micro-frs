export interface MountParams<T = any> {
	// sdk: SDK;
	// state: SDKState;
	sdk: any;
	state: any;
	element: HTMLElement;
	mount: T;
}

export type Mount<T = any> = (params: MountParams<T>) => Promise<() => void>;

export interface ReactExposeProps {
	// sdk: SDK;
	// state: SDKState;
	sdk: any;
	state: any;
}

export type ReactExpose = (props: ReactExposeProps) => JSX.Element | null;
export type ReactMount = Mount<ReactExpose>;
