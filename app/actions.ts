'use server'
import { redirect } from "next/navigation";
import prisma from "./lib/db"


export async function createAirbnbHome({userId} : {userId : string}){
  const data = await prisma.home.findFirst({
    where: {
      userId: userId 
    },
    orderBy: {
      createdAT: 'desc'
    }
  });

  if(data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      }
    })

    return redirect(`/create/${data.id}/structure`);
  }else if(!data.addedCategory && !data.addedDeskription && !data.addedLocation){
    return redirect(`/create/${data.id}/structure`)
  }else if(data.addedCategory && !data.addedDeskription){
    return redirect(`/create/${data.id}/description`)
  }
}

export async function createCategoryPage(formData: FormData){
  
  const category = formData.get('category') as string;
  const homeId = formData.get('id') as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      category: category,
      addedCategory: true,
    }
  });

  return redirect(`/create/${homeId}/description`)
}