"use client"
import { useFormikContext, FieldArray } from "formik"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft, AlertTriangle } from "lucide-react"
import { SectionList } from "@/components/section-list"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Create a random ID
const createId = () => `id-${Math.random().toString(36).substring(2, 15)}`

// Initial empty section
const createEmptySection = () => ({
  id: createId(),
  title: `New Section`,
  contents: [
    {
      id: createId(),
      type: "video",
      title: "Video Lecture",
      description: "",
      resources: [],
    },
  ],
})

export default function CourseContent({ showErrors, onContinue, onBack }) {
  const { values, errors, touched, setFieldValue } = useFormikContext()

  const handleSectionsReorder = (reorderedSections) => {
    setFieldValue("sections", reorderedSections)
  }

  // Function to check if there are any errors in the sections
  const hasSectionErrors = () => {
    if (!errors.sections) return false

    // Check if sections is a string error (like "At least one section is required")
    if (typeof errors.sections === "string") return true

    // Check if any section has errors
    if (Array.isArray(errors.sections)) {
      return errors.sections.some(
        (sectionError) =>
          sectionError &&
          (sectionError.title ||
            (sectionError.contents &&
              (typeof sectionError.contents === "string" ||
                (Array.isArray(sectionError.contents) && sectionError.contents.some((contentError) => contentError))))),
      )
    }

    return false
  }

  const handleContinue = () => {
    // Check for errors before continuing
    if (hasSectionErrors()) {
      // Show errors but don't proceed
      return
    }

    // No errors, proceed to next step
    onContinue()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <p className="text-gray-500 mb-6">Organize your course into sections and add content to each section.</p>
      </div>

      {showErrors && hasSectionErrors() && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {typeof errors.sections === "string"
              ? errors.sections
              : "Please fix the errors in your course content before continuing. Make sure all sections have titles and content items."}
          </AlertDescription>
        </Alert>
      )}

      <FieldArray name="sections">
        {({ push, remove }) => (
          <div className="space-y-6">
            <SectionList
              sections={values.sections}
              onSectionsReorder={handleSectionsReorder}
              onRemoveSection={(sectionId) => {
                if (values.sections.length > 1) {
                  const index = values.sections.findIndex((section) => section.id === sectionId)
                  if (index !== -1) {
                    remove(index)
                  }
                } else {
                  alert("You must have at least one section")
                }
              }}
              errors={errors.sections}
              touched={touched.sections}
              showErrors={showErrors}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => push(createEmptySection())}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
        )}
      </FieldArray>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="button" onClick={handleContinue} disabled={showErrors && hasSectionErrors()}>
          Continue
        </Button>
      </div>
    </div>
  )
}
