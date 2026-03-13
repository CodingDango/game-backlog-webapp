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
  gamesCounterMap: Record<Category | 'total', number>;
}

export default function UserChart({ gamesCounterMap }: UserChartProps) {
  const { chartData } = useMemo(() => {
    const data = [
      { category: "playing", games: gamesCounterMap['playing'], fill: "var(--color-playing)" },
      { category: "completed", games: gamesCounterMap['completed'], fill: "var(--color-completed)" },
      { category: "played", games: gamesCounterMap['played'], fill: "var(--color-played)" },
      { category: "not played", games: gamesCounterMap['not played'], fill: "var(--color-not-played)" },
      {
        category: "uncategorized",
        games: gamesCounterMap['uncategorized'],
        fill: "var(--color-uncategorized)",
      },
    ];

    const cleanedData = data.filter(row => row.games > 0);

    return { chartData: cleanedData };
  }, [gamesCounterMap]);

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
        <div className="flex flex-col gap-4">
          {CATEGORIES.map(category => (
            <StatRow
              key={category}
              category={category}
              value={gamesCounterMap[category]}
              total={gamesCounterMap.total}
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
