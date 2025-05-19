"use client"

import { useState } from "react"
import { useFormikContext, FieldArray } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Edit, Check, Plus } from "lucide-react"
import { ContentItem } from "@/components/content-item"
import { AddContentDialog } from "@/components/add-content-dialog"

export function Section({ sectionIndex, section, onRemove }) {
  const { values, setFieldValue } = useFormikContext()
  const [isEditing, setIsEditing] = useState(false)
  const [sectionName, setSectionName] = useState(section.name)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)

  const handleEditName = () => {
    if (isEditing) {
      setFieldValue(`sections[${sectionIndex}].name`, sectionName)
    }
    setIsEditing(!isEditing)
  }

  const hasContentType = (type) => {
    return section.contents.some((content) => content.type === type)
  }

  const hasQuiz = hasContentType("quiz")
  const hasAssignment = hasContentType("assignment")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {isEditing ? (
            <Input
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="max-w-md"
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-semibold">{section.name}</h3>
          )}
          <Button type="button" variant="ghost" size="icon" onClick={handleEditName} className="h-8 w-8">
            {isEditing ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8 text-destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <FieldArray name={`sections[${sectionIndex}].contents`}>
        {({ push, remove }) => (
          <div className="space-y-4">
            {section.contents.length > 0 ? (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                {section.contents.map((content, contentIndex) => (
                  <ContentItem
                    key={content.id}
                    content={content}
                    sectionIndex={sectionIndex}
                    contentIndex={contentIndex}
                    onRemove={() => remove(contentIndex)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No content added to this section yet</p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddContentOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Content
            </Button>

            <AddContentDialog
              open={isAddContentOpen}
              onOpenChange={setIsAddContentOpen}
              onAdd={(contentType) => {
                // Check if quiz or assignment already exists
                if ((contentType === "quiz" && hasQuiz) || (contentType === "assignment" && hasAssignment)) {
                  alert(`You can only add one ${contentType} per section`)
                  return
                }

                const newContent = {
                  id: Date.now().toString(),
                  type: contentType,
                  title: `New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`,
                  description: "",
                  ...(contentType === "quiz" && {
                    quizType: "multiChoice",
                    quizQuestions: [
                      {
                        id: Date.now().toString(),
                        question: "New Question",
                        options: ["Option A", "Option B", "Option C"],
                        correctAnswer: 0,
                      },
                    ],
                  }),
                  ...(contentType === "assignment" && {
                    assignmentDetails: {
                      question: "Assignment Question",
                      passMark: 70,
                    },
                  }),
                }

                push(newContent)
                setIsAddContentOpen(false)
              }}
              disabledTypes={{
                quiz: hasQuiz,
                assignment: hasAssignment,
              }}
            />
          </div>
        )}
      </FieldArray>
    </div>
  )
}
