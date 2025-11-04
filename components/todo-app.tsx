"use client"

import { useCopilotAction } from "@copilotkit/react-core"
import { TodoList } from "./todo-list"
import { AddTodoForm } from "./add-todo-form"

interface Todo {
  id: string
  title: string
  completed: boolean
  description?: string
}

interface TodoAppProps {
  todos: Todo[]
  onAddTodo: (title: string, description?: string) => void
  onRemoveTodo: (id: string) => void
  onEditTodo: (id: string, updates: Partial<Todo>) => void
  onToggleTodo: (id: string) => void
}

export function TodoApp({ todos, onAddTodo, onRemoveTodo, onEditTodo, onToggleTodo }: TodoAppProps) {
  useCopilotAction({
    name: "add_todo",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "title",
        description: "The title of the todo",
        type: "string",
        required: true,
      },
      {
        name: "description",
        description: "Optional description for the todo",
        type: "string",
        required: false,
      },
    ],
    handler: ({ title, description }) => {
      console.log("[v0] AI adding todo:", title)
      onAddTodo(title, description)
      return `Added todo: "${title}"`
    },
  })

  useCopilotAction({
    name: "remove_todo",
    description: "Remove a todo item from the list by searching for similar title",
    parameters: [
      {
        name: "title",
        description: "The title or partial title of the todo to remove",
        type: "string",
        required: true,
      },
    ],
    handler: ({ title }) => {
      console.log("[v0] AI removing todo by title:", title)
      const todo = todos.find((t) => t.title.toLowerCase().includes(title.toLowerCase()))
      if (todo) {
        onRemoveTodo(todo.id)
        return `Removed todo: "${todo.title}"`
      }
      return `Todo matching "${title}" not found`
    },
  })

  useCopilotAction({
    name: "edit_todo",
    description: "Edit an existing todo item by finding it by title",
    parameters: [
      {
        name: "title",
        description: "The title or partial title of the todo to edit",
        type: "string",
        required: true,
      },
      {
        name: "new_title",
        description: "New title for the todo",
        type: "string",
        required: false,
      },
      {
        name: "description",
        description: "New description for the todo",
        type: "string",
        required: false,
      },
      {
        name: "completed",
        description: "Mark as completed or not",
        type: "boolean",
        required: false,
      },
    ],
    handler: ({ title, new_title, description, completed }) => {
      console.log("[v0] AI editing todo:", title)
      const todo = todos.find((t) => t.title.toLowerCase().includes(title.toLowerCase()))
      if (todo) {
        const updates: Partial<Todo> = {}
        if (new_title) updates.title = new_title
        if (description) updates.description = description
        if (completed !== undefined) updates.completed = completed
        onEditTodo(todo.id, updates)
        return `Updated todo: "${new_title || todo.title}"`
      }
      return `Todo matching "${title}" not found`
    },
  })

  useCopilotAction({
    name: "list_todos",
    description: "Get the current list of todos",
    parameters: [],
    handler: () => {
      console.log("[v0] AI listing todos")
      if (todos.length === 0) {
        return "No todos yet. Would you like me to help create some?"
      }
      return `Current todos (${todos.length} total):\n${todos.map((t) => `- ${t.title}${t.completed ? " ✓" : ""}`).join("\n")}`
    },
  })

  useCopilotAction({
    name: "toggle_todo",
    description: "Mark a todo as completed or incomplete by finding it by title",
    parameters: [
      {
        name: "title",
        description: "The title or partial title of the todo to toggle",
        type: "string",
        required: true,
      },
    ],
    handler: ({ title }) => {
      console.log("[v0] AI toggling todo:", title)
      const todo = todos.find((t) => t.title.toLowerCase().includes(title.toLowerCase()))
      if (todo) {
        onToggleTodo(todo.id)
        return `Toggled todo: "${todo.title}" is now ${!todo.completed ? "completed" : "incomplete"}`
      }
      return `Todo matching "${title}" not found`
    },
  })

  useCopilotAction({
    name: "add_multiple_todos",
    description: "Add multiple todo items at once (useful for trip planning)",
    parameters: [
      {
        name: "todos",
        description: "Array of todo items with title and optional description",
        type: "object",
        required: true,
      },
    ],
    handler: ({ todos: newTodos }) => {
      console.log("[v0] AI adding multiple todos:", newTodos)
      if (Array.isArray(newTodos)) {
        newTodos.forEach((item: any) => {
          onAddTodo(item.title || item, item.description)
        })
        return `Added ${newTodos.length} todos successfully!`
      }
      return "Failed to add todos"
    },
  })

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-foreground mb-3">My Todo List</h1>
              <p className="text-lg text-muted-foreground">
                Ask the AI copilot on the right to help plan your tasks. Try: "Help me create a todo list of what to do
                in Paris"
              </p>
            </div>

            <div className="mb-12">
              <AddTodoForm onAddTodo={onAddTodo} />
            </div>

            <div className="mb-6">
              <TodoList todos={todos} onToggleTodo={onToggleTodo} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
