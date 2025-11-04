"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AddTodoFormProps {
  onAddTodo: (title: string, description?: string) => void
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim() || undefined)
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Todo Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={!title.trim()}
        className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold"
      >
        + Add Todo
      </Button>
    </form>
  )
}
