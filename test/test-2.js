'use strict';

var assert = require("assert");
var jsdomify, React, Leaker;

describe('DOM Leak 2', function () {

  before(function () {
    jsdomify = require('jsdomify');
    jsdomify.create();

    React = require('react');

    Leaker = React.createClass({
      render() {
        return (
          <div>
            When this HTML innerText is here, the tests fail
            {this.state ? 'foo' : null}
          </div>
        )
      }
    });
  });

  after(function () {
    jsdomify.destroy();
  });

  it('should be defined', function () {
    var instance = React.render(
      <Leaker></Leaker>,
      document.body
    );

    instance.setState({isVisible: true});

    assert(instance);
  });
});
