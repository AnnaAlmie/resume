<script setup lang="ts">
type VideoItem = {
  title: string;
  src: string;
  createdAt?: number;
};

const allVideos: VideoItem[] = [
  {
    title: "Desert Dice",
    src: new URL("../assets/videos/desert_dices.mp4", import.meta.url).href,
    createdAt: 2025,
  },
  {
    title: "Prize Drops",
    src: new URL("../assets/videos/prize_drops.mp4", import.meta.url).href,
    createdAt: 2025,
  },
  {
    title: "Wheel of Wins",
    src: new URL("../assets/videos/wheel_of_wins.mp4", import.meta.url).href,
    createdAt: 2023,
  },
  {
    title: "Bingo",
    src: new URL("../assets/videos/bingo.mp4", import.meta.url).href,
    createdAt: 2024,
  },
  {
    title: "Lucky Scratch Cards",
    src: new URL("../assets/videos/scratch_cards.mp4", import.meta.url).href,
    createdAt: 2024,
  },
  {
    title: "Claw Machine",
    src: new URL("../assets/videos/machine.mp4", import.meta.url).href,
    createdAt: 2025,
  },
  {
    title: "Prize Vault",
    src: new URL("../assets/videos/prize_vault.mp4", import.meta.url).href,
    createdAt: 2024,
  },
  {
    title: "Lightning Streak",
    src: new URL("../assets/videos/lightning_streak.mp4", import.meta.url).href,
    createdAt: 2025,
  },
  {
    title: "Magic Pumpkins",
    src: new URL("../assets/videos/magic_pumpkins.mp4", import.meta.url).href,
    createdAt: 2024,
  },
  {
    title: "Trick or Treat",
    src: new URL("../assets/videos/trick_or_treat.mp4", import.meta.url).href,
    createdAt: 2025,
  },
  {
    title: "Spooky Season",
    src: new URL("../assets/videos/spooky_season.mp4", import.meta.url).href,
    createdAt: 2023,
  },
  {
    title: "Bingo Fortune",
    src: new URL("../assets/videos/bingo_fortune.mp4", import.meta.url).href,
    createdAt: 2024,
  },
  {
    title: "Drugstore",
    src: new URL("../assets/videos/drugstore.mp4", import.meta.url).href,
    createdAt: 2021,
  },
  {
    title: "WillGrade",
    src: new URL("../assets/videos/will_grade.mp4", import.meta.url).href,
    createdAt: 2019,
  },
];

const videos = ref<VideoItem[]>([]);

onMounted(() => {
  videos.value = allVideos;
});

const selectedIndex = ref(1);
const isModalOpen = ref(false);
const slideRefs = ref<Array<HTMLElement | null>>([]);
const dragStartX = ref<number | null>(null);
const dragDeltaX = ref(0);
const isDragging = ref(false);

const normalizeIndex = (index: number) => {
  return (index + videos.value?.length) % videos.value?.length;
};

const scrollToSlide = (index: number) => {
  const normalizedIndex = normalizeIndex(index);
  const slide = slideRefs.value[normalizedIndex];

  slide?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
};

const goToSlide = (index: number) => {
  selectedIndex.value = normalizeIndex(index);
  scrollToSlide(selectedIndex.value);
};

const handleTrackPointerDown = (event: PointerEvent) => {
  dragStartX.value = event.clientX;
  dragDeltaX.value = 0;
  isDragging.value = true;
};

const handleTrackPointerMove = (event: PointerEvent) => {
  if (!isDragging.value || dragStartX.value === null) return;

  dragDeltaX.value = event.clientX - dragStartX.value;
};

const handleTrackPointerEnd = () => {
  if (dragStartX.value === null) return;

  const swipeThreshold = 60;

  if (dragDeltaX.value > swipeThreshold) {
    goToSlide(selectedIndex.value - 1);
  } else if (dragDeltaX.value < -swipeThreshold) {
    goToSlide(selectedIndex.value + 1);
  }

  dragStartX.value = null;
  dragDeltaX.value = 0;
  isDragging.value = false;
};

const openVideo = (index: number) => {
  selectedIndex.value = normalizeIndex(index);
  isModalOpen.value = true;
};

const setSlideRef = (el: HTMLElement | null, index: number) => {
  slideRefs.value[index] = el;
};
</script>

<template>
  <section class="projects">
    <h3>My Projects</h3>
    <div
      class="projects-track"
      :class="{ 'is-dragging': isDragging }"
      @pointerdown="handleTrackPointerDown"
      @pointermove="handleTrackPointerMove"
      @pointerup="handleTrackPointerEnd"
      @pointerleave="handleTrackPointerEnd"
      @pointercancel="handleTrackPointerEnd"
    >
      <div
        v-for="(video, index) in videos"
        :key="video.title"
        class="project-slide"
        type="button"
        :class="{ active: selectedIndex === index }"
        @click="openVideo(index)"
        :ref="(el) => setSlideRef(el as HTMLElement | null, index)"
      >
        <div class="project-slide__video-wrap">
          <video
            :src="video.src"
            muted
            loop
            autoplay
            playsinline
            preload="metadata"
          />
        </div>
      </div>
    </div>
    <p class="note">
      * All projects was released and work on money. The videos were recorded in
      test environments to showcase the key features and functionality of each
      project.
    </p>
  </section>
  <Teleport to="body">
    <ProjectsModal
      v-model="isModalOpen"
      :videos="videos"
      :current-index="selectedIndex"
      @change-video="goToSlide"
    />
  </Teleport>
</template>

<style lang="scss" scoped>
.projects {
  position: relative;
  &-track {
    display: flex;
    gap: $spacing-s;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    padding: 0 $spacing-s $spacing-s;
    margin: 0 calc(-1 * $spacing-s);
    scrollbar-width: none;
    cursor: grab;
    user-select: none;
    touch-action: pan-y;

    &.is-dragging {
      cursor: grabbing;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.project-slide {
  position: relative;
  flex: 0 0 min(80vw, 300px);
  width: min(80vw, 300px);
  padding: 0;
  background: $light-900;
  border: 1px solid rgba(255, 255, 255, 0.001);
  border-radius: $border-radius;
  overflow: hidden;
  scroll-snap-align: center;
  transition: all $transition-time ease;

  &.active {
    border-color: var(--accent-1);
  }

  @include hover {
    &:hover {
      cursor: pointer;
    }
  }
}

.project-slide__video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 12;
  background: $light-900;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: $light-900;
    [data-theme="light"] & {
      filter: grayscale(1);
    }
  }
}
.note {
  font-size: 0.7rem;
  color: $light-700;
}

@media (max-width: 768px) {
  .projects-slider {
    grid-template-columns: 1fr;
  }

  .projects-track {
    padding-bottom: $spacing-s;
  }
}
</style>
