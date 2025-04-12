import { AuthContext } from '@/context/auth';
import { getUserHomePath } from '@/utils/auth';
import { useRouter } from 'next/navigation';

import { useContext } from 'react';

const UserTag = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div
      className="bg-primary-light text-white px-2 py-1 rounded-md cursor-pointer"
      onClick={() => {
        if (user) {
          router.push(getUserHomePath(user.role));
        }
      }}
    >
      {user?.role}
    </div>
  );
};

export default UserTag;
