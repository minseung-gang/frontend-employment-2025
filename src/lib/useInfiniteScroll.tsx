'use client';

import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
}: {
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult>;
}) {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    //IntersectionObserver를 사용하여 로더를 감지(뷰 포트 내에 들어왔는지)하는 옵저버 객체 생성
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 감시중인지 체크
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          console.log('체크');
          fetchNextPage();
        }
      });
    }, options);

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return loader;
}
