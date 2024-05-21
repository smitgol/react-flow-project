import React from 'react'
import { Button } from "@/components/ui/button"
import { useFlowContext } from '@/contexts/FlowContext';
import { useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';

const TopBar = ({checkForNodeValidation}: {checkForNodeValidation: () => boolean}) => {

  const { toast } = useToast();

  const onSaveClick = () => {
    const result = checkForNodeValidation();
    if (!result) {
      toast({
        variant: "destructive",
        title: "Cannot save flow.",
        className: cn(
          'top-0 left-1/2 flex fixed max-w-48 bg-[#fbcccb] text-black max-h-12 border-0 -translate-x-1/2'
        )
      });
    }
    else {
      toast({
        variant: "default",
        title: "Flow saved Successfully",
        className: cn(
          'top-0 left-1/2 flex fixed max-w-56 bg-green-400 text-white max-h-12 border-0 -translate-x-1/2'
        )
      });
    }
    
  }

  return (
    <section className='bg-zinc-300 p-2  w-full'>
        <div className="flex justify-end mr-[6vw]">
            <Button variant='outline' size="sm" className='border-blue-700 text-blue-700 font-bold' onClick={() => onSaveClick()}>Save Changes</Button>
        </div>
    </section>
  )
}

export default TopBar;