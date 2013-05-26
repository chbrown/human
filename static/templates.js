(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["aircraft-batch-debriefing.mu"]=a(function(a,b,c,d,e){function k(a,b){var d="",e;return d+="\n<p> Based on your performance, you have an available bonus of $",(e=c.bonus)?e=e.call(a,{hash:{},data:b}):(e=a.bonus,e=typeof e===h?e.apply(a):e),d+=i(e)+'.\n<div>\n  <button data-id="continue">Claim bonus and continue</button>\n  <!-- <button data-id="stop">Claim bonus and quit task</button> -->\n</div>\n',d}function l(a,b){return'\n<div>\n  <button data-id="continue">Continue</button>\n  <!-- <button data-id="stop">Quit task</button> -->\n</div>\n'}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression,j=this;f+="<h3>End of Batch ",(g=c.id)?g=g.call(b,{hash:{},data:e}):(g=b.id,g=typeof g===h?g.apply(b):g),f+=i(g)+"</h3>\n\n",g=c["if"].call(b,b.bonus_available,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e),data:e});if(g||g===0)f+=g;return f+="\n\n<p>Note that the number of estimated aircraft in the sky may change in the next series of scenes.\n",f}),b["aircraft-conclusion.mu"]=a(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression;return f+='<form method="POST" action="',(g=c.host)?g=g.call(b,{hash:{},data:e}):(g=b.host,g=typeof g===h?g.apply(b):g),f+=i(g)+'/mturk/externalSubmit">\n  <input type="hidden" name="assignmentId" value="',(g=c.assignmentId)?g=g.call(b,{hash:{},data:e}):(g=b.assignmentId,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n  <input type="hidden" name="turkerId" value="',(g=c.workerId)?g=g.call(b,{hash:{},data:e}):(g=b.workerId,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n  <input type="hidden" name="duration" value="',(g=c.duration)?g=g.call(b,{hash:{},data:e}):(g=b.duration,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n\n  <h3>Comments</h3>\n  <label>\n    <div>Did you find one of the allies more useful than others?\n      Please discuss any overall thoughts on the allies: ',(g=c.all_allies_string)?g=g.call(b,{hash:{},data:e}):(g=b.all_allies_string,g=typeof g===h?g.apply(b):g),f+=i(g)+'.</div>\n    <textarea rows="4" cols="80" name="allies_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What characterized enemy planes?</div>\n    <textarea rows="2" cols="80" name="enemy_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What characterized friendly planes?</div>\n    <textarea rows="2" cols="80" name="friendly_comments"></textarea>\n  </label>\n\n  <label>\n    <div>Was this task unclear, mispriced, or frustrating? If we could make it better, let us know!</div>\n    <textarea rows="4" cols="80" name="task_comments"></textarea>\n  </label>\n\n  <p class="clear">\n    <input type="submit" value="Submit Responses and Finish Task" />\n  </p>\n</form>\n',f}),b["aircraft-scene.mu"]=a(function(a,b,c,d,e){function m(a,b){var d="",e;return d+='\n        <tr class="',(e=c.judgment)?e=e.call(a,{hash:{},data:b}):(e=a.judgment,e=typeof e===i?e.apply(a):e),d+=j(e)+'">\n          <td>',(e=c.title)?e=e.call(a,{hash:{},data:b}):(e=a.title,e=typeof e===i?e.apply(a):e),d+=j(e)+"&nbsp;",(e=c.name)?e=e.call(a,{hash:{},data:b}):(e=a.name,e=typeof e===i?e.apply(a):e),d+=j(e)+":</td>\n          <td><span>",(e=c.judgment)?e=e.call(a,{hash:{},data:b}):(e=a.judgment,e=typeof e===i?e.apply(a):e),d+=j(e)+"</span></td>\n        </tr>\n        ",d}function n(a,b){var d="",e;return d+='\n    <img src="/static/aircraft/pixelated/',(e=c.src)?e=e.call(a,{hash:{},data:b}):(e=a.src,e=typeof e===i?e.apply(a):e),d+=j(e)+'" />\n ',d}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+="<h3>Batch ",(g=c.batch_id)?g=g.call(b,{hash:{},data:e}):(g=b.batch_id,g=typeof g===i?g.apply(b):g),f+=j(g)+" / Scene ",(g=c.id)?g=g.call(b,{hash:{},data:e}):(g=b.id,g=typeof g===i?g.apply(b):g),f+=j(g)+'</h3>\n<table>\n  <tr>\n    <td><img src="/static/aircraft/pixelated/',(g=c.src)?g=g.call(b,{hash:{},data:e}):(g=b.src,g=typeof g===i?g.apply(b):g),f+=j(g)+'" /></td>\n    <td style="padding-left: 20px; vertical-align: top;">\n      <table class="stats">\n        <tr><td>Estimated number of friendly aircraft in the sky:</td><td>',(g=c.total_friendly)?g=g.call(b,{hash:{},data:e}):(g=b.total_friendly,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n        <tr><td>Estimated number of enemy aircraft in the sky:</td><td>",(g=c.total_enemy)?g=g.call(b,{hash:{},data:e}):(g=b.total_enemy,g=typeof g===i?g.apply(b):g),f+=j(g)+'</td></tr>\n      </table>\n\n      <h3>Allies:</h3>\n      <table class="allies">\n        ',h={hash:{},inverse:k.noop,fn:k.program(1,m,e),data:e},(g=c.allies)?g=g.call(b,h):(g=b.allies,g=typeof g===i?g.apply(b):g),c.allies||(g=l.call(b,g,h));if(g||g===0)f+=g;f+='\n      </table>\n\n      <h3>Your decision:</h3>\n      <div class="spaced-buttons">\n        <button data-id="enemy">Enemy</button>\n        <button data-id="friend">Pass</button>\n      </div>\n    </td>\n  </tr>\n</table>\n<div style="display: none">\n ',h={hash:{},inverse:k.noop,fn:k.program(3,n,e),data:e},(g=c.next)?g=g.call(b,h):(g=b.next,g=typeof g===i?g.apply(b):g),c.next||(g=l.call(b,g,h));if(g||g===0)f+=g;return f+="\n</div>\n",f}),b["assignment.mu"]=a(function(a,b,c,d,e){function m(a,b){return'\n        <button data-action="ApproveAssignment">Approve</button>\n        <button data-action="RejectAssignment">Reject</button>\n      '}function n(a,b){return'\n        <button data-action="ApproveRejectedAssignment">Unreject and Approve</button>\n      '}function o(a,b){var d="",e;return d+="\n      <tr><td>ApprovalTime</td><td>",(e=c.ApprovalTime)?e=e.call(a,{hash:{},data:b}):(e=a.ApprovalTime,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td></tr>\n    ",d}function p(a,b){var d="",e;return d+="\n      <tr><td>RejectionTime</td><td>",(e=c.RejectionTime)?e=e.call(a,{hash:{},data:b}):(e=a.RejectionTime,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td></tr>\n    ",d}function q(a,b){var d="",e;return d+="\n      <tr><td>",(e=c.QuestionIdentifier)?e=e.call(a,{hash:{},data:b}):(e=a.QuestionIdentifier,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td><td>",(e=c.FreeText)?e=e.call(a,{hash:{},data:b}):(e=a.FreeText,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td></tr>\n    ",d}function r(a,b){var d="",e;return d+="\n      <tr><td>",(e=c.key)?e=e.call(a,{hash:{},data:b}):(e=a.key,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td><td>",(e=c.value)?e=e.call(a,{hash:{},data:b}):(e=a.value,e=typeof e===i?e.apply(a):e),d+=j(e)+"</td></tr>\n    ",d}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div class="assignment">\n  <h3>Assignment: ',(g=c.AssignmentId)?g=g.call(b,{hash:{},data:e}):(g=b.AssignmentId,g=typeof g===i?g.apply(b):g),f+=j(g)+'</h3>\n\n  <div class="controls" style="float: left; width: 32%;">\n    <fieldset class="status">\n      <legend>Status</legend>\n      <span class="',(g=c.AssignmentStatus)?g=g.call(b,{hash:{},data:e}):(g=b.AssignmentStatus,g=typeof g===i?g.apply(b):g),f+=j(g)+'">',(g=c.AssignmentStatus)?g=g.call(b,{hash:{},data:e}):(g=b.AssignmentStatus,g=typeof g===i?g.apply(b):g),f+=j(g)+"</span>\n      ",h={hash:{},inverse:k.noop,fn:k.program(1,m,e),data:e},(g=c.Submitted)?g=g.call(b,h):(g=b.Submitted,g=typeof g===i?g.apply(b):g),c.Submitted||(g=l.call(b,g,h));if(g||g===0)f+=g;f+="\n      ",h={hash:{},inverse:k.noop,fn:k.program(3,n,e),data:e},(g=c.Rejected)?g=g.call(b,h):(g=b.Rejected,g=typeof g===i?g.apply(b):g),c.Rejected||(g=l.call(b,g,h));if(g||g===0)f+=g;f+='\n    </fieldset>\n\n    <fieldset class="bonus">\n      <legend>Bonus</legend>\n      <label>Amount: <input name="amount" value="',(g=c.bonus_owed)?g=g.call(b,{hash:{},data:e}):(g=b.bonus_owed,g=typeof g===i?g.apply(b):g),f+=j(g)+'" /></label>\n      <label>Reason: <input name="reason" value="',(g=c.reason)?g=g.call(b,{hash:{},data:e}):(g=b.reason,g=typeof g===i?g.apply(b):g),f+=j(g)+'" style="width: 200px" /></label>\n      <button data-action="GrantBonus">Grant Bonus</button>\n    </fieldset>\n  </div>\n\n  <table class="keyval" style="float: left; width: 64%;">\n    <tr><td>WorkerId</td><td>',(g=c.WorkerId)?g=g.call(b,{hash:{},data:e}):(g=b.WorkerId,g=typeof g===i?g.apply(b):g),f+=j(g)+' <a href="../Workers/',(g=c.WorkerId)?g=g.call(b,{hash:{},data:e}):(g=b.WorkerId,g=typeof g===i?g.apply(b):g),f+=j(g)+'">json</a></td></tr>\n    <tr><td>AutoApprovalTime</td><td>',(g=c.AutoApprovalTime)?g=g.call(b,{hash:{},data:e}):(g=b.AutoApprovalTime,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>AcceptTime</td><td>",(g=c.AcceptTime)?g=g.call(b,{hash:{},data:e}):(g=b.AcceptTime,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>SubmitTime</td><td>",(g=c.SubmitTime)?g=g.call(b,{hash:{},data:e}):(g=b.SubmitTime,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    ",h={hash:{},inverse:k.noop,fn:k.program(5,o,e),data:e},(g=c.Approved)?g=g.call(b,h):(g=b.Approved,g=typeof g===i?g.apply(b):g),c.Approved||(g=l.call(b,g,h));if(g||g===0)f+=g;f+="\n    ",h={hash:{},inverse:k.noop,fn:k.program(7,p,e),data:e},(g=c.Rejected)?g=g.call(b,h):(g=b.Rejected,g=typeof g===i?g.apply(b):g),c.Rejected||(g=l.call(b,g,h));if(g||g===0)f+=g;f+='\n    <tr><th colspan="2">Responses</th></tr>\n    ',h={hash:{},inverse:k.noop,fn:k.program(9,q,e),data:e},(g=c.Answer)?g=g.call(b,h):(g=b.Answer,g=typeof g===i?g.apply(b):g),c.Answer||(g=l.call(b,g,h));if(g||g===0)f+=g;f+="\n    ",h={hash:{},inverse:k.noop,fn:k.program(11,r,e),data:e},(g=c.user_fields)?g=g.call(b,h):(g=b.user_fields,g=typeof g===i?g.apply(b):g),c.user_fields||(g=l.call(b,g,h));if(g||g===0)f+=g;return f+='\n  </table>\n\n  <div style="clear: both">\n    <button class="responses">Load responses</button>\n  </div>\n</div>\n\n',f}),b["consent.mu"]=a(function(a,b,c,d,e){return this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{},'<h3>Consent form</h3>\n<p>\n  You are invited to participate in a study, entitled "Learning in Social Networks". The study is being conducted by Colin Bannard in the Linguistics department of The University of Texas at Austin.\n<p>\n  Department of Linguistics<br/>\n  University of Texas at Austin,<br/>\n  305 E. 23rd Street B5100,<br/>\n  Austin, TX 78712, USA<br/>\n  (512) 471-9022\n<p>The purpose of this study is to examine how people learn. We estimate that it will take about half a minute of your time to complete each question, and you will be paid 2 cents for each question you respond to. You are free to contact the investigator at the above address and phone number to discuss the survey.\n<p>Risks to participants are considered minimal. There will be no costs for participating. You will be paid for each HIT you complete, but will not otherwise benefit from participating. Your Amazon Mechanical Turk identification will be kept while we collect data for tracking purposes only. A limited number of research team members will have access to the data during data collection. This information will be stripped from the final dataset.\n<p>Your participation in this survey is voluntary. You may decline to answer any question and you have the right to withdraw from participation at any time without penalty. If you wish to withdraw from the study or have any questions, contact the investigator listed above.\n<p>If you have any questions, please email Colin Bannard at bannard@utexas.edu. You may also request a hard copy of the survey from the contact information above.\n<p>This study has been reviewed and approved by The University of Texas at Austin Institutional Review Board (IRB Study Number 2010-10-0051). If you have questions about your rights as a study participant, or are dissatisfied at any time with any aspect of this study, you may contact - anonymously, if you wish - the Institutional Review Board by phone at (512) 471-8871 or email at orsc@uts.cc.utexas.edu.\n<p>\n<button>I Consent</button>\n'}),b["digits-batch.mu"]=a(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h,i="function",j=this.escapeExpression;return f+='<table cellpadding="0" cellspacing="0" style="margin: 0 auto">\n  <tr>\n    <th colspan="'+j((g=(g=b.scenes,g==null||g===!1?g:g.length),typeof g===i?g.apply(b):g))+'" class="left">\n      <h3>Bomb ',(h=c.id)?h=h.call(b,{hash:{},data:e}):(h=b.id,h=typeof h===i?h.apply(b):h),f+=j(h)+'</h3>\n    </th>\n  </tr>\n  <tr id="digits"></tr>\n  <tr>\n    <td colspan="'+j((g=(g=b.scenes,g==null||g===!1?g:g.length),typeof g===i?g.apply(b):g))+'" class="right" style="padding: 20px 0">\n      <button disabled="true">Submit</button>\n    </td>\n  </tr>\n</table>\n',f}),b["digits-conclusion.mu"]=a(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression;return f+='<form method="POST" action="',(g=c.host)?g=g.call(b,{hash:{},data:e}):(g=b.host,g=typeof g===h?g.apply(b):g),f+=i(g)+'/mturk/externalSubmit">\n  <input type="hidden" name="assignmentId" value="',(g=c.assignmentId)?g=g.call(b,{hash:{},data:e}):(g=b.assignmentId,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n  <input type="hidden" name="turkerId" value="',(g=c.workerId)?g=g.call(b,{hash:{},data:e}):(g=b.workerId,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n  <input type="hidden" name="duration" value="',(g=c.duration)?g=g.call(b,{hash:{},data:e}):(g=b.duration,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />\n\n  <p>Comments are optional, but much appreciated.</p>\n\n  <label>\n    <div>Did you find one of your colleagues more useful than others?\n      Please discuss whether they (',(g=c.all_allies_string)?g=g.call(b,{hash:{},data:e}):(g=b.all_allies_string,g=typeof g===h?g.apply(b):g),f+=i(g)+') were helpful or not.</div>\n    <textarea rows="4" cols="80" name="allies_comments"></textarea>\n  </label>\n\n  <label>\n    <div>What strategy worked the best?</div>\n    <textarea rows="2" cols="80" name="strategy_comments"></textarea>\n  </label>\n\n  <label>\n    <div>Was this task unclear, mispriced, or frustrating? If we could make it better, let us know!</div>\n    <textarea rows="4" cols="80" name="task_comments"></textarea>\n  </label>\n\n  <p class="clear">\n    <input type="submit" value="Submit Responses and Finish Task" />\n  </p>\n</form>\n',f}),b["digits-scene.mu"]=a(function(a,b,c,d,e){function m(a,b){var d="",e;return d+='\n    <tr class="',(e=c.judgment)?e=e.call(a,{hash:{},data:b}):(e=a.judgment,e=typeof e===i?e.apply(a):e),d+=j(e)+'">\n      <td>',(e=c.title)?e=e.call(a,{hash:{},data:b}):(e=a.title,e=typeof e===i?e.apply(a):e),d+=j(e)+"&nbsp;",(e=c.name)?e=e.call(a,{hash:{},data:b}):(e=a.name,e=typeof e===i?e.apply(a):e),d+=j(e)+":</td>\n      <td><span>",(e=c.judgment)?e=e.call(a,{hash:{},data:b}):(e=a.judgment,e=typeof e===i?e.apply(a):e),d+=j(e)+"</span></td>\n    </tr>\n    ",d}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div class="image"><!-- fill in with canvas rendering --></div>\n\n<div class="allies">\n  <h3>Colleagues:</h3>\n  <table>\n    ',h={hash:{},inverse:k.noop,fn:k.program(1,m,e),data:e},(g=c.allies)?g=g.call(b,h):(g=b.allies,g=typeof g===i?g.apply(b):g),c.allies||(g=l.call(b,g,h));if(g||g===0)f+=g;return f+='\n  </table>\n</div>\n\n<div class="user-judgment">\n  <h3>Your<br/> judgment:</h3>\n  <input type="text" maxlength="1" min="0" max="10" required />\n</div>\n',f}),b["feedback.mu"]=a(function(a,b,c,d,e){function i(a,b){return'\n    <img src="/static/smile.gif" alt="☺" />\n  '}function j(a,b){return'\n    <img src="/static/frown.gif" alt="☹" />\n  '}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h=this;f+='<div class="emoticon">\n  ',g=c["if"].call(b,b.correct,{hash:{},inverse:h.program(3,j,e),fn:h.program(1,i,e),data:e});if(g||g===0)f+=g;return f+="\n</div>\n",f}),b["form-input.mu"]=a(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression;return f+="<label>",(g=c.label)?g=g.call(b,{hash:{},data:e}):(g=b.label,g=typeof g===h?g.apply(b):g),f+=i(g)+'</label><input name="',(g=c.id)?g=g.call(b,{hash:{},data:e}):(g=b.id,g=typeof g===h?g.apply(b):g),f+=i(g)+'" value="',(g=c.value)?g=g.call(b,{hash:{},data:e}):(g=b.value,g=typeof g===h?g.apply(b):g),f+=i(g)+'" />',f}),b["hit.mu"]=a(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{};var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="hit">\n  <h2>HIT: ',(g=c.Title)?g=g.call(b,{hash:{},data:e}):(g=b.Title,g=typeof g===i?g.apply(b):g),f+=j(g)+'</h2>\n  <table class="keyval">\n    <tr><td>HITId</td><td><a href="HITs/',(g=c.HITId)?g=g.call(b,{hash:{},data:e}):(g=b.HITId,g=typeof g===i?g.apply(b):g),f+=j(g)+'">',(g=c.HITId)?g=g.call(b,{hash:{},data:e}):(g=b.HITId,g=typeof g===i?g.apply(b):g),f+=j(g)+"</a></td></tr>\n    <tr><td>HITTypeId</td><td>",(g=c.HITTypeId)?g=g.call(b,{hash:{},data:e}):(g=b.HITTypeId,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>CreationTime</td><td>",(g=c.CreationTime)?g=g.call(b,{hash:{},data:e}):(g=b.CreationTime,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>Expiration</td><td>",(g=c.Expiration)?g=g.call(b,{hash:{},data:e}):(g=b.Expiration,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>Keywords</td><td>",(g=c.Keywords)?g=g.call(b,{hash:{},data:e}):(g=b.Keywords,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>Description</td><td>",(g=c.Description)?g=g.call(b,{hash:{},data:e}):(g=b.Description,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>HITStatus</td><td>",(g=c.HITStatus)?g=g.call(b,{hash:{},data:e}):(g=b.HITStatus,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>HITReviewStatus</td><td>",(g=c.HITReviewStatus)?g=g.call(b,{hash:{},data:e}):(g=b.HITReviewStatus,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>MaxAssignments</td><td>",(g=c.MaxAssignments)?g=g.call(b,{hash:{},data:e}):(g=b.MaxAssignments,g=typeof g===i?g.apply(b):g),f+=j(g)+"</td></tr>\n    <tr><td>Reward</td><td>"+j((g=(g=b.Reward,g==null||g===!1?g:g.FormattedPrice),typeof g===i?g.apply(b):g))+"</td></tr>\n    <tr><td>AssignmentDurationInSeconds</td><td>",(h=c.AssignmentDurationInSeconds)?h=h.call(b,{hash:{},data:e}):(h=b.AssignmentDurationInSeconds,h=typeof h===i?h.apply(b):h),f+=j(h)+"</td></tr>\n    <tr><td>AutoApprovalDelayInSeconds</td><td>",(h=c.AutoApprovalDelayInSeconds)?h=h.call(b,{hash:{},data:e}):(h=b.AutoApprovalDelayInSeconds,h=typeof h===i?h.apply(b):h),f+=j(h)+"</td></tr>\n    <tr><td>NumberOfAssignmentsPending</td><td>",(h=c.NumberOfAssignmentsPending)?h=h.call(b,{hash:{},data:e}):(h=b.NumberOfAssignmentsPending,h=typeof h===i?h.apply(b):h),f+=j(h)+"</td></tr>\n    <tr><td>NumberOfAssignmentsAvailable</td><td>",(h=c.NumberOfAssignmentsAvailable)?h=h.call(b,{hash:{},data:e}):(h=b.NumberOfAssignmentsAvailable,h=typeof h===i?h.apply(b):h),f+=j(h)+"</td></tr>\n    <tr><td>NumberOfAssignmentsCompleted</td><td>",(h=c.NumberOfAssignmentsCompleted)?h=h.call(b,{hash:{},data:e}):(h=b.NumberOfAssignmentsCompleted,h=typeof h===i?h.apply(b):h),f+=j(h)+"</td></tr>\n  </table>\n</div>\n",f})})()