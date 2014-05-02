<main ng-controller="adminAWSAccountsCtrl">
  <h3>AWS Accounts</h3>

  <section>
    <table class="striped lined padded">
      <thead>
        <tr>
          <th>Name</th>
          <th>Access Key ID</th>
          <th>Secret Access Key</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="aws_account in aws_accounts">
          <td><a href="/admin/aws_accounts/{{aws_account.id}}">{{aws_account.name}}</a></td>
          <td>{{aws_account.access_key_id}}</td>
          <td>{{aws_account.secret_access_key}}</td>
          <td><time>{{aws_account.created | date:"yyyy-MM-dd"}}</time></td>
          <td>
            <button ng-click="delete(aws_account)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <a href="/admin/aws/new">Create new AWS Account</a>
</main>