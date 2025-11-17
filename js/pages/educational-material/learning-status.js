// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalLearners: 320,
    activeLearners: 245,
    totalCompleted: 1250,
    avgLearningTime: 45
};

const sampleLearners = [
    {
        id: 1,
        name: '김철수',
        status: 'active',
        totalMaterials: 45,
        completedMaterials: 38,
        completionRate: 84.4,
        totalLearningTime: 1250,
        lastLearningDate: '2024-01-15',
        currentLearning: '건강한 식습관 만들기',
        createdAt: '2023-12-01 10:00'
    },
    {
        id: 2,
        name: '이영희',
        status: 'active',
        totalMaterials: 45,
        completedMaterials: 42,
        completionRate: 93.3,
        totalLearningTime: 1890,
        lastLearningDate: '2024-01-16',
        currentLearning: '스마트폰 활용하기',
        createdAt: '2023-11-15 10:00'
    },
    {
        id: 3,
        name: '박민수',
        status: 'active',
        totalMaterials: 45,
        completedMaterials: 28,
        completionRate: 62.2,
        totalLearningTime: 980,
        lastLearningDate: '2024-01-14',
        currentLearning: '재난 대응 매뉴얼',
        createdAt: '2023-12-10 10:00'
    },
    {
        id: 4,
        name: '최지영',
        status: 'active',
        totalMaterials: 45,
        completedMaterials: 15,
        completionRate: 33.3,
        totalLearningTime: 560,
        lastLearningDate: '2024-01-12',
        currentLearning: '일상생활 절약 팁',
        createdAt: '2024-01-01 10:00'
    },
    {
        id: 5,
        name: '정수진',
        status: 'inactive',
        totalMaterials: 45,
        completedMaterials: 35,
        completionRate: 77.8,
        totalLearningTime: 1560,
        lastLearningDate: '2024-01-05',
        currentLearning: null,
        createdAt: '2023-11-20 10:00'
    },
    {
        id: 6,
        name: '홍길동',
        status: 'active',
        totalMaterials: 45,
        completedMaterials: 45,
        completionRate: 100.0,
        totalLearningTime: 2100,
        lastLearningDate: '2024-01-16',
        currentLearning: '모든 과정 완료',
        createdAt: '2023-10-15 10:00'
    }
];

let currentLearners = [];
let currentFilter = {
    search: '',
    status: '',
    completion: '',
    date: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 학습현황 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('learning-status', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalLearners: result.results[0].total_learners || 0,
                activeLearners: result.results[0].active_learners || 0,
                totalCompleted: result.results[0].total_completed || 0,
                avgLearningTime: result.results[0].avg_learning_time || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchLearners() {
    if (dev) {
        console.log('[DEV MODE] 학습자 목록 조회');
        return sampleLearners;
    }
    
    try {
        const result = await callAPI('learning-status', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleLearners;
    } catch (error) {
        console.error('학습자 조회 중 오류:', error);
        return sampleLearners;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-learners').textContent = stats.totalLearners || 0;
    document.getElementById('active-learners').textContent = stats.activeLearners || 0;
    document.getElementById('total-completed').textContent = stats.totalCompleted || 0;
    document.getElementById('avg-learning-time').textContent = stats.avgLearningTime || 0;
}

// 학습자 목록 표시
function displayLearners(learners) {
    const learnersList = document.getElementById('learners-list');
    if (!learnersList) return;
    
    if (learners.length === 0) {
        learnersList.innerHTML = '<div class="empty-state">등록된 학습자가 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0명';
        return;
    }
    
    // 완료율 높은 순으로 정렬
    const sortedLearners = [...learners].sort((a, b) => b.completionRate - a.completionRate);
    
    learnersList.innerHTML = sortedLearners.map(learner => {
        const completionColor = learner.completionRate >= 80 ? 'success' : 
                                learner.completionRate >= 50 ? 'warning' : 'danger';
        
        return `
        <div class="learner-card ${learner.status === 'active' ? 'active' : 'inactive'}" data-id="${learner.id}">
            <div class="learner-header">
                <div class="learner-info-section">
                    <h3 class="learner-name">${learner.name}</h3>
                    <span class="badge-status ${learner.status === 'active' ? 'active' : 'inactive'}">${learner.status === 'active' ? '활성' : '비활성'}</span>
                </div>
                <div class="learner-actions">
                    <button class="btn-icon" onclick="viewDetail(${learner.id})" title="상세보기">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="learner-body">
                <div class="completion-section">
                    <div class="completion-header">
                        <span class="completion-label">학습 완료율</span>
                        <span class="completion-rate ${completionColor}">${learner.completionRate.toFixed(1)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${completionColor}" style="width: ${learner.completionRate}%"></div>
                    </div>
                    <div class="completion-stats">
                        <span>완료: ${learner.completedMaterials}/${learner.totalMaterials}</span>
                    </div>
                </div>
                <div class="learner-stats">
                    <div class="stat-item">
                        <span class="stat-label">총 학습시간</span>
                        <span class="stat-value">${learner.totalLearningTime}분</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">마지막 학습일</span>
                        <span class="stat-value">${learner.lastLearningDate || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">현재 학습</span>
                        <span class="stat-value">${learner.currentLearning || '-'}</span>
                    </div>
                </div>
            </div>
            <div class="learner-footer">
                <span><i class="fas fa-calendar"></i> 가입일: ${learner.createdAt}</span>
            </div>
        </div>
    `;
    }).join('');
    
    document.getElementById('result-count').textContent = `총 ${learners.length}명`;
}

// 검색
function searchLearners() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterLearners() {
    const statusFilter = document.getElementById('status-filter');
    const completionFilter = document.getElementById('completion-filter');
    const dateFilter = document.getElementById('date-filter');
    
    currentFilter.status = statusFilter.value;
    currentFilter.completion = completionFilter.value;
    currentFilter.date = dateFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentLearners];
    
    if (currentFilter.search) {
        filtered = filtered.filter(learner => 
            learner.name.toLowerCase().includes(currentFilter.search)
        );
    }
    
    if (currentFilter.status) {
        filtered = filtered.filter(learner => learner.status === currentFilter.status);
    }
    
    if (currentFilter.completion) {
        filtered = filtered.filter(learner => {
            const rate = learner.completionRate;
            switch (currentFilter.completion) {
                case 'high':
                    return rate >= 80;
                case 'medium':
                    return rate >= 50 && rate < 80;
                case 'low':
                    return rate < 50;
                default:
                    return true;
            }
        });
    }
    
    if (currentFilter.date) {
        filtered = filtered.filter(learner => {
            if (!learner.lastLearningDate) return false;
            const learnerMonth = learner.lastLearningDate.substring(0, 7);
            return learnerMonth === currentFilter.date;
        });
    }
    
    displayLearners(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('completion-filter').value = '';
    document.getElementById('date-filter').value = '';
    currentFilter = { search: '', status: '', completion: '', date: '' };
    displayLearners(currentLearners);
}

// 새로고침
async function refreshStatus() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const learners = await fetchLearners();
        currentLearners = learners;
        displayLearners(learners);
        
        console.log('학습현황이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 상세 정보 보기
function viewDetail(id) {
    const learner = currentLearners.find(l => l.id === id);
    if (!learner) return;
    
    document.getElementById('detail-title').textContent = `${learner.name}님의 학습 상세 정보`;
    
    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = `
        <div class="detail-section">
            <h4>기본 정보</h4>
            <div class="detail-info">
                <div class="info-row">
                    <span class="info-label">이름:</span>
                    <span class="info-value">${learner.name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">상태:</span>
                    <span class="info-value">${learner.status === 'active' ? '활성' : '비활성'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">가입일:</span>
                    <span class="info-value">${learner.createdAt}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>학습 진행 현황</h4>
            <div class="detail-info">
                <div class="info-row">
                    <span class="info-label">전체 자료:</span>
                    <span class="info-value">${learner.totalMaterials}개</span>
                </div>
                <div class="info-row">
                    <span class="info-label">완료한 자료:</span>
                    <span class="info-value">${learner.completedMaterials}개</span>
                </div>
                <div class="info-row">
                    <span class="info-label">완료율:</span>
                    <span class="info-value">${learner.completionRate.toFixed(1)}%</span>
                </div>
                <div class="info-row">
                    <span class="info-label">총 학습시간:</span>
                    <span class="info-value">${learner.totalLearningTime}분</span>
                </div>
                <div class="info-row">
                    <span class="info-label">마지막 학습일:</span>
                    <span class="info-value">${learner.lastLearningDate || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">현재 학습:</span>
                    <span class="info-value">${learner.currentLearning || '-'}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>학습 통계</h4>
            <div class="detail-info">
                <div class="info-row">
                    <span class="info-label">평균 학습시간:</span>
                    <span class="info-value">${(learner.totalLearningTime / learner.completedMaterials || 0).toFixed(1)}분/자료</span>
                </div>
                <div class="info-row">
                    <span class="info-label">일평균 학습시간:</span>
                    <span class="info-value">${(learner.totalLearningTime / 30 || 0).toFixed(1)}분</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detail-modal').style.display = 'block';
}

// 상세 모달 닫기
function closeDetailModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// 보고서 내보내기
function exportReport() {
    console.log('보고서 내보내기');
    alert('보고서 내보내기 기능은 준비 중입니다.');
}

// 전역 함수로 노출
window.searchLearners = searchLearners;
window.resetSearch = resetSearch;
window.filterLearners = filterLearners;
window.viewDetail = viewDetail;
window.closeDetailModal = closeDetailModal;
window.exportReport = exportReport;
window.refreshStatus = refreshStatus;

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLearners();
            }
        });
    }
    
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDetailModal();
            }
        });
    }
});

// 페이지 초기화
async function initPage() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const learners = await fetchLearners();
        currentLearners = learners;
        displayLearners(learners);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

