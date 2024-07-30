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
  width: calc(100% - 2rem);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 1rem;
  background-image: linear-gradient(to top,#fdbdbd, rgba(0, 0, 0, 0) 100%);
}

.video-title,
.video--work {
  width: 100%;
  margin-right: auto;
  text-align: center;
  font-size: 24px; /* Adjust as needed */
  font-weight: bold; /* Adjust as needed */
  text-align: left;
  line-height: 1.2;
  font-family: "Londrina Solid", sans-serif;
  color: var(--text-color);
  letter-spacing: 1.1px;
}

.video--work {
  font-size: 16px;
  text-align: right;
  margin-top: 0.5rem;
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
    gap: 10px;
    flex-direction: column;
    background-image: none;
    width: calc(100% - 4rem);
    z-index: 1;
    background-image: none;
    margin-top: auto;
  }

  .title-wrapper {
    margin-left: auto;
    flex-direction: row;
    width: max-content;
    gap: 0px;
    width: 100%;
  }
}

@media screen and (min-width: 1024px) {
  
  .video-title {
    font-size: clamp(40px, 2.2vw, 60px);
    margin-right: 0;
    margin-left: auto;
    width: 100%;
    text-align: right;
  }

  .video--work {
    font-size: 30px;
    margin-right: 0;
    margin-left: auto;
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }

  .video-footer {
    flex-direction: row-reverse;
  }

  .title-wrapper {
    width: auto;
    height: 100%;
  }
}
</style>
