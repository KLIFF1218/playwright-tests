'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeClosed, MoveLeft, UserPlus } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Form {
  email: string;
  password: string;
}

const Register = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null)
  const [error, setError] = useState<null>(null);
  const [message, setMessage] = useState<null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, form, {
        withCredentials: true,
      });
      router.replace('/profile')
      setForm(res.data.data);
      setSuccess(true);
      setMessage(res.data.message);
      console.log('Регистрация прошла успешно');
    } catch (e) {
      console.log(e.response.data.message)
        setSuccess(false);
        setError(e.response.message);
    } finally {
      setLoading(false);
      setForm({ email: '', password: ''})
    }
  }

  return (
    <div className="min-h-screen  relative flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-80">
      <Link
        href="/"
        className="absolute top-3 left-3 inline-block bg-white rounded-full text-neutral-600 p-4 shadow-md "
      >
        <MoveLeft size={22} />
      </Link>
      <div className="w-110 px-11 py-8 bg-white/70 rounded-xl shadow-lg flex flex-col text-center">
        <div className="mb-7">
          <p className="inline-block">
            <UserPlus size={35} className="text-blue-600" />
          </p>
          <h2 className="font-semibold text-3xl">Create Account</h2>
          <p className="text-gray-700 text-sm">Join SecureKeep today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-5 ">
            <label className="mb-1" htmlFor="email">
              Email
            </label>
            <input
              id='email'
              type="email"
              value={form.email}
              name='email'
              onChange={handleChange}
              className=" border focus:ring-2 focus:outline-none focus:ring-purple-600 border-gray-200 shadow-sm rounded-sm pl-4 py-2"
              placeholder="you@example.com"
            ></input>
          </div>

          <div className="relative flex flex-col text-left">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              id='password'
              type={visible ? 'text' : 'password'}
              value={form.password}
              name='password'
              onChange={handleChange}
              className="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm rounded-sm pl-4 py-2 text-sm"
              autoComplete="true"
              placeholder="••••••••"
            ></input>
            {visible ? (
              <Eye
                className="absolute bottom-2 right-2 cursor-pointer"
                onClick={() => setVisible(prev => !prev)}
              />
            ) : (
              <EyeClosed
                className="absolute bottom-2 cursor-pointer right-2"
                onClick={() => setVisible(prev => !prev)}
              />
            )}
          </div>

          <button
            className="cursor-pointer active:scale-[0.97] hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 transition-colors bg-gradient-to-r from-blue-600 to-blue-600 w-full mt-4 py-2 text-white rounded-md"
            type="submit"
          >
            {loading ? 'Registering' : 'Register'}
          </button>
        </form>

        {success ? <p>Succesfull</p> : <p>Error ...</p>}
        <p className="mt-5 text-gray-700">
          Already have an account?{' '}
          <Link className="text-blue-700 hover:underline" href="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
