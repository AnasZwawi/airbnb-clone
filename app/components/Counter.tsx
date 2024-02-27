'use client'
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function Counter({name}: {name: string}){
  const [count, setCount] = useState(0)
  
  const decrement = (prevState: number) => {
    if(prevState == 0){
      setCount(0)
    }else{
      setCount(prevState-1)
    }
    
  }

  const increment= (prevState: number) => {
    setCount(prevState+1)
  }

  return(
    <div className="flex items-center gap-x-4">
      {/* hidden input to send data up by name, every name has its own count*/}
      <input type="hidden" name={name} value={count}/>
      <Button onClick={()=>{decrement(count)}} variant="outline" size="icon" type="button">
        <Minus className="w-4 h-4 text-primary"/>
      </Button>
      <p className="font-medium text-lg">{count}</p>
      <Button onClick={()=>{increment(count)}} variant="outline" size="icon" type="button">
        <Plus className="w-4 h-4 text-primary"/>
      </Button>
    </div>
  )
}