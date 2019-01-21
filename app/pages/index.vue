<template>
  <section class="container">
    <!-- filter card -->
    <div 
      class="card my-4">
      <div class="flex flex-wrap m-4  lg:flex-no-wrap xl:flex-no-wrap justify-between">
        <div class="flex-1 items-center justify-start flex-row flex w-full">
          <p class="text-grey-darkest mr-4 text-sm font-semibold tracking-wide"> Find </p>
          <mb-input
            v-model="filter.text"
            :placeholder="lookupMap.get(filter.column)"
            class="w-64"/>
          <p class="text-grey-darkest mx-4 text-sm"> In</p>
          <mb-dropdown 
            :options="dropdownOptions"
            class="w-64"
            @selected="changeFilter"/>
        </div>
        <div class="flex-none w-auto m-auto lg:w-sm xl:w-sm mt-4 lg:mt-0 xl:mt-0">
          <mb-button 
            class="shadow-md" 
            @click="doFilter">
            Filter
          </mb-button>
          <mb-button 
            type="default" 
            @click="resetFilter">
            Reset
          </mb-button>
        </div>
      </div>
    </div>

    <!-- table card -->
    <div 
      class="card p-4 mb-16">
      <div class="flex mb-4 justify-between">
        <div class=" text-left">
          <h4 class="text-grey-darkest my-2 font-semibold">Transactions</h4>
        </div>
        <div class=" ">
          <mb-button 
            size="small" 
            class="shadow-md" 
            @click="csvExport">
            Export Transactions <i class="icon-file-excel"/>
          </mb-button>
        </div>
      </div>
      <mb-table 
        :data="tableData"
        :pagination-opt="paginationOptions"
        :default-sort="{sortKey:'Date', order:-1}"
        :selected-rows="selectedItems"
        unique-key="ID"
        pagination
        checkable 
        @selectionChange="checked">
        <template slot-scope="scope">
          <mb-table-column 
            field="ID" 
            label="ID"
            width="350"
            sortable>
            {{ scope.row.ID }}
          </mb-table-column>
          <mb-table-column 
            field="Name" 
            label="Name"
            sortable>
            {{ scope.row.Name }}
          </mb-table-column>
          <mb-table-column 
            field="Date" 
            width="210" 
            label="Date"
            sortable>
            {{ new Date(scope.row.Date) | moment("Do MMM YYYY, h:mm A") }}
          </mb-table-column>
          <mb-table-column 
            field="Amount" 
            label="Amount">
            {{ scope.row.Amount }}
          </mb-table-column>
          <mb-table-column
            label="Action"
            width="200">
            <mb-button 
              type="primary" 
              size="mini" 
              @click="edit(scope)">
              <i class="icon-pencil mr-1 text-xs"/>Edit
            </mb-button>
            <mb-button 
              type="primary" 
              size="mini" 
              @click="info(scope)">
              <i class="icon-info-circled mr-1 text-xs"/>Info
            </mb-button>
          </mb-table-column>
        </template>
      </mb-table>

      <!-- detail modal -->
      <mb-modal 
        v-if="isShow"
        @close="isShow=false">
        <h3 class="mb-8 text-grey-darkest"> Order Details </h3>
        <div 
          v-for="(value, propertyName, index) in selectedRow.row"
          v-if="propertyName !='index'"
          :key="index"
          class="flex -mx-2 mb-4">
          <div class="w-48 px-2 flex-none">
            <p class="block tracking-wide text-grey-darker text-sm mb-4 text-right">
              {{ propertyName }}:
            </p>
          </div>
          <div class="px-2 max-w-msm">
            <p class="font-semibold text-grey-darkest break-words text-sm text-left">
              {{ value }}
            </p>
          </div>
        </div>
      </mb-modal>

      <!-- edit modal -->
      <mb-modal 
        v-if="isEdit"
        @close="isEdit=false">
        <h3 class="mb-8 text-grey-darkest"> Order Details </h3>
        <div 
          v-for="(value, propertyName, index) in selectedRow.row"
          v-if="propertyName !='Description' && propertyName !='index'"
          :key="index"
          class="flex -mx-2 mb-4">
          <div class="w-48 px-2 flex-none">
            <p class="block tracking-wide text-grey-darker text-sm mb-4 text-right">
              {{ propertyName }}:
            </p>
          </div>
          <div class="px-2 max-w-msm">
            <p class="font-semibold text-grey-darkest break-words text-sm text-left">
              <span v-if="propertyName==='Date'">
                {{ new Date(value) | moment("Do MMM YYYY, h:mm A") }}
              </span>
              <span v-else>
                {{ value }}
              </span>
            </p>
          </div>
        </div>
        <mb-textarea 
          v-model="selectedRow.row.Description"
          rows="3"/>
        <mb-button @click="update(selectedRow)">
          Update
        </mb-button>
      </mb-modal>
    </div>
    <mb-alert 
      :visible="selectedItems.length">
      Are you sure you want to delete  {{ selectedItems.length }} selected items?
      <template slot="button">
        <mb-button 
          type="danger" 
          size="small" 
          @click="deleteItems">
          Delete
        </mb-button>
      </template>
    </mb-alert>
  </section>
</template>

<script>
import { csv2Json } from '@/utils/helpers';
import Vue2Filters from 'vue2-filters';
const lookupMap = new Map([
  ['', 'Search/Filter'],
  ['ID', 'ID of the transaction'],
  ['Name', 'Name of the customer'],
  ['Date', 'Search by the month/year']
]);
export default {
  name: 'Index',
  mixins: [Vue2Filters.mixin],
  constants: {
    originalData: []
  },
  data() {
    return {
      lookupMap,
      dropdownOptions: ['ID', 'Name', 'Date'],
      filter: {
        text: '',
        column: ''
      },
      paginationOptions: {
        size: 10,
        currentPage: 0
      },
      tableData: [],
      isEdit: false,
      isShow: false,
      selectedItems: [
        {
          ID: '8E6F38E1-5DC7-5030-4513-8FBB237EF5DB'
        },
        {
          ID: '84E8A8EE-5A8F-44CA-F8A7-97A1BD972B16'
        }
      ],
      selectedRow: {
        row: {},
        index: ''
      }
    };
  },
  mounted() {
    this.fetchCsv();
  },
  methods: {
    fetchCsv() {
      this.$fetch('test.csv')
        .then(csv => {
          this.originalData = csv2Json(csv);
          this.tableData = this.originalData;
        })
        .catch(err => {
          throw Error(err);
        });
    },
    edit(row) {
      this.selectedRow = row;
      this.isEdit = true;
    },
    info(row) {
      this.selectedRow = row;
      this.isShow = true;
    },
    update(row) {
      this.tableData[row.index] = { ...this.tableData[row.index], ...row.row };
      this.isEdit = false;
    },
    checked(row, rows) {
      this.selectedItems = rows;
      // return this.$notify({
      //   message: `${row.ID} transaction selected`,
      //   type: 'success'
      // });
    },
    deleteItems() {
      this.selectedItems = [];
      return this.$notify({
        message: `Rows deleted successfully`,
        type: 'danger'
      });
      // TODO: delete rows from data
    },
    changeFilter(value) {
      this.filter.column = value;
    },
    doFilter() {
      const { text, column } = this.filter;
      if (column) {
        this.tableData = this.filterBy(this.originalData, text, column);
        this.paginationOptions.currentPage = 0;
      } else {
        return this.$notify({
          message: `Select a column from the dropdown`,
          type: 'danger'
        });
      }
    },
    resetFilter() {
      this.tableData = this.originalData;
      this.filter = {
        column: '',
        text: ''
      };
    },
    csvExport() {
      const transactionData = this.tableData;
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [
        Object.keys(transactionData[0]).join(';'),
        ...transactionData.map(item => Object.values(item).join(';'))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');
      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'transactions.csv');
      link.click();
    }
  }
};
</script>
<style>
.container {
  @apply justify-start items-center text-center mx-auto flex flex-col px-4;
}
.header {
  @apply text-grey-darkest text-xl align-middle mb-12;
}
.card {
  @apply rounded  shadow  w-full bg-white;
}
.footer {
  @apply flex flex-row justify-center mt-6;
}
</style>
