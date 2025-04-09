"use client";
import Button from "@/components/buttons/Button";
import TextButton from "@/components/buttons/TextButton";
import Heading from "@/components/heading";
import Input from "@/components/input";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { memo, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";

const Login = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onChange = useCallback((name: "email" | "password", value: string) => {
    setValue(name, value, { shouldValidate: true });
  }, []);

  const { login } = useContext(AuthContext);

  const onSubmit = useCallback(
    async (formData: { email: string; password: string }) => {
      login(formData.email, formData.password);
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
      <Heading>Login</Heading>
      <Input
        type="text"
        placeholder="Email"
        errorMessage={errors.email?.message}
        value={watch("email")}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        errorMessage={errors.password?.message}
        value={watch("password")}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      <TextButton>
        Don't have an account? <Link href="/register">Register</Link>
      </TextButton>
    </div>
  );
});

export default Login;
