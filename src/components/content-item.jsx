"use client"

import { useState } from "react"
import { useFormikContext } from "formik"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Trash,
  Edit,
  Check,
  FileVideo,
  FileText,
  HelpCircle,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  GripVertical,
  AlertCircle,
} from "lucide-react"
import { VideoContent } from "@/components/content-types/video-content"
import { ResourceContent } from "@/components/content-types/resource-content"
import { QuizContent } from "@/components/content-types/quiz-content"
import { AssignmentContent } from "@/components/content-types/assignment-content"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ContentItem({
  content,
  sectionIndex,
  contentIndex,
  dragHandleProps,
  onRemove,
  isDragging,
  error,
  touched,
  showErrors,
}) {
  const { values, handleChange, setFieldValue } = useFormikContext()
  const [isEditing, setIsEditing] = useState(false)
  const [contentTitle, setContentTitle] = useState(content.title)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleEditTitle = () => {
    if (isEditing) {
      setFieldValue(`sections[${sectionIndex}].contents[${contentIndex}].title`, contentTitle)
    }
    setIsEditing(!isEditing)
  }

  const getContentIcon = () => {
    switch (content.type) {
      case "video":
        return <FileVideo className="h-5 w-5 text-red-600" />
      case "resource":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "quiz":
        return <HelpCircle className="h-5 w-5 text-green-600" />
      case "assignment":
        return <FileSpreadsheet className="h-5 w-5 text-orange-600" />
    }
  }

  const getContentTitle = () => {
    switch (content.type) {
      case "video":
        return "Video"
      case "resource":
        return "Resource"
      case "quiz":
        return "Quiz"
      case "assignment":
        return "Assignment"
    }
  }

  const renderContentEditor = () => {
    if (!isExpanded) return null

    switch (content.type) {
      case "video":
        return (
          <VideoContent
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            content={content}
            error={error}
            showErrors={showErrors}
          />
        )
      case "resource":
        return (
          <ResourceContent
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            content={content}
            error={error}
            showErrors={showErrors}
          />
        )
      case "quiz":
        return (
          <QuizContent
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            content={content}
            error={error && error.questions}
            showErrors={showErrors}
          />
        )
      case "assignment":
        return (
          <AssignmentContent
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            content={content}
            error={error && error.assignmentDetails}
            showErrors={showErrors}
          />
        )
    }
  }

  // Count resources for badge display
  const resourceCount = (content.resources || []).length

  return (
    <Card className={`border ${error && showErrors ? "border-red-300" : "border-gray-200"}`}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gray-50">
        <div className="flex items-center gap-2">
          <button
            className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...dragHandleProps}
          >
            <GripVertical className="h-4 w-4" />
          </button>

          {getContentIcon()}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Input
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                className={`w-64 ${error && error.title && showErrors ? "border-red-500" : ""}`}
                autoFocus
              />
            ) : (
              <span className="font-medium">
                {getContentTitle()}: {content.title}
              </span>
            )}
            <Button type="button" variant="ghost" size="icon" onClick={handleEditTitle} className="h-6 w-6">
              {isEditing ? <Check className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
            </Button>
          </div>
          {resourceCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {resourceCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 h-7"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                <span className="text-xs">Hide</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span className="text-xs">Edit</span>
              </>
            )}
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="h-7 w-7 text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {error && error.title && showErrors && (
        <Alert variant="destructive" className="mx-4 mt-2 py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.title}</AlertDescription>
        </Alert>
      )}

      {isExpanded && (
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`sections[${sectionIndex}].contents[${contentIndex}].description`}>Description</Label>
              <Textarea
                id={`sections[${sectionIndex}].contents[${contentIndex}].description`}
                name={`sections[${sectionIndex}].contents[${contentIndex}].description`}
                value={content.description || ""}
                onChange={handleChange}
                rows={3}
                className={error && error.description && showErrors ? "border-red-500" : ""}
              />
              {error && error.description && showErrors && (
                <p className="text-red-500 text-sm mt-1">{error.description}</p>
              )}
            </div>

            {renderContentEditor()}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
