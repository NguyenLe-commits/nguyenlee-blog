// Hiện / ẩn nội dung
function showContent(id) {
    document.querySelectorAll('.content').forEach(el => {
      el.style.display = 'none';
    });
  
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        localStorage.setItem("lastTab", id); // ⭐ nhớ tab
      }
  }
  
  // Đăng bài
  function addPost() {
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
  
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
  
    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ nội dung");
      return;
    }
  
    // Lấy danh sách cũ
    const posts = JSON.parse(localStorage.getItem("diaryPosts")) || [];
  
    // Thêm bài mới
    posts.push({ title, content });
  
    // Lưu lại
    localStorage.setItem("diaryPosts", JSON.stringify(posts));
  
    // Reset form
    titleInput.value = "";
    contentInput.value = "";
  
    // Vẽ lại nhật ký
    renderDiary();
  
    // Chuyển sang trang nhật ký
    showContent("nhatky");
  }
  
  // Vẽ danh sách nhật ký
  function renderDiary() {
    const container = document.getElementById("diary-container");
    if (!container) return;
  
    container.innerHTML = "";
  
    const posts = JSON.parse(localStorage.getItem("diaryPosts")) || [];
  
    posts.forEach((post, index) => {
      const box = document.createElement("div");
      box.className = "diary-box";
      const title = document.createElement("h3");
      title.className = "diary-title";
      title.textContent = post.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.setAttribute("title", "Xóa nhật ký");
      deleteBtn.textContent = "🗑️";

      box.appendChild(title);
      box.appendChild(deleteBtn);

      title.addEventListener("click", () => {
        localStorage.setItem("diaryTitle", post.title);
        localStorage.setItem("diaryContent", post.content);
        window.location.href = "detail.html";
      });
      
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deletePost(index);
      });
  
      container.appendChild(box);
    });
  }
  function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem("diaryPosts")) || [];
  
    if (!confirm("Bạn có chắc muốn xóa bài này không?")) return;
  
    posts.splice(index, 1); // xóa 1 phần tử tại vị trí index
    localStorage.setItem("diaryPosts", JSON.stringify(posts));
  
    renderDiary(); // vẽ lại danh sách
  }
  // Khi load trang

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.content').forEach(el => {
        el.style.display = 'none';
      });
    
      // Render nhật ký
      renderDiary();
      const lastTab = localStorage.getItem("lastTab") || "home";
      showContent(lastTab);
  });

  