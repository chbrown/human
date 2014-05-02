<ng-include src="'/templates/admin/mturk/nav.html'"></ng-include>
<main ng-controller="adminHITCtrl">
  <h3>HIT: {{hit.Title}}</h3>

  <section class="box">
    <table class="keyval">
      <tr ng-repeat="(key, val) in hit">
        <td>{{key}}</td>
        <td>{{val}}</td>
      </tr>
    </table>
  </section>

  <section class="box">
    <h3>ExtendHIT</h3>
    <span class="help">Extend the duration of this HIT or add assignments to it.</span>
    <form ng-submit="ExtendHIT($event)">
      <label>
        <div><b>Max Assignments Increment</b>
          <span class="help">
            The number of assignments by which to increment the MaxAssignments parameter of the HIT.
          </span>
        </div>
        <input type="text" ng-model="extension.MaxAssignmentsIncrement">
      </label>
      <label>
        <div><b>Expiration Increment (e.g., 24h)</b>
          <span class="help">The amount of time, in seconds, by which to extend the expiration date. If the HIT has not yet expired, this amount is added to the HIT's expiration date. If the HIT has expired, the new expiration date is the current time plus this value.</span>
        </div>
        <input type="text" ng-model="extension.ExpirationIncrement">
      </label>
      <p><button>ExtendHIT</button></p>
    </form>
  </section>

  <section class="box">
    <h3>Import</h3>
    <span class="help">Import data that was submitted to Mechanical Turk directly into the local database.<br>
      Because each Assignment has a unique identifier (the AssignmentsId field), duplicate imports will be ignored.</span>
    <p>
      <!-- <form method="POST" action="{{hit.HITId + '/import'}}"></form> -->
      <form ng-submit="import($event)">
        <p><button>Import</button></p>
      </form>
    </p>
  </section>

  <!-- <section class="box">
    <h3>Export</h3>
    <div>
      <a href="{{hit.HITId}}.csv">HIT_{{hit.HITId}}.csv</a>
      &middot; <a href="{{hit.HITId}}.csv?view">View</a>
    </div>
    <div>
      <a href="{{hit.HITId}}.tsv">HIT_{{hit.HITId}}.tsv</a>
      &middot; <a href="{{hit.HITId}}.tsv?view">View</a>
    </div>
  </section> -->

  <section class="box" ng-if="bonus_payments">
    <h3>Bonuses</h3>
    <table>
      <thead>
        <tr>
          <th>WorkerId</th>
          <th>BonusAmount</th>
          <th>Reason</th>
          <th>GrantTime</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="bonus_payment in bonus_payments">
          <td>{{bonus_payment.WorkerId}}</td>
          <td>{{bonus_payment.BonusAmount.FormattedPrice}}</td>
          <td>{{bonus_payment.Reason}}</td>
          <td>{{bonus_payment.GrantTime}}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="box" ng-repeat="assignment in assignments">
    <h3>Assignment: {{assignment.AssignmentId}}</h3>

    <div ng-controller="adminAssignmentEditor">
      <div>
        Status:
        <span class="{{assignment.AssignmentStatus}}">{{assignment.AssignmentStatus}}</span>
        <span ng-switch="assignment.AssignmentStatus">
          <span ng-switch-when="Submitted">
            <button ng-click="approve(assignment, $event)">Approve</button>
            <button ng-click="reject(assignment, $event)">Reject</button>
          </span>
          <span ng-switch-when="Rejected">
            <button ng-click="approve_rejected(assignment, $event)">Unreject and Approve</button>
          </span>
        </span>
      </div>
      <div>
        <label>
          <input value="{{assignment.bonus_owed}}" placeholder="Amount">
        </label>
        <label>
          <input value="{{assignment.reason}}" placeholder="Reason">
        </label>
        <button ng-click="GrantBonus">Grant Bonus</button>
      </div>
    </div>

    <div>
      <table class="keyval">
        <tr ng-repeat="(key, val) in assignment">
          <td>{{key}}</td>
          <td>{{val}}</td>
        </tr>
        <tr ng-repeat="answer in assignment.Answers">
          <td>{{answer.QuestionIdentifier}}</td>
          <td>{{answer.FreeText}}</td>
        </tr>
      </table>
    </div>
  </section>
</main>
