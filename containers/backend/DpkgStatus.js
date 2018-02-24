const fs = require('fs')
const R = require('ramda')


module.exports = class DpkgStatus {
    constructor(filename) {
        const file = fs.readFileSync(filename, 'utf8');
        this._packages = this._parsePackages(file);
        this._packages = this._buildReverseDependencies(this._packages);
    }

    lookup(name) {
        console.info('[Lookup] - {', name, '}');
        const lookup = R.find(R.whereEq({'Package': name}));
        return lookup(this._packages);
    }

    getListing() {
        const listing = R.map(R.prop('Package'));
        return listing(this._packages);
    }

    _parsePackages(file) {
        const rejectEmpty = R.reject(s => s == '');
        const toPackages = R.compose(R.map(this._parsePackage), rejectEmpty, R.split('\n\n'));
        return toPackages(file);
    }

    _parsePackage(p) {
        //Note: I never used Ramda (or something even close) before so I had to understand it overnight.
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
        const toKeyValuePairList = R.compose(
            R.fromPairs(),
            R.of(),
            R.slice(1, 3),
            R.match(/(.+?):\s(.*)/)
        );

        const toPackage = R.compose(R.mergeAll, R.map(toKeyValuePairList), toSegments, toLines);

        const pack = toPackage(p);

        if (pack['Depends']) {
            const cleanup = R.compose(R.trim, R.replace(/(\(.*\))/, ''));
            const breakDependencies = R.compose(R.map(cleanup), R.chain(R.split('|')), R.split(','));
            pack['Depends'] = breakDependencies(pack['Depends'])
        } else {
            pack['Depends'] = [];
        }

        return pack;
    }

    _addPackageRevDep(pack) {
        const name = R.prop('Package')(pack);

        const hasNoDependencies = R.compose(R.isNil, R.prop('Depends'));
        const cleanPacks = R.reject(hasNoDependencies);
        const findDepending = R.filter(R.where({
            'Depends': R.contains(name)
        }));

        const findRevDep = R.compose(findDepending, cleanPacks);
        const revDep = findRevDep(this._packages);

        const revDependenciesList = R.map(R.prop('Package'))(revDep);
        return R.merge(pack, {'Reverse-Dependencies': revDependenciesList});
    }

    _buildReverseDependencies(packages) {
        return R.map(this._addPackageRevDep.bind(this), packages);
    }
}


