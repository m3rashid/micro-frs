import { useRef, useEffect, FC } from 'react';
import { isFunction } from 'lodash-es';

type EmbedProps = { name: string; entry: string; mount: string; url: string };

const Embed: FC<EmbedProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const loadRemote = async () => {
    let mount: any = null;
    const module = await import(props.entry);
    const component = await (await module.get(props.mount))();

    if (isFunction(component.mount)) {
      mount = component.mount;
    } else {
      const bootstrap = await (await module.get('bootstrap'))();
      if (isFunction(bootstrap.mount)) {
        mount = bootstrap.mount;
      }
    }

    if (mount && ref.current) {
      const unmount = mount({
        element: ref.current,
        mount: component,
        state: 'StateHello',
        sdk: 'SdkHello',
      });

      if (unmount) {
        console.log('unmount', unmount);
      }
    }
  };

  useEffect(() => {
    loadRemote().catch(console.log);
  }, []);

  return <div ref={ref} />;
};

export default Embed;
