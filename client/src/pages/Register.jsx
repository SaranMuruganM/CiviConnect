import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const newUser = Object.fromEntries(formData);
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/v1/auth/register`,
      newUser
    );
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Register = () => {
  return (
    <div className="grid place-content-center h-screen p-8">
      <div className="grid gap-5 border p-8 shadow-md rounded">
        <Logo styles={'w-[80%] h-full mx-auto'} />
        <h1 className="text-2xl mx-auto text-custom-blue">Register</h1>
        <Form className="grid gap-4" method="post">
          <FormRow type={'text'} name={'username'} labelText={'Name'} />
          <FormRow type={'text'} name={'email'} labelText={'Email'} />
          <FormRow type={'password'} name={'password'} labelText={'Password'} />
          <FormRow type={'text'} name={'city'} labelText={'City'} />
          <button className="bg-custom-darkBlue text-white rounded border p-1">
            Submit
          </button>
          <p>
            Already a Member?{' '}
            <Link className="text-custom-lightBlue" to={'/login'}>
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
