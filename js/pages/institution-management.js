// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleStats = {
    totalInstitutions: 15,
    activeInstitutions: 12,
    totalEmployees: 342,
    totalBeneficiaries: 1250
};

const sampleInstitutions = [
    {
        id: 1,
        name: '서울시 복지센터',
        code: 'SEOUL-001',
        address: '서울시 강남구 테헤란로 123',
        phone: '02-1234-5678',
        fax: '02-1234-5679',
        manager: '김철수',
        managerPhone: '010-1234-5678',
        status: 'active',
        region: 'seoul',
        employees: 45,
        beneficiaries: 320,
        createdAt: '2023-01-15',
        updatedAt: '2024-01-10'
    },
    {
        id: 2,
        name: '부산시 생활지원센터',
        code: 'BUSAN-001',
        address: '부산시 해운대구 해운대해변로 456',
        phone: '051-2345-6789',
        fax: '051-2345-6790',
        manager: '이영희',
        managerPhone: '010-2345-6789',
        status: 'active',
        region: 'busan',
        employees: 32,
        beneficiaries: 280,
        createdAt: '2023-02-20',
        updatedAt: '2024-01-08'
    },
    {
        id: 3,
        name: '인천시 돌봄센터',
        code: 'INCHEON-001',
        address: '인천시 남동구 인주대로 789',
        phone: '032-3456-7890',
        fax: '032-3456-7891',
        manager: '박민수',
        managerPhone: '010-3456-7890',
        status: 'active',
        region: 'incheon',
        employees: 28,
        beneficiaries: 195,
        createdAt: '2023-03-10',
        updatedAt: '2024-01-05'
    },
    {
        id: 4,
        name: '경기도 복지재단',
        code: 'GYEONGGI-001',
        address: '경기도 성남시 분당구 정자일로 321',
        phone: '031-4567-8901',
        fax: '031-4567-8902',
        manager: '최지영',
        managerPhone: '010-4567-8901',
        status: 'pending',
        region: 'gyeonggi',
        employees: 0,
        beneficiaries: 0,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 5,
        name: '대전시 사회복지관',
        code: 'DAEJEON-001',
        address: '대전시 유성구 대학로 654',
        phone: '042-5678-9012',
        fax: '042-5678-9013',
        manager: '정수진',
        managerPhone: '010-5678-9012',
        status: 'active',
        region: 'other',
        employees: 35,
        beneficiaries: 240,
        createdAt: '2023-04-15',
        updatedAt: '2023-12-20'
    }
];

const sampleActivities = [
    {
        icon: 'fa-building',
        title: '기관 등록',
        description: '경기도 복지재단이 새로 등록되었습니다',
        time: '2024-01-15 10:30'
    },
    {
        icon: 'fa-edit',
        title: '기관 정보 수정',
        description: '서울시 복지센터 정보가 업데이트되었습니다',
        time: '2024-01-15 09:15'
    },
    {
        icon: 'fa-user-plus',
        title: '직원 추가',
        description: '부산시 생활지원센터에 직원이 추가되었습니다',
        time: '2024-01-14 16:45'
    },
    {
        icon: 'fa-toggle-on',
        title: '기관 상태 변경',
        description: '인천시 돌봄센터가 활성 상태로 변경되었습니다',
        time: '2024-01-14 14:20'
    },
    {
        icon: 'fa-users',
        title: '대상자 추가',
        description: '대전시 사회복지관에 대상자가 추가되었습니다',
        time: '2024-01-14 11:30'
    }
];

// 현재 상태 변수
let currentInstitutions = [];
let currentFilter = {
    search: '',
    status: '',
    region: ''
};

// API 호출 함수 (개발 모드에서는 샘플 데이터 반환)
async function fetchInstitutionStats() {
    if (dev) {
        console.log('[DEV MODE] 기관 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('institution-management', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalInstitutions: result.results[0].total_institutions || 0,
                activeInstitutions: result.results[0].active_institutions || 0,
                totalEmployees: result.results[0].total_employees || 0,
                totalBeneficiaries: result.results[0].total_beneficiaries || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchInstitutions() {
    if (dev) {
        console.log('[DEV MODE] 기관 목록 조회');
        return sampleInstitutions;
    }
    
    try {
        const result = await callAPI('institution-management', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleInstitutions;
    } catch (error) {
        console.error('기관 목록 조회 중 오류:', error);
        return sampleInstitutions;
    }
}

async function fetchRecentActivities() {
    if (dev) {
        console.log('[DEV MODE] 최근 활동 조회');
        return sampleActivities;
    }
    
    try {
        const result = await callAPI('institution-management', 'Q030', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || sampleActivities;
        }
        return sampleActivities;
    } catch (error) {
        console.error('활동 조회 중 오류:', error);
        return sampleActivities;
    }
}

// 통계 데이터 표시
function displayStats(stats) {
    document.getElementById('total-institutions').textContent = stats.totalInstitutions || 0;
    document.getElementById('active-institutions').textContent = stats.activeInstitutions || 0;
    document.getElementById('total-employees').textContent = stats.totalEmployees || 0;
    document.getElementById('total-beneficiaries').textContent = stats.totalBeneficiaries || 0;
}

// 기관 목록 표시
function displayInstitutions(institutions) {
    const institutionsList = document.getElementById('institutions-list');
    if (!institutionsList) return;
    
    if (institutions.length === 0) {
        institutionsList.innerHTML = '<div class="empty-state">등록된 기관이 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    institutionsList.innerHTML = institutions.map(institution => `
        <div class="institution-card" data-id="${institution.id}">
            <div class="institution-header">
                <div class="institution-title">
                    <h3>${institution.name}</h3>
                    <span class="institution-code">${institution.code || '-'}</span>
                </div>
                <div class="institution-status status-${institution.status}">
                    ${getStatusText(institution.status)}
                </div>
            </div>
            <div class="institution-body">
                <div class="institution-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${institution.address || '-'}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${institution.phone || '-'}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user-tie"></i>
                        <span>담당자: ${institution.manager || '-'} (${institution.managerPhone || '-'})</span>
                    </div>
                </div>
                <div class="institution-stats">
                    <div class="stat-item">
                        <span class="stat-label">직원</span>
                        <span class="stat-value">${institution.employees || 0}명</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">대상자</span>
                        <span class="stat-value">${institution.beneficiaries || 0}명</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">지역</span>
                        <span class="stat-value">${getRegionText(institution.region)}</span>
                    </div>
                </div>
            </div>
            <div class="institution-footer">
                <div class="institution-date">
                    <span>등록일: ${institution.createdAt || '-'}</span>
                    <span>수정일: ${institution.updatedAt || '-'}</span>
                </div>
                <div class="institution-actions">
                    <button class="btn-icon" onclick="editInstitution(${institution.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteInstitution(${institution.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${institutions.length}개`;
}

// 활동 목록 표시
function displayActivities(activities) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

// 상태 텍스트 변환
function getStatusText(status) {
    const statusMap = {
        'active': '활성',
        'inactive': '비활성',
        'pending': '대기중'
    };
    return statusMap[status] || status;
}

// 지역 텍스트 변환
function getRegionText(region) {
    const regionMap = {
        'seoul': '서울',
        'busan': '부산',
        'incheon': '인천',
        'gyeonggi': '경기',
        'other': '기타'
    };
    return regionMap[region] || region || '-';
}

// 검색 함수
function searchInstitutions() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터 함수
function filterInstitutions() {
    const statusFilter = document.getElementById('status-filter');
    const regionFilter = document.getElementById('region-filter');
    
    currentFilter.status = statusFilter.value;
    currentFilter.region = regionFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentInstitutions];
    
    if (currentFilter.search) {
        filtered = filtered.filter(inst => 
            inst.name.toLowerCase().includes(currentFilter.search) ||
            (inst.address && inst.address.toLowerCase().includes(currentFilter.search)) ||
            (inst.phone && inst.phone.includes(currentFilter.search))
        );
    }
    
    if (currentFilter.status) {
        filtered = filtered.filter(inst => inst.status === currentFilter.status);
    }
    
    if (currentFilter.region) {
        filtered = filtered.filter(inst => inst.region === currentFilter.region);
    }
    
    displayInstitutions(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('region-filter').value = '';
    currentFilter = { search: '', status: '', region: '' };
    displayInstitutions(currentInstitutions);
}

// 새로고침
async function refreshInstitutions() {
    try {
        const stats = await fetchInstitutionStats();
        displayStats(stats);
        
        const institutions = await fetchInstitutions();
        currentInstitutions = institutions;
        displayInstitutions(institutions);
        
        const activities = await fetchRecentActivities();
        displayActivities(activities);
        
        console.log('기관 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 기관 등록
function addInstitution() {
    document.getElementById('modal-title').textContent = '기관 등록';
    document.getElementById('institution-form').reset();
    document.getElementById('institution-form').setAttribute('data-mode', 'add');
    document.getElementById('institution-form').removeAttribute('data-id');
    document.getElementById('institution-modal').style.display = 'block';
}

// 기관 수정
function editInstitution(id) {
    const institution = currentInstitutions.find(inst => inst.id === id);
    if (!institution) return;
    
    document.getElementById('modal-title').textContent = '기관 수정';
    document.getElementById('institution-name').value = institution.name || '';
    document.getElementById('institution-code').value = institution.code || '';
    document.getElementById('institution-address').value = institution.address || '';
    document.getElementById('institution-phone').value = institution.phone || '';
    document.getElementById('institution-fax').value = institution.fax || '';
    document.getElementById('institution-manager').value = institution.manager || '';
    document.getElementById('institution-manager-phone').value = institution.managerPhone || '';
    document.getElementById('institution-status').value = institution.status || 'active';
    document.getElementById('institution-notes').value = institution.notes || '';
    
    document.getElementById('institution-form').setAttribute('data-mode', 'edit');
    document.getElementById('institution-form').setAttribute('data-id', id);
    document.getElementById('institution-modal').style.display = 'block';
}

// 기관 삭제
async function deleteInstitution(id) {
    if (!confirm('정말로 이 기관을 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 기관 삭제:', id);
            currentInstitutions = currentInstitutions.filter(inst => inst.id !== id);
            displayInstitutions(currentInstitutions);
            alert('기관이 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('institution-management', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshInstitutions();
            alert('기관이 삭제되었습니다.');
        } else {
            alert('기관 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('기관 삭제 중 오류:', error);
        alert('기관 삭제 중 오류가 발생했습니다.');
    }
}

// 기관 저장
async function saveInstitution() {
    const form = document.getElementById('institution-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        name: document.getElementById('institution-name').value.trim(),
        code: document.getElementById('institution-code').value.trim(),
        address: document.getElementById('institution-address').value.trim(),
        phone: document.getElementById('institution-phone').value.trim(),
        fax: document.getElementById('institution-fax').value.trim(),
        manager: document.getElementById('institution-manager').value.trim(),
        managerPhone: document.getElementById('institution-manager-phone').value.trim(),
        status: document.getElementById('institution-status').value,
        notes: document.getElementById('institution-notes').value.trim()
    };
    
    if (!data.name || !data.address) {
        alert('기관명과 주소는 필수 입력 항목입니다.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 기관 저장:', mode, data);
            if (mode === 'add') {
                const newId = Math.max(...currentInstitutions.map(i => i.id), 0) + 1;
                const newInstitution = {
                    id: newId,
                    ...data,
                    employees: 0,
                    beneficiaries: 0,
                    region: 'other',
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                };
                currentInstitutions.push(newInstitution);
                displayInstitutions(currentInstitutions);
            } else {
                const index = currentInstitutions.findIndex(inst => inst.id == id);
                if (index !== -1) {
                    currentInstitutions[index] = {
                        ...currentInstitutions[index],
                        ...data,
                        updatedAt: new Date().toISOString().split('T')[0]
                    };
                    displayInstitutions(currentInstitutions);
                }
            }
            closeModal();
            alert(`기관이 ${mode === 'add' ? '등록' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.name,
                '2': data.code,
                '3': data.address,
                '4': data.phone,
                '5': data.fax,
                '6': data.manager,
                '7': data.managerPhone,
                '8': data.status,
                '9': data.notes
            }
            : {
                '1': id,
                '2': data.name,
                '3': data.code,
                '4': data.address,
                '5': data.phone,
                '6': data.fax,
                '7': data.manager,
                '8': data.managerPhone,
                '9': data.status,
                '10': data.notes
            };
        
        const result = await callAPI('institution-management', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshInstitutions();
            alert(`기관이 ${mode === 'add' ? '등록' : '수정'}되었습니다.`);
        } else {
            alert(`기관 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('기관 저장 중 오류:', error);
        alert(`기관 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('institution-modal').style.display = 'none';
    document.getElementById('institution-form').reset();
}

// 엑셀 내보내기
function exportInstitutions() {
    console.log('엑셀 내보내기 기능');
    alert('엑셀 내보내기 기능은 준비 중입니다.');
}

// 전체 활동 보기
function viewAllActivities() {
    console.log('전체 활동 보기');
}

// 검색 입력 엔터 키 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchInstitutions();
            }
        });
    }
    
    // 모달 외부 클릭 시 닫기
    const modal = document.getElementById('institution-modal');
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
        // 통계 데이터 로드
        const stats = await fetchInstitutionStats();
        displayStats(stats);
        
        // 기관 목록 로드
        const institutions = await fetchInstitutions();
        currentInstitutions = institutions;
        displayInstitutions(institutions);
        
        // 최근 활동 로드
        const activities = await fetchRecentActivities();
        displayActivities(activities);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

// 전역 함수로 노출
window.searchInstitutions = searchInstitutions;
window.resetSearch = resetSearch;
window.filterInstitutions = filterInstitutions;
window.addInstitution = addInstitution;
window.editInstitution = editInstitution;
window.deleteInstitution = deleteInstitution;
window.saveInstitution = saveInstitution;
window.closeModal = closeModal;
window.exportInstitutions = exportInstitutions;
window.refreshInstitutions = refreshInstitutions;
window.viewAllActivities = viewAllActivities;

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

