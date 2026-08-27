<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
});
</script>

<template>
  <section class="section" :id="id">
    <div class="section__label">
      <h2 class="section__title">{{ title }}</h2>
    </div>
    <div class="section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-top: var(--space-16);
  scroll-margin-top: max(var(--space-8), var(--sticky-offset));
}

.section:first-of-type {
  padding-top: 0;
}

.section__title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: 0.04em;
  color: var(--color-text);
  padding: 0 0 0 var(--space-4);
  border-left: 3px solid var(--color-primary);
}

.section__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

@media (min-width: 1200px) {
  .section {
    display: grid;
    grid-template-columns: var(--label-col) minmax(0, 1fr);
    column-gap: var(--label-gap);
  }

  .section__title {
    position: sticky;
    top: var(--space-12);
    margin: 0;
    font-size: var(--text-h3);
    letter-spacing: 0.06em;
    line-height: var(--leading-snug);
    overflow-wrap: normal;
    word-break: keep-all;
    hyphens: none;
  }

  .section__body {
    max-width: var(--measure-wide);
  }
}

@media (max-width: 767px) {
  .section {
    padding-top: var(--space-12);
  }

  .section__title {
    font-size: 1.375rem;
    overflow-wrap: anywhere;
  }
}
</style>
