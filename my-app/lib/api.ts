
export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
            home: {
                front_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface PokemonListResult {
    name: string;
    url: string;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 20, offset = 0): Promise<Pokemon[]> {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    // Fetch details for each pokemon to get images and types immediately
    const promises = data.results.map(async (p: PokemonListResult) => {
        const res = await fetch(p.url);
        const details = await res.json();
        return formatPokemonData(details);
    });

    return Promise.all(promises);
}

export async function getPokemon(name: string): Promise<Pokemon> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon: ${name}`);
        }
        const details = await response.json();
        return formatPokemonData(details);
    } catch (error) {
        console.error(error);
        // Return a fallback dummy pokemon to prevent crash
        return {
            id: 0,
            name: 'unknown',
            types: ['unknown'],
            sprites: {
                front_default: '',
                other: {
                    'official-artwork': { front_default: '' },
                    home: { front_default: '' }
                }
            },
            stats: []
        };
    }
}

function formatPokemonData(data: any): Pokemon {
    return {
        id: data.id,
        name: data.name,
        types: data.types.map((t: any) => t.type.name),
        sprites: data.sprites,
        stats: data.stats,
    };
}
