import { Product } from "@/assets/api/product";

import Image from "next/image";
import { useGetUserWithID } from "@/assets/api/user";
import { Button } from "../ui/button";
import ProdImage from "@/assets/images/prod.jpg";
import { addRequest } from "@/assets/api/kerkese";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const ProductItem = ({
  item,
}: {
  item: Product & {
    id: string;
  };
}) => {
  const { userInfo: userInfoAuth } = useAuth();
  const { userInfo } = useGetUserWithID(item.businessId);

  const userRequest = () => {
    if(userInfoAuth?.id){
      addRequest({
        buyerId: userInfoAuth.id,
        sellerId: item.businessId,
        productIdRequested: item.id,
        status: 'pending'
      })
    }
  };

  return (
    <div>
      <Link href={`/en/product/${item.id}`} className="relative group">
        <Image
          src={ProdImage}
          alt={item.name}
          width={400}
          height={400}
          className="w-full h-60 object-cover rounded-md"
        />
        <div className="w-full h-60 bg-black hidden group-hover:flex absolute top-0 left-0 bg-black/50 transition transition delay-150 duration-300 ease-in-out cursor-pointer justify-center items-center">
          <Button
            variant="outline"
            className="text-white bg-transparent cursor-pointer"
            onClick={userRequest}
          >
            Kërkesë për të blerë
          </Button>
        </div>
      </Link>
      <div className="py-4">
        <h3 className="text-lg font-medium">
          <p className="text-[11px] text-gray-500 italic">
            {userInfo?.companyName}
          </p>
          {formatTitle(item.name)}
        </h3>
        <p className="text-muted-foreground">ALL {item.price}/kg</p>
      </div>
    </div>
  );
};

function formatTitle(title: string) {
  return title.split(" ").map((word, idx) =>
    word === word.toLowerCase() && /[A-Z]/.test(word[0]) === false ? (
      <span key={idx} className="italic">
        {word}{" "}
      </span>
    ) : (
      word + " "
    )
  );
}

export default ProductItem;
