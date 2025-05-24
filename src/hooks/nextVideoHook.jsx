import { useMemo } from "react";

export function useCourseContentNavigation(
  sections,
  currentContentId,
  enrollmentId
) {
  const flat = useMemo(() => {
    return sections.flatMap((sec) =>
      sec.contents.map((c) => ({
        ...c,
        sectionId: sec.id,
      }))
    );
  }, [sections]);

  const currentIndex = flat.findIndex((c) => c.id === currentContentId);
  const isLast = currentIndex === flat.length - 1;
  const nextContent = !isLast ? flat[currentIndex + 1] : null;

  const getContentMediaId = (content) => {
    const type = content.type?.toLowerCase() || "";
    const mediaArray = content[type];
    return Array.isArray(mediaArray) && mediaArray.length > 0
      ? mediaArray[0].id
      : content.id;
  };

  const handleNext = (navigate) => {
    if (!nextContent) return;
    const path = `/lesson/${enrollmentId}/content/${nextContent.id}/${
      nextContent.type
    }/${getContentMediaId(nextContent)}`;
    navigate(path);
  };

  return {
    currentIndex,
    isLast,
    nextContent,
    handleNext,
  };
}
