'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Products {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  id: string;
}

const Home = () => {
  const [products, setProducts] = useState<Products[] | []>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/`);
        setProducts(res.data.products);
        console.log('Карточки товаров загружены успешно');
      } catch (e) {
        console.log(e.response.data.message);
      }
    };

    getProducts();
  }, []);
  {/*sm:>=640  md:>=768  lg:>=1024 */}
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-8xl w-[90%]">

        <div className="bg-white grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-x-5 gap-y-9 p-6 rounded-t-lg mt-12 overflow-hidden">
          {products.map(
            ({ image, name, description, price, id }) => (
              <div key={image} className="md:w-[340px] max-w-[350px] mx-auto lg:w-[200px]">
                <div className="relative h-[300px] md:w-[100%]">
                  <Link href={`/product/${id}`}>
                    <Image
                      unoptimized={true}
                      fill
                      className=" object-fit rounded-[9px] cursor-pointer"
                      src='/IMG_20230702_113231.jpg'
                      alt={name}
                    />
                  </Link>
                </div>
                <p className="mt-2 font-bold text-[20px] text-green-600">
                  {Math.round(price)} &#x20BD;
                </p>
                <Link
                  className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] hover:text-blue-700 transition-colors"
                  href={`/product/${id}`}
                >
                  {description}
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
