'use client';

import { useRef } from 'react';
import { Pokemon } from '@/lib/api';
import Image from 'next/image';
import { Sparkles, Zap, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero({ pokemon }: { pokemon: Pokemon }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!pokemon || pokemon.id === 0) return;

        // Initial Entry Animation
        const tl = gsap.timeline();

        if (cardRef.current) {
            tl.from(cardRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
            });
        }

        if (imageRef.current) {
            tl.from(imageRef.current, {
                scale: 0,
                rotation: -15,
                duration: 0.8,
                ease: 'back.out(1.7)',
            }, '-=0.5');
        }

        if (contentRef.current) {
            tl.from(contentRef.current.children, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
            }, '-=0.3');
        }

        if (statsRef.current) {
            tl.from(statsRef.current.children, {
                x: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
            }, '-=0.3');
        }

        // 3D Tilt Effect
        const container = containerRef.current;
        const card = cardRef.current;

        if (!container || !card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / (width / 2);
            const y = (e.clientY - top - height / 2) / (height / 2);

            gsap.to(card, {
                rotationY: x * 15,
                rotationX: -y * 15,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out',
            });

            // Parallax for internal elements
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    x: x * 20,
                    y: y * 20,
                    duration: 0.5,
                });
            }

            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    x: x * 10,
                    y: y * 10,
                    duration: 0.5,
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to([card, imageRef.current, contentRef.current], {
                rotationY: 0,
                rotationX: 0,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: containerRef, dependencies: [pokemon] });

    if (!pokemon || pokemon.id === 0) {
        return (
            <section className="flex min-h-[50vh] w-full items-center justify-center text-gray-500">
                <p>Failed to load featured Pokémon.</p>
            </section>
        );
    }

    const heroImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '/placeholder.png';

    return (
        <section ref={containerRef} className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden py-20 perspective-[1000px]">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_70%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 animate-[spin_40s_linear_infinite_reverse]" />

            <div ref={cardRef} className="relative z-10 cursor-pointer preserve-3d">
                {/* Holographic Card */}
                <div className="relative h-[500px] w-[350px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(189,0,255,0.3)]">
                    {/* Card Content */}
                    <div ref={contentRef} className="absolute inset-0 flex flex-col items-center p-8 translate-z-[50px]">
                        <div className="flex w-full justify-between text-neon-cyan font-mono text-sm tracking-widest">
                            <span>HOLODEX</span>
                            <span>NO. {pokemon.id}</span>
                        </div>

                        <div ref={imageRef} className="relative mt-8 h-64 w-64 translate-z-[100px]">
                            {heroImage && (
                                <Image
                                    src={heroImage}
                                    alt={pokemon.name}
                                    fill
                                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                                    priority
                                />
                            )}
                        </div>

                        <div className="mt-8 text-center translate-z-[60px]">
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                {pokemon.name}
                            </h1>
                            <div className="mt-4 flex justify-center gap-4">
                                {pokemon.types.map(t => (
                                    <span key={t} className="rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
                </div>
            </div>

            {/* Stats Floating Elements */}
            <div ref={statsRef} className="absolute right-10 top-1/2 hidden -translate-y-1/2 space-y-6 lg:block">
                {pokemon.stats.slice(0, 3).map((stat, i) => (
                    <div key={stat.stat.name} className="flex items-center gap-4 text-right">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase text-gray-500">{stat.stat.name}</span>
                            <span className="text-2xl font-mono text-white">{stat.base_stat}</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neon-purple">
                            {i === 0 ? <Activity size={20} /> : i === 1 ? <Zap size={20} /> : <Sparkles size={20} />}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
