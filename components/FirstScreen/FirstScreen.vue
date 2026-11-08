<script setup lang="ts">
const { theme } = useTheme();
</script>

<template>
  <div class="first-screen">
    <div v-if="theme === 'dark'" class="bg" />
    <div class="content">
      <CodeButton />
      <div class="info">
        <div>
          <div class="title"><span>Frontend</span> Developer</div>
          <div class="name">Anna Lytvynenko</div>
        </div>
        <img
          src="@/assets/images/avatar.png"
          alt="Anna Lytvynenko"
          width="1254"
          height="1254"
          class="avatar"
        />
      </div>
      <NumbersBlock />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  @include tablet {
    flex-direction: row-reverse;
  }
}
.title {
  font-family: "Oswald";
  font-weight: 500;
  font-size: 2.5em;
  letter-spacing: -0.08em;
  line-height: 0.8;
  text-align: right;
  text-transform: uppercase;
  color: var(--text-accent);
  span {
    font-size: 2.5em;
    display: block;
    color: var(--accent-1);
    @include mobile {
      font-size: 1.5em;
    }
  }
  @include mobile {
    font-size: 3.5em;
  }
  @include tablet {
    font-size: 4em;
  }
}
.name {
  text-align: right;
  font-family: "Oooh Baby";
  color: var(--accent-3);
  font-size: 2.6em;
  @include tablet {
    font-size: 3.6em;
  }
}
.first-screen {
  position: relative;
  .content {
    position: relative;
    z-index: 2;
  }
}

.avatar {
  position: relative;
  width: 360px;
  height: 360px;
  mask: linear-gradient(
    to top,
    transparent 0%,
    transparent 1%,
    black 20%,
    black 100%
  );
  filter: drop-shadow(0 0px 4px var(--accent-1));
  @include mobile {
    width: 280px;
    height: 280px;
  }
  @include tablet {
    width: 400px;
    height: 400px;
    margin-top: -15em;
  }
}

.bg {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 80%;
  height: 80%;
  background:
    radial-gradient(circle at 20% 30%, #bc92cd, transparent 45%),
    radial-gradient(circle at 80% 30%, #844cad, transparent 45%),
    radial-gradient(circle at 50% 70%, #5f3f96, transparent 45%),
    radial-gradient(circle at 20% 70%, #3c2c59, transparent 45%),
    radial-gradient(circle at 80% 70%, #0f153a, transparent 45%),
    radial-gradient(circle at 30% 50%, #195699, transparent 45%),
    radial-gradient(circle at 70% 50%, #307ec0, transparent 45%);
  filter: blur(80px);
  animation: morph 12s ease-in-out infinite alternate;
}
@keyframes morph {
  0% {
    transform: scale(1) translate(-15%, -15%);
  }
  50% {
    transform: scale(1.1) translate(15%, 0%);
  }
  100% {
    transform: scale(1.05) translate(0%, 15%);
  }
}
</style>
