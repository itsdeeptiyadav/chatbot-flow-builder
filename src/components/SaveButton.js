"use client";

export default function SaveButton({
  nodes,
  edges,
  validateFlow,
}) {
  const handleSave = async () => {
    if (!validateFlow()) {
      alert(
        "Cannot save flow. More than one node has empty target handles."
      );
      return;
    }

    await fetch("/api/save-flow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    alert("Flow saved successfully!");
  };

  return (
    <div className="absolute right-4 top-4 z-10">
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}