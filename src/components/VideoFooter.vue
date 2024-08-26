<template>
  <div class="video-footer">
    <div class="title-wrapper">
      <div v-if="activevideoTitle" class="video-title" :style="backgroundStyle">
        {{ activevideoTitle }} 
      </div>
      <div v-if="activevideoWork.length > 0" class="video--work" :style="backgroundStyle">
        {{ activevideoWork.join(' - ') }}
      </div>
    </div>
    <filter-bar 
      :filters="filters" 
      @filter-selected="toggleFilter"
      :selectedFilters="selectedFilters"
       @clear-filters="$emit('clear-filters')"
    ></filter-bar>
  </div>
</template>

<script>
import FilterBar from '@/components/FilterBar.vue';

export default {
  components: { FilterBar },
  props: {
    filters: {
      type: Array,
      required: true
    },
    toggleFilter: {
      type: Function,
      required: true
    },
    selectedFilters: {
      type: Array,
      required: true
    },
    activevideoTitle: {
      type: String,
      default: ''
    },
    activevideoImage: {
      type: String,
      default: ''
    },
    activevideoWork: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    backgroundStyle() {
      if (window.innerWidth > 768) {
        return {
          backgroundColor: `linear-gradient(to top, var(--text-color-hover), var(--text-color-hover) 100%)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text'
        };
      }
      return {};
    }
  }
};
</script>

<style scoped>
.video-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  background-image: linear-gradient(to top,var(--background-color), rgba(0, 0, 0, 0) 100%);
}

.video-title,
.video--work {
  width: calc(100% - 2rem);
  margin: 0 auto;
  text-align: center;
  font-size: 24px; /* Adjust as needed */
  font-weight: bold; /* Adjust as needed */
  text-align: left;
  line-height: 1.2;
  font-family: "Anton", sans-serif;
  color: var(--text-color);
  letter-spacing: 0.8px;
}

.video--work {
  font-size: 16px;
  text-align: right;
  color: var(--text-color-hover);
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}



@media screen and (min-width: 768px) {
  .video-title,
  .video--work {
    font-size: clamp(18px, 3vw, 30px);
    margin-right: auto;
    width: max-content;
    margin: 0;
    padding-right: 2rem;
  }

  .video-title {
    margin: 0;
    width: calc(100% - 2rem);
    text-align: right;
  }
  
  .video--work {
    font-size: 20px;
    min-height: 30px;
  }

  .video-footer {
    flex-direction: row;
    min-height: 140px;
    position: relative;
    max-width: 1800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;
    padding:2rem 0;
  }
  .title-wrapper {
    margin-left: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    height: auto;
    grid-area: 1/2/2/3;
    padding-left: unset;
    padding-bottom: unset;
    text-align: right;
    width: calc(100% - 2rem);
  }
}


@media screen and (min-width: 1024px) {

}
</style>
