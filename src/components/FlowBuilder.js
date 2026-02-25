"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

import TextNode from "./nodes/TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";

// Register custom node types
const nodeTypes = {
  textNode: TextNode,
};

// Simple incremental id generator
let nodeCounter = 0;
const generateId = () => `node_${nodeCounter++}`;

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Store only the id of selected node
  const [activeNodeId, setActiveNodeId] = useState(null);

  /**
   * Allow only one outgoing connection from a source node
   */
  const handleConnect = useCallback(
    (connection) => {
      const hasOutgoing = edges.some(
        (edge) => edge.source === connection.source
      );

      if (hasOutgoing) return;

      setEdges((prevEdges) => addEdge(connection, prevEdges));
    },
    [edges]
  );

  /**
   * Handle node drop from the side panel
   */
  const handleDrop = (e) => {
    e.preventDefault();

    const nodeType = e.dataTransfer.getData(
      "application/reactflow"
    );

    const newNode = {
      id: generateId(),
      type: nodeType,
      position: {
        x: e.clientX - 250,
        y: e.clientY - 100,
      },
      data: { text: "New Message" },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  /**
   * Update text of a specific node
   */
  const handleTextUpdate = (id, value) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, text: value } }
          : node
      )
    );
  };

  // Get currently selected node from state
  const activeNode = nodes.find(
    (node) => node.id === activeNodeId
  );

  /**
   * Validation:
   * Only one node can exist without incoming edges
   */
  const validateFlow = () => {
    if (nodes.length <= 1) return true;

    const nodesWithoutIncoming = nodes.filter(
      (node) =>
        !edges.some((edge) => edge.target === node.id)
    );

    return nodesWithoutIncoming.length <= 1;
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">

        <SaveButton
          nodes={nodes}
          edges={edges}
          validateFlow={validateFlow}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onNodeClick={(e, node) =>
            setActiveNodeId(node.id)
          }
          onPaneClick={() => setActiveNodeId(null)}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

      </div>

      {activeNode ? (
        <SettingsPanel
          selectedNode={activeNode}
          updateNodeText={handleTextUpdate}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
}