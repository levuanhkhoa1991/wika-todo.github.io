"use client"

import { CopilotKit } from "@copilotkit/react-core"
import { CopilotSidebar } from "@copilotkit/react-ui"
import "@copilotkit/react-ui/styles.css"
import { TodoApp } from "@/components/todo-app"
import { useState, useCallback, useEffect } from "react"

interface Todo {
  id: string
  title: string
  completed: boolean
  description?: string
}

interface TodoAppWrapperProps {
  apiKey: string
}

const TODOS_STORAGE_KEY = "todos_app_data"

export function TodoAppWrapper({ apiKey }: TodoAppWrapperProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TODOS_STORAGE_KEY)
      if (stored) {
        const parsedTodos = JSON.parse(stored)
        setTodos(parsedTodos)
        console.log("[v0] Loaded todos from localStorage:", parsedTodos.length)
      }
    } catch (error) {
      console.error("[v0] Failed to load todos:", error)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
        console.log("[v0] Saved todos to localStorage:", todos.length)
      } catch (error) {
        console.error("[v0] Failed to save todos:", error)
      }
    }
  }, [todos, isLoaded])

  const addTodo = useCallback((title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    }
    console.log("[v0] Adding todo:", title)
    setTodos((prev) => [...prev, newTodo])
  }, [])

  const removeTodo = useCallback((id: string) => {
    console.log("[v0] Removing todo:", id)
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const editTodo = useCallback((id: string, updates: Partial<Todo>) => {
    console.log("[v0] Editing todo:", id, updates)
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
  }, [])

  const toggleTodo = useCallback((id: string) => {
    console.log("[v0] Toggling todo:", id)
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <CopilotKit publicApiKey={apiKey}>
      <div className="flex h-screen bg-background">
        {/* LEFT SIDE - TODO APP */}
        <div className="flex-1 border-r border-border overflow-hidden">
          <TodoApp
            todos={todos}
            onAddTodo={addTodo}
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
            onToggleTodo={toggleTodo}
          />
        </div>

        {/* RIGHT SIDE - COPILOT CHAT */}
        <CopilotSidebar
          defaultOpen={true}
          position="right"
          instructions={`You are a helpful assistant that helps users manage their todos. 
          When the user asks you to create todos or modify them, use the available actions to add, remove, or edit todos.
          Be conversational and helpful. If the user asks for something like "Plan a trip to Paris", 
          create relevant todo items for the trip planning.
          Always confirm what you've done.`}
          labels={{
            title: "Plan Assistant",
            initial:
              "Hi! I can help you plan and manage your todos. Try asking me to 'Plan a trip to Paris' or 'Create a Germany travel itinerary'",
          }}
          className="w-96"
        >
          <div />
        </CopilotSidebar>
      </div>
    </CopilotKit>
  )
}
