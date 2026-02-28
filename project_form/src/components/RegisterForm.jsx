import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().min(3, "Minimum 3 characters").required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .matches(/\d/, "Must contain at least one number")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms"),
});

export default function RegisterForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    setSuccess(true);
    reset();

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h2>Register</h2>

      {success && <p style={{ color: "green" }}>Registration Successful!</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name</label>
          <input {...register("fullName")} />
          <p>{errors.fullName?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("terms")} /> I agree to terms
          </label>
          <p>{errors.terms?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}