import { Suspense, LazyExoticComponent, ComponentType, ReactNode, JSX } from 'react';

import Loader, { LoaderProps } from './Loader';

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<ReactNode>) => (props: LoaderProps) => (
    <Suspense fallback={<Loader />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
