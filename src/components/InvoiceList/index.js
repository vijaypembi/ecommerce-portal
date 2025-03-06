import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import InvoiceDetail from "../InvoiceDetail";
import data from "../data.json";
const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setInvoices(data);

        const url = "https://mockapi.io/api/v1/invoices";

        // axios
        //     .get(url)
        //     .then((response) => {
        //         setInvoices(response.data);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //         setLoading(false);
        //     });
    }, []);
    const componentRef = useRef();

    const handlePrint = () => {
        if (componentRef.current) {
            componentRef.current.handlePrint();
        }
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Invoice List</h1>
            {invoices.length > 0 ? (
                invoices.map((invoice) => (
                    <InvoiceDetail
                        key={invoice.id}
                        invoice={invoice}
                        ref={componentRef}
                    />
                ))
            ) : (
                <p>No invoices available.</p>
            )}
        </div>
    );
};

export default InvoiceList;
