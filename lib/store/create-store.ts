"use client";

import { createContext, useContext, useRef, useState, useEffect, createElement } from 'react';
import type { PropsWithChildren } from 'react';

export interface Store<T> {
  get: () => T;
  set: (partial: Partial<T>) => void;
  subscribe: (callback: () => void) => () => void;
}

export function createStore<T>(createState: (set: (partial: Partial<T>) => void) => T) {
  const StoreContext = createContext<Store<T> | null>(null);

  function Provider({ children }: PropsWithChildren) {
    const store = useRef<Store<T>>();

    if (!store.current) {
      const listeners = new Set<() => void>();
      let state: T;

      store.current = {
        get: () => state,
        set: (partial) => {
          state = { ...state, ...partial };
          listeners.forEach((listener) => listener());
        },
        subscribe: (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
      };

      state = createState(store.current.set);
    }

    return createElement(StoreContext.Provider, null, children);
  }

  function useStore<S>(selector: (state: T) => S): S {
    const store = useContext(StoreContext);
    if (!store) throw new Error('Store not found');

    const [state, setState] = useState(() => selector(store.get()));

    useEffect(() => {
      return store.subscribe(() => setState(selector(store.get())));
    }, [store, selector]);

    return state;
  }

  return [Provider, useStore] as const;
}