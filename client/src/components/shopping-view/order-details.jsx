import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  // Format the order date (e.g., "June 05, 2025")
  function formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  // Capitalize the first letter of a string
  function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate ? formatOrderDate(orderDetails.orderDate) : "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount ? orderDetails.totalAmount.toFixed(2) : "0.00"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod ? capitalize(orderDetails.paymentMethod) : "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus ? capitalize(orderDetails.paymentStatus) : "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "fulfilled"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-gray-500" // Default for other statuses like "pending"
                }`}
              >
                {orderDetails?.orderStatus ? capitalize(orderDetails.orderStatus) : "N/A"}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item) => (
                  <li key={item.productId} className="flex items-center justify-between">
                    <span>Title: {item.title || "N/A"}</span>
                    <span>Quantity: {item.quantity || 0}</span>
                    <span>Price: ${item.price ? Number(item.price).toFixed(2) : "0.00"}</span>
                  </li>
                ))
              ) : (
                <li className="text-center text-muted-foreground">No items found.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.address || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.city || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.pincode || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.phone || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.notes || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;