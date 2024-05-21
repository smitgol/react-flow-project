"use client";
import NodeCanva from '@/components/NodeCanva';
import { FlowContextProvider } from '@/contexts/FlowContext';
import ReactFlow, {
  ReactFlowProvider
} from 'reactflow'; 


export default function Home() {
  return (
    <FlowContextProvider>
        <NodeCanva />
    </FlowContextProvider>
    );
}

