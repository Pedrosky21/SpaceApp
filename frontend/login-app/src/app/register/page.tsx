"use client";

import Image from "next/image";
import Link from "next/link";
import api from "../utils/axios";
import axios from "axios";
import ErrorModal from "../components/errorModal";
import SuccessModal from "../components/successModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [touchedUser, setTouchedUser] = useState(false);
  const [touchedPass, setTouchedPass] = useState(false);
  let validUser = false;
  let validPass = false;
  let validForm = false;
  const router = useRouter();

  const validateForm = () => {
    if (formData.userName.length > 3 && formData.userName.length < 15) {
      validUser = true;
    } else {
      validUser = false;
    }

    if (formData.password.length >= 8 && formData.password.length <= 30) {
      validPass = true;
    } else {
      validPass = false;
    }

    if (validUser && validPass) {
      validForm = true;
    }

    return validForm;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e is the event
    validateForm();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validForm = validateForm();

    if (validForm) {
      try {
        const response = await api.post("/api/auth/register", formData);
        console.log(response.data);
        setSuccessMessage("User registered successfully. You can now log in.");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            setErrorMessage("Username already exists");
          }
        } else {
          setErrorMessage("Error connecting to the server. Try again later");
        }
      }
    }
  };

  const acceptRegister = () => {
    setSuccessMessage("");
    router.push("/login");
  };

  return (
    <>
      <Link href="/" className="absolute top-3 left-2">
        <button className="flex items-center rounded-xl bg-gray-800 p-2 hover:bg-gray-700 shadow-xl outline outline-2 outline-black">
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
          <p>
            Already have an account?{" "}
            <strong>
              <Link href="/login">Sign in</Link>
            </strong>
          </p>
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
              <h2 className="text-2xl">Register</h2>
            </div>
            <div>
              <label htmlFor="userName">Username</label>
              <div>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleOnChange}
                  onBlur={() => setTouchedUser(true)}
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
                  onBlur={() => setTouchedPass(true)}
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
                Register
              </button>
            </div>
          </form>
          {!validUser && touchedUser && (
            <p className="text-red-500">
              Username must be between 4 and 12 characters long (both included)
            </p>
          )}
          {!validPass && touchedPass && (
            <p className="text-red-500 mt-5">
              Password must be between 8 and 30 characters long (both included)
            </p>
          )}
        </div>
      </div>

      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {successMessage && (
        <SuccessModal message={successMessage} onAccept={acceptRegister} />
      )}
    </>
  );
}
