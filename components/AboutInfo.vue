<script setup lang="ts"></script>
<template>
  <div class="columns">
    <div class="about">
      <h3>About Me</h3>
      <p>
        I’m a frontend developer who genuinely enjoys the work. I like creating
        things from scratch, solving problems, exploring new ideas, and seeing
        how a technical solution can turn into something people actually enjoy
        using.
      </p>
      <ul>
        <li>
          <b>Time management:</b> deadlines are not missed, reasonable set
          timings, responsible work in multi-mode.
        </li>
        <li>
          <b>Teamworker:</b> work as part, able to communicate effectively with
          other members, collaborate and contribute to a positive team dynamic.
        </li>
        <li>
          <b>Attention:</b> have a keen eye for detail, clean code and organized
          projects, always looking for things that can be refactored.
        </li>
        <li>
          <b>Patience and persistence:</b> troubleshooting and debugging, able
          to identify and solve problems quickly and efficiently.
        </li>
        <li>
          <b>Empathy and Creativity:</b> try to understanding the needs and
          perspectives of users to create user-friendly and accessible
          interfaces, come up with creative solutions to design challenges.
        </li>
        <li>
          <b>Adaptability:</b> as technologies and programming languages evolve,
          I`m always self-improvementand and continuous learning to stay
          up-to-date.
        </li>
      </ul>
    </div>
    <div class="contact-summon">
      <div class="text">Let’s build something amazing together.</div>
      <a
        class="btn-link"
        href="https://t.me/thealmie"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get in touch
        <nuxt-icon name="arrow-up-right" filled />
      </a>
      <nuxt-icon class="stars" name="stars-outline" filled />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.contact-summon {
  position: relative;
  font-family: "Oswald";
  padding: $spacing-s;
  background: linear-gradient(
    280deg,
    var(--accent-3) 0%,
    var(--accent-11) 100%
  );
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  gap: $spacing-m;
  min-width: 206px;
  & > * {
    max-width: 190px;
  }
  @include tablet {
    flex: 0 0 250px;
    padding: $spacing-l;
  }
  .text {
    font-size: 2.2rem;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--text-accent);
  }
  .btn-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-s;
    color: var(--text);
    background: $light-800;
    border-radius: 999px;
    padding: $spacing-x calc($spacing-m / 2);
    font-weight: 300;
    line-height: 1;
    text-transform: uppercase;
    transition: all $transition-time ease;
    @include hover {
      &:hover {
        background: var(--accent-1);
      }
    }
  }
}
.stars {
  position: absolute;
  bottom: 2.9em;
  right: 0.8em;
  font-size: 2.5rem;
  color: var(--text-accent);
  opacity: 0.3;
  animation: stars 6s linear infinite;
}
@keyframes stars {
  50% {
    opacity: 1;
    scale: 1.2;
    transform: rotate(10deg);
    filter: drop-shadow(0 0 10px #{color.change($accent-10, $alpha: 0.9)});
  }
}

.columns {
  @include tablet {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: $spacing-s;
  }
}
</style>
