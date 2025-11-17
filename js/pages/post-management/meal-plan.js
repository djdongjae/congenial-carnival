// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalPlans: 15,
    activePlans: 8,
    weeklyPlans: 10,
    monthlyPlans: 5
};

const sampleMealPlans = [
    {
        id: 1,
        type: 'weekly',
        startDate: '2024-01-15',
        endDate: '2024-01-21',
        status: 'active',
        meals: {
            mon: { breakfast: '밥, 된장국, 계란후라이', lunch: '밥, 김치찌개, 닭갈비', dinner: '밥, 미역국, 불고기' },
            tue: { breakfast: '밥, 시래기국, 조기구이', lunch: '밥, 해물탕, 야채볶음', dinner: '밥, 콩나물국, 제육볶음' },
            wed: { breakfast: '밥, 북어국, 연어구이', lunch: '밥, 부대찌개, 김치', dinner: '밥, 시금치국, 오삼불고기' },
            thu: { breakfast: '밥, 맑은국, 장조림', lunch: '밥, 김치전, 콩나물국밥', dinner: '밥, 냉국, 닭볶음탕' },
            fri: { breakfast: '밥, 미역국, 고등어구이', lunch: '밥, 순두부찌개, 떡볶이', dinner: '밥, 된장국, 삼겹살' },
            sat: { breakfast: '밥, 계란국, 가지볶음', lunch: '밥, 해물파전, 된장찌개', dinner: '밥, 김치국, 불닭' },
            sun: { breakfast: '밥, 두부국, 생선구이', lunch: '밥, 비빔밥, 미역국', dinner: '밥, 냉국, 갈비탕' }
        },
        createdAt: '2024-01-10 10:00',
        updatedAt: '2024-01-10 10:00'
    },
    {
        id: 2,
        type: 'weekly',
        startDate: '2024-01-22',
        endDate: '2024-01-28',
        status: 'active',
        meals: {
            mon: { breakfast: '밥, 무국, 오징어볶음', lunch: '밥, 떡국, 치킨', dinner: '밥, 미역국, 족발' },
            tue: { breakfast: '밥, 콩나물국, 갈비찜', lunch: '밥, 된장찌개, 보쌈', dinner: '밥, 시래기국, 닭갈비' },
            wed: { breakfast: '밥, 계란국, 삼겹살', lunch: '밥, 김치찌개, 떡볶이', dinner: '밥, 냉국, 불고기' },
            thu: { breakfast: '밥, 북어국, 연어구이', lunch: '밥, 순두부찌개, 야채볶음', dinner: '밥, 맑은국, 제육볶음' },
            fri: { breakfast: '밥, 시금치국, 오삼불고기', lunch: '밥, 부대찌개, 김치전', dinner: '밥, 두부국, 닭볶음탕' },
            sat: { breakfast: '밥, 미역국, 고등어구이', lunch: '밥, 해물파전, 콩나물국밥', dinner: '밥, 된장국, 삼겹살' },
            sun: { breakfast: '밥, 계란국, 장조림', lunch: '밥, 비빔밥, 해물탕', dinner: '밥, 김치국, 갈비탕' }
        },
        createdAt: '2024-01-15 10:00',
        updatedAt: '2024-01-15 10:00'
    },
    {
        id: 3,
        type: 'monthly',
        startDate: '2024-02-01',
        endDate: '2024-02-29',
        status: 'active',
        meals: {},
        createdAt: '2024-01-20 10:00',
        updatedAt: '2024-01-20 10:00'
    }
];

let currentPlans = [];
let currentFilter = {
    search: '',
    type: '',
    status: '',
    date: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 식단표 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('meal-plan', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalPlans: result.results[0].total_plans || 0,
                activePlans: result.results[0].active_plans || 0,
                weeklyPlans: result.results[0].weekly_plans || 0,
                monthlyPlans: result.results[0].monthly_plans || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchMealPlans() {
    if (dev) {
        console.log('[DEV MODE] 식단표 목록 조회');
        return sampleMealPlans;
    }
    
    try {
        const result = await callAPI('meal-plan', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleMealPlans;
    } catch (error) {
        console.error('식단표 조회 중 오류:', error);
        return sampleMealPlans;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-plans').textContent = stats.totalPlans || 0;
    document.getElementById('active-plans').textContent = stats.activePlans || 0;
    document.getElementById('weekly-plans').textContent = stats.weeklyPlans || 0;
    document.getElementById('monthly-plans').textContent = stats.monthlyPlans || 0;
}

// 식단표 목록 표시
function displayMealPlans(plans) {
    const plansList = document.getElementById('meal-plans-list');
    if (!plansList) return;
    
    if (plans.length === 0) {
        plansList.innerHTML = '<div class="empty-state">등록된 식단표가 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    // 날짜순 정렬 (최신순)
    const sortedPlans = [...plans].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    plansList.innerHTML = sortedPlans.map(plan => `
        <div class="meal-plan-card ${plan.status === 'active' ? 'active' : 'inactive'}" data-id="${plan.id}">
            <div class="meal-plan-header">
                <div class="meal-plan-title-section">
                    <span class="badge-type">${plan.type === 'weekly' ? '주간' : '월간'}</span>
                    <span class="badge-status ${plan.status === 'active' ? 'active' : 'inactive'}">${plan.status === 'active' ? '활성' : '비활성'}</span>
                    <h3 class="meal-plan-title">${plan.startDate} ~ ${plan.endDate}</h3>
                </div>
                <div class="meal-plan-actions">
                    <button class="btn-icon" onclick="viewPlan(${plan.id})" title="보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editPlan(${plan.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="copyPlanFromList(${plan.id})" title="복사">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn-icon" onclick="deletePlan(${plan.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${plan.type === 'weekly' && plan.meals ? `
            <div class="meal-plan-preview">
                <div class="preview-day">
                    <strong>월</strong>
                    <div>아: ${plan.meals.mon?.breakfast || '-'}</div>
                    <div>점: ${plan.meals.mon?.lunch || '-'}</div>
                    <div>저: ${plan.meals.mon?.dinner || '-'}</div>
                </div>
                <div class="preview-day">
                    <strong>화</strong>
                    <div>아: ${plan.meals.tue?.breakfast || '-'}</div>
                    <div>점: ${plan.meals.tue?.lunch || '-'}</div>
                    <div>저: ${plan.meals.tue?.dinner || '-'}</div>
                </div>
                <div class="preview-day">
                    <strong>수</strong>
                    <div>아: ${plan.meals.wed?.breakfast || '-'}</div>
                    <div>점: ${plan.meals.wed?.lunch || '-'}</div>
                    <div>저: ${plan.meals.wed?.dinner || '-'}</div>
                </div>
            </div>
            ` : ''}
            <div class="meal-plan-footer">
                <span><i class="fas fa-calendar"></i> 작성일: ${plan.createdAt}</span>
                <span><i class="fas fa-edit"></i> 수정일: ${plan.updatedAt}</span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${plans.length}개`;
}

// 검색
function searchPlans() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterPlans() {
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    
    currentFilter.type = typeFilter.value;
    currentFilter.status = statusFilter.value;
    currentFilter.date = dateFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentPlans];
    
    if (currentFilter.search) {
        filtered = filtered.filter(plan => 
            plan.startDate.includes(currentFilter.search) ||
            plan.endDate.includes(currentFilter.search)
        );
    }
    
    if (currentFilter.type) {
        filtered = filtered.filter(plan => plan.type === currentFilter.type);
    }
    
    if (currentFilter.status) {
        filtered = filtered.filter(plan => plan.status === currentFilter.status);
    }
    
    if (currentFilter.date) {
        filtered = filtered.filter(plan => {
            const planMonth = plan.startDate.substring(0, 7);
            return planMonth === currentFilter.date;
        });
    }
    
    displayMealPlans(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('type-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('date-filter').value = '';
    currentFilter = { search: '', type: '', status: '', date: '' };
    displayMealPlans(currentPlans);
}

// 새로고침
async function refreshPlans() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const plans = await fetchMealPlans();
        currentPlans = plans;
        displayMealPlans(plans);
        
        console.log('식단표 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 식단표 등록
function addPlan() {
    document.getElementById('modal-title').textContent = '식단표 등록';
    document.getElementById('plan-form').reset();
    
    const today = new Date();
    document.getElementById('plan-start-date').value = today.toISOString().split('T')[0];
    updatePlanPeriod();
    
    document.getElementById('plan-form').setAttribute('data-mode', 'add');
    document.getElementById('plan-form').removeAttribute('data-id');
    document.getElementById('plan-modal').style.display = 'block';
    toggleMealPlanType();
}

// 식단표 수정
function editPlan(id) {
    const plan = currentPlans.find(p => p.id === id);
    if (!plan) return;
    
    document.getElementById('modal-title').textContent = '식단표 수정';
    document.getElementById('plan-type').value = plan.type || 'weekly';
    document.getElementById('plan-start-date').value = plan.startDate || '';
    document.getElementById('plan-end-date').value = plan.endDate || '';
    document.getElementById('plan-status').value = plan.status || 'active';
    
    // 식단표 데이터 로드
    if (plan.type === 'weekly' && plan.meals) {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const meals = ['breakfast', 'lunch', 'dinner'];
        
        days.forEach(day => {
            meals.forEach(meal => {
                const input = document.querySelector(`.meal-input[data-day="${day}"][data-meal="${meal}"]`);
                if (input && plan.meals[day]) {
                    input.value = plan.meals[day][meal] || '';
                }
            });
        });
    }
    
    document.getElementById('plan-form').setAttribute('data-mode', 'edit');
    document.getElementById('plan-form').setAttribute('data-id', id);
    document.getElementById('plan-modal').style.display = 'block';
    toggleMealPlanType();
}

// 식단표 보기
function viewPlan(id) {
    const plan = currentPlans.find(p => p.id === id);
    if (!plan) return;
    
    alert(`${plan.startDate} ~ ${plan.endDate} 식단표를 보는 기능은 추후 구현 예정입니다.`);
}

// 식단표 복사
function copyPlanFromList(id) {
    const plan = currentPlans.find(p => p.id === id);
    if (!plan) return;
    
    document.getElementById('modal-title').textContent = '식단표 복사';
    document.getElementById('plan-type').value = plan.type || 'weekly';
    
    // 다음 주 또는 다음 달로 날짜 설정
    const startDate = new Date(plan.startDate);
    if (plan.type === 'weekly') {
        startDate.setDate(startDate.getDate() + 7);
    } else {
        startDate.setMonth(startDate.getMonth() + 1);
    }
    document.getElementById('plan-start-date').value = startDate.toISOString().split('T')[0];
    updatePlanPeriod();
    
    document.getElementById('plan-status').value = 'active';
    
    // 식단표 데이터 복사
    if (plan.type === 'weekly' && plan.meals) {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const meals = ['breakfast', 'lunch', 'dinner'];
        
        days.forEach(day => {
            meals.forEach(meal => {
                const input = document.querySelector(`.meal-input[data-day="${day}"][data-meal="${meal}"]`);
                if (input && plan.meals[day]) {
                    input.value = plan.meals[day][meal] || '';
                }
            });
        });
    }
    
    document.getElementById('plan-form').setAttribute('data-mode', 'add');
    document.getElementById('plan-form').removeAttribute('data-id');
    document.getElementById('plan-modal').style.display = 'block';
    toggleMealPlanType();
}

// 식단표 삭제
async function deletePlan(id) {
    if (!confirm('정말로 이 식단표를 삭제하시겠습니까?')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 식단표 삭제:', id);
            currentPlans = currentPlans.filter(p => p.id !== id);
            displayMealPlans(currentPlans);
            alert('식단표가 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('meal-plan', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshPlans();
            alert('식단표가 삭제되었습니다.');
        } else {
            alert('식단표 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('식단표 삭제 중 오류:', error);
        alert('식단표 삭제 중 오류가 발생했습니다.');
    }
}

// 식단표 저장
async function savePlan() {
    const form = document.getElementById('plan-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const type = document.getElementById('plan-type').value;
    const startDate = document.getElementById('plan-start-date').value;
    const endDate = document.getElementById('plan-end-date').value;
    const status = document.getElementById('plan-status').value;
    
    if (!startDate || !endDate) {
        alert('기간을 입력해주세요.');
        return;
    }
    
    let meals = {};
    if (type === 'weekly') {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const mealTypes = ['breakfast', 'lunch', 'dinner'];
        
        days.forEach(day => {
            meals[day] = {};
            mealTypes.forEach(meal => {
                const input = document.querySelector(`.meal-input[data-day="${day}"][data-meal="${meal}"]`);
                if (input) {
                    meals[day][meal] = input.value.trim();
                }
            });
        });
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 식단표 저장:', mode, { type, startDate, endDate, status, meals });
            if (mode === 'add') {
                const newId = Math.max(...currentPlans.map(p => p.id), 0) + 1;
                const newPlan = {
                    id: newId,
                    type,
                    startDate,
                    endDate,
                    status,
                    meals,
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentPlans.push(newPlan);
                displayMealPlans(currentPlans);
            } else {
                const index = currentPlans.findIndex(p => p.id == id);
                if (index !== -1) {
                    currentPlans[index] = {
                        ...currentPlans[index],
                        type,
                        startDate,
                        endDate,
                        status,
                        meals,
                        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };
                    displayMealPlans(currentPlans);
                }
            }
            closeModal();
            alert(`식단표가 ${mode === 'add' ? '등록' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': type,
                '2': startDate,
                '3': endDate,
                '4': status,
                '5': JSON.stringify(meals)
            }
            : {
                '1': id,
                '2': type,
                '3': startDate,
                '4': endDate,
                '5': status,
                '6': JSON.stringify(meals)
            };
        
        const result = await callAPI('meal-plan', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshPlans();
            alert(`식단표가 ${mode === 'add' ? '등록' : '수정'}되었습니다.`);
        } else {
            alert(`식단표 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('식단표 저장 중 오류:', error);
        alert(`식단표 ${mode === 'add' ? '등록' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 식단표 유형 전환
function toggleMealPlanType() {
    const type = document.getElementById('plan-type').value;
    const weeklyPlan = document.getElementById('weekly-meal-plan');
    const monthlyPlan = document.getElementById('monthly-meal-plan');
    
    if (type === 'weekly') {
        weeklyPlan.style.display = 'block';
        monthlyPlan.style.display = 'none';
    } else {
        weeklyPlan.style.display = 'none';
        monthlyPlan.style.display = 'block';
        updateMonthlyPlanInfo();
    }
}

// 식단표 기간 업데이트
function updatePlanPeriod() {
    const type = document.getElementById('plan-type').value;
    const startDate = document.getElementById('plan-start-date').value;
    const endDateInput = document.getElementById('plan-end-date');
    
    if (!startDate) return;
    
    const start = new Date(startDate);
    let end;
    
    if (type === 'weekly') {
        end = new Date(start);
        end.setDate(end.getDate() + 6);
    } else {
        end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    }
    
    endDateInput.value = end.toISOString().split('T')[0];
    updateMonthlyPlanInfo();
}

// 월간 식단표 정보 업데이트
function updateMonthlyPlanInfo() {
    const startDate = document.getElementById('plan-start-date').value;
    const endDate = document.getElementById('plan-end-date').value;
    const periodInfo = document.getElementById('monthly-plan-period');
    
    if (periodInfo && startDate && endDate) {
        periodInfo.textContent = `기간: ${startDate} ~ ${endDate}`;
    }
}

// 복사 버튼 (신규 등록 시)
function copyPlan() {
    if (currentPlans.length === 0) {
        alert('복사할 식단표가 없습니다. 먼저 식단표를 등록해주세요.');
        return;
    }
    
    // 가장 최근 식단표를 복사
    const latestPlan = currentPlans.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))[0];
    copyPlanFromList(latestPlan.id);
}

// 모달 닫기
function closeModal() {
    document.getElementById('plan-modal').style.display = 'none';
    document.getElementById('plan-form').reset();
}

// 전역 함수로 노출
window.searchPlans = searchPlans;
window.resetSearch = resetSearch;
window.filterPlans = filterPlans;
window.addPlan = addPlan;
window.editPlan = editPlan;
window.viewPlan = viewPlan;
window.copyPlanFromList = copyPlanFromList;
window.deletePlan = deletePlan;
window.savePlan = savePlan;
window.copyPlan = copyPlan;
window.toggleMealPlanType = toggleMealPlanType;
window.updatePlanPeriod = updatePlanPeriod;
window.closeModal = closeModal;
window.refreshPlans = refreshPlans;

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPlans();
            }
        });
    }
    
    const planType = document.getElementById('plan-type');
    if (planType) {
        planType.addEventListener('change', toggleMealPlanType);
    }
    
    const startDate = document.getElementById('plan-start-date');
    if (startDate) {
        startDate.addEventListener('change', updatePlanPeriod);
    }
    
    const modal = document.getElementById('plan-modal');
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
        
        const plans = await fetchMealPlans();
        currentPlans = plans;
        displayMealPlans(plans);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

