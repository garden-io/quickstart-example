<template>
  <div class='results'>
    <div v-bind:style="{ backgroundColor: optionA.color, height: aPercent + '%' }">
      <div>
        <h2>{{aPercent}}%</h2>
        <p>({{ a }} votes)</p>
      </div>
    </div>
    <div v-bind:style="{ backgroundColor: optionB.color, height: bPercent + '%' }">
      <div>
        <h2>{{bPercent}}%</h2>
        <p>({{ b }} votes)</p>
      </div>
    </div>
  </div>
</template>

<script>
const results = {
  name: 'Results',

  props: {
    optionA: {
      name: String,
      color: String,
    },
    optionB: {
      name: String,
      color: String,
    },
  },

  data() {
    return {
      a: 0,
      b: 0,
    };
  },

  created() {
    console.log('Results component created');

    const socket = window.io.connect();

    socket.on('scores', (json) => {
      const data = JSON.parse(json);
      const a = parseInt(data.a || 0, 10);
      const b = parseInt(data.b || 0, 10);

      this.updateScores({ a, b });
    });

    socket.on('connect_error', (err) => {
      console.log('Error on socket connection:');
      console.log(err);
    });

    socket.on('connect', () => {
      console.log('Connected to results endpoint');
    });
  },

  computed: {
    aPercent() {
      if (this.a + this.b <= 0) {
        return 50;
      }
      return Math.round(this.a / (this.a + this.b) * 100);
    },
    bPercent() {
      if (this.a + this.b <= 0) {
        return 50;
      }
      return 100 - Math.round(this.a / (this.a + this.b) * 100);
    },
  },

  methods: {
    updateScores({ a, b }) {
      if (a !== this.a || b !== this.b) {
        console.log(`Setting scores: a=${a} b=${b}`);
        this.a = a;
        this.b = b;
      }
    },
  },
};
export default results;

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .results {
    width: 100%;
    height: 100%;
  }

  .results div {
    color: white;
    font-weight: bold;
    transition: height 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .results div >div {
    width: 100%;
    display: block;
  }

  .results div >div h2 {
    font-size: 4rem;
    padding-bottom: 0rem;
    margin-bottom: 0rem;
  }

  .results div >div p {
    margin-top: 0.4rem;
    font-size: 1rem;
  }
</style>
