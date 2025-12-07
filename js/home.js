document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ 简化的 $ 选择器
  const $ = id => document.getElementById(id);

  // 2️⃣ 检查登录状态
  const loginUser = localStorage.getItem("username");
  if (!loginUser) {
    alert("请先登录");
    location.href = "index.html";
    return;
  }

  // 3️⃣ 显示当前登录用户
  const curBox = $("current-user-box");
  const curName = $("current-username");
  if (curBox && curName) {
    curBox.style.display = "block";
    curName.innerText = loginUser;
  }

  // 4️⃣ 全局变量
  const table = $("user-table");
  const editArea = $("edit-area");
  let currentUsername = null; // 正在编辑的用户名

  // 5️⃣ 渲染表格
  function render(list) {
    table.innerHTML = "";
    list.forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.get("username")}</td>
        <td>${u.get("nickname") || ""}</td>
        <td>${u.get("email") || ""}</td>
        <td>${u.get("phone") || ""}</td>
        <td>${u.get("gender") || ""}</td>
        <td>${u.get("school") || ""}</td>
        <td>${u.get("major") || ""}</td>
        <td>${u.get("signature") || ""}</td>
        <td class="ops">
          <button class="edit-btn" data-username="${u.get("username")}">编辑</button>
          <button class="del-btn" data-username="${u.get("username")}">删除</button>
        </td>
      `;
      table.appendChild(tr);
    });

    bindRowButtons();
  }

  // 6️⃣ 绑定行操作按钮
  function bindRowButtons() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = () => startEdit(btn.dataset.username);
    });
    document.querySelectorAll(".del-btn").forEach(btn => {
      btn.onclick = () => doDelete(btn.dataset.username);
    });
  }

  // 7️⃣ 加载数据（可按昵称搜索）
  async function loadData(nickname = "") {
    const q = new AV.Query("UserAuth1");
    if (nickname) q.contains("nickname", nickname);
    const list = await q.find();
    render(list);
  }

  // 8️⃣ 开始编辑
  async function startEdit(username) {
    const q = new AV.Query("UserAuth1");
    q.equalTo("username", username);
    const user = await q.first();
    if (!user) return;

    currentUsername = username;

    $("e-username").value  = user.get("username");
    $("e-nickname").value  = user.get("nickname") || "";
    $("e-email").value     = user.get("email") || "";
    $("e-phone").value     = user.get("phone") || "";
    $("e-gender").value    = user.get("gender") || "";
    $("e-school").value    = user.get("school") || "";
    $("e-major").value     = user.get("major") || "";
    $("e-signature").value = user.get("signature") || "";

    editArea.style.display = "block";
    window.scrollTo({ top: editArea.offsetTop - 10, behavior: "smooth" });
  }

  // 9️⃣ 保存编辑
  async function saveEdit() {
    if (!currentUsername) {
      alert("请先点击编辑按钮");
      return;
    }

    const q = new AV.Query("UserAuth1");
    q.equalTo("username", currentUsername);
    const user = await q.first();

    user.set("nickname",  $("e-nickname").value);
    user.set("email",     $("e-email").value);
    user.set("phone",     $("e-phone").value);
    user.set("gender",    $("e-gender").value);
    user.set("school",    $("e-school").value);
    user.set("major",     $("e-major").value);
    user.set("signature", $("e-signature").value);

    await user.save();

    alert("更新成功");
    editArea.style.display = "none";
    currentUsername = null;
    loadData();
  }

  // 🔟 删除用户
  async function doDelete(username) {
    if (!confirm("确认删除该用户吗？")) return;

    const q = new AV.Query("UserAuth1");
    q.equalTo("username", username);
    const user = await q.first();
    if (!user) return;

    await user.destroy();
    alert("删除成功");
    loadData();
  }

  // 1️⃣1️⃣ 搜索 & 刷新按钮
  $("search-btn").onclick = () => loadData($("search-nickname").value.trim());
  $("refresh-btn").onclick = () => {
    $("search-nickname").value = "";
    loadData();
  };

  // 1️⃣2️⃣ 编辑区按钮
  $("save-btn").onclick = saveEdit;
  $("cancel-btn").onclick = () => {
    editArea.style.display = "none";
    currentUsername = null;
  };

  // 1️⃣3️⃣ 初始加载
  loadData();
});
