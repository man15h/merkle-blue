<template>
  <transition name="snack">
    <div 
      v-if="visible" 
      class="card max-w-sm alert-card h-12 bg-red snackbar">
      <div class="flex w-full -mx-2 justify-between h-12">
        <div class="flex-1 w-full px-2 items-center text-grey-darkest flex justify-start">
          <slot/>
        </div>
        
        <div 
          v-if="$slots.button" 
          class="flex-none w-24 px-2 items-center justify-end flex">
          <slot name="button"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'MbAlert',
  props: {
    visible: {
      type: [Boolean, Number],
      default: () => true
    }
  }
};
</script>
<style scoped lang="scss">
.alert-card {
  @apply h-12 fixed pin-b px-4;
}
.snackbar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  border-radius: 4px;
  bottom: 0px;
}

.snack-enter-active,
.snack-leave-active {
  transition: all 0.4s ease;
}
.snack-enter,
.snack-leave-to {
  opacity: 0;
  bottom: -300px;
}
</style>
