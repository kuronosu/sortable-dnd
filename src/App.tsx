import { useState, CSSProperties } from "react";

const numbers = new Array(10).fill(0).map((it, idx) => idx + 1);

function arraymove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const tmp = [...arr];
  tmp.splice(fromIndex, 1);
  tmp.splice(toIndex, 0, arr[fromIndex]);
  return tmp;
}

const itemStyle: (isDragging: boolean) => CSSProperties = (isDragging) => ({
  border: `1px solid ${isDragging ? "white" : "gray"}`,
});

const SortableList = () => {
  const [items, setItems] = useState(numbers);
  const [draggingItem, setDraggingItem] = useState<number | null>(null);

  return (
    <ul>
      {items.map((item, idx) => (
        <li
          key={idx}
          className="list-item"
          style={itemStyle(draggingItem === item)}
          onDragEnter={() =>
            draggingItem !== null &&
            setItems((prev) =>
              arraymove(prev, prev.indexOf(draggingItem), prev.indexOf(item))
            )
          }
          onDragEnd={() => setDraggingItem(null)}
        >
          <span className="list-item-content">{item}</span>
          <span
            className="drag-handle"
            draggable
            onDragStart={() => setDraggingItem(item)}
          >
            |||
          </span>
        </li>
      ))}
    </ul>
  );
};

const App = () => (
  <div className="container-main flex">
    <h1>Drag and drop sortable</h1>
    <div
      style={{
        display: "flex",
      }}
    >
      <SortableList />
    </div>
  </div>
);

export default App;
