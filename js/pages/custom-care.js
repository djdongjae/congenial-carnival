// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleStats = {
    totalBeneficiaries: 125,
    activeCare: 48,
    scheduledCare: 23,
    careWorkers: 32
};

const sampleActivities = [
    {
        icon: 'fa-user-check',
        title: '케어 서비스 시작',
        description: '김○○님의 맞춤케어 서비스가 시작되었습니다',
        time: '2024-01-15 10:30'
    },
    {
        icon: 'fa-file-medical',
        title: '케어 계획 수정',
        description: '이○○님의 케어 계획이 업데이트되었습니다',
        time: '2024-01-15 09:15'
    },
    {
        icon: 'fa-calendar-plus',
        title: '일정 등록',
        description: '박○○님의 케어 일정이 등록되었습니다',
        time: '2024-01-14 16:45'
    },
    {
        icon: 'fa-user-nurse',
        title: '지원사 배정',
        description: '최○○님에게 생활지원사가 배정되었습니다',
        time: '2024-01-14 14:20'
    },
    {
        icon: 'fa-star',
        title: '케어 평가 완료',
        description: '정○○님의 케어 서비스 평가가 완료되었습니다',
        time: '2024-01-14 11:30'
    }
];

// API 호출 함수 (개발 모드에서는 샘플 데이터 반환)
async function fetchCareStats() {
    if (dev) {
        console.log('[DEV MODE] 케어 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('custom-care', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalBeneficiaries: result.results[0].total_beneficiaries || 0,
                activeCare: result.results[0].active_care || 0,
                scheduledCare: result.results[0].scheduled_care || 0,
                careWorkers: result.results[0].care_workers || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchRecentActivities() {
    if (dev) {
        console.log('[DEV MODE] 최근 활동 조회');
        return sampleActivities;
    }
    
    try {
        const result = await callAPI('custom-care', 'Q020', {});
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
    document.getElementById('total-beneficiaries').textContent = stats.totalBeneficiaries || 0;
    document.getElementById('active-care').textContent = stats.activeCare || 0;
    document.getElementById('scheduled-care').textContent = stats.scheduledCare || 0;
    document.getElementById('care-workers').textContent = stats.careWorkers || 0;
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

// 페이지 초기화
async function initPage() {
    try {
        // 통계 데이터 로드
        const stats = await fetchCareStats();
        displayStats(stats);
        
        // 최근 활동 로드
        const activities = await fetchRecentActivities();
        displayActivities(activities);
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

// 네비게이션 함수들
function navigateToCarePlan() {
    console.log('케어 계획 관리 페이지로 이동');
    // 실제로는 탭을 열거나 페이지를 이동시키는 로직
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('케어 계획 관리', 'pages/care-plan.html');
    }
}

function navigateToCareHistory() {
    console.log('케어 이력 조회 페이지로 이동');
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('케어 이력 조회', 'pages/care-history.html');
    }
}

function navigateToCareSchedule() {
    console.log('케어 일정 관리 페이지로 이동');
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('케어 일정 관리', 'pages/care-schedule.html');
    }
}

function navigateToCareEvaluation() {
    console.log('케어 평가 페이지로 이동');
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('케어 평가', 'pages/care-evaluation.html');
    }
}

function viewAllActivities() {
    console.log('전체 활동 보기');
    navigateToCareHistory();
}

// 빠른 액세스 함수들
function quickAddCarePlan() {
    console.log('새 케어 계획 추가');
    navigateToCarePlan();
}

function quickRegisterSchedule() {
    console.log('일정 등록');
    navigateToCareSchedule();
}

function quickSearchBeneficiary() {
    console.log('대상자 검색');
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('대상자 검색', 'pages/benficiary/beneficiary-registration.html');
    }
}

function quickViewReports() {
    console.log('케어 현황 보기');
    if (window.parent && window.parent.openTab) {
        window.parent.openTab('케어 현황', 'pages/service-status/beneficiary-service-status.html');
    }
}

// 전역 함수로 노출 (HTML에서 호출 가능하도록)
window.navigateToCarePlan = navigateToCarePlan;
window.navigateToCareHistory = navigateToCareHistory;
window.navigateToCareSchedule = navigateToCareSchedule;
window.navigateToCareEvaluation = navigateToCareEvaluation;
window.viewAllActivities = viewAllActivities;
window.quickAddCarePlan = quickAddCarePlan;
window.quickRegisterSchedule = quickRegisterSchedule;
window.quickSearchBeneficiary = quickSearchBeneficiary;
window.quickViewReports = quickViewReports;

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

