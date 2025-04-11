import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const { items: categories } = await wixClient.collections
    .queryCollections()
    .find();

  if (!categories.length) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Optional: Add a heading if needed */}

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Shop Collections
      </h2>
      <div className="relative">
        {/* Scrollable container with gradient fade */}
        <div className="relative overflow-x-auto pb-8">
          <div className="flex space-x-5 md:space-x-6 lg:space-x-8 px-1">
            {categories.map((category) => (
              <Link
                href={`/list?cat=${category.slug}`}
                key={category._id}
                className="group flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                aria-label={`Browse ${category.name} collection`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={
                      category.media?.mainMedia?.image?.url ||
                      "/placeholder-category.jpg"
                    }
                    alt={category.name || "Category image"}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    priority={categories.indexOf(category) < 4}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* Text container */}
                  <div className="absolute bottom-5 left-5 right-5">
                    {/* Category name */}
                    <h3 className="text-white font-semibold text-lg md:text-xl lg:text-xl drop-shadow-lg mb-1">
                      {category.name}
                    </h3>

                    {/* Shop Now text - appears on hover */}
                    <span className="block text-white/0 group-hover:text-white/90 text-sm font-medium transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
