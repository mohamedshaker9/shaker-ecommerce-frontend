import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../../api';


export default function ImageUploadForm({ setIsImageModalOpen, selectedProduct, imageUploadHandler}) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image to upload.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
           
            const response = await api.put(
                `/admin/products/${selectedProduct.id}/image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("Image upload response:", response.data);
            toast.success('Image uploaded successfully');
            setImage(null);
            setPreview(null);
            setIsLoading(false);
            setIsImageModalOpen(false);
        } catch (err) {
            toast.error(err?.message || 'Upload failed');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="w-full max-w-md mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Upload Product Image</h2>

                    {!preview ? (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2" />
                                <p className="text-sm text-gray-600">Click to upload image</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                            >
                                <RxCross1 className="text-lg" />
                            </button>
                        </div>
                    )}

                    {image && (
                        <p className="mt-4 text-sm text-gray-600">
                            Selected: <span className="font-medium">{image.name}</span>
                        </p>
                    )}
                </div>
            </div>
            {image && (
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Upload Image
                </button>
            )}
        </form>
    );
}