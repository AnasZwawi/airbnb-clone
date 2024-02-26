'use client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export const SubmitButton = () => {
  const { pending } = useFormStatus() 
  return (
    <div>
      {pending ? (
        <Button type="submit" disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please Wait          
        </Button>
      ) : (
        <Button size="lg" type="submit">
          Next
        </Button>
      )}
    </div>
  )
}
