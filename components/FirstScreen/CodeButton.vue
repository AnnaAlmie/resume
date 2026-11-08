<script setup lang="ts"></script>

<template>
  <a
    class="circle-content"
    href="https://github.com/AnnaAlmie/resume"
    target="_blank"
  >
    <div class="title">&lt;Code/&gt;</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:lang="en"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 500 500"
    >
      <defs>
        <path
          id="textcircle"
          d="M250,400
                       a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          transform="rotate(12,250,250)"
        />
      </defs>
      <g class="textcircle">
        <text textLength="940">
          <textPath xlink:href="#textcircle" textLength="940">
            Take a look • Code example • Take a look • Code example •
          </textPath>
        </text>
      </g>
    </svg>
  </a>
</template>

<style lang="scss" scoped>
.circle-content {
  position: absolute;
  z-index: 3;
  top: 48%;
  right: -30px;
  display: grid;
  place-items: center;
  @include mobile {
    right: -60px;
  }
  @include tablet {
    left: 38%;
    right: auto;
  }
  .title {
    position: absolute;
    font-family: "Rajdhani";
    font-size: 36px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: -3px;
    color: var(--accent-1);
  }
  svg {
    width: 200px;
  }
  @include hover {
    &:hover .textcircle {
      transform: scale(1.1) rotate(90deg);
    }
  }
  text {
    fill: var(--text);
    font-family: "Rajdhani";
    font-size: 36px;
    font-weight: 300;
    text-transform: uppercase;
    font-variant-ligatures: none;
    animation: rotate 25s linear infinite;
    transform-origin: 250px 250px;
  }

  .textcircle {
    transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
    transform-origin: 250px 250px;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
