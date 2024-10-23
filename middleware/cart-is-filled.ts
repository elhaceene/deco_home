export default defineNuxtRouteMiddleware((to) => {
  const cartStore = useCartStore();

  if (cartStore.cart.length === 0) {
    if (to.path !== "/cart") {
      return navigateTo("/cart");
    }
  }
});
