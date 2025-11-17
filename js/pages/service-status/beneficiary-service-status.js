// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const summaryData = [
    {
        category: '합계',
        personnel: 695,
        male: 174,
        female: 521,
        dailyLifeCount: 606,
        dailyLifeTime: 27994,
        safetyVisitCount: 1247,
        safetyVisitTime: 75954,
        safetyCallCount: 2924,
        safetyCallTime: 17261,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 207,
        socialParticipationTime: 13460,
        lifeEducationCount: 1156,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        personnel: 45,
        male: 25,
        female: 20,
        dailyLifeCount: 43,
        dailyLifeTime: 25641,
        safetyVisitCount: 137,
        safetyVisitTime: 721,
        safetyCallCount: 0,
        safetyCallTime: 0,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 9,
        socialParticipationTime: 383,
        lifeEducationCount: 116,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        personnel: 650,
        male: 149,
        female: 501,
        dailyLifeCount: 563,
        dailyLifeTime: 2353,
        safetyVisitCount: 1247,
        safetyVisitTime: 75954,
        safetyCallCount: 2787,
        safetyCallTime: 16540,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 198,
        socialParticipationTime: 13077,
        lifeEducationCount: 1040,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '긴급',
        personnel: 0,
        male: 0,
        female: 0,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 0,
        safetyCallTime: 0,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 0,
        socialParticipationTime: 0,
        lifeEducationCount: 0,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    }
];

const detailData = [
    {
        category: '중점',
        no: 1,
        name: '강성연',
        gender: '남',
        age: 89,
        dailyLifeCount: 4,
        dailyLifeTime: 498,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 5,
        safetyCallTime: 23,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 101,
        lifeEducationCount: 4,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 2,
        name: '강연순',
        gender: '여',
        age: 73,
        dailyLifeCount: 4,
        dailyLifeTime: 490,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 2,
        safetyCallTime: 10,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 0,
        socialParticipationTime: 0,
        lifeEducationCount: 2,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 3,
        name: '고남순',
        gender: '여',
        age: 85,
        dailyLifeCount: 4,
        dailyLifeTime: 485,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 4,
        safetyCallTime: 18,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 1,
        socialParticipationTime: 58,
        lifeEducationCount: 3,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 4,
        name: '김경순',
        gender: '여',
        age: 82,
        dailyLifeCount: 4,
        dailyLifeTime: 492,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 3,
        safetyCallTime: 15,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 1,
        socialParticipationTime: 52,
        lifeEducationCount: 2,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 5,
        name: '김미영',
        gender: '여',
        age: 78,
        dailyLifeCount: 4,
        dailyLifeTime: 488,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 4,
        safetyCallTime: 20,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 98,
        lifeEducationCount: 3,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 6,
        name: '김순옥',
        gender: '여',
        age: 80,
        dailyLifeCount: 4,
        dailyLifeTime: 495,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 3,
        safetyCallTime: 16,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 1,
        socialParticipationTime: 55,
        lifeEducationCount: 2,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 7,
        name: '김영자',
        gender: '여',
        age: 76,
        dailyLifeCount: 4,
        dailyLifeTime: 487,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 4,
        safetyCallTime: 19,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 1,
        socialParticipationTime: 48,
        lifeEducationCount: 3,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 8,
        name: '김옥순',
        gender: '여',
        age: 84,
        dailyLifeCount: 4,
        dailyLifeTime: 493,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 3,
        safetyCallTime: 17,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 99,
        lifeEducationCount: 2,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '중점',
        no: 9,
        name: '김정순',
        gender: '여',
        age: 79,
        dailyLifeCount: 4,
        dailyLifeTime: 491,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 4,
        safetyCallTime: 21,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 1,
        socialParticipationTime: 50,
        lifeEducationCount: 3,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 10,
        name: '김현정',
        gender: '여',
        age: 70,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 2,
        safetyVisitTime: 120,
        safetyCallCount: 8,
        safetyCallTime: 42,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 3,
        socialParticipationTime: 180,
        lifeEducationCount: 5,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 11,
        name: '이영숙',
        gender: '여',
        age: 77,
        dailyLifeCount: 1,
        dailyLifeTime: 45,
        safetyVisitCount: 3,
        safetyVisitTime: 180,
        safetyCallCount: 6,
        safetyCallTime: 30,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 120,
        lifeEducationCount: 4,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 12,
        name: '박순자',
        gender: '여',
        age: 73,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 9,
        safetyCallTime: 45,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 4,
        socialParticipationTime: 240,
        lifeEducationCount: 6,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 13,
        name: '최미영',
        gender: '여',
        age: 75,
        dailyLifeCount: 2,
        dailyLifeTime: 90,
        safetyVisitCount: 2,
        safetyVisitTime: 120,
        safetyCallCount: 7,
        safetyCallTime: 35,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 3,
        socialParticipationTime: 180,
        lifeEducationCount: 5,
        lifeEducationTime: 0,
        linkedLifeSupport: 1,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 14,
        name: '정수진',
        gender: '여',
        age: 78,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 1,
        safetyVisitTime: 60,
        safetyCallCount: 10,
        safetyCallTime: 50,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 5,
        socialParticipationTime: 300,
        lifeEducationCount: 7,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 1,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 15,
        name: '강은희',
        gender: '여',
        age: 76,
        dailyLifeCount: 1,
        dailyLifeTime: 45,
        safetyVisitCount: 3,
        safetyVisitTime: 180,
        safetyCallCount: 8,
        safetyCallTime: 40,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 120,
        lifeEducationCount: 4,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 16,
        name: '윤경희',
        gender: '여',
        age: 74,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 12,
        safetyCallTime: 60,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 6,
        socialParticipationTime: 360,
        lifeEducationCount: 8,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 1
    },
    {
        category: '일반',
        no: 17,
        name: '임영희',
        gender: '여',
        age: 72,
        dailyLifeCount: 2,
        dailyLifeTime: 90,
        safetyVisitCount: 2,
        safetyVisitTime: 120,
        safetyCallCount: 9,
        safetyCallTime: 45,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 3,
        socialParticipationTime: 180,
        lifeEducationCount: 5,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 1,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 18,
        name: '한미라',
        gender: '여',
        age: 71,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 1,
        safetyVisitTime: 60,
        safetyCallCount: 11,
        safetyCallTime: 55,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 4,
        socialParticipationTime: 240,
        lifeEducationCount: 6,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 19,
        name: '조영숙',
        gender: '여',
        age: 69,
        dailyLifeCount: 1,
        dailyLifeTime: 45,
        safetyVisitCount: 3,
        safetyVisitTime: 180,
        safetyCallCount: 7,
        safetyCallTime: 35,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 2,
        socialParticipationTime: 120,
        lifeEducationCount: 4,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 0,
        linkedOther: 0
    },
    {
        category: '일반',
        no: 20,
        name: '신옥순',
        gender: '여',
        age: 68,
        dailyLifeCount: 0,
        dailyLifeTime: 0,
        safetyVisitCount: 0,
        safetyVisitTime: 0,
        safetyCallCount: 13,
        safetyCallTime: 65,
        safetyEmergencyCount: 0,
        safetyEmergencyTime: 0,
        socialParticipationCount: 7,
        socialParticipationTime: 420,
        lifeEducationCount: 9,
        lifeEducationTime: 0,
        linkedLifeSupport: 0,
        linkedHousingImprovement: 0,
        linkedHealthSupport: 1,
        linkedOther: 0
    }
];

// 전역 변수
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // 1-12
let summaryGridInitialized = false;
let detailGridInitialized = false;
let beneficiaryName = '';

// 페이지 초기화 함수
function initPage() {
    initializeMonthButtons();
    initializeEventListeners();
    updateYearDisplay();
    initSummaryGrid();
    initDetailGrid();
    loadData();
}

// 월 버튼 초기화
function initializeMonthButtons() {
    const monthSelector = document.getElementById('month-selector');
    monthSelector.innerHTML = '';
    
    for (let month = 1; month <= 12; month++) {
        const btn = document.createElement('button');
        btn.className = 'month-btn';
        btn.textContent = `${month}월`;
        btn.dataset.month = month;
        
        if (month === currentMonth) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMonth = month;
            loadData();
        });
        
        monthSelector.appendChild(btn);
    }
}

// 이벤트 리스너 초기화
function initializeEventListeners() {
    document.getElementById('prev-year').addEventListener('click', () => {
        currentYear--;
        updateYearDisplay();
        loadData();
    });
    
    document.getElementById('next-year').addEventListener('click', () => {
        currentYear++;
        updateYearDisplay();
        loadData();
    });
    
    document.getElementById('search-btn').addEventListener('click', () => {
        beneficiaryName = document.getElementById('beneficiary-name').value.trim();
        loadData();
    });
    
    document.getElementById('beneficiary-name').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            beneficiaryName = document.getElementById('beneficiary-name').value.trim();
            loadData();
        }
    });
    
    document.getElementById('excel-export').addEventListener('click', exportToExcel);
}

// 년도 표시 업데이트
function updateYearDisplay() {
    document.getElementById('current-year').textContent = currentYear;
}

// 요약 그리드 초기화
function initSummaryGrid() {
    const colNames = [
        '분류', '인원', '남', '여',
        '일상생활지원(횟수)', '일상생활지원(시간)', '안전(방문)(횟수)', '안전(방문)(시간)', 
        '안전(전화)(횟수)', '안전(전화)(시간)', '안전(긴급/ICT)(횟수)', '안전(긴급/ICT)(시간)',
        '사회참여(횟수)', '사회참여(시간)', '생활교육(횟수)', '생활교육(시간)', 
        '연계서비스-생활지원', '연계서비스-주거개선', '연계서비스-건강지원', '연계서비스-기타'
    ];
    
    const colModel = [
        { name: 'category', index: 'category', width: 90, sortable: false, align: 'center' },
        { name: 'personnel', index: 'personnel', width: 80, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'male', index: 'male', width: 70, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'female', index: 'female', width: 70, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'dailyLifeCount', index: 'dailyLifeCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'dailyLifeTime', index: 'dailyLifeTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyVisitCount', index: 'safetyVisitCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyVisitTime', index: 'safetyVisitTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyCallCount', index: 'safetyCallCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyCallTime', index: 'safetyCallTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyEmergencyCount', index: 'safetyEmergencyCount', width: 120, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyEmergencyTime', index: 'safetyEmergencyTime', width: 130, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'socialParticipationCount', index: 'socialParticipationCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'socialParticipationTime', index: 'socialParticipationTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'lifeEducationCount', index: 'lifeEducationCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'lifeEducationTime', index: 'lifeEducationTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedLifeSupport', index: 'linkedLifeSupport', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedHousingImprovement', index: 'linkedHousingImprovement', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedHealthSupport', index: 'linkedHealthSupport', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedOther', index: 'linkedOther', width: 90, sortable: false, align: 'right', formatter: 'integer' }
    ];
    
    $('#SummaryGrid').jqGrid({
        datatype: 'local',
        data: [],
        colNames: colNames,
        colModel: colModel,
        rowNum: 1000,
        pager: false,
        sortname: 'category',
        sortorder: 'asc',
        viewrecords: false,
        caption: '',
        height: 'auto',
        width: '100%',
        autowidth: true,
        shrinkToFit: false,
        scroll: false,
        gridComplete: function() {
            $('#SummaryGrid').find('td, th').css({
                'padding': '10px 8px',
                'font-size': '13px',
                'border': '1px solid #dee2e6'
            });
            $('#SummaryGrid').find('th').css({
                'background-color': '#f8f9fa',
                'font-weight': '600',
                'color': '#333'
            });
            $('#SummaryGrid').find('tr').hover(
                function() { $(this).css('background-color', '#f8f9fa'); },
                function() { $(this).css('background-color', ''); }
            );
        },
        loadComplete: function(data) {
            setTimeout(() => {
                $('#SummaryGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
            }, 100);
        }
    });
    
    summaryGridInitialized = true;
}

// 세부내역 그리드 초기화
function initDetailGrid() {
    const colNames = [
        '분류', 'No', '성명', '성별', '나이',
        '일상생활지원(횟수)', '일상생활지원(시간)', '안전(방문)(횟수)', '안전(방문)(시간)', 
        '안전(전화)(횟수)', '안전(전화)(시간)', '안전(긴급/ICT)(횟수)', '안전(긴급/ICT)(시간)',
        '사회참여(횟수)', '사회참여(시간)', '생활교육(횟수)', '생활교육(시간)', 
        '연계서비스-생활지원', '연계서비스-주거개선', '연계서비스-건강지원', '연계서비스-기타'
    ];
    
    const colModel = [
        { name: 'category', index: 'category', width: 80, sortable: false, align: 'center' },
        { name: 'no', index: 'no', width: 60, sortable: false, align: 'center', formatter: 'integer' },
        { name: 'name', index: 'name', width: 120, sortable: true, align: 'left' },
        { name: 'gender', index: 'gender', width: 70, sortable: false, align: 'center' },
        { name: 'age', index: 'age', width: 70, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'dailyLifeCount', index: 'dailyLifeCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'dailyLifeTime', index: 'dailyLifeTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyVisitCount', index: 'safetyVisitCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyVisitTime', index: 'safetyVisitTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyCallCount', index: 'safetyCallCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyCallTime', index: 'safetyCallTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyEmergencyCount', index: 'safetyEmergencyCount', width: 120, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'safetyEmergencyTime', index: 'safetyEmergencyTime', width: 130, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'socialParticipationCount', index: 'socialParticipationCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'socialParticipationTime', index: 'socialParticipationTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'lifeEducationCount', index: 'lifeEducationCount', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'lifeEducationTime', index: 'lifeEducationTime', width: 110, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedLifeSupport', index: 'linkedLifeSupport', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedHousingImprovement', index: 'linkedHousingImprovement', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedHealthSupport', index: 'linkedHealthSupport', width: 100, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'linkedOther', index: 'linkedOther', width: 90, sortable: false, align: 'right', formatter: 'integer' }
    ];
    
    $('#DetailGrid').jqGrid({
        datatype: 'local',
        data: [],
        colNames: colNames,
        colModel: colModel,
        rowNum: 20,
        rowList: [10, 20, 30, 50],
        pager: '#DetailPager',
        sortname: 'no',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        height: 'auto',
        width: '100%',
        autowidth: true,
        shrinkToFit: false,
        scroll: true,
        scrollrows: false,
        scrollTimeout: 20,
        gridComplete: function() {
            $('#DetailGrid').find('td, th').css({
                'padding': '10px 8px',
                'font-size': '13px',
                'border': '1px solid #dee2e6'
            });
            $('#DetailGrid').find('th').css({
                'background-color': '#f8f9fa',
                'font-weight': '600',
                'color': '#333'
            });
            $('#DetailGrid').find('tr').hover(
                function() { $(this).css('background-color', '#f8f9fa'); },
                function() { $(this).css('background-color', ''); }
            );
        },
        loadComplete: function(data) {
            setTimeout(() => {
                $('#DetailGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
            }, 100);
        }
    });
    
    $('#DetailGrid').jqGrid('navGrid', '#DetailPager', {
        edit: false,
        add: false,
        del: false,
        search: true,
        refresh: true,
        view: false,
        position: "left",
        cloneToTop: false
    });
    
    $('#DetailGrid').jqGrid('filterToolbar', {
        searchOnEnter: true,
        defaultSearch: "cn"
    });
    
    detailGridInitialized = true;
}

// 데이터 로드
async function loadData() {
    try {
        const year = currentYear;
        const month = currentMonth;
        const name = beneficiaryName;
        
        let summaryResult = [];
        let detailResult = [];
        
        if (dev) {
            // 개발 모드: 샘플 데이터 사용
            summaryResult = [...summaryData];
            detailResult = [...detailData];
            
            // 대상자명 필터링
            if (name) {
                detailResult = detailResult.filter(item => item.name.includes(name));
                // 요약 데이터 재계산 (간단하게)
                // 실제로는 필터링된 데이터로 재계산해야 함
            }
        } else {
            // 실제 API 호출
            const params = {
                '1': year.toString(),
                '2': month.toString(),
                '3': name || ''
            };
            
            const result = await callPageQuery('beneficiary-service-status', 'Q010', params);
            summaryResult = result?.results?.[0]?.summary || [];
            detailResult = result?.results?.[0]?.detail || [];
        }
        
        // 요약 그리드 데이터 설정
        if (summaryGridInitialized) {
            $('#SummaryGrid').jqGrid('clearGridData');
            $('#SummaryGrid').jqGrid('setGridParam', {
                data: summaryResult
            }).trigger('reloadGrid');
        }
        
        // 세부내역 그리드 데이터 설정
        if (detailGridInitialized) {
            $('#DetailGrid').jqGrid('clearGridData');
            $('#DetailGrid').jqGrid('setGridParam', {
                data: detailResult
            }).trigger('reloadGrid');
        }
    } catch (error) {
        console.error('데이터 로드 중 오류:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// EXCEL 내보내기
function exportToExcel() {
    try {
        const year = currentYear;
        const month = currentMonth;
        
        // 세부내역 그리드 데이터 가져오기
        const gridData = $('#DetailGrid').jqGrid('getRowData');
        
        if (gridData.length === 0) {
            alert('내보낼 데이터가 없습니다.');
            return;
        }
        
        // CSV 형식으로 변환
        let csv = '\uFEFF'; // BOM 추가 (한글 깨짐 방지)
        
        // 헤더
        const headers = ['분류', 'No', '성명', '성별', '나이', '일상생활지원(횟수)', '일상생활지원(시간)',
            '안전(방문)(횟수)', '안전(방문)(시간)', '안전(전화)(횟수)', '안전(전화)(시간)',
            '안전(긴급/ICT)(횟수)', '안전(긴급/ICT)(시간)', '사회참여(횟수)', '사회참여(시간)',
            '생활교육(횟수)', '생활교육(시간)', '연계서비스-생활지원', '연계서비스-주거개선',
            '연계서비스-건강지원', '연계서비스-기타'];
        csv += headers.join(',') + '\n';
        
        // 데이터
        gridData.forEach(row => {
            const rowData = [
                row.category || '',
                row.no || '',
                row.name || '',
                row.gender || '',
                row.age || '',
                row.dailyLifeCount || '',
                row.dailyLifeTime || '',
                row.safetyVisitCount || '',
                row.safetyVisitTime || '',
                row.safetyCallCount || '',
                row.safetyCallTime || '',
                row.safetyEmergencyCount || '',
                row.safetyEmergencyTime || '',
                row.socialParticipationCount || '',
                row.socialParticipationTime || '',
                row.lifeEducationCount || '',
                row.lifeEducationTime || '',
                row.linkedLifeSupport || '',
                row.linkedHousingImprovement || '',
                row.linkedHealthSupport || '',
                row.linkedOther || ''
            ];
            csv += rowData.join(',') + '\n';
        });
        
        // 파일 다운로드
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `대상자별_서비스현황_${year}년${month}월.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('EXCEL 내보내기 중 오류:', error);
        alert('EXCEL 내보내기 중 오류가 발생했습니다.');
    }
}

// 전역 함수로 노출
window.initPage = initPage;

