import { Pokemon } from '@/app/types/pokemon';
import React, { RefObject } from 'react';
import PokemonItem from './PokemonItem';
import { InfiniteData } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

export default function PokemonListUI({
  data,
  isFetching,
  loader,
}: {
  data: InfiniteData<Pokemon[]>;
  isFetching: boolean;
  loader: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="grid grid-cols-4 justify-center gap-4">
      {data.pages.map((pokemons) =>
        pokemons.map((pokemon, i) => {
          return <PokemonItem key={i + pokemon.name} data={pokemon} />;
        }),
      )}
      {!isFetching && <div ref={loader} />}
      {isFetching && (
        <div className=" w-full flex justify-center items-center col-span-4 mt-5">
          <ClipLoader color="#000" loading={true} size={50} speedMultiplier={0.8} />
        </div>
      )}
    </div>
  );
}
