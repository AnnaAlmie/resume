<script setup lang="ts"></script>

<template>
  <main class="glass-effect glow">
    <FirstScreen />
    <section>
      <AboutInfo />
    </section>
    <section>
      <ProjectsBlock />
    </section>
    <section>
      <SkillsBlock />
    </section>
    <section>
      <ExperienceBlock />
    </section>

    <ContactBlock />
    <div class="buttons">
      <!-- <ThemeButton /> -->
      <UpButton />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  z-index: 1;
  $width: 1000px;
  max-width: $width;
  margin: $spacing-s auto;
  padding: $spacing-s;
  border-radius: $border-radius;
  @media (max-width: ($width + 32px)) {
    margin: 0 auto;
    border-radius: 0;
  }
  &.glass-effect {
    backdrop-filter: none;
  }
}

.buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}
</style>
