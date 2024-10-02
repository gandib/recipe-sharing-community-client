import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  image: string;
  bio: string;
  status: "blocked" | "unblocked";
  follower: string[];
  following: string[];
  membership: "basic" | "premium";
  transactionId: string;
  subscriptionValidity: string;
}

export interface IInput {
  varient?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}
