<h3 class="section">Stimlists</h3>

<section class="fill">
  <table>
    <thead>
      <tr>
        <th>Slug</th>
        <th></th>
        <th></th>
        <th>Created</th>
        <th>Creator</th>
        <th># States</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {{#stimlists}}
        <tr>
          <td title="{{_id}}">{{slug}}</td>
          <td><a href="/stimlists/{{slug}}">Play</a></td>
          <td><a href="/admin/stimlists/{{_id}}/edit">Edit</a></td>
          <td>{{datefmt(created)}}</td>
          <td>{{creator}}</td>
          <td>{{states.length}}</td>
          <td><a href="/admin/stimlists/{{_id}}" data-method="delete">delete</a></td>
        </tr>
      {{/stimlists}}
    </tbody>
  </table>
</section>

<a href="/admin/stimlists/new" class="section">Create new...</a>
