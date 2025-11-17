// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalNotices: 48,
    readNotices: 32,
    todayNotices: 3,
    targetCount: 125
};

const sampleNotices = [
    {
        id: 1,
        title: '정기 건강검진 안내',
        content: '2024년 1월 건강검진 일정을 안내드립니다. 일정에 맞춰 참여 부탁드립니다.',
        author: '보건팀',
        target: 'all',
        status: 'sent',
        urgent: false,
        readCount: 85,
        totalCount: 125,
        createdAt: '2024-01-15 10:30',
        sentAt: '2024-01-15 10:35'
    },
    {
        id: 2,
        title: '식단 변경 안내',
        content: '다음 주부터 점심 식단이 변경됩니다. 참고 부탁드립니다.',
        author: '영양팀',
        target: 'all',
        status: 'sent',
        urgent: false,
        readCount: 67,
        totalCount: 125,
        createdAt: '2024-01-14 14:20',
        sentAt: '2024-01-14 14:25'
    },
    {
        id: 3,
        title: '급] 복지관 휴관 안내',
        content: '내일(1월 16일) 복지관이 휴관입니다. 이용에 참고 부탁드립니다.',
        author: '관리자',
        target: 'all',
        status: 'sent',
        urgent: true,
        readCount: 98,
        totalCount: 125,
        createdAt: '2024-01-15 09:00',
        sentAt: '2024-01-15 09:05'
    },
    {
        id: 4,
        title: '행사 참여 안내',
        content: '다음 주 주말에 복지관 행사가 개최됩니다. 많은 참여 부탁드립니다.',
        author: '행사팀',
        target: 'all',
        status: 'draft',
        urgent: false,
        readCount: 0,
        totalCount: 0,
        createdAt: '2024-01-15 11:30',
        sentAt: null
    }
];

let currentNotices = [];
let currentFilter = {
    search: '',
    status: '',
    read: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 알림장 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('notice-board', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalNotices: result.results[0].total_notices || 0,
                readNotices: result.results[0].read_notices || 0,
                todayNotices: result.results[0].today_notices || 0,
                targetCount: result.results[0].target_count || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchNotices() {
    if (dev) {
        console.log('[DEV MODE] 알림장 목록 조회');
        return sampleNotices;
    }
    
    try {
        const result = await callAPI('notice-board', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleNotices;
    } catch (error) {
        console.error('알림장 조회 중 오류:', error);
        return sampleNotices;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-notices').textContent = stats.totalNotices || 0;
    document.getElementById('read-notices').textContent = stats.readNotices || 0;
    document.getElementById('today-notices').textContent = stats.todayNotices || 0;
    document.getElementById('target-count').textContent = stats.targetCount || 0;
}

// 알림장 목록 표시
function displayNotices(notices) {
    const noticesList = document.getElementById('notices-list');
    if (!noticesList) return;
    
    if (notices.length === 0) {
        noticesList.innerHTML = '<div class="empty-state">등록된 알림장이 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    // 발송완료 먼저, 그 다음 임시저장
    const sentNotices = notices.filter(n => n.status === 'sent').sort((a, b) => new Date(b.sentAt || b.createdAt) - new Date(a.sentAt || a.createdAt));
    const draftNotices = notices.filter(n => n.status === 'draft').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const sortedNotices = [...sentNotices, ...draftNotices];
    
    noticesList.innerHTML = sortedNotices.map(notice => `
        <div class="notice-card ${notice.status === 'sent' ? 'sent' : 'draft'} ${notice.urgent ? 'urgent' : ''}" data-id="${notice.id}">
            <div class="notice-header">
                <div class="notice-title-section">
                    ${notice.urgent ? '<span class="badge-urgent"><i class="fas fa-exclamation-triangle"></i> 긴급</span>' : ''}
                    ${notice.status === 'sent' ? '<span class="badge-sent"><i class="fas fa-paper-plane"></i> 발송완료</span>' : '<span class="badge-draft"><i class="fas fa-save"></i> 임시저장</span>'}
                    <h3 class="notice-title">${notice.title}</h3>
                </div>
                <div class="notice-actions">
                    <button class="btn-icon" onclick="editNotice(${notice.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteNotice(${notice.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="notice-body">
                <div class="notice-content-preview">${notice.content.length > 150 ? notice.content.substring(0, 150) + '...' : notice.content}</div>
            </div>
            <div class="notice-footer">
                <div class="notice-info">
                    <span><i class="fas fa-user"></i> ${notice.author}</span>
                    <span><i class="fas fa-users"></i> ${notice.target === 'all' ? '전체 대상자' : '개별 선택'}</span>
                    ${notice.status === 'sent' ? `<span><i class="fas fa-eye"></i> 읽음: ${notice.readCount}/${notice.totalCount}</span>` : ''}
                    <span><i class="fas fa-calendar"></i> ${notice.createdAt}</span>
                    ${notice.sentAt ? `<span><i class="fas fa-paper-plane"></i> 발송: ${notice.sentAt}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${notices.length}개`;
}

// 검색
function searchNotices() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterNotices() {
    const statusFilter = document.getElementById('status-filter');
    const readFilter = document.getElementById('read-filter');
    
    currentFilter.status = statusFilter.value;
    currentFilter.read = readFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentNotices];
    
    if (currentFilter.search) {
        filtered = filtered.filter(notice => 
            notice.title.toLowerCase().includes(currentFilter.search) ||
            notice.content.toLowerCase().includes(currentFilter.search)
        );
    }
    
    if (currentFilter.status) {
        filtered = filtered.filter(notice => notice.status === currentFilter.status);
    }
    
    if (currentFilter.read) {
        filtered = filtered.filter(notice => {
            if (currentFilter.read === 'read') {
                return notice.status === 'sent' && notice.readCount > 0;
            } else if (currentFilter.read === 'unread') {
                return notice.status === 'sent' && notice.readCount === 0;
            }
            return true;
        });
    }
    
    displayNotices(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('read-filter').value = '';
    currentFilter = { search: '', status: '', read: '' };
    displayNotices(currentNotices);
}

// 새로고침
async function refreshNotices() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const notices = await fetchNotices();
        currentNotices = notices;
        displayNotices(notices);
        
        console.log('알림장 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 알림장 작성
function addNotice() {
    document.getElementById('modal-title').textContent = '알림장 작성';
    document.getElementById('notice-form').reset();
    document.getElementById('notice-date').value = new Date().toISOString().slice(0, 16);
    document.getElementById('notice-form').setAttribute('data-mode', 'add');
    document.getElementById('notice-form').removeAttribute('data-id');
    document.getElementById('notice-modal').style.display = 'block';
}

// 알림장 수정
function editNotice(id) {
    const notice = currentNotices.find(n => n.id === id);
    if (!notice) return;
    
    document.getElementById('modal-title').textContent = '알림장 수정';
    document.getElementById('notice-target').value = notice.target === 'all' ? ['all'] : ['individual'];
    document.getElementById('notice-title').value = notice.title || '';
    document.getElementById('notice-content').value = notice.content || '';
    document.getElementById('notice-author').value = notice.author || '관리자';
    document.getElementById('notice-date').value = notice.createdAt.replace(' ', 'T').substring(0, 16) || new Date().toISOString().slice(0, 16);
    document.getElementById('notice-urgent').checked = notice.urgent || false;
    document.getElementById('notice-status').value = notice.status || 'draft';
    
    document.getElementById('notice-form').setAttribute('data-mode', 'edit');
    document.getElementById('notice-form').setAttribute('data-id', id);
    document.getElementById('notice-modal').style.display = 'block';
}

// 알림장 삭제
async function deleteNotice(id) {
    if (!confirm('정말로 이 알림장을 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 알림장 삭제:', id);
            currentNotices = currentNotices.filter(n => n.id !== id);
            displayNotices(currentNotices);
            alert('알림장이 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('notice-board', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshNotices();
            alert('알림장이 삭제되었습니다.');
        } else {
            alert('알림장 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('알림장 삭제 중 오류:', error);
        alert('알림장 삭제 중 오류가 발생했습니다.');
    }
}

// 알림장 저장
async function saveNotice(isDraft = false) {
    const form = document.getElementById('notice-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        target: Array.from(document.getElementById('notice-target').selectedOptions).map(o => o.value).join(','),
        title: document.getElementById('notice-title').value.trim(),
        content: document.getElementById('notice-content').value.trim(),
        author: document.getElementById('notice-author').value.trim(),
        date: document.getElementById('notice-date').value,
        urgent: document.getElementById('notice-urgent').checked,
        status: isDraft ? 'draft' : 'sent'
    };
    
    if (!data.title || !data.content) {
        alert('제목과 내용은 필수 입력 항목입니다.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 알림장 저장:', mode, isDraft, data);
            if (mode === 'add') {
                const newId = Math.max(...currentNotices.map(n => n.id), 0) + 1;
                const newNotice = {
                    id: newId,
                    ...data,
                    readCount: isDraft ? 0 : 0,
                    totalCount: isDraft ? 0 : 125,
                    createdAt: data.date.replace('T', ' ').substring(0, 16) || new Date().toISOString().replace('T', ' ').substring(0, 16),
                    sentAt: isDraft ? null : new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentNotices.push(newNotice);
                displayNotices(currentNotices);
            } else {
                const index = currentNotices.findIndex(n => n.id == id);
                if (index !== -1) {
                    currentNotices[index] = {
                        ...currentNotices[index],
                        ...data,
                        sentAt: isDraft ? currentNotices[index].sentAt : (currentNotices[index].sentAt || new Date().toISOString().replace('T', ' ').substring(0, 16))
                    };
                    displayNotices(currentNotices);
                }
            }
            closeModal();
            alert(`알림장이 ${isDraft ? '임시저장' : '발송'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.target,
                '2': data.title,
                '3': data.content,
                '4': data.author,
                '5': data.date,
                '6': data.urgent ? '1' : '0',
                '7': data.status
            }
            : {
                '1': id,
                '2': data.target,
                '3': data.title,
                '4': data.content,
                '5': data.author,
                '6': data.date,
                '7': data.urgent ? '1' : '0',
                '8': data.status
            };
        
        const result = await callAPI('notice-board', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshNotices();
            alert(`알림장이 ${isDraft ? '임시저장' : '발송'}되었습니다.`);
        } else {
            alert(`알림장 ${isDraft ? '임시저장' : '발송'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('알림장 저장 중 오류:', error);
        alert(`알림장 ${isDraft ? '임시저장' : '발송'} 중 오류가 발생했습니다.`);
    }
}

// 임시저장
function saveDraft() {
    saveNotice(true);
}

// 모달 닫기
function closeModal() {
    document.getElementById('notice-modal').style.display = 'none';
    document.getElementById('notice-form').reset();
}

// 전역 함수로 노출
window.searchNotices = searchNotices;
window.resetSearch = resetSearch;
window.filterNotices = filterNotices;
window.addNotice = addNotice;
window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.saveNotice = saveNotice;
window.saveDraft = saveDraft;
window.closeModal = closeModal;
window.refreshNotices = refreshNotices;

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNotices();
            }
        });
    }
    
    const modal = document.getElementById('notice-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // 작성일 자동 설정
    const noticeDate = document.getElementById('notice-date');
    if (noticeDate && !noticeDate.value) {
        noticeDate.value = new Date().toISOString().slice(0, 16);
    }
});

// 페이지 초기화
async function initPage() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const notices = await fetchNotices();
        currentNotices = notices;
        displayNotices(notices);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

