import { mount, shallowMount } from '@vue/test-utils';
import MbInput from './Input';

describe('MbInput', () => {
  it('render correctly', () => {
    const wrapper = shallowMount(MbInput);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('is called', () => {
    const wrapper = mount(MbInput);
    expect(wrapper.name()).toBe('MbInput');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders input element by default', () => {
    const wrapper = shallowMount(MbInput);
    expect(wrapper.contains('input')).toBeTruthy();
    expect(wrapper.classes()).toContain('flex');
  });
  it('render the placeholder and readonly attribute when passed', () => {
    const wrapper = shallowMount(MbInput, {
      attrs: { placeholder: 'Awesome!', readonly: true }
    });
    const target = wrapper.find('input');
    expect(target.element.getAttribute('placeholder')).toBe('Awesome!');
    expect(target.element.getAttribute('readonly')).toBe('readonly');
  });
});
