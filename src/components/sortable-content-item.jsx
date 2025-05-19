"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ContentItem } from "@/components/content-item"

export function SortableContentItem({ id, content, sectionIndex, contentIndex, onRemove, error, touched, showErrors }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ContentItem
        content={content}
        sectionIndex={sectionIndex}
        contentIndex={contentIndex}
        dragHandleProps={listeners}
        onRemove={onRemove}
        isDragging={isDragging}
        error={error}
        touched={touched}
        showErrors={showErrors}
      />
    </div>
  )
}
