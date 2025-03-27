import type { FormField } from "@/types/form"

// Define FormFieldType
type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "phone"
  | "select"
  | "radio"
  | "checkbox"
  | "toggle"
  | "signature"

// Fallback templates to use when API is unavailable
const fallbackTemplates = {
  assessment: {
    title: "Patient Assessment Form",
    fields: [
      {
        id: "patient-name",
        type: "text",
        label: "Patient Name",
        placeholder: "Enter patient's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "date-of-birth",
        type: "date",
        label: "Date of Birth",
        placeholder: "Select date of birth",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "contact-number",
        type: "phone",
        label: "Contact Number",
        placeholder: "Enter phone number",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter email address",
        required: false,
        conditionalLogic: null,
      },
      {
        id: "medical-history",
        type: "textarea",
        label: "Medical History",
        placeholder: "Enter relevant medical history",
        required: true,
        rows: 4,
        conditionalLogic: null,
      },
      {
        id: "current-medications",
        type: "textarea",
        label: "Current Medications",
        placeholder: "List all current medications",
        required: false,
        rows: 3,
        conditionalLogic: null,
      },
      {
        id: "allergies",
        type: "textarea",
        label: "Allergies",
        placeholder: "List any known allergies",
        required: false,
        rows: 2,
        conditionalLogic: null,
      },
      {
        id: "primary-concern",
        type: "textarea",
        label: "Primary Concern",
        placeholder: "Describe the main reason for visit",
        required: true,
        rows: 3,
        conditionalLogic: null,
      },
      {
        id: "consent",
        type: "toggle",
        label: "Consent to Treatment",
        placeholder: "I consent to treatment",
        required: true,
        conditionalLogic: null,
      },
    ],
  },
  consent: {
    title: "Patient Consent Form",
    fields: [
      {
        id: "patient-name",
        type: "text",
        label: "Patient Name",
        placeholder: "Enter patient's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "date-of-birth",
        type: "date",
        label: "Date of Birth",
        placeholder: "Select date of birth",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "consent-treatment",
        type: "checkbox",
        label: "I consent to the following:",
        placeholder: "",
        required: true,
        options: [
          "Medical examination and treatment",
          "Release of information to insurance providers",
          "Photography for medical documentation",
          "Use of telehealth services when appropriate",
        ],
        conditionalLogic: null,
      },
      {
        id: "privacy-acknowledgment",
        type: "toggle",
        label: "Privacy Policy Acknowledgment",
        placeholder: "I acknowledge that I have received a copy of the privacy policy",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "financial-responsibility",
        type: "toggle",
        label: "Financial Responsibility",
        placeholder: "I understand that I am financially responsible for any charges not covered by insurance",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "signature",
        type: "signature",
        label: "Patient/Guardian Signature",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "date",
        type: "date",
        label: "Date",
        placeholder: "Today's date",
        required: true,
        conditionalLogic: null,
      },
    ],
  },
  intake: {
    title: "Patient Intake Form",
    fields: [
      {
        id: "patient-name",
        type: "text",
        label: "Patient Name",
        placeholder: "Enter patient's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "date-of-birth",
        type: "date",
        label: "Date of Birth",
        placeholder: "Select date of birth",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "gender",
        type: "radio",
        label: "Gender",
        placeholder: "",
        required: true,
        options: ["Male", "Female", "Non-binary", "Prefer not to say"],
        conditionalLogic: null,
      },
      {
        id: "address",
        type: "textarea",
        label: "Address",
        placeholder: "Enter your full address",
        required: true,
        rows: 3,
        conditionalLogic: null,
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter email address",
        required: false,
        conditionalLogic: null,
      },
      {
        id: "emergency-contact",
        type: "text",
        label: "Emergency Contact Name",
        placeholder: "Enter emergency contact's name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "emergency-phone",
        type: "phone",
        label: "Emergency Contact Phone",
        placeholder: "Enter emergency contact's phone number",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "insurance-provider",
        type: "text",
        label: "Insurance Provider",
        placeholder: "Enter insurance company name",
        required: false,
        conditionalLogic: null,
      },
      {
        id: "insurance-id",
        type: "text",
        label: "Insurance ID",
        placeholder: "Enter insurance ID number",
        required: false,
        conditionalLogic: null,
      },
      {
        id: "primary-physician",
        type: "text",
        label: "Primary Care Physician",
        placeholder: "Enter primary doctor's name",
        required: false,
        conditionalLogic: null,
      },
    ],
  },
  aba: {
    title: "ABA Assessment Form",
    fields: [
      {
        id: "client-name",
        type: "text",
        label: "Client Name",
        placeholder: "Enter client's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "client-dob",
        type: "date",
        label: "Date of Birth",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "guardian-name",
        type: "text",
        label: "Parent/Guardian Name",
        placeholder: "Enter parent/guardian's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "contact-number",
        type: "phone",
        label: "Contact Number",
        placeholder: "Enter phone number",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter email address",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "diagnosis",
        type: "select",
        label: "Primary Diagnosis",
        placeholder: "Select primary diagnosis",
        required: true,
        options: ["Autism Spectrum Disorder", "ADHD", "Developmental Delay", "Other (please specify)"],
        conditionalLogic: null,
      },
      {
        id: "diagnosis-other",
        type: "text",
        label: "If Other Diagnosis, Please Specify",
        placeholder: "Enter diagnosis",
        required: false,
        conditionalLogic: {
          fieldId: "diagnosis",
          operator: "equals",
          value: "Other (please specify)",
        },
      },
      {
        id: "behaviors",
        type: "checkbox",
        label: "Behaviors of Concern",
        placeholder: "",
        required: true,
        options: [
          "Aggression",
          "Self-injury",
          "Tantrums",
          "Non-compliance",
          "Elopement",
          "Repetitive behaviors",
          "Communication difficulties",
          "Social skills deficits",
        ],
        conditionalLogic: null,
      },
      {
        id: "behavior-description",
        type: "textarea",
        label: "Behavior Description",
        placeholder: "Please describe the behaviors in detail",
        required: true,
        rows: 4,
        conditionalLogic: null,
      },
      {
        id: "previous-therapy",
        type: "radio",
        label: "Previous ABA Therapy?",
        placeholder: "",
        required: true,
        options: ["Yes", "No"],
        conditionalLogic: null,
      },
      {
        id: "therapy-goals",
        type: "textarea",
        label: "Goals for Therapy",
        placeholder: "What are your goals for ABA therapy?",
        required: true,
        rows: 4,
        conditionalLogic: null,
      },
    ],
  },
  hipaa: {
    title: "HIPAA Consent Form",
    fields: [
      {
        id: "patient-name",
        type: "text",
        label: "Patient Name",
        placeholder: "Enter patient's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "patient-dob",
        type: "date",
        label: "Date of Birth",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "acknowledgment",
        type: "checkbox",
        label: "I acknowledge that:",
        placeholder: "",
        required: true,
        options: [
          "I have received a copy of the Notice of Privacy Practices",
          "I understand my health information may be used for treatment, payment, and healthcare operations",
          "I understand I have the right to request restrictions on how my information is used",
          "I understand I may revoke this consent in writing",
        ],
        conditionalLogic: null,
      },
      {
        id: "disclosure-authorization",
        type: "textarea",
        label: "I authorize disclosure of my healthcare information to the following individuals:",
        placeholder: "Enter names and relationships",
        required: false,
        rows: 3,
        conditionalLogic: null,
      },
      {
        id: "communication-preferences",
        type: "checkbox",
        label: "Preferred methods of communication:",
        placeholder: "",
        required: true,
        options: ["Phone call", "Text message", "Email", "Patient portal", "Mail"],
        conditionalLogic: null,
      },
      {
        id: "signature",
        type: "signature",
        label: "Patient/Guardian Signature",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "date",
        type: "date",
        label: "Date",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
    ],
  },
  autism: {
    title: "Autism Screening Questionnaire",
    fields: [
      {
        id: "child-name",
        type: "text",
        label: "Child's Name",
        placeholder: "Enter child's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "child-age",
        type: "number",
        label: "Child's Age (in years)",
        placeholder: "Enter age",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "child-dob",
        type: "date",
        label: "Date of Birth",
        placeholder: "",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "parent-name",
        type: "text",
        label: "Parent/Guardian Name",
        placeholder: "Enter parent/guardian's full name",
        required: true,
        conditionalLogic: null,
      },
      {
        id: "social-interaction",
        type: "radio",
        label: "Does your child make eye contact when you speak to them?",
        placeholder: "",
        required: true,
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        conditionalLogic: null,
      },
      {
        id: "joint-attention",
        type: "radio",
        label: "Does your child point to show you things of interest?",
        placeholder: "",
        required: true,
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        conditionalLogic: null,
      },
      {
        id: "pretend-play",
        type: "radio",
        label: "Does your child engage in pretend play?",
        placeholder: "",
        required: true,
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        conditionalLogic: null,
      },
      {
        id: "repetitive-behaviors",
        type: "checkbox",
        label: "Does your child show any of these behaviors?",
        placeholder: "",
        required: true,
        options: [
          "Hand flapping",
          "Rocking back and forth",
          "Spinning objects repeatedly",
          "Lining up toys or objects",
          "Unusual attachment to specific objects",
          "Unusual sensory interests",
        ],
        conditionalLogic: null,
      },
      {
        id: "additional-concerns",
        type: "textarea",
        label: "Please describe any other concerns you have about your child's development:",
        placeholder: "Enter your concerns here",
        required: false,
        rows: 4,
        conditionalLogic: null,
      },
    ],
  },
}

// Function to get a fallback template based on description keywords
function getFallbackTemplate(description: string): { title: string; fields: FormField[] } {
  const lowerDesc = description.toLowerCase()

  if (lowerDesc.includes("aba") || lowerDesc.includes("behavior") || lowerDesc.includes("applied behavior analysis")) {
    return fallbackTemplates.aba
  } else if (lowerDesc.includes("hipaa") || lowerDesc.includes("consent")) {
    return fallbackTemplates.hipaa
  } else if (lowerDesc.includes("autism") || lowerDesc.includes("screening") || lowerDesc.includes("questionnaire")) {
    return fallbackTemplates.autism
  } else if (lowerDesc.includes("assessment") || lowerDesc.includes("evaluation")) {
    return fallbackTemplates.assessment
  } else if (lowerDesc.includes("intake") || lowerDesc.includes("registration")) {
    return fallbackTemplates.intake
  }

  // Default to assessment if no match
  return fallbackTemplates.assessment
}

// Completely bypass the OpenAI API and use fallback templates directly
export async function generateFormFromDescription(
  description: string,
): Promise<{ title: string; fields: FormField[] }> {
  console.log("Using fallback template for form generation")
  return getFallbackTemplate(description)
}

// Fallback suggestions for different form types
const fallbackSuggestions = {
  assessment: [
    {
      id: `field-${Date.now()}-1`,
      type: "textarea",
      label: "Family Medical History",
      placeholder: "Enter relevant family medical history",
      required: false,
      rows: 3,
      conditionalLogic: null,
    },
    {
      id: `field-${Date.now()}-2`,
      type: "checkbox",
      label: "Symptoms",
      placeholder: "Select all that apply",
      required: true,
      options: ["Fever", "Cough", "Fatigue", "Pain", "Nausea", "Dizziness"],
      conditionalLogic: null,
    },
  ],
  consent: [
    {
      id: `field-${Date.now()}-1`,
      type: "toggle",
      label: "Emergency Contact Authorization",
      placeholder: "I authorize emergency contacts to make medical decisions in my absence",
      required: false,
      conditionalLogic: null,
    },
    {
      id: `field-${Date.now()}-2`,
      type: "textarea",
      label: "Special Instructions",
      placeholder: "Enter any special instructions or considerations",
      required: false,
      rows: 3,
      conditionalLogic: null,
    },
  ],
  intake: [
    {
      id: `field-${Date.now()}-1`,
      type: "select",
      label: "Preferred Language",
      placeholder: "Select preferred language",
      required: false,
      options: ["English", "Spanish", "French", "Other"],
      conditionalLogic: null,
    },
    {
      id: `field-${Date.now()}-2`,
      type: "toggle",
      label: "Need Interpreter",
      placeholder: "Check if you need an interpreter",
      required: false,
      conditionalLogic: null,
    },
  ],
  aba: [
    {
      id: `field-${Date.now()}-1`,
      type: "textarea",
      label: "Communication Skills",
      placeholder: "Describe current communication abilities",
      required: false,
      rows: 3,
      conditionalLogic: null,
    },
    {
      id: `field-${Date.now()}-2`,
      type: "select",
      label: "Preferred Reinforcers",
      placeholder: "Select preferred reinforcers",
      required: false,
      options: ["Toys", "Food", "Activities", "Social praise", "Other"],
      conditionalLogic: null,
    },
  ],
  default: [
    {
      id: `field-${Date.now()}-1`,
      type: "textarea",
      label: "Additional Notes",
      placeholder: "Enter any additional information",
      required: false,
      rows: 3,
      conditionalLogic: null,
    },
    {
      id: `field-${Date.now()}-2`,
      type: "toggle",
      label: "Follow-up Required",
      placeholder: "Indicate if follow-up is needed",
      required: false,
      conditionalLogic: null,
    },
  ],
}

// Function to get fallback suggestions based on form title
function getFallbackSuggestions(formTitle: string): FormField[] {
  const lowerTitle = formTitle.toLowerCase()

  if (
    lowerTitle.includes("aba") ||
    lowerTitle.includes("behavior") ||
    lowerTitle.includes("applied behavior analysis")
  ) {
    return fallbackSuggestions.aba
  } else if (lowerTitle.includes("consent") || lowerTitle.includes("hipaa")) {
    return fallbackSuggestions.consent
  } else if (lowerTitle.includes("assessment") || lowerTitle.includes("evaluation")) {
    return fallbackSuggestions.assessment
  } else if (lowerTitle.includes("intake") || lowerTitle.includes("registration")) {
    return fallbackSuggestions.intake
  }

  return fallbackSuggestions.default
}

// Completely bypass the OpenAI API and use fallback suggestions directly
export async function suggestAdditionalFields(formTitle: string, existingFields: FormField[]): Promise<FormField[]> {
  console.log("Using fallback suggestions for field suggestions")
  return getFallbackSuggestions(formTitle)
}

