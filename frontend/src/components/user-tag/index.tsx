import { AuthContext } from "@/context/auth";

import { useContext } from "react";

const UserTag = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-primary-light text-white px-2 py-1 rounded-md">
      {user?.role}
    </div>
  );
};

export default UserTag;
