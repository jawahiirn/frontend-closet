import { axiosRequest } from '@/lib/api-client';
import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

export const getPokemonList = (limit: number = 20, offset: number = 0) => {
    return axiosRequest({
        url: '/pokemon',
        params: { limit, offset },
    }) as Promise<PokemonListResponse>;
};

export const getPokemonDetails = (name: string) => {
    return axiosRequest({
        url: `/pokemon/${name}`,
    }) as Promise<PokemonDetails>;
};

export const createPokemon = (data: { name: string; type: string }) => {
    return axiosRequest({
        url: '/pokemon',
        method: 'POST',
        data,
    });
};
