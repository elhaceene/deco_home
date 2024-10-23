<script setup lang="ts">
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
const { t } = useI18n();
const cartStore = useCartStore();
const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
  },
});

const category = computed(() => {
  if (props.product.category === "chair") {
    return t("common.chair");
  } else if (props.product.category === "couch") {
    return t("common.couch");
  } else if (props.product.category === "lamp") {
    return t("common.lamp");
  } else if (props.product.category === "table") {
    return t("common.table");
  } else {
    return t("common.bed");
  }
});

const price = computed(() => {
  if (!props.product.sale) {
    return props.product.price;
  }
  const amontToSale = props.product.price * props.product.sale;

  return props.product.price - amontToSale;
});

const total = computed(() => {
  return props.product.price * props.product.quantity;
});

const quantity = ref(props.product.quantity);

watch(quantity, (value) => {
  if (value >= 1) {
    const data = {
      id: props.product.id,
      quantity: value,
    };
    cartStore.updateQuantity(data);
  } else {
    return (quantity.value = 1);
  }
});
</script>

<template>
  <div class="product">
    <div class="name">
      <img :src="product.img" :alt="product.name" width="80" height="80" />
      <div class="details">
        <h6 class="title">
          {{ product.name }}
        </h6>
        <p class="subtitle">
          {{ category }}
        </p>
        <button
          type="button"
          title="Supprimer"
          class="link base"
          @click="cartStore.dropProduct(product.id)"
        >
          {{ $t("common.delete") }}
        </button>
        <h6 class="price">{{ price }} DZD</h6>
      </div>
    </div>
    <div class="quantity">
      <button
        type="button"
        class="btn-square md"
        title="Supprimer"
        @click="cartStore.dropProduct(product.id)"
      >
        <Icon name="heroicons:x-mark" />
      </button>
      <input v-model="quantity" type="number" class="input-primary" />
    </div>

    <h6 class="price">{{ price }} DZD</h6>

    <h6 class="total">{{ total }} DZD</h6>
  </div>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > * {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 128px;

    &.name {
      width: calc(100% - 200px - 180px - 180px);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .title {
          @include text-lg;
          font-weight: 500;
        }

        .subtitle {
          @include text-sm;
          font-weight: 500;
          color: $neutral100;
        }
        .price {
          display: none;
        }
      }
    }

    &.quantity {
      width: 200px;

      input {
        width: 100%;
      }
      .btn-square {
        display: none;
      }
    }
    &.price,
    &.total {
      width: 180px;
      @include text-lg;
      font-weight: 500;
    }
  }

  @media (max-width: $tablet) {
    & > * {
      &.name {
        width: calc(100% - 132px - 146px - 146px);
        &.quantity {
          width: 132px;
        }
        &.price,
        &.total {
          width: 146px;
        }
      }
    }
  }

  @media (max-width: $phone) {
    align-items: flex-start;

    & > * {
      padding: 0;
      height: auto;
      padding: 24px 0;

      &.name {
        width: calc(100% - 80px);
        .subtitle,
        .link {
          display: none;
        }
        .price {
          display: block !important;
          @include text-lg;
          font-weight: 500;
        }
      }

      &.quantity {
        width: 80px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .btn-square {
          display: flex;
        }
      }

      &.price,
      &.total {
        display: none;
      }
    }
  }
}
</style>
