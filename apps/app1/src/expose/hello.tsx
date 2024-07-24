import { ReactExpose } from "../types";

const Hello: ReactExpose = (props) => {
	return (
		<div style={{ backgroundColor: "red" }}>
			<h1>Hello World, from App1 Hello</h1>
			<pre>{JSON.stringify(props.state, null, 2)}</pre>
		</div>
	);
};

export default Hello;
