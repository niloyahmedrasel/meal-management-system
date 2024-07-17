import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const MealOrderPage = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/getMeals", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAvailableMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [token]);

  const handleItemChange = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const handleNoMealChange = () => {
    setSelectedItems([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      UserId: userId,
      MealId: 1, 
      orderDay: selectedDay,
      Items: selectedItems.map((itemId) => ({ ItemId: itemId })),
      no_meal: selectedItems.length === 0,
    };

    try {
      const response = await fetch("http://localhost:5000/api/user/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      toast.success("Order placed successfully!");
      setSelectedItems([]); 
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to place order.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-mytheme-gold text-3xl">Order Meal</h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-4">
          <label className="block mb-2 text-mytheme-gold">Select Day of the Week:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="select select-bordered w-full text-mytheme-gold"
          >
            {availableMeals.map((meal) => (
              <option key={meal.id} value={meal.dayOfWeek}>
                {meal.dayOfWeek}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-mytheme-gold">Select Items:</label>
          <div className="grid grid-cols-2 gap-4">
            {availableMeals
              .find((meal) => meal.dayOfWeek === selectedDay)?.Items.map((item) => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemChange(item.id)}
                    className="mr-2"
                  />
                  {item.item_name} ({item.category_id})
                </label>
              ))}
          </div>
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={selectedItems.length === 0}
              onChange={handleNoMealChange}
              className="mr-2"
            />
            No Meal
          </label>
        </div>

        <button type="submit" className="btn btn-warning w-full">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default MealOrderPage;
