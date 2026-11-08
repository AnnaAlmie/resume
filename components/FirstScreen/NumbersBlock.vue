<script setup lang="ts">
const blocks = ref([
  { icon: "vue", num: "6+", text: "years*" },
  { icon: "nuxt", num: "4+", text: "years*" },
  { icon: "typescript", num: "4+", text: "years*" },
  { icon: "website", num: "40+", text: "projects", class: "icon-color" },
]);
</script>
<template>
  <div class="numbers-block">
    <div class="blocks glass-effect glow">
      <div
        v-for="(block, index) in blocks"
        :key="index"
        :class="['block', block.class]"
      >
        <nuxt-icon :name="block.icon" filled />
        <div>
          <span class="num">{{ block.num }}</span>
          <span>{{ block.text }}</span>
        </div>
      </div>
    </div>
    <small>* of commercial experience</small>
  </div>
</template>

<style lang="scss" scoped>
.numbers-block {
  position: relative;
  z-index: 12;
  margin-top: -38px;
}
.blocks {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: $spacing-x;
  border-radius: $border-radius;
  @include tablet {
    grid-template-columns: repeat(4, minmax(160px, 1fr));
  }

  @include mobile {
    font-size: 10px;
  }
  & > div {
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-s;
    transition: all 1.5s ease-in-out;
    .nuxt-icon {
      font-size: 2em;
      [data-theme="light"] & {
        filter: grayscale(1);
      }
    }
    span {
      display: block;
      color: $light-400;
      font-size: 0.9em;
      &.num {
        color: var(--text-accent);
        font-size: 2em;
        font-weight: 500;
        line-height: 1;
      }
    }
  }
}

small {
  display: block;
  margin-top: $spacing-xs;
  color: var(--text-lighter);
  text-align: right;
  font-size: 0.6em;
}

.columns {
  @include desktop {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: $spacing-l;
  }
}
</style>
<style>
:root[data-theme="dark"] .icon-color .nuxt-icon path:not(:last-child) {
  fill: var(--text);
}
</style>
