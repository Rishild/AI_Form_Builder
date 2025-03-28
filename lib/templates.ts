import type { FormField } from "@/types/form"

interface Template {
  id: string
  title: string
  category: string
  description: string
  fields: FormField[]
}

export function getTemplates(): Template[] {
  return [
    {
      id: "aba-assessment",
      title: "ABA Assessment Form",
      category: "Behavioral Therapy",
      description: "Comprehensive assessment form for Applied Behavior Analysis therapy sessions.",
      fields: [
        {
          id: "client-name",
          type: "text",
          label: "Client Name",
          placeholder: "Enter client's full name",
          required: true,
        },
        {
          id: "client-dob",
          type: "date",
          label: "Date of Birth",
          placeholder: "",
          required: true,
        },
        {
          id: "guardian-name",
          type: "text",
          label: "Parent/Guardian Name",
          placeholder: "Enter parent/guardian's full name",
          required: true,
        },
        {
          id: "contact-number",
          type: "phone",
          label: "Contact Number",
          placeholder: "Enter phone number",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "Enter email address",
          required: true,
        },
        {
          id: "diagnosis",
          type: "select",
          label: "Primary Diagnosis",
          placeholder: "Select primary diagnosis",
          required: true,
          options: ["Autism Spectrum Disorder", "ADHD", "Developmental Delay", "Other (please specify)"],
        },
        {
          id: "diagnosis-other",
          type: "text",
          label: "If Other Diagnosis, Please Specify",
          placeholder: "Enter diagnosis",
          required: false,
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
        },
        {
          id: "behavior-description",
          type: "textarea",
          label: "Behavior Description",
          placeholder: "Please describe the behaviors in detail",
          required: true,
          rows: 4,
        },
        {
          id: "previous-therapy",
          type: "radio",
          label: "Previous ABA Therapy?",
          placeholder: "",
          required: true,
          options: ["Yes", "No"],
        },
        {
          id: "therapy-goals",
          type: "textarea",
          label: "Goals for Therapy",
          placeholder: "What are your goals for ABA therapy?",
          required: true,
          rows: 4,
        },
        {
          id: "consent",
          type: "toggle",
          label: "I consent to the assessment and potential treatment",
          placeholder: "Consent to assessment",
          required: true,
        },
        {
          id: "signature",
          type: "signature",
          label: "Parent/Guardian Signature",
          placeholder: "",
          required: true,
        },
      ],
    },
    {
      id: "hipaa-consent",
      title: "HIPAA Consent Form",
      category: "Legal & Compliance",
      description: "Standard HIPAA consent form for healthcare providers.",
      fields: [
        {
          id: "patient-name",
          type: "text",
          label: "Patient Name",
          placeholder: "Enter patient's full name",
          required: true,
        },
        {
          id: "patient-dob",
          type: "date",
          label: "Date of Birth",
          placeholder: "",
          required: true,
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
        },
        {
          id: "disclosure-authorization",
          type: "textarea",
          label: "I authorize disclosure of my healthcare information to the following individuals:",
          placeholder: "Enter names and relationships",
          required: false,
          rows: 3,
        },
        {
          id: "communication-preferences",
          type: "checkbox",
          label: "Preferred methods of communication:",
          placeholder: "",
          required: true,
          options: ["Phone call", "Text message", "Email", "Patient portal", "Mail"],
        },
        {
          id: "phone",
          type: "phone",
          label: "Phone Number",
          placeholder: "Enter phone number",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "Enter email address",
          required: true,
        },
        {
          id: "signature",
          type: "signature",
          label: "Patient/Guardian Signature",
          placeholder: "",
          required: true,
        },
        {
          id: "date",
          type: "date",
          label: "Date",
          placeholder: "",
          required: true,
        },
      ],
    },
    {
      id: "autism-screening",
      title: "Autism Screening Questionnaire",
      category: "Assessment",
      description: "Screening questionnaire for autism spectrum disorder in children.",
      fields: [
        {
          id: "child-name",
          type: "text",
          label: "Child's Name",
          placeholder: "Enter child's full name",
          required: true,
        },
        {
          id: "child-age",
          type: "number",
          label: "Child's Age (in years)",
          placeholder: "Enter age",
          required: true,
        },
        {
          id: "child-dob",
          type: "date",
          label: "Date of Birth",
          placeholder: "",
          required: true,
        },
        {
          id: "parent-name",
          type: "text",
          label: "Parent/Guardian Name",
          placeholder: "Enter parent/guardian's full name",
          required: true,
        },
        {
          id: "relationship",
          type: "select",
          label: "Relationship to Child",
          placeholder: "Select relationship",
          required: true,
          options: ["Mother", "Father", "Grandparent", "Legal Guardian", "Other"],
        },
        {
          id: "social-interaction",
          type: "radio",
          label: "Does your child make eye contact when you speak to them?",
          placeholder: "",
          required: true,
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          id: "joint-attention",
          type: "radio",
          label: "Does your child point to show you things of interest?",
          placeholder: "",
          required: true,
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          id: "pretend-play",
          type: "radio",
          label: "Does your child engage in pretend play?",
          placeholder: "",
          required: true,
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
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
        },
        {
          id: "language-development",
          type: "radio",
          label: "How would you describe your child's language development?",
          placeholder: "",
          required: true,
          options: [
            "No words yet",
            "Single words only",
            "2-3 word phrases",
            "Full sentences with some errors",
            "Age-appropriate language",
          ],
        },
        {
          id: "additional-concerns",
          type: "textarea",
          label: "Please describe any other concerns you have about your child's development:",
          placeholder: "Enter your concerns here",
          required: false,
          rows: 4,
        },
        {
          id: "consent-evaluation",
          type: "toggle",
          label: "I consent to having my child evaluated further if screening indicates concerns",
          placeholder: "",
          required: true,
        },
      ],
    },
  ]
}

