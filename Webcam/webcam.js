module.exports = function(RED) {

  function HTML(config) {
    var stream = config.stream;
    console.log(stream)
    var html = String.raw`<img src=${stream} >`
    return html;
  };

  var ui = undefined;
  function webcam(config) {
    var node = this;
    if(ui === undefined) {
        ui = RED.require("node-red-dashboard")(RED);
    }
    RED.nodes.createNode(this, config);
    var done = null;
    var html = HTML(config);
    done = ui.addWidget({
        node: node,
        width: config.width,
        height: config.height,
        format: html,
        templateScope: "local",
        group: config.group,
        emitOnlyNewValues: false,
        forwardInputMessages: false,
        storeFrontEndInputAsState: false,
        convertBack: function (value) {
            return value;
        },
        beforeEmit: function(msg, value) {
            return { msg: { items: value } };
        },
        beforeSend: function (msg, orig) {
            if (orig) {
                return orig.msg;
            }
        },
        initController: function($scope, events) {
            $scope.click = function(item) {
                $scope.send({payload: item});
            };
        }
    });
    node.on("close", function() {
        if (done) {
            done();
        }
    });
  }
  RED.nodes.registerType('webcam', webcam);
};