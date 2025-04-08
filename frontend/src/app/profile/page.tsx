"use client";
import Button from "@/components/buttons/Button";
import Text from "@/components/text";
import { AuthContext } from "@/context/auth";
import { memo, useContext } from "react";
const Profile = memo(() => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Text>{user?.email}</Text>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
});

export default Profile;
