import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Group3 레이아웃입니다</h1>
      {children}
    </div>
  );
}
