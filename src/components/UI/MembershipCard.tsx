import { useUser } from "@/src/context/user.provider";
import { useMembershipPayment } from "@/src/hooks/payment.hook";
import { Button } from "@nextui-org/react";
import { Card as NextUiCard, CardHeader, CardFooter } from "@nextui-org/react";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import PaymentButton from "./PaymentButton";

const MembershipCard = () => {
  const prices = [
    { price: 199, validity: "30 Days" },
    { price: 1499, validity: "1 Year" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-2">
      {prices?.map((data, index) => (
        <NextUiCard
          key={index}
          isFooterBlurred
          className="h-[300px] sm:h-[280px]  w-full"
        >
          <CardHeader className=" flex-col items-start">
            <p className=" rounded-full bg-black px-2 text-tiny uppercase text-white/90">
              Premium
            </p>
            <div className="flex justify-between w-full">
              <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-2xl font-medium text-purple-500">
                {data.validity}
              </h4>
              <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-2xl font-medium text-green-500">
                {data.price} BDT
              </h4>
            </div>
            <div className="mt-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <CheckCircle className="text-green-500" />
              <p className="ml-2">
                All basic and premium Recipes are included.
              </p>
            </div>
            <div className="mt-2 rounded  p-1 lg:text-lg font-medium flex justify-center">
              <CheckCircle className="text-green-500" />
              <p className="ml-2">Unlimited Recipes you brows and post.</p>
            </div>
          </CardHeader>
          <CardFooter className="absolute bottom-0 z-10 justify-end border-t-1 border-zinc-100/50 bg-white/30">
            <PaymentButton price={data.price} />
          </CardFooter>
        </NextUiCard>
      ))}
    </div>
  );
};

export default MembershipCard;
