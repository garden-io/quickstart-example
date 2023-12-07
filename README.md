<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-production-user-asset-6210df.s3.amazonaws.com/658727/272340510-34957be5-7318-4473-8141-2751ca571c4f.png">
    <source media="(prefers-color-scheme: light)" srcset="https://github-production-user-asset-6210df.s3.amazonaws.com/658727/272340472-ad8d7a46-ef85-47ea-9129-d815206ed2f6.png">
    <img alt="Garden" src="https://github-production-user-asset-6210df.s3.amazonaws.com/658727/272340472-ad8d7a46-ef85-47ea-9129-d815206ed2f6.png">
  </picture>
</p>
<div align="center">
  <a href="https://garden.io/?utm_source=github-quickstart">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://docs.garden.io/?utm_source=github-quickstart">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/garden-io/garden/tree/0.13.21/examples">Examples</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://garden.io/blog/?utm_source=github-quickstart">Blog</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://go.garden.io/discord">Discord</a>
</div>

## Welcome to Garden's Quickstart Example 👋

This repository contains the Garden Quickstart example. Please see our [Quickstart Guide](https://docs.garden.io/basics/quickstart) for step-by-step instructions on how to deploy this project. If you see any issues or bugs, kindly report them
to the [main Garden repo](https://github.com/garden-io/garden/issues/new).

![Deploying the quickstart example](https://github.com/garden-io/quickstart-example/assets/5373776/5bde4656-0c6f-4ace-ad17-7f5feb4d9c23)

## About the Project

This project is a voting application that's meant to resemble a typical (if simplified) microservice architecture that runs on Kubernetes.
The goal is to demonstrate how you can use Garden to build, develop, and test applications like this.

The project also doubles as an interactive guide that walks you through some common Garden commands and workflows. We encourage you to give it a spin!

It's a good reference for how to _configure_ a Garden project but please don't take the application source code too seriously,
it's of mixed quality :)

### Garden Plugins

In this example we use the `ephmeral-kubernetes` plugin to deploy the project to a zero-config, ephemeral, Garden managed cluster that's spun up on-demand.
It's the quickest way to get started with Garden and this is the "quickstart" example after all.

If you'd rather deploy it to your own cluster, you can update the values in
the [`project.garden.yml`](https://github.com/garden-io/quickstart-example/blob/main/project.garden.yml) file.
To learn more about our different K8s plugins, check out [our documentation](https://docs.garden.io/kubernetes-plugins/about).

### Garden Actions

The project has the following micro services:

- `vote`—a frontend Vue application
- `api`—a Python server that receives votes from the `vote` frontend and pushes them to a message queue
- `redis`—a Redis deployment that's used as a message queue
- `worker`—a Java worker service that reads votes from the queue and pushes them to a database
- `db`—a Postgres database for storing the votes
- `result`—a Node.js websocket server that reads messages from the database and sends back to the `vote` client

These services are built, deployed, and tested with [Garden actions](https://docs.garden.io/overview/core-concepts#action).

Specifically, the `vote`, `api`, and `result` services all have their own Kubernetes manifests so we use the `container` Build action to build them
and the `kubernetes` Deploy action to deploy them.

The `redis` and `db` services are "off the shelf" Helm charts that are deployed via the `helm` Deploy action.

Finally the `worker` service is built and deployed via the `container` Build and Deploy actions respectively. Garden will generate the Kubernetes
manifests for you when using the `container` Deploy action which is useful for getting started quickly if you don't have those already—
but in general we recommend using your existing charts or manifests with Garden.

You can learn more about the Kubernetes action types [in our docs](https://docs.garden.io/kubernetes-plugins/action-types).
