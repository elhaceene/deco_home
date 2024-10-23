<script setup lang="ts">
definePageMeta({
  middleware: ["cart-is-filled"],
});
</script>

<template>
  <div>
    <PagesOrderWrapper />
  </div>
</template>

<style scoped></style>
