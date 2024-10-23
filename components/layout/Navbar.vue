<script setup lang="ts">
const localePath = useLocalePath();
const showLanguages = ref(false);
const { locale } = useI18n();
const flag = computed(() => {
  if (locale.value === "en") {
    return "flag:us-4x3";
  } else if (locale.value === "ar") {
    return "flag:dz-4x3";
  }

  return "flag:fr-4x3";
});

const cartStore = useCartStore();

const cartQuantity = computed(() => {
  return cartStore.cart.reduce((total, Product) => total + Product.quantity, 0);
});
</script>

<template>
  <nav class="navbar">
    <nuxt-link :to="localePath('/')" :title="$t('common.home')">
      <img src="/public/logo.svg" alt="Logo Decohome" width="172" height="32" />
    </nuxt-link>

    <div class="links">
      <nuxt-link
        :to="localePath('/')"
        :title="$t('common.home')"
        class="link base"
        >{{ $t("common.home") }}</nuxt-link
      >
      <nuxt-link
        :to="localePath('/faq')"
        :title="$t('common.faq')"
        class="link base"
        >{{ $t("common.faq") }}</nuxt-link
      >
    </div>

    <div class="actions">
      <div class="languages-wraper">
        <button
          type="button"
          :title="$t('common.lang')"
          class="btn-square md"
          @click="showLanguages = !showLanguages"
        >
          <icon :name="flag" />
        </button>

        <LayoutLanguagesDropdown v-if="showLanguages" />
      </div>

      <NuxtLink
        :to="localePath('/cart')"
        :title="$t('common.cart')"
        class="btn-square md"
      >
        <Icon name="heroicons:shopping-bag" />
        <span class="counter">
          {{ cartQuantity }}
        </span>
      </NuxtLink>
      <button
        type="button"
        :title="$t('common.menu')"
        class="btn-square md burger-menu"
        @click="$emit('open-mobile-menu')"
      >
        <icon name="heroicons:bars-3" />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 80px;
  background-color: white;
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  @media (max-width: $phone) {
    padding: 0 16px;
  }

  .links,
  .actions {
    display: flex;
    align-items: center;
  }
  .links {
    justify-content: center;
    gap: 32px;
    @media (max-width: $phone) {
      display: none;
    }
  }
  .actions {
    justify-content: flex-end;
    gap: 8px;
  }
  .burger-menu {
    @media (min-width: $phone) {
      display: none;
    }
  }
  .languages-wraper {
    position: relative;
  }
}
</style>
