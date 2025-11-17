import { Suspense, type ComponentType, type LazyExoticComponent, type FC } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
});

export const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

type LazyCT<P> = LazyExoticComponent<ComponentType<P>>;

const Loadable =
    <P extends object>(Component: ComponentType<P> | LazyCT<P>): FC<P> =>
    (props: P) => {
        const Comp = Component as ComponentType<P>;
        return (
            <Suspense fallback={<Loader />}>
                <Comp {...props} />
            </Suspense>
        );
    };

export default Loadable;
