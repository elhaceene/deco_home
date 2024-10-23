<script setup lang="ts">
import { Title } from "#build/components";

import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

const toast = useToast();
const { t } = useI18n();
const formData = ref({
  email: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
  };
});

const v$ = useVuelidate(rules, formData);

async function register() {
  if (v$.value.$invalid) {
    return;
  }

  try {
    await $fetch("/api/add-email", {
      method: "POST",
      body: { email: formData.value.email },
    });

    toast.add({
      id: "email_added",
      title: t("common.Welcome"),
      description: t("common.emailAddedSuccessFully"),
      timeout: 5000,
    });

    formData.value.email = "";
  } catch (error) {
    toast.add({
      id: "error",
      title: t("common.error"),
      description: t("common.tryAgain"),
      timeout: 5000,
    });
  }
}
</script>

<template>
  <div class="newsletter container">
    <div class="bg"></div>
    <div class="body">
      <h6 class="title">{{ $t("common.newsLetterTitle") }}</h6>
      <p class="subtitle">{{ $t("common.newsLetterSubtitle") }}</p>
    </div>

    <div class="actions">
      <input
        v-model="formData.email"
        type="email"
        :placeholder="$t('common.email')"
        class="input-newsletter"
        @change="v$.email.touch()"
      />

      <button
        type="button"
        class="btn-newsletter"
        :title="$t('common.subscribe')"
        :disabled="v$.$invalid"
        @click="register"
      >
        {{ $t("common.subscribe") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.newsletter {
  height: 380px;
  margin-bottom: 120px;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  padding: 0 60px;

  background-image: url("/public/join\ newsletter.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;

  position: relative;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: black;
    opacity: 0.36;
    border-radius: 20px;
  }

  .body,
  .actions {
    max-width: 820px;
    position: relative;
    z-index: 2;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: white;
    .title {
      @include heading3;
      font-weight: 500;
    }
    .subtitle {
      font-weight: 500;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    .input-newsletter {
      width: 300px;
    }
  }

  @media (max-width: $phone) {
    margin-bottom: 100px;
    padding: 44px 24px;

    .actions {
      width: 100%;
      flex-direction: column;

      .input-newsletter,
      .btn-newsletter {
        width: 100%;
      }
    }
  }
}
</style>
