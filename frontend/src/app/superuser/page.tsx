import Sidebar from "@/components/sidebar";

const SuperUserPage = () => {
  return (
    <div className="flex relative w-full">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1">SuperUser</div>
    </div>
  );
};

export default SuperUserPage;
