<template>
  <td
    v-if="visible"
    :data-label="label"
    class="column">
    <span>
      <slot/>
    </span>
  </td>
</template>

<script>
export default {
  name: 'MbTableColumn',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    field: {
      type: String,
      default: () => ''
    },
    width: {
      type: [Number, String],
      default: () => ''
    },
    sortable: {
      type: Boolean,
      default: () => false
    },
    visible: {
      type: Boolean,
      default: () => true
    },
    internal: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      newKey: this.label
    };
  },
  beforeMount() {
    this.addRefToTable();
  },
  beforeUpdate() {
    this.addRefToTable();
  },
  beforeDestroy() {
    const index = this.$parent.newColumns
      .map(column => column.newKey)
      .indexOf(this.newKey);
    if (index >= 0) {
      this.$parent.newColumns.splice(index, 1);
    }
  },
  methods: {
    addRefToTable() {
      if (!this.$parent.$data.isTable) {
        this.$destroy();
        throw new Error('You should wrap columns on a table');
      }
      if (this.internal) return;
      const repeated = this.$parent.newColumns.some(
        column => column.newKey === this.newKey
      );
      !repeated && this.$parent.newColumns.push(this);
    }
  }
};
</script>
<style scoped lang="scss">
.column {
  @apply py-3 px-6 border-b border-grey-light text-sm text-grey-darkest;
}
</style>
