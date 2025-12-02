import { axiosRequest } from '@/service/api-client';
import { PokemonListResponse, PokemonDetailsResponse, CreatePokemonRequest, PokemonDetailsRequest } from '../types';

export const getPokemonList = (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  return axiosRequest({
    url: '/pokemon',
    params: { limit, offset },
  });
};

export const getPokemonDetails = (data: PokemonDetailsRequest): Promise<PokemonDetailsResponse> => {
  return axiosRequest({
    url: `/pokemon/${data.name}`,
  });
};

export const createPokemon = (data: CreatePokemonRequest) => {
  return axiosRequest({
    url: '/pokemon',
    method: 'POST',
    data,
  });
};
