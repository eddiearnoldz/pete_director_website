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
      if (window.innerWidth >= 768) {
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
  line-height: 1;
  font-family: "Londrina Solid", sans-serif;
  color: var(--text-color);
  letter-spacing: 1.1px;
}

.video--work {
  font-size: 16px;
  text-align: right;
  color: var(--text-color-hover);
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
}



@media screen and (min-width: 768px) {
  .video-title,
  .video--work {
    font-size: 30px;
    margin-right: auto;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .video-title {
    margin: 0;
  }
  
  .video--work {
    font-size: 20px;
    min-height: 30px;
  }

  .video-footer {
    position: unset;
    padding: 2rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    background-image: none;
    width: calc(100% - 4rem);
    z-index: 1;
    background-image: none;
  }

  .title-wrapper {
    margin-left: auto;
    flex-direction: row;
    width: max-content;
    width: 100%;
    min-height: 40px;
    gap: 10px;
    align-items: flex-end;
  }
}

@media screen and (min-width: 1024px) {
  
  .video-title {
    font-size: clamp(40px, 2.2vw, 60px);
    margin-right: 0;
    margin-left: auto;
    width: 100%;
    text-align: right;
    justify-content: flex-end;
  }

  .video--work {
    font-size: 30px;
    margin-right: 0;
    margin-left: auto;
  }

  .title-wrapper {
    width: auto;
    flex-direction: row;
    height: 100%;
  }
}

@media screen and (min-width: 1440px) {
  .video-footer {
    flex-direction: row-reverse;
    min-height: 140px;
    position: relative;
  }
  .title-wrapper {
    margin-left: auto;
    flex-direction: column;
    position: absolute;
    width: 50%;
    bottom: 2rem;
    right: 2rem;
    height: auto;
  }

  .video-footer {
    max-width: 1800px;
    margin: 0 auto;
  }
}
</style>
