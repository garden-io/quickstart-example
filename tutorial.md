# Garden quickstart for Cloud Shell

## Let's get started

This quickstart will show you how to start a minikube cluster and deploy a simple application to it using Garden.

* **Setup your environment**
  * Install Garden and start a k3d Kubernetes cluster you'll use to deploy your app to.
* **Deploy the app**
  * You will be guided through the process of deploying a simple app to the cluster using Garden.
* **Explore the dev console**
  * Run tests, view logs, and more.
___

**Time to complete**: <walkthrough-tutorial-duration duration=5></walkthrough-tutorial-duration>
Click the **Start** button to move to the next step.

## Setup your environment

### Open the Cloud Shell

Open Cloud Shell by clicking
<walkthrough-cloud-shell-icon></walkthrough-cloud-shell-icon> in the navigation bar at the top of the console.

### Run the setup script

Run the start script to prepare the environment. The script will install the latest version of `garden` and its dependencies, and start a local k3d Kubernetes cluster.

```bash
chmod +x start.sh && ./start.sh
```

## Deploy the app

Garden ships with an interactive command center we call the **dev console**. To start the dev console, run:

```sh
garden dev
```

The first time you run `garden dev`, Garden will initialize then await further instructions inside a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). From inside the REPL you can command Garden to build, test, and deploy your project.

After running `garden dev`, you're ready to deploy your project. Run:

```sh
deploy
```

If you receive an error like the following, wait until the `deploy` has finished, then try again:

```terminal
Unable to connect to the server: stream error: stream ID 1; INTERNAL_ERROR; received from peer
```

### Try it out

The dev console will print a `localhost` URL you can use to access the app. Open it by clicking the URL in the dev console or access it by tapping this link -> http://localhost:30000 and cast your vote!

![vote UI](https://github.com/garden-io/quickstart-example/assets/59834693/f120848a-7467-40f8-840c-791b7b4a8fb2)

## Explore the dev console

Still in the dev console, run a unit test:

```sh
test unit-vote
```
 
And end-to-end tests:

```sh
test e2e
```

### Make your own

These are tests shipped in the quickstart. Inspect their contents (or write your own!) by opening the `garden.yml` files inside the `vote` and `result` directories.

### Cleanup

Cleanup your environment with:

```
cleanup namespace
```

And exit the dev console by typing:

```sh
exit
````

## Next Steps

<walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>

Now that you have Garden installed and seen its basic capabilities it's time to take the next steps.

If you'd like to better understand how a Garden project is configured, we recommend going
through our [first project tutorial](https://docs.garden.io/tutorials/your-first-project) which walks you through configuring a Garden project step-by-step.

If you like to dive right in and configure your own project for Garden, we recommend referencing our [example
projects on GitHub](https://github.com/garden-io/garden/tree/main/examples) and the section of our docs titled [Using Garden](https://docs.garden.io/using-garden/configuration-overview), which covers all parts of Garden in detail.


If you have any questions or feedback—or just want to say hi 🙂—we encourage you to join our [Discord community](https://go.garden.io/discord)!
