import Vue from 'vue';
import * as components from '@/components';
for (let componentKey in components) {
  Vue.use(components[componentKey]);
}
