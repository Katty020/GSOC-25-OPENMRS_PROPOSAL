"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

interface TranslationPanelProps {
  formFields: FormField[]
  translations: {
    [key: string]: Translation
  }
  setTranslations: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Translation
    }>
  >
  currentLanguage: string
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>
}

export function TranslationPanel({
  formFields,
  translations,
  setTranslations,
  currentLanguage,
  setCurrentLanguage,
}: TranslationPanelProps) {
  const [newLanguageCode, setNewLanguageCode] = useState("")
  const [newLanguageName, setNewLanguageName] = useState("")
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false)

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

  const addLanguage = () => {
    if (!newLanguageCode) return

    // Create a new translation based on the English one
    const newTranslation: Translation = {
      formTitle: translations.en.formTitle,
      submitButton: translations.en.submitButton,
      fields: {},
    }

    // Copy field translations from English
    formFields.forEach((field) => {
      newTranslation.fields[field.id] = {
        label: translations.en.fields[field.id]?.label || field.label,
        placeholder: translations.en.fields[field.id]?.placeholder || field.placeholder,
      }
    })

    setTranslations({
      ...translations,
      [newLanguageCode]: newTranslation,
    })

    setNewLanguageCode("")
    setNewLanguageName("")
    setIsAddLanguageOpen(false)
    setCurrentLanguage(newLanguageCode)
  }

  const removeLanguage = (langCode: string) => {
    if (langCode === "en") return // Don't allow removing English

    const newTranslations = { ...translations }
    delete newTranslations[langCode]

    setTranslations(newTranslations)

    if (currentLanguage === langCode) {
      setCurrentLanguage("en")
    }
  }

  const updateTranslation = (
    langCode: string,
    field: string,
    subfield: string | null,
    fieldId: string | null,
    value: string,
  ) => {
    const newTranslations = { ...translations }

    if (subfield && fieldId) {
      // Update field translation (label or placeholder)
      newTranslations[langCode].fields[fieldId][
        subfield as keyof (typeof newTranslations)[typeof langCode]["fields"][typeof fieldId]
      ] = value
    } else {
      // Update form title or submit button
      newTranslations[langCode][field as keyof Translation] = value
    }

    setTranslations(newTranslations)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Translations</CardTitle>
        <Dialog open={isAddLanguageOpen} onOpenChange={setIsAddLanguageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="language-code">Language Code (e.g., fr, de, es)</Label>
                <Input
                  id="language-code"
                  value={newLanguageCode}
                  onChange={(e) => setNewLanguageCode(e.target.value.toLowerCase())}
                  placeholder="Language code (ISO 639-1)"
                />
              </div>
              <Button onClick={addLanguage} disabled={!newLanguageCode || !!translations[newLanguageCode]}>
                Add Language
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Tabs value={currentLanguage} onValueChange={setCurrentLanguage}>
          <TabsList className="mb-4 flex flex-wrap">
            {Object.keys(translations).map((langCode) => (
              <TabsTrigger key={langCode} value={langCode} className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {languageNames[langCode] || langCode.toUpperCase()}
                {langCode !== "en" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1 text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeLanguage(langCode)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(translations).map((langCode) => (
            <TabsContent key={langCode} value={langCode}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`form-title-${langCode}`}>Form Title</Label>
                    <Input
                      id={`form-title-${langCode}`}
                      value={translations[langCode].formTitle}
                      onChange={(e) => updateTranslation(langCode, "formTitle", null, null, e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`submit-button-${langCode}`}>Submit Button</Label>
                    <Input
                      id={`submit-button-${langCode}`}
                      value={translations[langCode].submitButton}
                      onChange={(e) => updateTranslation(langCode, "submitButton", null, null, e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Field Translations</h3>
                  <AnimatePresence>
                    {formFields.map((field) => (
                      <motion.div
                        key={field.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="border rounded-md p-4"
                      >
                        <h4 className="font-medium mb-2">
                          {field.label} ({field.type})
                        </h4>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`label-${langCode}-${field.id}`}>Label</Label>
                            <Input
                              id={`label-${langCode}-${field.id}`}
                              value={translations[langCode].fields[field.id]?.label || ""}
                              onChange={(e) => updateTranslation(langCode, "fields", "label", field.id, e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`placeholder-${langCode}-${field.id}`}>Placeholder</Label>
                            <Input
                              id={`placeholder-${langCode}-${field.id}`}
                              value={translations[langCode].fields[field.id]?.placeholder || ""}
                              onChange={(e) =>
                                updateTranslation(langCode, "fields", "placeholder", field.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

