'use client';
import Button from '@/components/buttons/Button';
import Checkbox from '@/components/checkbox';
import Heading from '@/components/heading';
import Input from '@/components/input';
import Select from '@/components/select';
import Table from '@/components/table';
import VerticalTabs from '@/components/vertical-tabs';
import { useModal } from '@/context/modal';
import useApi from '@/hooks/api';
import {
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  getUsers as apiGetUsers,
  editUser,
} from '@/services/api';
import {
  SuperuserAddUserSchema,
  SuperuserEditUserSchema,
} from '@/utils/schema';
import { User } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AddUser = memo(
  ({
    role,
    onSubmit,
    name,
    email,
    isEmailVerified,
    sendVerificationEmail,
  }: {
    role: string;
    onSubmit: (formData: z.infer<typeof SuperuserAddUserSchema>) => void;
    name?: string;
    email?: string;
    isEmailVerified?: boolean;
    sendVerificationEmail?: boolean;
  }) => {
    const {
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm({
      resolver: zodResolver(SuperuserAddUserSchema),
      defaultValues: {
        email: email || '',
        password: '',
        confirmPassword: '',
        name: name || '',
        isEmailVerified: isEmailVerified || false,
        sendVerificationEmail: sendVerificationEmail || false,
      },
      mode: 'onChange',
    });

    return (
      <div className="flex flex-col gap-2">
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
        <Checkbox
          label="Email Verified"
          value={watch('isEmailVerified')}
          onChange={(e) => setValue('isEmailVerified', e)}
          errorMessage={errors.isEmailVerified?.message}
        />
        <Checkbox
          label="Send Verification Email"
          value={watch('sendVerificationEmail')}
          onChange={(e) => setValue('sendVerificationEmail', e)}
          errorMessage={errors.sendVerificationEmail?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>
          <Heading type="h6">Submit</Heading>
        </Button>
      </div>
    );
  }
);

AddUser.displayName = 'AddUser';

const EditUser = memo(
  ({
    _id,
    role,
    onSubmit,
    name,
    email,
    isEmailVerified,
    sendVerificationEmail,
  }: {
    _id: string;
    role: string;
    onSubmit: (formData: z.infer<typeof SuperuserEditUserSchema>) => void;
    name?: string;
    isEmailVerified?: boolean;
    sendVerificationEmail?: boolean;
    email?: string;
  }) => {
    const {
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm({
      resolver: zodResolver(SuperuserEditUserSchema),
      defaultValues: {
        _id: _id,
        email: email || '',
        password: '',
        confirmPassword: '',
        name: name || '',
        role: role || '',
        isEmailVerified: isEmailVerified || false,
        sendVerificationEmail: sendVerificationEmail || false,
      },
      mode: 'onChange',
    });

    useEffect(() => {
      console.log(_id, errors);
    }, [errors, _id]);

    return (
      <div className="flex flex-col gap-2">
        <Heading type="h5">Edit {role}</Heading>
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
        <Select
          options={['admin', 'seller', 'customer']}
          value={watch('role') || role}
          onChange={(e) => setValue('role', e)}
          errorMessage={errors.role?.message}
        />
        <Checkbox
          label="Email Verified"
          value={watch('isEmailVerified') || false}
          onChange={(e) => setValue('isEmailVerified', e)}
          errorMessage={errors.isEmailVerified?.message}
        />
        <Checkbox
          label="Send Verification Email"
          value={watch('sendVerificationEmail') || false}
          onChange={(e) => setValue('sendVerificationEmail', e)}
          errorMessage={errors.sendVerificationEmail?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>
          <Heading type="h6">Submit</Heading>
        </Button>
      </div>
    );
  }
);

EditUser.displayName = 'EditUser';

const SuperuserPage = () => {
  const [sidebarOption, setSidebarOption] = useState('Admin Management');
  const [users, setUsers] = useState<User[]>([]);
  const role = sidebarOption.split(' ')[0].toLowerCase();

  const { callApi: getUsers } = useApi<typeof apiGetUsers>(apiGetUsers);

  const { callApi: createUser } = useApi<typeof apiCreateUser>(apiCreateUser);

  const { openModal, closeModal } = useModal();

  const fetchUsers = useCallback(
    async (role: string) => {
      const data = await getUsers(role);
      setUsers(
        data.users.map((user: any) => ({
          ...user,
          edit: (
            <Button
              onClick={() => {
                openModal(
                  <EditUser
                    _id={user._id}
                    role={role}
                    onSubmit={(
                      formData: z.infer<typeof SuperuserEditUserSchema>
                    ) => {
                      const {
                        email,
                        password,
                        confirmPassword,
                        name,
                        isEmailVerified,
                        sendVerificationEmail,
                      } = formData;
                      editUser(
                        user._id,
                        name,
                        email,
                        password,
                        confirmPassword,
                        role,
                        isEmailVerified,
                        sendVerificationEmail
                      ).then(() => {
                        fetchUsers(role);
                        closeModal();
                      });
                    }}
                    name={user.name}
                    email={user.email}
                    isEmailVerified={user.isEmailVerified}
                    sendVerificationEmail={user.sendVerificationEmail}
                  />
                );
              }}
            >
              Edit
            </Button>
          ),
          delete: (
            <Button
              onClick={() => {
                apiDeleteUser(user._id).then(() => fetchUsers(role));
              }}
            >
              Delete
            </Button>
          ),
        }))
      );
    },
    [getUsers, openModal, closeModal]
  );

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
              openModal(
                <AddUser
                  role={role}
                  onSubmit={(formData) => {
                    const {
                      name,
                      email,
                      password,
                      confirmPassword,
                      isEmailVerified,
                      sendVerificationEmail,
                    } = formData;
                    createUser(
                      name,
                      email,
                      password,
                      confirmPassword,
                      role,
                      isEmailVerified,
                      sendVerificationEmail
                    ).then(() => {
                      fetchUsers(role);
                      closeModal();
                    });
                  }}
                />
              );
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
              { label: 'Edit', key: 'edit' },
              { label: 'Delete', key: 'delete' },
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
