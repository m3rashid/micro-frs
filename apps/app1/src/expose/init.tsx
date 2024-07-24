import ReactDOM from "react-dom/client";
import { ReactMount } from "../types";

export const mount: ReactMount = async (props) => {
	const root = ReactDOM.createRoot(props.element);
	root.render(<props.mount sdk={props.sdk} state={props.state} />);

	return () => root.unmount();
};
