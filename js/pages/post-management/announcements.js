// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalPosts: 25,
    importantPosts: 5,
    totalViews: 3450,
    todayPosts: 2
};

const samplePosts = [
    {
        id: 1,
        category: 'system',
        importance: 'important',
        title: '시스템 점검 안내',
        content: '2024년 1월 20일 새벽 2시부터 4시까지 시스템 점검이 진행됩니다.',
        author: '관리자',
        views: 245,
        pinned: true,
        startDate: '2024-01-15',
        endDate: '2024-01-25',
        createdAt: '2024-01-15 10:30',
        updatedAt: '2024-01-15 10:30'
    },
    {
        id: 2,
        category: 'event',
        importance: 'important',
        title: '신년 행사 안내',
        content: '2024년 신년 행사가 1월 20일에 개최됩니다. 많은 참여 부탁드립니다.',
        author: '행사팀',
        views: 189,
        pinned: true,
        startDate: '2024-01-10',
        endDate: '2024-01-25',
        createdAt: '2024-01-10 09:15',
        updatedAt: '2024-01-10 09:15'
    },
    {
        id: 3,
        category: 'schedule',
        importance: 'normal',
        title: '2월 정기회의 일정 안내',
        content: '2월 정기회의가 2월 5일 오후 2시에 개최됩니다.',
        author: '총무팀',
        views: 156,
        pinned: false,
        startDate: '2024-01-12',
        endDate: '2024-02-05',
        createdAt: '2024-01-12 14:20',
        updatedAt: '2024-01-12 14:20'
    },
    {
        id: 4,
        category: 'general',
        importance: 'normal',
        title: '복지관 운영 시간 변경 안내',
        content: '2024년 2월부터 복지관 운영 시간이 변경됩니다.',
        author: '운영팀',
        views: 98,
        pinned: false,
        startDate: '2024-01-14',
        endDate: '2024-02-01',
        createdAt: '2024-01-14 11:30',
        updatedAt: '2024-01-14 11:30'
    },
    {
        id: 5,
        category: 'general',
        importance: 'normal',
        title: '전화번호 변경 안내',
        content: '복지관 전화번호가 변경되었습니다. 새로운 번호를 확인해주세요.',
        author: '관리자',
        views: 67,
        pinned: false,
        startDate: '2024-01-15',
        endDate: null,
        createdAt: '2024-01-15 15:45',
        updatedAt: '2024-01-15 15:45'
    }
];

let currentPosts = [];
let currentFilter = {
    search: '',
    importance: '',
    category: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 공지사항 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('announcements', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalPosts: result.results[0].total_posts || 0,
                importantPosts: result.results[0].important_posts || 0,
                totalViews: result.results[0].total_views || 0,
                todayPosts: result.results[0].today_posts || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchPosts() {
    if (dev) {
        console.log('[DEV MODE] 공지사항 목록 조회');
        return samplePosts;
    }
    
    try {
        const result = await callAPI('announcements', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return samplePosts;
    } catch (error) {
        console.error('공지사항 조회 중 오류:', error);
        return samplePosts;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-posts').textContent = stats.totalPosts || 0;
    document.getElementById('important-posts').textContent = stats.importantPosts || 0;
    document.getElementById('total-views').textContent = stats.totalViews || 0;
    document.getElementById('today-posts').textContent = stats.todayPosts || 0;
}

// 게시글 목록 표시
function displayPosts(posts) {
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;
    
    if (posts.length === 0) {
        postsList.innerHTML = '<div class="empty-state">등록된 공지사항이 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    // 고정 게시글 먼저 표시
    const pinnedPosts = posts.filter(p => p.pinned).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const normalPosts = posts.filter(p => !p.pinned).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const sortedPosts = [...pinnedPosts, ...normalPosts];
    
    postsList.innerHTML = sortedPosts.map(post => `
        <div class="post-card ${post.pinned ? 'pinned' : ''} ${post.importance === 'important' ? 'important' : ''}" data-id="${post.id}">
            <div class="post-header">
                <div class="post-title-section">
                    ${post.pinned ? '<span class="badge-pinned"><i class="fas fa-thumbtack"></i> 고정</span>' : ''}
                    ${post.importance === 'important' ? '<span class="badge-important"><i class="fas fa-star"></i> 중요</span>' : ''}
                    <span class="badge-category">${getCategoryText(post.category)}</span>
                    <h3 class="post-title">${post.title}</h3>
                </div>
                <div class="post-actions">
                    <button class="btn-icon" onclick="editPost(${post.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deletePost(${post.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="post-body">
                <div class="post-content-preview">${post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</div>
            </div>
            <div class="post-footer">
                <div class="post-info">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-eye"></i> ${post.views}</span>
                    <span><i class="fas fa-calendar"></i> ${post.createdAt}</span>
                    ${post.startDate ? `<span><i class="fas fa-clock"></i> ${post.startDate} ~ ${post.endDate || '무기한'}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${posts.length}개`;
}

// 카테고리 텍스트 변환
function getCategoryText(category) {
    const categoryMap = {
        'general': '일반',
        'event': '행사',
        'schedule': '일정',
        'system': '시스템'
    };
    return categoryMap[category] || category;
}

// 검색
function searchPosts() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterPosts() {
    const importanceFilter = document.getElementById('importance-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    currentFilter.importance = importanceFilter.value;
    currentFilter.category = categoryFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentPosts];
    
    if (currentFilter.search) {
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(currentFilter.search) ||
            post.content.toLowerCase().includes(currentFilter.search)
        );
    }
    
    if (currentFilter.importance) {
        filtered = filtered.filter(post => post.importance === currentFilter.importance);
    }
    
    if (currentFilter.category) {
        filtered = filtered.filter(post => post.category === currentFilter.category);
    }
    
    displayPosts(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('importance-filter').value = '';
    document.getElementById('category-filter').value = '';
    currentFilter = { search: '', importance: '', category: '' };
    displayPosts(currentPosts);
}

// 새로고침
async function refreshPosts() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const posts = await fetchPosts();
        currentPosts = posts;
        displayPosts(posts);
        
        console.log('공지사항 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 게시글 등록
function addPost() {
    document.getElementById('modal-title').textContent = '공지사항 등록';
    document.getElementById('post-form').reset();
    document.getElementById('post-form').setAttribute('data-mode', 'add');
    document.getElementById('post-form').removeAttribute('data-id');
    document.getElementById('post-modal').style.display = 'block';
}

// 게시글 수정
function editPost(id) {
    const post = currentPosts.find(p => p.id === id);
    if (!post) return;
    
    document.getElementById('modal-title').textContent = '공지사항 수정';
    document.getElementById('post-category').value = post.category || 'general';
    document.getElementById('post-importance').value = post.importance || 'normal';
    document.getElementById('post-title').value = post.title || '';
    document.getElementById('post-content').value = post.content || '';
    document.getElementById('post-start-date').value = post.startDate || '';
    document.getElementById('post-end-date').value = post.endDate || '';
    document.getElementById('post-pinned').checked = post.pinned || false;
    
    document.getElementById('post-form').setAttribute('data-mode', 'edit');
    document.getElementById('post-form').setAttribute('data-id', id);
    document.getElementById('post-modal').style.display = 'block';
}

// 게시글 삭제
async function deletePost(id) {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 공지사항 삭제:', id);
            currentPosts = currentPosts.filter(p => p.id !== id);
            displayPosts(currentPosts);
            alert('공지사항이 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('announcements', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshPosts();
            alert('공지사항이 삭제되었습니다.');
        } else {
            alert('공지사항 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('공지사항 삭제 중 오류:', error);
        alert('공지사항 삭제 중 오류가 발생했습니다.');
    }
}

// 게시글 저장
async function savePost() {
    const form = document.getElementById('post-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        category: document.getElementById('post-category').value,
        importance: document.getElementById('post-importance').value,
        title: document.getElementById('post-title').value.trim(),
        content: document.getElementById('post-content').value.trim(),
        startDate: document.getElementById('post-start-date').value || null,
        endDate: document.getElementById('post-end-date').value || null,
        pinned: document.getElementById('post-pinned').checked
    };
    
    if (!data.title || !data.content) {
        alert('제목과 내용은 필수 입력 항목입니다.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 공지사항 저장:', mode, data);
            if (mode === 'add') {
                const newId = Math.max(...currentPosts.map(p => p.id), 0) + 1;
                const newPost = {
                    id: newId,
                    ...data,
                    author: '관리자',
                    views: 0,
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentPosts.push(newPost);
                displayPosts(currentPosts);
            } else {
                const index = currentPosts.findIndex(p => p.id == id);
                if (index !== -1) {
                    currentPosts[index] = {
                        ...currentPosts[index],
                        ...data,
                        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };
                    displayPosts(currentPosts);
                }
            }
            closeModal();
            alert(`공지사항이 ${mode === 'add' ? '등록' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.category,
                '2': data.importance,
                '3': data.title,
                '4': data.content,
                '5': data.startDate || '',
                '6': data.endDate || '',
                '7': data.pinned ? '1' : '0'
            }
            : {
                '1': id,
                '2': data.category,
                '3': data.importance,
                '4': data.title,
                '5': data.content,
                '6': data.startDate || '',
                '7': data.endDate || '',
                '8': data.pinned ? '1' : '0'
            };
        
        const result = await callAPI('announcements', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshPosts();
            alert(`공지사항이 ${mode === 'add' ? '등록' : '수정'}되었습니다.`);
        } else {
            alert(`공지사항 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('공지사항 저장 중 오류:', error);
        alert(`공지사항 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('post-modal').style.display = 'none';
    document.getElementById('post-form').reset();
}

// 전역 함수로 노출
window.searchPosts = searchPosts;
window.resetSearch = resetSearch;
window.filterPosts = filterPosts;
window.addPost = addPost;
window.editPost = editPost;
window.deletePost = deletePost;
window.savePost = savePost;
window.closeModal = closeModal;
window.refreshPosts = refreshPosts;

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPosts();
            }
        });
    }
    
    const modal = document.getElementById('post-modal');
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
        
        const posts = await fetchPosts();
        currentPosts = posts;
        displayPosts(posts);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

