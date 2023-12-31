import { Decimal } from "@prisma/client/runtime";
import { Customer } from "../../../../entities/Customer";

export interface resultList_I extends Omit<Customer, "userId"> {
  product: {
    name: string;
    price?: Decimal;
  } | null;
  plan: {
    name: string;
    price?: Decimal;
  } | null;
}

export interface propsGet_I {
  skip: number;
  userId: number;
  amount: number;
  name?: string;
  afterDate?: Date;
  beforeDate?: Date;
  whatsapp?: string;
  login?: string;
  invoice?: "PAY" | "PENDING";
  planId?: number;
  productId?: number;
}

export interface ListCustomerOfUserRepository_I {
  get(props: propsGet_I): Promise<resultList_I[]>;
}
