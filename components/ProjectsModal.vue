<script setup lang="ts">
type VideoItem = {
  title: string;
  src: string;
};

const props = defineProps<{
  videos: VideoItem[];
  modelValue: boolean;
  currentIndex: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "change-video": [index: number];
}>();

let previousBodyOverflow = "";
let previousDocumentOverflow = "";
let isScrollLocked = false;

const currentVideo = computed(
  () => props.videos[props.currentIndex] ?? props.videos[0],
);

const setPageScrollLocked = (locked: boolean) => {
  if (typeof document === "undefined") return;

  if (locked && !isScrollLocked) {
    previousBodyOverflow = document.body.style.overflow;
    previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    isScrollLocked = true;
  } else if (!locked && isScrollLocked) {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousDocumentOverflow;
    isScrollLocked = false;
  }
};

const modalDragStartX = ref<number | null>(null);
const modalDragDeltaX = ref(0);
const isModalDragging = ref(false);

const handleModalPointerDown = (event: PointerEvent) => {
  modalDragStartX.value = event.clientX;
  modalDragDeltaX.value = 0;
  isModalDragging.value = true;
};

const handleModalPointerMove = (event: PointerEvent) => {
  if (!isModalDragging.value || modalDragStartX.value === null) return;

  modalDragDeltaX.value = event.clientX - modalDragStartX.value;
};

const handleModalPointerEnd = () => {
  if (modalDragStartX.value === null) return;

  const swipeThreshold = 80;

  if (modalDragDeltaX.value > swipeThreshold) {
    goToPrevious();
  } else if (modalDragDeltaX.value < -swipeThreshold) {
    goToNext();
  }

  modalDragStartX.value = null;
  modalDragDeltaX.value = 0;
  isModalDragging.value = false;
};

const goToPrevious = () => {
  emit("change-video", props.currentIndex - 1);
};

const goToNext = () => {
  emit("change-video", props.currentIndex + 1);
};

const closeModal = () => {
  emit("update:modelValue", false);
};

watch(
  () => props.modelValue && Boolean(currentVideo.value),
  setPageScrollLocked,
  { immediate: true },
);

onBeforeUnmount(() => setPageScrollLocked(false));
</script>

<template>
  <div
    v-if="modelValue && currentVideo"
    class="video-modal"
    @click.self="closeModal"
  >
    <div
      class="content"
      :class="{ 'is-dragging': isModalDragging }"
      @pointerdown="handleModalPointerDown"
      @pointermove="handleModalPointerMove"
      @pointerup="handleModalPointerEnd"
      @pointerleave="handleModalPointerEnd"
      @pointercancel="handleModalPointerEnd"
    >
      <header class="flex-between-center">
        <h3>{{ currentVideo.title }}</h3>
        <button
          class="close-button"
          type="button"
          @click="closeModal"
          aria-label="Close video"
        >
          <nuxt-icon name="cross" filled />
        </button>
      </header>

      <video
        :key="currentVideo.src"
        :src="currentVideo.src"
        autoplay
        controls
        playsinline
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-s;
  background: #{color.change($light-950, $alpha: 0.9)};
  height: 100vh;
}

.content {
  position: relative;
  width: min(100%, 1100px);
  max-height: 90vh;
  border-radius: $border-radius;
  background: var(--bg-page);
  overflow: hidden;
  cursor: grab;
  user-select: none;
  touch-action: pan-y;

  &.is-dragging {
    cursor: grabbing;
  }

  video {
    display: block;
    width: 100%;
    max-height: 72vh;
    min-height: 72vh;
    background: #000;
    object-fit: contain;
  }
  header {
    padding: $spacing-s;
    h3 {
      margin: 0;
    }
  }
}

.close-button {
  all: unset;
  font-size: 2rem;

  @include hover {
    &:hover {
      color: var(--accent-1);
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  .video-modal {
    padding: $spacing-xs;
  }
}
</style>
