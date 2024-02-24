import { SelectCategory } from '@/app/components/SelectCategory'
import React from 'react'

function page() {
  return (
    <>
      <div className='w-[80%] lg:w-3/5  mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best describe your house?
        </h2>
      </div>
      <form action="">
        <SelectCategory/>
      </form>
    </>
  )
}

export default page