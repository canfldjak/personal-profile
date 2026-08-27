<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { profile } from "./content/profile.js";
import IdentityRail from "./components/IdentityRail.vue";
import CvSection from "./components/CvSection.vue";
import PublicationList from "./components/PublicationList.vue";
import SiteNav from "./components/SiteNav.vue";

const navItems = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "education", index: "02", label: "Education" },
  { id: "research", index: "03", label: "Research" },
  { id: "employment", index: "04", label: "Positions" },
  { id: "publications", index: "05", label: "Publications" },
];

const current = ref("overview");

function employmentKind(line) {
  if (/^♦/.test(line) || /achievements:?$/i.test(line) || line === "Achievements:") {
    return "label";
  }
  if (/^\d{4}/.test(line)) return "post";
  if (/^\(\d+\)/.test(line)) return "item";
  return "prose";
}

const employmentLines = computed(() =>
  profile.employment.map((line) => ({ line, kind: employmentKind(line) })),
);

function setCurrentFromScroll() {
  const ids = navItems.map((item) => item.id);
  const offset = window.matchMedia("(max-width: 767px)").matches ? 110 : 120;
  let active = ids[0];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= offset) active = id;
  }
  current.value = active;
}

function onNavigate(id) {
  current.value = id;
}

onMounted(() => {
  setCurrentFromScroll();
  window.addEventListener("scroll", setCurrentFromScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", setCurrentFromScroll);
});
</script>

<template>
  <a class="skip-link" href="#overview">Skip to curriculum vitae</a>

  <div class="shell">
    <div class="mobile-chrome">
      <header class="mobile-bar">
        <a class="mobile-bar__name" href="#overview">{{ profile.name }}</a>
      </header>
      <div id="mobile-nav" class="mobile-nav">
        <SiteNav :items="navItems" :current="current" @navigate="onNavigate" />
      </div>
    </div>

    <IdentityRail
      class="shell__rail"
      :profile="profile"
      :nav-items="navItems"
      :current="current"
      @navigate="onNavigate"
    />

    <main class="shell__main">
      <article>
        <section id="overview" class="lede" aria-labelledby="lede-title">
          <div class="lede__label">
            <h2 id="lede-title" class="lede__title">Overview</h2>
          </div>
          <div class="lede__body">
            <p>{{ profile.lead }}</p>
          </div>
        </section>

        <CvSection id="education" :title="profile.headings.education">
          <article v-for="item in profile.education" :key="item.title" class="edu">
            <h3 class="edu__title">{{ item.title }}</h3>
            <p class="edu__place">{{ item.place }}</p>
            <p class="edu__detail">{{ item.detail }}</p>
          </article>
        </CvSection>

        <CvSection id="research" :title="profile.headings.research">
          <div v-for="group in profile.research" :key="group.title" class="research">
            <h3 class="research__title">{{ group.title }}</h3>
            <ol class="plain-list">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ol>
          </div>
        </CvSection>

        <CvSection id="employment" :title="profile.headings.employment">
          <div class="employment">
            <p
              v-for="(entry, index) in employmentLines"
              :key="index"
              :class="`employment__${entry.kind}`"
            >
              {{ entry.line }}
            </p>
          </div>
        </CvSection>

        <CvSection id="publications" :title="profile.headings.publications">
          <PublicationList
            :heading="profile.headings.publicationsSince2018"
            :items="profile.publications"
          />
        </CvSection>
      </article>

      <footer class="site-foot">
        <p>{{ profile.orcid.apsNote }}</p>
        <a :href="profile.orcid.url" target="_blank" rel="noopener noreferrer">
          ORCID {{ profile.orcid.id }}
        </a>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
}

.mobile-chrome,
.mobile-bar,
.mobile-nav {
  display: none;
}

.shell__main {
  max-width: calc(var(--measure) + var(--page-gutter) * 2);
  padding: var(--space-16) var(--page-gutter) var(--space-24);
}

.lede {
  scroll-margin-top: max(var(--space-8), var(--sticky-offset));
}

.lede__title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.lede p {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  font-weight: var(--weight-regular);
  line-height: 1.65;
  max-width: 40rem;
}

.edu__title,
.research__title {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.edu__place,
.edu__detail {
  margin: 0;
  color: var(--color-text);
}

.edu__place {
  color: var(--color-text-muted);
}

.plain-list {
  list-style: none;
  margin: var(--space-4) 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.plain-list li {
  padding-left: 0;
}

.employment {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.employment p {
  margin: 0;
}

.employment__post {
  margin-top: var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.employment__post:first-child {
  margin-top: 0;
}

.employment__label {
  margin-top: var(--space-5);
  color: var(--color-primary);
  font-weight: var(--weight-bold);
  font-size: var(--text-caption);
  letter-spacing: 0.02em;
}

.employment__item,
.employment__prose {
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-primary);
}

.site-foot {
  margin-top: var(--space-24);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-caption);
  color: var(--color-text-muted);
}

.site-foot p {
  margin: 0 0 var(--space-2);
  overflow-wrap: anywhere;
}

@media (min-width: 1024px) {
  .shell {
    display: grid;
    grid-template-columns: var(--rail-width) minmax(0, 1fr);
  }

  .shell__rail {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: auto;
  }
}

@media (min-width: 1200px) {
  .shell__main {
    max-width: calc(
      var(--label-col) + var(--label-gap) + var(--measure-wide) + var(--page-gutter) * 2
    );
    margin-inline: auto;
  }

  .lede {
    display: grid;
    grid-template-columns: var(--label-col) minmax(0, 1fr);
    column-gap: var(--label-gap);
  }

  .lede__title {
    position: sticky;
    top: var(--space-12);
    width: auto;
    height: auto;
    margin: 0;
    clip: auto;
    overflow: visible;
    white-space: normal;
    font-family: var(--font-display);
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-snug);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding-left: var(--space-4);
    border-left: 3px solid var(--color-primary);
  }

  .lede__body,
  .site-foot {
    max-width: var(--measure-wide);
  }

  .lede p {
    max-width: none;
  }

  .site-foot {
    margin-left: calc(var(--label-col) + var(--label-gap));
  }
}

@media (max-width: 1023px) {
  .shell__main {
    padding-top: var(--space-12);
  }
}

@media (max-width: 767px) {
  .mobile-chrome {
    display: block;
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--color-rail);
    color: var(--color-rail-text);
    border-bottom: 1px solid var(--color-rail-border);
    padding-top: env(safe-area-inset-top, 0px);
    box-shadow: inset 0 3px 0 var(--color-accent);
  }

  .mobile-bar {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: var(--space-2) var(--page-gutter) 0;
  }

  .mobile-bar__name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: var(--weight-semibold);
    font-style: italic;
    color: var(--color-rail-text);
    text-decoration: none;
    cursor: pointer;
  }

  .mobile-nav {
    display: block;
    padding: 0 var(--page-gutter) var(--space-2);
  }

  .shell__main {
    padding-top: var(--space-8);
    padding-bottom: max(var(--space-16), env(safe-area-inset-bottom, 0px));
  }

  .lede p {
    font-size: 1.0625rem;
    max-width: none;
  }

  .edu__title,
  .research__title {
    font-size: 1.2rem;
    overflow-wrap: anywhere;
  }

  .employment__post {
    overflow-wrap: anywhere;
  }

  :deep(.rail__nav) {
    display: none;
  }
}
</style>
