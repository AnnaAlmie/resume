<script setup lang="ts">
// const { theme, toggleTheme } = useTheme();
const theme = ref("dark");
const changeTheme = () => {
  // toggleTheme();
};
</script>

<template>
  <ClientOnly>
    <button class="theme-toggle flex-center" type="button" @click="changeTheme">
      <nuxt-icon v-if="theme === 'light'" name="night" filled />
      <nuxt-icon v-else name="day" filled />
    </button>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.theme-toggle {
  border: 0;
  border-radius: 999px;
  background: var(--accent-1);
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  width: 40px;
  height: 40px;
}
</style>
