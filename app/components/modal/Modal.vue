<template>
  <transition name="modal">
    <div 
      class="modal-mask z-20 fixed pin-t pin-r 
        w-full h-full bg-modal table" >
      <div 
        class="table-cell align-middle z-50" >
        <div 
          class="modal-container w-full 
            min-w-msm max-w-md mx-auto my-0 px-10
            py-8 bg-white rounded shadow-md relative">
          <slot />
          <i 
            class="icon-cancel-circled text-lg text-red cursor-pointer close-btn" 
            @click="$emit('close')"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'MbModal',
  data() {
    return {};
  }
};
</script>
<style scoped>
.modal-mask {
  transition: opacity 0.3s ease;
  @apply bg-modal;
}
.modal-container {
  transition: all 0.3s ease;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
