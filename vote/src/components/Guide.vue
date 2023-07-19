<template>
  <div class='guide-wrap'>
    <button v-if="hidden"  v-on:click="show()" name="show">Show guide</button>
    <div class="guide" :class="hidden ? 'hide' : 'show'">
      <button v-on:click="hide()" name="hide">Hide</button>
      <img class="guide-background" :class="hidden ? 'hide' : 'show'" src='/pink-flower.png' />
      <GuidePages :currentPageName="pages.pageNames[pages.currentPageIdx]" />
      <div class="page-num-wrap">
        <button class="nav" v-on:click="goToPrevPage(pages)">
          {{pages.currentPageIdx > 0 ? "<" : "&nbsp;" }}
        </button>
        <span>
          {{pages.currentPageIdx + 1}}/{{pages.totalPages}}
        </span>
        <button class="nav" v-on:click="goToNextPage(pages)">
          {{pages.currentPageIdx + 1 < pages.totalPages ? ">" : "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { LOCAL_STORAGE_ITEM_PAGE } from '../constants';
import GuidePages from './GuidePages.vue';

export default {
  name: 'GuideBlock',

  data: () => {
    const pageNames = ['welcome', 'hotReloading1', 'hotReloading2', 'logs', 'tests', 'tasks', 'exec', 'end'];
    const currentPageIdx = parseInt(window.localStorage.getItem(LOCAL_STORAGE_ITEM_PAGE), 10) || 0;
    return {
      hidden: false,
      pages: {
        pageNames,
        currentPageIdx,
        totalPages: pageNames.length,
      },
    };
  },

  methods: {
    goToNextPage() {
      const nextPageIdx = Math.min(this.pages.currentPageIdx + 1, this.pages.totalPages - 1);
      this.pages.currentPageIdx = nextPageIdx;
      window.localStorage.setItem(LOCAL_STORAGE_ITEM_PAGE, nextPageIdx);
    },
    goToPrevPage() {
      const prevPage = Math.max(this.pages.currentPageIdx - 1, 0);
      this.pages.currentPageIdx = prevPage;
      window.localStorage.setItem(LOCAL_STORAGE_ITEM_PAGE, prevPage);
    },
    hide() {
      this.hidden = true;
    },
    show() {
      this.hidden = false;
    },
  },

  components: {
    GuidePages,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button.nav {
    background-color: transparent;
    border: none;
    color: rgb(51, 51, 51);
    display: inline;
    font-size: 1.75rem;
    height: 3rem;
    width: 2.5rem;
  }
  button[name="hide"] {
    background-color: transparent;
    color: rgb(51, 51, 51);
    font-size: 1rem;
    font-weight: 700;
    height: auto;
    margin-right: 1rem;
    width: auto;
    position: absolute;
    right: 0;
    text-transform: none;
    top: 0;
  }
  button[name="show"] {
    background-color: transparent;
    color: rgb(51, 51, 51);
    font-size: 1rem;
    font-weight: 700;
    height: auto;
    margin-right: 1rem;
    width: auto;
    position: absolute;
    left: 0;
    text-transform: none;
    top: 0;
  }
  .page-num-wrap {
    align-items: center;
    bottom: -10px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .guide-background {
    display: block;
    left: 50%;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    top: -2px;
    transform: translateX(-50%);
    width: 5rem;
    z-index: 100;
  }
  .guide {
    align-items: center;
    background-color: white;
    box-shadow: 0 1px 20px 1px rgb(0 0 0 / 15%);
    display: flex;
    height: calc(43vh - 3rem);
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    max-width: 1200px;
    max-height: 600px;
    min-width: 700px;
    padding-bottom: 1rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 1rem;
    position: relative;
    width: 90vw;
  }
  .guide.hide, .guide-background.hide {
    margin-top: -50vh;
    transition: all 0.6s ease;
  }
  .guide.show, .guide-background.show {
    transition: all 0.6s ease;
  }
  .guide.show {
    margin-top: 1rem;
  }
</style>
