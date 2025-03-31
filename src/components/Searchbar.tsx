"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Searchbar = () => {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();

    if (name) {
      const encodedName = encodeURIComponent(name);
      router.push(`/list?name=${encodedName}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm w-full max-w-md"
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        aria-label="Search"
        className="flex-1 bg-transparent outline-none px-2 text-gray-800 placeholder-gray-500"
      />
      <button
        type="submit"
        className="p-1 hover:scale-105 transition-transform"
      >
        <Image src="/search.png" alt="Search icon" width={24} height={24} />
      </button>
    </form>
  );
};

export default Searchbar;
