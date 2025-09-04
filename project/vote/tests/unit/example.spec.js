import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import VoteBlock from '../../src/components/Vote.vue'

describe('Vote.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(VoteBlock, {
      propsData: {
        optionA: {
          name: 'flowers',
          color: 'red',
        },
        optionB: {
          name: 'trees',
          color: 'green',
        },
      },
    });
    expect(wrapper.text()).to.include('flowers');
  });
});
