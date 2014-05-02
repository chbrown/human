<main ng-controller="adminExperimentsCtrl">
  <h3>Experiments</h3>

  <section>
    <table class="striped lined padded fill">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Owner</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="experiment in experiments">
          <td title="{{experiment.id}}">
            <a href="/admin/experiments/{{experiment.id}}">{{experiment.name}}</a>
          </td>
          <td><time>{{experiment.created | date:"yyyy-MM-dd"}}</time></td>
          <td><administrator id="experiment.administrator_id"></administrator></td>
          <td>
            <a href="#" ng-click="responses(experiment, $event)">Responses</a>
            ({{experiment.count || 0}})
          </td>
          <td class="nowrap">
            <a href="/experiments/{{experiment.id}}">Public</a>
          </td>
          <td>
            <button ng-click="delete(experiment)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <a href="/admin/experiments/new">Create new experiment</a>
</main>
