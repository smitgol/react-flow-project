"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, {
    useReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider
  } from 'reactflow';
import 'reactflow/dist/style.css';
import TopBar  from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import CustomNode from './reactFlowCustomCom/CustomNode';
import 'reactflow/dist/base.css';

import '../../tailwind.config'
import { useFlowContext } from '@/contexts/FlowContext';

const nodeTypes = { custom: CustomNode };



const NodeCanva = () => {
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const reactFlowWrapper = useRef(null);
  const {nodeValues, addOrUpdateNodeValues} = useFlowContext();
  const [currentId, setCurrentId] = useState<number>(1);
  const [isNodeAddByUser, setIsNodeAddedByUser] = useState<boolean>(false);

  //using this to get saved nodes and edge when window object is available
  useEffect(() => {
    if (window !== undefined) {
      const savedNodes = JSON.parse(localStorage.getItem('nodes') ?? '[]');
      const savedEdges = JSON.parse(localStorage.getItem('edges') ?? '[]');
    
      setNodes(savedNodes);
      setEdges(savedEdges);
      if (savedNodes.length > 0) {
        setCurrentId(savedNodes.length+1);
      }
    }
    
  },[]);


  const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );

  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
  
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
  
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
  
      const newNode = {
        id: currentId.toString(),
        type: 'custom',
        position,
        data: { type, id: currentId },
      };
      setIsNodeAddedByUser(true);
      setNodes((nds) => nds.concat(newNode));      
      setCurrentId((preVal) => preVal + 1);      
    },
    [reactFlowInstance, currentId]
  );

  //only call this func when node is added
  useEffect(() => {
    if (nodes.length > 0 && isNodeAddByUser) {
      const latestNode = nodes[nodes.length - 1];
      addOrUpdateNodeValues(latestNode.id, `text message ${latestNode.id}`);
    }
  }, [nodes]);

  const checkIfCanvaIsValid = () => {
    if (nodes.length > 1) {
      let node_ids = nodes.map((node) => node.id);
      edges.forEach(edge => {
        let targertId = edge.target;
        node_ids = node_ids.filter((nodeId) => nodeId !== targertId);
      });
      if (node_ids.length <= 1) {
        //caching nodes and edges
        saveNodeLocally();
      }
      return node_ids.length <= 1;
    }
    saveNodeLocally();
    return true;
  }

  const saveNodeLocally = () => {
    if (window !== undefined) {
      localStorage.setItem('nodes', JSON.stringify(nodes));
      localStorage.setItem('edges', JSON.stringify(edges));
      localStorage.setItem('nodeValues', JSON.stringify(nodeValues));
    }
  }
      
    
    
  return (
    <div className='h-screen flex flex-col'>
      <TopBar checkForNodeValidation={checkIfCanvaIsValid}/>
      <div className="flex flex-row h-full">
        <div className="h-full w-full reactflow-wrapper" ref={reactFlowWrapper} >
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          />
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default NodeCanva