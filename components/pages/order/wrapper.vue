<script setup lang="ts">
import productsData from "public/data/products.json";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, maxLength } from "@vuelidate/validators";
const cartStore = useCartStore();

const toast = useToast();
const { t } = useI18n();

const formData = ref({
  fullname: "",
  email: "",
  phone: "",
  city: "Alger",
  address: "",
});

const successCheckout = ref(false);

const rules = computed(() => {
  return {
    fullname: { required, minLength: minLength(3) },
    email: { required, email },
    phone: { required, minLenght: minLength(10), maxLenghth: maxLength(10) },
    city: { required },
    address: { required, minLength: minLength(3) },
  };
});

const v$ = useVuelidate(rules, formData);

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

const cities = computed(() => {
  return [
    { value: "Adrar", label: "01 - Adrar" },
    { value: "Chlef", label: "02 - Chlef" },
    { value: "Laghouat", label: "03 - Laghouat" },
    { value: "Oum El Bouaghi", label: "04 - Oum El Bouaghi" },
    { value: "Batna", label: "05 - Batna" },
    { value: "Béjaïa", label: "06 - Béjaïa" },
    { value: "Biskra", label: "07 - Biskra" },
    { value: "Bouira", label: "08 - Bouira" },
    { value: "Blida", label: "09 - Blida" },
    { value: "Boumerdès", label: "10 - Boumerdès" },
    { value: "Tamanrasset", label: "11 - Tamanrasset" },
    { value: "Tebessa", label: "12 - Tebessa" },
    { value: "Tlemcen", label: "13 - Tlemcen" },
    { value: "Tiaret", label: "14 - Tiaret" },
    { value: "Tizi Ouzou", label: "15 - Tizi Ouzou" },
    { value: "Alger", label: "16 - Alger" },
    { value: "Djelfa", label: "17 - Djelfa" },
    { value: "Jijel", label: "18 - Jijel" },
    { value: "Sétif", label: "19 - Sétif" },
    { value: "Saida", label: "20 - Saida" },
    { value: "Skikda", label: "21 - Skikda" },
    { value: "Sidi Bel Abbès", label: "22 - Sidi Bel Abbès" },
    { value: "Annaba", label: "23 - Annaba" },
    { value: "Guelma", label: "24 - Guelma" },
    { value: "Constantine", label: "25 - Constantine" },
    { value: "Médéa", label: "26 - Médéa" },
    { value: "Mostaganem", label: "27 - Mostaganem" },
    { value: "Msila", label: "28 - Msila" },
    { value: "Relizane", label: "29 - Relizane" },
    { value: "El Oued", label: "30 - El Oued" },
    { value: "Oran", label: "31 - Oran" },
    { value: "El Bayadh", label: "32 - El Bayadh" },
    { value: "Illizi", label: "33 - Illizi" },
    { value: "Bordj Bou Arréridj", label: "34 - Bordj Bou Arréridj" },
    { value: "Boumerdès", label: "35 - Boumerdès" },
    { value: "Tarf", label: "36 - El Tarf" },
    { value: "Tindouf", label: "37 - Tindouf" },
    { value: "Tissemsilt", label: "38 - Tissemsilt" },
    { value: "El Tarf", label: "39 - El Tarf" },
    { value: "Khenchela", label: "40 - Khenchela" },
    { value: "Tipaza", label: "42 - Tipaza" },
    { value: "Mila", label: "43 - Mila" },
    { value: "Aïn Defla", label: "44 - Aïn Defla" },
    { value: "Naama", label: "45 - Naama" },
    { value: "Aïn Témouchent", label: "46 - Aïn Témouchent" },
    { value: "Ghardaïa", label: "47 - Ghardaïa" },
    { value: "Relizane", label: "48 - Relizane" },
    { value: "El M'Ghair", label: "49 - El M'Ghair" },
    { value: "El Menia", label: "50 - El Menia" },
    { value: "Nâama", label: "51 - Nâama" },
    { value: "Bordj Bou Arréridj", label: "52 - Bordj Bou Arréridj" },
    { value: "Aïn Sefra", label: "53 - Aïn Sefra" },
    { value: "In Salah", label: "54 - In Salah" },
    { value: "Timimoun", label: "55 - Timimoun" },
    { value: "Adrar", label: "56 - Adrar" },
    { value: "El Menia", label: "57 - El Menia" },
    { value: "Bordj Bou Arréridj", label: "58 - Bordj Bou Arréridj" },
  ];
});

const total = computed(() => {
  return cartStore.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});
async function order() {
  if (v$.value.$invalid) {
    return;
  }

  try {
    const order = {
      fullname: formData.value.fullname,
      email: formData.value.email,
      phone: formData.value.phone,
      city: formData.value.city,
      address: formData.value.address,
      total: total.value,
      products: cartStore.cart,
    };
    await $fetch("/api/add-order", {
      method: "POST",
      body: order,
    });

    toast.add({
      id: "email_added",
      title: t("common.Welcome"),
      description: t("common.emailAddedSuccessFully"),
      timeout: 5000,
    });
    cartStore.resetCart();
    successCheckout.value = true;
  } catch (error) {
    toast.add({
      id: "error",
      title: t("common.error"),
      description: t("common.tryAgain"),
      timeout: 5000,
    });

    successCheckout.value = false;
  }
}
</script>

<template>
  <div v-if="successCheckout" class="order-success container">
    <img
      src="/public/checkout_success.svg"
      width="468"
      height="409"
      alt="Success order"
    />
    <div class="body">
      <h3 class="title">{{ $t("common.orderReceived") }}</h3>
      <p class="subtitle">
        {{ $t("common.orderReceivedSubtitle") }}
      </p>
    </div>
  </div>

  <div v-else class="order container">
    <div class="cart">
      <h6 class="title">{{ $t("common.yourOrder") }}</h6>

      <div class="wrapper">
        <PagesOrderProduct
          v-for="(product, i) in productWithQuantities"
          :key="i"
          :product="product"
        />

        <h6 class="price">{{ $t("common.total") }}: {{ total }} DZD</h6>
      </div>
    </div>

    <form class="form">
      <h6 class="title">{{ $t("common.yourInformations") }}</h6>

      <div class="wrapper">
        <div class="input">
          <label for="fullname"> {{ $t("common.fullName") }} </label>
          <input
            id="fullname"
            v-model="formData.fullname"
            type="text"
            class="input-primary"
            placeholder="john doe"
            @change="v$.fullname.touch()"
          />
        </div>
        <div class="input">
          <label for="email"> Email </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="input-primary"
            placeholder="votre@email.com"
            @change="v$.email.touch()"
          />
        </div>
        <div class="input">
          <label for="phone">{{ $t("common.phone") }}</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            class="input-primary"
            :placeholder="$t('common.phonePlaceHolder')"
            maxlength="10"
            @change="v$.phone.touch()"
          />
        </div>
        <div class="input">
          <label for="city"> {{ $t("common.city") }} </label>
          <select
            name="city"
            id="city"
            v-model="formData.city"
            class="input-primary"
            :placeholder="$t('common.cityPlaceHolder')"
            @change="v$.city.touch()"
          >
            <option v-for="(city, i) in cities" :key="i" :value="city.value">
              {{ city.label }}
            </option>
          </select>
        </div>
        <div class="input">
          <label for="adress">{{ $t("common.address") }}</label>
          <input
            id="adress"
            v-model="formData.address"
            type="text"
            class="input-primary"
            :placeholder="$t('common.adressPlaceHolder')"
            @change="v$.address.touch()"
          />
        </div>
      </div>

      <button
        type="button"
        class="btn-primary"
        :title="$t('common.order')"
        :disabled="v$.$invalid"
        @click="order"
      >
        {{ $t("common.order") }} {{ total }} DZD
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.order-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 60px;

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    .title {
      @include heading3;
      font-weight: 500;
    }

    .subtitle {
      color: $neutral200;
    }
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

.order {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;

  margin-top: 60px;
  margin-bottom: 120px;
  @media (max-width: $phone) {
    margin-top: 40px;
    margin-bottom: 100px;
  }

  & > * {
    display: flex;
    flex-direction: column;
    gap: 40px;

    & > .title {
      @include heading3;
      font-weight: 500;
    }
  }

  .cart {
    width: calc(100% - 480px - 40px);

    .wrapper {
      display: flex;
      flex-direction: column;
    }
    .price {
      @include heading5;
      font-weight: 600;
      margin-top: 40px;
    }
  }
  .form {
    width: 480px;

    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    button {
      width: 100%;
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .cart,
    .form {
      width: 100%;
    }
  }
}
</style>
