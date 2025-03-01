import { useState } from 'react';

export function useCount(initailValue: number) {
  const [count, setCount] = useState(initailValue);

  const increment = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (count <= 0) return;
    setCount((prev) => prev - 1);
  };
  return { count, setCount, increment, decrement };
}
