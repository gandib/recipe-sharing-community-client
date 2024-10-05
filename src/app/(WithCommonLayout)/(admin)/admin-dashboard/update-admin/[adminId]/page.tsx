import AdminCard from "@/src/components/UI/AdminCard";

const UpdateAdmin = ({ params }: { params: { adminId: string } }) => {
  return (
    <div>
      <AdminCard title="Update Admin" email={params.adminId} />
    </div>
  );
};

export default UpdateAdmin;
