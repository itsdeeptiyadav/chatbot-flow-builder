"use client";

export default function SaveButton({
  nodes,
  edges,
  validateFlow,
}) {

  const handleSaveClick = async () => {
    const isValid = validateFlow();

    if (!isValid) {
      alert(
        "Cannot save flow. More than one node has empty target handles."
      );
      return;
    }

    try {
      await fetch("/api/save-flow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      alert("Flow saved successfully!");
    } catch (error) {
      console.error("Error saving flow:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className="absolute right-4 top-4 z-10">
      <button
        onClick={handleSaveClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}