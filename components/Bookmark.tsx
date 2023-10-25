"use client"

import Image from 'next/image';
import React, { useState } from 'react';

function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      
        // Provide a message to the user on how to bookmark the page
        alert('To bookmark this page, please use your browser\'s bookmark feature.');
      }
  };



  return (
    <div
    className={`p-2 rounded-10 cursor-pointer ${
        isBookmarked
          ? 'bg-white-200' /* Change to your bookmarked Tailwind classes */
          : 'bg-white'
      }`}
      onClick={handleBookmarkToggle}
    >
      <Image
        src="/assets/icons/bookmark.svg"
        alt="bookmark"
        width={20}
        height={20}
      />
       {isBookmarked ? 'Bookmarked!' : 'Bookmark' }
    </div>
  );
}

export default Bookmark;
