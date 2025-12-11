"use client";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function ProductUploadPage() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        category: "",
        rate: "",
        stock: "",
        description: "",
        imageurl: "",
        activecomponents: "",
        ingredients: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/productUpload",
                formData, // send as-is (strings, not arrays)
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (res.data.success) {
                toast.success("Product uploaded successfully!");

                // Reset form after successful submission
                setFormData({
                    email: "",
                    name: "",
                    category: "",
                    rate: "",
                    stock: "",
                    description: "",
                    imageurl: "",
                    activecomponents: "",
                    ingredients: ""
                });
            }
        } catch (err) {
            console.error("Upload error:", err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Upload failed. Check console.");
            }
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md mt-6">
            {/* Toast notifications */}
            <Toaster position="top-right" reverseOrder={false} />

            <h1 className="text-2xl font-semibold mb-4">Upload Product</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your admin email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="rate"
                    placeholder="Rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                ></textarea>

                <input
                    type="text"
                    name="imageurl"
                    placeholder="Image URL"
                    value={formData.imageurl}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="activecomponents"
                    placeholder="Active Components (comma separated)"
                    value={formData.activecomponents}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients (comma separated)"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Upload Product
                </button>
            </form>
        </div>
    );
}
