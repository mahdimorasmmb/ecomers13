"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "../FormInput";
import Button from "../Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const data = await signIn('credentials', {
      email,
      password,
      redirect:false
    });

    if (data?.error) {
      return toast.error(data?.error);
    }
    
    router.push(callBackUrl || "/");
  };

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">ورود </h2>
        <FormInput
          label="ایمیل"
          type="text"
          placeholder="ایمیل خود را وارد کنید "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="رمز عبور "
          type="password"
          placeholder="رمز عبور  خود را وارد کنید "
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button  type="submit" className="w-full mt-2" >
        ورود
        </Button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          حساب کاربری ندارید?{" "}
          <Link href="/register" className="text-blue-500">
            ثبت نام کنید
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
