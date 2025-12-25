import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

export default function ImageUploadForm({ onImageUpload }) {
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, file]);
                setPreview(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreview(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onImageUpload) {
            onImageUpload(images);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <label className="block cursor-pointer">
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                        Click to upload
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>

            {preview.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Preview</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {preview.map((img, index) => (
                            <div key={index} className="relative group">
                                <img src={img} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    <RxCross1 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {images.length > 0 && (
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Upload {images.length} Image{images.length !== 1 ? 's' : ''}
                </button>
            )}
        </form>
    );
}