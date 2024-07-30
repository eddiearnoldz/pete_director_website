<template>
  <div class="video-grid">
    <div
      v-for="(video, index) in filteredvideos"
      :key="index"
      class="grid-item"
      :data-pos="index + 1"
      @mouseover="handleMouseOver(video, index + 1)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(video)"
    >
      <img :src="video.image" :alt="video.title" class="video-image" />
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
    const lastHoveredPos = ref(null); // Store the last hovered position

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
        lastHoveredPos.value = pos;
        
        const work = video.filters
          .filter(filter => filter.includes('work'))
          .map(filter => filter.replace('work_', '').replace("-", " "));

        updatevideoTitle(video.title, video.image, work);

        const gridContainer = document.querySelector('.video-grid');
        gridContainer.style.gridTemplateColumns = getGridTemplateColumns(pos);
        gridContainer.style.gridTemplateRows = getGridTemplateRows(pos);
        gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

        document.querySelectorAll('.grid-item').forEach((item, index) => {
          item.classList.remove('enlarged', 'shrunken');
          if (index + 1 === pos) {
            item.classList.add('enlarged');
          } else {
            item.classList.add('shrunken');
          }
        });
      } catch (error) {
        console.error('Error in handleMouseOver:', error);
      }
    };

    const handleMouseLeave = () => {
      try {
        updatevideoTitle('', '', '');

        if (lastHoveredPos.value) {
          const gridContainer = document.querySelector('.video-grid');
          gridContainer.style.gridTemplateColumns = getGridTemplateColumns(lastHoveredPos.value);
          gridContainer.style.gridTemplateRows = getGridTemplateRows(lastHoveredPos.value);
          gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

          document.querySelectorAll('.grid-item').forEach(item => {
            item.classList.remove('enlarged', 'shrunken');
            if (item.getAttribute('data-pos') == lastHoveredPos.value) {
              item.classList.add('enlarged');
            } else {
              item.classList.add('shrunken');
            }
          });
        }
      } catch (error) {
        console.error('Error in handleMouseLeave:', error);
      }
    };

    const handleClick = (video) => {
      emit('video-selected', video);
    };

    const getGridTemplateColumns = (pos) => {
      switch (pos) {
        case 1:
        case 7:
        case 13:
        return '40vw 12vw 12vw 12vw 12vw 12vw';
        case 2:
        case 8:
        case 14:
          return '12vw 40vw 12vw 12vw 12vw 12vw';
        case 3:
        case 9:
        case 15:
          return '12vw 12vw 40vw 12vw 12vw 12vw';
        case 4:
        case 10:
        case 16:
          return '12vw 12vw 12vw 40vw 12vw 12vw';
        case 5:
        case 11:
        case 17:
          return '12vw 12vw 12vw 12vw 40vw 12vw ';
        case 6:
        case 12:
        case 18:
          return '12vw 12vw 12vw 12vw 12vw 40vw';
        default:
          return '40vw 12vw 12vw 12vw 12vw 12vw';
      }
    };

    const getGridTemplateRows = (pos) => {
      switch (pos) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          return '60% 20% 20%';
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
          return '20% 60% 20%';
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
          return '20% 20% 60%';
        default:
          return '60% 20% 20%';
      }
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
  grid-template-columns: 40vw 12vw 12vw 12vw 12vw 12vw;
  grid-template-rows: 60% 20% 20%;
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

.video-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  aspect-ratio: 3/2;
  transform: scale(1);
  transition: transform 0.3s, margin 0.3s;
}

.video-image:hover {
  transform: scale(1.2);
}
</style>
