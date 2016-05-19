/**
 * Created by asakalou on 5/4/16.
 */

Object.prototype.safeGet = function(field) {
    "use strict";
    var keys = field.split('.'),
        value = this;

    for (var i = 0; i < keys.length; ++i) {
        if (value != null) {
            value = value[keys[i]];
        } else {
            return null;
        }
    }

    return value;
};