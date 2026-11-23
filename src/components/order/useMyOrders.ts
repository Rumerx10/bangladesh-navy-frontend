import {
  IOrder,
  OrderStatus,
  ORDER_QUERY_KEYS,
} from "@/src/components/cart/types/order";
import { useGet } from "@/src/hooks/useGet";

export const MY_ORDERS_PAGE_SIZE = 10;

/** The signed-in customer's orders, newest first (GET /order/my). */
export const useMyOrders = ({
  page,
  status,
}: {
  page: number;
  status?: OrderStatus | "";
}) => {
  const query = useGet<IOrder[]>("/order/my", ORDER_QUERY_KEYS.mine, {
    page,
    limit: MY_ORDERS_PAGE_SIZE,
    sortOrder: "desc",
    status,
  });

  return {
    ...query,
    orders: Array.isArray(query.data?.data) ? query.data.data : [],
    totalItems: query.data?.meta?.totalItems ?? 0,
    totalPages: query.data?.meta?.totalPages ?? 1,
  };
};
