$(document).ready(function(){
	$( function() {
		$( "#accordion" ).accordion({heightStyle: "content", collapsible: true});
		
	});
	
	$("form#uploadTrace").submit(function(event){
      event.preventDefault();
      
      $("#messageDiv").empty();

      var formData = new FormData($(this)[0]);
      console.log(formData);
      $.ajax({
        url: "process_file.php",
        type: "POST",
        data: formData,
        async: true,
        success: function (data) {
          if(data.includes("oops...")){
            console.log(data);
            $("#messageDiv").html("<span>" + data + "</span>").css({"color":"red"});
          }
          else {
            console.log(data);
            //window.location.reload();
          }
        },
        cache: false,
        contentType: false,
        processData: false
      })
      
      return false;
  });
	
	$("button#filtered-intercept").click(function(event){
      event.preventDefault();
      
    var fields = $(".get-intercept").serializeArray();
	  console.log(fields);
	  var url = "dispatch.php?trace_name=" + fields[2]['value'] + "&start=" + fields[0]['value'] + "&end=" + fields[1]['value'];
	  console.log(url);
	  $.get(url,
	  function(data){
		$("#intercept-out").empty();
		 $("#intercept-out").html(data); 
	  });
  });

$("a#long-duration-commands").click(function(event){
      event.preventDefault();
      
    var trace_name = $(this).attr("data-trace-name");
    var start = $(this).attr("data-start");
    var end = $(this).attr("data-end");
	  var url = "dispatch.php?trace_name=" + trace_name + "&start=" + start + "&end=" + end + "&long_query=y";
	  console.log(url);
	  $.get(url,
	  function(data){
		$("#intercept-out").empty();
		 $("#intercept-out").html(data); 
	  });
  });

$("a#delete_trace").click(function(event){
      event.preventDefault();
      var line = $(this).attr("data-id");
      var trace_name = $(this).attr("data-trace_name");
      var id = line;
      var url = "delete.php?trace_name=" + trace_name + "&id=" + id + "&delete=Y";
      console.log(url);
      $.get(url, function(data){
        window.location.reload(); 
      }).fail(function(data){
        $("#messageDiv").html("<span>" + data.statusText + "</span>").css({"color":"red"});
      });
  });

$("button#full-intercept").click(function(event){
      event.preventDefault();
      
      var fields = $(".get-intercept").serializeArray();
	  console.log(fields);
	  var url = "dispatch.php?trace_name=" + fields[2]['value'];
	  console.log(url);
	  $.get(url, function(data){
		$("#intercept-out").empty();
		 $("#intercept-out").html(data); 
	  });
  });

$("button#next-buffer").click(function(event){
      event.preventDefault();
      
      var fields = $(".get-intercept").serializeArray();
      console.log(fields);
      var url = "next_buffer.php?trace_name=" + fields[2]['value'];
      console.log(url);
      $.get(url, function(data){
        $("#intercept-out").empty();
        $("#intercept-out").html(data); 
      });
  });

$("button#next-buffer-full").click(function(event){
      event.preventDefault();
      
      var fields = $(".get-intercept").serializeArray();
      console.log(fields);
      var url = "next_buffer.php?trace_name=" + fields[2]['value'] + "&full=y";
      console.log(url);
      $.get(url, function(data){
        $("#intercept-out").empty();
        $("#intercept-out").html(data); 
      });
  });

$("a.get-esq").click(function(event){
      event.preventDefault();
      var check = $(this).attr("data-code");
      var line = $(this).attr("data-linenum");
	    var trace_name = $(this).attr("data-trace_name");
      var linenum = line;
      var url = "dispatch.php?trace_name=" + trace_name + "&line_num=" + linenum;
      console.log(url);
      $.get(url, function(data){
          $("#intercept-out").empty();
          $("#intercept-out").html(data); 
	  });
  });

  $("a.get-return-duration").click(function(event){
      event.preventDefault();
      var check = $(this).attr("data-code");
      var line = $(this).attr("data-linenum");
	  var trace_name = $(this).attr("data-trace_name");
	  var linenum = line;
	  var url = "dispatch.php?trace_name=" + trace_name + "&line_num=" + linenum + "&title=" + check;
	  console.log(url);
	  $.get(url, function(data){
		 $("#intercept-out").empty();
		 $("#intercept-out").html(data); 
	  });
  });

  var $loading = $('#loadingDiv').hide();
  $(document)
    .ajaxStart(function () {
      $loading.show();
    })
    .ajaxStop(function () {
      $loading.hide();
    });

var msgDialog = $("#dialog-message").hide();

$("button#next-buffer-help").click(function(){
      $("#dialog-message").dialog('open');
      return false;
  });
  
$( function() {
    $( "#dialog-message" ).dialog({
      modal: true,
      autoOpen: false,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  } );

// $('tbody > tr:not(".collapse")').hide();
// $('thead.show-me').click(function(){
//     $(this).nextUntil('tr.collapse').show();
// });
  
});