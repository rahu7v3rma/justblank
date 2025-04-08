"use client";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { memo, useContext } from "react";
import TextButton from "../buttons/TextButton";
import Logo from "../logo";
import Avatar from "../avatar";
import { useRouter } from "next/navigation";

const Header = memo(() => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-10">
        <Logo />
        {/* <Dropdown label="SEO Tools" options={["Google Keyword Tool"]} /> */}
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <Avatar
              initials={
                user.name
                  .split(" ")
                  .slice(0, 2)
                  .map((name) => name.charAt(0))
                  .join("") || ""
              }
              onClick={() => router.push("/profile")}
            />
          </>
        ) : (
          <>
            <TextButton className="text-[15px]">
              <Link href="/login">Login</Link>
            </TextButton>
            <TextButton className="text-[15px]">
              <Link href="/signup">Signup</Link>
            </TextButton>
          </>
        )}
      </div>
    </div>
  );
});

export default Header;
