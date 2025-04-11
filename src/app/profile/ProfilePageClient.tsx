// app/profile/ProfileClient.tsx
"use client";

import UpdateButton from "@/components/UpdateButton";
import { updateUser } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Link from "next/link";
import { format } from "timeago.js";

const ProfileClient = () => {
  const wixClient = useWixClient();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await wixClient.members.getCurrentMember();
        const member = userRes?.member;
        if (!member?.contactId) return;

        setUser(member);

        const orderRes = await wixClient.orders.searchOrders({
          search: {
            filter: { "buyerInfo.contactId": { $eq: member.contactId } },
          },
        });

        setOrders(orderRes.orders || []);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    fetchData();
  }, [wixClient]);

  if (!user) return <div className="p-4">Not logged in</div>;

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form action={updateUser} className="mt-12 flex flex-col gap-4">
          <input type="hidden" name="id" value={user.contactId} />
          {/* Other fields (same as before)... */}
          <UpdateButton />
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ${order.priceSummary?.subtotal?.amount}
              </span>
              <span className="w-1/4">{format(order._createdDate)}</span>
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
