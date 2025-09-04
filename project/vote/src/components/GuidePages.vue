<template>
  <div class="guide-inner">
    <div v-if="currentPageName === 'welcome'">
      <h1>Welcome{{ usernameStr }}</h1>
      <p>
        If you're reading this it means you've <span class="bold">successfully deployed</span> the
        quickstart example project.
        <br />
        <br />
        This example is a voting application made to resemble a typical microservice architecture.
        It contains a handful of services, a message queue, and a database.
        <br />
        <br />
        When you ran the <CodeBlock text="deploy --sync" /> command, 
        Garden <span class="bold">built</span> the entire
        project with its blazing fast Remote Container Builder,
        <span class="bold">deployed</span> the services,
        <span class="bold">ran an action</span> to intialize the database, and turned on
        <span class="bold">hot reloading</span> (i.e. live code sync). You can view the
        results in the <a target="_blank" href="https://app.garden.io">Garden Cloud</a>.
        <br />
        <br />
        Try voting by clicking the buttons below.
      </p>
    </div>
    <div v-if="currentPageName === 'hotReloading1'">
      <h1>Hot reloading I</h1>
      <p>
        If you haven't already, you can enable hot reloading by running <CodeBlock text="deploy --sync" :showCopyBtn=true /> from the dev console.
        <br />
        <br />
        This means that changes you make to the code locally are
        <span class="bold">live synced</span> to the running services without requiring a re-build.
        <br />
        <br />
        Try opening the <CodeBlock type="file" text="./vote/src/colors.js" /> file of the Vote microservice
        in your editor and changing the values.
        <br />
        <br />
        Notice how the app updates immediately?
      </p>
    </div>
    <div v-if="currentPageName === 'hotReloading2'">
      <h1>Hot reloading II</h1>
      <p>
        Hot reloading is also enabled for the API service, which is a separate microservice running
        in a separate Pod in your Kubernetes cluster.
        <br />
        <br />
        If you click
        <button type="submit" name="call" v-on:click="callApi()">
          <span>this button</span>
        </button>
        it’ll print a greeting from the API server:
        <span class="highlight">{{ serverGreeting }}</span>
        <br />
        <br />
        Try changing the greeting in the <CodeBlock text="hello()" /> function in
        <CodeBlock type="file" text="./api/app.py" /> and click the button again.
        <br />
        <br />
        As before, the app updates immediately.
      </p>
    </div>
    <div v-if="currentPageName === 'logs'">
      <h1>Logs</h1>
      <p>
        To <span class="bold">stream logs from all the microservices</span> in this project you can run the <CodeBlock text="logs --follow" :showCopyBtn=true /> command from the dev console.
        <br />
        <br />
        There are multiple different options for the logs command and you can run
        <CodeBlock text="logs --help" :showCopyBtn=true /> to learn more. To stop following logs in the dev console you can run <CodeBlock text="hide logs" :showCopyBtn=true />.
        <br />
        <br />
        You can also use the Garden CLI directly and run <CodeBlock text="garden logs --follow" :showCopyBtn=true />, e.g. if you want to stream logs in a separate window.
        <br />
        <br />
        If you click the vote buttons belows you should see the corresponding service logs.
      </p>
    </div>
    <div v-if="currentPageName === 'tests'">
      <h1>Test Actions</h1>
      <p>
        Garden treats tests as a <span class="bold">first-class citizen</span>. To run the entire
        test suite for this project you can run <CodeBlock text="test" :showCopyBtn=true /> from the dev console.
        <br />
        <br />
        Garden also has a <span class="bold">powerful caching</span> mechanism built-in. Try running
        the test again without making any changes to the code.
        <br />
        <br />
        If the test passed the first time, Garden will simply return the cached test results.
        <br />
        <br />
        (Note that running the tests may re-deploy services and thereby disable hot reloading. You
        can re-enable it by running <CodeBlock text="deploy --sync" :showCopyBtn=true /> again.)
      </p>
    </div>
    <div v-if="currentPageName === 'run-actions'">
      <h1>Run Actions</h1>
      <p>
        Run actions are useful for various set-up operations.
        <br />
        <br />
        For example, when you first ran <CodeBlock text="deploy" />, a Run action for initialising and seeding
        the database was executed.
        <br />
        <br />
        You can also run individual Run actions directly. To reset the database to its original state,
        run:
        <CodeBlock type="block" text="run db-clear" :showCopyBtn=true />
        Notice how the votes are reset to zero?
      </p>
    </div>
    <div v-if="currentPageName === 'exec'">
      <h1>Exec</h1>
      <p>
        Sometimes you need <span class="bold">direct access to your running services</span>.
        <br />
        <br />
        To shell into the API server, using a separate terminal (not the dev console), you can run:
        <CodeBlock type="block" text="garden exec api /bin/sh" :showCopyBtn=true />
        You can exit from the process by typing <CodeBlock text="exit" /> and hitting enter.
      </p>
    </div>
    <div v-if="currentPageName === 'end'">
      <h1>And that's it!</h1>
      <p>
        That concludes our tour through some common Garden workflows.
        <br />
        <br />
        We've mostly looked at the "inner loop" development experience but Garden works equally well
        in CI/CD pipelines where it can be used to <span class="bold">run tests</span>,
        <span class="bold">create preview environments</span>,
        <span class="bold">publish images</span>, and
        <span class="bold">deploy to production</span>.
        <br />
        <br />
        For next steps, we suggest heading <a href="https://docs.garden.io/getting-started/next-steps">to our docs</a> to learn how you can start using Garden for
        your own projects. If you have any questions, we happily encourage you to <a href="https://discord.gg/FrmhuUjFs6">join our Discord commmunity</a>.
        <br />
        <br />
        And if you really want to amplify your Garden experience and get expert help in getting
        started, check out our <a href="https://garden.io/plans">Garden commercial tiers</a>.
      </p>
    </div>
  </div>
</template>

<script>
import CodeBlock from "./Code.vue";
import axios from 'axios'

export default {
  name: "GuidePages",

  data: () => ({
    usernameStr: import.meta.env.VITE_USERNAME ? ` ${import.meta.env.VITE_USERNAME}!` : "!",
    serverGreeting: "",
  }),

  props: {
    currentPageName: String,
  },

  methods: {
    callApi() {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      };
      const self = this;
      axios.get("/api", { headers }).then((res) => {
        self.serverGreeting = res.data;
      });
    },
  },

  components: {
    CodeBlock,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button[name="call"] {
  background-color: rgb(51, 51, 51);
  color: white;
  display: inline;
  font-size: 1rem;
  height: auto;
  width: auto;
}
span.highlight {
  background-color: #e4e9fd;
  font-weight: bold;
  color: #5c13e8;
}
span.bold {
  font-weight: bold;
}
.guide-inner {
  flex: 1;
}
</style>
