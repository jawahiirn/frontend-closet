
'use client';

import { useState, useRef, useEffect } from 'react';
import { Pokemon, getPokemonList } from '@/lib/api';
import PokemonCard from '@/components/PokemonCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PokemonGrid({ initialPokemon }: { initialPokemon: Pokemon[] }) {
    const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
    const [offset, setOffset] = useState(20);
    const [loading, setLoading] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const loadMore = async () => {
        setLoading(true);
        const newPokemon = await getPokemonList(20, offset);
        setPokemon([...pokemon, ...newPokemon]);
        setOffset(offset + 20);
        setLoading(false);
    };

    // Animate new items when they are added
    useGSAP(() => {
        if (!gridRef.current) return;

        // Only animate the newly added items (last 20)
        // If it's the initial load, animate all
        const items = gridRef.current.children;
        const startIndex = Math.max(0, items.length - 20);
        const newItems = Array.from(items).slice(startIndex);

        gsap.fromTo(newItems,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: newItems[0],
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { dependencies: [pokemon], scope: gridRef });

    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    <span className="text-neon-cyan">SYSTEM</span> DATABASE
                </h2>
                <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
            </div>

            <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pokemon.map((p, i) => (
                    <PokemonCard key={`${p.id}-${i}`} pokemon={p} index={i} />
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <Button
                    onClick={loadMore}
                    disabled={loading}
                    variant="outline"
                    className="group relative overflow-hidden border-neon-cyan/50 bg-black/50 px-8 py-6 text-neon-cyan hover:bg-neon-cyan/10 hover:text-white transition-all duration-300"
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            <span className="relative z-10 font-mono tracking-widest">LOAD MORE DATA</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
