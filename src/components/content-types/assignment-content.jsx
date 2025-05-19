"use client"

import { useState, useRef } from "react"
import { useFormikContext } from "formik"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Upload, FileText } from "lucide-react"

export function AssignmentContent({ sectionIndex, contentIndex, content }) {
  const { handleChange, setFieldValue } = useFormikContext()
  const [fileName, setFileName] = useState(content.assignmentDetails?.fileName || "")
  const fileInputRef = useRef(null)

  const assignmentDetails = content.assignmentDetails || {
    question: "",
    passMark: 70,
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setFieldValue(`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.file`, file)
    setFieldValue(`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.fileName`, file.name)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.question`}>
          Assignment Question
        </Label>
        <Textarea
          id={`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.question`}
          name={`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.question`}
          value={assignmentDetails.question}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor={`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.passMark`}>
          Pass Mark: {assignmentDetails.passMark}%
        </Label>
        <Slider
          id={`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.passMark`}
          min={0}
          max={100}
          step={5}
          value={[assignmentDetails.passMark]}
          onValueChange={(value) => {
            setFieldValue(`sections[${sectionIndex}].contents[${contentIndex}].assignmentDetails.passMark`, value[0])
          }}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Upload Assignment File (PDF, Document)</Label>
        <div className="mt-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current.click()}
            className="w-full h-24 flex flex-col items-center justify-center border-dashed"
          >
            <Upload className="h-6 w-6 mb-2" />
            <span>{fileName || "Click to upload assignment file"}</span>
          </Button>
        </div>

        {fileName && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-gray-50 rounded-md">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{fileName}</span>
          </div>
        )}
      </div>
    </div>
  )
}
