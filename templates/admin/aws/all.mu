<section>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th></th>
        <th></th>
        <th>Access Key ID</th>
        <th>Secret Access Key</th>
        <th>Created</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {{#accounts}}
        <tr>
          <td title="{{_id}}">{{name}}</td>
          <td><a href="/admin/aws/{{_id}}">View</a></td>
          <td><a href="/admin/aws/{{_id}}/edit">Edit</a></td>
          <td>{{accessKeyId}}</td>
          <td>{{secretAccessKey}}</td>
          <td>{{created}}</td>
          <td><a href="/admin/aws/{{_id}}" data-method="delete">delete</a></td>
        </tr>
      {{/accounts}}
    </tbody>
  </table>
</section>

<a href="/admin/aws/new">Create new...</a>
