<script setup lang="ts">
const {
  public: { appVersion },
} = useRuntimeConfig();

const delayTime = 3000;
const activeBlock = ref(0);
let timer: ReturnType<typeof setTimeout>;

const animateNext = () => {
  activeBlock.value = (activeBlock.value + 1) % 4;

  timer = setTimeout(animateNext, delayTime);
};

onMounted(() => {
  timer = setTimeout(animateNext, delayTime);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<template>
  <footer class="contact">
    <h3>Contact</h3>
    <div class="social flex-center">
      <a
        href="https://t.me/thealmie"
        target="_blank"
        rel="noopener noreferrer"
        :class="[{ active: activeBlock === 0 }]"
        ><nuxt-icon name="telegram" filled
      /></a>
      <a
        href="https://www.linkedin.com/in/anna-lytvynenko-frontend/"
        target="_blank"
        rel="noopener noreferrer"
        :class="[{ active: activeBlock === 1 }]"
      >
        <nuxt-icon name="linkedin" filled
      /></a>
      <a
        href="https://github.com/AnnaAlmie/resume"
        target="_blank"
        :class="[{ active: activeBlock === 2 }]"
      >
        <nuxt-icon name="github" filled />
      </a>
      <div
        :class="['location ', { active: activeBlock === 3 }]"
        title="Location: Kyiv, Ukraine"
      >
        <small><nuxt-icon name="location" filled /></small>
        <div>KYIV</div>
      </div>
    </div>
    <hr />
    <div class="released">
      &copy; last update <time>2026</time> | version
      {{ appVersion }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background: $light-950;
  padding: $spacing-l $spacing-s $spacing-s;
  margin: calc(-1 * $spacing-s) calc(-1 * $spacing-s);
  border-radius: 0 0 $border-radius $border-radius;
}
h3 {
  text-align: center;
}
.social {
  font-size: 2rem;
  gap: $spacing-l;
  padding-bottom: $spacing-l;
  a {
    color: var(--text-accent);
    transition: all $transition-time ease;
    @include hover {
      &:hover {
        color: var(--accent-1);
      }
    }
  }
}
.location {
  font-family: "Oswald";
  line-height: 1;
  letter-spacing: -1.5px;
  display: flex;
  align-items: flex-end;
  small {
    font-size: 50%;
    margin-bottom: -2px;
  }
}
.active {
  animation: block-highlight 1.5s ease forwards;
}

@keyframes block-highlight {
  50% {
    color: var(--accent-2);
  }
}
.released {
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-lighter);
}
</style>
