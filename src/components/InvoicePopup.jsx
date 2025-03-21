import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoicePopup = ({ order, user }) => {
  const invoiceRef = useRef(null);

  const generatePDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Invoice-${order.orderId}.pdf`);
  };

  const calculateItemTotal = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const calculateSubTotal = (items) => {
    return items
      .reduce((total, item) => {
        return total + item.quantity * item.product.sellingPrice;
      }, 0)
      .toFixed(2);
  };

  // Parse cart items
  const cartItems =
    typeof order.cartItems === "string"
      ? JSON.parse(order.cartItems)
      : order.cartItems;

  const subTotal = calculateSubTotal(cartItems);
  const tax = (subTotal * 0.18).toFixed(2); // 18% tax
  const total = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);

  return (
    <Dialog>
      <DialogTrigger className="px-6 py-2 border border-gray-300 rounded-lg text-sm">
        Invoice
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold mb-4">
            Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="bg-white p-4 md:p-8 rounded-lg" ref={invoiceRef}>
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                GROCERY STORE
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                123 Store Street
              </p>
              <p className="text-sm md:text-base text-gray-600">
                City, State, 12345
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Phone: (123) 456-7890
              </p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                INVOICE
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Invoice #: {order.orderId}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Date: {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Payment Method: {order.paymentMethod || "Paypal"}
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h3 className="text-gray-800 font-semibold mb-2">Bill To:</h3>
            <p className="text-sm md:text-base text-gray-600">
              {user.given_name} {user.family_name}
            </p>
            <p className="text-sm md:text-base text-gray-600">{user.email}</p>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left text-sm md:text-base">
                    Item
                  </th>
                  <th className="py-2 px-4 text-right text-sm md:text-base">
                    Quantity
                  </th>
                  <th className="py-2 px-4 text-right text-sm md:text-base">
                    Rate
                  </th>
                  <th className="py-2 px-4 text-right text-sm md:text-base">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 md:w-10 h-8 md:h-10 relative flex-shrink-0">
                          <Image
                            src={
                              item.product.images ||
                              "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                            }
                            alt={item.product.name}
                            width={40}
                            height={40}
                            className="object-contain rounded"
                            unoptimized={true}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm md:text-base">
                            {item.product.name}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {item.product.itemQuantityType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right text-sm md:text-base">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-4 text-right text-sm md:text-base">
                      ₹{item.product.sellingPrice}
                    </td>
                    <td className="py-2 px-4 text-right text-sm md:text-base">
                      ₹
                      {calculateItemTotal(
                        item.quantity,
                        item.product.sellingPrice
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-64">
              <div className="flex justify-between mb-2">
                <span className="text-sm md:text-base text-gray-600">
                  Subtotal:
                </span>
                <span className="text-sm md:text-base">₹{subTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm md:text-base text-gray-600">
                  Tax (18%):
                </span>
                <span className="text-sm md:text-base">₹{tax}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-sm md:text-base">Total:</span>
                <span className="text-sm md:text-base">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600">
            <p className="text-xs md:text-sm">Thank you for your business!</p>
            <p className="text-xs md:text-sm">
              For any queries, please contact us at support@grocerystore.com
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={generatePDF}
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePopup;
