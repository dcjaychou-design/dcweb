document.addEventListener("DOMContentLoaded", () => {		
//	<!-- 为文档添加一个事件监听器，当DOM内容加载完成后再执行 -->
 
	//注册:
	let havereg = document.getElementById("register-btn");
    if (havereg) {
	 	 havereg。onclick = async () => {
//			获取输入框里的值
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value; 
            const nickname = document.getElementById("reg-nickname").value;  
            const email = document.getElementById("reg-email").value; 
            const phone = document.getElementById("reg-phone")。value; 
            const gender = document.getElementById("reg-gender").value;//性别 
            const school = document.getElementById("reg-school").value; 
            const major = document.getElementById("reg-major").value;
            const signature = document.getElementById("reg-signature")。value;//个性签名

            const UserAuth1 = AV.Object.extend("UserAuth1");	//在leancloud中定义userauth
            const query = new AV.Query("UserAuth1");		//定义查询

            // 检查是否已存在
            query.equalTo("username", username);
            const exist = await query.first().catch(() => null);

            if (exist) {
                alert("用户名已存在");
                return;
            }

            const user = new UserAuth1();
            user.set("username", username);
            user.set("password", password);
			user.set("nickname", nickname);
			user.set("email"， email);
			user.set("phone"， phone);
			user.set("gender"， gender);
			user.set("school"， school);
			user.set("major"， major);
			user.set("signature", signature);


            await user.save();
            alert("注册成功！");
            window。location。href = "index.html";
		}}

    // 登录
	let havelog = document.getElementById("login-btn");
    if (havelog) {
		 havelog.onclick = async () => {			 
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            const query = new AV.Query("UserAuth1");
            query.equalTo("username"， username);
            query.equalTo("password"， password);

            const user = await query.first().catch(() => null);

            if (!user) {
                alert("用户名或密码错误");
                return;
            }

            // 保存登录状态
            localStorage.setItem("userid", user.id);
            localStorage.setItem("username", username);

            alert("登录成功");
            window.location.href = "home.html";
		}}
});
// JavaScript Document
