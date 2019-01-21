<template>
  <div class="flex flex-wrap mb-1 justify-center">
    <div class="w-full my-auto text-left">
      <label
        v-if="label"
        class="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-4" 
        for="address">
        {{ label }}
      </label>
      <div class="flex flex-wrap items-stretch w-full relative">
        <textarea 
          id="password"
          :value="value"
          v-bind="$attrs"
          type="text" 
          class="appearance-none flex-shrink flex-grow flex-auto 
            leading-normal w-px flex-1
            relative bg-grey-lighter
            text-grey-darkest border border-grey-lighter 
            rounded py-3 px-4 mb-3 leading-tight 
            focus:outline-none focus:bg-white focus:border-grey"
          @input="$emit('input', $event.target.value)"
        />
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MbTextarea',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    }
  }
};
</script>
