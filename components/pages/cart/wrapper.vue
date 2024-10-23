<script setup lang="ts">
import productsData from "public/data/products.json";

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

const cartStore = useCartStore();
const localePath = useLocalePath();

const productWithQuantities = computed(() => {
  return cartStore.cart
    .map((cartItem) => {
      const product = productsData.find((item) => item.id === cartItem.id);

      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter((cartItem): cartItem is Product => cartItem !== undefined);
});

const total = computed(() => {
  return cartStore.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});
</script>

<template>
  <div v-if="cartStore.cart.length > 0" class="cart container">
    <h1 class="title">
      {{ $t("common.cart") }}
    </h1>

    <div class="table">
      <div class="table-header">
        <span class="name">{{ $t("common.product") }}</span>
        <span class="quantity">{{ $t("common.quantity") }}</span>
        <span class="Price">{{ $t("common.price") }}</span>
        <span class="total">{{ $t("common.total") }}</span>
      </div>
      <div class="table-body">
        <PagesCartProduct
          v-for="(product, i) in productWithQuantities"
          :key="i"
          :product="product"
        />
      </div>
    </div>

    <div class="actions">
      <nuxt-link
        :to="localePath('/order')"
        class="btn-primary"
        :title="$t('common.checkout')"
      >
        {{ $t("common.checkout") }} {{ total }} DZD
      </nuxt-link>
    </div>
  </div>

  <div v-if="cartStore.cart.length === 0" class="empty-cart container">
    <img src="/empty_cart.svg" width="468" height="391" alt="Empty cart" />

    <h3 class="title">{{ $t("common.yourCartIsEmpty") }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 60px;

  .title {
    @include heading3;
    font-weight: 500;
  }
  margin-top: 60px;
  margin-bottom: 120px;

  @media (max-width: $phone) {
    margin-top: 40px;
    margin-bottom: 100px;
  }

  img {
    width: 100%;
    max-width: 468px;
    height: auto;
  }
}

.cart {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 60px;
  margin-bottom: 120px;

  @media (max-width: $phone) {
    gap: 40px;
    margin-top: 40px;
    margin-bottom: 100px;
  }

  .title {
    @include heading3;
    font-weight: 500;
    text-align: center;
  }

  .table {
    display: flex;
    flex-direction: column;

    & > * {
      border-bottom: 1px solid $neutral40;
    }

    .table-header {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      @media (max-width: $phone) {
        display: none;
      }

      & > * {
        height: 40px;
        padding: 16px;
        @include text-sm;
        font-weight: 500;

        &.name {
          width: calc(100% - 200px - 180px - 180px);
        }

        &.quantity {
          width: 200px;
        }

        &.Price,
        &.total {
          width: 180px;
        }

        @media (max-width: $tablet) {
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
    }
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      width: 50%;

      @media (max-width: $tablet) {
        width: 100%;
      }
    }
  }
}
</style>
