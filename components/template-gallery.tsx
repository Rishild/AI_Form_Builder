"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { FormField } from "@/types/form"
import { getTemplates } from "@/lib/templates"

interface TemplateGalleryProps {
  onTemplateSelected: (title: string, fields: FormField[]) => void
}

export function TemplateGallery({ onTemplateSelected }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const templates = getTemplates()

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{template.description}</p>
              <div className="mt-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {template.fields.length} fields
                </span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 pt-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => onTemplateSelected(template.title, template.fields)}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No templates found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

