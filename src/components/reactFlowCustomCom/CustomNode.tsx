import { useFlowContext } from '@/contexts/FlowContext';
import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import TextComponentLabel from '../chatComponents/TextMessage/TextComponentLabel';

interface DataProp {
  id:string,
  type:string
}

function CustomNode({ data }:{data: DataProp}) {
  const {nodeValues, setEditNodeMode, setEditNodeId,addOrUpdateNodeValues} = useFlowContext();

  useEffect(() => {
    
  }, [])

  const renderNodeComponent = (type:string) => {
    if (type==="message") {
      return <TextComponentLabel id={data.id} value={nodeValues[data.id].value}></TextComponentLabel>
    }
    else {
      return ''
    }
  }
  return (
    <div className="shadow-md rounded-sm bg-white">
      <div onClick={() => {
        setEditNodeMode(true);
        setEditNodeId(data.id);
        }}>
        {renderNodeComponent(data.type)}
      </div>

      <Handle type="target" position={Position.Left}/>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
}

export default memo(CustomNode);