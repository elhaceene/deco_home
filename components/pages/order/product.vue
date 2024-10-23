<script setup lang="ts">
import Product from "../product.vue";

interface Product {
  id: number;
  category: string;
  description: string;
  name: string;
  price: number;
  img: string;
  sale?: number;
  quantity: number;
}

const carteStore = useCartStore();

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
  },
});

const price = computed(() => {
  if (!props.product.sale) {
    return props.product.price;
  }
  const amontToSale = props.product.price * props.product.sale;

  return props.product.price - amontToSale;
});
const quantity = ref(props.product.quantity);

watch(quantity, (value) => {
  if (value >= 1) {
    const data = {
      id: props.product.id,
      quantity: value,
    };
    carteStore.updateQuantity(data);
  } else {
    return (quantity.value = 1);
  }
});

function deleteProduct() {
  carteStore.dropProduct(props.product.id);

  if (carteStore.cart.length === 0) {
    location.reload();
  }
}
</script>

<template>
  <div class="product">
    <img
      class="product-img"
      :src="product.img"
      :alt="product.name"
      width="140"
      height="140"
    />

    <div class="body">
      <h6 class="name">{{ product.name }}</h6>
      <h6 class="price">{{ price }} DZD</h6>
      <button
        type="button"
        title="Supprimer"
        class="link base"
        @click="deleteProduct"
      >
        {{ $t("common.delete") }}
      </button>

      <input v-model="quantity" type="number" class="input-primary" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid $neutral40;

  .product-img {
    border-radius: 10px;
  }

  .body {
    width: calc(100% - 140px - 16px);
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      width: 80px;
    }
    .name,
    .price {
      @include text-lg;
      font-weight: 500;
    }
  }
}
</style>
