import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function page() {
  return (
    <>
      <div className='w-[80%] lg:w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tighter transition-colors'>
          Please describe you home as good as you can!
        </h2>
      </div>
      <form>
        <div className='mx-auto w-[80%] lg:w-3/5 mt-10 flex flex-col gap-y-5 mb-36'>
          <div className='flex flex-col gap-y-2'>
            <Label>Title</Label>
            <Input name='title' type='text' required placeholder='Short and simple...'/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>
              Description
            </Label>
            <Textarea name='description' required placeholder='Please describe your home...'/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input type='number' name='price' required placeholder='Price per night in TND'/>
          </div>
        </div>
      </form>
    </>
    
  )
}

export default page