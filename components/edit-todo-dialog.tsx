"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

interface Todo {
  id: string
  title: string
  completed: boolean
  description?: string
}

interface EditTodoDialogProps {
  todo: Todo
  onSave: (updates: Partial<Todo>) => void
}

export function EditTodoDialog({ todo, onSave }: EditTodoDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || "")

  const handleSave = () => {
    onSave({
      title: title || todo.title,
      description: description || undefined,
    })
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-blue-500 hover:bg-blue-500/10 flex-shrink-0"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Make changes to your todo item below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need to do?"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description (Optional)
              </label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
