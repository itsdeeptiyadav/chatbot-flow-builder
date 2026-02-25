"use client";

import "reactflow/dist/style.css";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";

import TextNode from "./nodes/TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";

import { useCallback, useState } from "react";

const nodeTypes = {
  textNode: TextNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 🔥 Store ONLY selected node ID
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Allow only one outgoing edge per source
  const onConnect = useCallback(
    (params) => {
      const alreadyConnected = edges.find(
        (e) => e.source === params.source
      );

      if (alreadyConnected) return;

      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData(
      "application/reactflow"
    );

    const position = {
      x: event.clientX - 250,
      y: event.clientY - 100,
    };

    const newNode = {
      id: getId(),
      type,
      position,
      data: { text: "New Message" },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // 🔥 Proper update function
  const updateNodeText = (id, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  };

  // 🔥 Derive selected node from nodes state
  const selectedNode = nodes.find(
    (node) => node.id === selectedNodeId
  );

  // VALIDATION AS PER TASK
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
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onNodeClick={(e, node) =>
            setSelectedNodeId(node.id)
          }
          onPaneClick={() => setSelectedNodeId(null)}   
  
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
}