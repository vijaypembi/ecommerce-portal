import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import allProducts from "../products.json";

const StoresProduct = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStore, setSelectedStore] = useState("All Stores");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch data from an API (mock data for now)
    const storeLocations = [
        { id: 0, name: "All Stores" },
        { id: 1, name: "New York" },
        { id: 2, name: "London" },
        { id: 3, name: "Los Angeles" },
        { id: 4, name: "Berlin" },
        { id: 5, name: "Tokyo" },
        { id: 6, name: "San Francisco" },
        { id: 7, name: "Sydney" },
        { id: 8, name: "Toronto" },
        { id: 9, name: "Paris" },
        { id: 10, name: "Mumbai" },
        { id: 11, name: "Dubai" },
        { id: 12, name: "Singapore" },
        { id: 13, name: "Milan" },
        { id: 14, name: "Barcelona" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(allProducts);
            const url = "https://mockapi.io/api/v1/products"; // Replace with your API endpoint

            // Uncomment this for actual API calls
            /*
            axios
                .get(url)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
            */

            // Mock data for testing
        };
        fetchProducts();
    }, []);

    // Filter products based on search and store
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStore =
            selectedStore === "All Stores" || product.store === selectedStore;
        return matchesSearch && matchesStore;
    });

    // Modal handlers
    const openAddModal = () => setIsAddModalOpen(true);
    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };
    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };
    const closeModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    // Form submission handler for Add/Edit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProduct = {
            id: selectedProduct ? selectedProduct.id : Date.now(), // Use existing ID for edit
            name: formData.get("name"),
            store: formData.get("store"),
            regularPrice: parseFloat(formData.get("regularPrice")), // Get regular price
            dealPrice: parseFloat(formData.get("dealPrice")), // Get deal price
            taxRate: parseFloat(formData.get("taxRate")),
        };

        if (selectedProduct) {
            // Edit existing product
            setProducts((prev) =>
                prev.map((p) => (p.id === newProduct.id ? newProduct : p))
            );
        } else {
            // Add new product
            setProducts((prev) => [...prev, newProduct]);
        }
        closeModal();
    };

    // Delete product
    const handleDelete = () => {
        setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
        closeModal();
    };

    return (
        <div className="container">
            {/* Action Bar */}
            <div className="action-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <select
                    className="store-filter"
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                >
                    <option>All Stores</option>
                    <option>New York</option>
                    <option>London</option>
                </select>
                 */}
                <select
                    className="store-filter"
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                >
                    {storeLocations.map((location) => (
                        <option key={location.id} value={location.name}>
                            {location.name}
                        </option>
                    ))}
                </select>

                <button className="btn btn-primary" onClick={openAddModal}>
                    Add Product
                </button>
            </div>

            {/* Products Table */}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Store</th>
                        <th>Regular Price</th>
                        <th>Deal Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.store}</td>
                            <td>₹{product.regularPrice.toFixed(2)}</td>
                            <td>₹{product.dealPrice.toFixed(2)}</td>
                            <td className="action-cell">
                                <button
                                    className="btn-icon edit"
                                    onClick={() => openEditModal(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn-icon delete"
                                    onClick={() => openDeleteModal(product)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add/Edit Modal */}
            {(isAddModalOpen || isEditModalOpen) && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>
                            {selectedProduct
                                ? "Edit Product"
                                : "Add New Product"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="name"
                                    defaultValue={selectedProduct?.name || ""}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Store</label>
                                <select
                                    className="form-input"
                                    name="store"
                                    defaultValue={
                                        selectedProduct?.store || "New York"
                                    }
                                    required
                                >
                                    <option>New York</option>
                                    <option>London</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Regular Price
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="regularPrice"
                                    step="0.01"
                                    defaultValue={
                                        selectedProduct?.regularPrice || ""
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Deal Price</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="dealPrice"
                                    step="0.01"
                                    defaultValue={
                                        selectedProduct?.dealPrice || ""
                                    }
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                {selectedProduct
                                    ? "Update Product"
                                    : "Save Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px",
                            }}
                        >
                            <button className="btn" onClick={closeModal}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ background: "var(--danger-color)" }}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoresProduct;
