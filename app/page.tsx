"use client";

import GameCard from "@/components/GameCard";
import { keyByMap } from "@/lib/utils";
import { useAuth } from "@/components/ui/AuthContext";
import { Button } from "@/components/ui/button";
import { getRawgGames, getUserLibrary } from "@/lib/actions";
import { Game, UserGame } from "@/lib/types";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function Home() {
  const { session, signOut } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [userLibrary, setUserLibrary] = useState<Map<number, UserGame>>(
    new Map()
  );

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gameRes = await getRawgGames();
        const fetchedUserLibrary = await getUserLibrary();
        const userLibraryAsMap = keyByMap(fetchedUserLibrary, "rawg_id");

        setGames(gameRes.results);
        setUserLibrary(userLibraryAsMap);
      } catch (err) {
        toast.error(`Error fetching games: ${err}`);
      }
    };

    fetchGames();
  }, []);

  if (!session) return;

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-medium">Games List</h1>

        <div className="flex gap-4">
          <p className="text-muted-foreground">
            Signed in as {session.user.email}
          </p>
          <Button variant={"destructive"} onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>
      <div className="w-full grid grid-cols-3 gap-6">
        {games.map((game) => {
          const isInUserLibrary = userLibrary.has(game.id);

          return (
            <GameCard
              key={game.id}
              game={game}
              isInUserLibrary={isInUserLibrary}
            />
          );
        })}
      </div>
    </div>
  );
}
