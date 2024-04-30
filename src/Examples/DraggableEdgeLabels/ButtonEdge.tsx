import React, { useCallback } from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
  useStore,
} from "reactflow";
import { useDraggableEdgeLabel } from "../../hooks";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  source,
  target,
}) => {
  const { setEdges } = useReactFlow();
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgePathRef, draggableEdgeLabelRef] = useDraggableEdgeLabel(
    sourceX,
    sourceY,
    sourceNode?.data.width,
    sourceNode?.data.height,
    targetX,
    targetY,
    targetNode?.data.width,
    targetNode?.data.height
  );

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <path
        id={id}
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
        ref={edgePathRef}
        stroke="#000"
        fill="transparent"
      />
      <EdgeLabelRenderer>
        <div
          ref={draggableEdgeLabelRef}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
