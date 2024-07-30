<template>
  <div class="filter-bar">
    <div v-if="!isMobile || isOpen" class="filters">
      <div class="filter-group" v-for="(group, index) in groupedFilters" :key="index">
        <div :class="['filter-options', columnClass(group.filters.length)]">
          <button
            v-for="filter in group.filters"
            :key="filter"
            @click="toggleFilter(filter)"
            :class="{ active: isSelected(filter) }"
          >
            {{ filter.split("_")[1].replace("-", " ") }}
          </button>
        </div>
        <h3>{{ group.name.replace("-", " ") }}</h3>
      </div>
    </div>
    <h2 v-if="isMobile" @click="toggleFilters">FILTERS<span v-if="isMobile">(<span v-if="!isOpen">+</span><span v-if="isOpen">-</span>)</span></h2>
    <button v-if="selectedFilters.length > 0" @click="clearFilters" class="clear-filters">clear ✕</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

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
        name: key.replace("-", " ").toUpperCase(),
        filters: groups[key]
      }));
    });

    const columnClass = (length) => {
      if (length > 12) {
        return 'four-columns';
      } else if (length >= 9) {
        return 'three-columns';
      } else if (length >= 6) {
        return 'two-columns';
      }
      return '';
    };

    return {
      isMobile,
      isOpen,
      groupedFilters,
      toggleFilters,
      columnClass
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
      this.$emit('clear-filters');
    }
  }
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: scroll;
  z-index: 1;
  width: 100%;
}

.filter-bar h2 {
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: bold;
  margin: 0;
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: max-content;
  justify-content: flex-end;
}

.filter-group h3 {
  font-weight: bold;
  font-size: 0.9rem;
  width: 100%;
  color: var(--text-color-hover);
  font-family: "Londrina Solid", sans-serif;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}

.filter-options.two-columns {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-auto-rows: min-content;
  column-gap: 10px;
  place-items: start;
}

.filter-options.three-columns {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-auto-rows: min-content;
  column-gap: 10px;
  place-items: start;
}

.filter-options.four-columns {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-auto-rows: min-content;
  column-gap: 10px;
  place-items: start;
}

.filter-bar button {
  padding: 1px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 0.9rem;
  margin: 0px;
  font-family: "Architects Daughter", cursive;
  transition: color 0.4s;
  line-height: 1.1;
  text-transform: capitalize;
}

.filter-bar button.active{
  color: var(--text-color-hover);
}

.clear-filters {
  position: absolute;
  bottom: 10px;
  right: 1rem;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .filters {
    display: flex !important;
    gap: clamp(10px, 3vw, 30px);
  }

  .filter-bar button,
  .filter-group h3,
  .filter-bar h2 {
    font-size: clamp(1.5rem, 2vh, 3rem);
  }

  .filter-group h3 {
    margin-bottom: 0;
  }

  .clear-filters {
    right: 2rem;
    bottom: 2rem;
    font-size: 1.7rem;
  }

  .filter-bar button:hover {
    color: var(--text-color-hover);
    transition: color 0.4s;
  }
}
</style>
