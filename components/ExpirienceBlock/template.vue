<script setup lang="ts">
const props = defineProps<{
  title: string;
  companyLink?: string;
  companyName?: string;
  companyDescription?: string;
  companyLocation?: string;
  startDate?: string;
  endDate?: string;
}>();

const isOpen = ref(false);

const formatDate = (date: string) => {
  if (!date) return "";
  if (date === "0") return "Now";

  const datePattern = /^(0[1-9]|1[0-2])\.\d{4}$/;
  if (datePattern.test(date)) {
    const [month, year] = date.split(".");
    return `${year}`;
  }
  return date;
};
const startDateFormatted = computed(() => formatDate(props.startDate || ""));
const endDateFormatted = computed(() => formatDate(props.endDate || ""));
</script>

<template>
  <div class="block" :class="{ 'is-open': isOpen }">
    <div
      class="summary-block flex-between-center"
      role="button"
      tabindex="0"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <div class="summary-info">
        <div class="dates">
          <span v-if="startDateFormatted">{{ startDateFormatted }}</span>
          <span v-if="startDateFormatted && endDateFormatted"> - </span>
          <span v-if="endDateFormatted">{{ endDateFormatted }}</span>
        </div>
        <div class="job-title">{{ title }}</div>
        <div
          v-if="companyLink || companyName || companyDescription"
          class="company flex-alight-center"
        >
          <a
            v-if="companyLink"
            :href="companyLink"
            target="_blank"
            rel="noopener noreferrer"
            class="company-title"
            @click.stop
            @keydown.enter.stop
            @keydown.space.stop
            >{{ companyName }}
            <span v-if="companyDescription" class="company-description">{{
              companyDescription
            }}</span>
          </a>
          <span v-else-if="companyName" class="company-title">
            {{ companyName }}
            <span v-if="companyDescription" class="company-description">{{
              companyDescription
            }}</span>
          </span>
        </div>
        <div v-if="companyLocation" class="company-location">
          {{ companyLocation }}
        </div>
      </div>
      <span class="toggle-icon" aria-hidden="true"
        ><nuxt-icon name="arrow-down" filled
      /></span>
    </div>
    <Transition name="accordion">
      <div v-if="isOpen" class="accordion-panel">
        <div class="content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.block {
  position: relative;
}
.summary-block {
  cursor: pointer;

  .toggle-icon {
    transform: rotate(0deg);
    transition: transform $transition-time ease;
  }

  &[aria-expanded="true"] .toggle-icon {
    transform: rotate(180deg);
    color: var(--accent-2);
  }
}

.dates {
  padding: 4px 0 $spacing-xs;
  color: var(--accent-2);
  font-size: 0.76rem;
  font-weight: 500;
}
.job-title {
  font-size: 1.2rem;
  font-family: "Rajdhani";
  font-weight: 500;
  color: var(--text-accent);
}
.company {
  display: flex;
  align-items: baseline;

  &-title {
    font-size: 1rem;
    color: var(--accent-11);
    transition: all $transition-time ease;
    @include hover {
      &:hover {
        color: var(--accent-2);
      }
    }
  }
  &-description {
    font-size: 0.6em;
    color: var(--text);
  }
  &-location {
    margin-top: $spacing-xs;
    font-size: 0.8rem;
    color: var(--text-lighter);
  }
}

.content {
  min-height: 0;
  margin-top: $spacing-m;

  &:deep() a {
    display: block;
    width: fit-content;
    line-height: 1.15;
    text-decoration: underline;
    transition: all $transition-time ease;
    @include hover {
      &:hover {
        color: var(--accent-2);
      }
    }
  }
}

.accordion-enter-active,
.accordion-leave-active {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition:
    grid-template-rows 0.35s ease,
    opacity 0.25s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
.accordion-panel {
  min-height: 0;
  overflow: hidden;
}
</style>
