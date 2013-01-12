/**
 * Created with JetBrains PhpStorm.
 * User: shared
 * Date: 1/10/13
 * Time: 10:19 PM
 * shogishack.net(c)
 * To change this template use File | Settings | File Templates.
 */
var SSHACK = SSHACK || {};
SSHACK.namespace = function (ns_string) {
    var parts = ns_string.split('.'), parent = SSHACK, i;
    // strip redundant leading global
    if (parts[0] === "SSHACK") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
// create a property if it doesn't exist
        if (parent[parts[i]] === undefined) {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

 //   Stefanov, Stoyan (2010-09-09). JavaScript Patterns (Kindle Locations 2208-2214). O'Reilly Media. Kindle Edition.