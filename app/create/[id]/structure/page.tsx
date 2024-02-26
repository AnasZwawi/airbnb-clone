import { createCategoryPage } from '@/app/actions'
import { SelectCategory } from '@/app/components/SelectCategory'
import { SubmitButton } from '@/app/components/SubmitButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page({params} : {params : {id: string}}) {
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
        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              <Link href="/">
                Cancel
              </Link>
            </Button>
            <SubmitButton/>
          </div>
        </div>
      </form>
    </>
  )
}

export default page