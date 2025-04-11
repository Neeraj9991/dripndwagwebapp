import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (categoryId) {
    productQuery.eq("collectionIds", categoryId);
  }

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="group flex flex-col gap-3 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white h-full"
            key={product._id}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt={product.name || "Product image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 absolute"
              />
              {product.media?.items?.[1]?.image?.url ? (
                <Image
                  src={product.media.items[1].image.url}
                  alt={product.name || "Product alternate view"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 absolute"
                />
              ) : (
                <Image
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt={product.name || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 absolute"
                />
              )}

              {/* Sale Badge - Only show if there's an actual discount */}
              {product.price?.discountedPrice &&
                product.price?.price !== product.price?.discountedPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    SALE
                  </div>
                )}
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-gray-900 line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <div className="flex flex-col items-end whitespace-nowrap">
                  {product.price?.discountedPrice &&
                  product.price?.price !== product.price?.discountedPrice ? (
                    <>
                      <span className="font-semibold text-gray-900">
                        ${product.price.discountedPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-gray-900">
                      ${product.price?.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-12 overflow-hidden">
                {" "}
                {/* Fixed height for description */}
                {product.additionalInfoSections && (
                  <div
                    className="text-sm text-gray-500 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.additionalInfoSections.find(
                          (section: any) => section.title === "shortDesc"
                        )?.description || ""
                      ),
                    }}
                  />
                )}
              </div>

              <button className="mt-auto w-full py-2 px-4 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors duration-300 text-center">
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>

      {searchParams?.cat || searchParams?.name ? (
        <div className="mt-12">
          <Pagination
            currentPage={res.currentPage || 0}
            hasPrev={res.hasPrev()}
            hasNext={res.hasNext()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
