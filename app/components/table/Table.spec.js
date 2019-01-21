import { mount, shallowMount } from '@vue/test-utils';
import { render } from '@vue/server-test-utils';
import MbTable from './Table';

describe('MbTable', () => {
  it('is called', () => {
    const wrapper = mount(MbTable);
    expect(wrapper.name()).toBe('MbTable');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders table with 2 data columns', () => {
    const wrapper = shallowMount(MbTable, {
      propsData: propsData
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

const propsData = {
  data: [
    {
      Amount: 345.54,
      Date: '2017-07-23T04:24:49-07:00',
      Description: 'Curabitur dictum. Phasellus in',
      ID: '3471DA17-401F-9633-BF81-4CADA6FD5C79',
      Name: 'Kyra Lester'
    },
    {
      Amount: 677.08,
      Date: '2018-11-08T05:44:15-08:00',
      Description: 'dui, in sodales elit erat vitae risus. Duis a mi',
      ID: '9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E',
      Name: 'Buckminster Alvarado'
    }
  ],
  columns: [
    {
      field: 'ID',
      label: 'ID'
    },
    {
      field: 'Name',
      label: 'Name'
    }
  ]
};
