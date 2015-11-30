console.log("loaded");

$(function() {

	//make the buttons clicky
	$('#signup-button').click(function(){ renderNewUserForm() });

  $('#logInAndOut').html("Log In").click(function(){ renderLogInForm() });

  var cookie = (document.cookie).replace('loggedinId=', '')


//////////////////////////////////////////////////////////////////
////////////////////SIGN UP///////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the sign up form when the signup button is clicked
	var renderNewUserForm = function(){

		var $formDiv = $('#login-div');

		$formDiv.show();
		$('.form').empty();
		$('#signup-button').hide();
		var template = Handlebars.compile($('#user-form').html());

		$formDiv.append(template);

		$('#user-submit').click(function() {
			console.log('app.js renderNewUserForm user-submit.click');
			createUser();
		})
		.html("Sign Me Up!");

	};

	// creates new user via POST route
	var createUser = function(){

		console.log('app.js createUser');

		var first_name = $('#first_name-input').val();
		var last_name = $('#last_name-input').val();
    var email = $('#email-input').val();
		var password = $('#password-input').val();

		var user = {
	    first_name: first_name,
	    last_name: last_name,
			email: email,
			password: password
		}
		$.post('/users', user)
			.done(returningUser);

	};

//////////////////////////////////////////////////////////////////
////////////////////LOG IN////////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the log in form when the log in button is clicked
	var renderLogInForm = function(){

		console.log("app.js renderLogInForm");

		var $formDiv = $('#login-div');

		$("#first-div").hide();
		$("#second-div").hide();

		$formDiv.show();

		$('.form').empty();
    $('#blurb').hide();
		$('#signup-button').html("Wait, I need to sign up first!").show();


		var template = Handlebars.compile($('#user-form').html());
		$formDiv.append(template);

    $('#names-row').hide();

    $('#user-submit').click(function() {
			console.log('app.js user-submit.click');
			loginUser();
			})
			.html("Log Me In!");

	};

	// log in via POST route
	var loginUser = function(){

		console.log('app.js loginUser');

    var email = $('#email-input').val();
	  var password = $('#password-input').val();

    var user = {
			email: email,
			password: password,
		}
		$.post('/login', user)
			.done(function(data){
        returningUser(user);
			})
			.fail(function(){
				alert("app.js loginUser login failed " + user.username)
			})

	};
/////////////////////////////////////////////////////////////////////////
//welcome a user after logging in////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
	var returningUser = function(data){

    console.log('returning user data.id = ' + data.id);

	    $('#login-div').hide();
	    $('#pre-login').hide();
	    $('#logInAndOut').html("Log Out").click(function(){
	    	$('#logInAndOut').html("Log In");
	    	$('#loggedInUser').html("No one");
        $('#signup-button').show()
		});

	    if($('#logInAndOut').html() === "Log Out"){
	    	// console.log("It is now Log out");
	    	$('#second-div').show();
			  $('#first-div').show();

      }
	    // console.log(data.email);

	    // var name = "";
      // set name via email
	    $.get('/users/email/' + data.email, data)
	    	.done(function(data){
	    		$('#loggedInUser').html(data.first_name);
	    		// console.log(data.first_name);
	    		// name = data.first_name;
	    	})

      //set name via _id
      $.get('/users/id/' + data.id, data)
        .done(function(data){
          console.log("data =" + data);
          $('#loggedInUser').html(data.first_name);
          // console.log(data.first_name);
          // name = data.first_name;
        })


			//get dat cookie
			// var user = getCookie();
			// console.log(name);

	    $.get('/restaurants', data)
			.done(function(data){

	    		var templateRest = Handlebars.compile($('#second-template').html());

	    		$('#second-div').append(templateRest(data));

          var templateChosen = Handlebars.compile($('#first-template').html());

          $('#first-div').append(templateChosen(data));

        // let's try to put a map on this site//////////////////////////
        var initialize = function(){

          var map = new google.maps.Map(document.getElementById('rest-map'), {
            zoom: 16,
            streetViewControl: false,
            mapTypeControl: false,
            center: new google.maps.LatLng(40.741921, -73.988999),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          })

          data.forEach( function (r){

            var marker = new google.maps.Marker({
              map: map,
              position: {lat: r.position.lat, lng: r.position.lng},
              title: r.name
            });

          });

        }

        // google.maps.event.addDomListener(window, 'load', initialize)

        initialize()

    		$('.order').click(function(){
    				// console.log($(this).attr("data_id"));

            $('#clear-chosen').show()

    				$.get('/restaurants/' + $(this).attr("data_id"), data)
    					.done(function(data)
    					{
                $('#chosen-welcome').hide();

    						// console.log(data);
    						var ul = $('#stuff');

    						var li = "<li><h6>"+data[0].name+"</h6><p>"+$.each(data[0].whosGoing, function(index, value){ (data[0].whosGoing[index] + ", ") })+" is going<p></li>";

    						ul.append(li);


    					})
    			});

        $('#clear-chosen').click(function(){
          console.log("app.js - /restaurants - clear-chosen - .click");


          $.ajax({
            url: '/restaurants/clear',
            type: 'PUT'})
          .done(function() {
            console.log("success");

               $('#stuff').empty();

            });

          $('#clear-chosen').hide()
          $('#chosen-welcome').show();

        });

			})

  	}


    var stayLoggedIn = function(){
      if (cookie != ""){

        console.log('app.js - if (cookie != "")');

        var user = {
          id: cookie,
        }
        $.post('/login/cookie', user)
          .done(function(data){
            console.log("stayLoggedIn user: " + data.first_name);
            returningUser(user);
            $('#loggedInUser').html(data.first_name);
          })
          .fail(function(){
            alert("app.js loginUser login failed " + user)
          })

      }
    }

    stayLoggedIn()

}); //end of everything
