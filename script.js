/**
 * МУСТАҚИЛЛИК МФЙ ПОРТАЛИ - АСОСИЙ СКРИПТ
 * Барча мантиқий жараёнлар: Соат, Мақолалар юклаш ва Модал ойна
 */

// 1. РАҚАМЛИ СОАТ ФУНКЦИЯСИ
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.innerText = `${hours}:${minutes}:${seconds}`;
    }
}
setInterval(updateClock, 1000);

// 2. АСОСИЙ САҲИФАГА МАҚОЛАЛАРНИ ЮКЛАШ
function loadPosts() {
    const feed = document.getElementById('news-feed');
    if (!feed) return; // Агар бу элемент бўлмаса, функция тўхтайди

    // LocalStorage дан маълумотни оламиз
    const posts = JSON.parse(localStorage.getItem('shared_posts')) || [];

    if (posts.length === 0) {
        feed.innerHTML = `
            <div style="text-align:center; padding:50px; background:white; border-radius:12px; color:#999; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                <i class="fas fa-folder-open fa-3x" style="margin-bottom:15px; color:#ddd;"></i>
                <p>Ҳозирча янгиликлар ва хабарлар мавжуд эмас.</p>
            </div>`;
        return;
    }

    // Мақолаларни вақт бўйича тескари тартибда чиқариш (янгиси тепада)
    feed.innerHTML = posts.map((post, index) => `
        <div class="post-card">
            <img src="${post.image}" class="post-img" alt="Post Image" onerror="this.src='https://via.placeholder.com/300x200?text=Rasm+Mavjud+Emas'">
            <div class="post-info">
                <div>
                    <small style="color: #ff5722; font-weight: bold; display: block; margin-bottom: 5px;">
                        <i class="far fa-calendar-alt"></i> ${post.date}
                    </small>
                    <h2>${post.title}</h2>
                    <p>${post.text.substring(0, 160)}...</p>
                </div>
                <a href="javascript:void(0)" class="read-more" onclick="openPost(${index})">
                    БАТАФСИЛ <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// 3. ТЎЛИҚ МАҚОЛАНИ МОДАЛ ОЙНАДА ОЧИШ
function openPost(index) {
    const posts = JSON.parse(localStorage.getItem('shared_posts')) || [];
    const post = posts[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');

    if (modal && body && post) {
        // Модал ичидаги контент тузилмаси (Скриншотдаги муаммони ҳал қилади)
        body.innerHTML = `
            <img src="${post.image}" class="modal-header-img" onerror="this.src='https://via.placeholder.com/800x400?text=Rasm+Mavjud+Emas'">
            <div class="modal-body-padding">
                <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: #ff5722; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">МФЙ ХАБАРИ</span>
                    <small style="color: #888;"><i class="far fa-calendar-alt"></i> Юкланган сана: ${post.date}</small>
                </div>
                <h1>${post.title}</h1>
                <div style="width: 70px; height: 4px; background: #ff5722; margin: 20px 0 30px 0; border-radius: 2px;"></div>
                <p>${post.text}</p>
            </div>
        `;
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Асосий саҳифанинг айланишини (scroll) тўхтатиш
    }
}

// 4. МОДАЛ ОЙНАНИ ЁПИШ
function closePost() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Саҳифа айланишини тиклаш
    }
}

// 5. САҲИФА ЮКЛАНГАНДА ВА ОЙНАЛАРНИ БОШҚАРИШ
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    loadPosts();
    
    // Модал ойнанинг ташқарисини (қора жойини) босганда ёпилиш
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closePost();
        }
    };
});

// 6. МАЪЛУМОТЛАР БОШҚА САҲИФАДА ЎЗГАРСА (Масалан, етакчи янги пост қўшса)
window.addEventListener('storage', (e) => {
    if (e.key === 'shared_posts') {
        loadPosts();
    }
});