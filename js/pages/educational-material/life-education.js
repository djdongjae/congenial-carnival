// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalMaterials: 45,
    totalLearners: 320,
    completedLearners: 185,
    totalViews: 2850
};

const sampleMaterials = [
    {
        id: 1,
        category: 'health',
        level: 'beginner',
        title: '건강한 식습관 가이드',
        description: '올바른 식습관을 통한 건강 관리 방법을 배웁니다.',
        content: '건강한 식습관은 일상생활에서 가장 중요한 요소 중 하나입니다. 균형 잡힌 식단과 규칙적인 식사 시간을 유지하는 방법을 알아봅니다.',
        duration: 30,
        status: 'active',
        views: 245,
        learners: 125,
        completed: 98,
        fileName: 'health_diet_guide.pdf',
        createdAt: '2024-01-10 10:00',
        updatedAt: '2024-01-10 10:00'
    },
    {
        id: 2,
        category: 'safety',
        level: 'beginner',
        title: '재난 대응 매뉴얼',
        description: '각종 재난 상황에 대한 대응 방법을 학습합니다.',
        content: '지진, 화재, 태풍 등 각종 재난 상황에서 안전하게 대피하고 대응하는 방법을 자세히 설명합니다.',
        duration: 45,
        status: 'active',
        views: 189,
        learners: 95,
        completed: 67,
        fileName: 'disaster_manual.pdf',
        createdAt: '2024-01-12 14:00',
        updatedAt: '2024-01-12 14:00'
    },
    {
        id: 3,
        category: 'digital',
        level: 'intermediate',
        title: '스마트폰 활용하기',
        description: '스마트폰의 기본 기능과 유용한 앱 사용법을 배웁니다.',
        content: '스마트폰을 처음 사용하는 분들을 위한 기본 기능부터 카카오톡, 네이버 등 일상에서 자주 사용하는 앱의 사용법을 안내합니다.',
        duration: 60,
        status: 'active',
        views: 156,
        learners: 78,
        completed: 52,
        fileName: 'smartphone_guide.pdf',
        createdAt: '2024-01-14 09:00',
        updatedAt: '2024-01-14 09:00'
    },
    {
        id: 4,
        category: 'finance',
        level: 'intermediate',
        title: '온라인 뱅킹 사용법',
        description: '인터넷뱅킹과 모바일뱅킹을 안전하게 사용하는 방법을 학습합니다.',
        content: '온라인 뱅킹의 기본 사용법부터 보안 주의사항까지 실전에서 바로 활용할 수 있는 내용으로 구성되어 있습니다.',
        duration: 40,
        status: 'active',
        views: 134,
        learners: 67,
        completed: 43,
        fileName: 'online_banking.pdf',
        createdAt: '2024-01-15 11:00',
        updatedAt: '2024-01-15 11:00'
    },
    {
        id: 5,
        category: 'daily',
        level: 'beginner',
        title: '일상생활 절약 팁',
        description: '일상생활에서 실천할 수 있는 절약 방법을 알아봅니다.',
        content: '전기, 가스, 수도 등 각종 생활비를 절약할 수 있는 실용적인 방법들을 제시합니다.',
        duration: 25,
        status: 'active',
        views: 98,
        learners: 54,
        completed: 38,
        fileName: 'saving_tips.pdf',
        createdAt: '2024-01-16 15:00',
        updatedAt: '2024-01-16 15:00'
    }
];

let currentMaterials = [];
let currentFilter = {
    search: '',
    category: '',
    level: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 생활교육 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('life-education', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalMaterials: result.results[0].total_materials || 0,
                totalLearners: result.results[0].total_learners || 0,
                completedLearners: result.results[0].completed_learners || 0,
                totalViews: result.results[0].total_views || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchMaterials() {
    if (dev) {
        console.log('[DEV MODE] 교육 자료 목록 조회');
        return sampleMaterials;
    }
    
    try {
        const result = await callAPI('life-education', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleMaterials;
    } catch (error) {
        console.error('교육 자료 조회 중 오류:', error);
        return sampleMaterials;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-materials').textContent = stats.totalMaterials || 0;
    document.getElementById('total-learners').textContent = stats.totalLearners || 0;
    document.getElementById('completed-learners').textContent = stats.completedLearners || 0;
    document.getElementById('total-views').textContent = stats.totalViews || 0;
}

// 교육 자료 목록 표시
function displayMaterials(materials) {
    const materialsList = document.getElementById('materials-list');
    if (!materialsList) return;
    
    if (materials.length === 0) {
        materialsList.innerHTML = '<div class="empty-state">등록된 교육 자료가 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    materialsList.innerHTML = materials.map(material => `
        <div class="material-card ${material.status === 'active' ? 'active' : 'inactive'}" data-id="${material.id}">
            <div class="material-header">
                <div class="material-title-section">
                    <span class="badge-category">${getCategoryText(material.category)}</span>
                    <span class="badge-level ${material.level}">${getLevelText(material.level)}</span>
                    ${material.status === 'active' ? '<span class="badge-status active">활성</span>' : '<span class="badge-status inactive">비활성</span>'}
                    <h3 class="material-title">${material.title}</h3>
                </div>
                <div class="material-actions">
                    <button class="btn-icon" onclick="viewMaterial(${material.id})" title="보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editMaterial(${material.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteMaterial(${material.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="material-body">
                <p class="material-description">${material.description || ''}</p>
                <div class="material-stats">
                    <div class="stat-item">
                        <span class="stat-label">조회수</span>
                        <span class="stat-value">${material.views || 0}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">학습자</span>
                        <span class="stat-value">${material.learners || 0}명</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">완료</span>
                        <span class="stat-value">${material.completed || 0}명</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">학습시간</span>
                        <span class="stat-value">${material.duration || 0}분</span>
                    </div>
                </div>
                ${material.fileName ? `
                <div class="material-file">
                    <i class="fas fa-file"></i> <span>${material.fileName}</span>
                </div>
                ` : ''}
            </div>
            <div class="material-footer">
                <span><i class="fas fa-calendar"></i> 작성일: ${material.createdAt}</span>
                <span><i class="fas fa-edit"></i> 수정일: ${material.updatedAt}</span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${materials.length}개`;
}

// 카테고리 텍스트 변환
function getCategoryText(category) {
    const categoryMap = {
        'health': '건강',
        'safety': '안전',
        'daily': '일상생활',
        'finance': '금융',
        'digital': '디지털',
        'other': '기타'
    };
    return categoryMap[category] || category;
}

// 난이도 텍스트 변환
function getLevelText(level) {
    const levelMap = {
        'beginner': '초급',
        'intermediate': '중급',
        'advanced': '고급'
    };
    return levelMap[level] || level;
}

// 검색
function searchMaterials() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterMaterials() {
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    
    currentFilter.category = categoryFilter.value;
    currentFilter.level = levelFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentMaterials];
    
    if (currentFilter.search) {
        filtered = filtered.filter(material => 
            material.title.toLowerCase().includes(currentFilter.search) ||
            (material.description && material.description.toLowerCase().includes(currentFilter.search)) ||
            (material.content && material.content.toLowerCase().includes(currentFilter.search))
        );
    }
    
    if (currentFilter.category) {
        filtered = filtered.filter(material => material.category === currentFilter.category);
    }
    
    if (currentFilter.level) {
        filtered = filtered.filter(material => material.level === currentFilter.level);
    }
    
    displayMaterials(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('level-filter').value = '';
    currentFilter = { search: '', category: '', level: '' };
    displayMaterials(currentMaterials);
}

// 새로고침
async function refreshMaterials() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const materials = await fetchMaterials();
        currentMaterials = materials;
        displayMaterials(materials);
        
        console.log('교육 자료 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 교육 자료 등록
function addMaterial() {
    document.getElementById('modal-title').textContent = '교육 자료 등록';
    document.getElementById('material-form').reset();
    document.getElementById('material-form').setAttribute('data-mode', 'add');
    document.getElementById('material-form').removeAttribute('data-id');
    document.getElementById('material-modal').style.display = 'block';
}

// 교육 자료 수정
function editMaterial(id) {
    const material = currentMaterials.find(m => m.id === id);
    if (!material) return;
    
    document.getElementById('modal-title').textContent = '교육 자료 수정';
    document.getElementById('material-category').value = material.category || 'health';
    document.getElementById('material-level').value = material.level || 'beginner';
    document.getElementById('material-title').value = material.title || '';
    document.getElementById('material-description').value = material.description || '';
    document.getElementById('material-content').value = material.content || '';
    document.getElementById('material-duration').value = material.duration || 30;
    document.getElementById('material-status').value = material.status || 'active';
    
    document.getElementById('material-form').setAttribute('data-mode', 'edit');
    document.getElementById('material-form').setAttribute('data-id', id);
    document.getElementById('material-modal').style.display = 'block';
}

// 교육 자료 보기
function viewMaterial(id) {
    const material = currentMaterials.find(m => m.id === id);
    if (!material) return;
    
    alert(`${material.title}\n\n${material.description || ''}\n\n내용:\n${material.content}\n\n학습 시간: ${material.duration}분`);
}

// 교육 자료 삭제
async function deleteMaterial(id) {
    if (!confirm('정말로 이 교육 자료를 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 교육 자료 삭제:', id);
            currentMaterials = currentMaterials.filter(m => m.id !== id);
            displayMaterials(currentMaterials);
            alert('교육 자료가 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('life-education', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshMaterials();
            alert('교육 자료가 삭제되었습니다.');
        } else {
            alert('교육 자료 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('교육 자료 삭제 중 오류:', error);
        alert('교육 자료 삭제 중 오류가 발생했습니다.');
    }
}

// 교육 자료 저장
async function saveMaterial() {
    const form = document.getElementById('material-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        category: document.getElementById('material-category').value,
        level: document.getElementById('material-level').value,
        title: document.getElementById('material-title').value.trim(),
        description: document.getElementById('material-description').value.trim(),
        content: document.getElementById('material-content').value.trim(),
        duration: parseInt(document.getElementById('material-duration').value) || 30,
        status: document.getElementById('material-status').value
    };
    
    if (!data.title || !data.content) {
        alert('제목과 내용은 필수 입력 항목입니다.');
        return;
    }
    
    const fileInput = document.getElementById('material-file');
    let fileName = '';
    if (fileInput && fileInput.files.length > 0) {
        fileName = fileInput.files[0].name;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 교육 자료 저장:', mode, data);
            if (mode === 'add') {
                const newId = Math.max(...currentMaterials.map(m => m.id), 0) + 1;
                const newMaterial = {
                    id: newId,
                    ...data,
                    views: 0,
                    learners: 0,
                    completed: 0,
                    fileName: fileName || null,
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentMaterials.push(newMaterial);
                displayMaterials(currentMaterials);
            } else {
                const index = currentMaterials.findIndex(m => m.id == id);
                if (index !== -1) {
                    currentMaterials[index] = {
                        ...currentMaterials[index],
                        ...data,
                        fileName: fileName || currentMaterials[index].fileName,
                        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };
                    displayMaterials(currentMaterials);
                }
            }
            closeModal();
            alert(`교육 자료가 ${mode === 'add' ? '등록' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.category,
                '2': data.level,
                '3': data.title,
                '4': data.description,
                '5': data.content,
                '6': data.duration.toString(),
                '7': data.status,
                '8': fileName
            }
            : {
                '1': id,
                '2': data.category,
                '3': data.level,
                '4': data.title,
                '5': data.description,
                '6': data.content,
                '7': data.duration.toString(),
                '8': data.status,
                '9': fileName
            };
        
        const result = await callAPI('life-education', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshMaterials();
            alert(`교육 자료가 ${mode === 'add' ? '등록' : '수정'}되었습니다.`);
        } else {
            alert(`교육 자료 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('교육 자료 저장 중 오류:', error);
        alert(`교육 자료 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 파일 업로드
function uploadMaterial() {
    addMaterial();
}

// 모달 닫기
function closeModal() {
    document.getElementById('material-modal').style.display = 'none';
    document.getElementById('material-form').reset();
}

// 전역 함수로 노출
window.searchMaterials = searchMaterials;
window.resetSearch = resetSearch;
window.filterMaterials = filterMaterials;
window.addMaterial = addMaterial;
window.editMaterial = editMaterial;
window.viewMaterial = viewMaterial;
window.deleteMaterial = deleteMaterial;
window.saveMaterial = saveMaterial;
window.uploadMaterial = uploadMaterial;
window.closeModal = closeModal;
window.refreshMaterials = refreshMaterials;

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchMaterials();
            }
        });
    }
    
    const modal = document.getElementById('material-modal');
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
        
        const materials = await fetchMaterials();
        currentMaterials = materials;
        displayMaterials(materials);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

