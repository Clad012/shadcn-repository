"use client";

import { useState, useEffect } from "react";
import { getPokemon } from "@/registry/new-york/complex-component/lib/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { PokemonImage } from "@/registry/new-york/complex-component/components/pokemon-image";

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemon(name);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to load pokemon:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [name]);

  if (loading) {
    return (
      <Card>
        <CardContent className="h-40 flex items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-2">
        <div>
          <PokemonImage name={pokemon.name} number={pokemon.id} />
        </div>
        <div className="text-center font-medium">{pokemon.name}</div>
      </CardContent>
    </Card>
  );
}
