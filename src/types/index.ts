import { ChangeEventHandler, ElementType, FormEvent, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TLinkItem = {
  href: string;
  label: string;
  icon: ElementType;
};

export type TTags = { _id: string; tags: string };

export type TRecipeMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  result: IRecipe[];
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
}

export interface IRecipe {
  _id: string;
  user: IUser;
  title: string;
  image: string[];
  upvote: any[];
  downvote: any[];
  tags: string;
  contentType: "basic" | "premium";
  status: "published" | "unpublished";
  rating: any[];
  comment: any[];
  instructions: string;
  createdAt: string;
  updatedAt: string;
}
