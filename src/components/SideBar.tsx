import React from 'react'
import TextComponent from './chatComponents/TextMessage/TextComponent'
import { useFlowContext } from '@/contexts/FlowContext'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea"

const SideBar = () => {
  const{editNodeMode, setEditNodeMode, editNodeId, nodeValues, addOrUpdateNodeValues} = useFlowContext();

  const draggableComs = [<TextComponent />]

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <section className='border-2 w-72'>
        {!editNodeMode ? <div className='grid grid-cols-2 p-3 gap-2'>
            {draggableComs.map((Com, index) => {
                return <div key={index} draggable onDragStart={(event) => onDragStart(event, 'message')}>
                        {Com}
                </div>
            })}
            
        </div>: <div className="flex flex-col items-center justify-center">
          <div className="bg-white border-t-2 border-b-2 w-full max-w-md">
            <div className="flex items-center border-b border-gray-300 p-4">
              <div className='flex-1 cursor-pointer'>
                <AiOutlineArrowLeft  onClick={() => setEditNodeMode(false)}/>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Message</h2>
              <div className="flex-1"></div>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <label className="text-gray-400 mb-2">
                Text
              </label>
              <Textarea
                id="message"
                value={nodeValues[editNodeId].value}
                onChange={(e) => {
                  console.log('on change call dasd')
                  addOrUpdateNodeValues(editNodeId, e.target.value)}}
              />
            </div>
          </div>
    </div>}

    </section>
  )
}

export default SideBar


