import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { memo, useContext } from "react";

interface CardItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CardItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };
  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 ">
        {/* IMAGEM E INFO */}
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1 ">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-xs font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center  text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={16}
                onClick={handleDecreaseQuantityClick}
              />
            </Button>
            <span className="block w-8 text-xs">{cartProduct.quantity}</span>
            <Button size="icon" className="h-7 w-7">
              <ChevronRightIcon
                size={16}
                onClick={handleIncreaseQuantityClick}
              />
            </Button>
          </div>
        </div>
      </div>
      {/* BOTÃO DE DELETAR */}
      <Button
        className="border-muted-foreground1 h-7 w-7 border border-solid"
        variant={"ghost"}
        size="icon"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prevProps, nextProps) => {
  return (
    prevProps.cartProduct.id === nextProps.cartProduct.id &&
    prevProps.cartProduct.quantity === nextProps.cartProduct.quantity
  );
});
