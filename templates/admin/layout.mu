<div class="navbar">
  <a href="/admin/aws">AWS Accounts</a>
  <a href="/admin/users">Users</a>
  <a href="/admin/stimlists">Stimlists</a>
  <a href="/users/{{ticket_user._id}}/logout" style="float: right">Logout</a>
</div>
<script src="/static/compiled.js"></script>
<script src="/static/templates.js"></script>
<script src="/static/local.js"></script>
<div class="admin">
  {{<yield}}
</div>
<script>
$('.logout').on('click', function() {
  console.log('Deleting cookie "ticket": ' + cookies.get('ticket'));
  cookies.del('ticket', {path: '/'});
});
</script>
