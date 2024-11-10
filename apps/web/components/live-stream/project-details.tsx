import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

export function ProjectDetails({ title, description, raised, goal, daysLeft }:{
    title: string,
    description: string,
    raised: number,
    goal: number,
    daysLeft: number
}) {
  const progress = (raised / goal) * 100

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>${raised.toLocaleString()} raised</span>
            <span>${goal.toLocaleString()} goal</span>
          </div>
          <p className="text-gray-300">{daysLeft} days left</p>
        </div>
      </CardContent>
    </Card>
  )
}