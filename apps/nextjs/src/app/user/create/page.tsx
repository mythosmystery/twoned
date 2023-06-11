"use client";

import { useAuth } from "@clerk/nextjs";
import { CenterLayout } from "../../../layouts/center";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RingLoader } from "react-spinners";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

const CreateUserPage = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const { mutate, isSuccess } = trpc.user.create.useMutation();

  useEffect(() => {
    if (userId) {
      mutate();
    }
  }, [userId, mutate]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  return (
    <CenterLayout>
      <h1 className="text-4xl font-thin">Creating your account...</h1>
      <RingLoader size={150} className="my-32" />
      <span>
        You should be automatically redirected, if not{" "}
        <Link className="text-purple-700 hover:text-blue-600" href="/">
          Click here
        </Link>
      </span>
    </CenterLayout>
  );
};

export default CreateUserPage;
