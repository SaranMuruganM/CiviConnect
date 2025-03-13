import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const user = Object.fromEntries(formData);
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/v1/auth/login`,
      user,
      {
        withCredentials: true,
      }
    );

    return redirect('/dashboard');
  } catch (error) {
    console.log(error.response.data.message);
    return null;
  }
};
const Login = () => {
  return (
    <div className="grid place-content-center h-screen p-8">
      <div className="grid gap-5 border p-8 shadow-md rounded">
        <Logo styles={'w-[80%] h-full mx-auto'} />
        <h1 className="text-2xl text-custom-blue mx-auto">Login</h1>
        <Form className="grid gap-4" method="post">
          <FormRow type={'text'} name={'email'} labelText={'Email'} />
          <FormRow type={'password'} name={'password'} labelText={'Password'} />
          <button className="bg-custom-darkBlue text-white rounded border p-1">
            Submit
          </button>
          <Link
            to={'/dashboard'}
            className="bg-custom-darkBlue text-white rounded border p-1 text-center"
          >
            Demo User
          </Link>
          <p>
            Not a member yet?{' '}
            <Link className="text-custom-lightBlue" to={'/register'}>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
