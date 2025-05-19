"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableContentItem } from "@/components/sortable-content-item"
import { ContentItem } from "@/components/content-item"

export function ContentList({
  contents,
  sectionIndex,
  onContentsReorder,
  onRemoveContent,
  errors,
  touched,
  showErrors,
}) {
  const [activeId, setActiveId] = useState(null)
  const [activeContentData, setActiveContentData] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)

    // Find the content data for the overlay
    const draggedContent = contents.find((content) => content.id === active.id)
    if (draggedContent) {
      setActiveContentData(draggedContent)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = contents.findIndex((content) => content.id === active.id)
      const newIndex = contents.findIndex((content) => content.id === over.id)

      const reorderedContents = arrayMove(contents, oldIndex, newIndex)
      onContentsReorder(reorderedContents)
    }

    setActiveId(null)
    setActiveContentData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={contents.map((content) => content.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {contents.map((content, contentIndex) => (
            <SortableContentItem
              key={content.id}
              id={content.id}
              content={content}
              sectionIndex={sectionIndex}
              contentIndex={contentIndex}
              onRemove={() => onRemoveContent(content.id)}
              error={errors && errors[contentIndex]}
              touched={touched && touched[contentIndex]}
              showErrors={showErrors}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId && activeContentData ? (
          <ContentItem
            content={activeContentData}
            sectionIndex={sectionIndex}
            contentIndex={-1} // Placeholder index for the overlay
            onRemove={() => {}}
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
