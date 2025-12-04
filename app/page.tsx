"use client";

import GameCard from "@/components/GameCard";
import { useAuth } from "@/components/ui/AuthContext";
import { Button } from "@/components/ui/button";
import { gameService } from "@/lib/services/game-service";
import { Game } from "@/lib/types";

import { useState, useEffect } from "react";

export default function Home() {
  const { session, signOut } = useAuth();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    gameService.getGames()
      .then(gameRes => {
        setGames(gameRes.results);
      })
      .catch(err => {
        console.log('Oops! Error!', err);
      })
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
        {games.map((game) => (<GameCard key={game.id} game={game}/>))}
      </div>
    </div>
  );
}
