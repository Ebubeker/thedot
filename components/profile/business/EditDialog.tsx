import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Product, updateProduct } from "@/assets/api/product";
import { useAuth } from "@/hooks/useAuth";
import { useGetProducts } from "@/assets/api/product";
import { deleteProduct } from "@/assets/api/product";
import { toast } from "react-toastify";

const EditDialog = ({ productID }: { productID: string }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const { products, refetch } = useGetProducts(user?.uid ? user.uid : "");

  const currentProduct = products.find((product) => product.id === productID);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      pesticideRate: "",
      productionDuration: "",
      type: "",
      address: "",
      available: "",
      price: "",
      measurementType: "kg",
    },
  });

  const onSubmit = (data) => {
    const dataToSubmit = {
      name: data.name,
      description: data.description,
      information: {
        pesticide: data.pesticideRate,
        "kohzgjatja e prodhimit": data.productionDuration,
        type: data.type,
      },
      addressa: data.address,
      available: data.available.toLowerCase() === "yes" ? true : false,
      price: parseFloat(data.price),
      businessId: user?.uid ? user.uid : "",
    };

    updateProduct(productID, dataToSubmit).then(() => {
      setOpen(false);
      refetch();
    });
  };

  useEffect(() => {
    if (currentProduct) {
      setValue("name", currentProduct.name);
      setValue("description", currentProduct.description);
      setValue("pesticideRate", currentProduct.information.pesticide);
      setValue(
        "productionDuration",
        currentProduct.information["kohzgjatja e prodhimit"]
      );
      setValue("type", currentProduct.information.type);
      setValue("address", currentProduct.addressa);
      setValue("available", currentProduct.available ? "yes" : "no");
      setValue("price", currentProduct.price.toString());
    }
  }, [currentProduct]);

  const handleMeasurementChange = (value) => {
    setValue("measurementType", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black text-white px-2 md:px-4 py-1 md:py-2 rounded-lg cursor-pointer hover:bg-black/80 ease">
        Edit
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="text-xl font-bold">
          Edit Product Details
        </DialogHeader>
        <DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Name *"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Description *"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Input
              type="text"
              placeholder="Pesticide Rate"
              {...register("pesticideRate")}
            />

            <Input
              type="text"
              placeholder="Production duration"
              {...register("productionDuration")}
            />

            <Input type="text" placeholder="Type" {...register("type")} />

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Address *"
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Available *"
                {...register("available", {
                  required: "Available quantity is required",
                })}
              />
              {errors.available && (
                <p className="text-red-500 text-sm">
                  {errors.available.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Price *"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Select onValueChange={handleMeasurementChange} defaultValue="kg">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select measurement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="pp">per piece</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Edit Product</Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
