// === DỮ LIỆU 4 PHIM + ẢNH LOCAL (đặt trong thư mục images/) ===
const movies = [
    {
        id: 1,
        title: "Nhà Bà Nữ",
        poster: "images/nha-ba-nu.jpg",
        year: 2023,
        genre: "Hài, Gia đình",
        country: "Việt Nam",
        actors: "Lê Giang, NSND Ngọc Giàu, Uyển Ân",
        desc: "Bộ phim hài hước xoay quanh cuộc sống của bà Nữ và ba cô con gái với những drama gia đình đầy tiếng cười và nước mắt.",
        episodes: 1,
        type: "Phim lẻ"
    },
    {
        id: 2,
        title: "Người Vợ Cuối Cùng",
        poster: "images/nguoi-vo-cuoi-cung.jpg",
        year: 2023,
        genre: "Tâm lý, Lịch sử",
        country: "Việt Nam",
        actors: "Kaity Nguyễn, Thuận Phát, Quang Tuấn",
        desc: "Lấy bối cảnh Việt Nam thời kỳ phong kiến, phim kể về người vợ bị ép cưới và hành trình tìm lại tự do.",
        episodes: 1,
        type: "Phim lẻ"
    },
    {
        id: 3,
        title: "Happiness (Hạnh Phúc)",
        poster: "images/happiness.jpg",
        year: 2021,
        genre: "Kinh dị, Tâm lý",
        country: "Hàn Quốc",
        actors: "Han Hyo Joo, Park Hyung Sik",
        desc: "Một dịch bệnh lạ bùng phát trong chung cư cao cấp. Ai cũng có bí mật, ai cũng có thể là quái vật.",
        episodes: 12,
        type: "Phim bộ"
    },
    {
        id: 4,
        title: "Mai",
        poster: "images/mai.jpg",
        year: 2024,
        genre: "Tình cảm, Tâm lý",
        country: "Việt Nam",
        actors: "Phương Anh Đào, Tuấn Trần",
        desc: "Cô gái tên Mai có cuộc đời đầy bi kịch, nhưng tình yêu đã giúp cô tìm thấy ánh sáng.",
        episodes: 1,
        type: "Phim lẻ"
    }
];

// === TRANG CHỦ: LOAD SLIDER + GRID ===
function loadHome() {
    const slider = document.getElementById('featuredSlider');
    const grid = document.getElementById('movieGrid');

    // Slider: 3 phim đầu
    movies.slice(0, 3).forEach(movie => {
        const div = document.createElement('div');
        div.className = 'slider-card';
        div.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450/1a1a1a/fff?text=No+Image';">
            <div class="overlay">
                <h3>${movie.title}</h3>
                <p>${movie.year} • ${movie.genre}</p>
            </div>
        `;
        div.onclick = () => window.location.href = `detail.html?id=${movie.id}`;
        slider.appendChild(div);
    });

    // Grid: Tất cả phim
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/200x300/1a1a1a/fff?text=No+Image';">
            <h3>${movie.title}</h3>
        `;
        card.onclick = () => window.location.href = `detail.html?id=${movie.id}`;
        grid.appendChild(card);
    });
}

// === TÌM KIẾM ===
function searchMovies() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    const grid = document.getElementById('movieGrid');
    grid.innerHTML = '';
    filtered.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/200x300/1a1a1a/fff?text=No+Image';">
            <h3>${movie.title}</h3>
        `;
        card.onclick = () => window.location.href = `detail.html?id=${movie.id}`;
        grid.appendChild(card);
    });
}

// === TRANG CHI TIẾT PHIM ===
function loadMovieDetail(id) {
    const movie = movies.find(m => m.id === id);
    if (!movie) return alert("Không tìm thấy phim!");

    document.getElementById('pageTitle').textContent = movie.title;
    const posterImg = document.getElementById('detailPoster');
    posterImg.src = movie.poster;
    posterImg.onerror = () => { posterImg.src = 'https://via.placeholder.com/300x450/1a1a1a/fff?text=No+Image'; };

    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailYear').textContent = movie.year;
    document.getElementById('detailGenre').textContent = movie.genre;
    document.getElementById('detailCountry').textContent = movie.country;
    document.getElementById('detailActors').textContent = movie.actors;
    document.getElementById('detailDesc').textContent = movie.desc;

    const episodeList = document.getElementById('episodeList');
    episodeList.innerHTML = '';
    if (movie.episodes > 1) {
        for (let i = 1; i <= movie.episodes; i++) {
            const btn = document.createElement('button');
            btn.textContent = `Tập ${i}`;
            btn.onclick = () => playEpisode(i);
            episodeList.appendChild(btn);
        }
    } else {
        episodeList.innerHTML = '<p style="color:#aaa;">Phim lẻ - 1 tập</p>';
    }

    // 4 phim gợi ý: 2x2
    const related = movies.filter(m => m.id !== id);
    const relatedGrid = document.getElementById('relatedMovies');
    relatedGrid.innerHTML = '';
    related.forEach(m => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${m.poster}" alt="${m.title}" onerror="this.src='https://via.placeholder.com/200x300/1a1a1a/fff?text=No+Image';">
            <h3>${m.title}</h3>
        `;
        card.onclick = () => location.href = `detail.html?id=${m.id}`;
        relatedGrid.appendChild(card);
    });
}

function playEpisode(ep) {
    const movie = movies.find(m => m.id === parseInt(new URLSearchParams(window.location.search).get('id')));
    alert(`Đang phát: ${movie.title} - Tập ${ep}`);
}

// === TỰ ĐỘNG CHẠY KHI LOAD TRANG ===
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    loadHome();
}