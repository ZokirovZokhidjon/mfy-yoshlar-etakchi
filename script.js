// 1. Соат функцияси
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toLocaleTimeString();
    }
}
setInterval(updateClock, 1000);

// 2. Мақолаларни Асосий саҳифага чиқариш
function loadPosts() {
    const feed = document.getElementById('news-feed');
    if (!feed) return; // Агар бу элемент бўлмаса (бошқа саҳифада бўлсак), тўхтатиш

    const posts = JSON.parse(localStorage.getItem('shared_posts')) || [];

    if (posts.length === 0) {
        feed.innerHTML = "<p style='text-align:center; color:#999; padding: 20px;'>Ҳозирча хабарлар мавжуд эмас.</p>";
        return;
    }

    feed.innerHTML = posts.map((post, index) => `
        <div class="post-card">
            <img src="${post.image}" class="post-img" onerror="this.src='https://via.placeholder.com/300x200?text=Rasm+Yoq'">
            <div class="post-info">
                <div class="news-date"><i class="far fa-calendar-alt"></i> ${post.date}</div>
                <h2>${post.title}</h2>
                <p>${post.text.substring(0, 150)}...</p> 
                <a href="javascript:void(0)" class="read-more" onclick="openPost(${index})">БАТАФСИЛ <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// 3. Тўлиқ хабарни Модал ойнада очиш
function openPost(index) {
    const posts = JSON.parse(localStorage.getItem('shared_posts'));
    const post = posts[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');

    if (modal && body) {
        body.innerHTML = `
            <img src="${post.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
            <small style="color:#888;">${post.date}</small>
            <h1 style="color:#1b2e4b; margin-top:10px;">${post.title}</h1>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size:18px; line-height:1.8; color:#333; white-space: pre-line;">${post.text}</p>
        `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Орқа фонд айланмайдиган бўлади
    }
}

// 4. Модални ёпиш
function closePost() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 5. Саҳифа юкланганда ишга тушадиган функциялар
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    loadPosts();

    // Экраннинг исталган жойини босганда модални ёпиш
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closePost();
        }
    }
});

// 6. Маълумот ўзгарганда автоматик янгиланиш
window.addEventListener('storage', loadPosts);