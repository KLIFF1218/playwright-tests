'use client';

import Link from 'next/link';
import { MoveLeft, Eye, EyeClosed, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form, setForm] = useState({ email: '', password: ''})

  const router = useRouter():

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form, {
        withCredentials: true,
      });
      router.push('profile')
      console.log(res.data.message);
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-br from-purple-100 to-blur-80">
      <Link
        className="absolute left-3 text-neutral-600 top-3 inline-block bg-white p-4 shadow-md rounded-full"
        href={'/'}
      >
        <MoveLeft size={22} />
      </Link>
      <div className="w-110 px-11 py-8 bg-white/70 rounded-lg shadow-lg">
        <div className="text-center mb-7">
          <p className="inline-block">
            <ShieldCheck className="text-blue-600" size={35} />
          </p>
          <h2 className="font-semibold text-3xl">SecureKeep</h2>
          <p className="text-gray-700 text-sm">
            Log in to protect your secrets
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 py-2 pl-4 shadow-md placeholder:text-gray-400"
              id="email"
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
            ></input>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 py-2 pl-4 shadow-md placeholder:text-gray-400 "
              id="password"
              name='password'
              onChange={handleChange}
              placeholder="••••••••"
              type={visible ? 'text' : 'password'}
            ></input>
            {visible ? (
              <Eye
                className="absolute right-2 top-9 cursor-pointer"
                onClick={() => setVisible(prev => !prev)}
              />
            ) : (
              <EyeClosed
                className="absolute top-9 right-2 cursor-pointer"
                onClick={() => setVisible(prev => !prev)}
              />
            )}
            <Link
              className="inline-block text-right mt-1 text-blue-600 text-md hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full py-2 mt-3 rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className='mt-5 text-center text-gray-500'>
          Don't have an account? <Link className='text-blue-600 hover:underline' href={'/register'}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
