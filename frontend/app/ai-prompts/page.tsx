"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RefreshCw, BookOpen, Heart, Brain, Target } from "lucide-react"
import Link from "next/link"

const promptCategories = [
  {
    id: "reflection",
    name: "Self Reflection",
    icon: Brain,
    color: "bg-purple-500",
    prompts: [
      "What are three things that brought you joy today, and why did they make you feel good?",
      "Describe a challenge you faced recently. What did you learn from it?",
      "If you could give your past self one piece of advice, what would it be?",
      "What patterns do you notice in your thoughts and behaviors lately?",
      "How have you grown as a person in the last month?",
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    icon: Heart,
    color: "bg-pink-500",
    prompts: [
      "List five small things you're grateful for today.",
      "Who is someone that made a positive impact on your life recently?",
      "What's something about your body that you appreciate?",
      "Describe a place that makes you feel peaceful and why you're grateful for it.",
      "What skill or ability do you have that you're thankful for?",
    ],
  },
  {
    id: "goals",
    name: "Goals & Dreams",
    icon: Target,
    color: "bg-blue-500",
    prompts: [
      "What's one small step you can take today toward a bigger goal?",
      "Describe your ideal day five years from now.",
      "What's a skill you'd like to develop and why?",
      "If money wasn't a factor, what would you spend your time doing?",
      "What's one habit you'd like to build or break?",
    ],
  },
  {
    id: "emotions",
    name: "Emotional Processing",
    icon: Heart,
    color: "bg-green-500",
    prompts: [
      "What emotion are you feeling most strongly right now, and what might be causing it?",
      "Describe a time when you felt truly content. What made that moment special?",
      "How do you typically handle stress, and what works best for you?",
      "What would you say to a friend who was feeling the way you feel right now?",
      "What's one thing you can do today to take care of your emotional wellbeing?",
    ],
  },
]

export default function AIPromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState(promptCategories[0])
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [usedPrompts, setUsedPrompts] = useState<Set<string>>(new Set())

  const getRandomPrompt = () => {
    const availablePrompts = selectedCategory.prompts.filter(
      (_, index) => !usedPrompts.has(`${selectedCategory.id}-${index}`),
    )

    if (availablePrompts.length === 0) {
      setUsedPrompts(new Set())
      setCurrentPromptIndex(0)
      return
    }

    const randomIndex = Math.floor(Math.random() * selectedCategory.prompts.length)
    setCurrentPromptIndex(randomIndex)
    setUsedPrompts((prev) => new Set([...prev, `${selectedCategory.id}-${randomIndex}`]))
  }

  const handleCategoryChange = (category: (typeof promptCategories)[0]) => {
    setSelectedCategory(category)
    setCurrentPromptIndex(0)
    setUsedPrompts(new Set())
  }

  const currentPrompt = selectedCategory.prompts[currentPromptIndex]

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI-Powered Journal Prompts</h1>
          <p className="text-slate-600">Get personalized prompts to help you explore your thoughts and feelings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {promptCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedCategory.id === category.id
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-slate-50 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-800 text-left">{category.name}</span>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Prompt */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Today's Prompt
                  </CardTitle>
                  <Badge variant="secondary">{selectedCategory.name}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <p className="text-lg text-slate-800 leading-relaxed font-medium">{currentPrompt}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={getRandomPrompt} variant="outline" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Get New Prompt
                  </Button>
                  <Link href="/journal" className="flex-1">
                    <Button className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Writing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Prompt History */}
            <Card>
              <CardHeader>
                <CardTitle>More {selectedCategory.name} Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCategory.prompts.map((prompt, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        index === currentPromptIndex
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                      onClick={() => setCurrentPromptIndex(index)}
                    >
                      <p className="text-slate-700 text-sm leading-relaxed">{prompt}</p>
                      {usedPrompts.has(`${selectedCategory.id}-${index}`) && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Used
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use Journal Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Getting Started</h4>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• Choose a category that resonates with you</li>
                      <li>• Find a quiet, comfortable space</li>
                      <li>• Set aside 10-15 minutes for reflection</li>
                      <li>• Don't worry about perfect grammar</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Writing Tips</h4>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• Write freely without judgment</li>
                      <li>• Be honest with yourself</li>
                      <li>• Explore your emotions deeply</li>
                      <li>• Review your entries regularly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
