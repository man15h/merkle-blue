<template>
  <div class="flex flex-wrap justify-center">
    <div class="w-full my-auto text-left">
      <label
        v-if="label"
        class="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-4">
        {{ label }}
      </label>
      <div class="flex flex-wrap items-stretch w-full relative">
        <input
          :value="value"
          v-bind="$attrs"
          :class="{'focus:border-red': !valid, 'focus:border-green': valid && value}"
          class="appearance-none flex-shrink flex-grow flex-auto
            leading-normal w-px flex-1 h-10 
            text-sm relative bg-grey-lighter
            text-grey-darkest border border-grey-lighter
            rounded py-2 px-3 leading-tight
            focus:outline-none focus:bg-white focus:border-grey"
          @input="$emit('input', $event.target.value)">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MbInput',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [String, Object, Array, Boolean],
      default: () => ''
    },
    // TODO: use size props
    size: {
      type: String,
      default: () => ''
    },
    valid: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>
