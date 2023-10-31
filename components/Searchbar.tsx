"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { Product } from "@/types";
import { FormEvent, useState, useEffect } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.includes("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const Searchbar = () => {
  const router = useRouter();
 

  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [product_path, setProductPath] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    

    if (!isValidLink)
      return alert("Please provide a valid Amazon product link");

    try {
      setIsLoading(true);
      const path = await scrapeAndStoreProduct(searchPrompt);
      if (path)
        setProductPath(path);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSearchPrompt("");

     

      // Scrape the prduct page
    }
  };

  useEffect(() => {
    
    if (product_path !== "") {
      console.log(product_path);
     
      
      
        router.push(product_path);
     
      
    }
  }, [product_path, router]);
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
