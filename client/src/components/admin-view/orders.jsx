import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  updateOrderStatus,
} from "@/store/admin/order-slice/index";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

// Helper function to format price (convert to number and format)
const formatPrice = (price) => {
  const numPrice = Number(price); // Convert to number
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2); // Fallback to "0.00" if invalid
};

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails, isLoading, error } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleUpdateOrderStatus(orderId, newStatus) {
    dispatch(updateOrderStatus({ id: orderId, orderStatus: newStatus })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update order status.");
      }
    });
  }

  function formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <p className="text-center">Loading orders...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>Update Status</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}><TableCell>{orderItem?._id}</TableCell><TableCell>{formatOrderDate(orderItem?.orderDate)}</TableCell><TableCell><Badge className={`py-1 px-3 ${orderItem?.orderStatus === "fulfilled" ? "bg-blue-500" : orderItem?.orderStatus === "shipped" ? "bg-yellow-500" : orderItem?.orderStatus === "delivered" ? "bg-green-500" : orderItem?.orderStatus === "cancelled" ? "bg-red-600" : "bg-gray-500"}`}>{orderItem?.orderStatus.toUpperCase()}</Badge></TableCell><TableCell>${formatPrice(orderItem?.totalAmount)}</TableCell><TableCell className="text-white"><Select onValueChange={(value) => handleUpdateOrderStatus(orderItem._id, value)} defaultValue={orderItem.orderStatus}><SelectTrigger className="w-[120px]"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="fulfilled">Fulfilled</SelectItem><SelectItem value="shipped">Shipped</SelectItem><SelectItem value="delivered">Delivered</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select></TableCell><TableCell><Dialog open={openDetailsDialog} onOpenChange={(open) => { setOpenDetailsDialog(open); if (!open) { dispatch(resetOrderDetails()); } }}><Button onClick={() => handleFetchOrderDetails(orderItem?._id)} disabled={isLoading}>View Details</Button>{orderDetails && <AdminOrderDetailsView orderDetails={orderDetails} />}</Dialog></TableCell></TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="text-center">No orders found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;