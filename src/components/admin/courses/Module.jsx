"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ErrorMessage, useFormikContext } from "formik";
import { Plus } from "lucide-react";
import SectionItem from "./SectionItem";

export default function SectionsForm({ formFooter, errors, touched }) {
  const { values, setFieldValue } = useFormikContext();
  const [sections, setSections] = useState(values.sections || []);
  console.log(errors);
  useEffect(() => {
    setSections(values.sections || []);
  }, [values.sections]);

  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: `Week ${sections.length + 1}: New Section`,
      contents: [],
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    setFieldValue("sections", updatedSections);
  };

  const handleUpdateSection = (updatedSection) => {
    const updatedSections = sections.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );
    setSections(updatedSections);
    setFieldValue("sections", updatedSections);
  };

  const handleDeleteSection = (sectionId) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );
    setSections(updatedSections);
    setFieldValue("sections", updatedSections);
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let updatedSections;

    if (type === "section") {
      updatedSections = Array.from(sections);
      const [removed] = updatedSections.splice(source.index, 1);
      updatedSections.splice(destination.index, 0, removed);
    } else if (type === "content") {
      const sourceSection = sections.find(
        (section) => section.id === source.droppableId
      );
      const destSection = sections.find(
        (section) => section.id === destination.droppableId
      );

      if (!sourceSection || !destSection) return;

      updatedSections = JSON.parse(JSON.stringify(sections));
      const newSourceSectionIndex = updatedSections.findIndex(
        (section) => section.id === source.droppableId
      );
      const newDestSectionIndex = updatedSections.findIndex(
        (section) => section.id === destination.droppableId
      );

      const contentItem = sourceSection.contents[source.index];
      updatedSections[newSourceSectionIndex].contents.splice(source.index, 1);
      updatedSections[newDestSectionIndex].contents.splice(
        destination.index,
        0,
        contentItem
      );
    }

    if (updatedSections) {
      setSections(updatedSections);
      setFieldValue("sections", updatedSections);
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
