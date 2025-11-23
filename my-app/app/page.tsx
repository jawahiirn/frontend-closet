
import { getPokemonList, getPokemon } from '@/lib/api';
import Hero from '@/components/Hero';
import PokemonGrid from '@/components/PokemonGrid';

export default async function Home() {
  // Fetch initial data on the server
  const initialPokemon = await getPokemonList(20, 0);

  // Fetch a featured pokemon for the hero (e.g., Mewtwo or Charizard)
  const featuredPokemon = await getPokemon('mewtwo');

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30 selection:text-neon-cyan">
      <Hero pokemon={featuredPokemon} />
      <PokemonGrid initialPokemon={initialPokemon} />

      <footer className="py-8 text-center text-xs text-gray-600">
        <p>POWERED BY POKEAPI • DESIGNED WITH NEXT.JS 16 & TAILWIND V4</p>
      </footer>
    </main>
  );
}