
#PKG_INFO

Given that one of the evaluation points is future mantainability I choose to adopt modern technologies with properly separated concerns, even if the scope of the assignment was so small.

I didn't use an example file, what you see is what's really installed on the machine.

###Running the application
There are 2 utility scripts under `/commands`.

- `start-dev` starts the app in dev mode
- `start-prod` starts the app in prod mode

Dev mode serves `frontend` trough webpack hot server on port `3000`.
Prod serves it trough `nginx`, which also serves as a reverse proxy for `backend`

In both cases the startup script also links the `/var/lib/dpkg/status` file to a local volume, which is mounted in the `backend` container.

###Docker

We have 2 containers in development, 3 in prod, with different behaviors depending on the env:

- `backend`
- `frontend`
- `nginx`

`backend` boots the API application which also reads the file and watches for changes during dev.

`frontend` builds the static assets on production or serves them trough `webpack-dev-server` in development.

`nginx` offers a reverse proxy to `backend` exposed under the `/api` endpoint

###Frontend

It's structured as follow:
    - The main application is injected in the `#root` container by React.
    - The top level container `Root` wrapps the app in a Redux Provider and an instance of React Router.
    - The `App` has 2 routes, with their own page components: `ListingPage`  and `DetailPage`.
    - Each page fetches data from the API when its route is hit and displays a spinner unil data is received.
    - When this happens it is informed and re-renders with proper UI.

Communication with the API is managed trough Redux
Css is modularized on component level, except some globals
HTML is kept to it's bare essentials

NOTE: `dev-server.js`, `webpack.config.js`, and `webpack.production.config.js` are slightly modified versions of a boilerplate, I didn't write those.

###Backend
Backend uses Express as a router and has a simple abstraction to read and parse the file.

The file parsing is done trough `Ramda.js` composed functions.
I never used such a syntax or library so I had to learn it on the fly.

