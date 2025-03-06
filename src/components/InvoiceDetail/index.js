import React, { useRef, forwardRef, useImperativeHandle } from "react";

import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./index.css";

const InvoiceDetail = ({ invoice }, ref) => {
    const tax = 5;

    const totalPrice = invoice.items.reduce(
        (acc, item) => acc + item.dealPrice * item.quantity,
        0
    );
    const totalTax = invoice.items.reduce(
        (acc, item) => acc + (item.dealPrice * item.quantity * tax) / 100,
        0
    );

    const componentRef = useRef();

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const tax = 5;

        doc.setFontSize(18);
        doc.text(`Invoice for ${invoice.storeName}`, 10, 20);
        doc.setFontSize(12);
        doc.text(`Order ID: ${invoice.orderId}`, 10, 30);
        doc.text(`Date: ${invoice.date}`, 10, 40);

        let totalPrice = 0;
        let totalTax = 0;

        const tableData = invoice.items.map((item) => {
            const itemTax = (item.dealPrice * tax) / 100;
            const itemTotal = item.quantity * (item.dealPrice + itemTax);

            totalTax += itemTax * item.quantity;
            totalPrice += item.dealPrice * item.quantity;

            return [
                item.name,
                item.quantity,
                `${"\u20B9"}${item.regularPrice.toFixed(2)}`,
                `${"\u20B9"}${item.dealPrice.toFixed(2)}`,
                `${"\u20B9"}${itemTax.toFixed(2)}`,
                `${"\u20B9"}${itemTotal.toFixed(2)}`,
            ];
        });

        // Use autoTable function correctly
        autoTable(doc, {
            head: [
                [
                    "Product",
                    "Quantity",
                    "Regular Price",
                    "Deal Price",
                    `Tax (${tax}%)`,
                    "Total",
                ],
            ],
            body: tableData,
            startY: 50,
        });

        doc.setFontSize(12);
        doc.setFont("Roboto", "bold");

        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 50;
        doc.text(
            `Subtotal: ${"\u20B9"}${totalPrice.toFixed(2)}`,
            10,
            finalY + 10
        );
        doc.text(
            `Total Tax: ${"\u20B9"}${totalTax.toFixed(2)}`,
            10,
            finalY + 20
        );
        doc.text(
            `Grand Total: ${"\u20B9"}${(totalPrice + totalTax).toFixed(2)}`,
            10,
            finalY + 30
        );

        // Save PDF
        doc.save(`invoice_${invoice.orderId}.pdf`);
    };

    const handlePrint = useReactToPrint({
        content: () => {
            console.log("Printing:", componentRef.current);
            return componentRef.current;
        },
    });

    useImperativeHandle(ref, () => ({
        handlePrint,
    }));
    return (
        <div className="invoice-container" ref={componentRef}>
            <div className="header">
                <div className="store-info">
                    <h1>{invoice.storeName}</h1>
                    <p>{invoice.storeLocation}</p>
                </div>
                <div className="order-info">
                    <div>
                        <strong>Order ID:</strong> {invoice.orderId}
                    </div>
                    <div>
                        <strong>Date:</strong> {invoice.date}
                    </div>
                </div>
            </div>

            <table className="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Regular Price</th>
                        <th>Deal Price</th>
                        <th>Tax ({tax}%)</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.regularPrice.toFixed(2)}</td>
                            <td>₹{item.dealPrice.toFixed(2)}</td>
                            <td>
                                ₹{((item.dealPrice * tax) / 100).toFixed(2)}
                            </td>
                            <td>
                                ₹
                                {(
                                    item.quantity *
                                    (item.dealPrice +
                                        (item.dealPrice * tax) / 100)
                                ).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="totals-section">
                <div className="total-card">
                    <div className="total-line">
                        <span>Subtotal:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="total-line">
                        <span>Total Tax:</span>
                        <span>₹{totalTax.toFixed(2)}</span>
                    </div>
                    <div className="grand-total total-line">
                        <span>Grand Total:</span>
                        <span>₹{(totalPrice + totalTax).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="actions">
                <button className="print-btn" onClick={handlePrint}>
                    Print Invoice
                </button>
                <button className="print-btn" onClick={handleDownloadPDF}>
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default InvoiceDetail;
