"use client";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { memo, useContext } from "react";
import Logo from "../logo";
import Avatar from "../avatar";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import BlankButton from "../buttons/BlankButton";
import UserTag from "../user-tag";

const Header = memo(() => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-10">
        <Logo />
        <UserTag />
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
              onClick={() => router.push("/account")}
            />
          </>
        ) : (
          <>
            <BlankButton>
              <Link href="/account">
                <FaUser size={20} />
              </Link>
            </BlankButton>
            <BlankButton>
              <Link href="/cart">
                <FaShoppingCart size={20} />
              </Link>
            </BlankButton>
          </>
        )}
      </div>
    </div>
  );
});

export default Header;
