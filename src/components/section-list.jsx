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
import { SortableSection } from "@/components/sortable-section"
import { Card, CardContent } from "@/components/ui/card"
import { SectionItem } from "@/components/section-item"

export function SectionList({ sections, onSectionsReorder, onRemoveSection, errors, touched, showErrors }) {
  const [activeId, setActiveId] = useState(null)
  const [activeSectionData, setActiveSectionData] = useState(null)

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

    // Find the section data for the overlay
    const draggedSection = sections.find((section) => section.id === active.id)
    if (draggedSection) {
      setActiveSectionData(draggedSection)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id)
      const newIndex = sections.findIndex((section) => section.id === over.id)

      const reorderedSections = arrayMove(sections, oldIndex, newIndex)
      onSectionsReorder(reorderedSections)
    }

    setActiveId(null)
    setActiveSectionData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections.map((section) => section.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <SortableSection
              key={section.id}
              id={section.id}
              section={section}
              sectionIndex={index}
              onRemove={() => onRemoveSection(section.id)}
              error={errors && errors[index]}
              touched={touched && touched[index]}
              showErrors={showErrors}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId && activeSectionData ? (
          <Card className="border border-gray-200 opacity-80 shadow-md">
            <CardContent className="p-4">
              <SectionItem
                section={activeSectionData}
                sectionIndex={-1} // Placeholder index for the overlay
                onRemove={() => {}}
                isDragging={true}
              />
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
