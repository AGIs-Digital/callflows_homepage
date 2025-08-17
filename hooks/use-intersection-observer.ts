"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverResult {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver(
  props: UseIntersectionObserverProps = {}
): [RefObject<HTMLDivElement>, UseIntersectionObserverResult] {
  const { threshold = 0, rootMargin = "0px", freezeOnceVisible = false } = props;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const frozen = isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const element = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !element) return;

    const observerParams = { threshold, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, frozen]);

  return [elementRef, { isIntersecting, entry }];
}
