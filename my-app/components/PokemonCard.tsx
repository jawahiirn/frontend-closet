
'use client';

import { useRef } from 'react';
import { Pokemon } from '@/lib/api';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const typeColors: Record<string, string> = {
    fire: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    water: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    grass: 'bg-green-500/20 text-green-300 border-green-500/50',
    electric: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    psychic: 'bg-pink-500/20 text-pink-300 border-pink-500/50',
    ice: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    dragon: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
    dark: 'bg-gray-800/50 text-gray-300 border-gray-600/50',
    fairy: 'bg-rose-400/20 text-rose-300 border-rose-400/50',
    normal: 'bg-gray-400/20 text-gray-300 border-gray-400/50',
    fighting: 'bg-red-600/20 text-red-300 border-red-600/50',
    flying: 'bg-sky-400/20 text-sky-300 border-sky-400/50',
    poison: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    ground: 'bg-amber-600/20 text-amber-300 border-amber-600/50',
    rock: 'bg-stone-500/20 text-stone-300 border-stone-500/50',
    bug: 'bg-lime-500/20 text-lime-300 border-lime-500/50',
    ghost: 'bg-violet-800/20 text-violet-300 border-violet-800/50',
    steel: 'bg-slate-400/20 text-slate-300 border-slate-400/50',
};

export default function PokemonCard({ pokemon, index }: { pokemon: Pokemon; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entry Animation
        gsap.from(cardRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power3.out',
        });

        // Hover Animation Setup
        const card = cardRef.current;
        if (!card) return;

        const tl = gsap.timeline({ paused: true });

        tl.to(card, {
            y: -10,
            scale: 1.02,
            borderColor: 'rgba(0, 243, 255, 0.5)',
            boxShadow: '0 0 30px -10px rgba(0, 243, 255, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
        })
            .to(imageRef.current, {
                scale: 1.15,
                duration: 0.3,
                ease: 'back.out(1.7)',
            }, 0)
            .to(glowRef.current, {
                opacity: 1,
                scale: 1.5,
                duration: 0.4,
            }, 0);

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());

        return () => {
            card.removeEventListener('mouseenter', () => tl.play());
            card.removeEventListener('mouseleave', () => tl.reverse());
        };
    }, { scope: cardRef });

    return (
        <div ref={cardRef} className="opacity-0">
            <Card className="group relative overflow-hidden border-glass-border bg-glass backdrop-blur-md">
                <div ref={glowRef} className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/20 blur-3xl opacity-0 transition-all" />

                <CardContent className="relative z-10 flex flex-col items-center p-6">
                    <div className="mb-2 flex w-full justify-between text-xs font-mono text-gray-400">
                        <span>#{String(pokemon.id).padStart(3, '0')}</span>
                        <span className="uppercase tracking-wider">HP {pokemon.stats[0].base_stat}</span>
                    </div>

                    <div ref={imageRef} className="relative h-32 w-32">
                        <Image
                            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            fill
                            className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <h3 className="mt-4 text-lg font-bold capitalize tracking-wide text-white group-hover:text-neon-cyan transition-colors duration-300">
                        {pokemon.name}
                    </h3>

                    <div className="mt-3 flex gap-2">
                        {pokemon.types.map((type) => (
                            <Badge
                                key={type}
                                variant="outline"
                                className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${typeColors[type] || 'bg-gray-500/20 border-gray-500/50'
                                    }`}
                            >
                                {type}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
