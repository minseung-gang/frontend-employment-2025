import React from 'react';

export default function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Group2 레이아웃입니다.</h1>
      {children}
    </div>
  );
}
