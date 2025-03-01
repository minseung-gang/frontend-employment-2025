import { Pokemon } from '@/app/types/pokemon';
import Image from 'next/image';
import React from 'react';

export default function PokemonItem({ data }: { data: Pokemon }) {
  const { name, image } = data;

  return (
    <div className="p-2 bg-yellow-400 rounded-lg">
      <h4 className="font-semibold mb-2">{name}</h4>
      <div className="rounded-md bg-orange-400">
        <Image className="aspect-square" src={image} alt={name} width={200} height={200} />
      </div>
    </div>
  );
}
