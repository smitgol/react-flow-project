import { useFlowContext } from '@/contexts/FlowContext';
import React, { useEffect } from 'react'
import { AiOutlineComment } from "react-icons/ai";
import { MdOutlineWhatsapp } from "react-icons/md";

const TextComponentLabel = ({id, value}: {id:string, value:string}) => {

    useEffect(() => {
       
    }, [value]);

  return (
    <div className='flex flex-col '>
        <div className="flex row justify-between bg-[#B2F0E3] text-slate-700 tracking-tight items-center px-2 w-36 text-[10px] rounded-t-sm">
            <div className="flex row gap-1 items-center">
                <div>
                    <AiOutlineComment />
                </div>
                <p className='font-bold'>
                    Send Message
                </p>
            </div>
            <div>
                <MdOutlineWhatsapp />
            </div>
        </div>
        <div className='text-left p-2 text-slate-500 text-[8px]'>
            {value}
        </div>
    </div>
  )
}

export default TextComponentLabel