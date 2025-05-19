"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { SectionItem } from "@/components/section-item"

export function SortableSection({ id, section, sectionIndex, onRemove, error, touched, showErrors }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className={`border ${error && showErrors ? "border-red-300" : "border-gray-200"}`}>
        <CardContent className="p-4">
          <SectionItem
            section={section}
            sectionIndex={sectionIndex}
            dragHandleProps={listeners}
            onRemove={onRemove}
            isDragging={isDragging}
            error={error}
            touched={touched}
            showErrors={showErrors}
          />
        </CardContent>
      </Card>
    </div>
  )
}
