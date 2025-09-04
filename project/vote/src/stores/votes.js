import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVoteStore = defineStore('votes', () => {
  const a = ref(0)
  const b = ref(0)

  const percentA = computed(() =>  {
    if (a.value + b.value <= 0) {
      return 50;
    }
    return Math.round(a.value / (a.value + b.value) * 100);
  })

  const percentB = computed(() =>  {
    if (a.value + b.value <= 0) {
      return 50;
    }
    return 100 - percentA();
  })

  function incrementA() {
    a.value++
  }

  function incrementB() {
    b.value++
  }

  return { a, b, percentA, percentB, incrementA, incrementB }
})
