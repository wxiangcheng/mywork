$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
		$(".form-signup").toggleClass("form-signup-left");
		$(".frame").toggleClass("frame-long");
		$(".signup-inactive").toggleClass("signup-active");
		$(".signin-active").toggleClass("signin-inactive");
		$(".forgot").toggleClass("forgot-left");
		$(".btn-goback").toggleClass("btn-goback-inactive");
		$(this).removeClass("idle").addClass("active");
	});
});

$(function() {
	$(".btn-signup").click(function() {
		// check input
		var flag = true;
		

		if ($("#firstname").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#firstname").css("border","1px solid red");
			$("#firstname").attr("placeholder", "Enter first name!");
			flag = false;
		}
		
		if ($("#lastname").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#lastname").css("border","1px solid red");
			$("#lastname").attr("placeholder", "Enter last name!");
			flag = false;
		}
		
		var email = $("#email_r").val();
	　　var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;            
	　　if (!Regex.test(email)){                
			$("#email_r").css("border","1px solid red");
			$("#email_r").attr("placeholder", "Enter valid email address!");
			$("#emailmsg").show();
			$("#emailmsg").html("Enter valid email address!");
			
			flag = false;
	　　}
	
		var password_r = $("#password_r").val();
		if ($("#password_r").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#password_r").css("border","1px solid red");
			$("#password_r").attr("placeholder", "Enter your password!");
			flag = false;
		}
	
		var confirmpassword = $("#confirmpassword").val();
		if ($("#confirmpassword").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#confirmpassword").css("border","1px solid red");
			$("#confirmpassword").attr("placeholder", "Enter your password!");
			flag = false;
		}
		
		flag = true;
		
		if (flag) {
			if (confirmpassword != password_r) {
				$("#pwdmsg").html("Check your two password!");
				flag = false;
			}
		}
		
		var data = "email=" + email + "&password=" + password_r;
		
		if (flag) {
			$.post("/dot/user/register1",data,function(result){
				var obj = eval('(' + result + ')');
				if (obj.flag == 0) // 成功
				{
					$(".nav").toggleClass("nav-up");
					$(".form-signup-left").toggleClass("form-signup-down");
					$(".success").toggleClass("success-left");
					$(".frame").toggleClass("frame-short");
				} else {
					$("#pwdmsg").html(obj.data.msg);
				}
			});
			
		} else {
			return false;
		}
	});
	
	$(".resentemail").click(function() {
		$(".signupemailmsg").html("Check your email for confirmation.");
	});
});

$(function() {
	$(".btn-signin").click(function() {
		
		// check email address
		var email = $("#username").val();
	　　var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;            
	　　if (!Regex.test(email)){                
			$("#username").css("border","1px solid red");
			$("#username").attr("placeholder", "Enter valid email address!");
	　　} else {
			var data = "email=" + email + "&password=" + $("#password").val();
			data = {"email":email,
					"password": $("#password").val()
			};
			$.post("/user/login",data,function(result){
				//alert(result);
				
				//result = '{"data":{"jump":"","msg":"Password is not correct","timeout":5,"style":"default","argv":[]},"msg":"Password is not correct","flag":1}';

				var obj = eval('(' + result + ')');
				if (obj.flag == 0) // 成功
				{
					//$.cookie('user_token', obj.data.token); 
					$.cookie('user_id', obj.data.user.id); 
					$.cookie('user_email', obj.data.user.email); 
					$.cookie('user_first_name', obj.data.user.first_name); 
					$.cookie('user_last_name', obj.data.user.last_name); 
					
					$("#welcomeh").html("Welcome, " + obj.data.user.first_name + " " + obj.data.user.last_name);
					$(".btn-animate").toggleClass("btn-animate-grow");
					$(".welcome").toggleClass("welcome-left");
					$(".cover-photo").toggleClass("cover-photo-down");
					$(".frame").toggleClass("frame-short");
					$(".profile-photo").toggleClass("profile-photo-down");
					$(".btn-goback").toggleClass("btn-goback-up");
					$(".forgot").toggleClass("forgot-fade");
				} else {
					$("#signinmsg").html(obj.data.msg);
				}

				
			});

			
		}
	});
	
	$(".forgot").click(function() {
		// check email address
		var email = $("#username").val();
	　　var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;            
	　　if (!Regex.test(email)){                
			$("#username").css("border","1px solid red");
			$("#username").attr("placeholder", "Enter your email address to get new password!");
	　　} else {
			$("#welcomeh").hide();
			$("#sendpasswordh").show();
		
			$(".btn-animate").toggleClass("btn-animate-grow");
			$(".welcome").toggleClass("welcome-left");
			$(".cover-photo").toggleClass("cover-photo-down");
			$(".frame").toggleClass("frame-short");
			$(".profile-photo").toggleClass("profile-photo-down");
			$(".btn-goback").toggleClass("btn-goback-up");
			$(".forgot").toggleClass("forgot-fade");
		}
	});
});

$(function() {
	$(".form-styling").focus(function() {
		$(this).css("border", "none");
		$(this).attr("placeholder", "");
		
		$("#signinmsg").html("&nbsp;");
	});
	
	$(".form-styling2").focus(function() {
		$(this).css("border", "none");
		$(this).attr("placeholder", "");
		if ($(this).attr("id") == 'email_r') {
			$("#emailmsg").hide();
			$("#emailmsg").html("");
		}
		$("#pwdmsg").html("");
	});
});