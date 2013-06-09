function noty(options) {
    var using_old = 0, old_to_new = {
        animateOpen: "animation.open",
        animateClose: "animation.close",
        easing: "animation.easing",
        speed: "animation.speed",
        onShow: "callback.onShow",
        onShown: "callback.afterShow",
        onClose: "callback.onClose",
        onClosed: "callback.afterClose"
    };
    return jQuery.each(options, function(key, value) {
        if (old_to_new[key]) {
            using_old++;
            var _new = old_to_new[key].split(".");
            options[_new[0]] || (options[_new[0]] = {}), options[_new[0]][_new[1]] = value ? value : function() {}, 
            delete options[key];
        }
    }), options.closeWith || (options.closeWith = jQuery.noty.defaults.closeWith), options.hasOwnProperty("closeButton") && (using_old++, 
    options.closeButton && options.closeWith.push("button"), delete options.closeButton), 
    options.hasOwnProperty("closeOnSelfClick") && (using_old++, options.closeOnSelfClick && options.closeWith.push("click"), 
    delete options.closeOnSelfClick), options.hasOwnProperty("closeOnSelfOver") && (using_old++, 
    options.closeOnSelfOver && options.closeWith.push("hover"), delete options.closeOnSelfOver), 
    options.hasOwnProperty("custom") && (using_old++, "null" != options.custom.container && (options.custom = options.custom.container)), 
    options.hasOwnProperty("cssPrefix") && (using_old++, delete options.cssPrefix), 
    "noty_theme_default" == options.theme && (using_old++, options.theme = "default"), 
    options.hasOwnProperty("dismissQueue") || (options.dismissQueue = "topLeft" == options.layout || "topRight" == options.layout || "bottomLeft" == options.layout || "bottomRight" == options.layout ? !0 : !1), 
    options.buttons && jQuery.each(options.buttons, function(i, button) {
        button.click && (using_old++, button.onClick = button.click, delete button.click), 
        button.type && (using_old++, button.addClass = button.type, delete button.type);
    }), using_old && console.warn("You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options."), 
    jQuery.notyRenderer.init(options);
}

"object" != typeof JSON && (JSON = {}), function() {
    "use strict";
    function f(n) {
        return 10 > n ? "0" + n : n;
    }
    function quote(string) {
        return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return "string" == typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k, v, length, partial, mind = gap, value = holder[key];
        switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), 
        "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
          case "string":
            return quote(value);

          case "number":
            return isFinite(value) ? value + "" : "null";

          case "boolean":
          case "null":
            return value + "";

          case "object":
            if (!value) return "null";
            if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
                for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
                return v = 0 === partial.length ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", 
                gap = mind, v;
            }
            if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1) "string" == typeof rep[i] && (k = rep[i], 
            v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v)); else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), 
            v && partial.push(quote(k) + (gap ? ": " : ":") + v));
            return v = 0 === partial.length ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", 
            gap = mind, v;
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf();
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(value, replacer, space) {
        var i;
        if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " "; else "string" == typeof space && (indent = space);
        if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw Error("JSON.stringify");
        return str("", {
            "": value
        });
    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && "object" == typeof value) for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), 
            void 0 !== v ? value[k] = v : delete value[k]);
            return reviver.call(holder, key, value);
        }
        var j;
        if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), 
        "function" == typeof reviver ? walk({
            "": j
        }, "") : j;
        throw new SyntaxError("JSON.parse");
    });
}(), function() {
    var root = this, previousUnderscore = root._, breaker = {}, ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty, nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, _ = function(obj) {
        return obj instanceof _ ? obj : this instanceof _ ? (this._wrapped = obj, void 0) : new _(obj);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), 
    exports._ = _) : root._ = _, _.VERSION = "1.4.4";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null != obj) if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; l > i; i++) if (iterator.call(context, obj[i], i, obj) === breaker) return;
        } else for (var key in obj) if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return;
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeMap && obj.map === nativeMap ? obj.map(iterator, context) : (each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        }), results);
    };
    var reduceError = "Reduce of empty array with no initial value";
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), 
        initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        if (each(obj, function(value, index, list) {
            initial ? memo = iterator.call(context, memo, value, index, list) : (memo = value, 
            initial = !0);
        }), !initial) throw new TypeError(reduceError);
        return memo;
    }, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), 
        initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        if (each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length, initial ? memo = iterator.call(context, memo, obj[index], index, list) : (memo = obj[index], 
            initial = !0);
        }), !initial) throw new TypeError(reduceError);
        return memo;
    }, _.find = _.detect = function(obj, iterator, context) {
        var result;
        return any(obj, function(value, index, list) {
            return iterator.call(context, value, index, list) ? (result = value, !0) : void 0;
        }), result;
    }, _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) : (each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) && (results[results.length] = value);
        }), results);
    }, _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list);
        }, context);
    }, _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !0;
        return null == obj ? result : nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) : (each(obj, function(value, index, list) {
            return (result = result && iterator.call(context, value, index, list)) ? void 0 : breaker;
        }), !!result);
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !1;
        return null == obj ? result : nativeSome && obj.some === nativeSome ? obj.some(iterator, context) : (each(obj, function(value, index, list) {
            return result || (result = iterator.call(context, value, index, list)) ? breaker : void 0;
        }), !!result);
    };
    _.contains = _.include = function(obj, target) {
        return null == obj ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
            return value === target;
        });
    }, _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2), isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    }, _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    }, _.where = function(obj, attrs, first) {
        return _.isEmpty(attrs) ? first ? null : [] : _[first ? "find" : "filter"](obj, function(value) {
            for (var key in attrs) if (attrs[key] !== value[key]) return !1;
            return !0;
        });
    }, _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, !0);
    }, _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -1/0;
        var result = {
            computed: -1/0,
            value: -1/0
        };
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            });
        }), result.value;
    }, _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return 1/0;
        var result = {
            computed: 1/0,
            value: 1/0
        };
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            result.computed > computed && (result = {
                value: value,
                computed: computed
            });
        }), result.value;
    }, _.shuffle = function(obj) {
        var rand, index = 0, shuffled = [];
        return each(obj, function(value) {
            rand = _.random(index++), shuffled[index - 1] = shuffled[rand], shuffled[rand] = value;
        }), shuffled;
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value];
        };
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a) return 1;
                if (b > a || void 0 === b) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), "value");
    };
    var group = function(obj, value, context, behavior) {
        var result = {}, iterator = lookupIterator(value || _.identity);
        return each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
        }), result;
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : result[key] = []).push(value);
        });
    }, _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
            _.has(result, key) || (result[key] = 0), result[key]++;
        });
    }, _.sortedIndex = function(array, obj, iterator, context) {
        iterator = null == iterator ? _.identity : lookupIterator(iterator);
        for (var value = iterator.call(context, obj), low = 0, high = array.length; high > low; ) {
            var mid = low + high >>> 1;
            value > iterator.call(context, array[mid]) ? low = mid + 1 : high = mid;
        }
        return low;
    }, _.toArray = function(obj) {
        return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : [];
    }, _.size = function(obj) {
        return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length;
    }, _.first = _.head = _.take = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[0] : slice.call(array, 0, n);
    }, _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n));
    }, _.last = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0));
    }, _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n);
    }, _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, output) {
        return each(input, function(value) {
            _.isArray(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value);
        }), output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    }, _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    }, _.uniq = _.unique = function(array, isSorted, iterator, context) {
        _.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
        var initial = iterator ? _.map(array, iterator, context) : array, results = [], seen = [];
        return each(initial, function(value, index) {
            (isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), 
            results.push(array[index]));
        }), results;
    }, _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments));
    }, _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    }, _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    }, _.zip = function() {
        for (var args = slice.call(arguments), length = _.max(_.pluck(args, "length")), results = Array(length), i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
        return results;
    }, _.object = function(list, values) {
        if (null == list) return {};
        for (var result = {}, i = 0, l = list.length; l > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result;
    }, _.indexOf = function(array, item, isSorted) {
        if (null == array) return -1;
        var i = 0, l = array.length;
        if (isSorted) {
            if ("number" != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
            i = 0 > isSorted ? Math.max(0, l + isSorted) : isSorted;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (;l > i; i++) if (array[i] === item) return i;
        return -1;
    }, _.lastIndexOf = function(array, item, from) {
        if (null == array) return -1;
        var hasIndex = null != from;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        for (var i = hasIndex ? from : array.length; i--; ) if (array[i] === item) return i;
        return -1;
    }, _.range = function(start, stop, step) {
        1 >= arguments.length && (stop = start || 0, start = 0), step = arguments[2] || 1;
        for (var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = Array(len); len > idx; ) range[idx++] = start, 
        start += step;
        return range;
    }, _.bind = function(func, context) {
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        var args = slice.call(arguments, 2);
        return function() {
            return func.apply(context, args.concat(slice.call(arguments)));
        };
    }, _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(slice.call(arguments)));
        };
    }, _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        return 0 === funcs.length && (funcs = _.functions(obj)), each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        }), obj;
    }, _.memoize = function(func, hasher) {
        var memo = {};
        return hasher || (hasher = _.identity), function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
        };
    }, _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    }, _.defer = function(func) {
        return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
    }, _.throttle = function(func, wait) {
        var context, args, timeout, result, previous = 0, later = function() {
            previous = new Date(), timeout = null, result = func.apply(context, args);
        };
        return function() {
            var now = new Date(), remaining = wait - (now - previous);
            return context = this, args = arguments, 0 >= remaining ? (clearTimeout(timeout), 
            timeout = null, previous = now, result = func.apply(context, args)) : timeout || (timeout = setTimeout(later, remaining)), 
            result;
        };
    }, _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this, args = arguments, later = function() {
                timeout = null, immediate || (result = func.apply(context, args));
            }, callNow = immediate && !timeout;
            return clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && (result = func.apply(context, args)), 
            result;
        };
    }, _.once = function(func) {
        var memo, ran = !1;
        return function() {
            return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, 
            memo);
        };
    }, _.wrap = function(func, wrapper) {
        return function() {
            var args = [ func ];
            return push.apply(args, arguments), wrapper.apply(this, args);
        };
    }, _.compose = function() {
        var funcs = arguments;
        return function() {
            for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
            return args[0];
        };
    }, _.after = function(times, func) {
        return 0 >= times ? func() : function() {
            return 1 > --times ? func.apply(this, arguments) : void 0;
        };
    }, _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
        return keys;
    }, _.values = function(obj) {
        var values = [];
        for (var key in obj) _.has(obj, key) && values.push(obj[key]);
        return values;
    }, _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj) _.has(obj, key) && pairs.push([ key, obj[key] ]);
        return pairs;
    }, _.invert = function(obj) {
        var result = {};
        for (var key in obj) _.has(obj, key) && (result[obj[key]] = key);
        return result;
    }, _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort();
    }, _.extend = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source) for (var prop in source) obj[prop] = source[prop];
        }), obj;
    }, _.pick = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        return each(keys, function(key) {
            key in obj && (copy[key] = obj[key]);
        }), copy;
    }, _.omit = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
        return copy;
    }, _.defaults = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source) for (var prop in source) null == obj[prop] && (obj[prop] = source[prop]);
        }), obj;
    }, _.clone = function(obj) {
        return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj;
    }, _.tap = function(obj, interceptor) {
        return interceptor(obj), obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className != toString.call(b)) return !1;
        switch (className) {
          case "[object String]":
            return a == b + "";

          case "[object Number]":
            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return !1;
        for (var length = aStack.length; length--; ) if (aStack[length] == a) return bStack[length] == b;
        aStack.push(a), bStack.push(b);
        var size = 0, result = !0;
        if ("[object Array]" == className) {
            if (size = a.length, result = size == b.length) for (;size-- && (result = eq(a[size], b[size], aStack, bStack)); ) ;
        } else {
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return !1;
            for (var key in a) if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;
            if (result) {
                for (key in b) if (_.has(b, key) && !size--) break;
                result = !size;
            }
        }
        return aStack.pop(), bStack.pop(), result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    }, _.isEmpty = function(obj) {
        if (null == obj) return !0;
        if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
        for (var key in obj) if (_.has(obj, key)) return !1;
        return !0;
    }, _.isElement = function(obj) {
        return !(!obj || 1 !== obj.nodeType);
    }, _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj);
    }, _.isObject = function(obj) {
        return obj === Object(obj);
    }, each([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) == "[object " + name + "]";
        };
    }), _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !(!obj || !_.has(obj, "callee"));
    }), _.isFunction = function(obj) {
        return "function" == typeof obj;
    }, _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    }, _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    }, _.isBoolean = function(obj) {
        return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj);
    }, _.isNull = function(obj) {
        return null === obj;
    }, _.isUndefined = function(obj) {
        return void 0 === obj;
    }, _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    }, _.noConflict = function() {
        return root._ = previousUnderscore, this;
    }, _.identity = function(value) {
        return value;
    }, _.times = function(n, iterator, context) {
        for (var accum = Array(n), i = 0; n > i; i++) accum[i] = iterator.call(context, i);
        return accum;
    }, _.random = function(min, max) {
        return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1));
    };
    var entityMap = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
        unescape: RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
    };
    _.each([ "escape", "unescape" ], function(method) {
        _[method] = function(string) {
            return null == string ? "" : ("" + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    }), _.result = function(object, property) {
        if (null == object) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    }, _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [ this._wrapped ];
                return push.apply(args, arguments), result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    }, _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/, escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g"), index = 0, source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escaper, function(match) {
                return "\\" + escapes[match];
            }), escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"), 
            interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"), 
            evaluate && (source += "';\n" + evaluate + "\n__p+='"), index = offset + match.length, 
            match;
        }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), 
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            render = Function(settings.variable || "obj", "_", source);
        } catch (e) {
            throw e.source = source, e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", 
        template;
    }, _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_), each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            return method.apply(obj, arguments), "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0], 
            result.call(this, obj);
        };
    }), each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    }), _.extend(_.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}.call(this), function(window, undefined) {
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        return jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, ret, internalKey = jQuery.expando, getByName = "string" == typeof name, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined) return id || (isNode ? elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++ : id = internalKey), 
            cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var i, l, thisCache, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" "));
                    for (i = 0, l = name.length; l > i; i++) delete thisCache[name[i]];
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
            }
        }
    }
    function dataAttr(elem, key, data) {
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = undefined;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function winnow(elements, qualifier, keep) {
        if (qualifier = qualifier || 0, jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            var retVal = !!qualifier.call(elem, i, elem);
            return retVal === keep;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier === keep;
        });
        if ("string" == typeof qualifier) {
            var filtered = jQuery.grep(elements, function(elem) {
                return 1 === elem.nodeType;
            });
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, filtered, !keep);
            qualifier = jQuery.filter(qualifier, filtered);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 === keep;
        });
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
    }
    function disableScript(elem) {
        var attr = elem.getAttributeNode("type");
        return elem.type = (attr && attr.specified) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && manipulation_rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
        }
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        manipulation_rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function isHidden(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function css_defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write("<!doctype html><html><body>"), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], "display");
        return elem.remove(), display;
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : undefined : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
        for (type in responseFields) type in responses && (jqXHR[responseFields[type]] = responses[type]);
        for (;"*" === dataTypes[0]; ) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : undefined;
    }
    function ajaxConvert(s, response) {
        var conv2, current, conv, tmp, converters = {}, i = 0, dataTypes = s.dataTypes.slice(), prev = dataTypes[0];
        if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (;current = dataTypes[++i]; ) if ("*" !== current) {
            if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
                tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                    conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                    dataTypes.splice(i--, 0, current));
                    break;
                }
                if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                    response = conv(response);
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                }
            }
            prev = current;
        }
        return {
            state: "success",
            data: response
        };
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined;
        }), fxNow = jQuery.now();
    }
    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (collection[index].call(animation, prop, value)) return;
        });
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function propFilter(props, specialEasing) {
        var value, name, index, easing, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, index, length, value, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (index in props) if (value = props[index], rfxtypes.exec(value)) {
            if (delete props[index], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) continue;
            handled.push(index);
        }
        if (length = handled.length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), "hidden" in dataShow && (hidden = dataShow.hidden), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (index = 0; length > index; index++) prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), 
            orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, 
            hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var readyList, rootjQuery, core_strundefined = typeof undefined, document = window.document, location = window.location, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = "1.9.1", core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    }, completed = function(event) {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }, detach = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), 
        window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
                !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                    rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this;
                }
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    this.length = 1, this[0] = elem;
                }
                return this.context = document, this.selector = selector, this;
            }
            return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
            this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, 
            this.context = selector.context), jQuery.makeArray(selector, this));
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return core_slice.call(this);
        },
        get: function(num) {
            return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            return jQuery.ready.promise().done(fn), this;
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, 
        i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), 
        length === i && (target = this, --i); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target;
    }, jQuery.extend({
        noConflict: function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
            jQuery;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
                jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"));
            }
        },
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function(obj) {
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            var key;
            for (key in obj) ;
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        error: function(msg) {
            throw Error(msg);
        },
        parseHTML: function(data, context, keepScripts) {
            if (!data || "string" != typeof data) return null;
            "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
            var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
            return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
            scripts && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
        },
        parseJSON: function(data) {
            return window.JSON && window.JSON.parse ? window.JSON.parse(data) : null === data ? data : "string" == typeof data && (data = jQuery.trim(data), 
            data && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) ? Function("return " + data)() : (jQuery.error("Invalid JSON: " + data), 
            undefined);
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), 
                xml.async = "false", xml.loadXML(data));
            } catch (e) {
                xml = undefined;
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
            xml;
        },
        noop: function() {},
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: core_trim && !core_trim.call("﻿ ") ? function(text) {
            return null == text ? "" : core_trim.call(text);
        } : function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : core_push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" == typeof l) for (;l > j; j++) first[i++] = second[j]; else for (;second[j] !== undefined; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
            return ret;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && (ret[ret.length] = value);
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, length = elems.length, bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
            } else if (value !== undefined && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
            bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                return bulk.call(jQuery(elem), value);
            })), fn)) for (;length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
            return new Date().getTime();
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }), rootjQuery = jQuery(document);
    var optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    })(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], this;
            },
            disable: function() {
                return list = stack = memory = undefined, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = undefined, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = Array(length), progressContexts = Array(length), 
            resolveContexts = Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    }), jQuery.support = function() {
        var support, all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
        if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], !all || !a || !all.length) return {};
        select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), 
        input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", 
        support = {
            getSetAttribute: "t" !== div.className,
            leadingWhitespace: 3 === div.firstChild.nodeType,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: "/a" === a.getAttribute("href"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: !!input.value,
            optSelected: opt.selected,
            enctype: !!document.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === document.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, 
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = !1;
        }
        input = document.createElement("input"), input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, 
        input.setAttribute("checked", "t"), input.setAttribute("name", "t"), fragment = document.createDocumentFragment(), 
        fragment.appendChild(input), support.appendChecked = input.checked, support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.attachEvent && (div.attachEvent("onclick", function() {
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).click());
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) div.setAttribute(eventName = "on" + i, "t"), support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === !1;
        return div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, jQuery(function() {
            var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
            body.appendChild(container).appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", 
            support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", 
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, 
            window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, marginDiv = div.appendChild(document.createElement("div")), marginDiv.style.cssText = div.style.cssText = divReset, 
            marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
            support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), 
            typeof div.style.zoom !== core_strundefined && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", 
            support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", 
            div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, 
            support.inlineBlockNeedsLayout && (body.style.zoom = 1)), body.removeChild(container), 
            container = div = tds = marginDiv = null);
        }), all = select = fragment = opt = a = input = null, support;
    }();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        },
        acceptData: function(elem) {
            if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) return !1;
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== !0 && elem.getAttribute("classid") === noData;
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var attrs, name, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attrs = elem.attributes; attrs.length > i; i++) name = attrs[i].name, name.indexOf("data-") || (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : jQuery.access(this, function(value) {
                return value === undefined ? elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null : (this.each(function() {
                    jQuery.data(this, key, value);
                }), undefined);
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : undefined;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), hooks.cur = fn, fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), setter > arguments.length ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
            this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i, rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute, getSetInput = jQuery.support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = undefined, delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) 0 > cur.indexOf(" " + clazz + " ") && (cur += clazz + " ");
                elem.className = jQuery.trim(cur);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                elem.className = value ? jQuery.trim(cur) : "";
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value, isBool = "boolean" == typeof stateVal;
            return jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.match(core_rnotwhite) || []; className = classNames[i++]; ) state = isBool ? state : !self.hasClass(className), 
                self[state ? "addClass" : "removeClass"](className); else (type === core_strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        },
        val: function(value) {
            var ret, hooks, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val, self = jQuery(this);
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    !(!option.selected && i !== index || (jQuery.support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    return jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    }), values.length || (elem.selectedIndex = -1), values;
                }
            }
        },
        attr: function(elem, name, value) {
            var hooks, notxml, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === core_strundefined ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), 
            value === undefined ? hooks && notxml && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (typeof elem.getAttribute !== core_strundefined && (ret = elem.getAttribute(name)), 
            null == ret ? undefined : ret) : null !== value ? hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), 
            value) : (jQuery.removeAttr(elem, name), undefined));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            rboolean.test(name) ? !getSetAttribute && ruseDefault.test(name) ? elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    }), boolHook = {
        get: function(elem, name) {
            var prop = jQuery.prop(elem, name), attr = "boolean" == typeof prop && elem.getAttribute(name), detail = "boolean" == typeof prop ? getSetInput && getSetAttribute ? null != attr : ruseDefault.test(name) ? elem[jQuery.camelCase("default-" + name)] : !!attr : elem.getAttributeNode(name);
            return detail && detail.value !== !1 ? name.toLowerCase() : undefined;
        },
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return jQuery.nodeName(elem, "input") ? elem.defaultValue : ret && ret.specified ? ret.value : undefined;
        },
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? (elem.defaultValue = value, undefined) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ("id" === name || "name" === name || "coords" === name ? "" !== ret.value : ret.specified) ? ret.value : undefined;
        },
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : undefined;
        }
    }, jQuery.attrHooks.contenteditable = {
        get: nodeHook.get,
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : undefined;
            }
        });
    })), jQuery.support.hrefNormalized || (jQuery.each([ "href", "src", "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            get: function(elem) {
                var ret = elem.getAttribute(name, 2);
                return null == ret ? undefined : ret;
            }
        });
    }), jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    })), jQuery.support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || undefined;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    })), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.support.checkOn || jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            get: function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value;
            }
        };
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : undefined;
            }
        });
    });
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === core_strundefined || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(core_rnotwhite) || [ "" ], 
                t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], 
                namespaces = (tmp[2] || "").split(".").sort(), special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0;
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(core_rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = core_hasOwn.call(event, "type") ? event.type : event, namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = 0 > type.indexOf(":") && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = !0, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = undefined, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                if (event.type = type, !(onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || !ontype || !elem[type] || jQuery.isWindow(elem))) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = undefined, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = core_slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                ret !== undefined && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                matches[sel] === undefined && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return handlers.length > delegateCount && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : undefined;
                }
            },
            focus: {
                trigger: function() {
                    if (this !== document.activeElement && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === document.activeElement && this.blur ? (this.blur(), !1) : undefined;
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(event) {
                    event.result !== undefined && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === core_strundefined && (elem[name] = null), 
        elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        this[jQuery.expando] = !0, undefined) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : (jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "submitBubbles", !0));
            }), undefined);
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : (jQuery.event.remove(this, "._submit"), 
            undefined);
        }
    }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
            })), !1) : (jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "changeBubbles", !0));
            }), undefined);
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : undefined;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var attaches = 0, handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                0 === attaches++ && document.addEventListener(orig, handler, !0);
            },
            teardown: function() {
                0 === --attaches && document.removeEventListener(orig, handler, !0);
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = undefined);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : undefined;
        }
    }), function(window, undefined) {
        function isNative(fn) {
            return rnative.test(fn + "");
        }
        function createCache() {
            var cache, keys = [];
            return cache = function(key, value) {
                return keys.push(key += " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value;
            };
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return fn(div);
            } catch (e) {
                return !1;
            } finally {
                div = null;
            }
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (!documentIsXML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), 
                    results;
                    if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), 
                    results;
                }
                if (support.qsa && !rbuggyQSA.test(selector)) {
                    if (old = !0, nid = expando, newContext = context, newSelector = 9 === nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), 
                        results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), 
                (cache = outerCache[dir]) && cache[0] === dirkey) {
                    if ((data = cache[1]) === !0 || data === cachedruns) return data === !0;
                } else if (cache = outerCache[dir] = [ dirkey ], cache[1] = matcher(elem, context, xml) || cachedruns, 
                cache[1] === !0) return !0;
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                for (outermost && (outermostContext = context !== document && context, cachedruns = matcherCachedRuns); null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique, cachedruns = ++matcherCachedRuns);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !documentIsXML && Expr.relative[tokens[1].type]) {
                    if (context = Expr.find.ID(token.matches[0].replace(runescape, funescape), context)[0], 
                    !context) return results;
                    selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, slice.call(seed, 0)), 
                    results;
                    break;
                }
            }
            return compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector)), 
            results;
        }
        function setFilters() {}
        var i, cachedruns, Expr, getText, isXML, compile, hasDuplicate, outermostContext, setDocument, document, docElem, documentIsXML, rbuggyQSA, rbuggyMatches, matches, contains, sortOrder, expando = "sizzle" + -new Date(), preferredDoc = window.document, support = {}, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, arr = [], pop = arr.pop, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
            return -1;
        }, whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = RegExp(pseudos), ridentifier = RegExp("^" + identifier + "$"), matchExpr = {
            ID: RegExp("^#(" + characterEncoding + ")"),
            CLASS: RegExp("^\\.(" + characterEncoding + ")"),
            NAME: RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
            TAG: RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + attributes),
            PSEUDO: RegExp("^" + pseudos),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            needsContext: RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rsibling = /[\x20\t\r\n\f]*[+~]/, rnative = /^[^{]+\{\s*\[native code/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, funescape = function(_, escaped) {
            var high = "0x" + escaped - 65536;
            return high !== high ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(55296 | high >> 10, 56320 | 1023 & high);
        };
        try {
            slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function(i) {
                for (var elem, results = []; elem = this[i++]; ) results.push(elem);
                return results;
            };
        }
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, documentIsXML = isXML(doc), support.tagNameNoComments = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.attributes = assert(function(div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return "boolean" !== type && "string" !== type;
            }), support.getByClassName = assert(function(div) {
                return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", 
                div.getElementsByClassName && div.getElementsByClassName("e").length ? (div.lastChild.className = "e", 
                2 === div.getElementsByClassName("e").length) : !1;
            }), support.getByName = assert(function(div) {
                div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", 
                docElem.insertBefore(div, docElem.firstChild);
                var pass = doc.getElementsByName && doc.getElementsByName(expando).length === 2 + doc.getElementsByName(expando + 0).length;
                return support.getIdNotName = !doc.getElementById(expando), docElem.removeChild(div), 
                pass;
            }), Expr.attrHandle = assert(function(div) {
                return div.innerHTML = "<a href='#'></a>", div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href");
            }) ? {} : {
                href: function(elem) {
                    return elem.getAttribute("href", 2);
                },
                type: function(elem) {
                    return elem.getAttribute("type");
                }
            }, support.getIdNotName ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && !documentIsXML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && !documentIsXML) {
                    var m = context.getElementById(id);
                    return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [ m ] : undefined : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.tagNameNoComments ? function(tag, context) {
                return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : undefined;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.NAME = support.getByName && function(tag, context) {
                return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) : undefined;
            }, Expr.find.CLASS = support.getByClassName && function(className, context) {
                return typeof context.getElementsByClassName === strundefined || documentIsXML ? undefined : context.getElementsByClassName(className);
            }, rbuggyMatches = [], rbuggyQSA = [ ":focus" ], (support.qsa = isNative(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
            }), assert(function(div) {
                div.innerHTML = "<input type='hidden' i=''/>", div.querySelectorAll("[i^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = isNative(matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = RegExp(rbuggyQSA.join("|")), rbuggyMatches = RegExp(rbuggyMatches.join("|")), 
            contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                var compare;
                return a === b ? (hasDuplicate = !0, 0) : (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & compare || a.parentNode && 11 === a.parentNode.nodeType ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : 0 : 4 & compare ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
            } : function(a, b) {
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (a === b) return hasDuplicate = !0, 0;
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, hasDuplicate = !1, [ 0, 0 ].sort(sortOrder), support.detectDuplicates = hasDuplicate, 
            document) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            !(!support.matchesSelector || documentIsXML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            var val;
            return (elem.ownerDocument || elem) !== document && setDocument(elem), documentIsXML || (name = name.toLowerCase()), 
            (val = Expr.attrHandle[name]) ? val(elem) : documentIsXML || support.attributes ? elem.getAttribute(name) : ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === !0 ? name : val && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], i = 1, j = 0;
            if (hasDuplicate = !support.detectDuplicates, results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i]; i++) elem === results[i - 1] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i]; i++) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[4] ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeName) {
                    return "*" === nodeName ? function() {
                        return !0;
                    } : (nodeName = nodeName.replace(runescape, funescape).toLowerCase(), function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    });
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || 0 === diff % first && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf.call(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type);
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; length > ++i; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        };
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--; ) cached = matcherFromTokens(group[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        }, Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, 
        Expr.setFilters = new setFilters(), setDocument(), Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, 
        jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, 
        jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    }(window);
    var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret, self, len = this.length;
            if ("string" != typeof selector) return self = this, this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (ret = [], i = 0; len > i; i++) jQuery.find(selector, this[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = (this.selector ? this.selector + " " : "") + selector, 
            ret;
        },
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, !1));
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, !0));
        },
        is: function(selector) {
            return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType; ) {
                if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                    ret.push(cur);
                    break;
                }
                cur = cur.parentNode;
            }
            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [ selector ] : selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), 
            this.pushStack(ret);
        };
    }), jQuery.extend({
        filter: function(expr, elems, not) {
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(elem);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(elem, this.firstChild);
            });
        },
        before: function() {
            return this.domManip(arguments, !1, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, !1, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, i = 0; null != (elem = this[i]); i++) (!selector || jQuery.filter(selector, [ elem ]).length > 0) && (keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem)));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if (!("string" != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()])) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function(value) {
            var isFunc = jQuery.isFunction(value);
            return isFunc || "string" == typeof value || (value = jQuery(value).not(this).detach()), 
            this.domManip([ value ], !0, function(elem) {
                var next = this.nextSibling, parent = this.parentNode;
                parent && (jQuery(this).remove(), parent.insertBefore(elem, next));
            });
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, table, callback) {
            args = core_concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || !(1 >= l || "string" != typeof value || jQuery.support.checkClone) && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, table ? self.html() : undefined)), 
                self.domManip(args, table, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (table = table && jQuery.nodeName(first, "tr"), scripts = jQuery.map(getAll(fragment, "script"), disableScript), 
                hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), 
                hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery.ajax({
                    url: node.src,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                }) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null;
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), core_push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    }), jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
                !jQuery.support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
                j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild;
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), jQuery.support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
            i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe;
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== core_strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                core_deletedIds.push(id));
            }
        }
    });
    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = RegExp("^([+-])=(" + core_pnum + ")", "i"), elemdisplay = {
        BODY: "block"
    }, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = [ "Top", "Right", "Bottom", "Left" ], cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                var len, styles, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            var bool = "boolean" == typeof state;
            return this.each(function() {
                (bool ? state : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            val === undefined && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        },
        swap: function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret;
        }
    }), window.getComputedStyle ? (getStyles = function(elem) {
        return window.getComputedStyle(elem, null);
    }, curCSS = function(elem, name, _computed) {
        var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
        return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        ret;
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, _computed) {
        var left, rs, rsLeft, computed = _computed || getStyles(elem), ret = computed ? computed[name] : undefined, style = elem.style;
        return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), "" === ret ? "auto" : ret;
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : undefined;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                return computed ? jQuery.swap(elem, {
                    display: "inline-block"
                }, curCSS, [ elem, "marginRight" ]) : undefined;
            }
        }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : undefined;
                }
            };
        });
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
        return 0 >= elem.offsetWidth && 0 >= elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.hover = function(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    };
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), 
                status >= 200 && 300 > status || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status ? (isSuccess = !0, 
                statusText = "nocontent") : 304 === status ? (isSuccess = !0, statusText = "notmodified") : (isSuccess = ajaxConvert(s, response), 
                statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, 
                isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 
                0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = undefined), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? 80 : 443)) == (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? 80 : 443)))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(undefined, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = undefined;
        }), "script") : undefined;
    });
    var xhrCallbacks, xhrSupported, xhrId = 0, xhrOnUnloadAbort = window.ActiveXObject && function() {
        var key;
        for (key in xhrCallbacks) xhrCallbacks[key](undefined, !0);
    };
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR, xhrSupported = jQuery.ajaxSettings.xhr(), jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported, 
    xhrSupported = jQuery.support.ajax = !!xhrSupported, xhrSupported && jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), 
                    s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    } catch (err) {}
                    xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
                        var status, responseHeaders, statusText, responses;
                        try {
                            if (callback && (isAbort || 4 === xhr.readyState)) if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, 
                            xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                                responses = {}, status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), 
                                "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                try {
                                    statusText = xhr.statusText;
                                } catch (e) {
                                    statusText = "";
                                }
                                status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                            }
                        } catch (firefoxAccessException) {
                            isAbort || complete(-1, firefoxAccessException);
                        }
                        responses && complete(status, statusText, responses, responseHeaders);
                    }, s.async ? 4 === xhr.readyState ? setTimeout(callback) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, 
                    jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback();
                },
                abort: function() {
                    callback && callback(undefined, !0);
                }
            };
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
            if (parts) {
                if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), "px" !== unit && start) {
                    start = jQuery.css(tween.elem, prop, !0) || end || 1;
                    do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
                }
                tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
            }
            return tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                doAnimation.finish = function() {
                    anim.stop(!0);
                }, (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.cur && hooks.cur.finish && hooks.cur.finish.call(this), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); timers.length > i; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = undefined;
    }, jQuery.fx.timer = function(timer) {
        timer() && jQuery.timers.push(timer) && jQuery.fx.start();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }), jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
        });
        var docElem, win, box = {
            top: 0,
            left: 0
        }, elem = this[0], doc = elem && elem.ownerDocument;
        if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== core_strundefined && (box = elem.getBoundingClientRect()), 
        win = getWindow(doc), {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        }) : box;
    }, jQuery.offset = {
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, props = {}, curPosition = {};
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || document.documentElement; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || document.documentElement;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val, 
                undefined);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    }), window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return jQuery;
    });
}(window), function() {
    var Backbone, root = this, previousBackbone = root.Backbone, array = [], push = array.push, slice = array.slice, splice = array.splice;
    Backbone = "undefined" != typeof exports ? exports : root.Backbone = {}, Backbone.VERSION = "1.0.0";
    var _ = root._;
    _ || "undefined" == typeof require || (_ = require("underscore")), Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$, 
    Backbone.noConflict = function() {
        return root.Backbone = previousBackbone, this;
    }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
    var Events = Backbone.Events = {
        on: function(name, callback, context) {
            if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            return events.push({
                callback: callback,
                context: context,
                ctx: context || this
            }), this;
        },
        once: function(name, callback, context) {
            if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
            var self = this, once = _.once(function() {
                self.off(name, once), callback.apply(this, arguments);
            });
            return once._callback = callback, this.on(name, once, context);
        },
        off: function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
            if (!name && !callback && !context) return this._events = {}, this;
            for (names = name ? [ name ] : _.keys(this._events), i = 0, l = names.length; l > i; i++) if (name = names[i], 
            events = this._events[name]) {
                if (this._events[name] = retain = [], callback || context) for (j = 0, k = events.length; k > j; j++) ev = events[j], 
                (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                retain.length || delete this._events[name];
            }
            return this;
        },
        trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) return this;
            var events = this._events[name], allEvents = this._events.all;
            return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), 
            this;
        },
        stopListening: function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            "object" == typeof name && (callback = this), obj && ((listeners = {})[obj._listenerId] = obj);
            for (var id in listeners) listeners[id].off(name, callback, this), deleteListener && delete this._listeners[id];
            return this;
        }
    }, eventSplitter = /\s+/, eventsApi = function(obj, action, name, rest) {
        if (!name) return !0;
        if ("object" == typeof name) {
            for (var key in name) obj[action].apply(obj, [ key, name[key] ].concat(rest));
            return !1;
        }
        if (eventSplitter.test(name)) {
            for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [ names[i] ].concat(rest));
            return !1;
        }
        return !0;
    }, triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
          case 0:
            for (;l > ++i; ) (ev = events[i]).callback.call(ev.ctx);
            return;

          case 1:
            for (;l > ++i; ) (ev = events[i]).callback.call(ev.ctx, a1);
            return;

          case 2:
            for (;l > ++i; ) (ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;

          case 3:
            for (;l > ++i; ) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;

          default:
            for (;l > ++i; ) (ev = events[i]).callback.apply(ev.ctx, args);
        }
    }, listenMethods = {
        listenTo: "on",
        listenToOnce: "once"
    };
    _.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {}), id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
            return listeners[id] = obj, "object" == typeof name && (callback = this), obj[implementation](name, callback, this), 
            this;
        };
    }), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
    var Model = Backbone.Model = function(attributes, options) {
        var defaults, attrs = attributes || {};
        options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, _.extend(this, _.pick(options, modelOptions)), 
        options.parse && (attrs = this.parse(attrs, options) || {}), (defaults = _.result(this, "defaults")) && (attrs = _.defaults({}, attrs, defaults)), 
        this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments);
    }, modelOptions = [ "url", "urlRoot", "collection" ];
    _.extend(Model.prototype, Events, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return _.clone(this.attributes);
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        get: function(attr) {
            return this.attributes[attr];
        },
        escape: function(attr) {
            return _.escape(this.get(attr));
        },
        has: function(attr) {
            return null != this.get(attr);
        },
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (null == key) return this;
            if ("object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, 
            options || (options = {}), !this._validate(attrs, options)) return !1;
            unset = options.unset, silent = options.silent, changes = [], changing = this._changing, 
            this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), 
            this.changed = {}), current = this.attributes, prev = this._previousAttributes, 
            this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
            for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), 
            _.isEqual(prev[attr], val) ? delete this.changed[attr] : this.changed[attr] = val, 
            unset ? delete current[attr] : current[attr] = val;
            if (!silent) {
                changes.length && (this._pending = !0);
                for (var i = 0, l = changes.length; l > i; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options);
            }
            if (changing) return this;
            if (!silent) for (;this._pending; ) this._pending = !1, this.trigger("change", this, options);
            return this._pending = !1, this._changing = !1, this;
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: !0
            }));
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: !0
            }));
        },
        hasChanged: function(attr) {
            return null == attr ? !_.isEmpty(this.changed) : _.has(this.changed, attr);
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : !1;
            var val, changed = !1, old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
            return changed;
        },
        previous: function(attr) {
            return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null;
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
            var model = this, success = options.success;
            return options.success = function(resp) {
                return model.set(model.parse(resp, options), options) ? (success && success(model, resp, options), 
                model.trigger("sync", model, resp, options), void 0) : !1;
            }, wrapError(this, options), this.sync("read", this, options);
        },
        save: function(key, val, options) {
            var attrs, method, xhr, attributes = this.attributes;
            if (null == key || "object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, 
            !(!attrs || options && options.wait || this.set(attrs, options))) return !1;
            if (options = _.extend({
                validate: !0
            }, options), !this._validate(attrs, options)) return !1;
            attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
            var model = this, success = options.success;
            return options.success = function(resp) {
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), _.isObject(serverAttrs) && !model.set(serverAttrs, options) ? !1 : (success && success(model, resp, options), 
                model.trigger("sync", model, resp, options), void 0);
            }, wrapError(this, options), method = this.isNew() ? "create" : options.patch ? "patch" : "update", 
            "patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), 
            attrs && options.wait && (this.attributes = attributes), xhr;
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this, success = options.success, destroy = function() {
                model.trigger("destroy", model, model.collection, options);
            };
            if (options.success = function(resp) {
                (options.wait || model.isNew()) && destroy(), success && success(model, resp, options), 
                model.isNew() || model.trigger("sync", model, resp, options);
            }, this.isNew()) return options.success(), !1;
            wrapError(this, options);
            var xhr = this.sync("delete", this, options);
            return options.wait || destroy(), xhr;
        },
        url: function() {
            var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
            return this.isNew() ? base : base + ("/" === base.charAt(base.length - 1) ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(resp) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return null == this.id;
        },
        isValid: function(options) {
            return this._validate({}, _.extend(options || {}, {
                validate: !0
            }));
        },
        _validate: function(attrs, options) {
            if (!options.validate || !this.validate) return !0;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            return error ? (this.trigger("invalid", this, error, _.extend(options || {}, {
                validationError: error
            })), !1) : !0;
        }
    });
    var modelMethods = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
    _.each(modelMethods, function(method) {
        Model.prototype[method] = function() {
            var args = slice.call(arguments);
            return args.unshift(this.attributes), _[method].apply(_, args);
        };
    });
    var Collection = Backbone.Collection = function(models, options) {
        options || (options = {}), options.url && (this.url = options.url), options.model && (this.model = options.model), 
        void 0 !== options.comparator && (this.comparator = options.comparator), this._reset(), 
        this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
            silent: !0
        }, options));
    }, setOptions = {
        add: !0,
        remove: !0,
        merge: !0
    }, addOptions = {
        add: !0,
        merge: !1,
        remove: !1
    };
    _.extend(Collection.prototype, Events, {
        model: Model,
        initialize: function() {},
        toJSON: function(options) {
            return this.map(function(model) {
                return model.toJSON(options);
            });
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        add: function(models, options) {
            return this.set(models, _.defaults(options || {}, addOptions));
        },
        remove: function(models, options) {
            models = _.isArray(models) ? models.slice() : [ models ], options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; l > i; i++) model = this.get(models[i]), model && (delete this._byId[model.id], 
            delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), 
            this.length--, options.silent || (options.index = index, model.trigger("remove", model, this, options)), 
            this._removeReference(model));
            return this;
        },
        set: function(models, options) {
            options = _.defaults(options || {}, setOptions), options.parse && (models = this.parse(models, options)), 
            _.isArray(models) || (models = models ? [ models ] : []);
            var i, l, model, existing, sort, at = options.at, sortable = this.comparator && null == at && options.sort !== !1, sortAttr = _.isString(this.comparator) ? this.comparator : null, toAdd = [], toRemove = [], modelMap = {};
            for (i = 0, l = models.length; l > i; i++) (model = this._prepareModel(models[i], options)) && ((existing = this.get(model)) ? (options.remove && (modelMap[existing.cid] = !0), 
            options.merge && (existing.set(model.attributes, options), sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0))) : options.add && (toAdd.push(model), 
            model.on("all", this._onModelEvent, this), this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model)));
            if (options.remove) {
                for (i = 0, l = this.length; l > i; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
                toRemove.length && this.remove(toRemove, options);
            }
            if (toAdd.length && (sortable && (sort = !0), this.length += toAdd.length, null != at ? splice.apply(this.models, [ at, 0 ].concat(toAdd)) : push.apply(this.models, toAdd)), 
            sort && this.sort({
                silent: !0
            }), options.silent) return this;
            for (i = 0, l = toAdd.length; l > i; i++) (model = toAdd[i]).trigger("add", model, this, options);
            return sort && this.trigger("sort", this, options), this;
        },
        reset: function(models, options) {
            options || (options = {});
            for (var i = 0, l = this.models.length; l > i; i++) this._removeReference(this.models[i]);
            return options.previousModels = this.models, this._reset(), this.add(models, _.extend({
                silent: !0
            }, options)), options.silent || this.trigger("reset", this, options), this;
        },
        push: function(model, options) {
            return model = this._prepareModel(model, options), this.add(model, _.extend({
                at: this.length
            }, options)), model;
        },
        pop: function(options) {
            var model = this.at(this.length - 1);
            return this.remove(model, options), model;
        },
        unshift: function(model, options) {
            return model = this._prepareModel(model, options), this.add(model, _.extend({
                at: 0
            }, options)), model;
        },
        shift: function(options) {
            var model = this.at(0);
            return this.remove(model, options), model;
        },
        slice: function(begin, end) {
            return this.models.slice(begin, end);
        },
        get: function(obj) {
            return null == obj ? void 0 : this._byId[null != obj.id ? obj.id : obj.cid || obj];
        },
        at: function(index) {
            return this.models[index];
        },
        where: function(attrs, first) {
            return _.isEmpty(attrs) ? first ? void 0 : [] : this[first ? "find" : "filter"](function(model) {
                for (var key in attrs) if (attrs[key] !== model.get(key)) return !1;
                return !0;
            });
        },
        findWhere: function(attrs) {
            return this.where(attrs, !0);
        },
        sort: function(options) {
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(_.bind(this.comparator, this)), 
            options.silent || this.trigger("sort", this, options), this;
        },
        sortedIndex: function(model, value, context) {
            value || (value = this.comparator);
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _.sortedIndex(this.models, model, iterator, context);
        },
        pluck: function(attr) {
            return _.invoke(this.models, "get", attr);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
            var success = options.success, collection = this;
            return options.success = function(resp) {
                var method = options.reset ? "reset" : "set";
                collection[method](resp, options), success && success(collection, resp, options), 
                collection.trigger("sync", collection, resp, options);
            }, wrapError(this, options), this.sync("read", this, options);
        },
        create: function(model, options) {
            if (options = options ? _.clone(options) : {}, !(model = this._prepareModel(model, options))) return !1;
            options.wait || this.add(model, options);
            var collection = this, success = options.success;
            return options.success = function(resp) {
                options.wait && collection.add(model, options), success && success(model, resp, options);
            }, model.save(null, options), model;
        },
        parse: function(resp) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0, this.models = [], this._byId = {};
        },
        _prepareModel: function(attrs, options) {
            if (attrs instanceof Model) return attrs.collection || (attrs.collection = this), 
            attrs;
            options || (options = {}), options.collection = this;
            var model = new this.model(attrs, options);
            return model._validate(attrs, options) ? model : (this.trigger("invalid", this, attrs, options), 
            !1);
        },
        _removeReference: function(model) {
            this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(event, model, collection, options) {
            ("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), 
            model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], 
            null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments));
        }
    });
    var methods = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain" ];
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            return args.unshift(this.models), _[method].apply(_, args);
        };
    });
    var attributeMethods = [ "groupBy", "countBy", "sortBy" ];
    _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _[method](this.models, iterator, context);
        };
    });
    var View = Backbone.View = function(options) {
        this.cid = _.uniqueId("view"), this._configure(options || {}), this._ensureElement(), 
        this.initialize.apply(this, arguments), this.delegateEvents();
    }, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
    _.extend(View.prototype, Events, {
        tagName: "div",
        $: function(selector) {
            return this.$el.find(selector);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this.stopListening(), this;
        },
        setElement: function(element, delegate) {
            return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element : Backbone.$(element), 
            this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this;
        },
        delegateEvents: function(events) {
            if (!events && !(events = _.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (_.isFunction(method) || (method = this[events[key]]), method) {
                    var match = key.match(delegateEventSplitter), eventName = match[1], selector = match[2];
                    method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) : this.$el.on(eventName, selector, method);
                }
            }
            return this;
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid), this;
        },
        _configure: function(options) {
            this.options && (options = _.extend({}, _.result(this, "options"), options)), _.extend(this, _.pick(options, viewOptions)), 
            this.options = options;
        },
        _ensureElement: function() {
            if (this.el) this.setElement(_.result(this, "el"), !1); else {
                var attrs = _.extend({}, _.result(this, "attributes"));
                this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
                var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                this.setElement($el, !1);
            }
        }
    }), Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: "json"
        };
        if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", 
        params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", 
        params.data = params.data ? {
            model: params.data
        } : {}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
            params.type = "POST", options.emulateJSON && (params.data._method = type);
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                return xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend ? beforeSend.apply(this, arguments) : void 0;
            };
        }
        "GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" !== params.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (params.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        });
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        return model.trigger("request", model, xhr, options), xhr;
    };
    var methodMap = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var Router = Backbone.Router = function(options) {
        options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), 
        this.initialize.apply(this, arguments);
    }, optionalParam = /\((.*?)\)/g, namedParam = /(\(\?)?:\w+/g, splatParam = /\*\w+/g, escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        initialize: function() {},
        route: function(route, name, callback) {
            _.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, 
            name = ""), callback || (callback = this[name]);
            var router = this;
            return Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                callback && callback.apply(router, args), router.trigger.apply(router, [ "route:" + name ].concat(args)), 
                router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args);
            }), this;
        },
        navigate: function(fragment, options) {
            return Backbone.history.navigate(fragment, options), this;
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = _.result(this, "routes");
                for (var route, routes = _.keys(this.routes); null != (route = routes.pop()); ) this.route(route, this.routes[route]);
            }
        },
        _routeToRegExp: function(route) {
            return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                return optional ? match : "([^/]+)";
            }).replace(splatParam, "(.*?)"), RegExp("^" + route + "$");
        },
        _extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function(param) {
                return param ? decodeURIComponent(param) : null;
            });
        }
    });
    var History = Backbone.History = function() {
        this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
        this.history = window.history);
    }, routeStripper = /^[#\/]|\s+$/g, rootStripper = /^\/+|\/+$/g, isExplorer = /msie [\w.]+/, trailingSlash = /\/$/;
    History.started = !1, _.extend(History.prototype, Events, {
        interval: 50,
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : "";
        },
        getFragment: function(fragment, forcePushState) {
            if (null == fragment) if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                fragment = this.location.pathname;
                var root = this.root.replace(trailingSlash, "");
                fragment.indexOf(root) || (fragment = fragment.substr(root.length));
            } else fragment = this.getHash();
            return fragment.replace(routeStripper, "");
        },
        start: function(options) {
            if (History.started) throw Error("Backbone.history has already been started");
            History.started = !0, this.options = _.extend({}, {
                root: "/"
            }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
            this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment(), docMode = document.documentMode, oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || 7 >= docMode);
            this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange && (this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, 
            this.navigate(fragment)), this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
            this.fragment = fragment;
            var loc = this.location, atRoot = loc.pathname.replace(/[^\/]$/, "$&/") === this.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot ? (this.fragment = this.getFragment(null, !0), 
            this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && atRoot && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), 
            this.history.replaceState({}, document.title, this.root + this.fragment + loc.search)), 
            this.options.silent ? void 0 : this.loadUrl());
        },
        stop: function() {
            Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), 
            clearInterval(this._checkUrlInterval), History.started = !1;
        },
        route: function(route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            });
        },
        checkUrl: function() {
            var current = this.getFragment();
            return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), 
            current === this.fragment ? !1 : (this.iframe && this.navigate(current), this.loadUrl() || this.loadUrl(this.getHash()), 
            void 0);
        },
        loadUrl: function(fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride), matched = _.any(this.handlers, function(handler) {
                return handler.route.test(fragment) ? (handler.callback(fragment), !0) : void 0;
            });
            return matched;
        },
        navigate: function(fragment, options) {
            if (!History.started) return !1;
            if (options && options !== !0 || (options = {
                trigger: options
            }), fragment = this.getFragment(fragment || ""), this.fragment !== fragment) {
                this.fragment = fragment;
                var url = this.root + fragment;
                if (this._hasPushState) this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url); else {
                    if (!this._wantsHashChange) return this.location.assign(url);
                    this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), 
                    this._updateHash(this.iframe.location, fragment, options.replace));
                }
                options.trigger && this.loadUrl(fragment);
            }
        },
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, "");
                location.replace(href + "#" + fragment);
            } else location.hash = "#" + fragment;
        }
    }), Backbone.history = new History();
    var extend = function(protoProps, staticProps) {
        var child, parent = this;
        child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor : function() {
            return parent.apply(this, arguments);
        }, _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child;
        };
        return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate(), 
        protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, 
        child;
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function() {
        throw Error('A "url" property or function must be specified');
    }, wrapError = function(model, options) {
        var error = options.error;
        options.error = function(resp) {
            error && error(model, resp, options), model.trigger("error", model, resp, options);
        };
    };
}.call(this), function($) {
    function Flag($target, anchor, align, parent) {
        var self = this;
        this.anchor = anchor, this.align = align, this.$target = $target, this.parent = parent, 
        this.$flag = $('<div class="flag"></div>').appendTo(parent).on("click", function() {
            self.remove();
        }), this.bg_color = this.$flag.css("background-color"), this.$sub = $('<div class="subflag"></div>').appendTo(this.$flag), 
        this.$triangle = $('<div class="triangle"></div>').appendTo(this.$flag), this.triangle_radius = parseInt(this.$triangle.css("border-top-width"), 10);
    }
    $.fn.measureBox = function() {
        return {
            width: this.width() + parseInt(this.css("border-left-width"), 10) + parseInt(this.css("border-right-width"), 10) + parseInt(this.css("padding-left"), 10) + parseInt(this.css("padding-right"), 10),
            height: this.height() + parseInt(this.css("border-top-width"), 10) + parseInt(this.css("border-bottom-width"), 10) + parseInt(this.css("padding-top"), 10) + parseInt(this.css("padding-bottom"), 10)
        };
    }, Flag.prototype.redraw = function() {
        var $content, self = this, target_offset = this.$target.offset(), target_size = this.$target.measureBox();
        this.$flag.fadeIn(80), $content = this.onclick ? $('<a href="#"></a>').click(function(ev) {
            ev.preventDefault(), self.onclick();
        }) : this.href ? $('<a href="' + this.href + '"></a>') : $("<span></span>"), $content.appendTo(this.$sub.empty()), 
        this.html ? $content.html(this.html) : $content.text(this.text);
        var flag_size = this.$flag.measureBox();
        ("r" === this.anchor || "l" === this.anchor) && ("r" === this.anchor ? (this.$flag.css({
            left: target_offset.left + target_size.width,
            "margin-left": this.triangle_radius
        }), this.$triangle.css({
            left: -this.triangle_radius,
            "border-left-width": 0,
            "border-right-color": this.bg_color
        })) : (this.$flag.css({
            left: target_offset.left - flag_size.width - this.triangle_radius,
            "margin-right": this.triangle_radius
        }), this.$triangle.css({
            right: -this.triangle_radius,
            "border-right-width": 0,
            "border-left-color": this.bg_color
        })), "t" === this.anchor ? this.$flag.css("top", target_offset.top) : "m" === this.align ? this.$flag.css("top", target_offset.top + target_size.height / 2 - flag_size.height / 2) : this.$flag.css("top", target_offset.top + target_size.height - flag_size.height), 
        this.$triangle.css("top", (flag_size.height - 2 * this.triangle_radius) / 2));
    }, Flag.prototype.remove = function() {
        this.$flag.fadeOut(80);
    }, $.flag = function(args) {
        void 0 === args && (args = {});
        var $target = args.element || $(args.selector), update = void 0 === args.update ? !0 : args.update, flag = $target.data("flag");
        update && flag || (flag = new Flag($target, args.anchor || "r", args.align || "m", args.parent || document.body)), 
        $target.data("flag", flag), flag.href = args.href, flag.onclick = args.onclick, 
        flag.html = args.html, flag.text = args.text, flag.html || flag.text || (flag.text = "!!!"), 
        flag.redraw(), void 0 !== args.fade && setTimeout(function() {
            flag.remove();
        }, args.fade);
    }, $.fn.flag = function(args) {
        return "string" == typeof args && (args = {
            text: args
        }), this.each(function() {
            args.element = $(this), $.flag(args);
        });
    };
}(jQuery);

var Handlebars = {};

(function(Handlebars, undefined) {
    Handlebars.VERSION = "1.0.0-rc.4", Handlebars.COMPILER_REVISION = 3, Handlebars.REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: ">= 1.0.0-rc.4"
    }, Handlebars.helpers = {}, Handlebars.partials = {};
    var toString = Object.prototype.toString, functionType = "[object Function]", objectType = "[object Object]";
    Handlebars.registerHelper = function(name, fn, inverse) {
        if (toString.call(name) === objectType) {
            if (inverse || fn) throw new Handlebars.Exception("Arg not supported with multiple helpers");
            Handlebars.Utils.extend(this.helpers, name);
        } else inverse && (fn.not = inverse), this.helpers[name] = fn;
    }, Handlebars.registerPartial = function(name, str) {
        toString.call(name) === objectType ? Handlebars.Utils.extend(this.partials, name) : this.partials[name] = str;
    }, Handlebars.registerHelper("helperMissing", function(arg) {
        if (2 === arguments.length) return undefined;
        throw Error("Could not find property '" + arg + "'");
    }), Handlebars.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse || function() {}, fn = options.fn, type = toString.call(context);
        return type === functionType && (context = context.call(this)), context === !0 ? fn(this) : context === !1 || null == context ? inverse(this) : "[object Array]" === type ? context.length > 0 ? Handlebars.helpers.each(context, options) : inverse(this) : fn(context);
    }), Handlebars.K = function() {}, Handlebars.createFrame = Object.create || function(object) {
        Handlebars.K.prototype = object;
        var obj = new Handlebars.K();
        return Handlebars.K.prototype = null, obj;
    }, Handlebars.logger = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        level: 3,
        methodMap: {
            0: "debug",
            1: "info",
            2: "warn",
            3: "error"
        },
        log: function(level, obj) {
            if (level >= Handlebars.logger.level) {
                var method = Handlebars.logger.methodMap[level];
                "undefined" != typeof console && console[method] && console[method].call(console, obj);
            }
        }
    }, Handlebars.log = function(level, obj) {
        Handlebars.logger.log(level, obj);
    }, Handlebars.registerHelper("each", function(context, options) {
        var data, fn = options.fn, inverse = options.inverse, i = 0, ret = "";
        if (options.data && (data = Handlebars.createFrame(options.data)), context && "object" == typeof context) if (context instanceof Array) for (var j = context.length; j > i; i++) data && (data.index = i), 
        ret += fn(context[i], {
            data: data
        }); else for (var key in context) context.hasOwnProperty(key) && (data && (data.key = key), 
        ret += fn(context[key], {
            data: data
        }), i++);
        return 0 === i && (ret = inverse(this)), ret;
    }), Handlebars.registerHelper("if", function(context, options) {
        var type = toString.call(context);
        return type === functionType && (context = context.call(this)), !context || Handlebars.Utils.isEmpty(context) ? options.inverse(this) : options.fn(this);
    }), Handlebars.registerHelper("unless", function(context, options) {
        return Handlebars.helpers["if"].call(this, context, {
            fn: options.inverse,
            inverse: options.fn
        });
    }), Handlebars.registerHelper("with", function(context, options) {
        return Handlebars.Utils.isEmpty(context) ? undefined : options.fn(context);
    }), Handlebars.registerHelper("log", function(context, options) {
        var level = options.data && null != options.data.level ? parseInt(options.data.level, 10) : 1;
        Handlebars.log(level, context);
    });
    var handlebars = function() {
        function Parser() {
            this.yy = {};
        }
        var parser = {
            trace: function() {},
            yy: {},
            symbols_: {
                error: 2,
                root: 3,
                program: 4,
                EOF: 5,
                simpleInverse: 6,
                statements: 7,
                statement: 8,
                openInverse: 9,
                closeBlock: 10,
                openBlock: 11,
                mustache: 12,
                partial: 13,
                CONTENT: 14,
                COMMENT: 15,
                OPEN_BLOCK: 16,
                inMustache: 17,
                CLOSE: 18,
                OPEN_INVERSE: 19,
                OPEN_ENDBLOCK: 20,
                path: 21,
                OPEN: 22,
                OPEN_UNESCAPED: 23,
                OPEN_PARTIAL: 24,
                partialName: 25,
                params: 26,
                hash: 27,
                DATA: 28,
                param: 29,
                STRING: 30,
                INTEGER: 31,
                BOOLEAN: 32,
                hashSegments: 33,
                hashSegment: 34,
                ID: 35,
                EQUALS: 36,
                PARTIAL_NAME: 37,
                pathSegments: 38,
                SEP: 39,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "EOF",
                14: "CONTENT",
                15: "COMMENT",
                16: "OPEN_BLOCK",
                18: "CLOSE",
                19: "OPEN_INVERSE",
                20: "OPEN_ENDBLOCK",
                22: "OPEN",
                23: "OPEN_UNESCAPED",
                24: "OPEN_PARTIAL",
                28: "DATA",
                30: "STRING",
                31: "INTEGER",
                32: "BOOLEAN",
                35: "ID",
                36: "EQUALS",
                37: "PARTIAL_NAME",
                39: "SEP"
            },
            productions_: [ 0, [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 1 ], [ 4, 0 ], [ 7, 1 ], [ 7, 2 ], [ 8, 3 ], [ 8, 3 ], [ 8, 1 ], [ 8, 1 ], [ 8, 1 ], [ 8, 1 ], [ 11, 3 ], [ 9, 3 ], [ 10, 3 ], [ 12, 3 ], [ 12, 3 ], [ 13, 3 ], [ 13, 4 ], [ 6, 2 ], [ 17, 3 ], [ 17, 2 ], [ 17, 2 ], [ 17, 1 ], [ 17, 1 ], [ 26, 2 ], [ 26, 1 ], [ 29, 1 ], [ 29, 1 ], [ 29, 1 ], [ 29, 1 ], [ 29, 1 ], [ 27, 1 ], [ 33, 2 ], [ 33, 1 ], [ 34, 3 ], [ 34, 3 ], [ 34, 3 ], [ 34, 3 ], [ 34, 3 ], [ 25, 1 ], [ 21, 1 ], [ 38, 3 ], [ 38, 1 ] ],
            performAction: function(yytext, yyleng, yylineno, yy, yystate, $$) {
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    return $$[$0 - 1];

                  case 2:
                    this.$ = new yy.ProgramNode([], $$[$0]);
                    break;

                  case 3:
                    this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0]);
                    break;

                  case 4:
                    this.$ = new yy.ProgramNode($$[$0 - 1], []);
                    break;

                  case 5:
                    this.$ = new yy.ProgramNode($$[$0]);
                    break;

                  case 6:
                    this.$ = new yy.ProgramNode([], []);
                    break;

                  case 7:
                    this.$ = new yy.ProgramNode([]);
                    break;

                  case 8:
                    this.$ = [ $$[$0] ];
                    break;

                  case 9:
                    $$[$0 - 1].push($$[$0]), this.$ = $$[$0 - 1];
                    break;

                  case 10:
                    this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1].inverse, $$[$0 - 1], $$[$0]);
                    break;

                  case 11:
                    this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0 - 1].inverse, $$[$0]);
                    break;

                  case 12:
                    this.$ = $$[$0];
                    break;

                  case 13:
                    this.$ = $$[$0];
                    break;

                  case 14:
                    this.$ = new yy.ContentNode($$[$0]);
                    break;

                  case 15:
                    this.$ = new yy.CommentNode($$[$0]);
                    break;

                  case 16:
                    this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
                    break;

                  case 17:
                    this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
                    break;

                  case 18:
                    this.$ = $$[$0 - 1];
                    break;

                  case 19:
                    this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
                    break;

                  case 20:
                    this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1], !0);
                    break;

                  case 21:
                    this.$ = new yy.PartialNode($$[$0 - 1]);
                    break;

                  case 22:
                    this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1]);
                    break;

                  case 23:
                    break;

                  case 24:
                    this.$ = [ [ $$[$0 - 2] ].concat($$[$0 - 1]), $$[$0] ];
                    break;

                  case 25:
                    this.$ = [ [ $$[$0 - 1] ].concat($$[$0]), null ];
                    break;

                  case 26:
                    this.$ = [ [ $$[$0 - 1] ], $$[$0] ];
                    break;

                  case 27:
                    this.$ = [ [ $$[$0] ], null ];
                    break;

                  case 28:
                    this.$ = [ [ new yy.DataNode($$[$0]) ], null ];
                    break;

                  case 29:
                    $$[$0 - 1].push($$[$0]), this.$ = $$[$0 - 1];
                    break;

                  case 30:
                    this.$ = [ $$[$0] ];
                    break;

                  case 31:
                    this.$ = $$[$0];
                    break;

                  case 32:
                    this.$ = new yy.StringNode($$[$0]);
                    break;

                  case 33:
                    this.$ = new yy.IntegerNode($$[$0]);
                    break;

                  case 34:
                    this.$ = new yy.BooleanNode($$[$0]);
                    break;

                  case 35:
                    this.$ = new yy.DataNode($$[$0]);
                    break;

                  case 36:
                    this.$ = new yy.HashNode($$[$0]);
                    break;

                  case 37:
                    $$[$0 - 1].push($$[$0]), this.$ = $$[$0 - 1];
                    break;

                  case 38:
                    this.$ = [ $$[$0] ];
                    break;

                  case 39:
                    this.$ = [ $$[$0 - 2], $$[$0] ];
                    break;

                  case 40:
                    this.$ = [ $$[$0 - 2], new yy.StringNode($$[$0]) ];
                    break;

                  case 41:
                    this.$ = [ $$[$0 - 2], new yy.IntegerNode($$[$0]) ];
                    break;

                  case 42:
                    this.$ = [ $$[$0 - 2], new yy.BooleanNode($$[$0]) ];
                    break;

                  case 43:
                    this.$ = [ $$[$0 - 2], new yy.DataNode($$[$0]) ];
                    break;

                  case 44:
                    this.$ = new yy.PartialNameNode($$[$0]);
                    break;

                  case 45:
                    this.$ = new yy.IdNode($$[$0]);
                    break;

                  case 46:
                    $$[$0 - 2].push($$[$0]), this.$ = $$[$0 - 2];
                    break;

                  case 47:
                    this.$ = [ $$[$0] ];
                }
            },
            table: [ {
                3: 1,
                4: 2,
                5: [ 2, 7 ],
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                1: [ 3 ]
            }, {
                5: [ 1, 17 ]
            }, {
                5: [ 2, 6 ],
                7: 18,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 6 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                5: [ 2, 5 ],
                6: 20,
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 5 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                17: 23,
                18: [ 1, 22 ],
                21: 24,
                28: [ 1, 25 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                5: [ 2, 8 ],
                14: [ 2, 8 ],
                15: [ 2, 8 ],
                16: [ 2, 8 ],
                19: [ 2, 8 ],
                20: [ 2, 8 ],
                22: [ 2, 8 ],
                23: [ 2, 8 ],
                24: [ 2, 8 ]
            }, {
                4: 28,
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 7 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                4: 29,
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 7 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                5: [ 2, 12 ],
                14: [ 2, 12 ],
                15: [ 2, 12 ],
                16: [ 2, 12 ],
                19: [ 2, 12 ],
                20: [ 2, 12 ],
                22: [ 2, 12 ],
                23: [ 2, 12 ],
                24: [ 2, 12 ]
            }, {
                5: [ 2, 13 ],
                14: [ 2, 13 ],
                15: [ 2, 13 ],
                16: [ 2, 13 ],
                19: [ 2, 13 ],
                20: [ 2, 13 ],
                22: [ 2, 13 ],
                23: [ 2, 13 ],
                24: [ 2, 13 ]
            }, {
                5: [ 2, 14 ],
                14: [ 2, 14 ],
                15: [ 2, 14 ],
                16: [ 2, 14 ],
                19: [ 2, 14 ],
                20: [ 2, 14 ],
                22: [ 2, 14 ],
                23: [ 2, 14 ],
                24: [ 2, 14 ]
            }, {
                5: [ 2, 15 ],
                14: [ 2, 15 ],
                15: [ 2, 15 ],
                16: [ 2, 15 ],
                19: [ 2, 15 ],
                20: [ 2, 15 ],
                22: [ 2, 15 ],
                23: [ 2, 15 ],
                24: [ 2, 15 ]
            }, {
                17: 30,
                21: 24,
                28: [ 1, 25 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                17: 31,
                21: 24,
                28: [ 1, 25 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                17: 32,
                21: 24,
                28: [ 1, 25 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                25: 33,
                37: [ 1, 34 ]
            }, {
                1: [ 2, 1 ]
            }, {
                5: [ 2, 2 ],
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 2 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                17: 23,
                21: 24,
                28: [ 1, 25 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                5: [ 2, 4 ],
                7: 35,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 4 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                5: [ 2, 9 ],
                14: [ 2, 9 ],
                15: [ 2, 9 ],
                16: [ 2, 9 ],
                19: [ 2, 9 ],
                20: [ 2, 9 ],
                22: [ 2, 9 ],
                23: [ 2, 9 ],
                24: [ 2, 9 ]
            }, {
                5: [ 2, 23 ],
                14: [ 2, 23 ],
                15: [ 2, 23 ],
                16: [ 2, 23 ],
                19: [ 2, 23 ],
                20: [ 2, 23 ],
                22: [ 2, 23 ],
                23: [ 2, 23 ],
                24: [ 2, 23 ]
            }, {
                18: [ 1, 36 ]
            }, {
                18: [ 2, 27 ],
                21: 41,
                26: 37,
                27: 38,
                28: [ 1, 45 ],
                29: 39,
                30: [ 1, 42 ],
                31: [ 1, 43 ],
                32: [ 1, 44 ],
                33: 40,
                34: 46,
                35: [ 1, 47 ],
                38: 26
            }, {
                18: [ 2, 28 ]
            }, {
                18: [ 2, 45 ],
                28: [ 2, 45 ],
                30: [ 2, 45 ],
                31: [ 2, 45 ],
                32: [ 2, 45 ],
                35: [ 2, 45 ],
                39: [ 1, 48 ]
            }, {
                18: [ 2, 47 ],
                28: [ 2, 47 ],
                30: [ 2, 47 ],
                31: [ 2, 47 ],
                32: [ 2, 47 ],
                35: [ 2, 47 ],
                39: [ 2, 47 ]
            }, {
                10: 49,
                20: [ 1, 50 ]
            }, {
                10: 51,
                20: [ 1, 50 ]
            }, {
                18: [ 1, 52 ]
            }, {
                18: [ 1, 53 ]
            }, {
                18: [ 1, 54 ]
            }, {
                18: [ 1, 55 ],
                21: 56,
                35: [ 1, 27 ],
                38: 26
            }, {
                18: [ 2, 44 ],
                35: [ 2, 44 ]
            }, {
                5: [ 2, 3 ],
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 3 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                24: [ 1, 16 ]
            }, {
                14: [ 2, 17 ],
                15: [ 2, 17 ],
                16: [ 2, 17 ],
                19: [ 2, 17 ],
                20: [ 2, 17 ],
                22: [ 2, 17 ],
                23: [ 2, 17 ],
                24: [ 2, 17 ]
            }, {
                18: [ 2, 25 ],
                21: 41,
                27: 57,
                28: [ 1, 45 ],
                29: 58,
                30: [ 1, 42 ],
                31: [ 1, 43 ],
                32: [ 1, 44 ],
                33: 40,
                34: 46,
                35: [ 1, 47 ],
                38: 26
            }, {
                18: [ 2, 26 ]
            }, {
                18: [ 2, 30 ],
                28: [ 2, 30 ],
                30: [ 2, 30 ],
                31: [ 2, 30 ],
                32: [ 2, 30 ],
                35: [ 2, 30 ]
            }, {
                18: [ 2, 36 ],
                34: 59,
                35: [ 1, 60 ]
            }, {
                18: [ 2, 31 ],
                28: [ 2, 31 ],
                30: [ 2, 31 ],
                31: [ 2, 31 ],
                32: [ 2, 31 ],
                35: [ 2, 31 ]
            }, {
                18: [ 2, 32 ],
                28: [ 2, 32 ],
                30: [ 2, 32 ],
                31: [ 2, 32 ],
                32: [ 2, 32 ],
                35: [ 2, 32 ]
            }, {
                18: [ 2, 33 ],
                28: [ 2, 33 ],
                30: [ 2, 33 ],
                31: [ 2, 33 ],
                32: [ 2, 33 ],
                35: [ 2, 33 ]
            }, {
                18: [ 2, 34 ],
                28: [ 2, 34 ],
                30: [ 2, 34 ],
                31: [ 2, 34 ],
                32: [ 2, 34 ],
                35: [ 2, 34 ]
            }, {
                18: [ 2, 35 ],
                28: [ 2, 35 ],
                30: [ 2, 35 ],
                31: [ 2, 35 ],
                32: [ 2, 35 ],
                35: [ 2, 35 ]
            }, {
                18: [ 2, 38 ],
                35: [ 2, 38 ]
            }, {
                18: [ 2, 47 ],
                28: [ 2, 47 ],
                30: [ 2, 47 ],
                31: [ 2, 47 ],
                32: [ 2, 47 ],
                35: [ 2, 47 ],
                36: [ 1, 61 ],
                39: [ 2, 47 ]
            }, {
                35: [ 1, 62 ]
            }, {
                5: [ 2, 10 ],
                14: [ 2, 10 ],
                15: [ 2, 10 ],
                16: [ 2, 10 ],
                19: [ 2, 10 ],
                20: [ 2, 10 ],
                22: [ 2, 10 ],
                23: [ 2, 10 ],
                24: [ 2, 10 ]
            }, {
                21: 63,
                35: [ 1, 27 ],
                38: 26
            }, {
                5: [ 2, 11 ],
                14: [ 2, 11 ],
                15: [ 2, 11 ],
                16: [ 2, 11 ],
                19: [ 2, 11 ],
                20: [ 2, 11 ],
                22: [ 2, 11 ],
                23: [ 2, 11 ],
                24: [ 2, 11 ]
            }, {
                14: [ 2, 16 ],
                15: [ 2, 16 ],
                16: [ 2, 16 ],
                19: [ 2, 16 ],
                20: [ 2, 16 ],
                22: [ 2, 16 ],
                23: [ 2, 16 ],
                24: [ 2, 16 ]
            }, {
                5: [ 2, 19 ],
                14: [ 2, 19 ],
                15: [ 2, 19 ],
                16: [ 2, 19 ],
                19: [ 2, 19 ],
                20: [ 2, 19 ],
                22: [ 2, 19 ],
                23: [ 2, 19 ],
                24: [ 2, 19 ]
            }, {
                5: [ 2, 20 ],
                14: [ 2, 20 ],
                15: [ 2, 20 ],
                16: [ 2, 20 ],
                19: [ 2, 20 ],
                20: [ 2, 20 ],
                22: [ 2, 20 ],
                23: [ 2, 20 ],
                24: [ 2, 20 ]
            }, {
                5: [ 2, 21 ],
                14: [ 2, 21 ],
                15: [ 2, 21 ],
                16: [ 2, 21 ],
                19: [ 2, 21 ],
                20: [ 2, 21 ],
                22: [ 2, 21 ],
                23: [ 2, 21 ],
                24: [ 2, 21 ]
            }, {
                18: [ 1, 64 ]
            }, {
                18: [ 2, 24 ]
            }, {
                18: [ 2, 29 ],
                28: [ 2, 29 ],
                30: [ 2, 29 ],
                31: [ 2, 29 ],
                32: [ 2, 29 ],
                35: [ 2, 29 ]
            }, {
                18: [ 2, 37 ],
                35: [ 2, 37 ]
            }, {
                36: [ 1, 61 ]
            }, {
                21: 65,
                28: [ 1, 69 ],
                30: [ 1, 66 ],
                31: [ 1, 67 ],
                32: [ 1, 68 ],
                35: [ 1, 27 ],
                38: 26
            }, {
                18: [ 2, 46 ],
                28: [ 2, 46 ],
                30: [ 2, 46 ],
                31: [ 2, 46 ],
                32: [ 2, 46 ],
                35: [ 2, 46 ],
                39: [ 2, 46 ]
            }, {
                18: [ 1, 70 ]
            }, {
                5: [ 2, 22 ],
                14: [ 2, 22 ],
                15: [ 2, 22 ],
                16: [ 2, 22 ],
                19: [ 2, 22 ],
                20: [ 2, 22 ],
                22: [ 2, 22 ],
                23: [ 2, 22 ],
                24: [ 2, 22 ]
            }, {
                18: [ 2, 39 ],
                35: [ 2, 39 ]
            }, {
                18: [ 2, 40 ],
                35: [ 2, 40 ]
            }, {
                18: [ 2, 41 ],
                35: [ 2, 41 ]
            }, {
                18: [ 2, 42 ],
                35: [ 2, 42 ]
            }, {
                18: [ 2, 43 ],
                35: [ 2, 43 ]
            }, {
                5: [ 2, 18 ],
                14: [ 2, 18 ],
                15: [ 2, 18 ],
                16: [ 2, 18 ],
                19: [ 2, 18 ],
                20: [ 2, 18 ],
                22: [ 2, 18 ],
                23: [ 2, 18 ],
                24: [ 2, 18 ]
            } ],
            defaultActions: {
                17: [ 2, 1 ],
                25: [ 2, 28 ],
                38: [ 2, 26 ],
                57: [ 2, 24 ]
            },
            parseError: function(str) {
                throw Error(str);
            },
            parse: function(input) {
                function lex() {
                    var token;
                    return token = self.lexer.lex() || 1, "number" != typeof token && (token = self.symbols_[token] || token), 
                    token;
                }
                var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0;
                this.lexer.setInput(input), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, 
                this.yy.parser = this, this.lexer.yylloc === undefined && (this.lexer.yylloc = {});
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                var ranges = this.lexer.options && this.lexer.options.ranges;
                "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, yyval = {}; ;) {
                    if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : ((null === symbol || symbol === undefined) && (symbol = lex()), 
                    action = table[state] && table[state][symbol]), action === undefined || !action.length || !action[0]) {
                        var errStr = "";
                        if (!recovering) {
                            expected = [];
                            for (p in table[state]) this.terminals_[p] && p > 2 && expected.push("'" + this.terminals_[p] + "'");
                            errStr = this.lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (1 == symbol ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), 
                            this.parseError(errStr, {
                                text: this.lexer.match,
                                token: this.terminals_[symbol] || symbol,
                                line: this.lexer.yylineno,
                                loc: yyloc,
                                expected: expected
                            });
                        }
                    }
                    if (action[0] instanceof Array && action.length > 1) throw Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                    switch (action[0]) {
                      case 1:
                        stack.push(symbol), vstack.push(this.lexer.yytext), lstack.push(this.lexer.yylloc), 
                        stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, 
                        preErrorSymbol = null) : (yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, 
                        yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, recovering > 0 && recovering--);
                        break;

                      case 2:
                        if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], 
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        }, ranges && (yyval._$.range = [ lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1] ]), 
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack), 
                        r !== undefined) return r;
                        len && (stack = stack.slice(0, 2 * -1 * len), vstack = vstack.slice(0, -1 * len), 
                        lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), 
                        vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], 
                        stack.push(newState);
                        break;

                      case 3:
                        return !0;
                    }
                }
                return !0;
            }
        }, lexer = function() {
            var lexer = {
                EOF: 1,
                parseError: function(str, hash) {
                    if (!this.yy.parser) throw Error(str);
                    this.yy.parser.parseError(str, hash);
                },
                setInput: function(input) {
                    return this._input = input, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, 
                    this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
                    this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                    }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
                },
                input: function() {
                    var ch = this._input[0];
                    this.yytext += ch, this.yyleng++, this.offset++, this.match += ch, this.matched += ch;
                    var lines = ch.match(/(?:\r\n?|\n).*/g);
                    return lines ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
                    this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
                    ch;
                },
                unput: function(ch) {
                    var len = ch.length, lines = ch.split(/(?:\r\n?|\n)/g);
                    this._input = ch + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - len - 1), 
                    this.offset -= len;
                    var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
                    lines.length - 1 && (this.yylineno -= lines.length - 1);
                    var r = this.yylloc.range;
                    return this.yylloc = {
                        first_line: this.yylloc.first_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.first_column,
                        last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                    }, this.options.ranges && (this.yylloc.range = [ r[0], r[0] + this.yyleng - len ]), 
                    this;
                },
                more: function() {
                    return this._more = !0, this;
                },
                less: function(n) {
                    this.unput(this.match.slice(n));
                },
                pastInput: function() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                    var next = this.match;
                    return 20 > next.length && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                    var pre = this.pastInput(), c = Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                },
                next: function() {
                    if (this.done) return this.EOF;
                    this._input || (this.done = !0);
                    var token, match, tempMatch, index, lines;
                    this._more || (this.yytext = "", this.match = "");
                    for (var rules = this._currentRules(), i = 0; rules.length > i && (tempMatch = this._input.match(this.rules[rules[i]]), 
                    !tempMatch || match && !(tempMatch[0].length > match[0].length) || (match = tempMatch, 
                    index = i, this.options.flex)); i++) ;
                    return match ? (lines = match[0].match(/(?:\r\n?|\n).*/g), lines && (this.yylineno += lines.length), 
                    this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                    }, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, 
                    this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
                    this._more = !1, this._input = this._input.slice(match[0].length), this.matched += match[0], 
                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]), 
                    this.done && this._input && (this.done = !1), token ? token : undefined) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                },
                lex: function() {
                    var r = this.next();
                    return r !== undefined ? r : this.lex();
                },
                begin: function(condition) {
                    this.conditionStack.push(condition);
                },
                popState: function() {
                    return this.conditionStack.pop();
                },
                _currentRules: function() {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                },
                topState: function() {
                    return this.conditionStack[this.conditionStack.length - 2];
                },
                pushState: function(condition) {
                    this.begin(condition);
                }
            };
            return lexer.options = {}, lexer.performAction = function(yy, yy_, $avoiding_name_collisions, YY_START) {
                switch ($avoiding_name_collisions) {
                  case 0:
                    return yy_.yytext = "\\", 14;

                  case 1:
                    if ("\\" !== yy_.yytext.slice(-1) && this.begin("mu"), "\\" === yy_.yytext.slice(-1) && (yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1), 
                    this.begin("emu")), yy_.yytext) return 14;
                    break;

                  case 2:
                    return 14;

                  case 3:
                    return "\\" !== yy_.yytext.slice(-1) && this.popState(), "\\" === yy_.yytext.slice(-1) && (yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1)), 
                    14;

                  case 4:
                    return yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 4), this.popState(), 15;

                  case 5:
                    return this.begin("par"), 24;

                  case 6:
                    return 16;

                  case 7:
                    return 20;

                  case 8:
                    return 19;

                  case 9:
                    return 19;

                  case 10:
                    return 23;

                  case 11:
                    return 23;

                  case 12:
                    this.popState(), this.begin("com");
                    break;

                  case 13:
                    return yy_.yytext = yy_.yytext.substr(3, yy_.yyleng - 5), this.popState(), 15;

                  case 14:
                    return 22;

                  case 15:
                    return 36;

                  case 16:
                    return 35;

                  case 17:
                    return 35;

                  case 18:
                    return 39;

                  case 19:
                    break;

                  case 20:
                    return this.popState(), 18;

                  case 21:
                    return this.popState(), 18;

                  case 22:
                    return yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\"/g, '"'), 30;

                  case 23:
                    return yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\'/g, "'"), 30;

                  case 24:
                    return yy_.yytext = yy_.yytext.substr(1), 28;

                  case 25:
                    return 32;

                  case 26:
                    return 32;

                  case 27:
                    return 31;

                  case 28:
                    return 35;

                  case 29:
                    return yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2), 35;

                  case 30:
                    return "INVALID";

                  case 31:
                    break;

                  case 32:
                    return this.popState(), 37;

                  case 33:
                    return 5;
                }
            }, lexer.rules = [ /^(?:\\\\(?=(\{\{)))/, /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[}/ ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$:\-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:\s+)/, /^(?:[a-zA-Z0-9_$\-\/]+)/, /^(?:$)/ ], 
            lexer.conditions = {
                mu: {
                    rules: [ 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33 ],
                    inclusive: !1
                },
                emu: {
                    rules: [ 3 ],
                    inclusive: !1
                },
                com: {
                    rules: [ 4 ],
                    inclusive: !1
                },
                par: {
                    rules: [ 31, 32 ],
                    inclusive: !1
                },
                INITIAL: {
                    rules: [ 0, 1, 2, 33 ],
                    inclusive: !0
                }
            }, lexer;
        }();
        return parser.lexer = lexer, Parser.prototype = parser, parser.Parser = Parser, 
        new Parser();
    }();
    Handlebars.Parser = handlebars, Handlebars.parse = function(input) {
        return input.constructor === Handlebars.AST.ProgramNode ? input : (Handlebars.Parser.yy = Handlebars.AST, 
        Handlebars.Parser.parse(input));
    }, Handlebars.AST = {}, Handlebars.AST.ProgramNode = function(statements, inverse) {
        this.type = "program", this.statements = statements, inverse && (this.inverse = new Handlebars.AST.ProgramNode(inverse));
    }, Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
        this.type = "mustache", this.escaped = !unescaped, this.hash = hash;
        var id = this.id = rawParams[0], params = this.params = rawParams.slice(1), eligibleHelper = this.eligibleHelper = id.isSimple;
        this.isHelper = eligibleHelper && (params.length || hash);
    }, Handlebars.AST.PartialNode = function(partialName, context) {
        this.type = "partial", this.partialName = partialName, this.context = context;
    }, Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
        var verifyMatch = function(open, close) {
            if (open.original !== close.original) throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
        };
        verifyMatch(mustache.id, close), this.type = "block", this.mustache = mustache, 
        this.program = program, this.inverse = inverse, this.inverse && !this.program && (this.isInverse = !0);
    }, Handlebars.AST.ContentNode = function(string) {
        this.type = "content", this.string = string;
    }, Handlebars.AST.HashNode = function(pairs) {
        this.type = "hash", this.pairs = pairs;
    }, Handlebars.AST.IdNode = function(parts) {
        this.type = "ID", this.original = parts.join(".");
        for (var dig = [], depth = 0, i = 0, l = parts.length; l > i; i++) {
            var part = parts[i];
            if (".." === part || "." === part || "this" === part) {
                if (dig.length > 0) throw new Handlebars.Exception("Invalid path: " + this.original);
                ".." === part ? depth++ : this.isScoped = !0;
            } else dig.push(part);
        }
        this.parts = dig, this.string = dig.join("."), this.depth = depth, this.isSimple = 1 === parts.length && !this.isScoped && 0 === depth, 
        this.stringModeValue = this.string;
    }, Handlebars.AST.PartialNameNode = function(name) {
        this.type = "PARTIAL_NAME", this.name = name;
    }, Handlebars.AST.DataNode = function(id) {
        this.type = "DATA", this.id = id;
    }, Handlebars.AST.StringNode = function(string) {
        this.type = "STRING", this.string = string, this.stringModeValue = string;
    }, Handlebars.AST.IntegerNode = function(integer) {
        this.type = "INTEGER", this.integer = integer, this.stringModeValue = Number(integer);
    }, Handlebars.AST.BooleanNode = function(bool) {
        this.type = "BOOLEAN", this.bool = bool, this.stringModeValue = "true" === bool;
    }, Handlebars.AST.CommentNode = function(comment) {
        this.type = "comment", this.comment = comment;
    };
    var errorProps = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
    Handlebars.Exception = function() {
        for (var tmp = Error.prototype.constructor.apply(this, arguments), idx = 0; errorProps.length > idx; idx++) this[errorProps[idx]] = tmp[errorProps[idx]];
    }, Handlebars.Exception.prototype = Error(), Handlebars.SafeString = function(string) {
        this.string = string;
    }, Handlebars.SafeString.prototype.toString = function() {
        return "" + this.string;
    };
    var escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, badChars = /[&<>"'`]/g, possible = /[&<>"'`]/, escapeChar = function(chr) {
        return escape[chr] || "&amp;";
    };
    Handlebars.Utils = {
        extend: function(obj, value) {
            for (var key in value) value.hasOwnProperty(key) && (obj[key] = value[key]);
        },
        escapeExpression: function(string) {
            return string instanceof Handlebars.SafeString ? "" + string : null == string || string === !1 ? "" : (string = "" + string, 
            possible.test(string) ? string.replace(badChars, escapeChar) : string);
        },
        isEmpty: function(value) {
            return value || 0 === value ? "[object Array]" === toString.call(value) && 0 === value.length ? !0 : !1 : !0;
        }
    };
    var Compiler = Handlebars.Compiler = function() {}, JavaScriptCompiler = Handlebars.JavaScriptCompiler = function() {};
    Compiler.prototype = {
        compiler: Compiler,
        disassemble: function() {
            for (var opcode, params, param, opcodes = this.opcodes, out = [], i = 0, l = opcodes.length; l > i; i++) if (opcode = opcodes[i], 
            "DECLARE" === opcode.opcode) out.push("DECLARE " + opcode.name + "=" + opcode.value); else {
                params = [];
                for (var j = 0; opcode.args.length > j; j++) param = opcode.args[j], "string" == typeof param && (param = '"' + param.replace("\n", "\\n") + '"'), 
                params.push(param);
                out.push(opcode.opcode + " " + params.join(" "));
            }
            return out.join("\n");
        },
        equals: function(other) {
            var len = this.opcodes.length;
            if (other.opcodes.length !== len) return !1;
            for (var i = 0; len > i; i++) {
                var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
                if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) return !1;
                for (var j = 0; opcode.args.length > j; j++) if (opcode.args[j] !== otherOpcode.args[j]) return !1;
            }
            if (len = this.children.length, other.children.length !== len) return !1;
            for (i = 0; len > i; i++) if (!this.children[i].equals(other.children[i])) return !1;
            return !0;
        },
        guid: 0,
        compile: function(program, options) {
            this.children = [], this.depths = {
                list: []
            }, this.options = options;
            var knownHelpers = this.options.knownHelpers;
            if (this.options.knownHelpers = {
                helperMissing: !0,
                blockHelperMissing: !0,
                each: !0,
                "if": !0,
                unless: !0,
                "with": !0,
                log: !0
            }, knownHelpers) for (var name in knownHelpers) this.options.knownHelpers[name] = knownHelpers[name];
            return this.program(program);
        },
        accept: function(node) {
            return this[node.type](node);
        },
        program: function(program) {
            var statement, statements = program.statements;
            this.opcodes = [];
            for (var i = 0, l = statements.length; l > i; i++) statement = statements[i], this[statement.type](statement);
            return this.isSimple = 1 === l, this.depths.list = this.depths.list.sort(function(a, b) {
                return a - b;
            }), this;
        },
        compileProgram: function(program) {
            var depth, result = new this.compiler().compile(program, this.options), guid = this.guid++;
            this.usePartial = this.usePartial || result.usePartial, this.children[guid] = result;
            for (var i = 0, l = result.depths.list.length; l > i; i++) depth = result.depths.list[i], 
            2 > depth || this.addDepth(depth - 1);
            return guid;
        },
        block: function(block) {
            var mustache = block.mustache, program = block.program, inverse = block.inverse;
            program && (program = this.compileProgram(program)), inverse && (inverse = this.compileProgram(inverse));
            var type = this.classifyMustache(mustache);
            "helper" === type ? this.helperMustache(mustache, program, inverse) : "simple" === type ? (this.simpleMustache(mustache), 
            this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), this.opcode("emptyHash"), 
            this.opcode("blockValue")) : (this.ambiguousMustache(mustache, program, inverse), 
            this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), this.opcode("emptyHash"), 
            this.opcode("ambiguousBlockValue")), this.opcode("append");
        },
        hash: function(hash) {
            var pair, val, pairs = hash.pairs;
            this.opcode("pushHash");
            for (var i = 0, l = pairs.length; l > i; i++) pair = pairs[i], val = pair[1], this.options.stringParams ? (val.depth && this.addDepth(val.depth), 
            this.opcode("getContext", val.depth || 0), this.opcode("pushStringParam", val.stringModeValue, val.type)) : this.accept(val), 
            this.opcode("assignToHash", pair[0]);
            this.opcode("popHash");
        },
        partial: function(partial) {
            var partialName = partial.partialName;
            this.usePartial = !0, partial.context ? this.ID(partial.context) : this.opcode("push", "depth0"), 
            this.opcode("invokePartial", partialName.name), this.opcode("append");
        },
        content: function(content) {
            this.opcode("appendContent", content.string);
        },
        mustache: function(mustache) {
            var options = this.options, type = this.classifyMustache(mustache);
            "simple" === type ? this.simpleMustache(mustache) : "helper" === type ? this.helperMustache(mustache) : this.ambiguousMustache(mustache), 
            mustache.escaped && !options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
        },
        ambiguousMustache: function(mustache, program, inverse) {
            var id = mustache.id, name = id.parts[0], isBlock = null != program || null != inverse;
            this.opcode("getContext", id.depth), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), 
            this.opcode("invokeAmbiguous", name, isBlock);
        },
        simpleMustache: function(mustache) {
            var id = mustache.id;
            "DATA" === id.type ? this.DATA(id) : id.parts.length ? this.ID(id) : (this.addDepth(id.depth), 
            this.opcode("getContext", id.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda");
        },
        helperMustache: function(mustache, program, inverse) {
            var params = this.setupFullMustacheParams(mustache, program, inverse), name = mustache.id.parts[0];
            if (this.options.knownHelpers[name]) this.opcode("invokeKnownHelper", params.length, name); else {
                if (this.options.knownHelpersOnly) throw Error("You specified knownHelpersOnly, but used the unknown helper " + name);
                this.opcode("invokeHelper", params.length, name);
            }
        },
        ID: function(id) {
            this.addDepth(id.depth), this.opcode("getContext", id.depth);
            var name = id.parts[0];
            name ? this.opcode("lookupOnContext", id.parts[0]) : this.opcode("pushContext");
            for (var i = 1, l = id.parts.length; l > i; i++) this.opcode("lookup", id.parts[i]);
        },
        DATA: function(data) {
            this.options.data = !0, this.opcode("lookupData", data.id);
        },
        STRING: function(string) {
            this.opcode("pushString", string.string);
        },
        INTEGER: function(integer) {
            this.opcode("pushLiteral", integer.integer);
        },
        BOOLEAN: function(bool) {
            this.opcode("pushLiteral", bool.bool);
        },
        comment: function() {},
        opcode: function(name) {
            this.opcodes.push({
                opcode: name,
                args: [].slice.call(arguments, 1)
            });
        },
        declare: function(name, value) {
            this.opcodes.push({
                opcode: "DECLARE",
                name: name,
                value: value
            });
        },
        addDepth: function(depth) {
            if (isNaN(depth)) throw Error("EWOT");
            0 !== depth && (this.depths[depth] || (this.depths[depth] = !0, this.depths.list.push(depth)));
        },
        classifyMustache: function(mustache) {
            var isHelper = mustache.isHelper, isEligible = mustache.eligibleHelper, options = this.options;
            if (isEligible && !isHelper) {
                var name = mustache.id.parts[0];
                options.knownHelpers[name] ? isHelper = !0 : options.knownHelpersOnly && (isEligible = !1);
            }
            return isHelper ? "helper" : isEligible ? "ambiguous" : "simple";
        },
        pushParams: function(params) {
            for (var param, i = params.length; i--; ) param = params[i], this.options.stringParams ? (param.depth && this.addDepth(param.depth), 
            this.opcode("getContext", param.depth || 0), this.opcode("pushStringParam", param.stringModeValue, param.type)) : this[param.type](param);
        },
        setupMustacheParams: function(mustache) {
            var params = mustache.params;
            return this.pushParams(params), mustache.hash ? this.hash(mustache.hash) : this.opcode("emptyHash"), 
            params;
        },
        setupFullMustacheParams: function(mustache, program, inverse) {
            var params = mustache.params;
            return this.pushParams(params), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), 
            mustache.hash ? this.hash(mustache.hash) : this.opcode("emptyHash"), params;
        }
    };
    var Literal = function(value) {
        this.value = value;
    };
    JavaScriptCompiler.prototype = {
        nameLookup: function(parent, name) {
            return /^[0-9]+$/.test(name) ? parent + "[" + name + "]" : JavaScriptCompiler.isValidJavaScriptVariableName(name) ? parent + "." + name : parent + "['" + name + "']";
        },
        appendToBuffer: function(string) {
            return this.environment.isSimple ? "return " + string + ";" : {
                appendToBuffer: !0,
                content: string,
                toString: function() {
                    return "buffer += " + string + ";";
                }
            };
        },
        initializeBuffer: function() {
            return this.quotedString("");
        },
        namespace: "Handlebars",
        compile: function(environment, options, context, asObject) {
            this.environment = environment, this.options = options || {}, Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n"), 
            this.name = this.environment.name, this.isChild = !!context, this.context = context || {
                programs: [],
                environments: [],
                aliases: {}
            }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {
                list: []
            }, this.compileStack = [], this.inlineStack = [], this.compileChildren(environment, options);
            var opcode, opcodes = environment.opcodes;
            for (this.i = 0, l = opcodes.length; l > this.i; this.i++) opcode = opcodes[this.i], 
            "DECLARE" === opcode.opcode ? this[opcode.name] = opcode.value : this[opcode.opcode].apply(this, opcode.args);
            return this.createFunctionContext(asObject);
        },
        nextOpcode: function() {
            var opcodes = this.environment.opcodes;
            return opcodes[this.i + 1];
        },
        eat: function() {
            this.i = this.i + 1;
        },
        preamble: function() {
            var out = [];
            if (this.isChild) out.push(""); else {
                var namespace = this.namespace, copies = "helpers = helpers || " + namespace + ".helpers;";
                this.environment.usePartial && (copies = copies + " partials = partials || " + namespace + ".partials;"), 
                this.options.data && (copies += " data = data || {};"), out.push(copies);
            }
            this.environment.isSimple ? out.push("") : out.push(", buffer = " + this.initializeBuffer()), 
            this.lastContext = 0, this.source = out;
        },
        createFunctionContext: function(asObject) {
            var locals = this.stackVars.concat(this.registers.list);
            if (locals.length > 0 && (this.source[1] = this.source[1] + ", " + locals.join(", ")), 
            !this.isChild) for (var alias in this.context.aliases) this.source[1] = this.source[1] + ", " + alias + "=" + this.context.aliases[alias];
            this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), 
            this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), 
            this.environment.isSimple || this.source.push("return buffer;");
            for (var params = this.isChild ? [ "depth0", "data" ] : [ "Handlebars", "depth0", "helpers", "partials", "data" ], i = 0, l = this.environment.depths.list.length; l > i; i++) params.push("depth" + this.environment.depths.list[i]);
            var source = this.mergeSource();
            if (!this.isChild) {
                var revision = Handlebars.COMPILER_REVISION, versions = Handlebars.REVISION_CHANGES[revision];
                source = "this.compilerInfo = [" + revision + ",'" + versions + "'];\n" + source;
            }
            if (asObject) return params.push(source), Function.apply(this, params);
            var functionSource = "function " + (this.name || "") + "(" + params.join(",") + ") {\n  " + source + "}";
            return Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n"), functionSource;
        },
        mergeSource: function() {
            for (var buffer, source = "", i = 0, len = this.source.length; len > i; i++) {
                var line = this.source[i];
                line.appendToBuffer ? buffer = buffer ? buffer + "\n    + " + line.content : line.content : (buffer && (source += "buffer += " + buffer + ";\n  ", 
                buffer = undefined), source += line + "\n  ");
            }
            return source;
        },
        blockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var params = [ "depth0" ];
            this.setupParams(0, params), this.replaceStack(function(current) {
                return params.splice(1, 0, current), "blockHelperMissing.call(" + params.join(", ") + ")";
            });
        },
        ambiguousBlockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var params = [ "depth0" ];
            this.setupParams(0, params);
            var current = this.topStack();
            params.splice(1, 0, current), params[params.length - 1] = "options", this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
        },
        appendContent: function(content) {
            this.source.push(this.appendToBuffer(this.quotedString(content)));
        },
        append: function() {
            this.flushInline();
            var local = this.popStack();
            this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }"), 
            this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }");
        },
        appendEscaped: function() {
            this.context.aliases.escapeExpression = "this.escapeExpression", this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
        },
        getContext: function(depth) {
            this.lastContext !== depth && (this.lastContext = depth);
        },
        lookupOnContext: function(name) {
            this.push(this.nameLookup("depth" + this.lastContext, name, "context"));
        },
        pushContext: function() {
            this.pushStackLiteral("depth" + this.lastContext);
        },
        resolvePossibleLambda: function() {
            this.context.aliases.functionType = '"function"', this.replaceStack(function(current) {
                return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
            });
        },
        lookup: function(name) {
            this.replaceStack(function(current) {
                return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, "context");
            });
        },
        lookupData: function(id) {
            this.push(this.nameLookup("data", id, "data"));
        },
        pushStringParam: function(string, type) {
            this.pushStackLiteral("depth" + this.lastContext), this.pushString(type), "string" == typeof string ? this.pushString(string) : this.pushStackLiteral(string);
        },
        emptyHash: function() {
            this.pushStackLiteral("{}"), this.options.stringParams && (this.register("hashTypes", "{}"), 
            this.register("hashContexts", "{}"));
        },
        pushHash: function() {
            this.hash = {
                values: [],
                types: [],
                contexts: []
            };
        },
        popHash: function() {
            var hash = this.hash;
            this.hash = undefined, this.options.stringParams && (this.register("hashContexts", "{" + hash.contexts.join(",") + "}"), 
            this.register("hashTypes", "{" + hash.types.join(",") + "}")), this.push("{\n    " + hash.values.join(",\n    ") + "\n  }");
        },
        pushString: function(string) {
            this.pushStackLiteral(this.quotedString(string));
        },
        push: function(expr) {
            return this.inlineStack.push(expr), expr;
        },
        pushLiteral: function(value) {
            this.pushStackLiteral(value);
        },
        pushProgram: function(guid) {
            null != guid ? this.pushStackLiteral(this.programExpression(guid)) : this.pushStackLiteral(null);
        },
        invokeHelper: function(paramSize, name) {
            this.context.aliases.helperMissing = "helpers.helperMissing";
            var helper = this.lastHelper = this.setupHelper(paramSize, name, !0);
            this.push(helper.name), this.replaceStack(function(name) {
                return name + " ? " + name + ".call(" + helper.callParams + ") " + ": helperMissing.call(" + helper.helperMissingParams + ")";
            });
        },
        invokeKnownHelper: function(paramSize, name) {
            var helper = this.setupHelper(paramSize, name);
            this.push(helper.name + ".call(" + helper.callParams + ")");
        },
        invokeAmbiguous: function(name, helperCall) {
            this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
            var helper = this.setupHelper(0, name, helperCall), helperName = this.lastHelper = this.nameLookup("helpers", name, "helper"), nonHelper = this.nameLookup("depth" + this.lastContext, name, "context"), nextStack = this.nextStack();
            this.source.push("if (" + nextStack + " = " + helperName + ") { " + nextStack + " = " + nextStack + ".call(" + helper.callParams + "); }"), 
            this.source.push("else { " + nextStack + " = " + nonHelper + "; " + nextStack + " = typeof " + nextStack + " === functionType ? " + nextStack + ".apply(depth0) : " + nextStack + "; }");
        },
        invokePartial: function(name) {
            var params = [ this.nameLookup("partials", name, "partial"), "'" + name + "'", this.popStack(), "helpers", "partials" ];
            this.options.data && params.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + params.join(", ") + ")");
        },
        assignToHash: function(key) {
            var context, type, value = this.popStack();
            this.options.stringParams && (type = this.popStack(), context = this.popStack());
            var hash = this.hash;
            context && hash.contexts.push("'" + key + "': " + context), type && hash.types.push("'" + key + "': " + type), 
            hash.values.push("'" + key + "': (" + value + ")");
        },
        compiler: JavaScriptCompiler,
        compileChildren: function(environment, options) {
            for (var child, compiler, children = environment.children, i = 0, l = children.length; l > i; i++) {
                child = children[i], compiler = new this.compiler();
                var index = this.matchExistingProgram(child);
                null == index ? (this.context.programs.push(""), index = this.context.programs.length, 
                child.index = index, child.name = "program" + index, this.context.programs[index] = compiler.compile(child, options, this.context), 
                this.context.environments[index] = child) : (child.index = index, child.name = "program" + index);
            }
        },
        matchExistingProgram: function(child) {
            for (var i = 0, len = this.context.environments.length; len > i; i++) {
                var environment = this.context.environments[i];
                if (environment && environment.equals(child)) return i;
            }
        },
        programExpression: function(guid) {
            if (this.context.aliases.self = "this", null == guid) return "self.noop";
            for (var depth, child = this.environment.children[guid], depths = child.depths.list, programParams = [ child.index, child.name, "data" ], i = 0, l = depths.length; l > i; i++) depth = depths[i], 
            1 === depth ? programParams.push("depth0") : programParams.push("depth" + (depth - 1));
            return (0 === depths.length ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
        },
        register: function(name, val) {
            this.useRegister(name), this.source.push(name + " = " + val + ";");
        },
        useRegister: function(name) {
            this.registers[name] || (this.registers[name] = !0, this.registers.list.push(name));
        },
        pushStackLiteral: function(item) {
            return this.push(new Literal(item));
        },
        pushStack: function(item) {
            this.flushInline();
            var stack = this.incrStack();
            return item && this.source.push(stack + " = " + item + ";"), this.compileStack.push(stack), 
            stack;
        },
        replaceStack: function(callback) {
            var stack, prefix = "", inline = this.isInline();
            if (inline) {
                var top = this.popStack(!0);
                if (top instanceof Literal) stack = top.value; else {
                    var name = this.stackSlot ? this.topStackName() : this.incrStack();
                    prefix = "(" + this.push(name) + " = " + top + "),", stack = this.topStack();
                }
            } else stack = this.topStack();
            var item = callback.call(this, stack);
            return inline ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), 
            this.push("(" + prefix + item + ")")) : (/^stack/.test(stack) || (stack = this.nextStack()), 
            this.source.push(stack + " = (" + prefix + item + ");")), stack;
        },
        nextStack: function() {
            return this.pushStack();
        },
        incrStack: function() {
            return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), 
            this.topStackName();
        },
        topStackName: function() {
            return "stack" + this.stackSlot;
        },
        flushInline: function() {
            var inlineStack = this.inlineStack;
            if (inlineStack.length) {
                this.inlineStack = [];
                for (var i = 0, len = inlineStack.length; len > i; i++) {
                    var entry = inlineStack[i];
                    entry instanceof Literal ? this.compileStack.push(entry) : this.pushStack(entry);
                }
            }
        },
        isInline: function() {
            return this.inlineStack.length;
        },
        popStack: function(wrapped) {
            var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
            return !wrapped && item instanceof Literal ? item.value : (inline || this.stackSlot--, 
            item);
        },
        topStack: function(wrapped) {
            var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
            return !wrapped && item instanceof Literal ? item.value : item;
        },
        quotedString: function(str) {
            return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
        },
        setupHelper: function(paramSize, name, missingParams) {
            var params = [];
            this.setupParams(paramSize, params, missingParams);
            var foundHelper = this.nameLookup("helpers", name, "helper");
            return {
                params: params,
                name: foundHelper,
                callParams: [ "depth0" ].concat(params).join(", "),
                helperMissingParams: missingParams && [ "depth0", this.quotedString(name) ].concat(params).join(", ")
            };
        },
        setupParams: function(paramSize, params, useRegister) {
            var param, inverse, program, options = [], contexts = [], types = [];
            options.push("hash:" + this.popStack()), inverse = this.popStack(), program = this.popStack(), 
            (program || inverse) && (program || (this.context.aliases.self = "this", program = "self.noop"), 
            inverse || (this.context.aliases.self = "this", inverse = "self.noop"), options.push("inverse:" + inverse), 
            options.push("fn:" + program));
            for (var i = 0; paramSize > i; i++) param = this.popStack(), params.push(param), 
            this.options.stringParams && (types.push(this.popStack()), contexts.push(this.popStack()));
            return this.options.stringParams && (options.push("contexts:[" + contexts.join(",") + "]"), 
            options.push("types:[" + types.join(",") + "]"), options.push("hashContexts:hashContexts"), 
            options.push("hashTypes:hashTypes")), this.options.data && options.push("data:data"), 
            options = "{" + options.join(",") + "}", useRegister ? (this.register("options", options), 
            params.push("options")) : params.push(options), params.join(", ");
        }
    };
    for (var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), compilerWords = JavaScriptCompiler.RESERVED_WORDS = {}, i = 0, l = reservedWords.length; l > i; i++) compilerWords[reservedWords[i]] = !0;
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
        return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name) ? !0 : !1;
    }, Handlebars.precompile = function(input, options) {
        if (null == input || "string" != typeof input && input.constructor !== Handlebars.AST.ProgramNode) throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
        options = options || {}, "data" in options || (options.data = !0);
        var ast = Handlebars.parse(input), environment = new Compiler().compile(ast, options);
        return new JavaScriptCompiler().compile(environment, options);
    }, Handlebars.compile = function(input, options) {
        function compile() {
            var ast = Handlebars.parse(input), environment = new Compiler().compile(ast, options), templateSpec = new JavaScriptCompiler().compile(environment, options, undefined, !0);
            return Handlebars.template(templateSpec);
        }
        if (null == input || "string" != typeof input && input.constructor !== Handlebars.AST.ProgramNode) throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
        options = options || {}, "data" in options || (options.data = !0);
        var compiled;
        return function(context, options) {
            return compiled || (compiled = compile()), compiled.call(this, context, options);
        };
    }, Handlebars.VM = {
        template: function(templateSpec) {
            var container = {
                escapeExpression: Handlebars.Utils.escapeExpression,
                invokePartial: Handlebars.VM.invokePartial,
                programs: [],
                program: function(i, fn, data) {
                    var programWrapper = this.programs[i];
                    return data ? programWrapper = Handlebars.VM.program(i, fn, data) : programWrapper || (programWrapper = this.programs[i] = Handlebars.VM.program(i, fn)), 
                    programWrapper;
                },
                programWithDepth: Handlebars.VM.programWithDepth,
                noop: Handlebars.VM.noop,
                compilerInfo: null
            };
            return function(context, options) {
                options = options || {};
                var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data), compilerInfo = container.compilerInfo || [], compilerRevision = compilerInfo[0] || 1, currentRevision = Handlebars.COMPILER_REVISION;
                if (compilerRevision !== currentRevision) {
                    if (currentRevision > compilerRevision) {
                        var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision], compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
                        throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").";
                    }
                    throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").";
                }
                return result;
            };
        },
        programWithDepth: function(i, fn, data) {
            var args = Array.prototype.slice.call(arguments, 3), program = function(context, options) {
                return options = options || {}, fn.apply(this, [ context, options.data || data ].concat(args));
            };
            return program.program = i, program.depth = args.length, program;
        },
        program: function(i, fn, data) {
            var program = function(context, options) {
                return options = options || {}, fn(context, options.data || data);
            };
            return program.program = i, program.depth = 0, program;
        },
        noop: function() {
            return "";
        },
        invokePartial: function(partial, name, context, helpers, partials, data) {
            var options = {
                helpers: helpers,
                partials: partials,
                data: data
            };
            if (partial === undefined) throw new Handlebars.Exception("The partial " + name + " could not be found");
            if (partial instanceof Function) return partial(context, options);
            if (Handlebars.compile) return partials[name] = Handlebars.compile(partial, {
                data: data !== undefined
            }), partials[name](context, options);
            throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
        }
    }, Handlebars.template = Handlebars.VM.template;
})(Handlebars), "function" != typeof Object.create && (Object.create = function(o) {
    function F() {}
    return F.prototype = o, new F();
}), function($) {
    var NotyObject = {
        init: function(options) {
            return this.options = $.extend({}, $.noty.defaults, options), this.options.layout = this.options.custom ? $.noty.layouts.inline : $.noty.layouts[this.options.layout], 
            this.options.theme = $.noty.themes[this.options.theme], delete options.layout, delete options.theme, 
            this.options = $.extend({}, this.options, this.options.layout.options), this.options.id = "noty_" + new Date().getTime() * Math.floor(1e6 * Math.random()), 
            this.options = $.extend({}, this.options, options), this._build(), this;
        },
        _build: function() {
            var $bar = $('<div class="noty_bar"/>').attr("id", this.options.id);
            if ($bar.append(this.options.template).find(".noty_text").html(this.options.text), 
            this.$bar = null !== this.options.layout.parent.object ? $(this.options.layout.parent.object).css(this.options.layout.parent.css).append($bar) : $bar, 
            this.options.buttons) {
                this.options.closeWith = [], this.options.timeout = !1;
                var $buttons = $("<div/>").addClass("noty_buttons");
                null !== this.options.layout.parent.object ? this.$bar.find(".noty_bar").append($buttons) : this.$bar.append($buttons);
                var self = this;
                $.each(this.options.buttons, function(i, button) {
                    var $button = $("<button/>").addClass(button.addClass ? button.addClass : "gray").html(button.text).appendTo(self.$bar.find(".noty_buttons")).bind("click", function() {
                        $.isFunction(button.onClick) && button.onClick.call($button, self);
                    });
                });
            }
            this.$message = this.$bar.find(".noty_message"), this.$closeButton = this.$bar.find(".noty_close"), 
            this.$buttons = this.$bar.find(".noty_buttons"), $.noty.store[this.options.id] = this;
        },
        show: function() {
            var self = this;
            return $(self.options.layout.container.selector).append(self.$bar), self.options.theme.style.apply(self), 
            "function" === $.type(self.options.layout.css) ? this.options.layout.css.apply(self.$bar) : self.$bar.css(this.options.layout.css || {}), 
            self.$bar.addClass(self.options.layout.addClass), self.options.layout.container.style.apply($(self.options.layout.container.selector)), 
            self.options.theme.callback.onShow.apply(this), $.inArray("click", self.options.closeWith) > -1 && self.$bar.css("cursor", "pointer").one("click", function() {
                self.close();
            }), $.inArray("hover", self.options.closeWith) > -1 && self.$bar.one("mouseenter", function() {
                self.close();
            }), $.inArray("button", self.options.closeWith) > -1 && self.$closeButton.one("click", function() {
                self.close();
            }), -1 == $.inArray("button", self.options.closeWith) && self.$closeButton.remove(), 
            self.options.callback.onShow && self.options.callback.onShow.apply(self), self.$bar.animate(self.options.animation.open, self.options.animation.speed, self.options.animation.easing, function() {
                self.options.callback.afterShow && self.options.callback.afterShow.apply(self), 
                self.shown = !0;
            }), self.options.timeout && self.$bar.delay(self.options.timeout).promise().done(function() {
                self.close();
            }), this;
        },
        close: function() {
            if (!this.closed) {
                var self = this;
                if (!this.shown) return $.each($.noty.queue, function(i, n) {
                    n.options.id == self.options.id && $.noty.queue.splice(i, 1);
                }), void 0;
                self.$bar.addClass("i-am-closing-now"), self.options.callback.onClose && self.options.callback.onClose.apply(self), 
                self.$bar.clearQueue().stop().animate(self.options.animation.close, self.options.animation.speed, self.options.animation.easing, function() {
                    self.options.callback.afterClose && self.options.callback.afterClose.apply(self);
                }).promise().done(function() {
                    self.options.modal && ($.notyRenderer.setModalCount(-1), 0 == $.notyRenderer.getModalCount() && $(".noty_modal").fadeOut("fast", function() {
                        $(this).remove();
                    })), $.notyRenderer.setLayoutCountFor(self, -1), 0 == $.notyRenderer.getLayoutCountFor(self) && $(self.options.layout.container.selector).remove(), 
                    self.$bar.remove(), self.$bar = null, self.closed = !0, delete $.noty.store[self.options.id], 
                    self.options.dismissQueue || ($.noty.ontap = !0, $.notyRenderer.render());
                });
            }
        },
        setText: function(text) {
            return this.closed || (this.options.text = text, this.$bar.find(".noty_text").html(text)), 
            this;
        },
        setType: function(type) {
            return this.closed || (this.options.type = type, this.options.theme.style.apply(this), 
            this.options.theme.callback.onShow.apply(this)), this;
        },
        closed: !1,
        shown: !1
    };
    $.notyRenderer = {}, $.notyRenderer.init = function(options) {
        var notification = Object.create(NotyObject).init(options);
        return notification.options.force ? $.noty.queue.unshift(notification) : $.noty.queue.push(notification), 
        $.notyRenderer.render(), "object" == $.noty.returns ? notification : notification.options.id;
    }, $.notyRenderer.render = function() {
        var instance = $.noty.queue[0];
        "object" === $.type(instance) ? instance.options.dismissQueue ? $.notyRenderer.show($.noty.queue.shift()) : $.noty.ontap && ($.notyRenderer.show($.noty.queue.shift()), 
        $.noty.ontap = !1) : $.noty.ontap = !0;
    }, $.notyRenderer.show = function(notification) {
        notification.options.modal && ($.notyRenderer.createModalFor(notification), $.notyRenderer.setModalCount(1)), 
        0 == $(notification.options.layout.container.selector).length ? notification.options.custom ? notification.options.custom.append($(notification.options.layout.container.object).addClass("i-am-new")) : $("body").append($(notification.options.layout.container.object).addClass("i-am-new")) : $(notification.options.layout.container.selector).removeClass("i-am-new"), 
        $.notyRenderer.setLayoutCountFor(notification, 1), notification.show();
    }, $.notyRenderer.createModalFor = function(notification) {
        0 == $(".noty_modal").length && $("<div/>").addClass("noty_modal").data("noty_modal_count", 0).css(notification.options.theme.modal.css).prependTo($("body")).fadeIn("fast");
    }, $.notyRenderer.getLayoutCountFor = function(notification) {
        return $(notification.options.layout.container.selector).data("noty_layout_count") || 0;
    }, $.notyRenderer.setLayoutCountFor = function(notification, arg) {
        return $(notification.options.layout.container.selector).data("noty_layout_count", $.notyRenderer.getLayoutCountFor(notification) + arg);
    }, $.notyRenderer.getModalCount = function() {
        return $(".noty_modal").data("noty_modal_count") || 0;
    }, $.notyRenderer.setModalCount = function(arg) {
        return $(".noty_modal").data("noty_modal_count", $.notyRenderer.getModalCount() + arg);
    }, $.fn.noty = function(options) {
        return options.custom = $(this), $.notyRenderer.init(options);
    }, $.noty = {}, $.noty.queue = [], $.noty.ontap = !0, $.noty.layouts = {}, $.noty.themes = {}, 
    $.noty.returns = "object", $.noty.store = {}, $.noty.get = function(id) {
        return $.noty.store.hasOwnProperty(id) ? $.noty.store[id] : !1;
    }, $.noty.close = function(id) {
        return $.noty.get(id) ? $.noty.get(id).close() : !1;
    }, $.noty.setText = function(id, text) {
        return $.noty.get(id) ? $.noty.get(id).setText(text) : !1;
    }, $.noty.setType = function(id, type) {
        return $.noty.get(id) ? $.noty.get(id).setType(type) : !1;
    }, $.noty.clearQueue = function() {
        $.noty.queue = [];
    }, $.noty.closeAll = function() {
        $.noty.clearQueue(), $.each($.noty.store, function(id, noty) {
            noty.close();
        });
    };
    var windowAlert = window.alert;
    $.noty.consumeAlert = function(options) {
        window.alert = function(text) {
            options ? options.text = text : options = {
                text: text
            }, $.notyRenderer.init(options);
        };
    }, $.noty.stopConsumeAlert = function() {
        window.alert = windowAlert;
    }, $.noty.defaults = {
        layout: "top",
        theme: "default",
        type: "alert",
        text: "",
        dismissQueue: !0,
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: {
                height: "toggle"
            },
            close: {
                height: "toggle"
            },
            easing: "swing",
            speed: 500
        },
        timeout: !1,
        force: !1,
        modal: !1,
        closeWith: [ "click" ],
        callback: {
            onShow: function() {},
            afterShow: function() {},
            onClose: function() {},
            afterClose: function() {}
        },
        buttons: !1
    }, $(window).resize(function() {
        $.each($.noty.layouts, function(index, layout) {
            layout.container.style.apply($(layout.container.selector));
        });
    });
}(jQuery), function($) {
    $.noty.themes.default = {
        name: "default",
        helpers: {
            borderFix: function() {
                if (this.options.dismissQueue) {
                    var selector = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                      case "top":
                        $(selector).css({
                            borderRadius: "0px 0px 0px 0px"
                        }), $(selector).last().css({
                            borderRadius: "0px 0px 5px 5px"
                        });
                        break;

                      case "topCenter":
                      case "topLeft":
                      case "topRight":
                      case "bottomCenter":
                      case "bottomLeft":
                      case "bottomRight":
                      case "center":
                      case "centerLeft":
                      case "centerRight":
                      case "inline":
                        $(selector).css({
                            borderRadius: "0px 0px 0px 0px"
                        }), $(selector).first().css({
                            "border-top-left-radius": "5px",
                            "border-top-right-radius": "5px"
                        }), $(selector).last().css({
                            "border-bottom-left-radius": "5px",
                            "border-bottom-right-radius": "5px"
                        });
                        break;

                      case "bottom":
                        $(selector).css({
                            borderRadius: "0px 0px 0px 0px"
                        }), $(selector).first().css({
                            borderRadius: "5px 5px 0px 0px"
                        });
                        break;

                      default:                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function() {
            switch (this.$bar.css({
                overflow: "hidden",
                background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==') repeat-x scroll left top #fff"
            }), this.$message.css({
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "8px 10px 9px",
                width: "auto",
                position: "relative"
            }), this.$closeButton.css({
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 5,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            }), this.$buttons.find("button").css({
                marginLeft: 5
            }), this.$buttons.find("button:first").css({
                marginLeft: 0
            }), this.$bar.bind({
                mouseenter: function() {
                    $(this).find(".noty_close").fadeIn();
                },
                mouseleave: function() {
                    $(this).find(".noty_close").fadeOut();
                }
            }), this.options.layout.name) {
              case "top":
                this.$bar.css({
                    borderRadius: "0px 0px 5px 5px",
                    borderBottom: "2px solid #eee",
                    borderLeft: "2px solid #eee",
                    borderRight: "2px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;

              case "topCenter":
              case "center":
              case "bottomCenter":
              case "inline":
                this.$bar.css({
                    borderRadius: "5px",
                    border: "1px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }), this.$message.css({
                    fontSize: "13px",
                    textAlign: "center"
                });
                break;

              case "topLeft":
              case "topRight":
              case "bottomLeft":
              case "bottomRight":
              case "centerLeft":
              case "centerRight":
                this.$bar.css({
                    borderRadius: "5px",
                    border: "1px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }), this.$message.css({
                    fontSize: "13px",
                    textAlign: "left"
                });
                break;

              case "bottom":
                this.$bar.css({
                    borderRadius: "5px 5px 0px 0px",
                    borderTop: "2px solid #eee",
                    borderLeft: "2px solid #eee",
                    borderRight: "2px solid #eee",
                    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;

              default:
                this.$bar.css({
                    border: "2px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
            }
            switch (this.options.type) {
              case "alert":
              case "notification":
                this.$bar.css({
                    backgroundColor: "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                });
                break;

              case "warning":
                this.$bar.css({
                    backgroundColor: "#FFEAA8",
                    borderColor: "#FFC237",
                    color: "#826200"
                }), this.$buttons.css({
                    borderTop: "1px solid #FFC237"
                });
                break;

              case "error":
                this.$bar.css({
                    backgroundColor: "red",
                    borderColor: "darkred",
                    color: "#FFF"
                }), this.$message.css({
                    fontWeight: "bold"
                }), this.$buttons.css({
                    borderTop: "1px solid darkred"
                });
                break;

              case "information":
                this.$bar.css({
                    backgroundColor: "#57B7E2",
                    borderColor: "#0B90C4",
                    color: "#FFF"
                }), this.$buttons.css({
                    borderTop: "1px solid #0B90C4"
                });
                break;

              case "success":
                this.$bar.css({
                    backgroundColor: "lightgreen",
                    borderColor: "#50C24E",
                    color: "darkgreen"
                }), this.$buttons.css({
                    borderTop: "1px solid #50C24E"
                });
                break;

              default:
                this.$bar.css({
                    backgroundColor: "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                });
            }
        },
        callback: {
            onShow: function() {
                $.noty.themes.default.helpers.borderFix.apply(this);
            },
            onClose: function() {
                $.noty.themes.default.helpers.borderFix.apply(this);
            }
        }
    };
}(jQuery), function($) {
    $.noty.layouts.top = {
        name: "top",
        options: {},
        container: {
            object: '<ul id="noty_top_layout_container" />',
            selector: "ul#noty_top_layout_container",
            style: function() {
                $(this).css({
                    top: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                });
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    };
}(jQuery), function($) {
    $.noty.layouts.bottomRight = {
        name: "bottomRight",
        options: {},
        container: {
            object: '<ul id="noty_bottomRight_layout_container" />',
            selector: "ul#noty_bottomRight_layout_container",
            style: function() {
                $(this).css({
                    bottom: 20,
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), 600 > window.innerWidth && $(this).css({
                    right: 5
                });
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    };
}(jQuery), function() {
    var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
    b["aircraft-batch-debriefing.mu"] = a(function(a, b, c, d, e) {
        function k(a, b) {
            var e, d = "";
            return d += "\n<p> Based on your performance, you have an available bonus of $", 
            (e = c.bonus) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.bonus, e = typeof e === h ? e.apply(a) : e), d += i(e) + '.\n<div>\n  <button data-id="continue">Claim bonus and continue</button>\n  <!-- <button data-id="stop">Claim bonus and quit task</button> -->\n</div>\n';
        }
        function l() {
            return '\n<div>\n  <button data-id="continue">Continue</button>\n  <!-- <button data-id="stop">Quit task</button> -->\n</div>\n';
        }
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, f = "", h = "function", i = this.escapeExpression, j = this;
        return f += "<h3>End of Batch ", (g = c.id) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.id, g = typeof g === h ? g.apply(b) : g), f += i(g) + "</h3>\n\n", g = c["if"].call(b, b.bonus_available, {
            hash: {},
            inverse: j.program(3, l, e),
            fn: j.program(1, k, e),
            data: e
        }), (g || 0 === g) && (f += g), f += "\n\n<p>Note that the number of estimated aircraft in the sky may change in the next series of scenes.\n";
    }), b["aircraft-conclusion.mu"] = a(function(a, b, c, d, e) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, f = "", h = "function", i = this.escapeExpression;
        return f += '<form method="POST" action="', (g = c.host) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.host, g = typeof g === h ? g.apply(b) : g), f += i(g) + '/mturk/externalSubmit">\n  <input type="hidden" name="assignmentId" value="', 
        (g = c.assignmentId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.assignmentId, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n  <input type="hidden" name="turkerId" value="', 
        (g = c.workerId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.workerId, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n  <input type="hidden" name="duration" value="', 
        (g = c.duration) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.duration, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n\n  <h3>Comments</h3>\n  <label>\n    <div>Did you find one of the allies more useful than others?\n      Please discuss any overall thoughts on the allies: ', 
        (g = c.all_allies_string) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.all_allies_string, g = typeof g === h ? g.apply(b) : g), f += i(g) + '.</div>\n    <textarea rows="4" cols="80" name="allies_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What characterized enemy planes?</div>\n    <textarea rows="2" cols="80" name="enemy_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What characterized friendly planes?</div>\n    <textarea rows="2" cols="80" name="friendly_comments"></textarea>\n  </label>\n\n  <label>\n    <div>Was this task unclear, mispriced, or frustrating? If we could make it better, let us know!</div>\n    <textarea rows="4" cols="80" name="task_comments"></textarea>\n  </label>\n\n  <p class="clear">\n    <input type="submit" value="Submit Responses and Finish Task" />\n  </p>\n</form>\n';
    }), b["aircraft-scene.mu"] = a(function(a, b, c, d, e) {
        function m(a, b) {
            var e, d = "";
            return d += '\n        <tr class="', (e = c.judgment) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.judgment, e = typeof e === i ? e.apply(a) : e), d += j(e) + '">\n          <td>', 
            (e = c.title) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.title, e = typeof e === i ? e.apply(a) : e), d += j(e) + "&nbsp;", (e = c.name) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.name, e = typeof e === i ? e.apply(a) : e), d += j(e) + ":</td>\n          <td><span>", 
            (e = c.judgment) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.judgment, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</span></td>\n        </tr>\n        ";
        }
        function n(a, b) {
            var e, d = "";
            return d += '\n    <img src="/static/aircraft/pixelated/', (e = c.src) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.src, e = typeof e === i ? e.apply(a) : e), d += j(e) + '" />\n ';
        }
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, h, f = "", i = "function", j = this.escapeExpression, k = this, l = c.blockHelperMissing;
        return f += "<h3>Batch ", (g = c.batch_id) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.batch_id, g = typeof g === i ? g.apply(b) : g), f += j(g) + " / Scene ", 
        (g = c.id) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.id, g = typeof g === i ? g.apply(b) : g), f += j(g) + '</h3>\n<table>\n  <tr>\n    <td><img src="/static/aircraft/pixelated/', 
        (g = c.src) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.src, g = typeof g === i ? g.apply(b) : g), f += j(g) + '" /></td>\n    <td style="padding-left: 20px; vertical-align: top;">\n      <table class="stats">\n        <tr><td>Estimated number of friendly aircraft in the sky:</td><td>', 
        (g = c.total_friendly) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.total_friendly, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n        <tr><td>Estimated number of enemy aircraft in the sky:</td><td>", 
        (g = c.total_enemy) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.total_enemy, g = typeof g === i ? g.apply(b) : g), f += j(g) + '</td></tr>\n      </table>\n\n      <h3>Allies:</h3>\n      <table class="allies">\n        ', 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(1, m, e),
            data: e
        }, (g = c.allies) ? g = g.call(b, h) : (g = b.allies, g = typeof g === i ? g.apply(b) : g), 
        c.allies || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += '\n      </table>\n\n      <h3>Your decision:</h3>\n      <div class="spaced-buttons">\n        <button data-id="enemy">Enemy</button>\n        <button data-id="friend">Pass</button>\n      </div>\n    </td>\n  </tr>\n</table>\n<div style="display: none">\n ', 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(3, n, e),
            data: e
        }, (g = c.next) ? g = g.call(b, h) : (g = b.next, g = typeof g === i ? g.apply(b) : g), 
        c.next || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += "\n</div>\n";
    }), b["assignment.mu"] = a(function(a, b, c, d, e) {
        function m() {
            return '\n        <button data-action="ApproveAssignment">Approve</button>\n        <button data-action="RejectAssignment">Reject</button>\n      ';
        }
        function n() {
            return '\n        <button data-action="ApproveRejectedAssignment">Unreject and Approve</button>\n      ';
        }
        function o(a, b) {
            var e, d = "";
            return d += "\n      <tr><td>ApprovalTime</td><td>", (e = c.ApprovalTime) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.ApprovalTime, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td></tr>\n    ";
        }
        function p(a, b) {
            var e, d = "";
            return d += "\n      <tr><td>RejectionTime</td><td>", (e = c.RejectionTime) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.RejectionTime, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td></tr>\n    ";
        }
        function q(a, b) {
            var e, d = "";
            return d += "\n      <tr><td>", (e = c.QuestionIdentifier) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.QuestionIdentifier, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td><td>", 
            (e = c.FreeText) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.FreeText, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td></tr>\n    ";
        }
        function r(a, b) {
            var e, d = "";
            return d += "\n      <tr><td>", (e = c.key) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.key, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td><td>", 
            (e = c.value) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.value, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</td></tr>\n    ";
        }
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, h, f = "", i = "function", j = this.escapeExpression, k = this, l = c.blockHelperMissing;
        return f += '<div class="assignment">\n  <h3>Assignment: ', (g = c.AssignmentId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.AssignmentId, g = typeof g === i ? g.apply(b) : g), f += j(g) + '</h3>\n\n  <div class="controls" style="float: left; width: 32%;">\n    <fieldset class="status">\n      <legend>Status</legend>\n      <span class="', 
        (g = c.AssignmentStatus) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.AssignmentStatus, g = typeof g === i ? g.apply(b) : g), f += j(g) + '">', 
        (g = c.AssignmentStatus) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.AssignmentStatus, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</span>\n      ", 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(1, m, e),
            data: e
        }, (g = c.Submitted) ? g = g.call(b, h) : (g = b.Submitted, g = typeof g === i ? g.apply(b) : g), 
        c.Submitted || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += "\n      ", 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(3, n, e),
            data: e
        }, (g = c.Rejected) ? g = g.call(b, h) : (g = b.Rejected, g = typeof g === i ? g.apply(b) : g), 
        c.Rejected || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += '\n    </fieldset>\n\n    <fieldset class="bonus">\n      <legend>Bonus</legend>\n      <label>Amount: <input name="amount" value="', 
        (g = c.bonus_owed) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.bonus_owed, g = typeof g === i ? g.apply(b) : g), f += j(g) + '" /></label>\n      <label>Reason: <input name="reason" value="', 
        (g = c.reason) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.reason, g = typeof g === i ? g.apply(b) : g), f += j(g) + '" style="width: 200px" /></label>\n      <button data-action="GrantBonus">Grant Bonus</button>\n    </fieldset>\n  </div>\n\n  <table class="keyval" style="float: left; width: 64%;">\n    <tr><td>WorkerId</td><td>', 
        (g = c.WorkerId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.WorkerId, g = typeof g === i ? g.apply(b) : g), f += j(g) + ' <a href="../Workers/', 
        (g = c.WorkerId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.WorkerId, g = typeof g === i ? g.apply(b) : g), f += j(g) + '">json</a></td></tr>\n    <tr><td>AutoApprovalTime</td><td>', 
        (g = c.AutoApprovalTime) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.AutoApprovalTime, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>AcceptTime</td><td>", 
        (g = c.AcceptTime) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.AcceptTime, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>SubmitTime</td><td>", 
        (g = c.SubmitTime) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.SubmitTime, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    ", 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(5, o, e),
            data: e
        }, (g = c.Approved) ? g = g.call(b, h) : (g = b.Approved, g = typeof g === i ? g.apply(b) : g), 
        c.Approved || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += "\n    ", 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(7, p, e),
            data: e
        }, (g = c.Rejected) ? g = g.call(b, h) : (g = b.Rejected, g = typeof g === i ? g.apply(b) : g), 
        c.Rejected || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += '\n    <tr><th colspan="2">Responses</th></tr>\n    ', 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(9, q, e),
            data: e
        }, (g = c.Answer) ? g = g.call(b, h) : (g = b.Answer, g = typeof g === i ? g.apply(b) : g), 
        c.Answer || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += "\n    ", h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(11, r, e),
            data: e
        }, (g = c.user_fields) ? g = g.call(b, h) : (g = b.user_fields, g = typeof g === i ? g.apply(b) : g), 
        c.user_fields || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += '\n  </table>\n\n  <div style="clear: both">\n    <button class="responses">Load responses</button>\n  </div>\n</div>\n\n';
    }), b["consent.mu"] = a(function(a, b, c, d, e) {
        return this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {}, 
        '<h3>Consent form</h3>\n<p>\n  You are invited to participate in a study, entitled "Learning in Social Networks". The study is being conducted by Colin Bannard in the Linguistics department of The University of Texas at Austin.\n<p>\n  Department of Linguistics<br/>\n  University of Texas at Austin,<br/>\n  305 E. 23rd Street B5100,<br/>\n  Austin, TX 78712, USA<br/>\n  (512) 471-9022\n<p>The purpose of this study is to examine how people learn. We estimate that it will take about half a minute of your time to complete each question, and you will be paid 2 cents for each question you respond to. You are free to contact the investigator at the above address and phone number to discuss the survey.\n<p>Risks to participants are considered minimal. There will be no costs for participating. You will be paid for each HIT you complete, but will not otherwise benefit from participating. Your Amazon Mechanical Turk identification will be kept while we collect data for tracking purposes only. A limited number of research team members will have access to the data during data collection. This information will be stripped from the final dataset.\n<p>Your participation in this survey is voluntary. You may decline to answer any question and you have the right to withdraw from participation at any time without penalty. If you wish to withdraw from the study or have any questions, contact the investigator listed above.\n<p>If you have any questions, please email Colin Bannard at bannard@utexas.edu. You may also request a hard copy of the survey from the contact information above.\n<p>This study has been reviewed and approved by The University of Texas at Austin Institutional Review Board (IRB Study Number 2010-10-0051). If you have questions about your rights as a study participant, or are dissatisfied at any time with any aspect of this study, you may contact - anonymously, if you wish - the Institutional Review Board by phone at (512) 471-8871 or email at orsc@uts.cc.utexas.edu.\n<p>\n<button>I Consent</button>\n';
    }), b["digits-batch.mu"] = a(function(a, b, c, d, e) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, h, f = "", i = "function", j = this.escapeExpression;
        return f += '<table cellpadding="0" cellspacing="0" style="margin: 0 auto">\n  <tr>\n    <th colspan="' + j((g = b.scenes, 
        g = null == g || g === !1 ? g : g.length, typeof g === i ? g.apply(b) : g)) + '" class="left">\n      <h3>Bomb ', 
        (h = c.id) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.id, h = typeof h === i ? h.apply(b) : h), f += j(h) + '</h3>\n    </th>\n  </tr>\n  <tr id="digits"></tr>\n  <tr>\n    <td colspan="' + j((g = b.scenes, 
        g = null == g || g === !1 ? g : g.length, typeof g === i ? g.apply(b) : g)) + '" class="right" style="padding: 20px 0">\n      <button disabled="true">Submit</button>\n    </td>\n  </tr>\n</table>\n';
    }), b["digits-conclusion.mu"] = a(function(a, b, c, d, e) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, f = "", h = "function", i = this.escapeExpression;
        return f += '<form method="POST" action="', (g = c.host) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.host, g = typeof g === h ? g.apply(b) : g), f += i(g) + '/mturk/externalSubmit">\n  <input type="hidden" name="assignmentId" value="', 
        (g = c.assignmentId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.assignmentId, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n  <input type="hidden" name="turkerId" value="', 
        (g = c.workerId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.workerId, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n  <input type="hidden" name="duration" value="', 
        (g = c.duration) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.duration, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />\n\n  <p>Comments are optional, but much appreciated.</p>\n\n  <label>\n    <div>Did you find one of your colleagues more useful than others?\n      Please discuss whether they (', 
        (g = c.all_allies_string) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.all_allies_string, g = typeof g === h ? g.apply(b) : g), f += i(g) + ') were helpful or not.</div>\n    <textarea rows="4" cols="80" name="allies_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What strategy worked the best?</div>\n    <textarea rows="2" cols="80" name="strategy_comments"></textarea>\n  </label>\n\n  <label>\n    <div>Was this task unclear, mispriced, or frustrating? If we could make it better, let us know!</div>\n    <textarea rows="4" cols="80" name="task_comments"></textarea>\n  </label>\n\n  <p class="clear">\n    <input type="submit" value="Submit Responses and Finish Task" />\n  </p>\n</form>\n';
    }), b["digits-scene.mu"] = a(function(a, b, c, d, e) {
        function m(a, b) {
            var e, d = "";
            return d += '\n    <tr class="', (e = c.judgment) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.judgment, e = typeof e === i ? e.apply(a) : e), d += j(e) + '">\n      <td>', 
            (e = c.title) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.title, e = typeof e === i ? e.apply(a) : e), d += j(e) + "&nbsp;", (e = c.name) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.name, e = typeof e === i ? e.apply(a) : e), d += j(e) + ":</td>\n      <td><span>", 
            (e = c.judgment) ? e = e.call(a, {
                hash: {},
                data: b
            }) : (e = a.judgment, e = typeof e === i ? e.apply(a) : e), d += j(e) + "</span></td>\n    </tr>\n    ";
        }
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, h, f = "", i = "function", j = this.escapeExpression, k = this, l = c.blockHelperMissing;
        return f += '<div class="image"><!-- fill in with canvas rendering --></div>\n\n<div class="allies">\n  <h3>Colleagues:</h3>\n  <table>\n    ', 
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(1, m, e),
            data: e
        }, (g = c.allies) ? g = g.call(b, h) : (g = b.allies, g = typeof g === i ? g.apply(b) : g), 
        c.allies || (g = l.call(b, g, h)), (g || 0 === g) && (f += g), f += '\n  </table>\n</div>\n\n<div class="user-judgment">\n  <h3>Your<br/> judgment:</h3>\n  <input type="text" maxlength="1" min="0" max="10" required />\n</div>\n';
    }), b["feedback.mu"] = a(function(a, b, c, d, e) {
        function i() {
            return '\n    <img src="/static/smile.gif" alt="☺" />\n  ';
        }
        function j() {
            return '\n    <img src="/static/frown.gif" alt="☹" />\n  ';
        }
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, f = "", h = this;
        return f += '<div class="emoticon">\n  ', g = c["if"].call(b, b.correct, {
            hash: {},
            inverse: h.program(3, j, e),
            fn: h.program(1, i, e),
            data: e
        }), (g || 0 === g) && (f += g), f += "\n</div>\n";
    }), b["form-input.mu"] = a(function(a, b, c, d, e) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, f = "", h = "function", i = this.escapeExpression;
        return f += "<label>", (g = c.label) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.label, g = typeof g === h ? g.apply(b) : g), f += i(g) + '</label><input name="', 
        (g = c.id) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.id, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" value="', (g = c.value) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.value, g = typeof g === h ? g.apply(b) : g), f += i(g) + '" />';
    }), b["hit.mu"] = a(function(a, b, c, d, e) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ], c = c || a.helpers, e = e || {};
        var g, h, f = "", i = "function", j = this.escapeExpression;
        return f += '<div class="hit">\n  <h2>HIT: ', (g = c.Title) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.Title, g = typeof g === i ? g.apply(b) : g), f += j(g) + '</h2>\n  <table class="keyval">\n    <tr><td>HITId</td><td><a href="HITs/', 
        (g = c.HITId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.HITId, g = typeof g === i ? g.apply(b) : g), f += j(g) + '">', (g = c.HITId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.HITId, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</a></td></tr>\n    <tr><td>HITTypeId</td><td>", 
        (g = c.HITTypeId) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.HITTypeId, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>CreationTime</td><td>", 
        (g = c.CreationTime) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.CreationTime, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>Expiration</td><td>", 
        (g = c.Expiration) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.Expiration, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>Keywords</td><td>", 
        (g = c.Keywords) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.Keywords, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>Description</td><td>", 
        (g = c.Description) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.Description, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>HITStatus</td><td>", 
        (g = c.HITStatus) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.HITStatus, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>HITReviewStatus</td><td>", 
        (g = c.HITReviewStatus) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.HITReviewStatus, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>MaxAssignments</td><td>", 
        (g = c.MaxAssignments) ? g = g.call(b, {
            hash: {},
            data: e
        }) : (g = b.MaxAssignments, g = typeof g === i ? g.apply(b) : g), f += j(g) + "</td></tr>\n    <tr><td>Reward</td><td>" + j((g = b.Reward, 
        g = null == g || g === !1 ? g : g.FormattedPrice, typeof g === i ? g.apply(b) : g)) + "</td></tr>\n    <tr><td>AssignmentDurationInSeconds</td><td>", 
        (h = c.AssignmentDurationInSeconds) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.AssignmentDurationInSeconds, h = typeof h === i ? h.apply(b) : h), f += j(h) + "</td></tr>\n    <tr><td>AutoApprovalDelayInSeconds</td><td>", 
        (h = c.AutoApprovalDelayInSeconds) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.AutoApprovalDelayInSeconds, h = typeof h === i ? h.apply(b) : h), f += j(h) + "</td></tr>\n    <tr><td>NumberOfAssignmentsPending</td><td>", 
        (h = c.NumberOfAssignmentsPending) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.NumberOfAssignmentsPending, h = typeof h === i ? h.apply(b) : h), f += j(h) + "</td></tr>\n    <tr><td>NumberOfAssignmentsAvailable</td><td>", 
        (h = c.NumberOfAssignmentsAvailable) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.NumberOfAssignmentsAvailable, h = typeof h === i ? h.apply(b) : h), 
        f += j(h) + "</td></tr>\n    <tr><td>NumberOfAssignmentsCompleted</td><td>", (h = c.NumberOfAssignmentsCompleted) ? h = h.call(b, {
            hash: {},
            data: e
        }) : (h = b.NumberOfAssignmentsCompleted, h = typeof h === i ? h.apply(b) : h), 
        f += j(h) + "</td></tr>\n  </table>\n</div>\n";
    });
}();