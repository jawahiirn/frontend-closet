import { Pokemon } from '@/features/pokemon/types';
import { PaginatedResponse } from '@/shared/types/api.types';

export type PokemonListResponse = PaginatedResponse<Pokemon>;

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
