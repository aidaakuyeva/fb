var page_idx = 0;
var page_count = 0;
var current_data;
$(document).ready(function() {
  $("#version").html("v0.14");
  
  $("#searchbutton").click( function (e) {
    displayModal();
  });
  
  $("#searchfield").keydown( function (e) {
    if(e.keyCode == 13) {
      displayModal();
    }	
  });
  
  function displayModal() {
    $("#myModal").modal('show');
    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: "+$("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val() , function(data) {
      renderQueryResults(data);
    });
  }
  
  $("#next").click( function(e) {
    e.preventDefault();
    if(page_idx + 1 < page_count){
      page_idx+=1;
      updateQueryResults(current_data, page_idx);
    }

//TODO: Implement 'next' button
  });
  
  $("#previous").click( function(e) {
    e.preventDefault();
    if(page_idx - 1 >= 0){
      page_idx-=1;
      updateQueryResults(current_data, page_idx);
    }

//TODO: Implement 'previous' button
  });

  function updateQueryResults(data, page_idx) {
    if(page_count - page_idx > 1)$("#next").show();
    else $("#next").hide();
    if(page_idx > 0)$("#previous").show();
    else $("#previous").hide();
    for(let i = 0; i < 4; ++i){
      if(i + page_idx*4 < data.num_results){
        $("#photo"+i).show();
        $("#photo"+i).html('<img alt="img'+(i+page_idx*4)+'" width="180" height="190" src="' + data.results[i + page_idx*4] + '">');
      }else $("#photo"+i).hide();
    }
  }

  function renderQueryResults(data) {
    if (data.error != undefined) {
      $("#status").html("Error: "+data.error);
    } else {
      $("#status").html(""+data.num_results+" result(s)");
      $("#next").show();
      $("#previous").show();
//TODO: Show/hide 'previous' and 'next' buttons as appropriate
//TODO: Show the pictures in the dialog box (they should go into the 'photo0'..'photo3' cells)
      page_count = Math.ceil(data.num_results/4);
      current_data = data;
      updateQueryResults(current_data, page_idx);

     }
   }
});
