import { PropsWithChildren } from "react";

type Wrapper = (props: PropsWithChildren<any>) => JSX.Element;

type WrapperArray = (Wrapper | [Wrapper, PropsWithChildren<any>?])[];

export const composeProviders =
  (...providers: WrapperArray) =>
  ({ children }: PropsWithChildren) => {
    const [currentProvider, ...restProviders] = providers;

    const [CurrentProvider, props = {}] = Array.isArray(currentProvider)
      ? currentProvider
      : [currentProvider];

    return restProviders.length > 0 ? (
      <CurrentProvider {...props}>
        {composeProviders(...restProviders)({ children })}
      </CurrentProvider>
    ) : (
      <CurrentProvider {...props}>{children}</CurrentProvider>
    );
  };

/**
 * Composes multiple Providers / Layouts / Wrapper components into a single
 * component.
 */
export const Composer = ({
  children,
  wrappers = [],
}: PropsWithChildren<{ wrappers?: WrapperArray }>): JSX.Element =>
  composeProviders(...wrappers)({ children });

export default Composer;
