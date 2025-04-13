import React from "react";
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
import { Product, addProduct, deleteProduct } from "@/assets/api/product";
import { useAuth } from "@/hooks/useAuth";
import { useGetProducts } from "@/assets/api/product";
import EditDialog from "./EditDialog";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [open, setOpen] = React.useState(false);
  const { user, userInfo } = useAuth();
  const { products, refetch } = useGetProducts(userInfo?.id ? userInfo.id : "");

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
      businessId: userInfo?.id ? userInfo.id : "",
    };

    addProduct(dataToSubmit).then(() => {
      setOpen(false);
      reset();
      refetch();
    });
  };

  const handleMeasurementChange = (value) => {
    setValue("measurementType", value);
  };

  const deleteProductByID = (id: string) => {
    deleteProduct(id).then(()=>{
      toast("Product deleted", {
        type: "error"
      })
      refetch()
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold my-6">Manage Product</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-black text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer hover:bg-black/80 ease">
            + Add Product
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader className="text-xl font-bold">
              Add Product
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
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Select
                    onValueChange={handleMeasurementChange}
                    defaultValue="kg"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select measurement type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="pp">per piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit">Add Product</Button>
              </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-semibold mb-2">
          <p className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6">Name</p>
          <p className="w-1/6 max-lg:hidden">Description</p>
          <p className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6">Price</p>
          <p className="w-1/4 md:w-1/5 lg:w-1/6 max-sm:hidden">Available</p>
          <p className="w-1/5 lg:w-1/6 max-md:hidden">Address</p>
          <p className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 flex justify-end">Actions</p>
        </div>
        {products
          ? products.map((product) => (
              <div className="flex justify-between items-center mb-2" key={product.id}>
                <p className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 truncate">{product.name}</p>
                <p className="w-1/6 max-lg:hidden truncate">{product.description}</p>
                <p className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6">{product.price} lek/kg</p>
                <p className="w-1/4 md:w-1/5 lg:w-1/6  max-sm:hidden">
                  {product.available ? "Available" : "Not available"}
                </p>
                <p className="w-1/5 lg:w-1/6 max-md:hidden truncate">{product.addressa}</p>
                <div className="w-1/3 md:w-1/4 md:w-1/5 lg:w-1/6 truncate flex justify-end gap-1 sm:gap-4">
                  {/* <Button>Edit</Button> */}
                  <EditDialog productID={product.id}/>
                  <Button onClick={()=>deleteProductByID(product.id)} className="py-2.5 md:py-5 max-md:px-2 bg-red-500 hover:bg-red-600 cursor-pointer">Delete</Button>
                </div>
              </div>
            ))
          : "Loading Products..."}
      </div>
    </div>
  );
};

export default ManageProducts;
