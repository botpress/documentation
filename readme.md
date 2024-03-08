# Botpress Documentation

This repository contains the source code for the Botpress documentation website.

## Issues

Issues are disabled in the repository.

If you find any problems in the documentation, have any suggestions for the documentation or Botpress Cloud in general, or want to report a bug, please reach out to us on [our discord server](https://discord.gg/botpress).

This is to ensure your issue is addressed as soon as possible and to keep all the information in one place.

## Contributions

If you feel like addressing a documentation issue yourself, you can contribute by raising a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) directly on this Github Repo.

There are two ways to contribute to the documentation:

1. Run the documentation locally and make changes to the documentation files.
2. Click on the **Edit this Page** link on the documentation page and make changes directly on the Github Repo. ![Alt text](public/content/contributing.png) _The **Feedback** and **Edit this page** links can be found on the bottom right corner of most pages_

In both cases you will need to raise a Pull Request to get your changes merged into the main branch.

### Previews

When you raise a PR, after a few minutes you can inspect the preview link of the change you made. Click on the **Visit Preview** preview link. 💡 _Please make sure you append `/docs` at the end of the link_.

### Approval Process

Before your change is reflected on the live documentation website, your PR has to be approved by two members of the Botpress team. Though we try to act on every PR as soon as possible, in some cases this process might take up to few weeks.

## Local Development

### Prerequisites

- [`node`](https://nodejs.org/en/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [`pnpm`](https://pnpm.io/): Fast, disk space efficient package manager.
- [`Tilt`](https://tilt.dev/): A toolkit for fixing the pains of microservice development.
- [`docker`](https://www.docker.com/): Docker is an OCI container toolkit

### Running the project

1. Install prerequisites
1. Run the following command:

   ```bash
   tilt up
   ```

   A "Tilt started on https://localhost:XYZ/" message will appear in the terminal. You can open the link to see the status.

1. Wait for all resources to have loaded.

1. Open [http://localhost:3000/docs](http://localhost:3000/docs) with your browser and you should see the local instance of documentation running.

### About Nextra and Next.js

This projects is based on [Nextra](https://nextra.site/) which is built on top of [Next.js](https://nextjs.org/). Although knowledge of these is not a prerequisite for contributing, here are some links to quickly get you started on some concepts used in this project:

1. [Nextra Markdown Guide](https://nextra.site/docs/guide/markdown)
2. [Nextra Page Configuration](https://nextra.site/docs/docs-theme/page-configuration)
3. [Next.js Routing](https://nextjs.org/docs/pages/building-your-application/routing)
