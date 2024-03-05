'use client'

import { createDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function Description({ params }: { params: { id: string } }) {
  const [compressedImages, setCompressedImages] = useState<File[]>([]);

  // Function to compress image files
  const compressImages = async (files: FileList) => {
    const compressedImagesArray: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const compressedImage = await resizeImage(file);
      compressedImagesArray.push(compressedImage);
    }

    return compressedImagesArray;
  };

  // Function to resize and compress an image
  const resizeImage = async (imageFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Resize the image to a max width and max height
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
  
          // Draw the image on the canvas after resizing
          ctx?.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas content to a Blob with compression
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedImage = new File([blob], imageFile.name, {
                  type: imageFile.type,
                });
                resolve(resizedImage);
              } else {
                reject(new Error("Unable to create blob from canvas"));
              }
            },
            imageFile.type, // Maintain the original image type
            compressionQuality // Set the compression quality
          );
        };
      };
  
      reader.onerror = (error) => {
        console.error("Error reading image:", error);
        reject(error);
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(imageFile);
    });
  };
  

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Compress image files before submitting the form
    const compressedFiles = await compressImages(event.currentTarget.image.files);

    // Set the compressed images in state
    setCompressedImages(compressedFiles);

    // Prepare form data with compressed images
    const formData = new FormData(event.currentTarget);
    formData.delete("image"); // Remove original image files
    compressedFiles.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    // Call createDescription function with compressed images
    await createDescription(formData);
  };

  return (
    <>
      <div className="w-[80%] lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
          Please describe your home as best as you can!
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-[80%] lg:w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          {/* Your form fields */}
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          {/* Other form fields */}
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              required
              placeholder="Price per night in TND"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input
              type="file"
              multiple={true}
              accept=".jpg,.png,.jpeg,.webp"
              className="cursor-pointer"
              name="image"
              required
            />
          </div>
          {/* Other form fields */}
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}

export default Description;






/* function Description({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-[80%] lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
          Please describe you home as good as you can!
        </h2>
      </div>
      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-[80%] lg:w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              required
              placeholder="Price per night in TND"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input type="file" multiple={true} accept=".jpg,.png,.jpeg,.webp" className="cursor-pointer" name="image" required />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-semibold text-lg">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}

export default Description;
 */