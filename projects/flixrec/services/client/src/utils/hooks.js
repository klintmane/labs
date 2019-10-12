import { useEffect, useState } from "react";
import { orderedStringify } from "~/utils";

const loadingState = (value = {}) => ({
  loading: true,
  value,
  error: undefined
});

const valueState = (value = {}) => ({
  loading: false,
  value,
  error: undefined
});

const errorState = error => ({
  loading: false,
  value: {},
  error: error
});

const useAsyncState = ({ callOnMount = true, mapValues = value => value }) => {
  const [state, setState] = useState(
    callOnMount ? loadingState() : valueState()
  );

  return {
    value: state,
    setLoading: () => setState(loadingState(state.value)),
    setValue: value => setState(valueState(mapValues(value, state.value))),
    setError: error => setState(errorState(error))
  };
};

export const useAsync = (asyncFn = () => {}, config = {}) => (...params) => {
  const asyncState = useAsyncState(config);

  // callOnMount  - skip the initial async fn call when the component is mounted
  // callOnChange - call the async fn automatically every time the params change
  const { callOnMount = true, callOnChange = false } = config;
  const watching = callOnChange ? [orderedStringify(params)] : [];

  const handleAsync = (...overrideParams) => {
    // TODO: Fix bad loading state
    if (true /*!asyncState.value.loading*/) {
      asyncState.setLoading();
    }

    const p = overrideParams.length > 0 ? overrideParams : params;

    asyncFn(...p)
      .then(result => {
        asyncState.setValue(result);
      })
      .catch(error => {
        asyncState.setError(error);
      });
  };

  // Only use this effect once (second arg is an empty array, so it won't be re-run on changes)
  // We could change this to the params vararg array, so each time the params change, we reuse the effect
  useEffect(() => {
    callOnMount && handleAsync();
  }, watching);

  return {
    ...asyncState.value,
    call: handleAsync
  };
};
