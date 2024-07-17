import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { name, email, password, role };
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:5000/api/admin/addUser", {
        method: "POST",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
     },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.user) {
        toast.success('Successfully added a user');
      }
      console.log(data);
      setName('')
      setPassword('')
      setEmail('')

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-5 ">
      <h1 className="text-center text-mytheme-gold text-3xl">Create User</h1>
      <form onSubmit={handleSubmit} className="mt-5 flex justify-center flex-col items-center">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered input-warning w-full text-mytheme-gold"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-warning w-full  text-mytheme-gold"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-warning w-full  text-mytheme-gold"
            required
          />
        </div>
        <div className="mb-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-bordered w-full  text-mytheme-gold"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn mt-4 btn-success  w-full">
            Create User
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default CreateUser;
