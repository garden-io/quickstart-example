<template>
  <div class="guide-inner">
    <div v-if="currentPageName === 'welcome'">
      <h1>Welcome{{ usernameStr }}</h1>
      <p>
        If you're reading this it means you've <span class="bold">successfully deployed</span> the
        quickstart example project.
        <br />
        <br />
        This example is a voting application made to resemble a typical micro service architecture.
        It contains a handful of services, a message queue, and a database.
        <br />
        <br />
        When you ran <Code text="garden dev" /> followed by the
        <Code text="deploy --sync" /> command, Garden <span class="bold">built</span> the entire
        project, <span class="bold">deployed</span> the services,
        <span class="bold">ran a task</span> to intialize the database, and turned on
        <span class="bold">hot reloading</span> (i.e. live code sync).
        <br />
        <br />
        Try voting by clicking the buttons below.
      </p>
    </div>
    <div v-if="currentPageName === 'hotReloading1'">
      <h1>Hot reloading I</h1>
      <p>
        When you run the <Code text="deploy --sync" /> command, hot reloading is enabled by default.
        <br />
        <br />
        This means that changes you make to the code locally are
        <span class="bold">live synced</span> to the running services without requiring a re-build.
        <br />
        <br />
        Try opening the <Code type="file" text="./vote/src/colors.js" /> file of the Vote micro
        service in your editor and changing the values.
        <br />
        <br />
        Notice how the app updates immediately?
      </p>
    </div>
    <div v-if="currentPageName === 'hotReloading2'">
      <h1>Hot reloading II</h1>
      <p>
        Hot reloading is also enabled for the API service, which is a separate micro service running
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
        Try changing the greeting in the <Code text="hello()" /> function in
        <Code type="file" text="./api/app.py" /> and click the button again.
        <br />
        <br />
        As before, the app updates immediately.
      </p>
    </div>
    <div v-if="currentPageName === 'logs'">
      <h1>Logs</h1>
      <p>
        To <span class="bold">stream logs from all the micro services</span> in this project, simply
        run the following from the interactive Garden dev console:
        <Code type="block" text="logs --follow" />
        There are multiple different options for the logs command, you can run
        <Code text="logs --help" /> to learn more. Stop following logs by turning off the log
        monitors with <Code text="hide logs" />.
        <br />
        <br />
        If you click the vote buttons belows you should see the corresponding service logs.
      </p>
    </div>
    <div v-if="currentPageName === 'tests'">
      <h1>Tests</h1>
      <p>
        Garden treats tests as a <span class="bold">first-class citizen</span>. To run the entire
        test suite for this project, simply run:
        <Code type="block" text="test" />
        Garden also has a <span class="bold">powerful caching</span> mechanism built-in. Try running
        the test again without making any changes to the code.
        <br />
        <br />
        If the test passed the first time, Garden will simply return the cached test results.
        <br />
        <br />
        (Note that running the tests may re-deploy services and thereby disable hot reloading. You
        can re-enable it by running <Code text="deploy --sync" /> again.)
      </p>
    </div>
    <div v-if="currentPageName === 'tasks'">
      <h1>Tasks</h1>
      <p>
        Tasks are another Garden primitive that are useful for various set-up operations.
        <br />
        <br />
        For example, when you first ran <Code text="deploy" />, a task for initialising and seeding
        the database was executed.
        <br />
        <br />
        You can also run individual tasks directly. To reset the database to its original state,
        run:
        <Code type="block" text="run task db-clear" />
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
        <Code type="block" text="garden exec api /bin/sh" />
        You can exit from the process by typing <Code text="exit" /> and hitting enter.
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
        For next steps, we suggest heading to our docs to learn how you can start using Garden for
        your own projects. And to join our Discord community at...
        <br />
        <br />
        And if you really want to amplify your Garden experience and get expert help in getting
        started, check out our Garden Cloud offering for teams and enterprises.
      </p>
    </div>
  </div>
</template>

<script>
import Code from "./Code.vue";

export default {
  name: "GuidePages",

  data: () => ({
    usernameStr: process.env.VUE_APP_USERNAME ? ` ${process.env.VUE_APP_USERNAME}!` : "!",
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
      window.axios.get("/api", { headers }).then((res) => {
        self.serverGreeting = res.data;
      });
    },
  },

  components: {
    Code,
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
