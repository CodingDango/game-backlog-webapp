import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AppPieChart } from "../charts/AppPieChart";
import { Progress } from "../ui/progress";
import { Category, UserGame } from "@/types/types";
import { useEffect, useMemo } from "react";
import { CATEGORIES } from "@/constants/gameConstants";

const chartConfig = {
  playing: {
    label: "Playing",
    color: "var(--chart-1)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
  played: {
    label: "Played",
    color: "var(--chart-3)",
  },
  "not played": {
    label: "Not Played",
    color: "var(--chart-4)",
  },
  uncategorized: {
    label: "Uncategorized",
    color: "var(--chart-5)",
  },
};

interface UserChartProps {
  userGames: UserGame[];
}

export default function UserChart({ userGames }: UserChartProps) {
  const { chartData, gamesCounter } = useMemo(() => {
    const data = [
      { category: "playing", games: 0, fill: "var(--color-playing)" },
      { category: "completed", games: 0, fill: "var(--color-completed)" },
      { category: "played", games: 0, fill: "var(--color-played)" },
      { category: "not played", games: 0, fill: "var(--color-not-played)" },
      {
        category: "uncategorized",
        games: 0,
        fill: "var(--color-uncategorized)",
      },
    ];

    const gamesCounter = {
      total: 0,
      playing: 0,
      completed: 0,
      played: 0,
      "not played": 0,
      uncategorized: 0,
    };

    for (const game of userGames) {
      gamesCounter[game.category]++;
      gamesCounter.total++;
    }

    const cleanedData = [];

    for (const row of data) {
      const total = gamesCounter[row.category as keyof typeof gamesCounter];

      if (total) {
        cleanedData.push({ ...row, games: total });
      }
    }

    return { chartData: cleanedData, gamesCounter };
  }, [userGames]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Stat Chart</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
      </CardHeader>
      <div className="grid grid-cols-[1fr_auto]">
        <div>
          <AppPieChart
            {...{
              chartConfig,
              chartData,
              chartNameKey: "category",
              chartDataKey: "games",
              labelDataKey: "category",
            }}
          />
        </div>
        <div className="flex flex-col gap-6">
          {CATEGORIES.map(category => (
            <StatRow
              key={category}
              category={category}
              value={gamesCounter[category]}
              total={gamesCounter.total}
              colorClass={chartConfig[category].color}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

interface StatRowProps {
  category: Category;
  colorClass: string;
  value: number;
  total: number;
}

function StatRow({ category, value, total, colorClass }: StatRowProps) {
  const percentage = value == 0 ? 0 : Number((value / total * 100).toFixed(0));
  console.log(`value is ${value}, total is ${total}, percentage is ${percentage}`)

  return (
    <div className="flex gap-12 justify-between">
      <div className="flex gap-4 items-center">
        <div className='rounded-full w-4 h-4' style={{ background: colorClass}}></div>
        <div className="flex flex-col">
          <span className="capitalize">{category}</span>
          <span className="text-muted-foreground text-sm">{value} games</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_40px] items-center gap-3">
        <Progress className="w-16 h-3" value={percentage} max={100} />
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
    </div>
  );
}
