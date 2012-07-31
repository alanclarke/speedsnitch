var snitch = require('../lib/speedsnitch.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


exports['speedsnitch'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'exists': function(test) {
    test.expect(1);
    test.ok(snitch, 'snitch should not be null');
    test.done();
  },
  'methods':function(test){
    var methods = 'next stop summarise'.split(' ');
    test.expect(methods.length||3);
    var p = new snitch();
    methods.forEach(function(m){
      test.ok(p[m], 'snitch should have method '+m);
    });
    test.done();
  },
  'flow':function(test){
      test.expect(16);
      var p = new snitch();
      test.ok(!p.stop(), 'stop should return null value as no items have been added');
      p.next('test');
      setTimeout(function(){
        var c = p.stop();
        test.ok(c.name==='test','stop should return object with name equal to test');
        test.ok(c.start.time,'stop should return object with date as start prop');
        test.ok(c.stop.time,'stop should return object with date as stop prop');

        test.ok(c.start.file===__filename.replace(/^.*\//,''),'start should reference this file as filename');
        test.ok(c.stop.file===__filename.replace(/^.*\//,''),'stop should reference this file as filename');
        test.ok(typeof c.ms === 'number' && c.ms <1000 && c.ms > 0,'stop should return object with ms taken in ms');
        var sum = p.summarise();

        test.ok(sum.length===1,'summarise should return an array length 1');
        test.ok(sum[0].name===c.name&&sum[0].ms===c.ms,'summarise item should be same as test item')

        p.next('test2');
        setTimeout(function(){
          var c2 = p.stop();
          test.ok(c2.name==='test2','stop should return object with name equal to test');
          test.ok(c2.start.time,'stop should return object with date as start prop');
          test.ok(c2.stop.time,'stop should return object with date as start prop');
          test.ok(typeof c2.ms === 'number' && c2.ms <1000 && c2.ms > 0,'stop should return object with ms taken in ms');
          var sum = p.summarise();
          console.log(sum);
          test.ok(sum.length===2,'summarise should return an array length 2');
          test.ok(sum[0].name===c2.name&&sum[0].ms===c2.ms,'summarise item should be same as test item')
          test.ok(sum[1].name===c.name&&sum[1].ms===c.ms,'summarise last item should be fastest item')
          test.done();
        },10);
      },1);
  }
};
