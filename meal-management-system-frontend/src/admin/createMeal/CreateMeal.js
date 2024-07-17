import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CreateMeal = () => {
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/getItem", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAvailableItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [token]);

  const handleItemChange = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { dayOfWeek, items: selectedItems };

    try {
      const response = await fetch("http://localhost:5000/api/admin/createMeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      toast.success("Successfully created meal!");
      setSelectedItems([]);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to create meal.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-mytheme-gold text-3xl">Create Meal</h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-4">
          <label className="block mb-2 text-mytheme-gold">Select Day of the Week:</label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="select select-bordered w-full text-mytheme-gold"
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-mytheme-gold">Select Items:</label>
          <div className="grid grid-cols-2 gap-4">
            {availableItems.map((item) => (
              <label key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleItemChange(item.id)}
                  className="mr-2"
                />
                {item.item_name} ({item.Category.category_name})
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-warning w-full">
          Create Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
