import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AppPieChart } from '../charts/AppPieChart'
import { Progress } from '../ui/progress'

export default function UserChart() {
  return (
  <Card>
    <CardHeader>
      <CardTitle>Games Percentages</CardTitle>
      <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
    </CardHeader>
    <div className='grid grid-cols-[1fr_auto]'>
      <div>
        <AppPieChart/>
      </div>
      <div>
        <div className='flex justify-between items-center gap-8'>
          <div className='flex gap-4 items-center'>
            <div className='rounded-full bg-chart-1 w-4 h-4'></div>
            <div className='flex flex-col'>
              <span>Game Category</span>
              <span className='text-muted-foreground text-sm'>12 games</span>
            </div>
          </div>
          
          <div className='flex gap-2 items-center'>
            <Progress className='w-16 h-3' value={38} max={100}/>
            <span className='text-muted-foreground'>38%</span>
          </div>

        </div>
      </div>
    </div>
  </Card>
  )
}
