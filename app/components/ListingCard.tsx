import React from 'react'

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export const ListingCard = ({imagePath, description, location, price}:iAppProps) => {
  return (
    <div>ListingCard</div>
  )
}