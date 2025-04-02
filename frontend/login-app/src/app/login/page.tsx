"use client";

import Image from "next/image";
import Link from "next/link";
import api from "../utils/axios";
import ErrorModal from "../components/errorModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  let validForm = false;
  const router = useRouter();

  const validateForm = () => {
    if (
      formData.userName.length > 3 &&
      formData.userName.length < 15 &&
      formData.password.length >= 8 &&
      formData.password.length <= 30
    ) {
      validForm = true;
    }

    return validForm;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e is the event
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e is the event
    // e.preventDefault() prevents the default behavior of the form, which is to refresh the page
    e.preventDefault();

    const validForm = validateForm();

    if (validForm) {
      try {
        const response = await api.post("/api/auth/login", formData);
        console.log(response.data);
        router.push(`/spaceship/${response.data.user.userName}`);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            setIncorrectCredentials(true);
          }
        } else {
          setErrorMessage("Error connecting to the server. Try again later");
        }
      }
    }
  };

  return (
    <>
      <Link href="/" className="absolute top-3 left-2">
        <button className="flex rounded-xl bg-gray-800 p-2 hover:bg-gray-700 shadow-xl outline outline-2 outline-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </Link>

      <div className="flex justify-center items-center">
        <div className="bg-gray-800 rounded-lg p-4 mt-5 w-sm shadow-xl flex flex-col items-center">
          <Image
            src="/spaceship-no-bg.png"
            alt="logo"
            width={100}
            height={50}
          />
          <form
            onSubmit={handleSubmit}
            className="text-white space-y-5 pt-2 pb-10"
          >
            <div className="flex justify-center items-center">
              <h2 className="text-2xl">Login</h2>
            </div>
            <div>
              <label htmlFor="userName">Username</label>
              <div>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleOnChange}
                  className="bg-gray-700 rounded-md outline-1 outline-offset-1 outline-gray-400 px-2 w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  className="bg-gray-700 rounded-md outline-1 outline-offset-1 outline-gray-400 px-2 w-full"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-purple-700 mt-4 px-4 py-1 rounded-md w-full hover:bg-purple-800 disabled:opacity-50"
                disabled={!validateForm()}
              >
                Login
              </button>
            </div>
          </form>

          {incorrectCredentials && (
            <p className="text-red-500">Incorrect username or password</p>
          )}
        </div>
      </div>

      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </>
  );
}
