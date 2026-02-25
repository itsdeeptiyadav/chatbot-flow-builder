"use client";

export default function NodesPanel() {

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-white border-l p-4">

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Nodes Panel
      </h3>

      <div
        className="p-3 border rounded-md cursor-move bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
        draggable
        onDragStart={(e) => handleDragStart(e, "textNode")}
      >
        Message Node
      </div>

    </div>
  );
}