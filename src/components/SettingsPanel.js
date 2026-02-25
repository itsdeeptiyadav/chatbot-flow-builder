"use client";

export default function SettingsPanel({
  selectedNode,
  updateNodeText,
}) {
  // If no node selected, show nothing
  if (!selectedNode) return null;

  return (
    <div className="w-64 bg-white border-l p-4 flex flex-col">
      
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Settings Panel
      </h3>

      {/* Label */}
      <label className="text-sm mb-2 text-gray-600">
        Message Text
      </label>

      {/* Textarea */}
      <textarea
        className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        value={selectedNode.data.text}
        onChange={(e) =>
          updateNodeText(selectedNode.id, e.target.value)
        }
      />

    </div>
  );
}