<form method="POST" action="{{host}}/mturk/externalSubmit">
  <input type="hidden" name="assignmentId" value="{{assignmentId}}" />
  <input type="hidden" name="turkerId" value="{{workerId}}" />
  <input type="hidden" name="duration" value="{{duration}}" />

  <p>Comments are optional, but much appreciated.</p>

  <label>
    <div>Did you find one of your colleagues more useful than others?
      Please discuss whether they ({{all_allies_string}}) were helpful or not.</div>
    <textarea rows="4" cols="80" name="allies_comments"></textarea>
  </label>

  <label>
    <div>What strategy worked the best?</div>
    <textarea rows="2" cols="80" name="strategy_comments"></textarea>
  </label>

  <label>
    <div>Was this task unclear, mispriced, or frustrating? If we could make it better, let us know!</div>
    <textarea rows="4" cols="80" name="task_comments"></textarea>
  </label>

  <p class="clear">
    <input type="submit" value="Submit Responses and Finish Task" />
  </p>
</form>