<script setup lang="ts">
import Dside from "./Dside.vue";
</script>

<template>
  <section>
    <h3>Experience</h3>
    <div class="experience-list">
      <NowLoking />
      <NetGame />
      <CoolTool />
      <FreshAgency />
      <WebStolica />
      <FabricMood />
      <Dside />
      <BMSsoft />
    </div>
  </section>
</template>

<style lang="scss" scoped>
$padding: 30px;
$space: 6px;
.experience-list {
  padding-left: $padding;
  .block {
    position: relative;
    &:not(:last-child) {
      padding: 0 0 $spacing-l 0;
    }
    &::before {
      content: "";
      position: absolute;
      left: calc(-1 * ($padding - 1px));
      top: calc($space + 2px);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--accent-2);
      border: 2px solid transparent;
      outline: solid 1px var(--accent-2);
      outline-offset: 1px;
      transition: outline-offset $transition-time ease;
    }
    &.is-open::before {
      outline-offset: 5px;
    }
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      left: calc(-#{$padding} + #{$space} / 2);
      top: calc($space + 13px);
      width: 1px;
      height: calc(100% - $space * 3);
      border-left: 1px solid var(--accent-1);
    }
    &:first-child::after {
      border-left-style: dashed;
    }
  }
}
</style>
