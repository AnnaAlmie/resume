<script setup lang="ts">
const showButton = ref(false);

const userScroll = () => {
  if (window.scrollY > 500) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};
const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", userScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", userScroll);
});
</script>

<template>
  <Transition name="btn-up">
    <button
      v-if="showButton"
      class="btn-up flex-center"
      type="button"
      @click="scrollTop"
    >
      <nuxt-icon name="arrow-up-broken" filled />
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.btn-up-enter-active,
.btn-up-leave-active {
  transition:
    opacity $transition-time ease,
    transform $transition-time ease;
}

.btn-up-enter-from,
.btn-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.btn-up {
  border: 0;
  border-radius: 999px;
  color: var(--text-accent);
  background: var(--accent-1);
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  width: 40px;
  height: 40px;
  transition: all $transition-time ease;
  @include hover {
    &:hover {
      background: var(--accent-2);
      color: var(--text-invert);
    }
  }
}
</style>
