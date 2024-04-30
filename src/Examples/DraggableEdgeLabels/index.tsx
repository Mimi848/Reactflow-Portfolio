import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Node,
  Edge,
  ConnectionMode,
  OnConnect,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import ButtonEdge from "./ButtonEdge";

const initialNodes: Node[] = [
  {
    id: "button-1",
    type: "input",
    data: { label: "Button Edge 1" },
    position: { x: 125, y: 0 },
  },
  {
    id: "button-2",
    data: { label: "Button Edge 2" },
    position: { x: 25, y: 400 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "edge-button",
    source: "button-1",
    target: "button-2",
    type: "buttonedge",
  },
];

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const EdgesFlow: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid
      edgeTypes={edgeTypes}
      fitView
      attributionPosition="top-right"
      connectionMode={ConnectionMode.Loose}
    >
      <Panel position="bottom-right">
        Click and drag the Edge label around to position <br /> it according to
        your preference
      </Panel>
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default EdgesFlow;
