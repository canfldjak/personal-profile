<script setup>
import Icon from "./Icon.vue";

defineProps({
  items: { type: Array, required: true },
  current: { type: String, default: "" },
});

defineEmits(["navigate"]);
</script>

<template>
  <nav class="nav" aria-label="Curriculum sections">
    <a
      v-for="item in items"
      :key="item.id"
      class="nav__link"
      :class="{ 'is-current': current === item.id }"
      :href="`#${item.id}`"
      :aria-current="current === item.id ? 'location' : undefined"
      @click="$emit('navigate', item.id)"
    >
      <span class="nav__index">{{ item.index }}</span>
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav__link {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  color: var(--nav-fg);
  text-decoration: none;
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: color var(--duration-fast) var(--ease-out);
}

.nav__link:hover,
.nav__link.is-current {
  color: var(--nav-fg-current);
}

.nav__link.is-current {
  border-bottom-color: var(--nav-index);
}

.nav__index {
  font-variant-numeric: tabular-nums;
  color: var(--nav-index);
  min-width: 1.5rem;
}

@media (max-width: 1023px) {
  .nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-5);
  }

  .nav__link {
    min-height: 44px;
    align-items: center;
    padding: var(--space-2) 0;
  }
}

@media (max-width: 767px) {
  .nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: var(--space-4);
    padding-bottom: var(--space-1);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .nav::-webkit-scrollbar {
    display: none;
  }

  .nav__link {
    flex: 0 0 auto;
    white-space: nowrap;
  }
}
</style>
