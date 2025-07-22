import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validation/listing.schema";
import FileInput from "../../component/form/FileInput";
import TextInput from "../../component/form/TextInput";
import TextareaInput from "../../component/form/TextArea";

const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const watchedFiles = watch("image");

  useEffect(() => {
    if (watchedFiles && watchedFiles.length > 0) {
      const fileArray = Array.from(watchedFiles);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);

      // Cleanup memory when component unmounts or files change
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [watchedFiles]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("priceEth", data.priceEth.toString());

    Array.from(data.image).forEach((file) =>
      formData.append("images", file as Blob)
    );

    console.log("Form submitted!", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-md p-6 rounded"
      >
        {/* Image Upload */}
        <div>
          <FileInput
            name="image"
            label="Product Images (min. 4)"
            register={register}
            multiple
            errors={errors}
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <TextInput
          name="title"
          label="Product Title"
          register={register}
          errors={errors}
        />

        {/* Description */}
        <TextareaInput
          name="description"
          label="Product Description"
          register={register}
          errors={errors}
        />

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price (ETH)</label>
          <input
            type="number"
            step="0.001"
            {...register("priceEth")}
            className="w-full p-3 border rounded"
            placeholder="0.03"
          />
          {errors.priceEth && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.priceEth?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
