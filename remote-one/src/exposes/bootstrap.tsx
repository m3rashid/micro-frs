import ReactDOM from 'react-dom/client';

type SDK = string;
type SDKState = string;

export const mount = async (params: {
  sdk: SDK;
  state: SDKState;
  element: HTMLElement;
  mount: any;
}) => {
  const { element, mount: App, sdk, state } = params;

  const root = ReactDOM.createRoot(element);
  root.render(<App sdk={sdk} state={state} />);

  return () => root.unmount();
};
