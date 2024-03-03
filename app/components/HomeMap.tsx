import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React from 'react'

export const HomeMap = ({locationValue}:{locationValue: string}) => {
  const LazyMap = dynamic(()=> import('@/app/components/Map'), {
    ssr: false,
    loading: () => <Skeleton className='h-[50vh] w-full'/>
  })
  return (
    <LazyMap locationValue={locationValue}/>
  )
}
