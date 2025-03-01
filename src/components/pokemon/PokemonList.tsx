'use client';

import { usePokemons } from '@/lib/usePokemons';
import React from 'react';
import PokemonListUI from './PokemonListUI';
import { useInfiniteScroll } from '@/lib/useInfiniteScroll';

export default function PokemonList() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetching } = usePokemons();
  const loader = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetching });
  if (isLoading || !data || error) {
    return null;
  }

  return (
    <div>
      <PokemonListUI {...{ data, loader, isFetching }} />
    </div>
  );
}
