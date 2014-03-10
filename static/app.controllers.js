/*jslint browser: true, devel: true */ /*globals _, angular, app, Url, p, fileinputText, afterPromise */

var sync_options = function(record) {
  if (record.id) {
    // update
    return {
      method: 'PATCH',
      url: window.location,
      data: record,
    };
  }
  else {
    // create
    return {
      method: 'POST',
      url: '.',
      data: record,
    };
  }
};

app.controller('adminTableCtrl', function($scope) {
  $scope.table = window.table;
});

app.controller('adminExperimentEditor', function($scope, $http, $localStorage) {
  $scope.$storage = $localStorage.$default({expand_experiment_html: false});

  var experiment_url = Url.parse(window.location);
  experiment_url.path += '.json';
  $http({method: 'GET', url: experiment_url}).then(function(res) {
    $scope.experiment = res.data.experiment;
  }, p);

  $http({method: 'GET', url: '/admin/administrators.json'}).then(function(res) {
    $scope.administrators = res.data.administrators;
  }, p);

  $http({method: 'GET', url: '/admin/templates.json'}).then(function(res) {
    $scope.templates = res.data.templates;
    $scope.templates_lookup = toMap($scope.templates, 'id', 'name');
  }, p);

  var stims_url = Url.parse(window.location);
  stims_url.path += '/stims.json';
  $http({method: 'GET', url: stims_url.toString()}).then(function(res) {
    $scope.stims = res.data.stims;
  }, p);


  // var workerId = this.model.get('WorkerId');
  // var worker = new MTWorker({id: workerId});
  // worker.fetch({
  //   success: function(model, user, options) {
  //     // infer required columns from list of responses
  //     var keys = {};
  //     user.responses.slice(0, 50).forEach(function(response) {
  //       _.extend(keys, response);
  //     });
  //     // create table and simply put where the button was
  //     var cols = _.keys(keys).sort();
  //     var table_html = tabulate(user.responses, cols);
  //     $(ev.target).replaceWith(table_html);
  //   }
  // });

  $scope.sync = function(ev) {
    p('sync', $scope.experiment);
    var opts = sync_options($scope.experiment);
    var ajax_promise = $http(opts).then(function(res) {
      _.extend($scope.experiment, res.data);
      return 'Saved';
    }, function(res) {
      return summarizeResponse(res);
    });
    afterPromise(ev.target, ajax_promise);
  };

  $scope.syncStim = function(stim, ev) {
    p('syncStim', stim);

    var opts = sync_options(stim);
    if (stim.id) {
      opts.url = window.location + '/stims/' + stim.id;
    }
    else {
      opts.url = window.location + '/stims';
    }

    var ajax_promise = $http(opts).then(function(res) {
      _.extend(stim, res.data);
      return 'Saved';
    }, function(res) {
      return summarizeResponse(res);
    });

    if (ev) {
      afterPromise(ev.target, ajax_promise);
    }
  };

  // $scope.previewStim = function(stim) {
  //   // p('previewStim', stim);
  //   $scope.show_preview = true;

  //   // the stim template html will expect window.context
  //   var iframe = document.querySelector('iframe');
  //   // var iframe_window = iframe.contentWindow;
  //   // var iframe_document = iframe_window.document;
  //   p('iframe', iframe, iframe.contentWindow);

  //   // iframe.contentWindow.document.addEventListener('load', function(ev) {
  //   // });

  //   iframe.src = '/admin/experiments/' + $scope.experiment.id + '/stims/' + stim.id + '/render';
  //   // iframe.contentWindow.init(stim.context);
  //   // $http({method: 'GET', url: '/admin/templates/' + stim.template_id + '.json'}).then(function(res) {
  //   //   iframe_document.body.innerHTML = res.data.template.html;
  //   // }, p);
  // };

  $scope.next_view_order = function() {
    var max_view_order = Math.max.apply(Math, _.pluck($scope.stims, 'view_order'));
    return Math.max(max_view_order, 0) + 1;
  };

  $scope.addStim = function(stim) {
    // stim has properties like: context, template_id, view_order
    // cache view_order?
    if (stim.view_order === undefined) {
      stim.view_order = $scope.next_view_order();
    }

    $scope.syncStim(stim);
    $scope.stims.push(stim);
  };

  $scope.addStims = function(data) {
    // data is an object with columns: [String] and rows: [Object]

    // update the parameters first
    var new_parameters = _.difference(data.columns, $scope.experiment.parameters, 'template');
    $scope.experiment.parameters = $scope.experiment.parameters.concat(new_parameters);

    // and then add the stims to the table
    var view_order = $scope.next_view_order();
    data.rows.forEach(function(row) {
      var stim = {context: _.omit(row, 'template')};
      if (row.template) {
        var template = _.findWhere($scope.templates, {name: row.template});
        if (template) {
          stim.template_id = template.id;
        }
        // todo: handle templates that cannot be found
      }
      stim.view_order = view_order++;
      $scope.addStim(stim);
    });
  };

  $scope.deleteStim = function(stim) {
    var url = window.location + '/stims/' + stim.id;
    $http({method: 'DELETE', url: url}).then(function(res) {
      var index = $scope.stims.indexOf(stim);
      $scope.stims.splice(index, 1);
    }, p);
  };
  $scope.deleteSelectedStims = function(ev) {
    $scope.stims.filter(function(stim) {
      return stim.selected;
    }).forEach($scope.deleteStim);
  };


  // hack: wish angular.js would just wrap onchange events without the model requirement
  var upload_el = document.querySelector('#upload');
  angular.element(upload_el).on('change', function(ev) {
    var input = ev.target;

    var file = input.files[0];
    p('parseUpload: ', file);

    // sample file = {
    //   lastModifiedDate: Tue Mar 04 2014 15:57:25 GMT-0600 (CST)
    //   name: "asch-stims.xlsx"
    //   size: 34307
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   webkitRelativePath: ""
    // }

    var reader = new FileReader();
    reader.onerror = function(err) {
      p('File reader error', err);
    };
    reader.onload = function(ev) {
      p('File reader loaded', ev, reader.result);
      var file_name = file.name;
      var file_size = file.size;
      // data is an arraybufferview as basic bytes / chars
      var data = new Uint8Array(reader.result);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/table');
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('X-Filename', file.name);
      xhr.onload = function(ev) {
        $scope.$apply(function() {
          $scope.addStims(JSON.parse(xhr.responseText));
        });
      };
      xhr.send(data);
    };
    reader.readAsArrayBuffer(file);
  });
});

app.controller('adminAWSAccountEditor', function($scope, $http, $localStorage) {
  $scope.aws_account = window.aws_account;

  $scope.aws_account.hosts = [{name: 'deploy'}, {name: 'sandbox'}];

  $scope.aws_account.hosts.forEach(function(host) {
    var url = '/admin/aws/' + $scope.aws_account.id + '/hosts/' + host.name + '/GetAccountBalance';
    $http({method: 'POST', url: url}).then(function(res) {
      var price = res.data.GetAccountBalanceResult.AvailableBalance.FormattedPrice;
      host.account_balance = price;
    });
  });
});

var summarizeResponse = function(res) {
  var parts = [];
  if (res.status != 200) {
    parts.push('Error ');
  }
  parts.push(res.status);
  if (res.data) {
    parts.push(': ' + res.data.toString());
  }
  return parts.join('');
};

app.controller('adminTemplateEditor', function($scope, $http, $timeout) {
  $scope.template = window.template;
  $scope.keydown = function(ev) {
    if (ev.which == 83 && ev.metaKey) {
      // command+S
      ev.preventDefault();
      ev.target = document.getElementById('save_button');
      $scope.sync(ev);
    }
  };

  $scope.sync = function(ev) {
    var opts = sync_options($scope.template);
    var ajax_promise = $http(opts).then(function(res) {
      return 'Saved';
    }, function(res) {
      return summarizeResponse(res);
    });
    afterPromise(ev.target, ajax_promise);
  };
});
