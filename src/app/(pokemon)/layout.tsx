import React from 'react';

export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>Group1 레이아웃입니다</h1>
      {children}
    </div>
  );
}
