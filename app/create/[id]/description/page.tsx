/* 'use client'
import { createDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";


function Description({ params }: { params: { id: string } }) {
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

"use client";
import { useState } from "react";
import { createDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import { Loader2 } from "lucide-react";


function Description({ params }: { params: { id: string } }) {
  const [compressing, setCompressing] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const compressedImages = await Promise.all(
        selectedFiles.map(compressImage)
      );
      setImageFiles(compressedImages);
    }
  };

  const compressImage = async (imageFile: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 0.150, // Maximum file size in megabytes
        maxWidthOrHeight: 1000, // Maximum width or height
        fileType: "image/jpeg", // optional, fileType override e.g., 'image/jpeg', 'image/png' (default: file.type)
        initialQuality: 0.8,
        useWebWorker: true, // Use Web Worker for compression
      };
      const compressedImage = await imageCompression(imageFile, options);
      return new File([compressedImage], imageFile.name, {
        type: compressedImage.type,
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Prepare form data
    setCompressing(true);
    const formData = new FormData(event.currentTarget);
    formData.delete("image"); // Remove original image files
    imageFiles.forEach((imageFile) => {
      formData.append("image", imageFile);
    });
  
    try {
      // Perform image compression
      const compressedImages = await Promise.all(
        imageFiles.map(compressImage)
      );
  
      // Replace original image files with compressed ones in formData
      formData.delete("image");
      compressedImages.forEach((compressedImage) => {
        formData.append("image", compressedImage);
      });
  
      // Submit form data
      await createDescription(formData);
  
      // Reset compressing state
      setCompressing(false);
    } catch (error) {
      console.error("Error compressing images:", error);
      // Handle error
      // Reset compressing state
      setCompressing(false);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
          Please describe you home as good as you can!
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
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
            <Input
              type="file"
              multiple
              accept=".jpg,.png,.jpeg,.webp"
              className="cursor-pointer"
              name="image"
              onChange={handleImageChange}
              required
            />
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
        <CreationBottomBar compressing={compressing}/>
      </form>
    </div>
  );
}

export default Description;
