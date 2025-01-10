import { useState } from "react";

type UseDraggableListProps<T> = {
  items: T[];
  onReorder: (newOrder: T[]) => void;
};

function useDraggableList<T>({ items, onReorder }: UseDraggableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function onDragStart(index: number) {
    setDraggedIndex(index);
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function onDrop(index: number) {
    if (draggedIndex === null || draggedIndex === index) return;

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(draggedIndex, 1);
    reorderedItems.splice(index, 0, movedItem);

    onReorder(reorderedItems);
    setDraggedIndex(null);
  }

  return { draggedIndex, onDragStart, onDragOver, onDrop };
}

export { useDraggableList };
