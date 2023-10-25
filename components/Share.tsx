"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface ShareButtonProps {
  shareURL: string;
}

function ShareButton({ shareURL }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = () => {
    if(!isCopied){
        navigator.clipboard.writeText(shareURL)
      .then(() => {
        setIsCopied(true);
        alert("Link copied!")
      })
      .catch(error => {
        console.error('Failed to copy to clipboard:', error);
      });
    }else{
        setIsCopied(false);
    }
    
  }

  return (
    
      <div
        onClick={handleShareClick}
        className={`p-2 rounded-10 cursor-pointer ${
          isCopied
            ? 'bg-white-200'
            : 'bg-white'
        }`}
      >
        <Image
          src="/assets/icons/share.svg"
          alt="share"
          width={20}
          height={20}
        />
        {isCopied ? 'Copied!' : 'Share'}
      </div>
    
  );
}

export default ShareButton;
