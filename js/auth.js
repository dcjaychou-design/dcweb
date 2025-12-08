document.addEventListener("DOMContentLoaded", () => {		
//	<!-- 为文档添加一个事件监听器，当DOM内容加载完成后再执行 -->
 
	//注册:
	let havereg = document.getElementById("register-btn");
    if (havereg) {
	 	 havereg.onclick = async () => {
  // 读取并去空格
  const username  = document.getElementById("reg-username").value.trim();
  const password  = document.getElementById("reg-password").value.trim();
  const nickname  = document.getElementById("reg-nickname").value.trim();
  const email     = document.getElementById("reg-email").value.trim();
  const phone     = document.getElementById("reg-phone").value.trim();
  const gender    = document.getElementById("reg-gender").value.trim();
  const school    = document.getElementById("reg-school").value.trim();
  const major     = document.getElementById("reg-major").value.trim();
  const signature = document.getElementById("reg-signature").value.trim();

  // 必填校验（按你的新要求）
  if (!username) {
    alert("用户名不能为空");
    return;
  }

  if (username.length > 15) {
    alert("用户名不能超过15个字符");
    return;
  }

  if (!password) {
    alert("密码不能为空");
    return;
  }

  if (password.length < 6) {
    alert("密码不能少于6位");
    return;
  }

  // 邮箱格式校验（不变）
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRe.test(email)) {
    alert("邮箱格式不正确");
    return;
  }

  // 手机号格式校验（不变）
  const phoneRe = /^\d{7,15}$/;
  if (phone && !phoneRe.test(phone)) {
    alert("手机号格式不正确（7-15位数字）");
    return;
  }

  // 防止重复点击
  havereg.disabled = true;

  try {
    // 检查用户名是否已存在
    const query = new AV.Query("UserAuth1");
    query.equalTo("username", username);
    const exist = await query.first().catch(() => null);

    if (exist) {
      alert("用户名已存在");
      havereg.disabled = false;
      return;
    }

    // 保存数据
    const UserAuth1 = AV.Object.extend("UserAuth1");
    const user = new UserAuth1();

    user.set("username", username);
    user.set("password", password);
    user.set("nickname", nickname);
    user.set("email", email);
    user.set("phone", phone);
    user.set("gender", gender);
    user.set("school", school);
    user.set("major", major);
    user.set("signature", signature);

    await user.save();

    alert("注册成功！");
    window.location.href = "index.html";

  } catch (e) {
    console.error(e);
    alert("注册失败，请稍后再试");
  } finally {
    havereg.disabled = false;
  }
};
}

    // 登录
	let havelog = document.getElementById("login-btn");
    if (havelog) {
		 havelog.onclick = async () => {			 
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            const query = new AV.Query("UserAuth1");
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
		}}
});
