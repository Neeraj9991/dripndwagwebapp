import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="pb-16">
      {/* Hero Slider */}
      <Slider />

      {/* Featured Products */}
      <section className="mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h1>
          <p className="text-gray-600 mt-2">Discover our most popular items</p>
        </div>
        <Suspense fallback={<Skeleton count={4} className="h-96" />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </section>

      {/* Categories */}
      <section className="mt-24 bg-gray-50 py-12">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <Suspense fallback={<Skeleton count={6} className="h-40" />}>
            <CategoryList />
          </Suspense>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">New Arrivals</h1>
          <p className="text-gray-600 mt-2">Explore our latest products</p>
        </div>
        <Suspense fallback={<Skeleton count={4} className="h-96" />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
