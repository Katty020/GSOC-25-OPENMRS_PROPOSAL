"use client"

import type React from "react"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, GripVertical } from "lucide-react"

interface FormField {
  id: string
  type: string
  label: string
  placeholder: string
  required: boolean
}

interface FormBuilderProps {
  formFields: FormField[]
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>
}

export function FormBuilder({ formFields, setFormFields }: FormBuilderProps) {
  const [newFieldType, setNewFieldType] = useState("text")

  const addField = () => {
    const newField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: "New Field",
      placeholder: "Enter value",
      required: false,
    }
    setFormFields([...formFields, newField])
  }

  const removeField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={newFieldType} onValueChange={setNewFieldType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Field Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addField}>
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </div>

          <Reorder.Group axis="y" values={formFields} onReorder={setFormFields} className="space-y-4">
            {formFields.map((field) => (
              <Reorder.Item key={field.id} value={field} as="div">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border rounded-md p-4 bg-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                      <h3 className="font-medium">{field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field</h3>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeField(field.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`label-${field.id}`}>Label</Label>
                      <Input
                        id={`label-${field.id}`}
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                      <Input
                        id={`placeholder-${field.id}`}
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        id={`required-${field.id}`}
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                      />
                      <Label htmlFor={`required-${field.id}`}>Required</Label>
                    </div>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </CardContent>
    </Card>
  )
}

