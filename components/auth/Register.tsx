"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useContext, useEffect, FormEvent } from "react";
// import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import FormInput from "../FormInput";
import Button from "../Button";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      toast.success("Registration was successful");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error(data.result);
    }
  };

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">ثبت حساب</h2>
        <FormInput
          warperClassName="mb-4"
          label="نام و نام خانوادگی "
          type="text"
          placeholder="نامتان را بنویسید"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          label={"پست الکترونیک "}
          warperClassName="mb-4"
          type="email"
          placeholder="پست الکترونیک  خود را تایپ کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label={"کلمه عبور "}
          warperClassName="mb-4"
          type="password"
          placeholder="رمز عبور خود را تایپ کنید"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full" label="ثبت نام" type="submit" />

        <hr className="mt-4" />

        <p className="text-center mt-5">
          از قبل حساب کاربری دارید؟
          <Link href="/login" className="text-blue-500">
            ورود
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
