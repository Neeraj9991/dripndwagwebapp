"use client";

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Add from "./Add";
import { motion } from "framer-motion";

interface CustomizeProductsProps {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: CustomizeProductsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-8 pt-6 pb-12 md:pt-8 md:pb-16">
      
      {productOptions.map((option) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
          key={option.name}
        >
          <h4 className="font-medium text-gray-900 text-lg md:text-xl">
            Choose {option.name}
          </h4>
          <ul className="flex flex-wrap items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <motion.li
                  key={choice.description}
                  whileHover={!disabled ? { scale: 1.1 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                  className={`relative w-10 h-10 rounded-full ring-2 ${
                    selected ? "ring-gray-900 ring-offset-2" : "ring-gray-200"
                  } ${disabled ? "opacity-50" : "cursor-pointer"}`}
                  style={{ backgroundColor: choice.value }}
                  onClick={clickHandler}
                  aria-label={`${choice.description} ${
                    disabled ? "(Out of stock)" : ""
                  }`}
                  title={`${choice.description} ${
                    disabled ? "(Out of stock)" : ""
                  }`}
                >
                  {disabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-[2px] bg-red-500 rotate-45" />
                    </div>
                  )}
                  {selected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full border-2 border-white" />
                  )}
                </motion.li>
              ) : (
                <motion.li
                  key={choice.description}
                  whileHover={!disabled ? { scale: 1.05 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                    selected
                      ? "bg-gray-900 text-white shadow-md"
                      : disabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm"
                  }`}
                  onClick={clickHandler}
                  aria-label={`${choice.description} ${
                    disabled ? "(Out of stock)" : ""
                  }`}
                >
                  {choice.description}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Add
          productId={productId}
          variantId={
            selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={selectedVariant?.stock?.quantity || 0}
        />
      </motion.div>
    </div>
  );
};

export default CustomizeProducts;
