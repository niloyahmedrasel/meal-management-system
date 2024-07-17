import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const buttonHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const email = event.target.email.value;
    const name = event.target.name.value;
    const password = event.target.password.value;
    const user = { email, password ,name};

    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setSuccess('Login successful');
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed');
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
              Signup
            </h1>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="bg-black mt-5 input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
            <br></br>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="bg-black mt-5 input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-black mt-5 input input-bordered input-warning w-full text-mytheme-gold"
              required
            />
            <button className="btn btn-warning mt-5 w-full">Signup</button>
            <p className="text-mytheme-crimson -tracking-tighter mt-2">
              already have an account?{" "}
              <Link className="text-mytheme-gold" to="/">
                Login
              </Link>
            </p>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
