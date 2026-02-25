"use client";

export default function SettingsPanel({
  selectedNode,
  updateNodeText,
}) {

  // Don't render panel if nothing is selected
  if (!selectedNode) return null;

  const handleChange = (e) => {
    updateNodeText(selectedNode.id, e.target.value);
  };

  return (
    <div className="w-64 bg-white border-l p-4 flex flex-col">

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Settings Panel
      </h3>

      <label className="text-sm mb-2 text-gray-600">
        Message Text
      </label>

      <textarea
        rows={4}
        value={selectedNode.data.text}
        onChange={handleChange}
        className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

    </div>
  );
}