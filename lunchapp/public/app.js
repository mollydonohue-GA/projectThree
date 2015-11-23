console.log("let us lunch.");

$(function() {

	//make the buttons clicky
	$('#signup-button').click(function(){ renderNewUserForm() });

	$('#login-button').click(function(){ renderUserForm() });

	$('#logout').click(function(){ Cookies.remove('loggedinId') });
//////////////////////////////////////////////////////////////////
////////////////////SIGN UP///////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the sign up form when the signup button is clicked
	var renderNewUserForm = function(){

		var $formDiv = $('#login-div');

		$formDiv.show();
		$('.form').empty();
		$('#login-button').show();
		$('#signup-button').hide();
		var template = Handlebars.compile($('#user-form').html());

		$formDiv.append(template);

		$('#user-submit').click(function() {
			console.log('make this new user a thing!');
			$('#login-button').hide();
			createUser();
		})
		.html("sign up");

	};

	// creates new user via POST route
	var createUser = function(){

		console.log('Make a new user!');

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

	};

//////////////////////////////////////////////////////////////////
////////////////////LOG IN////////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the log in form when the log in button is clicked
	var renderUserForm = function(){

		console.log("app.js clicked log in");

		var $formDiv = $('#login-div');

		$formDiv.show();
		$('.form').empty();
		$('#login-button').hide();
		$('#signup-button').show();

		var template = Handlebars.compile($('#user-form').html());
		$formDiv.append(template);

		$('#user-submit').click(function() {
			console.log('app.js logn user in');
			loginUser();
			})
			.html("login");

	};

	// log in via POST route
	var loginUser = function(){

		console.log('app.js welcome user');

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
		$.post('/login', user)
			.done(function(data){
				$('#signup-button').hide();
				$('#login-div').hide();
			})
			.fail(function(){
				alert("app.js login failed " + user.username)
			})
	};

	//welcome a user after logging in
	var returningUser = function(data){

		//get dat cookie
		user = getCookie();

		$('#login-div').hide();

		var template = Handlebars.compile($('#template').html());

		$('#users').append(template(data))

	}

}); //end of everything
