<template>
  <div class="video-grid">
    <div
      v-for="(video, index) in filteredvideos"
      :key="index"
      class="grid-item"
      :data-pos="index + 1"
      @mouseover="handleMouseOver(video, index)"
      @mouseleave="handleMouseLeave(index)"
      @click="handleClick(video)"
    >
    <img :src="video.image" :alt="video.title" class="video-gif" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  props: {
    videos: {
      type: Array,
      required: true
    },
    selectedFilters: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update-video-title', 'video-selected'],
  setup(props, { emit }) {

    const filteredvideos = computed(() => {
      if (props.selectedFilters.length === 0) return props.videos;
      return props.videos.filter(video => {
        return props.selectedFilters.every(filter => video.filters.includes(filter));
      });
    });

    const updatevideoTitle = (title, image, work) => {
      emit('update-video-title', { title, image, work });
    };

    const handleMouseOver = (video, pos) => {
      try {
        
        const work = video.filters
          .filter(filter => filter.includes('work'))
          .map(filter => filter.replace('work_', '').replace("-", " "));

        updatevideoTitle(video.title, video.image, work);

        const gridContainer = document.querySelector('.video-grid');
        gridContainer.style.gridTemplateColumns = getGridTemplateColumns(pos + 1);
        gridContainer.style.gridTemplateRows = getGridTemplateRows(pos + 1);
        gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

        document.querySelectorAll('.grid-item').forEach((item, index) => {
          item.classList.remove('enlarged', 'shrunken');
          if (index === pos) {
            item.classList.add('enlarged');
          } else {
            item.classList.add('shrunken');
          }
        });
      } catch (error) {
        console.error('Error in handleMouseOver:', error);
      }
    };

    const handleMouseLeave = (index) => {
      try {

        updatevideoTitle('', '', '');
          const gridContainer = document.querySelector('.video-grid');
          gridContainer.style.gridTemplateColumns = getGridTemplateColumns('30% 10% 10% 10% 10% 10% 10% 10%');
          gridContainer.style.gridTemplateRows = getGridTemplateRows('40% 20% 20% 20%');
          gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

          document.querySelectorAll('.grid-item')[0].classList.add('enlarged');
      } catch (error) {
        console.error('Error in handleMouseLeave:', error);
      }
    };

    const handleClick = (video) => {
      emit('video-selected', video);
    };

    const columnLayouts = [
      '30% 10% 10% 10% 10% 10% 10% 10%', // 1, 9, 17, 25, 33, ...
      '10% 30% 10% 10% 10% 10% 10% 10%', // 2, 10, 18, 26, 34, ...
      '10% 10% 30% 10% 10% 10% 10% 10%', // 3, 11, 19, 27, 35, ...
      '10% 10% 10% 30% 10% 10% 10% 10%', // 4, 12, 20, 28, 36, ...
      '10% 10% 10% 10% 30% 10% 10% 10%', // 5, 13, 21, 29, 37, ...
      '10% 10% 10% 10% 10% 30% 10% 10%', // 6, 14, 22, 30, 38, ...
      '10% 10% 10% 10% 10% 10% 30% 10%', // 7, 15, 23, 31, 39, ...
      '10% 10% 10% 10% 10% 10% 10% 30%'  // 8, 16, 24, 32, 40, ...
    ];

    const getGridTemplateColumns = (pos) => {
      const normalizedPos = (pos - 1) % 8;
      return columnLayouts[normalizedPos];
    };

    const rowLayouts = [
      '40% 20% 20% 20%', // 1-8
      '20% 40% 20% 20%', // 9-16
      '20% 20% 40% 20%', // 17-24
      '20% 20% 20% 40%'  // 25-32
    ];

    const getGridTemplateRows = (pos) => {
      const normalizedPos = Math.floor((pos - 1) / 8) % 4;
      return rowLayouts[normalizedPos];
    };

    return {
      filteredvideos,
      handleMouseOver,
      handleMouseLeave,
      handleClick,
    };
  },
});
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: 30vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw;
  grid-template-rows: 40% 20% 20% 20%;
  padding: 2rem;
  padding-left: 0;
  overflow-x: scroll;
  height: 70vh;
  width: 100%;
  margin-left: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  z-index: 2;
  transition: grid-template-columns 1s ease, grid-template-rows 1s ease;
  max-width: 1800px;
  margin: auto;
}

.video-grid::-webkit-scrollbar {
  display: none;
}

.grid-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 1s ease;
  height: 100%;
}

.grid-item.enlarged {
  opacity: 1;
  transition: opacity 1s ease;
}

.grid-item.shrunken {
  opacity: 0.9;
}

.video-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s;
}
</style>
