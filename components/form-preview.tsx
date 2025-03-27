"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { FormField } from "@/types/form"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface FormPreviewProps {
  formTitle: string
  formFields: FormField[]
  initialData?: Record<string, any>
  onSubmit?: (data: Record<string, any>) => void
  isSubmitted?: boolean
}

export function FormPreview({
  formTitle,
  formFields,
  initialData = {},
  onSubmit,
  isSubmitted = false,
}: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {})
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(isSubmitted)

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData)
    }
  }, [initialData])

  // Update submitted state when isSubmitted prop changes
  useEffect(() => {
    setSubmitted(isSubmitted)
  }, [isSubmitted])

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))

    // Clear validation error for this field if it exists
    if (validationErrors[fieldId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    formFields.forEach((field) => {
      // Skip validation if field is not visible due to conditional logic
      if (!shouldShowField(field)) return

      if (field.required) {
        const value = formData[field.id]

        if (value === undefined || value === null || value === "") {
          errors[field.id] = "This field is required"
        } else if (Array.isArray(value) && value.length === 0) {
          errors[field.id] = "Please select at least one option"
        }
      }

      // Add type-specific validation
      if (field.type === "email" && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.id])) {
          errors[field.id] = "Please enter a valid email address"
        }
      }

      if (field.type === "phone" && formData[field.id]) {
        const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/
        if (!phoneRegex.test(formData[field.id])) {
          errors[field.id] = "Please enter a valid phone number"
        }
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setSubmitted(true)
      if (onSubmit) {
        onSubmit(formData)
      }
    } else {
      // Scroll to the first error
      const firstErrorId = Object.keys(validationErrors)[0]
      if (firstErrorId) {
        const element = document.getElementById(firstErrorId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
    }
  }

  const shouldShowField = (field: FormField): boolean => {
    if (!field.conditionalLogic) return true

    const { fieldId, operator, value } = field.conditionalLogic
    const dependentFieldValue = formData[fieldId]

    if (dependentFieldValue === undefined) return false

    switch (operator) {
      case "equals":
        return dependentFieldValue === value
      case "not_equals":
        return dependentFieldValue !== value
      case "contains":
        return String(dependentFieldValue).includes(value)
      case "greater_than":
        return Number(dependentFieldValue) > Number(value)
      case "less_than":
        return Number(dependentFieldValue) < Number(value)
      default:
        return true
    }
  }

  if (submitted && !onSubmit) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl">Form Submitted</CardTitle>
          <CardDescription>Thank you for submitting the form. Your response has been recorded.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setSubmitted(false)}>Submit Another Response</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field) => {
          // Skip rendering if conditional logic dictates the field should be hidden
          if (!shouldShowField(field)) return null

          return (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {field.type === "text" && (
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  rows={field.rows || 3}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "number" && (
                <Input
                  id={field.id}
                  type="number"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "email" && (
                <Input
                  id={field.id}
                  type="email"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "phone" && (
                <Input
                  id={field.id}
                  type="tel"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "date" && (
                <Input
                  id={field.id}
                  type="date"
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {field.type === "select" && (
                <Select value={formData[field.id] || ""} onValueChange={(value) => handleInputChange(field.id, value)}>
                  <SelectTrigger className={validationErrors[field.id] ? "border-destructive" : ""}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options || []).map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === "radio" && (
                <RadioGroup
                  value={formData[field.id] || ""}
                  onValueChange={(value) => handleInputChange(field.id, value)}
                  className={validationErrors[field.id] ? "border border-destructive rounded-md p-2" : ""}
                >
                  {(field.options || []).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                      <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {field.type === "checkbox" && (
                <div
                  className={`space-y-2 ${validationErrors[field.id] ? "border border-destructive rounded-md p-2" : ""}`}
                >
                  {(field.options || []).map((option, index) => {
                    const checkboxId = `${field.id}-${index}`
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={checkboxId}
                          checked={(formData[field.id] || []).includes(option)}
                          onCheckedChange={(checked) => {
                            const currentValues = formData[field.id] || []
                            const newValues = checked
                              ? [...currentValues, option]
                              : currentValues.filter((val: string) => val !== option)
                            handleInputChange(field.id, newValues)
                          }}
                        />
                        <Label htmlFor={checkboxId}>{option}</Label>
                      </div>
                    )
                  })}
                </div>
              )}

              {field.type === "toggle" && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id={field.id}
                    checked={formData[field.id] || false}
                    onCheckedChange={(checked) => handleInputChange(field.id, checked)}
                  />
                  <Label htmlFor={field.id}>{field.placeholder}</Label>
                </div>
              )}

              {field.type === "signature" && (
                <div className="border rounded-md p-4 h-40 flex items-center justify-center bg-muted/20">
                  <p className="text-muted-foreground text-center">
                    Signature field (implementation would require a canvas component)
                  </p>
                </div>
              )}

              {field.type === "file" && (
                <Input
                  id={field.id}
                  type="file"
                  onChange={(e) => {
                    const files = (e.target as HTMLInputElement).files
                    handleInputChange(field.id, files ? files[0] : null)
                  }}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-destructive" : ""}
                />
              )}

              {validationErrors[field.id] && <p className="text-sm text-destructive">{validationErrors[field.id]}</p>}
            </div>
          )
        })}

        <Button type="submit" className="w-full flex items-center gap-1">
          Submit Form
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

