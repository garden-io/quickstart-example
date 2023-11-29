<template>
  <code :class="type" ref="codeEl">
    {{ text }}
    <div v-if="showCopyBtn && !showCopySuccess" class="copy-btn" v-on:click="copyText()">
      <!-- The copy icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        stroke="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        role="img"
        aria-labelledby="svg-icon-178"
        aria-hidden="false"
        class="css-od0o21"
      >
        <title id="svg-icon-178">Copy Command</title>
        <g stroke="currentColor" stroke-width="1.33">
          <path
            d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333v5.99997c0 .7364.59695 1.3334 1.33333 1.3334h5.99997c.7364 0 1.3334-.597 1.3334-1.3334V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
          ></path>
          <path
            d="M3.33325 9.99992h-.66666c-.35363 0-.69277-.14048-.94281-.39053-.25005-.25004-.39053-.58918-.39053-.9428v-6c0-.35363.14048-.69277.39053-.94281.25004-.25005.58918-.39053.94281-.39053h6c.35362 0 .69276.14048.9428.39053.25005.25004.39053.58918.39053.94281v.66666"
          ></path>
        </g>
      </svg>
    </div>
    <div title="Copied!" v-if="showCopySuccess" class="copy-btn copy-btn-success">✔︎</div>
  </code>
</template>

<script>

export default {
  name: 'CodeBlock',

  data: () => ({
    showCopySuccess: false
  }),

  props: {
    text: String,
    type: String,
    showCopyBtn: Boolean
  },

  methods: {
    copyText() {
      // Can't use navigator.clipboard if served over http
      const tmpEl = document.createElement('textarea')
      tmpEl.value = this.text
      tmpEl.style.top = '0'
      tmpEl.style.left = '0'
      tmpEl.style.position = 'fixed'

      document.body.appendChild(tmpEl)
      tmpEl.select()
      document.execCommand('copy')
      document.body.removeChild(tmpEl)

      this.showCopySuccess = true
      setTimeout(() => {
        this.showCopySuccess = false
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
code {
  align-items: center;
  background-color: rgba(245, 247, 249, 1);
  display: inline-flex;
  padding: 0.25rem;
}
code.block {
  background-color: rgba(245, 247, 249, 1);
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0.5rem;
}
code.file {
  background-color: #025159;
  color: #bcebd9;
}

.copy-btn {
  display: inline-block;
  cursor: pointer;
  margin-left: 0.5rem;
  height: 14px;
  width: 14px;
}
.copy-btn:hover {
  opacity: 0.8;
}
.copy-btn:active {
  font-weight: 500;
  transform: scale(0.8);
}
.copy-btn-success {
  color: #025159;
}
</style>
