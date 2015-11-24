console.log("loaded");

$(function() {

	//make the buttons clicky
	$('#signup-button').click(function(){ renderNewUserForm() });

  $('#logInAndOut').html("Log In").click(function(){ renderLogInForm() });



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
			.done(newUser);

	};

	//welcome a new user after creation
	var newUser = function(data){

		$('#login-div').hide();

		var template = Handlebars.compile($('#template').html());

		$('#MAIN CONTAINER').append(template(data))

		//get dat cookie
		user = Cookies.get();

    //NEED TO TURN THIS INTO A LOG OUT CLICK LATER ON
    	// $('#logInAndOut').click(function(){ Cookies.remove('loggedinId') });


	};

//////////////////////////////////////////////////////////////////
////////////////////LOG IN////////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the log in form when the log in button is clicked
	var renderLogInForm = function(){

		console.log("app.js renderLogInForm");

		var $formDiv = $('#login-div');

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
			password: password
		}
		$.post('/login', user)
			.done(function(data){
				$('#login-div').hide();
			})
			.fail(function(){
				alert("app.js loginUser login failed " + user.username)
			})
	};

	//welcome a user after logging in
	var returningUser = function(data){

		//get dat cookie
		user = getCookie();

		$('#login-div').hide();

		var template = Handlebars.compile($('#template').html());

		$('#users').append(template(data))

    //NEED TO TURN THIS INTO A LOG OUT CLICK LATER ON
    	// $('#logInAndOut').click(function(){ Cookies.remove('loggedinId') });

	}

}); //end of everything
