
#PKG_INFO

Given that one of the evaluation points is future mantainability I choose to adopt modern technologies with properly separated concerns, even if the scope of the assignment was so small.

I didn't use an example file, what you see is what's really installed on the machine that's running the app.

You can see it in action here: http://159.65.204.100:8080/
It's hosted on a bespoke Digital Ocean droplet (I will shut it down in max 2 weeks).

The repository is located at:
https://bitbucket.org/pkg_info/pkg_info

Kanban board where I logged times (not super accurate but a good overview):
https://kanbanflow.com/board/tP5Wj8Qi

Both of these links are private so I need to add your email for you to see them.


###Running the application

You received a zip file or a link to the main repo.
Once you have placed those contents in a clean directory you can start the application as follows:

There are 2 startup scripts under `/commands`.

- `start-dev.sh` starts the app in dev mode
- `start-prod.sh` starts the app in prod mode

These will:

- link necessary files (`/var/lib/dpkg/status`).
- kill previous instances
- boot the `docker-compose` system

Dev is intended to be used locally and uses a dynamic frontend (HMR/livereload not working), on Prod the frontend is built statically under `/volumes/static`.
The `nginx` config also reflects this on both environments.

Run one of the two commands, navigate to http://localhost:8080

__NOTE__: If you're on a system that does not have (or can't read) `/var/lib/dpkg/status` then you have to place a dummy file under `/volumes/data/dpkg_status` manually before booting the application.


###Docker

We have 3 containers:

- `backend`
- `frontend`
- `nginx`

`backend`: boots the API application which reads the file and listens on port `8000`.

`frontend`: in dev it boots up a `webpack-dev-server`, on prod it builds it statically and places the output in `/volumes/static/`.

`nginx`: offers a reverse proxy to `backend` exposed under the `/api` endpoint.
On dev it also reverse proxies to `webpack-dev-server`, while on prod it serves the static frontend.


###Frontend

It's structured as follow:
    - The main application markup is injected in the `#root` container by React.
    - The top level container `Root` wrapps the app in a Redux Provider and an instance of React Router.
    - The `App` has 2 routes, with their own page components: `ListingPage`  and `DetailPage`.
    - Each page triggers a `fetch` action to obtain the data it needs from the API.
    - When this is received it re-renders with proper UI.

- Communication with the API is managed trough Redux
- Css is modularized on component level, except some globals
- HTML is kept to it's bare essentials

###Backend

Backend uses Express as a router and has a simple abstraction to read and parse the file.

The file parsing is done trough `Ramda.js` composed functions.
I never used such a syntax or library so I had to learn it on the fly.


NOTE: Everything has been written by me some boilerplate files like `dev-server.js`, `webpack.config.js`, and `webpack.production.config.js` which are slightly modified versions of a boilerplate.

Enjoy looking at my packages!
- Vincent
