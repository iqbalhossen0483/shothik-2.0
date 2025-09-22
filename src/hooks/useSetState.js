import { useCallback, useState } from "react";

export default function useSetState(initialValues = []) {
  const [setState, setSetState] = useState(() => new Set(initialValues));

  const add = useCallback((value) => {
    setSetState((prev) => {
      const updated = new Set(prev);
      updated.add(value);
      return updated;
    });
  }, []);

  const remove = useCallback((value) => {
    setSetState((prev) => {
      const updated = new Set(prev);
      updated.delete(value);
      return updated;
    });
  }, []);

  const toggle = useCallback((value) => {
    let nextSet;
    setSetState((prev) => {
      nextSet = new Set(prev);
      nextSet.has(value) ? nextSet.delete(value) : nextSet.add(value);
      return nextSet;
    });
    return nextSet;
  }, []);

  const has = useCallback((value) => setState.has(value), [setState]);

  const reset = useCallback((values = []) => {
    setSetState(new Set(values));
  }, []);

  const clear = useCallback(() => {
    setSetState(new Set());
  }, []);

  const size = setState.size;

  return {
    values: [...setState],
    set: setState,
    add,
    remove,
    toggle,
    has,
    reset,
    clear,
    size,
  };
}
