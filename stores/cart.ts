import { defineStore } from "pinia";
import Product from "~/components/pages/product.vue";
import Index from "~/pages/index.vue";

export const useCartStore = defineStore("cart", () => {
  interface Product {
    id: number;
    price: number;
    quantity: number;
  }
  const cart = ref<Product[]>([]);
  function addProduct(data: Product) {
    const index = cart.value.findIndex((product) => product.id === data.id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
    cart.value.push(data);
  }

  function updateQuantity(data: { id: number; quantity: number }) {
    const product = cart.value.find((item) => item.id === data.id);

    if (product) {
      product.quantity = data.quantity;
    }
  }

  function dropProduct(id: number) {
    const index = cart.value.findIndex((product) => product.id === id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  }

  function resetCart() {
    cart.value = [];
  }

  return {
    cart,
    addProduct,
    updateQuantity,
    dropProduct,
    resetCart,
  };
});
