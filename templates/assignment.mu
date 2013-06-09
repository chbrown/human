<h3>Assignment: {{AssignmentId}}</h3>

<div class="controls">
  <fieldset class="status"><legend>Status</legend>
    <span class="{{AssignmentStatus}}">{{AssignmentStatus}}</span>
    {{#Submitted}}
      <button data-action="ApproveAssignment">Approve</button>
      <button data-action="RejectAssignment">Reject</button>
    {{/Submitted}}
    {{#Rejected}}
      <button data-action="ApproveRejectedAssignment">Unreject and Approve</button>
    {{/Rejected}}
  </fieldset>

  <fieldset class="bonus hform"><legend>Bonus</legend>
    <label><span>Amount:</span> <input name="amount" value="{{bonus_owed}}" /></label>
    <label><span>Reason:</span> <input name="reason" value="{{reason}}" /></label>
    <button data-action="GrantBonus">Grant Bonus</button>
  </fieldset>
</div>

<table class="keyval">
  <tr><th colspan="2">AWS</th></tr>
  <tr><td>WorkerId</td><td>{{WorkerId}} <a href="../Workers/{{WorkerId}}">json</a></td></tr>
  <tr><td>AutoApprovalTime</td><td>{{AutoApprovalTime}}</td></tr>
  <tr><td>AcceptTime</td><td>{{AcceptTime}}</td></tr>
  <tr><td>SubmitTime</td><td>{{SubmitTime}}</td></tr>
  {{#Approved}}
    <tr><td>ApprovalTime</td><td>{{ApprovalTime}}</td></tr>
  {{/Approved}}
  {{#Rejected}}
    <tr><td>RejectionTime</td><td>{{RejectionTime}}</td></tr>
  {{/Rejected}}
  <tr><th colspan="2">User</th></tr>
  {{#user_fields}}
    <tr><td>{{key}}</td><td>{{value}}</td></tr>
  {{/user_fields}}
  <tr><th colspan="2">Responses</th></tr>
  {{#Answer}}
    <tr><td>{{QuestionIdentifier}}</td><td>{{FreeText}}</td></tr>
  {{/Answer}}
</table>

<div style="clear: both">
  <button class="responses">Load responses</button>
</div>
