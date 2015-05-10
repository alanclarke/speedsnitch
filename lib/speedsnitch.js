/*
 * ghetto-profiler
 *
 *
 * Copyright (c) 2012 Alan Clarke
 * Licensed under the MIT license.
 */

var Snitch = function (log) {
    this.opts = {
        log: log
    };
    this.data = [];
};

Snitch.prototype = {
    next: function (name) {
        var s = this;
        var last = s.stop();
        s.data.push({
            name: name,
            start: s._capture()
        });
        return last;
    },
    stop: function () {
        var s = this;
        if (s.data.length) {
            var last = s.data[s.data.length - 1];
            if (!last.stop) {
                last.stop = s._capture();
                last.ms = last.stop.time - last.start.time;

                if (s.opts.log) {
                    console.log(last);
                }
                return last;
            }
        }
    },
    _capture: function () {
        var e = new Error();
        var index = 3;
        var callee_stack = e.stack.split('\n');
        for (var i = 0; i < callee_stack.length; i++) {
            if (callee_stack[i].indexOf(__filename.replace(/^.*\//, '')) >= 0) {
                index = i + 1;
            }
        }
        callee_stack = callee_stack[index].split(':');
        return {
            time: new Date().valueOf(),
            file: callee_stack[0].replace(/^.*\//, ''),
            line: callee_stack[1]
        };
    },
    summarize: function () {
        var s = this;
        var last = s.stop();
        var data = s.data;
        if (s.opts.log) {
            console.log(data);
        }
        return data;
    },
    summarise: function () {
        return this.summarize();
    },
    sortedSummary: function () {
        var s = this;
        var last = s.stop();
        var data = s.data.sort(function (a, b) {
            return b.ms - a.ms;
        });
        if (s.opts.log) {
            console.log(data);
        }
        return data;
    }
};

module.exports = Snitch;