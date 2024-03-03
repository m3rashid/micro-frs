const Main = ({ sdk, state }: { sdk: string; state: string }) => {
  console.log('from remote: main', { sdk, state });
  return (
    <div>
      <div>Hello from Main</div>
    </div>
  );
};

export default Main;
