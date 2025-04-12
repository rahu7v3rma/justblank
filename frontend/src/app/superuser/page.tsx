'use client';
import Button from '@/components/buttons/Button';
import Checkbox from '@/components/checkbox';
import Heading from '@/components/heading';
import Input from '@/components/input';
import Table from '@/components/table';
import VerticalTabs from '@/components/vertical-tabs';
import { useModal } from '@/context/modal';
import useApi from '@/hooks/api';
import { getUsers as apiGetUsers } from '@/services/api';
import { SuperuserAddUserSchema } from '@/utils/schema';
import { User } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AddUser = memo(({ role }: { role: string }) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(SuperuserAddUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: '',
      isEmailVerified: false,
      emailVerificationCode: '',
    },
    mode: 'onChange',
  });

  const addUser = useCallback(
    (formData: z.infer<typeof SuperuserAddUserSchema>) => {
      console.log(formData);
    },
    []
  );

  return (
    <div>
      <Heading type="h5">Add a {role}</Heading>
      <Input
        type="text"
        placeholder="Name"
        value={watch('name')}
        onChange={(e) => setValue('name', e.target.value)}
        errorMessage={errors.name?.message}
      />
      <Input
        type="text"
        placeholder="Email"
        value={watch('email')}
        onChange={(e) => setValue('email', e.target.value)}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        value={watch('password')}
        onChange={(e) => setValue('password', e.target.value)}
        errorMessage={errors.password?.message}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={watch('confirmPassword')}
        onChange={(e) => setValue('confirmPassword', e.target.value)}
        errorMessage={errors.confirmPassword?.message}
      />
      <Input
        type="text"
        placeholder="Role"
        value={watch('role')}
        onChange={(e) => setValue('role', e.target.value)}
        errorMessage={errors.role?.message}
      />
      <Checkbox
        value={watch('isEmailVerified')}
        onChange={(e) => setValue('isEmailVerified', e)}
        errorMessage={errors.isEmailVerified?.message}
      />
      <Input
        type="text"
        placeholder="Email Verification Code"
        value={watch('emailVerificationCode')}
        onChange={(e) => setValue('emailVerificationCode', e.target.value)}
        errorMessage={errors.emailVerificationCode?.message}
      />
      <Button onClick={handleSubmit(addUser)}>
        <Heading type="h6">Submit</Heading>
      </Button>
    </div>
  );
});

AddUser.displayName = 'AddUser';

const SuperuserPage = () => {
  const [sidebarOption, setSidebarOption] = useState('Admin Management');
  const [users, setUsers] = useState<User[]>([]);

  const { callApi: getUsers } = useApi(apiGetUsers);

  const fetchUsers = useCallback(
    async (role: string) => {
      const data = await getUsers(role);
      setUsers(data.users);
    },
    [getUsers]
  );

  const { openModal } = useModal();

  return (
    <div className="flex relative w-full">
      <VerticalTabs
        options={[
          'Admin Management',
          'Seller Management',
          'Customer Management',
        ]}
        selectedOption={sidebarOption}
        setSelectedOption={(option) => {
          setSidebarOption(option);
          fetchUsers(option.toLowerCase().split(' ')[0]);
        }}
      />
      <div className="border border-primary-light rounded-md p-2 ml-2 w-full">
        <Heading
          type="h5"
          className="text-center w-full block border-b border-primary-light pb-2"
        >
          {sidebarOption}
        </Heading>
        <div className="flex justify-end py-2">
          <Button
            className="w-max"
            onClick={() => {
              openModal(<AddUser role={sidebarOption.split(' ')[0]} />);
            }}
          >
            <Heading type="h6">Add {sidebarOption.split(' ')[0]}</Heading>
          </Button>
        </div>
        <div className="mt-2 w-full">
          <Table
            columns={[
              { label: 'Name', key: 'name' },
              { label: 'Email', key: 'email' },
              { label: 'Role', key: 'role' },
            ]}
            data={users}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SuperuserPage;
