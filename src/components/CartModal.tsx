"use client";

import Link from "next/link";
import Image from "next/image";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  // Simulated cart items
  const cartItems = [
    {
      id: 1,
      name: "Oversized Tee",
      price: 799,
      description: "Loose fit, 100% cotton",
      image: "/tshirt1.jpg",
      available: true,
      quantity: 1,
    },
    {
      id: 2,
      name: "Anime Tee",
      price: 699,
      description: "Naruto design, limited edition",
      image: "/tshirt2.jpg",
      available: false,
      quantity: 2,
    },
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-80 p-4 z-30">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="max-h-64 overflow-y-auto flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3 border-b pb-3">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="flex-1 text-sm">
              <div className="font-semibold">{item.name}</div>
              <div className="text-gray-500">{item.description}</div>
              <div className="text-black font-medium mt-1">₹{item.price}</div>
              <div
                className={`text-xs mt-1 ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "In stock" : "Out of stock"}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    defaultValue={item.quantity}
                    className="w-12 border rounded px-1 py-0.5 text-xs"
                  />
                </div>
                <button className="text-xs text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-800 mt-4">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between gap-2 mt-3">
        <Link
          href="/cart"
          className="w-1/2 text-center bg-white border border-black text-black py-2 rounded hover:bg-gray-100 transition text-sm"
        >
          View Cart
        </Link>
        <Link
          href="/checkout"
          className="w-1/2 text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartModal;
