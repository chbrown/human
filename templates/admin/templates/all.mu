<main ng-controller="adminTableCtrl">
  <h3>Templates</h3>

  <section class="fill">
    <table class="striped lined padded">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>HTML</th>
          <th>Created</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="template in table">
          <td>{{template.id}}</td>
          <td><a href="/admin/templates/{{template.id}}">{{template.name}}</a></td>
          <td><code>{{template.html.slice(0, 100)}}</code></td>
          <td><time ng-model="template.created" class="date" /></td>
          <td>
            <!-- angular being dumb about the action string -->
            <form method="POST" action="{{'/admin/templates/' + template.id + '/clone'}}" style="display: inline">
              <button>Clone</button>
            </form>
            <ajaxform method="DELETE" action="/admin/templates/{{template.id}}">
              <button>Delete</button>
            </ajaxform>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <a href="/admin/templates/new">Create new template</a>
</main>
<script>
var table = <%& serialize(templates) %>;
</script>