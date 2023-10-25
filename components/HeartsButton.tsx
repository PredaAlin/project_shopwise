"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { getProductById, updateProductHearts } from '@/lib/actions';

type HeartsButtonProps = {
  id: string;
};

const HeartsButton = ({ id }: HeartsButtonProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [hearts, setHearts] = useState(0);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(id);
          console.log('Fetched product:', productData);
          if (productData) {
            setProduct(productData);
            setHearts(productData.hearts);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    const updateHeartsValue = async (newHearts: number) => {
      console.log('Updating hearts:', newHearts);
      setHearts(newHearts);
      try {
        await updateProductHearts(id, newHearts);
        console.log('Hearts updated successfully.');
      } catch (error) {
        console.error('Error updating hearts:', error);
      }
    };
  
    if (!product) {
      return null; // You can render some loading indicator or placeholder here
    }
  
    return (
      <button className="btn product-hearts" onClick={() => updateHeartsValue(hearts + 1)}>
        <Image src="/assets/icons/red-heart.svg" alt="heart" width={20} height={20} />
        <p className="text-base font-semibold text-[#D46F77]">{product.hearts}</p>
      </button>
    );
  };
  
  export default HeartsButton;
  
