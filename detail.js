const title = localStorage.getItem('diaryTitle');
  const content = localStorage.getItem('diaryContent');
  
  document.getElementById('detail-title').textContent = title;
  document.getElementById('detail-content').textContent = content;

  function goBack() {
    window.location.href = "index.html#nhatky";
  }