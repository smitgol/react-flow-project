"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import { AiOutlineComment } from "react-icons/ai";

const TextComponent = () => {
    return <div className='p-3 border rounded border-blue-700 text-blue-700 font-bold grid align-middle justify-items-center text-center'>
    <AiOutlineComment size={24}/>
    Message
    </div>
}

export default TextComponent