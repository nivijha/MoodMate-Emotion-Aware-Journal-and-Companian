"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, TrendingUp, BookOpen, Mic, Plus } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moodData = [
  { date: "Mon", mood: 7, energy: 6 },
  { date: "Tue", mood: 8, energy: 7 },
  { date: "Wed", mood: 6, energy: 5 },
  { date: "Thu", mood: 9, energy: 8 },
  { date: "Fri", mood: 7, energy: 7 },
  { date: "Sat", mood: 8, energy: 9 },
  { date: "Sun", mood: 9, energy: 8 },
]

const recentEntries = [
  { id: 1, type: "text", title: "Morning Reflection", date: "2 hours ago", mood: "Happy" },
  { id: 2, type: "voice", title: "Evening Thoughts", date: "1 day ago", mood: "Calm" },
  { id: 3, type: "text", title: "Gratitude Practice", date: "2 days ago", mood: "Grateful" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back!</h1>
          <p className="text-slate-600">Here's how you've been feeling lately</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Streak</p>
                  <p className="text-2xl font-bold text-slate-800">7 days</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Mood</p>
                  <p className="text-2xl font-bold text-slate-800">7.6/10</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Entries</p>
                  <p className="text-2xl font-bold text-slate-800">42</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Voice Entries</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mood & Energy Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} name="Mood" />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} name="Energy" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Entries</CardTitle>
              <Link href="/journal">
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.type === "voice" ? "bg-orange-100" : "bg-blue-100"
                      }`}
                    >
                      {entry.type === "voice" ? (
                        <Mic className="w-4 h-4 text-orange-600" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{entry.title}</p>
                      <p className="text-sm text-slate-500">{entry.date}</p>
                      <Badge variant="secondary" className="mt-1">
                        {entry.mood}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/journal">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800">Write Entry</h3>
                <p className="text-sm text-slate-600 mt-1">Start journaling</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/voice">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mic className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800">Voice Entry</h3>
                <p className="text-sm text-slate-600 mt-1">Record thoughts</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai-prompts">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800">AI Insights</h3>
                <p className="text-sm text-slate-600 mt-1">Get suggestions</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <CalendarDays className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800">View Calendar</h3>
              <p className="text-sm text-slate-600 mt-1">See all entries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
