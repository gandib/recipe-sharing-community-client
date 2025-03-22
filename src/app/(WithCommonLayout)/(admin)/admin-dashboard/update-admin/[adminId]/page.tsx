import AdminCard from "@/src/components/UI/AdminCard";

const UpdateAdmin = ({ params }: { params: { adminId: string } }) => {
  return (
    <div>
      <AdminCard email={params.adminId} title="Update Admin" />
    </div>
  );
};

export default UpdateAdmin;
