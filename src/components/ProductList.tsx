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
  const page = parseInt(searchParams?.page) || 1;
  const skip = (page - 1) * (limit || PRODUCT_PER_PAGE);

  const baseQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999);

  if (categoryId) {
    baseQuery.eq("collectionIds", categoryId);
  }

  const countQuery = baseQuery.limit(1).skip(0);
  const totalRes = await countQuery.find();
  const totalCount = totalRes.totalCount;
  const totalPages = Math.ceil((totalCount ?? 0) / (limit || PRODUCT_PER_PAGE));

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") baseQuery.ascending(sortBy);
    if (sortType === "desc") baseQuery.descending(sortBy);
  }

  const res = await baseQuery
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(skip)
    .find();

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            key={product._id}
            className="group flex flex-col gap-2 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden bg-white h-full"
          >
            <div className="relative w-full aspect-[3/4.2] overflow-hidden">
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
              {product.price?.discountedPrice &&
                product.price?.price !== product.price?.discountedPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                    SALE
                  </div>
                )}
            </div>

            <div className="p-3 flex flex-col gap-1.5 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <div className="flex flex-col items-end whitespace-nowrap">
                  {product.price?.discountedPrice &&
                  product.price?.price !== product.price?.discountedPrice ? (
                    <>
                      <span className="font-semibold text-sm text-gray-900">
                        ${product.price.discountedPrice}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ${product.price.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-sm text-gray-900">
                      ${product.price?.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-10 overflow-hidden">
                {product.additionalInfoSections && (
                  <div
                    className="text-xs text-gray-500 line-clamp-2"
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

              <button className="mt-auto w-full py-1.5 px-3 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors duration-300 text-center">
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>

      {!limit && totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            hasPrev={page > 1}
            hasNext={page < totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
