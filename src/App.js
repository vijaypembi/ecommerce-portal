import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceList from "./components/InvoiceList";
import StoresProduct from "./components/StoresProduct";
import Headers from "./components/Headers";

const App = () => {
    return (
        <Router>
            <Headers />
            <Routes>
                <Route path="/" element={<InvoiceList />} />
                <Route path="/stores" element={<StoresProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
