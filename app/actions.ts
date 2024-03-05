"use server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import sharp from 'sharp';

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const category = formData.get("category") as string;
  const homeId = formData.get("id") as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      category: category,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFilesArray = formData.getAll("image") as File[];

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;

  const compressedImagePromises = imageFilesArray.map(async (imageFile) => {
    const compressedImageBuffer = await compressImage(imageFile);
    return compressedImageBuffer;
  });

  // Upload compressed images to storage
  const uploadPromises: Promise<any>[] = compressedImagePromises.map(async (compressedImageBuffer, index) => {
    const compressedImage = Buffer.from(await compressedImageBuffer);
    const { data: imageData } = await supabase.storage
      .from("images")
      .upload(`${new Date().toISOString()}-${index}.jpg`, compressedImage, { // Use a specific format for compressed images
        cacheControl: "2592000",
        contentType: "image/jpeg", // Use JPEG format for compressed images
      });
    return imageData?.path;
  });

  const photoPaths = await Promise.all(uploadPromises); // Collect photo paths

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      photos: {
        set: photoPaths,
      },
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/address`);
}

type ImageFormat = keyof sharp.FormatEnum | sharp.AvailableFormatInfo;

async function compressImage(imageFile: File, outputFormat: ImageFormat = 'jpeg'): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imageBuffer = await sharp(Buffer.from(reader.result as ArrayBuffer))
          .resize({ width: 1000, height: 1000 }) // Set desired dimensions for compressed images
          .toFormat(outputFormat, { quality: 80 }) // Specify the output format and quality
          .toBuffer(); // Convert to buffer
        resolve(imageBuffer);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(imageFile);
  });
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData:FormData) {
  const homeId = formData.get('homeId') as string;
  const userId = formData.get('userId') as string;
  const pathName = formData.get('pathName') as string
  const data = await prisma.favorite.create({
    data:{
      homeId:homeId,
      userId:userId
    }
  })

  revalidatePath(pathName)
}

export async function deleteFromFavorite(formData: FormData){
  const favoriteId = formData.get('favoriteId') as string;
  const userId = formData.get('userId') as string;
  const pathName = formData.get('pathName') as string
  
  const data = await prisma.favorite.delete({
    where:{
      id:favoriteId,
      userId: userId,
    }
  })
  revalidatePath(pathName)
}

export async function createReservation(formData: FormData){
  const userId = formData.get('userId') as string;
  const homeId = formData.get('homeId') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      homeId: homeId,
    }
  })

  return redirect('/')
}