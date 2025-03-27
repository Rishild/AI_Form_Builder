"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, Upload, Info } from "lucide-react"
import { generateFormFromDescription } from "@/lib/ai-form-generator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { FormField } from "@/types/form"
// Add import for JsonTemplateHelper
import { JsonTemplateHelper } from "@/components/json-template-helper"

interface FormGeneratorProps {
  onFormGenerated: (title: string, fields: FormField[]) => void
}

export function FormGenerator({ onFormGenerated }: FormGeneratorProps) {
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please provide a description of the form you want to create.")
      return
    }

    setError("")
    setIsGenerating(true)

    try {
      const { title, fields } = await generateFormFromDescription(description)
      onFormGenerated(title, fields)
    } catch (err: any) {
      setError("Failed to generate form. Using fallback templates instead.")
      console.error(err)

      // Try again with fallback
      try {
        const { title, fields } = await generateFormFromDescription(description)
        onFormGenerated(title, fields)
      } catch (fallbackErr) {
        setError("Failed to generate form. Please try again later.")
        console.error("Fallback also failed:", fallbackErr)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        let parsed

        try {
          parsed = JSON.parse(content)
        } catch (parseError) {
          setError("Invalid JSON format: Could not parse the file")
          console.error("JSON parse error:", parseError)
          return
        }

        // More robust validation of the JSON structure
        if (typeof parsed === "object" && parsed !== null) {
          if (typeof parsed.title === "string" && Array.isArray(parsed.fields)) {
            // Validate each field has the required properties
            const validFields = parsed.fields.every(
              (field: any) =>
                typeof field.id === "string" && typeof field.type === "string" && typeof field.label === "string",
            )

            if (validFields) {
              // Ensure each field has conditionalLogic property
              const fieldsWithConditionalLogic = parsed.fields.map((field: any) => ({
                ...field,
                conditionalLogic: field.conditionalLogic || null,
              }))

              onFormGenerated(parsed.title, fieldsWithConditionalLogic)
            } else {
              setError("Invalid JSON format: Some fields are missing required properties (id, type, or label)")
            }
          } else {
            setError("Invalid JSON format: File must contain a title string and fields array")
          }
        } else {
          setError("Invalid JSON format: File does not contain a valid JSON object")
        }
      } catch (error) {
        setError("Error processing JSON file")
        console.error("Error processing JSON:", error)
      }
    }

    reader.onerror = () => {
      setError("Error reading file. Please try again with a different file.")
    }

    reader.readAsText(file)

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const examples = [
    "Create an ABA assessment form for new patients",
    "Generate a HIPAA consent form with signature field",
    "Make an autism screening questionnaire for children aged 3-5",
  ]

  const handleExampleClick = (example: string) => {
    setDescription(example)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Form Generator
        </CardTitle>
        <CardDescription>Describe the form you need, and we'll create it for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="info" className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Currently using pre-built templates. The form will be generated based on keywords in your description.
          </AlertDescription>
        </Alert>

        <Textarea
          placeholder="Describe the form you want to create (e.g., 'Create an ABA assessment form for new patients')"
          className="min-h-[150px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div>
          <p className="text-sm text-muted-foreground mb-2">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <Button key={example} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                {example}
              </Button>
            ))}
          </div>
          <JsonTemplateHelper />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json" className="hidden" />
        <Button variant="outline" className="w-1/2" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Import JSON
        </Button>
        <Button className="w-1/2" onClick={handleGenerate} disabled={isGenerating || !description.trim()}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Form...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Form
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

