<template>
  <div class="art container">
    <h1 class="fade-in">Art coming soon... </h1>
  </div>
</template>

<style>

.art h1 {
  color: var(--text-color-hover);
  font-size: 40px;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 3s forwards;
  max-width: 800px;
  font-size: clamp(14px, 1.5vw, 20px);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>