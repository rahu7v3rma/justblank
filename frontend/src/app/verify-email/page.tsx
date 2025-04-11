"use client";
import Button from "@/components/buttons/Button";
import Heading from "@/components/heading";
import Input from "@/components/input";
import { ToastContext } from "@/context/toast";
import { verifyEmail } from "@/services/api";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";

const VerifyEmail = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      verificationCode: "",
    },
    mode: "onChange",
  });

  const { triggerToast } = useContext(ToastContext);
  const router = useRouter();

  const onSubmit = useCallback(
    async (formData: { email: string; verificationCode: string }) => {
      verifyEmail(formData.email, formData.verificationCode).then((res) => {
        if (!res.success) {
          triggerToast(res.message, "error");
        } else {
          triggerToast("Email verified successfully", "success");
          router.push("/login");
        }
      });
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
      <Heading>Verify Email</Heading>
      <Input
        type="text"
        placeholder="Email"
        errorMessage={errors.email?.message}
        value={watch("email")}
        onChange={(e) => setValue("email", e.target.value)}
      />
      <Input
        type="text"
        placeholder="Verification Code"
        errorMessage={errors.verificationCode?.message}
        value={watch("verificationCode")}
        onChange={(e) => setValue("verificationCode", e.target.value)}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
};

export default VerifyEmail;
