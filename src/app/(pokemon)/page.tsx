'use client';

import { cn } from '@/lib/utils';
import { useCount } from '@/lib/useCount';
import { useThemeStore } from '@/store/store';
import React, { useEffect, useState, useSyncExternalStore } from 'react';

//https://medium.com/@jiwoochoics/%EC%96%B4%EC%A9%94-%EC%88%98-%EC%97%86%EB%8A%94-hydration-mismatch%EB%A5%BC-useeffect%EC%97%86%EC%9D%B4-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0-c984c9120f9b
//https://mingos-habitat.tistory.com/76

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const handleStorageChange = () => callback();
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
};

const getSnapshotCount = () => {
  if (typeof window === 'undefined') return null;
  const savedCount = localStorage.getItem('count');
  return savedCount ? Number(savedCount) : 0;
};

const getSnapshotTheme = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isDarkMode') === 'true';
};

// 서버에서도 클라이언트와 동일한 초기값을 유지하도록
const getServerSnapshotTheme = () => false;

export default function HomePage() {
  const savedCount = useSyncExternalStore(subscribe, getSnapshotCount, getSnapshotCount);
  const savedDarkMode = useSyncExternalStore(subscribe, getSnapshotTheme, getServerSnapshotTheme);
  const { count, increment, decrement } = useCount(savedCount ?? 0);
  const { toggleMode, isDarkMode } = useThemeStore();
  const isDark = savedDarkMode ?? isDarkMode;

  // 클라이언트에서만 실행되도록 상태 관리
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('count', count.toString());
      localStorage.setItem('isDarkMode', isDarkMode.toString());
      toggleMode(count >= 5);
    }
  }, [count, isDarkMode]);

  return (
    <div
      className={`${cn(
        isDark ? 'text-white bg-gray-900' : 'text-black bg-white',
        'flex-1 flex flex-col w-full h-full gap-y-2 items-center justify-center',
      )}`}
    >
      <h1>state 사용 테스트</h1>

      <div className="flex gap-x-2 items-center">
        <button className="p-2 bg-blue-500 rounded-md aspect-square text-white" type="button" onClick={increment}>
          +
        </button>
        <span>{isClient ? savedCount : '...'}</span>
        <button className="p-2 bg-blue-500 rounded-md aspect-square text-white" type="button" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}
