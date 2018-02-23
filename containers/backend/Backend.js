const express = require('express');
const cors = require('cors')
const DpkgStatus = require('./DpkgStatus');

module.exports = class Backend {
    constructor() {
        this._dpkgStatus = new DpkgStatus('/data/dpkg_status');
        this._express = express();

        this._express.use(cors());
        this._express.get('/api/packages', this._listing.bind(this));
        this._express.get('/api/packages/:name', this._detail.bind(this));
    }

    listen(port) {
        this._express.listen(port);
        console.info(`[BACKEND] Listening on ${port}`);
    }

    _listing(req, res) {
        console.log('listing')
        const listing = this._dpkgStatus.getListing();
        res.send(JSON.stringify(listing));
    }

    _detail(req, res) {
        console.log('listing')
        const {name} = req.params;
        const match = this._dpkgStatus.lookup(name);
        res.send(JSON.stringify(match));
    }
}
