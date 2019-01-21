import Dropdown from './Dropdown';

import { use, registerComponent } from '@/utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Dropdown);
  }
};

use(Plugin);

export default Plugin;

export { Dropdown };
