import { Pokemon } from '@/app/types/pokemon';
import { useInfiniteQuery } from '@tanstack/react-query';

export function usePokemons(limit = 20) {
  return useInfiniteQuery<Pokemon[]>({
    queryKey: ['pokemons', limit],
    queryFn: async ({ pageParam = 1 }) => {
      const offset = (Number(pageParam) - 1) * limit;
      const response = await fetch(`http://localhost:3000/api/pokemon/?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('포켓몬들을 불러오는 과정에서 오류가 있습니다.');
      }

      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastpage, allPage) => {
      if (lastpage.length === limit) return allPage.length + 1;
    },
  });
}
