"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormGenerator } from "@/components/form-generator"
import { FormEditor } from "@/components/form-editor"
import { FormSubmissionHandler } from "@/components/form-submission-handler"
import { TemplateGallery } from "@/components/template-gallery"
import { JsonEditor } from "@/components/json-editor"
import type { FormField } from "@/types/form"

export function FormBuilder() {
  const [activeTab, setActiveTab] = useState("generate")
  const [formTitle, setFormTitle] = useState("New Form")
  const [formFields, setFormFields] = useState<FormField[]>([])

  const handleFormGenerated = (title: string, fields: FormField[]) => {
    setFormTitle(title)
    setFormFields(fields)
    setActiveTab("edit")
  }

  const handleTemplateSelected = (title: string, fields: FormField[]) => {
    setFormTitle(title)
    setFormFields(fields)
    setActiveTab("edit")
  }

  const handleJsonUpdate = (title: string, fields: FormField[]) => {
    setFormTitle(title)
    setFormFields(fields)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="submit">Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="p-6">
          <FormGenerator onFormGenerated={handleFormGenerated} />
        </TabsContent>

        <TabsContent value="templates" className="p-6">
          <TemplateGallery onTemplateSelected={handleTemplateSelected} />
        </TabsContent>

        <TabsContent value="edit" className="p-6">
          <FormEditor
            formTitle={formTitle}
            formFields={formFields}
            onFormTitleChange={setFormTitle}
            onFormFieldsChange={setFormFields}
          />
        </TabsContent>

        <TabsContent value="preview" className="p-6">
          <FormSubmissionHandler formTitle={formTitle} formFields={formFields} />
        </TabsContent>

        <TabsContent value="json" className="p-6">
          <JsonEditor formTitle={formTitle} formFields={formFields} onUpdate={handleJsonUpdate} />
        </TabsContent>

        <TabsContent value="submit" className="p-6">
          <FormSubmissionHandler formTitle={formTitle} formFields={formFields} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

