<!DOCTYPE html>
<meta charset="utf-8">
<link rel="icon" href="/static/favicon.ico" type="image/x-icon">
<title>Turkserv</title>
<script>var started = new Date();</script>
<link href="/static/site.css" rel="stylesheet" type="text/css" />
<script src="/static/lib/js/jquery.js"></script>
<script src="/static/lib/js/underscore.js"></script>
<script src="/static/lib/js/hogan.js"></script>
<div id="container">
  <div id="content">
    {{<yield}}
  </div>
</div>
