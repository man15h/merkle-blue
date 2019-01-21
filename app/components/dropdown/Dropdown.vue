<template>
  <div class="relative">
    <button 
      class="leading-normal flex-1 h-10 w-full
            text-sm relative bg-grey-lighter text-left
            border border-grey-lighter
            rounded py-2 px-3 leading-tight"
      @click="isExpand=!isExpand">
      <span 
        :class="addClass" 
        class="font-light text-sm">
        {{ currentLabel }}
        <span class="float-right">
          <i 
            v-show="!isExpand" 
            class="icon-angle-down" />
          <i 
            v-show="isExpand" 
            class="icon-angle-up" />
        </span>
      </span>
    </button>
    <div 
      v-if="isExpand" 
      class="rounded bg-white shadow-md mt-2 absolute mt-12 pin-t pin-l min-w-full border">
      <ul 
        v-if="options.length" 
        class="list-reset">
        <li 
          v-for="(option, index) in options" 
          :key="index">
          <div
            class="px-4 py-2 block text-grey-darkest text-sm cursor-pointer hover:bg-grey-lightest"
            @click="optionSelected(option)">
            {{ option }}
          </div>
        </li>
      </ul>
      <div
        v-else
        class="px-4 py-2 text-grey-dark text-sm">
        No Data Available
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MbDropdown',
  props: {
    label: {
      type: String,
      default: 'Select option'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isExpand: false,
      currentLabel: this.label
    };
  },
  computed: {
    addClass() {
      return this.currentLabel && this.currentLabel != this.label
        ? 'text-black'
        : 'text-grey-dark';
    }
  },
  methods: {
    optionSelected(value) {
      this.currentLabel = value;
      this.$emit('selected', value);
      this.isExpand = false;
    }
  }
};
</script>
