<template>
  <div class="filter-bar">
    <div class="filter-header">
      <h2 @click="toggleFilters">FILTER BY<span v-if="isMobile">(<span v-if="!isOpen">+</span><span v-if="isOpen">-</span>)</span></h2>
      <button v-if="selectedFilters.length > 0" @click="clearFilters" class="clear-filters">clear ✕</button>
    </div>
    <div v-if="!isMobile || isOpen" class="filters-container">
      <div class="filters">
        <div class="filter-group" v-for="(group, index) in groupedFilters" :key="index">
          <div :class="['filter-options']">
            <button
              v-for="filter in group.filters"
              :key="filter"
              @click="handleFilterClick(filter, $event)"
              :class="{ active: isSelected(filter) }"
            >
            {{ formatFilterName(filter) }}
            </button>
          </div>
          <h3>{{ group.name.replace("-", " ") }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import gsap from 'gsap';

export default defineComponent({
  props: {
    filters: {
      type: Array,
      required: true
    },
    selectedFilters: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const isMobile = ref(window.innerWidth < 768);
    const isOpen = ref(false);

    const updateView = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const toggleFilters = () => {
      if (isMobile.value) {
        isOpen.value = !isOpen.value;
      }
    };

    window.addEventListener('resize', updateView);

    const groupedFilters = computed(() => {
      const groups = {};

      props.filters.forEach(filter => {
        const [group, name] = filter.split("_");
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(filter);
      });

      return Object.keys(groups).map(key => ({
        name: key.replace("-", " "),
        filters: groups[key]
      }));
    });
    return {
      isMobile,
      isOpen,
      groupedFilters,
      toggleFilters,
    };
  },
  methods: {
    toggleFilter(filter) {
      this.$emit('filter-selected', filter);
    },
    isSelected(filter) {
      return this.selectedFilters.includes(filter);
    },
    clearFilters() {
  const buttons = document.querySelectorAll('.filter-bar button');

  buttons.forEach((button) => {
    if (button.classList.contains('active')) {
      gsap.to(button, {
        x: 0,
        duration: 0.3,
        ease: 'elastic.out(0.1, 0.8)',
        onComplete: () => {
          button.classList.remove('active');
        },
      });
    }
  });

  // Emit the event to clear the filters
  this.$emit('clear-filters');
},
    handleFilterClick(filter, event) {
      const target = event.currentTarget;

      // Ensure the target exists before applying animation
      if (!target) {
        console.warn('GSAP target not found:', target);
        return;
      }

      const isFilterSelected = this.isSelected(filter);
      this.toggleFilter(filter);

      if (isFilterSelected) {
        // If the filter was selected and is now being removed
        gsap.to(target, {
          x: 0, // Move back to the original position
          duration: 0.3,
          ease: "elastic.out(0.1, 0.8)"
        });
      } else {
        // If the filter is being selected
        gsap.to(target,
          { 
            x: -10, 
            duration: 0.3, 
            ease: "elastic.out(0.1, 0.8)"
          }
        );
      }
    },
    formatFilterName(filter) {
      // Split on "_" and "-" and capitalize each word
      return filter
        .split('_')[1] // Get the part after the underscore
        .split('-') // Split by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join words with a space
    },
  }
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
}

.filter-bar h2 {
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: bold;
  margin: 0;
  font-family: "Anton", sans-serif;
  letter-spacing: 0.8px;
}

.filter-header {
  position: sticky;
  top: 0;
  background-color: transparent;
  z-index: 2; /* Ensure the header stays above the filters */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  padding-left: 1rem;
}

.filters-container {
  overflow-x: scroll;
  width: 100%;
  padding-left: 1rem;
  scrollbar-width: none;
}

.filters-container::-webkit-scrollbar {
  display: none;
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: max-content;
  justify-content: center;
  padding-right: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column-reverse;
  padding: 0;
  width: max-content;
  justify-content: flex-end;
}

.filter-group h3 {
  font-weight: bold;
  font-size: 0.9rem;
  width: 100%;
  color: var(--text-color-hover);
  font-family: "Anton", sans-serif;
  letter-spacing: 0.8px;
  margin-bottom: 0.25em;
  margin-top: 0.25em;
}

.filter-options {
  display: grid;
  width: max-content;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column;
  justify-items: left;
  column-gap: 20px;
}

.filter-bar button {
  padding: 1px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1rem;
  margin: 0px;
  font-family: "Teko", cursive;
  transition: color 0.4s;
  line-height: 1;
  text-transform: capitalize;
}

.filter-bar button.active {
  color: var(--text-color-hover);
  font-style: italic;
}

.filter-bar  .clear-filters {
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: "Anton", sans-serif;
  letter-spacing: 0.8px;
  font-weight: bold;
  text-transform: lowercase;
  font-style: italic;
  padding: 0;
}

@media (min-width: 768px) {
  .filters {
    display: flex !important;
    margin-right: auto;
    padding-right: unset;
  }

  .filter-bar button {
    font-size: clamp(1rem, 1.5vw, 1.8rem);
  }

  .filter-group h3,
  .filter-bar h2,
  .filter-bar  .clear-filters {
    font-size: clamp(0.8rem, 1.5vw, 1.8rem);
    line-height: 1.2;
  }

  .clear-filters {
    left: 0;
    bottom: 2rem;
    font-size: 1.7rem;
  }

  .filter-bar button:hover {
    color: var(--text-color-hover);
    transition: color 0.4s;
  }

  .filter-header,
  .filters-container {
    padding-left: 2rem;
  }
}

@media screen and (min-width: 1024px) {

  .filter-bar {
    grid-column-start: 1;
    grid-column-end: 2;
    width: calc(100% - 2rem);
    overflow-x: scroll;
  }
}

</style>
