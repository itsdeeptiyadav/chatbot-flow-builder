
"use client";

import { Handle, Position } from "reactflow";

export default function TextNode({ data }) {
  return (
    <div className="bg-white shadow-lg rounded-lg border w-60">

      {/* Header */}
      <div className="bg-green-500 text-white px-3 py-2 rounded-t-lg font-semibold">
        Send Message
      </div>

      {/* Message Text */}
      <div className="px-3 py-3 text-gray-800 font-medium text-base">
        {data.text}
      </div>

      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Left}
      />

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}