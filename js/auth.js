// js/auth.js

// 注册
document.addEventListener("DOMContentLoaded", () => {
    
    let regBtn = document.getElementById("register-btn");
    if (regBtn) {
        regBtn.onclick = async () => {
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;

            const UserAuth = AV.Object.extend("UserAuth");
            const query = new AV.Query("UserAuth");

            // 检查是否已存在
            query.equalTo("username", username);
            const exist = await query.first().catch(() => null);

            if (exist) {
                alert("用户名已存在");
                return;
            }

            const user = new UserAuth();
            user.set("username", username);
            user.set("password", password);

            await user.save();
            alert("注册成功！");
            window.location.href = "index.html";
        };
    }

    // 登录
    let loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.onclick = async () => {
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            const query = new AV.Query("UserAuth");
            query.equalTo("username", username);
            query.equalTo("password", password);

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
        };
    }

});
// JavaScript Document