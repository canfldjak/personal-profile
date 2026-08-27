<script setup>
import Icon from "./Icon.vue";
import SiteNav from "./SiteNav.vue";

defineProps({
  profile: { type: Object, required: true },
  navItems: { type: Array, required: true },
  current: { type: String, default: "" },
});

defineEmits(["navigate"]);
</script>

<template>
  <aside class="rail">
    <div class="rail__photo-wrap">
      <img
        class="rail__photo"
        :src="profile.photo"
        :alt="profile.photoAlt"
        width="1279"
        height="1706"
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 224px, 328px"
      />
    </div>

    <h1 class="rail__name">{{ profile.name }}</h1>

    <ul class="rail__contacts">
      <li>
        <a class="rail__contact" :href="`mailto:${profile.email}`">
          <Icon name="envelope" :size="18" />
          <span>{{ profile.email }}</span>
        </a>
      </li>
      <li>
        <a class="rail__contact" :href="`tel:${profile.mobile}`">
          <Icon name="phone" :size="18" />
          <span>{{ profile.mobile }}</span>
        </a>
      </li>
    </ul>

    <div class="rail__orcid">
      <a
        class="rail__orcid-link"
        :href="profile.orcid.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`ORCID ${profile.orcid.id}`"
      >
        <Icon name="orcid" :size="18" />
        <span>ORCID {{ profile.orcid.id }}</span>
      </a>
    </div>

    <div class="rail__nav">
      <SiteNav :items="navItems" :current="current" @navigate="$emit('navigate', $event)" />
    </div>
  </aside>
</template>

<style scoped>
.rail {
  background: var(--color-rail);
  color: var(--color-rail-text);
  padding: var(--space-8) var(--space-6) var(--space-12);
  box-shadow: inset 0 3px 0 var(--color-accent);
}

.rail__photo-wrap {
  margin: 0 0 var(--space-6);
  overflow: hidden;
  outline: 1px solid var(--color-accent);
  outline-offset: 0;
  aspect-ratio: 3 / 4;
  background: var(--color-neutral-700);
}

@media (min-width: 1024px) {
  .rail__photo-wrap {
    height: 15.5rem;
    aspect-ratio: auto;
  }
}

.rail__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 12%;
}

.rail__name {
  margin: 0 0 var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: var(--weight-semibold);
  font-style: italic;
  line-height: var(--leading-tight);
  letter-spacing: -0.03em;
}

.rail__contacts {
  list-style: none;
  margin: 0 0 var(--space-6);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.rail__contact {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-rail-text);
  text-decoration: none;
  font-size: var(--text-caption);
  cursor: pointer;
  overflow-wrap: anywhere;
}

@media (pointer: coarse) {
  .rail__contact,
  .rail__orcid-link {
    min-height: 44px;
  }
}

.rail__contact:hover {
  color: var(--color-accent);
}

.rail__orcid {
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-rail-border);
  border-bottom: 1px solid var(--color-rail-border);
  margin-bottom: var(--space-6);
}

.rail__orcid-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-caption);
  font-weight: var(--weight-bold);
  color: var(--color-accent);
  text-decoration: none;
  cursor: pointer;
}

.rail__nav {
  position: sticky;
  top: var(--space-6);
}

@media (max-width: 1023px) {
  .rail {
    border-bottom: 1px solid var(--color-rail-border);
    display: grid;
    grid-template-columns: minmax(9rem, 14rem) 1fr;
    grid-template-areas:
      "photo name"
      "photo contacts"
      "orcid orcid"
      "nav nav";
    column-gap: var(--space-6);
    row-gap: var(--space-3);
    padding: var(--space-6) var(--page-gutter);
  }

  .rail__photo-wrap {
    grid-area: photo;
    margin: 0;
    max-height: 18rem;
  }

  .rail__name {
    grid-area: name;
    align-self: start;
    margin: 0;
    font-size: clamp(2rem, 5vw, 2.75rem);
  }

  .rail__contacts {
    grid-area: contacts;
    margin: 0;
  }

  .rail__orcid {
    grid-area: orcid;
    margin: var(--space-2) 0 0;
  }

  .rail__nav {
    grid-area: nav;
    position: static;
    margin-top: var(--space-2);
  }
}

@media (max-width: 767px) {
  .rail {
    grid-template-columns: 1fr;
    grid-template-areas:
      "photo"
      "name"
      "contacts"
      "orcid"
      "nav";
    padding: var(--space-5) var(--page-gutter) var(--space-6);
  }

  .rail__photo-wrap {
    aspect-ratio: 16 / 10;
    max-height: 12.5rem;
  }

  .rail__photo {
    object-position: 50% 10%;
  }

  .rail__name {
    padding-top: 0;
    font-size: clamp(1.75rem, 8vw, 2.25rem);
  }

  .rail__contact,
  .rail__orcid-link {
    min-height: 44px;
  }
}
</style>
