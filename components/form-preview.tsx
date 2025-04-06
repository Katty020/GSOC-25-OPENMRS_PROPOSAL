"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Globe } from "lucide-react"

interface FormField {
  id: string
  type: string
  label: string
  placeholder: string
  required: boolean
}

interface Translation {
  formTitle: string
  submitButton: string
  fields: {
    [key: string]: {
      label: string
      placeholder: string
    }
  }
}

interface FormPreviewProps {
  formFields: FormField[]
  translations: {
    [key: string]: Translation
  }
  currentLanguage: string
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>
}

export function FormPreview({ formFields, translations, currentLanguage, setCurrentLanguage }: FormPreviewProps) {
  const languageNames: { [key: string]: string } = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
    // Add more as needed
  }

  const renderField = (field: FormField) => {
    const translation = translations[currentLanguage]?.fields[field.id] || {
      label: field.label,
      placeholder: field.placeholder,
    }

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`preview-${field.id}`}>{translation.label}</Label>
            <Input
              id={`preview-${field.id}`}
              type={field.type}
              placeholder={translation.placeholder}
              required={field.required}
            />
          </div>
        )
      case "textarea":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`preview-${field.id}`}>{translation.label}</Label>
            <Textarea id={`preview-${field.id}`} placeholder={translation.placeholder} required={field.required} />
          </div>
        )
      case "select":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`preview-${field.id}`}>{translation.label}</Label>
            <Select>
              <SelectTrigger id={`preview-${field.id}`}>
                <SelectValue placeholder={translation.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox id={`preview-${field.id}`} required={field.required} />
            <Label htmlFor={`preview-${field.id}`}>{translation.label}</Label>
          </div>
        )
      case "radio":
        return (
          <div className="grid gap-2">
            <Label>{translation.label}</Label>
            <RadioGroup defaultValue="option1">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option1" id={`preview-${field.id}-1`} />
                <Label htmlFor={`preview-${field.id}-1`}>Option 1</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option2" id={`preview-${field.id}-2`} />
                <Label htmlFor={`preview-${field.id}-2`}>Option 2</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option3" id={`preview-${field.id}-3`} />
                <Label htmlFor={`preview-${field.id}-3`}>Option 3</Label>
              </div>
            </RadioGroup>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Label htmlFor="preview-language">Preview Language:</Label>
        <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
          <SelectTrigger id="preview-language" className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(translations).map((langCode) => (
              <SelectItem key={langCode} value={langCode}>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {languageNames[langCode] || langCode.toUpperCase()}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{translations[currentLanguage]?.formTitle || "Form Preview"}</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {formFields.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{translations[currentLanguage]?.submitButton || "Submit"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

