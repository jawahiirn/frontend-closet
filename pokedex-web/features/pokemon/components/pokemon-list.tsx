'use client';

import { useQuery } from '@tanstack/react-query';
import { pokemonListQuery } from '@/features/pokemon/api/queries';
import Link from 'next/link';

export function PokemonList() {
  const { data, isLoading, isError } = useQuery(pokemonListQuery(20));

  if (isLoading) return <div>Loading Pokemon...</div>;
  if (isError) return <div className="text-red-500">Error fetching Pokemon</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.results.map((pokemon) => (
        <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name} className="block">
          <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow capitalize text-center">
            {pokemon.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
