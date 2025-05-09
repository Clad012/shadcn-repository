import { cache } from "react";
import { Suspense } from "react";
import { PokemonCard } from "@/registry/new-york/complex-component/components/pokemon-card";
import { getPokemonList } from "@/registry/new-york/complex-component/lib/pokemon";

const getCachedPokemonList = cache(getPokemonList);

// Non-async wrapper for the async PokemonCard
function PokemonCardContainer({ name }: { name: string }) {
  return (
    <Suspense
      fallback={
        <div className="h-40 rounded-lg bg-gray-100 animate-pulse"></div>
      }
    >
      {/* @ts-ignore - Async Server Component */}
      <PokemonCard name={name} />
    </Suspense>
  );
}

export default async function Page() {
  const pokemons = await getCachedPokemonList({ limit: 12 });

  if (!pokemons) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4">
        {pokemons.results.map((p) => (
          <PokemonCardContainer key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
}
