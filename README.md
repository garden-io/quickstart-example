# Garden 5 Minute Quickstart Example

This is the GitHub repo for the example project from our [5 minute quickstart guide](https://docs.garden.io/basics/5-min-quickstart). This version is for Garden Bonsai (0.13), for older versions of Garden see [Quickstart 0.12](https://github.com/garden-io/quickstart-example/tree/0.12).

We encourage you to follow the steps of the guide before deploying the project.

## (Optional) Logging in to the Garden Dashboard

Garden has a web-based UI, Garden Dashboard, complementing the Garden Core CLI tool. The Dashboard is available at https://app.garden.io. It is optional to use the Dashboard when going through this quickstart guide.

If you try out the Dashboard, make sure to login on the command line using

```
garden login
```

After a successful login, all commands will be streamed through to the Garden Dashboard.

## Deploying the project

We have two options to deploy our quickstart example:

- Make use of our brand new interactive environments that can help you deploy the project faster. ✅
- You can also install the prerequisites in your computer and then follow the steps below. 💻

### Interactive environments

Simply click any of the two buttons below ⬇️

<a href="https://go.garden.io/killercoda"><img src="https://raw.githubusercontent.com/garden-io/garden-interactive-environments/main/resources/img/killercoda-logo.png" alt="Killercoda logo in black and white." height="55px"/></a> [![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://go.garden.io/cloudshell)

If you find any bugs 🐛 or have suggestions to improve our labs please don't hesitate in reaching out through an issue towards this [repository](https://github.com/garden-io/garden-interactive-environments/blob/main/resources/img/killercoda-logo.png) or ask through our [Discord Community](https://go.garden.io/discord)🌸

### Local Installation

> Make sure you have Garden installed and Kubernetes running locally (e.g. with Minikube or Docker for Desktop) before deploying the project.

First clone this repo with:

```bash
git clone https://github.com/garden-io/quickstart-example.git
```

Enter the Garden dev console.

```bash
garden dev
```

Then deploy the project with hot-reloading enabled by running:

```bash
deploy --sync
```

You can now visit the example project at http://vote.local.demo.garden.

The project itself doubles as an interactive guide that walks you through some common Garden commands and workflows. We encourage you to give it a spin!

Please send us your feedback or bug reports by opening a [GitHub issue in the Garden Core repository](https://github.com/garden-io/garden/issues).
