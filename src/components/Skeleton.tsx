import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  type?: "card" | "category" | "text";
  className?: string;
}

const Skeleton = ({
  count = 1,
  type = "card",
  className = "",
  ...props
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={getSkeletonClasses(type, className)}>
      {type === "card" && <CardSkeleton />}
      {type === "category" && <CategorySkeleton />}
      {type === "text" && <TextSkeleton />}
    </div>
  ));

  return (
    <div
      className={`flex flex-wrap gap-8 justify-between animate-pulse ${
        type === "category" ? "mt-0" : "mt-12"
      }`}
      {...props}
    >
      {skeletons}
    </div>
  );
};

const CardSkeleton = () => (
  <>
    <div className="w-full h-80 bg-gray-200 rounded-md" />
    <div className="w-full flex justify-between mt-4">
      <div className="w-36 h-6 bg-gray-200 rounded-md" />
      <div className="w-16 h-6 bg-gray-200 rounded-md" />
    </div>
    <div className="w-full h-4 bg-gray-200 rounded-md mt-2" />
    <div className="w-1/2 h-4 bg-gray-200 rounded-md mt-2" />
    <div className="w-full h-10 bg-gray-200 rounded-2xl mt-4" />
  </>
);

const CategorySkeleton = () => (
  <div className="w-full h-40 bg-gray-200 rounded-md" />
);

const TextSkeleton = () => (
  <div className="w-full h-6 bg-gray-200 rounded-md" />
);

const getSkeletonClasses = (type: string, className: string) => {
  const baseClasses = "w-full";
  const typeClasses = {
    card: "sm:w-[45%] lg:w-[22%] flex flex-col gap-2",
    category: "sm:w-[30%] lg:w-[15%]",
    text: "",
  };
  return `${baseClasses} ${
    typeClasses[type as keyof typeof typeClasses] || ""
  } ${className}`;
};

export default Skeleton;
