console.log("works");

$(function()
{
  $("#sign-up").click(function()
  {
    console.log('before ajax');
    $.ajax(
    {
      url: 'http://localhost:3000/users',
      method: 'GET',
      dataType: 'json'
    }).done(renderUser);
  });
  


  var renderUser = function(data) 
  {
    console.log('check data: ', data);
    // console.log("ajax has completed bc I'm rendering instructors");

    // Gotta make sure the right thing is showing and the wrong things aren't
    // Try commenting this stuff out and watch what happens...yuck
    var resultDiv = $("#form-container");
    resultDiv.empty();
    // $('#new-instructor-link').show();
    // $('#new-complaint-link').hide();
    // $('#form-container').empty();
    // $("body").empty();

    // Let's set up Handlebars and compile so all this templating isn't happening server side, but client!\
    var source = $("#status-template").html();
    var template = Handlebars.compile(source);

    console.log(data.total);

    resultDiv.append(template(data.total));

    // for(var i=0;i<data.length;i++) 
    // {
    //   // $("body").append(data);
    //   // console.log(data.length);
    //   // $("body").append(data.length);
    //   resultDiv.append(template(data[i]));
    // }

    // $('.edit-instructor').click(function(){
    //  var $id = $(this).parent().attr("data-id");
    //  console.log('editting instructors!')
    //  editInstructor($id);
    // });
  }

});