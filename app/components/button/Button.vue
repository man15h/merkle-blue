<template>
  <button 
    :class="{
      'cursor-not-allowed opacity-75': loading || $attrs.disabled,
      'hover:shadow-md': !loading && type!='default',
      'bg-primary text-white hover:bg-primary-light': type==='primary',
      'bg-white text-grey-darkest border hover:opacity-75': type==='default',
      'bg-red text-white hover:opacity-75': type==='danger',
      'bg-green text-white hover:opacity-75': type==='success',
      'bg-yellow text-white hover:opacity-75': type==='warning',
      'mini': size==='mini',
      'small': size==='small',
      'medium': size==='medium',
      'medium': size==='default',
    }"
    v-bind="$attrs"
    type="button"
    v-on="$listeners">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'MbButton',
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: () => 'default'
    },
    type: {
      type: String,
      default: () => 'primary'
    }
  }
};
</script>
<style scoped>
.mini {
  padding: 7px 12px;
  font-size: 12px;
  border-radius: 3px;
  @apply tracking-wide;
}
.small {
  padding: 9px 15px;
  font-size: 13px;
  border-radius: 3px;
  @apply tracking-wide;
}
.medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  @apply tracking-wide;
}
</style>
