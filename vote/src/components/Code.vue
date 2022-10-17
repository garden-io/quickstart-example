<template>
  <code :class="type" ref="codeEl">
    {{text}}<span class="copy-btn" v-if="type === 'block'" v-on:click="copyText()">Copy</span>
  </code>
</template>

<script>

export default {
  name: 'Code',

  data: () => ({
  }),

  props: {
    text: String,
    type: String,
  },

  methods: {
    copyText() {
      // Can't use navigator.clipboard if served over http
      const tmpEl = document.createElement('textarea');
      tmpEl.value = this.text;
      tmpEl.style.top = '0';
      tmpEl.style.left = '0';
      tmpEl.style.position = 'fixed';

      document.body.appendChild(tmpEl);
      tmpEl.select();
      document.execCommand('copy');
      document.body.removeChild(tmpEl);
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  code {
    font-size: 1rem;
  }
  code.block {
    background-color: rgba(245,247,249,1.00);
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 1rem;
  }
  code.file {
    background-color: #025159;
    color: #bcebd9;
  }
  .copy-btn {
    font-weight: 550;
    color: #5c13e8;
    cursor: pointer;
  }
  .copy-btn:hover {
    opacity: 0.8;
  }
  .copy-btn:active {
    font-weight: 500;
    transform: scale(0.98);
  }
</style>
