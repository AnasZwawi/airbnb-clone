import { createCategoryPage } from '@/app/actions'
import { CreationBottomBar } from '@/app/components/CreationBottomBar'
import { SelectCategory } from '@/app/components/SelectCategory'
import { SubmitButton } from '@/app/components/SubmitButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Structure({params} : {params : {id: string}}) {
  return (
    <>
      <div className='w-[80%] lg:w-3/5  mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best describe your house?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="id" value={params.id}/>
        <SelectCategory/>
        <CreationBottomBar/>
      </form>
    </>
  )
}

export default Structure