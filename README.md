# Garden 5 Minute Quickstart Example

This is the GitHub repo for the example project from our [5 minute quickstart guide](https://docs.garden.io/quickstart).

We encourage you to follow the steps of the guide before deploying the project.

## (Optional) Logging in to the Garden web UI

Garden has a web app complementing the Garden Core CLI tool. The web app is available at https://app.garden.io. It is optional to use the web app when going through this quickstart guide.

If you try out the web app, make sure to login on the command line using

```
garden login
```

After a successful login, all commands will be streamed through to the Garden web app.

## Deploying the project

> Make sure you have Garden installed and Kubernetes running locally (e.g. with Minikube or Docker for Desktop) before deploying the project.

First clone this repo with:

```
git clone https://github.com/garden-io/quickstart-example.git
```

Enter the Garden REPL.

```
garden dev
```

Then deploy the project in with hot-reloading by running

```
deploy --sync
```

You can now visit the example project at http://vote.local.demo.garden.

The project itself doubles as an interactive guide that walks you through some common Garden commands and workflows. We encourage you to give it a spin!

Please send us your feedback or bug reports by opening a [GitHub issue in the Garden Core repository](https://github.com/garden-io/garden/issues).
