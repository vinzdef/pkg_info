const fs = require('fs')
const R = require('ramda')

//Note: I never used Ramda (or something even close) before so I had to understand it overnight.

module.exports = class DpkgStatus {
    constructor(filename) {
        const file = fs.readFileSync(filename, 'utf8');
        this._packages = this._parsePackages(file);
    }

    lookup(name) {
        const lookup = R.find(R.whereEq({'Package': name}));
        return lookup(this._packages);
    }

    getListing() {
        const listing = R.map(R.prop('Package'));
        return listing(this._packages);
    }

    _parsePackages(file) {
        const toPackages = R.compose(R.map(this._parsePackage), R.split('\n\n'));
        return toPackages(file);
    }

    _parsePackage(p) {
        const toLines = R.split('\n');

        const propReducer = function(acc, value) {
            if (value.match(/^\s/)) {
                acc[acc.length -1] += value
            } else {
                acc.push(value)
            }
            return acc
        }

        const toSegments = R.reduce(propReducer, []);
        const toKeyValue = R.compose(R.fromPairs(), R.of(), R.slice(1, 3), R.match(/(.+?):\s(.*)/));
        const toPackage = R.compose(R.mergeAll, R.map(toKeyValue), toSegments, toLines);

        const cleanup = R.compose(R.trim, R.replace(/(\(.*\))/, ''));
        const breakDependencies = R.compose(R.map(cleanup), R.chain(R.split('|')), R.split(','));

        const pack = toPackage(p);

        if (pack['Depends']) {
            pack['Depends'] = breakDependencies(pack['Depends'])
        }

        return pack;
    }
}


