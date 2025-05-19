"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileVideo, FileText, HelpCircle, FileSpreadsheet, CheckCircle2 } from "lucide-react"

export function AddContentDialog({ open, onOpenChange, onAdd, disabledTypes = {} }) {
  const contentTypes = [
    {
      type: "video",
      label: "Video",
      icon: <FileVideo className="h-6 w-6" />,
      description: "Add a video lecture to your section",
    },
    {
      type: "resource",
      label: "Resource",
      icon: <FileText className="h-6 w-6" />,
      description: "Add learning materials and resources",
    },
    {
      type: "quiz",
      label: "Quiz",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Add a quiz with multiple choice or Q&A format",
    },
    {
      type: "assignment",
      label: "Assignment",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      description: "Add an assignment with file upload",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {contentTypes.map((item) => (
            <Button
              key={item.type}
              variant="outline"
              className={`flex items-start justify-start h-auto p-4 ${
                disabledTypes[item.type] ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !disabledTypes[item.type] && onAdd(item.type)}
              disabled={disabledTypes[item.type]}
            >
              <div className="flex gap-4 items-center text-left">
                <div className="flex-shrink-0 text-gray-500">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                  {disabledTypes[item.type] && (
                    <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Already added</span>
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
