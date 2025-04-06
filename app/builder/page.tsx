"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FormBuilder } from "@/components/form-builder"
import { TranslationPanel } from "@/components/translation-panel"
import { FormPreview } from "@/components/form-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Save } from "lucide-react"
import Link from "next/link"

export default function BuilderPage() {
  const [formFields, setFormFields] = useState([
    { id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true },
    { id: "2", type: "email", label: "Email", placeholder: "Enter your email", required: true },
    { id: "3", type: "textarea", label: "Message", placeholder: "Enter your message", required: false },
  ])

  const [translations, setTranslations] = useState({
    en: {
      formTitle: "Contact Form",
      submitButton: "Submit",
      fields: {
        "1": { label: "Name", placeholder: "Enter your name" },
        "2": { label: "Email", placeholder: "Enter your email" },
        "3": { label: "Message", placeholder: "Enter your message" },
      },
    },
    es: {
      formTitle: "Formulario de Contacto",
      submitButton: "Enviar",
      fields: {
        "1": { label: "Nombre", placeholder: "Ingrese su nombre" },
        "2": { label: "Correo electrónico", placeholder: "Ingrese su correo electrónico" },
        "3": { label: "Mensaje", placeholder: "Ingrese su mensaje" },
      },
    },
  })

  const [currentLanguage, setCurrentLanguage] = useState("en")

  const handleSave = () => {
    const jsonData = JSON.stringify({ formFields, translations }, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "form-translations.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 font-bold">
              <span className="text-primary">Form</span>
              <span>Translator</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleSave}>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="builder">Form Builder</TabsTrigger>
              <TabsTrigger value="translations">Translations</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="builder" className="mt-6">
              <FormBuilder formFields={formFields} setFormFields={setFormFields} />
            </TabsContent>
            <TabsContent value="translations" className="mt-6">
              <TranslationPanel
                formFields={formFields}
                translations={translations}
                setTranslations={setTranslations}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-6">
              <FormPreview
                formFields={formFields}
                translations={translations}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

