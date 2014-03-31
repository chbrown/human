<main ng-controller="adminTableCtrl">
  <h3>Experiments</h3>

  <section>
    <table class="striped lined padded fill">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Owner</th>
          <th></th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="experiment in table">
          <td title="{{experiment.id}}">
            <a href="/admin/experiments/{{experiment.id}}">{{experiment.name}}</a>
          </td>
          <td><time>{{experiment.created | date:"yyyy-MM-dd"}}</time></td>
          <td><administrator id="experiment.administrator_id"></administrator></td>
          <td>
            <a href="/admin/experiments/{{experiment.id}}/responses">Responses</a> ({{experiment.count}})
          </td>
          <td class="nowrap">
            <a href="/experiments/{{experiment.id}}">Public</a>
            <form method="POST" action="{{'/admin/experiments/' + experiment.id + '/clone'}}" style="display: inline">
              <button>Clone</button>
            </form>
            <ajaxform method="DELETE" action="/admin/experiments/{{experiment.id}}">
              <button>Delete</button>
            </ajaxform>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <a href="/admin/experiments/new">Create new experiment</a>
</main>
<script>
var table = <%& serialize(experiments) %>;
</script>
