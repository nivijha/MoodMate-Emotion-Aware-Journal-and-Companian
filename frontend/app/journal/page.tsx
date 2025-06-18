"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, Calendar, Tag, Smile, Meh, Frown } from "lucide-react"

const moodOptions = [
  { value: "amazing", label: "Amazing", icon: Smile, color: "bg-green-500" },
  { value: "good", label: "Good", icon: Smile, color: "bg-blue-500" },
  { value: "okay", label: "Okay", icon: Meh, color: "bg-yellow-500" },
  { value: "bad", label: "Bad", icon: Frown, color: "bg-orange-500" },
  { value: "terrible", label: "Terrible", icon: Frown, color: "bg-red-500" },
]

const suggestedTags = ["gratitude", "work", "family", "health", "goals", "reflection", "anxiety", "joy"]

export default function JournalPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags((prev) => [...prev, customTag])
      setCustomTag("")
    }
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log({ title, content, selectedMood, selectedTags })
    alert("Entry saved successfully!")
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">New Journal Entry</h1>
          <p className="text-slate-600">Take a moment to reflect on your thoughts and feelings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Entry Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your entry a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Your Thoughts</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind today? How are you feeling? What happened that made you happy, sad, or thoughtful?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-2 min-h-[300px] resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How are you feeling?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {moodOptions.map((mood) => {
                    const Icon = mood.icon
                    return (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          selectedMood === mood.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${mood.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-slate-800">{mood.label}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCustomTag()}
                  />
                  <Button onClick={handleAddCustomTag} size="sm">
                    Add
                  </Button>
                </div>

                {selectedTags.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 mb-2">Selected tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button
                            onClick={() => handleTagToggle(tag)}
                            className="ml-2 text-slate-500 hover:text-slate-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
