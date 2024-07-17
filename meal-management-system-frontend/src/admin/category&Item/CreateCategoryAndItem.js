import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateCategoryAndItem = () => {
    const [categoryName, setCategoryName] = useState("");
    const [items, setItems] = useState([""]); 
    const token = localStorage.getItem("accessToken");
  
    const handleAddItem = () => {
      setItems([...items, ""]); 
    };
  
    const handleItemChange = (index, value) => {
      const newItems = [...items];
      newItems[index] = value;
      setItems(newItems);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const data = { category_name: categoryName, items };
  
      try {
        const response = await fetch("http://localhost:5000/api/admin/addItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        console.log(result);
        toast.success("Successfully added category and items!");
  
        // Reset form
        setCategoryName("");
        setItems([""]);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add category and items.");
      }
    };
  
    return (
      <div className="p-5">
        <h1 className="text-center text-mytheme-gold text-3xl">Item Management</h1>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col justify-center items-center">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
          </div>
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder={`Item ${index + 1}`}
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="input input-bordered input-warning w-full text-mytheme-gold"
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="btn btn-warning px-12">
            Add Another Item
          </button>
          <button type="submit" className="btn btn-success  mt-4 px-6">
            Create Category and Items
          </button>
        </form>
      </div>
    );
  };

export default CreateCategoryAndItem;