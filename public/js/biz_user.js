$(function() {
	$(".profilebtn").click(function() {
		// check input
		var flag = true;

		if ($("#firstname").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#firstname").css("border-bottom","1px solid red");
			$("#firstname").attr("placeholder", "Enter first name!");
			flag = false;
		}
		
		if ($("#lastname").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#lastname").css("border-bottom","1px solid red");
			$("#lastname").attr("placeholder", "Enter last name!");
			flag = false;
		}
		
		var email = $("#email").val();
		if (email != $.cookie('user_email')) {
			var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;            
		　　if (!Regex.test(email)){                
				$("#email").css("border-bottom","1px solid red");
				$("#email").attr("placeholder", "Enter valid email address!");
				$("#pfmsg").show();
				$("#pfmsg").html("Enter valid email address!");
				
				flag = false;
		　　}
		} else
			email = '';
	
		var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=";
		 	params += "&last_name=" + $("#lastname").val() + "&first_name=" + $("#firstname").val()
			+ "&gender=" + $("#gender").val();
		if (email != '') {
			params += "&email=" + email;
		}
		console.log(params);
		if (flag) {
			$.post("/dot/user/edit",params,function(result){
				var obj = eval('(' + result + ')');
				$("#pfmsg").show();
				if (obj.flag == 0) // 成功
				{
					$("#pfmsg").html("Profile updated.");
				} else {
					$("#pfmsg").html(obj.data.msg);
				}
			});
			
		} else {
			return false;
		}
	});

	$(".pwdbtn").click(function() {
		// check input
		var flag = true;

		var oldpwd = $("#oldpwd").val();
		if ($("#oldpwd").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#oldpwd").css("border-bottom","1px solid red");
			$("#oldpwd").attr("placeholder", "Enter your password!");
			flag = false;
		}
	
		var newpwd = $("#newpwd").val();
		if ($("#newpwd").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#newpwd").css("border-bottom","1px solid red");
			$("#newpwd").attr("placeholder", "Enter your new password!");
			flag = false;
		}
		
		var newpwd2 = $("#newpwd2").val();
		if ($("#newpwd2").val().replace(/(^s*)|(s*$)/g, "").length ==0) {
			$("#newpwd2").css("border-bottom","1px solid red");
			$("#newpwd2").attr("placeholder", "Enter your new password!");
			flag = false;
		}
		
		if (flag) {
			if (newpwd != newpwd2) {
				$("#pwdmsg").show();
				$("#pwdmsg").html("Check your two password!");
				flag = false;
			}
		}
		
		if (flag) {
			var params ="_t=" + $.cookie('ck_user_s_token') + "&old_pw=" + oldpwd + "&new_pw=" + newpwd;
			params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=" + "&old_pw=" + oldpwd + "&new_pw=" + newpwd;
			console.log(params);
			$.post("/dot/user/password",params,function(result){
				var obj = eval('(' + result + ')');
				$("#pwdmsg").show();
				if (obj.flag == 0) // 成功
				{
					$("#oldpwd").val("");
					$("#newpwd").val("");
					$("#newpwd2").val("");
					$("#pwdmsg").html("Password changed.");
				} else {
					$("#pwdmsg").html(obj.data.msg);
				}
			});
			
		} else {
			return false;
		}
	});
	
	$(".cpctl").focus(function() {
		$(this).css("border-bottom", "1px solid #c9c9c9");
		$(this).attr("placeholder", "");
		$("#pwdmsg").hide();
		$("#pwdmsg").html("&nbsp;");
		$("#pfmsg").hide();
		$("#pfmsg").html("&nbsp;");
	});
});