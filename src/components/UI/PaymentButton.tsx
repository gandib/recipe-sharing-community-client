"use client";

import { Button } from "@nextui-org/react";
import moment from "moment";
import { useMembershipPayment } from "@/src/hooks/payment.hook";
import { useUser } from "@/src/context/user.provider";

const PaymentButton = ({ price }: { price: number }) => {
  const { user, isLoading } = useUser();
  const { mutate: handleMembershipPayment, data } = useMembershipPayment();

  if (data?.success) {
    window.location.href = data?.data?.payment_url;
  }

  const handlePayment = () => {
    let validity;

    if (price === 199) {
      validity = moment(new Date(Date.now() + 86400000 * 30)).format();
    }
    if (price === 1499) {
      validity = moment(new Date(Date.now() + 86400000 * 365)).format();
    }
    const paymentData = {
      userId: user?._id,
      amount: price,
      validity: validity,
      transactionId: `TXN-${Date.now()}`,
    };

    handleMembershipPayment(paymentData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <Button
        className="bg-black text-tiny text-white "
        radius="full"
        size="sm"
        onClick={() => handlePayment()}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default PaymentButton;
