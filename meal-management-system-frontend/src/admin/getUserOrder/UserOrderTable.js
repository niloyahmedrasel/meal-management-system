import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UserOrderTable = () => {
  const token = localStorage.getItem("accessToken");

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/admin/getOrderItem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    },
  });

  const handleBanUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/ban/${userId}`, {
        method: "PATCH", // Change to PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ banned: true }), 
      });
      if (!response.ok) {
        throw new Error("Failed to ban user");
      }
      toast.success("User banned successfully")

    } catch (error) {
      toast.error(error.message || "Failed to ban user");
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders.</div>;

  return (
    <div className="p-5">
      <h1 className="text-center text-mytheme-gold text-3xl">All User Orders</h1>
      <table className="min-w-full border border-gray-300">
          <tr>
            <th className="border px-4 py-2 text-blue-500">User Name</th>
            <th className="border px-4 py-2 text-blue-500">Order Day</th>
            <th className="border px-4 py-2 text-blue-500">Items</th>
            <th className="border px-4 py-2 text-blue-500">No Meal</th>
            <th className="border px-4 py-2 text-blue-500">Actions</th>
          </tr>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.User.name}</td>
              <td className="border px-4 py-2">{order.orderDay}</td>
              <td className="border px-4 py-2">
                {order.Items.map(item => item.item_name).join(", ")}
              </td>
              <td className="border px-4 py-2">{order.no_meal ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleBanUser(order.User.id)}
                  className="btn bg-warning"
                >
                  Ban User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderTable;
