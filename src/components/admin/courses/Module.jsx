"use client";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import SectionItem from "./SectionItem";

export default function SectionsForm({ formFooter }) {
  // Start at step 2 (Sections)
  const [sections, setSections] = useState([
    {
      id: "section-1",
      title: "Week 1: Camera Basics",
      contents: [
        { id: "content-1", type: "video", title: "Video Lecture" },
        { id: "content-2", type: "material", title: "Course Materials" },
        { id: "content-3", type: "quiz", title: "Quiz" },
        { id: "content-4", type: "assignment", title: "Assignment" },
      ],
    },
  ]);

  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: `Week ${sections.length + 1}: New Section`,
      contents: [],
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (updatedSection) => {
    setSections(
      sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const onDragEnd = (result) => {
    const { destination, source, type, draggableId } = result;

    // If there's no destination or the item was dropped in its original position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Handle section reordering
    if (type === "section") {
      const reorderedSections = Array.from(sections);
      const [removed] = reorderedSections.splice(source.index, 1);
      reorderedSections.splice(destination.index, 0, removed);
      setSections(reorderedSections);
      return;
    }

    // Handle content reordering within a section or between sections
    if (type === "content") {
      const sourceSection = sections.find(
        (section) => section.id === source.droppableId
      );
      const destSection = sections.find(
        (section) => section.id === destination.droppableId
      );

      // If source or destination section not found
      if (!sourceSection || !destSection) return;

      // Create deep copies to avoid mutation
      const newSections = JSON.parse(JSON.stringify(sections));
      const newSourceSectionIndex = newSections.findIndex(
        (section) => section.id === source.droppableId
      );
      const newDestSectionIndex = newSections.findIndex(
        (section) => section.id === destination.droppableId
      );

      // Get the content item being moved
      const contentItem = sourceSection.contents[source.index];

      // Remove from source
      newSections[newSourceSectionIndex].contents.splice(source.index, 1);

      // Add to destination
      newSections[newDestSectionIndex].contents.splice(
        destination.index,
        0,
        contentItem
      );

      setSections(newSections);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleAddSection}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Section
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections" type="section">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
              >
                {sections.map((section, index) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    index={index}
                    onUpdate={handleUpdateSection}
                    onDelete={handleDeleteSection}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {formFooter}
    </div>
  );
}
