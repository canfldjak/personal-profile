<script setup>
import Icon from "./Icon.vue";

defineProps({
  heading: { type: String, required: true },
  items: { type: Array, required: true },
});
</script>

<template>
  <div>
    <h3 class="pub-kicker">{{ heading }}</h3>
    <ol class="pub-list">
      <li v-for="(item, index) in items" :key="index" class="pub-list__item">
        <span class="pub-list__index">{{ index + 1 }}</span>
        <p class="pub-list__text">
          {{ item.text }}
          <a
            v-if="item.href"
            class="pub-list__doi"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open DOI for publication ${index + 1}`"
          >
            DOI
            <Icon name="arrowUpRight" :size="14" />
          </a>
        </p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.pub-kicker {
  margin: 0 0 var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
}

.pub-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.pub-list__item {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: var(--space-3);
  align-items: start;
}

.pub-list__index {
  font-variant-numeric: tabular-nums;
  color: var(--color-primary);
  font-size: var(--text-caption);
  padding-top: 0.35rem;
}

.pub-list__text {
  margin: 0;
  overflow-wrap: anywhere;
}

.pub-list__doi {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-left: var(--space-2);
  font-size: var(--text-caption);
  font-family: var(--font-body);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}

.pub-list__doi:hover {
  text-decoration: underline;
}

@media (max-width: 767px) {
  .pub-list__item {
    grid-template-columns: 1.75rem 1fr;
    gap: var(--space-2);
  }

  .pub-list__doi {
    min-height: 44px;
    margin-left: 0;
    margin-top: var(--space-1);
  }
}
</style>
