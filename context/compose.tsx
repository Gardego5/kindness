import { PropsWithChildren } from "react";

type ProviderWithValue<V> = (
  props: PropsWithChildren<any & { value: V }>
) => JSX.Element;

type ProviderArray = (
  | ProviderWithValue<any>
  | [ProviderWithValue<any>, Object?]
)[];

export const composeProviders =
  (...providers: ProviderArray) =>
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

export const ComposedProviders = ({
  children,
  providers = [],
}: PropsWithChildren<{ providers?: ProviderArray }>) =>
  composeProviders(...providers)({ children });

export default ComposedProviders;
