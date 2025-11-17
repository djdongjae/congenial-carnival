// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalVideos: 28,
    todayVideo: 1,
    totalViews: 3450,
    totalDuration: 420
};

const sampleVideos = [
    {
        id: 1,
        category: 'health',
        title: '건강한 아침 운동법',
        description: '매일 아침 실천할 수 있는 간단한 운동법을 소개합니다.',
        url: 'https://youtube.com/watch?v=example1',
        thumbnail: 'https://via.placeholder.com/320x180?text=건강한+아침+운동법',
        date: new Date().toISOString().split('T')[0],
        duration: 15,
        status: 'active',
        isToday: true,
        views: 245,
        createdAt: new Date().toISOString().split('T')[0] + ' 09:00',
        updatedAt: new Date().toISOString().split('T')[0] + ' 09:00'
    },
    {
        id: 2,
        category: 'education',
        title: '스마트폰 기본 사용법',
        description: '스마트폰을 처음 사용하는 분들을 위한 기본 가이드입니다.',
        url: 'https://youtube.com/watch?v=example2',
        thumbnail: 'https://via.placeholder.com/320x180?text=스마트폰+기본+사용법',
        date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
        duration: 20,
        status: 'active',
        isToday: false,
        views: 189,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] + ' 09:00',
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] + ' 09:00'
    },
    {
        id: 3,
        category: 'entertainment',
        title: '즐거운 노래 모음',
        description: '추억의 노래들을 모아봤습니다.',
        url: 'https://youtube.com/watch?v=example3',
        thumbnail: 'https://via.placeholder.com/320x180?text=즐거운+노래+모음',
        date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
        duration: 30,
        status: 'active',
        isToday: false,
        views: 156,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0] + ' 09:00',
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0] + ' 09:00'
    },
    {
        id: 4,
        category: 'news',
        title: '오늘의 뉴스 요약',
        description: '오늘 하루 주요 뉴스를 요약해드립니다.',
        url: 'https://youtube.com/watch?v=example4',
        thumbnail: 'https://via.placeholder.com/320x180?text=오늘의+뉴스+요약',
        date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
        duration: 10,
        status: 'active',
        isToday: false,
        views: 134,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0] + ' 09:00',
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0] + ' 09:00'
    },
    {
        id: 5,
        category: 'education',
        title: '건강한 식습관 만들기',
        description: '일상에서 실천할 수 있는 건강한 식습관에 대해 알아봅니다.',
        url: 'https://youtube.com/watch?v=example5',
        thumbnail: 'https://via.placeholder.com/320x180?text=건강한+식습관',
        date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0],
        duration: 25,
        status: 'active',
        isToday: false,
        views: 98,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0] + ' 09:00',
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0] + ' 09:00'
    }
];

let currentVideos = [];
let currentFilter = {
    search: '',
    date: '',
    category: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 오늘영상 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('todays-video', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalVideos: result.results[0].total_videos || 0,
                todayVideo: result.results[0].today_video || 0,
                totalViews: result.results[0].total_views || 0,
                totalDuration: result.results[0].total_duration || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchVideos() {
    if (dev) {
        console.log('[DEV MODE] 영상 목록 조회');
        return sampleVideos;
    }
    
    try {
        const result = await callAPI('todays-video', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleVideos;
    } catch (error) {
        console.error('영상 조회 중 오류:', error);
        return sampleVideos;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-videos').textContent = stats.totalVideos || 0;
    document.getElementById('today-video').textContent = stats.todayVideo || 0;
    document.getElementById('total-views').textContent = stats.totalViews || 0;
    document.getElementById('total-duration').textContent = stats.totalDuration || 0;
}

// 영상 목록 표시
function displayVideos(videos) {
    const videosGrid = document.getElementById('videos-grid');
    if (!videosGrid) return;
    
    if (videos.length === 0) {
        videosGrid.innerHTML = '<div class="empty-state">등록된 영상이 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    // 오늘의 영상 먼저, 그 다음 날짜순 정렬
    const todayVideos = videos.filter(v => v.isToday);
    const otherVideos = videos.filter(v => !v.isToday).sort((a, b) => new Date(b.date) - new Date(a.date));
    const sortedVideos = [...todayVideos, ...otherVideos];
    
    videosGrid.innerHTML = sortedVideos.map(video => `
        <div class="video-card ${video.isToday ? 'today-video' : ''} ${video.status === 'active' ? 'active' : 'inactive'}" data-id="${video.id}">
            ${video.isToday ? '<div class="today-badge"><i class="fas fa-star"></i> 오늘의 영상</div>' : ''}
            <div class="video-thumbnail">
                <img src="${video.thumbnail || 'https://via.placeholder.com/320x180?text=No+Image'}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/320x180?text=No+Image'" />
                <div class="video-overlay">
                    <button class="btn-play" onclick="playVideo('${video.url}')" title="재생">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="video-duration">
                    <i class="fas fa-clock"></i> ${video.duration || 0}분
                </div>
            </div>
            <div class="video-info">
                <div class="video-header">
                    <span class="badge-category">${getCategoryText(video.category)}</span>
                    ${video.status === 'active' ? '<span class="badge-status active">활성</span>' : '<span class="badge-status inactive">비활성</span>'}
                </div>
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description || ''}</p>
                <div class="video-meta">
                    <span><i class="fas fa-calendar"></i> ${video.date}</span>
                    <span><i class="fas fa-eye"></i> ${video.views || 0}</span>
                </div>
                <div class="video-actions">
                    <button class="btn-icon" onclick="editVideo(${video.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteVideo(${video.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${videos.length}개`;
}

// 카테고리 텍스트 변환
function getCategoryText(category) {
    const categoryMap = {
        'health': '건강',
        'education': '교육',
        'entertainment': '오락',
        'news': '뉴스',
        'other': '기타'
    };
    return categoryMap[category] || category;
}

// 검색
function searchVideos() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterVideos() {
    const dateFilter = document.getElementById('date-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    currentFilter.date = dateFilter.value;
    currentFilter.category = categoryFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentVideos];
    
    if (currentFilter.search) {
        filtered = filtered.filter(video => 
            video.title.toLowerCase().includes(currentFilter.search) ||
            (video.description && video.description.toLowerCase().includes(currentFilter.search))
        );
    }
    
    if (currentFilter.date) {
        filtered = filtered.filter(video => video.date === currentFilter.date);
    }
    
    if (currentFilter.category) {
        filtered = filtered.filter(video => video.category === currentFilter.category);
    }
    
    displayVideos(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('date-filter').value = '';
    document.getElementById('category-filter').value = '';
    currentFilter = { search: '', date: '', category: '' };
    displayVideos(currentVideos);
}

// 새로고침
async function refreshVideos() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const videos = await fetchVideos();
        currentVideos = videos;
        displayVideos(videos);
        
        console.log('영상 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 영상 등록
function addVideo() {
    document.getElementById('modal-title').textContent = '영상 등록';
    document.getElementById('video-form').reset();
    document.getElementById('video-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('video-form').setAttribute('data-mode', 'add');
    document.getElementById('video-form').removeAttribute('data-id');
    document.getElementById('video-modal').style.display = 'block';
}

// 영상 수정
function editVideo(id) {
    const video = currentVideos.find(v => v.id === id);
    if (!video) return;
    
    document.getElementById('modal-title').textContent = '영상 수정';
    document.getElementById('video-category').value = video.category || 'health';
    document.getElementById('video-date').value = video.date || '';
    document.getElementById('video-title').value = video.title || '';
    document.getElementById('video-description').value = video.description || '';
    document.getElementById('video-url').value = video.url || '';
    document.getElementById('video-duration').value = video.duration || 10;
    document.getElementById('video-thumbnail').value = video.thumbnail || '';
    document.getElementById('video-status').value = video.status || 'active';
    document.getElementById('video-today').checked = video.isToday || false;
    
    document.getElementById('video-form').setAttribute('data-mode', 'edit');
    document.getElementById('video-form').setAttribute('data-id', id);
    document.getElementById('video-modal').style.display = 'block';
}

// 모달 닫기
function closeModal() {
    document.getElementById('video-modal').style.display = 'none';
    document.getElementById('video-form').reset();
}

// 영상 재생
function playVideo(url) {
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('영상 URL이 설정되지 않았습니다.');
    }
}

// 오늘의 영상 설정
function setTodayVideo() {
    if (currentVideos.length === 0) {
        alert('설정할 영상이 없습니다. 먼저 영상을 등록해주세요.');
        return;
    }
    
    // 최근 영상 중 하나를 선택
    const latestVideo = currentVideos.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    editVideo(latestVideo.id);
    document.getElementById('video-today').checked = true;
}

// 영상 삭제
async function deleteVideo(id) {
    if (!confirm('정말로 이 영상을 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 영상 삭제:', id);
            currentVideos = currentVideos.filter(v => v.id !== id);
            displayVideos(currentVideos);
            alert('영상이 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('todays-video', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshVideos();
            alert('영상이 삭제되었습니다.');
        } else {
            alert('영상 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('영상 삭제 중 오류:', error);
        alert('영상 삭제 중 오류가 발생했습니다.');
    }
}

// 영상 저장
async function saveVideo() {
    const form = document.getElementById('video-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        category: document.getElementById('video-category').value,
        date: document.getElementById('video-date').value,
        title: document.getElementById('video-title').value.trim(),
        description: document.getElementById('video-description').value.trim(),
        url: document.getElementById('video-url').value.trim(),
        duration: parseInt(document.getElementById('video-duration').value) || 10,
        thumbnail: document.getElementById('video-thumbnail').value.trim(),
        status: document.getElementById('video-status').value,
        isToday: document.getElementById('video-today').checked
    };
    
    if (!data.title || !data.url) {
        alert('제목과 영상 URL은 필수 입력 항목입니다.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 영상 저장:', mode, data);
            
            // 오늘의 영상이 체크되어 있으면 다른 영상들의 오늘의 영상 플래그 해제
            if (data.isToday) {
                currentVideos.forEach(v => {
                    if (v.id !== (id ? parseInt(id) : -1)) {
                        v.isToday = false;
                    }
                });
            }
            
            if (mode === 'add') {
                const newId = Math.max(...currentVideos.map(v => v.id), 0) + 1;
                const newVideo = {
                    id: newId,
                    ...data,
                    views: 0,
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentVideos.push(newVideo);
                displayVideos(currentVideos);
            } else {
                const index = currentVideos.findIndex(v => v.id == id);
                if (index !== -1) {
                    currentVideos[index] = {
                        ...currentVideos[index],
                        ...data,
                        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };
                    displayVideos(currentVideos);
                }
            }
            closeModal();
            alert(`영상이 ${mode === 'add' ? '등록' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.category,
                '2': data.date,
                '3': data.title,
                '4': data.description,
                '5': data.url,
                '6': data.duration.toString(),
                '7': data.thumbnail,
                '8': data.status,
                '9': data.isToday ? '1' : '0'
            }
            : {
                '1': id,
                '2': data.category,
                '3': data.date,
                '4': data.title,
                '5': data.description,
                '6': data.url,
                '7': data.duration.toString(),
                '8': data.thumbnail,
                '9': data.status,
                '10': data.isToday ? '1' : '0'
            };
        
        const result = await callAPI('todays-video', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshVideos();
            alert(`영상이 ${mode === 'add' ? '등록' : '수정'}되었습니다.`);
        } else {
            alert(`영상 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('영상 저장 중 오류:', error);
        alert(`영상 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 전역 함수로 노출
window.searchVideos = searchVideos;
window.resetSearch = resetSearch;
window.filterVideos = filterVideos;
window.addVideo = addVideo;
window.editVideo = editVideo;
window.deleteVideo = deleteVideo;
window.saveVideo = saveVideo;
window.playVideo = playVideo;
window.setTodayVideo = setTodayVideo;
window.closeModal = closeModal;
window.refreshVideos = refreshVideos;

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchVideos();
            }
        });
    }
    
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// 페이지 초기화
async function initPage() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const videos = await fetchVideos();
        currentVideos = videos;
        displayVideos(videos);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

