<main ng-controller="adminAdministratorCtrl">
  <h3>Administrator</h3>
  <section class="box">
    <!-- method="PATCH" action="/admin/administrators/{{administrator.id}}" -->
    <form>
      <label>
        <div><b>Email</b></div>
        <input type="text" ng-model="administrator.email" style="width: 200px">
      </label>

      <label>
        <div><b>Password</b> <span class="help">Leave blank to keep current password</span></b></div>
        <input type="password" ng-model="administrator.password" style="width: 200px">
      </label>

      <label>
        <div><b>Created</b></div>
        <time>{{administrator.created | date:"medium"}}</time>
      </label>

      <p>
        <button ng-click="sync()">Save</button>
      </p>
    </form>
  </section>

  <h3>AWS Accounts</h3>
  <section class="box">
    <table class="lined">
      <thead>
        <tr>
          <th>Name</th>
          <th>Access Key ID</th>
          <th>Priority</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="aws_account in administrator_aws_accounts">
          <td><a href="/admin/aws/{{aws_account.id}}">{{aws_account.name}}</a></td>
          <td>{{aws_account.access_key_id}}</td>
          <td>{{aws_account.priority}}</td>
          <td><time>{{aws_account.created | date:"yyyy-MM-dd"}}</time></td>
          <td>
            <button ng-click="unlinkAWSAccount(aws_account)">Disown</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <select ng-model="new_account.aws_account_id"
        ng-options="aws_account.id as aws_account.name for aws_account in aws_accounts"></select>
      <input ng-model="new_account.priority" type="number">
      <button ng-click="linkAWSAccount(new_account)">Add account</button>
    </p>
  </section>

</main>
