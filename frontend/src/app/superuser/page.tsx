"use client";
import Heading from "@/components/heading";
import Table from "@/components/table";
import VerticalTabs from "@/components/vertical-tabs";
import useApi from "@/hooks/api";
import { getUsers as apiGetUsers } from "@/services/api";
import { User } from "@/utils/types";
import { useState } from "react";

const SuperUserPage = () => {
  const [sidebarOption, setSidebarOption] = useState("Admin Management");
  const [users, setUsers] = useState<User[]>([]);

  const { callApi: getUsers } = useApi(apiGetUsers);

  const fetchUsers = async (role: string) => {
    const data = await getUsers(role);
    setUsers(data.users);
  };

  return (
    <div className="flex relative w-full">
      <VerticalTabs
        options={[
          "Admin Management",
          "Seller Management",
          "Customer Management",
        ]}
        selectedOption={sidebarOption}
        setSelectedOption={(option) => {
          setSidebarOption(option);
          fetchUsers(option.toLowerCase().split(" ")[0]);
        }}
      />
      <div className="border border-border-light rounded-md p-2 ml-2 w-full">
        <Heading
          type="h5"
          className="text-center w-full block border-b border-border-light pb-2"
        >
          {sidebarOption}
        </Heading>
        <div className="mt-2 w-full">
          <Table
            columns={[
              { label: "Name", key: "name" },
              { label: "Email", key: "email" },
              { label: "Role", key: "role" },
            ]}
            data={users}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SuperUserPage;
