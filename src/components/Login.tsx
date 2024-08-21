"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import ButtonCustom from "./ButtonCustom";
import GoogleButton from "./GoogleButton";
import PATHROUTES from "@/helpers/path-routes";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email. Example abc@example.com")
    .required("Email is required.")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Enter a valid email. Example abc@example.com"
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required."),
});
interface FormValues {
  email: string;
  password: string;
}
const initialValues: FormValues = {
  email: "",
  password: "",
};
const Login: React.FC = () => {
  return (
    <div className="text-lightText dark:text-darkText flex flex-col justify-center items-center p-12">
      <div className="dark:bg-darkBG dark:border-darkBorders w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-20 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="text-detail w-full text-4xl flex gap-2 justify-center ">
          <img src="" alt="[logo]" />
          <span>NearVet</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-5xl text-lightHline dark:text-darkHline">
            Access your account
          </h1>
          <p>
            Don't have an account?{" "}
            <Link className="text-primary font-bold" href={PATHROUTES.HOME}>
              Sign up
            </Link>
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => {
            console.log("Submitted values:", values);
          }}
        >
          {() => (
            <Form className="sm:w-[35vw] lg:w-[25vw] mx-auto flex flex-col text-[1em]">
              <div className="mb-3">
                <label className="text-detail font-semibold" htmlFor="email">
                  Email
                </label>
                <Field
                  className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                />
                <div className="h-4">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-primary text-wrap"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-detail font-semibold" htmlFor="password">
                  Password
                </label>
                <Field
                  className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                />
                <div className="h-4">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-primary text-wrap"
                  />
                </div>
              </div>
              {/* <button className="bg-primary text-white"></button> */}
              <ButtonCustom text="Log In" color="white"></ButtonCustom>
            </Form>
          )}
        </Formik>
        <span className="text-gray-400 font-bold">- OR -</span>
        <GoogleButton
          text="Sign in with Google"
          onClick={() => console.log("Google sign-in clicked")}
          size="lg"
          color="blue-600"
          bgcolor="#f8f8f8"
        />
      </div>
    </div>
  );
};

export default Login;
