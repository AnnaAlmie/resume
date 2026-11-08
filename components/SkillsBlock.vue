<script setup lang="ts">
import { skills } from "~/data/skills";

const showAll = ref(false);

const visibleSkills = computed(() =>
  showAll.value ? skills : skills.filter((skill) => !skill.hidden),
);
</script>

<template>
  <h3>Skills</h3>
  <div class="chip-list">
    <TransitionGroup name="skills" appear>
      <span
        v-for="skill in visibleSkills"
        :key="skill.name"
        :class="[{ main: skill.featured }, 'glass-effect']"
      >
        {{ skill.name }}
      </span>
    </TransitionGroup>
    <button
      class="btn glass-effect glow"
      type="button"
      @click="showAll = !showAll"
    >
      {{ showAll ? "Show Less" : "Show All" }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-x;
  span,
  .btn {
    padding: $spacing-x $spacing-s;
    border-radius: $border-radius;
    color: var(--text);
  }
  .main {
    box-shadow: 0 0 1px 0 var(--accent-2);
  }
}
.btn {
  transition: all 200ms linear;
  @include hover {
    &:hover {
      cursor: pointer;
      background: var(--accent-2);
      border-color: var(--accent-2);
      color: var(--text-invert);
    }
  }
}

// animation
.skills-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.skills-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  position: absolute;
}

.skills-move {
  transition: transform 0.45s ease;
}

.skills-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.skills-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
