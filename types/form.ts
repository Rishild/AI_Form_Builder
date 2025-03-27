export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "phone"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "toggle"
  | "signature"
  | "file"

export interface ConditionalLogic {
  fieldId: string
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than"
  value: string
}

export interface FormField {
  id: string
  type: FormFieldType
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  rows?: number
  conditionalLogic: ConditionalLogic | null
}

export interface FormSchema {
  title: string
  fields: FormField[]
}

