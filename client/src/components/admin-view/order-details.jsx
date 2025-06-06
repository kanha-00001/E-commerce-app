import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogTitle } from "../ui/dialog"; // Add DialogTitle import
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice/index";
import { toast } from "sonner";

// Helper function to capitalize strings
const capitalize = (str) => {
  if (!str) return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Helper function to format price (convert string to number and format)
const formatPrice = (price) => {
  const numPrice = Number(price); // Convert string to number
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2); // Fallback to "0.00" if invalid
};

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user, isLoading, error } = useSelector((state) => ({
    user: state.auth.user,
    isLoading: state.adminOrder.isLoading,
    error: state.adminOrder.error,
  }));
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    if (!status) {
      toast("Please select a status to update.");
      return;
    }

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        toast("Order status updated successfully!");
      } else {
        toast(data?.payload?.message || "Failed to update order status.");
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
    <DialogContent className="sm:max-w-[600px]">
      {/* Add a visually hidden DialogTitle for accessibility */}
      <VisuallyHidden>
        <DialogTitle>Order Details for ID {orderDetails?._id || "Unknown"}</DialogTitle>
      </VisuallyHidden>
      <div className="grid gap-6">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{formatOrderDate(orderDetails?.orderDate)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount?.toFixed(2) || "0.00"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{capitalize(orderDetails?.paymentMethod)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{capitalize(orderDetails?.paymentStatus)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label className="text-white">
              <Badge
                className={`py-1 px-3 text-white ${
                  orderDetails?.orderStatus === "fulfilled"
                    ? "bg-blue-500"
                    : orderDetails?.orderStatus === "shipped"
                    ? "bg-yellow-500"
                    : orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "cancelled"
                    ? "bg-red-600"
                    : "bg-gray-500"
                }`}
              >
                {capitalize(orderDetails?.orderStatus)}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${formatPrice(item.price)}</span>
                  </li>
                ))
              ) : (
                <li className="text-center text-muted-foreground">
                  No items found.
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{orderDetails?.userId?.userName || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.address || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.city || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.pincode || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.phone || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.notes || "N/A"}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "fulfilled", label: "Fulfilled" },
                  { id: "shipped", label: "Shipped" },
                  { id: "delivered", label: "Delivered" },
                  { id: "cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
            disabled={isLoading}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;