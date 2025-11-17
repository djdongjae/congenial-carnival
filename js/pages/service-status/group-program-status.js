// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의 (단체프로그램 서비스 현황)
const summaryData = [
    {
        category: '합계',
        programCount: 15,
        participantCount: 695,
        male: 174,
        female: 521,
        sessionCount: 120,
        totalTime: 3600
    },
    {
        category: '중점',
        programCount: 5,
        participantCount: 45,
        male: 25,
        female: 20,
        sessionCount: 40,
        totalTime: 1200
    },
    {
        category: '일반',
        programCount: 10,
        participantCount: 650,
        male: 149,
        female: 501,
        sessionCount: 80,
        totalTime: 2400
    },
    {
        category: '긴급',
        programCount: 0,
        participantCount: 0,
        male: 0,
        female: 0,
        sessionCount: 0,
        totalTime: 0
    }
];

const detailData = [
    {
        category: '중점',
        no: 1,
        programName: '인지활동프로그램',
        participantCount: 15,
        male: 8,
        female: 7,
        sessionCount: 12,
        totalTime: 360,
        startDate: '2025-01-05',
        endDate: '2025-03-29',
        location: '복지관 2층 강당'
    },
    {
        category: '중점',
        no: 2,
        programName: '건강체조프로그램',
        participantCount: 12,
        male: 5,
        female: 7,
        sessionCount: 10,
        totalTime: 300,
        startDate: '2025-01-08',
        endDate: '2025-03-26',
        location: '복지관 운동장'
    },
    {
        category: '중점',
        no: 3,
        programName: '요리교실',
        participantCount: 10,
        male: 3,
        female: 7,
        sessionCount: 8,
        totalTime: 240,
        startDate: '2025-01-10',
        endDate: '2025-02-28',
        location: '복지관 1층 주방'
    },
    {
        category: '중점',
        no: 4,
        programName: '독서토론모임',
        participantCount: 8,
        male: 4,
        female: 4,
        sessionCount: 10,
        totalTime: 300,
        startDate: '2025-01-12',
        endDate: '2025-03-30',
        location: '복지관 도서관'
    },
    {
        category: '일반',
        no: 5,
        programName: '바둑교실',
        participantCount: 20,
        male: 15,
        female: 5,
        sessionCount: 15,
        totalTime: 450,
        startDate: '2025-01-03',
        endDate: '2025-03-31',
        location: '복지관 3층 게임실'
    },
    {
        category: '일반',
        no: 6,
        programName: '노래교실',
        participantCount: 25,
        male: 10,
        female: 15,
        sessionCount: 12,
        totalTime: 360,
        startDate: '2025-01-05',
        endDate: '2025-03-28',
        location: '복지관 2층 강당'
    },
    {
        category: '일반',
        no: 7,
        programName: '댄스교실',
        participantCount: 18,
        male: 5,
        female: 13,
        sessionCount: 10,
        totalTime: 300,
        startDate: '2025-01-07',
        endDate: '2025-03-25',
        location: '복지관 2층 강당'
    },
    {
        category: '일반',
        no: 8,
        programName: '영화감상회',
        participantCount: 30,
        male: 12,
        female: 18,
        sessionCount: 8,
        totalTime: 240,
        startDate: '2025-01-15',
        endDate: '2025-03-29',
        location: '복지관 1층 시청각실'
    },
    {
        category: '일반',
        no: 9,
        programName: '컴퓨터교실',
        participantCount: 15,
        male: 8,
        female: 7,
        sessionCount: 10,
        totalTime: 300,
        startDate: '2025-01-10',
        endDate: '2025-03-27',
        location: '복지관 3층 컴퓨터실'
    },
    {
        category: '일반',
        no: 10,
        programName: '원예교실',
        participantCount: 12,
        male: 4,
        female: 8,
        sessionCount: 10,
        totalTime: 300,
        startDate: '2025-01-12',
        endDate: '2025-03-26',
        location: '복지관 옥상 정원'
    },
    {
        category: '일반',
        no: 11,
        programName: '요가교실',
        participantCount: 22,
        male: 6,
        female: 16,
        sessionCount: 13,
        totalTime: 390,
        startDate: '2025-01-06',
        endDate: '2025-03-31',
        location: '복지관 2층 강당'
    },
    {
        category: '일반',
        no: 12,
        programName: '서예교실',
        participantCount: 18,
        male: 8,
        female: 10,
        sessionCount: 11,
        totalTime: 330,
        startDate: '2025-01-08',
        endDate: '2025-03-28',
        location: '복지관 3층 문화실'
    },
    {
        category: '일반',
        no: 13,
        programName: '한글교실',
        participantCount: 15,
        male: 5,
        female: 10,
        sessionCount: 14,
        totalTime: 420,
        startDate: '2025-01-04',
        endDate: '2025-03-30',
        location: '복지관 3층 교육실'
    },
    {
        category: '일반',
        no: 14,
        programName: '악기교실',
        participantCount: 20,
        male: 9,
        female: 11,
        sessionCount: 12,
        totalTime: 360,
        startDate: '2025-01-07',
        endDate: '2025-03-27',
        location: '복지관 2층 음악실'
    },
    {
        category: '일반',
        no: 15,
        programName: '독서모임',
        participantCount: 25,
        male: 10,
        female: 15,
        sessionCount: 9,
        totalTime: 270,
        startDate: '2025-01-13',
        endDate: '2025-03-29',
        location: '복지관 도서관'
    },
    {
        category: '중점',
        no: 16,
        programName: '건강체조프로그램(고급)',
        participantCount: 10,
        male: 4,
        female: 6,
        sessionCount: 15,
        totalTime: 450,
        startDate: '2025-01-02',
        endDate: '2025-03-31',
        location: '복지관 운동장'
    },
    {
        category: '중점',
        no: 17,
        programName: '인지재활프로그램',
        participantCount: 8,
        male: 3,
        female: 5,
        sessionCount: 16,
        totalTime: 480,
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        location: '복지관 2층 재활실'
    }
];

// 전역 변수
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // 1-12
let summaryGridInitialized = false;
let detailGridInitialized = false;
let programName = '';

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
        programName = document.getElementById('group-program-name').value.trim();
        loadData();
    });
    
    document.getElementById('group-program-name').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            programName = document.getElementById('group-program-name').value.trim();
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
        '분류', '프로그램수', '참여인원', '남', '여', '회기수', '총시간(분)'
    ];
    
    const colModel = [
        { name: 'category', index: 'category', width: 150, sortable: false, align: 'center' },
        { name: 'programCount', index: 'programCount', width: 180, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'participantCount', index: 'participantCount', width: 180, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'male', index: 'male', width: 150, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'female', index: 'female', width: 150, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'sessionCount', index: 'sessionCount', width: 180, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'totalTime', index: 'totalTime', width: 200, sortable: false, align: 'right', formatter: 'integer' }
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
        autowidth: false,
        shrinkToFit: true,
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
        '분류', 'No', '단체프로그램명', '참여인원', '남', '여', '회기수', '총시간(분)', '시작일', '종료일', '장소'
    ];
    
    const colModel = [
        { name: 'category', index: 'category', width: 120, sortable: false, align: 'center' },
        { name: 'no', index: 'no', width: 80, sortable: false, align: 'center', formatter: 'integer' },
        { name: 'programName', index: 'programName', width: 350, sortable: true, align: 'left' },
        { name: 'participantCount', index: 'participantCount', width: 150, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'male', index: 'male', width: 120, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'female', index: 'female', width: 120, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'sessionCount', index: 'sessionCount', width: 150, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'totalTime', index: 'totalTime', width: 180, sortable: false, align: 'right', formatter: 'integer' },
        { name: 'startDate', index: 'startDate', width: 150, sortable: false, align: 'center' },
        { name: 'endDate', index: 'endDate', width: 150, sortable: false, align: 'center' },
        { name: 'location', index: 'location', width: 300, sortable: false, align: 'left' }
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
        autowidth: false,
        shrinkToFit: true,
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
        const name = programName;
        
        let summaryResult = [];
        let detailResult = [];
        
        if (dev) {
            // 개발 모드: 샘플 데이터 사용
            summaryResult = [...summaryData];
            detailResult = [...detailData];
            
            // 단체프로그램명 필터링
            if (name) {
                detailResult = detailResult.filter(item => item.programName.includes(name));
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
            
            const result = await callPageQuery('group-program-status', 'Q010', params);
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
        const headers = ['분류', 'No', '단체프로그램명', '참여인원', '남', '여', '회기수', '총시간(분)', '시작일', '종료일', '장소'];
        csv += headers.join(',') + '\n';
        
        // 데이터
        gridData.forEach(row => {
            const rowData = [
                row.category || '',
                row.no || '',
                row.programName || '',
                row.participantCount || '',
                row.male || '',
                row.female || '',
                row.sessionCount || '',
                row.totalTime || '',
                row.startDate || '',
                row.endDate || '',
                row.location || ''
            ];
            csv += rowData.join(',') + '\n';
        });
        
        // 파일 다운로드
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `단체프로그램_서비스현황_${year}년${month}월.csv`);
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
