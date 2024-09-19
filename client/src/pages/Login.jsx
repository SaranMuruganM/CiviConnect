import React from "react";
import { Form } from "react-router-dom";
import { FormRow, Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("Login successful:", user);
      // Redirect to dashboard or appropriate page after login
      navigate("/dashboard");
    } else {
      console.log("Unauthorized");
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="grid place-content-center h-screen p-8">
      <div className="grid gap-5 border p-8 shadow-md rounded">
        <Logo styles={"w-[80%] h-full mx-auto"} />
        <h1 className="text-2xl text-custom-blue mx-auto">Login</h1>
        <Form className="grid gap-4" method="post" onSubmit={handleLogin}>
          <FormRow type={"text"} name={"email"} labelText={"Email"} />
          <FormRow type={"password"} name={"password"} labelText={"Password"} />
          <button className="bg-custom-darkBlue text-white rounded border p-1">
            Submit
          </button>
          <Link
            to={"/dashboard"}
            className="bg-custom-darkBlue text-white rounded border p-1 text-center"
          >
            Demo User
          </Link>
          <p>
            Not a member yet?{" "}
            <Link className="text-custom-lightBlue" to={"/register"}>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
