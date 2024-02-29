import React from 'react'
import prisma from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { NoItem } from '../components/NoItem'
import { ListingCard } from '../components/ListingCard'

async function getData(userId: string){
  const data = await prisma.favorite.findMany({
    where:{
      userId: userId
    },
    select: {
      Home:{
        select:{
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true
        }
      }
    }
  })

  return data
}


const page = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if(!user) return redirect('/')
  const data = await getData(user.id)
  return (
    <section className='container mx-auto py-5 lg:py-10 mt-10'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Favorites</h2>
      {data.length === 0 ? (
        <NoItem/>
      ):(
        <div>
          {data.map((item) => (
            <ListingCard key={item.Home?.id} description={item.Home?.description as string} location={item.Home?.country as string} pathName='/favorites' homeId={item.Home?.id as string} imagePath={item.Home?.photo as string} price={item.Home?.price as number} userId={user.id} favoriteId={item.Home?.Favorite[0].id as string} isInFavoriteList={(item.Home?.Favorite.length as number) > 0 ? true: false}/>  
          ))}
        </div>
      )}
    </section>
  )
}

export default page