import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const buttonHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    const email = event.target.email.value;
    const password = event.target.password.value;
    const user = { email, password };
  
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userRole', data.user.role); 
  
      if (data.user.isBanned) {
        toast.error("You are permanently banned.");
      } else if (data.user.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     
      <div className="hero min-h-screen">
        <form onSubmit={buttonHandler} className="">
          <img src="" alt="" className="ml-20 mb-5 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-center text-mytheme-gold text-3xl -tracking-tighter">
              Login
            </h1>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className=" mt-5 input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className=" mt-5 input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
            <button className="btn btn-warning mt-5 w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-mytheme-crimson -tracking-tighter mt-2">
              don't have an account?{" "}
              <Link className="text-blue-900" to="/signup">
                Signup
              </Link>
            </p>
            
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center items-center flex-col mt-20 h-20">
            <h1 className="font-bold text-3xl text-red-600">admin email:admin@example.com</h1>
            <h1 className="font-bold text-3xl text-red-600">admin password:admin123</h1>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
