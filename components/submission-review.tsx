"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { FormField } from "@/types/form"
import { Edit2, Trash2, Download, Printer } from "lucide-react"
import { useRef } from "react"

interface SubmissionReviewProps {
  formTitle: string
  formFields: FormField[]
  formData: Record<string, any>
  onEdit: () => void
  onClear: () => void
}

export function SubmissionReview({ formTitle, formFields, formData, onEdit, onClear }: SubmissionReviewProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const printDocument = printWindow.document
    printDocument.write(`
      <html>
        <head>
          <title>${formTitle} - Submission</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; margin-bottom: 5px; }
            .value { padding: 5px 0; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${formTitle}</h1>
          <div>${printContent.innerHTML}</div>
          <button onclick="window.print()">Print</button>
        </body>
      </html>
    `)
    printDocument.close()
  }

  const handleDownload = () => {
    const submissionData = {
      formTitle,
      submittedAt: new Date().toISOString(),
      responses: formData,
    }

    const blob = new Blob([JSON.stringify(submissionData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formTitle.toLowerCase().replace(/\s+/g, "-")}-submission.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Submission Review</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div ref={printRef} className="space-y-4">
        {formFields.map((field) => {
          // Skip fields that don't have a value or are not visible due to conditional logic
          if (formData[field.id] === undefined) return null

          let displayValue: React.ReactNode = formData[field.id]

          // Format display value based on field type
          if (field.type === "checkbox" && Array.isArray(displayValue)) {
            displayValue = displayValue.join(", ")
          } else if (field.type === "toggle") {
            displayValue = displayValue ? "Yes" : "No"
          } else if (field.type === "date" && displayValue) {
            try {
              displayValue = new Date(displayValue).toLocaleDateString()
            } catch (e) {
              // Keep original value if date parsing fails
            }
          } else if (field.type === "file" && displayValue) {
            displayValue = "File uploaded"
          } else if (field.type === "signature" && displayValue) {
            displayValue = "Signature captured"
          }

          return (
            <Card key={field.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="font-medium text-muted-foreground">{field.label}</div>
                  <div className="md:col-span-2 break-words">
                    {displayValue || <span className="text-muted-foreground italic">No response</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClear} className="flex items-center gap-1">
          <Trash2 className="h-4 w-4" />
          Clear Submission
        </Button>
        <Button onClick={onEdit} className="flex items-center gap-1">
          <Edit2 className="h-4 w-4" />
          Edit Responses
        </Button>
      </div>
    </div>
  )
}

