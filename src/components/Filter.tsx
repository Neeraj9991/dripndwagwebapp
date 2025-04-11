"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row justify-between gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          name="type"
          className="py-2 px-4 rounded-full text-sm font-medium bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <input
          type="number"
          name="min"
          placeholder="Min Price"
          className="py-2 px-4 w-28 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleFilterChange}
        />

        <input
          type="number"
          name="max"
          placeholder="Max Price"
          className="py-2 px-4 w-28 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleFilterChange}
        />

        <select
          name="cat"
          className="py-2 px-4 rounded-full text-sm font-medium bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value="">New Arrival</option>
          <option value="">Popular</option>
        </select>

        <select
          name=""
          className="py-2 px-4 rounded-full text-sm font-medium bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option>All Filters</option>
        </select>
      </div>

      <div className="flex items-center">
        <select
          name="sort"
          className="py-2 px-4 rounded-full text-sm font-medium bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
