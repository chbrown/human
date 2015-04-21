/*jslint browser: true */ /*globals app, summarizeResponse */

app.controller('admin.access_tokens.table', function($scope, $flash, AccessToken) {
  $scope.access_tokens = AccessToken.query();

  $scope.delete = function(index) {
    var promise = $scope.access_tokens[index].$delete().then(function() {
      $scope.access_tokens.splice(index, 1);
      return 'Deleted';
    }, summarizeResponse);
    $flash(promise);
  };
});

app.controller('admin.access_tokens.edit', function($scope, $state, $flash, AccessToken) {
  $scope.access_token = AccessToken.get({id: $state.params.access_token_id});
});
