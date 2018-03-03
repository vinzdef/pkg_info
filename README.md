
# PKG_INFO

You can see it in action here: http://159.65.204.100:8080/

![listing page screenshot](https://raw.githubusercontent.com/ghzmdr/pkg_info/master/docs/img/listing.png)

![detail page screenshot](https://raw.githubusercontent.com/ghzmdr/pkg_info/master/docs/img/detail.png)

### Running the application

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


### Docker

We have 3 containers:

- `backend`
- `frontend`
- `nginx`

`backend`: boots the API application which reads the file and listens on port `8000`.

`frontend`: in dev it boots up a `webpack-dev-server`, on prod it builds it statically and places the output in `/volumes/static/`.

`nginx`: offers a reverse proxy to `backend` exposed under the `/api` endpoint.
On dev it also reverse proxies to `webpack-dev-server`, while on prod it serves the static frontend.


### Frontend

It's structured as follow:
    - The main application markup is injected in the `#root` container by React.
    - The top level container `Root` wrapps the app in a Redux Provider and an instance of React Router.
    - The `App` has 2 routes, with their own page components: `ListingPage`  and `DetailPage`.
    - Each page triggers a `fetch` action to obtain the data it needs from the API.
    - When this is received it re-renders with proper UI.

- Communication with the API is managed trough Redux
- Css is modularized on component level, except some globals
- HTML is kept to it's bare essentials

### Backend

Backend uses Express as a router and has a simple abstraction to read and parse the file.

The file parsing is done trough `Ramda.js` composed functions.
I never used such a syntax or library so I had to learn it on the fly.


NOTE: Everything has been written by me some boilerplate files like `dev-server.js`, `webpack.config.js`, and `webpack.production.config.js` which are slightly modified versions of a boilerplate.

Enjoy looking at my packages!
- Vincent
