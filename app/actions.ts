"use server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

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

async function resizeImage(imageFile: File): Promise<File | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        const maxWidth = 1000;
        const maxHeight = 1000;
        const compressionQuality = 0.8; // (0 to 1)

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedImage = new File([blob], imageFile.name, {
                type: imageFile.type,
              });
              resolve(resizedImage);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          imageFile.type,
          compressionQuality
        );
      };
    };

    reader.onerror = (error) => {
      console.error("Error reading image:", error);
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
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

  const compressedImagePromises: Promise<string | null>[] = imageFilesArray.map(async (imageFile) => {
    try {
      const compressedImage = await resizeImage(imageFile);
      if (compressedImage) {
        const { data: imageData } = await supabase.storage
          .from("images")
          .upload(`${new Date().toISOString()}-${imageFile.name}`, compressedImage, {
            cacheControl: "2592000",
            contentType: "image/png",
          });
        return imageData?.path ?? null;
      }
    } catch (error) {
      console.error("Error compressing image:", error);
    }
    return null;
  });

  const photoPaths = await Promise.all(compressedImagePromises);

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
        set: photoPaths.filter((path) => path !== null) as string[],
      },
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/address`);
}



/* export async function createDescription(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFilesArray = formData.getAll("image") as File[];

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;

  const uploadPromises: Promise<any>[] = imageFilesArray.map(
    async (imageFile) => {
      const { data: imageData } = await supabase.storage
        .from("images")
        .upload(`${new Date().toISOString()}-${imageFile.name}`, imageFile, {
          cacheControl: "2592000",
          contentType: "image/png",
        });
      return imageData?.path; // Instead of returning the whole imageData, return just the path
    }
  );

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
        set: photoPaths, // Set the array of photo paths directly
      },
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/address`);
}
 */
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

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;
  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      homeId: homeId,
    },
  });

  return redirect("/");
}
