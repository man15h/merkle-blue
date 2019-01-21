<template>
  <div>
    <table
      class="text-left w-full bc-table" 
      style="border-collapse:collapse">
      <thead 
        v-if="newColumns.length">
        <tr>
          <th
            v-if="checkable"
            width="20"
            class="table-header checkbox-header"/>
          <th
            v-for="(column, index) in newColumns"
            v-if="column.visible || column.visible === undefined"
            :key="index"
            :style="{ width: column.width + 'px' }"
            class="table-header"
            @click="sort(column)">
            <div>
              <slot
                v-if="$scopedSlots.header"
                :column="column"
                :index="index"
                name="header"
              />
              <template v-else>
                {{ column.label }}
                <span v-if="currentSort.sortKey== column.field && column.sortable">
                  <i 
                    v-show="currentSort.order==1" 
                    class="icon-angle-up" />
                  <i 
                    v-show="currentSort.order!=1" 
                    class="icon-angle-down"
                    style="position:relative; top:2px"/>
                </span>
              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody 
        v-if="data.length">
        <template v-for="(row, index) in tableData">
          <tr
            :key="index">
            <td 
              v-if="checkable"
              width="20"
              class="checkbox-column">
              <input 
                :key="row[uniqueKey] ? row[uniqueKey] :index"
                :id="row[uniqueKey] ? row[uniqueKey] :index" 
                :value="isRowChecked(row[uniqueKey] ? row[uniqueKey] :index)"
                :checked="isRowChecked(row[uniqueKey] ? row[uniqueKey] :index)"
                type="checkbox"
                @change="toggleCheckbox(row)">
            </td>
            <slot
              v-if="$scopedSlots.default"
              :row="row"
              :index="index"
            />
            <template v-else>
              <MbTableColumn
                v-for="column in newColumns"
                v-bind="column"
                :key="column.field"
                internal>
                <template>
                  {{ getValueByPath(row, column.field) }}
                </template>
              </MbTableColumn>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
    <div 
      v-if="pagination" 
      class="mt-4">
      <ul class="flex list-reset w-auto justify-center">
        <li >
          <a 
            :class="{'cursor-not-allowed':pageOpt.currentPage<=0}"
            class="pagination-button bg-grey-lighter text-grey-dark hover:text-primary"
            href="#"
            @click="changePage(pageOpt.currentPage-1)">
            <span>
              <i class="icon-angle-left"/>
            </span>
          </a>
        </li>
        <li 
          v-for="index in pageLength"
          v-if="maxPaginationBtn(index)" 
          :key="index">
          <a 
            :class="{'bg-primary text-white hover:text-white': pageOpt.currentPage == (index-1)}"
            class="pagination-button bg-grey-lighter text-grey-dark hover:text-primary" 
            href="#"
            @click="changePage(index-1)">
            <span 
              v-if="(index >
                pageOpt.currentPage + roundUp(pageOpt.show / 2, 0) && index!= pageLength) ||
            (pageOpt.currentPage - roundUp(pageOpt.show / 2, 0)+1 >= index && index!=1)">
              ...
            </span>
            <span v-else>
              {{ index }}
            </span>
          </a>
        </li>
        <li >
          <a 
            :class="{'cursor-not-allowed':pageOpt.currentPage >= pageLength-1}" 
            class="pagination-button bg-grey-lighter text-grey-dark hover:text-primary"
            href="#"
            @click="changePage(pageOpt.currentPage+1)">
            <span>
              <i class="icon-angle-right"/>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getValueByPath, roundUp } from '@/utils/helpers';
import TableColumn from './TableColumn';
import Vue2Filters from 'vue2-filters';
export default {
  name: 'MbTable',
  components: {
    [TableColumn.name]: TableColumn
  },
  mixins: [Vue2Filters.mixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: () => false
    },
    paginationOpt: {
      type: Object,
      default: () => {
        return {};
      }
    },
    defaultSort: {
      type: Object,
      default: () => {
        return {};
      }
    },
    checkable: {
      type: Boolean,
      default: () => false
    },
    uniqueKey: {
      type: String,
      default: 'index'
    },
    selectedRows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      getValueByPath,
      roundUp,
      newColumns: [...this.columns],
      currentSort: {
        ...{
          sortKey: '',
          order: ''
        },
        ...this.defaultSort
      },
      pageOpt: {
        ...{
          size: 10,
          currentPage: 0,
          show: 3
        },
        ...this.paginationOpt
      },
      isTable: true,
      checkedRows: [...this.selectedRows]
    };
  },
  computed: {
    tableData() {
      let data = this.orderBy(
        this.data,
        this.currentSort.sortKey,
        this.currentSort.order
      );
      if (this.pagination) {
        data = this.limitBy(
          data,
          this.pageOpt.size,
          this.pageOpt.size * this.pageOpt.currentPage
        );
      }
      return data;
    },
    pageLength() {
      const { size } = this.pageOpt;
      return this.roundUp(this.data.length / size);
    },
    screenSize() {
      return window.innerWidth || screen.width;
    }
  },
  watch: {
    columns: {
      handler(value) {
        this.newColumns = [...value];
      }
    },
    data: {
      handler() {
        this.pageOpt.currentPage = 0;
      }
    },
    selectedRows: {
      handler(val) {
        this.checkedRows = val;
      }
    }
  },
  methods: {
    sort(value) {
      if (value.sortable) {
        if (this.currentSort.sortKey === value.field) {
          this.currentSort.order == -1
            ? (this.currentSort.order = 1)
            : (this.currentSort.order = -1);
        } else {
          this.currentSort = {
            sortKey: value.field,
            order: 1
          };
        }
      }
    },
    changePage(value) {
      if (value > -1 && value < this.pageLength) {
        this.pageOpt.currentPage = value;
      }
    },
    maxPaginationBtn(index) {
      return (
        (index <=
          this.pageOpt.currentPage + roundUp(this.pageOpt.show / 2, 0) + 1 &&
          index >
            this.pageOpt.currentPage - roundUp(this.pageOpt.show / 2, 0)) ||
        index == 1 ||
        index == this.pageLength
      );
    },
    isRowChecked(index) {
      return this.checkedRows.some(item => {
        return item[this.uniqueKey] === index;
      });
    },
    toggleCheckbox(row, index) {
      row.index = index;
      if (!this.isRowChecked(row[this.uniqueKey])) {
        this.checkedRows.push(row);
      } else {
        this.checkedRows = this.checkedRows.filter(item => {
          return item[this.uniqueKey]
            ? item[this.uniqueKey] != row[this.uniqueKey]
            : item.index !== row[this.uniqueKey];
        });
      }
      this.$emit('selectionChange', row, this.checkedRows);
    }
  }
};
</script>
<style scoped lang="scss">
.table-header {
  @apply py-4 px-6 bg-grey-lighter font-medium cursor-pointer text-sm font-semibold text-grey-darker border-b border-grey-light;
}
.checkbox-header {
  @apply pr-0;
}
.pagination-button {
  @apply block  px-3 rounded py-2 mx-1 text-xs font-semibold;
}

// TODO: Add media queries
@media screen and (max-width: 992px) and (min-width: 300px) {
  .bc-table {
    thead {
      visibility: hidden;
      display: none;
    }
    td {
      &::before {
        content: attr(data-label);
        @apply font-semibold pr-2 text-left;
      }
      @apply flex w-auto justify-between text-right border-grey-lighter px-0;
    }
    tr {
      @apply mb-8 border-b;
      max-width: 100%;
      position: relative;
      display: block;
    }
  }
}

.checkbox-column {
  @apply py-3 pl-4 pr-0 border-b border-grey-light text-sm text-grey-darkest;
}
</style>
