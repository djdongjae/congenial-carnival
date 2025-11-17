// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleData = [
    {
        socialWorker: '강정주',
        supporter: '권기숙',
        workDays: 10,
        workHours: 55.2,
        dailyHours: {
            '1': 5.5, '2': 5.5, '3': 5.5, '4': 5.5, '5': 5.5,
            '6': 5.5, '7': 5.5, '8': 5.5, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '김기경',
        workDays: 11,
        workHours: 61.1,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '김인경',
        workDays: 10,
        workHours: 56.7,
        dailyHours: {
            '1': 5.7, '2': 5.7, '3': 5.7, '4': 5.7, '5': 5.7,
            '6': 5.7, '7': 5.7, '8': 5.7, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '김정희',
        workDays: 10,
        workHours: 55.5,
        dailyHours: {
            '1': 5.5, '2': 5.5, '3': 5.5, '4': 5.5, '5': 5.5,
            '6': 5.5, '7': 5.5, '8': 5.5, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '김창회',
        workDays: 10,
        workHours: 55.8,
        dailyHours: {
            '1': 5.5, '2': 5.5, '3': 5.5, '4': 5.5, '5': 5.5,
            '6': 5.5, '7': 5.5, '8': 5.5, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '배소정',
        workDays: 10,
        workHours: 57.1,
        dailyHours: {
            '1': 5.9, '2': 5.9, '3': 5.9, '4': 5.9, '5': 5.9,
            '6': 5.9, '7': 5.9, '8': 5.9, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '강정주',
        supporter: '오윤아',
        workDays: 10,
        workHours: 56.0,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '김철수',
        supporter: '이미경',
        workDays: 12,
        workHours: 67.2,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 5.6, '10': 5.6,
            '11': 5.6, '12': 5.6, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '김철수',
        supporter: '박정희',
        workDays: 11,
        workHours: 61.6,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 5.6, '10': 5.6,
            '11': 5.6, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '이영희',
        supporter: '최수진',
        workDays: 9,
        workHours: 50.4,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 5.6, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '이영희',
        supporter: '정미라',
        workDays: 13,
        workHours: 72.8,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 5.6, '10': 5.6,
            '11': 5.6, '12': 5.6, '13': 5.6, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    },
    {
        socialWorker: '이영희',
        supporter: '홍영숙',
        workDays: 10,
        workHours: 56.0,
        dailyHours: {
            '1': 5.6, '2': 5.6, '3': 5.6, '4': 5.6, '5': 5.6,
            '6': 5.6, '7': 5.6, '8': 5.6, '9': 0, '10': 0,
            '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 0,
            '21': 0, '22': 0, '23': 0, '24': 0, '25': 0,
            '26': 0, '27': 0, '28': 0, '29': 0, '30': 0
        }
    }
];

// 전역 변수
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // 1-12
let gridInitialized = false;

// 페이지 초기화 함수
function initPage() {
    initializeMonthButtons();
    initializeEventListeners();
    loadFilterOptions();
    initGrid();
}

// 월 버튼 초기화
function initializeMonthButtons() {
    const monthSelector = document.getElementById('month-selector');
    monthSelector.innerHTML = '';
    
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', 
                       '7월', '8월', '9월', '10월', '11월', '12월'];
    
    monthNames.forEach((monthName, index) => {
        const monthBtn = document.createElement('button');
        monthBtn.className = 'month-btn';
        monthBtn.textContent = monthName;
        monthBtn.dataset.month = index + 1;
        
        if (index + 1 === currentMonth) {
            monthBtn.classList.add('active');
        }
        
        monthBtn.addEventListener('click', () => {
            // 모든 월 버튼에서 active 클래스 제거
            document.querySelectorAll('.month-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // 선택된 버튼에 active 클래스 추가
            monthBtn.classList.add('active');
            currentMonth = index + 1;
            loadData();
        });
        
        monthSelector.appendChild(monthBtn);
    });
}

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 년도 이동 버튼
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
    
    // 필터 변경 이벤트
    document.getElementById('social-worker-filter').addEventListener('change', () => {
        loadData();
        updateSupporterFilter();
    });
    
    document.getElementById('supporter-filter').addEventListener('change', () => {
        loadData();
    });
    
    // EXCEL 내보내기 버튼
    document.getElementById('excel-export').addEventListener('click', exportToExcel);
}

// 년도 표시 업데이트
function updateYearDisplay() {
    document.getElementById('current-year').textContent = currentYear;
}

// 필터 옵션 로드
function loadFilterOptions() {
    // 전담사회복지사 옵션 로드 (샘플)
    const socialWorkerSelect = document.getElementById('social-worker-filter');
    const socialWorkers = ['전체', '강정주', '김철수', '이영희'];
    
    socialWorkers.forEach(worker => {
        const option = document.createElement('option');
        option.value = worker;
        option.textContent = worker;
        socialWorkerSelect.appendChild(option);
    });
    
    updateSupporterFilter();
}

// 지원사 필터 업데이트
function updateSupporterFilter() {
    const socialWorker = document.getElementById('social-worker-filter').value;
    const supporterSelect = document.getElementById('supporter-filter');
    
    // 기존 옵션 제거 (전체 제외)
    supporterSelect.innerHTML = '<option value="">전체</option>';
    
    // 선택된 사회복지사에 해당하는 지원사만 필터링
    const filteredSupporters = sampleData
        .filter(item => !socialWorker || item.socialWorker === socialWorker)
        .map(item => item.supporter)
        .filter((value, index, self) => self.indexOf(value) === index); // 중복 제거
    
    filteredSupporters.forEach(supporter => {
        const option = document.createElement('option');
        option.value = supporter;
        option.textContent = supporter;
        supporterSelect.appendChild(option);
    });
}

// 그리드 초기화 (life-support-worker.js 스타일)
function initGrid() {
    try {
        if (gridInitialized) {
            // 이미 초기화된 경우 그리드 재구성
            loadData();
            return;
        }
        
        gridInitialized = true;
        loadData();
    } catch (e) {
        console.error('그리드 초기화 중 오류:', e);
        showError('그리드 초기화 중 오류가 발생했습니다.');
    }
}

// 동적 컬럼 모델 생성
function createColumnModel(month) {
    const colNames = ['사회복지사', '지원사', '근무일수', '근무시간'];
    const colModel = [
        { name: 'socialWorker', index: 'socialWorker', width: 130, sortable: true, search: true, searchoptions: { sopt: ['cn'] }, align: 'center' },
        { name: 'supporter', index: 'supporter', width: 110, sortable: true, search: true, searchoptions: { sopt: ['cn'] }, align: 'center' },
        { name: 'workDays', index: 'workDays', width: 90, sortable: true, sorttype: "int", align: 'center' },
        { name: 'workHours', index: 'workHours', width: 110, sortable: true, sorttype: "float", align: 'center' }
    ];
    
    // 날짜 컬럼 추가
    const daysInMonth = new Date(currentYear, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString();
        colNames.push(dayStr);
        colModel.push({
            name: 'day' + dayStr,
            index: 'day' + dayStr,
            width: 50,
            sortable: false,
            align: 'center',
            formatter: function(cellvalue) {
                return cellvalue && cellvalue > 0 ? cellvalue : '';
            }
        });
    }
    
    return { colNames, colModel };
}

// 데이터 로드
async function loadData() {
    try {
        const year = currentYear;
        const month = currentMonth;
        const socialWorker = document.getElementById('social-worker-filter').value;
        const supporter = document.getElementById('supporter-filter').value;
        
        let data;
        
        if (dev) {
            // 개발 모드: 샘플 데이터 사용
            data = sampleData.filter(item => {
                if (socialWorker && item.socialWorker !== socialWorker) return false;
                if (supporter && item.supporter !== supporter) return false;
                return true;
            });
        } else {
            // 실제 API 호출
            const params = {
                '1': year.toString(),
                '2': month.toString(),
                '3': socialWorker || '',
                '4': supporter || ''
            };
            
            const result = await callPageQuery('monthly-work-status', 'Q010', params);
            data = result?.results?.[0]?.selectResults || [];
        }
        
        renderGrid(data, month);
    } catch (error) {
        console.error('데이터 로드 중 오류:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// 그리드 렌더링
function renderGrid(data, month) {
    try {
        const { colNames, colModel } = createColumnModel(month);
        
        // 데이터 변환 (일별 근무시간을 컬럼으로 변환)
        const gridData = data.map((item, index) => {
            const rowData = {
                id: index + 1,
                socialWorker: item.socialWorker || '',
                supporter: item.supporter || '',
                workDays: item.workDays || 0,
                workHours: item.workHours || 0
            };
            
            // 일별 근무시간 추가
            const daysInMonth = new Date(currentYear, month, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayStr = day.toString();
                rowData['day' + dayStr] = item.dailyHours?.[dayStr] || 0;
            }
            
            return rowData;
        });
        
        if (!gridInitialized || !$('#WorkStatusGrid').jqGrid) {
            // 그리드 초기화
            $('#WorkStatusGrid').jqGrid({
                datatype: 'local',
                data: gridData,
                colNames: colNames,
                colModel: colModel,
                rowNum: 20,
                rowList: [10, 20, 30, 50],
                pager: '#WorkStatusPager',
                sortname: 'supporter',
                sortorder: 'asc',
                viewrecords: true,
                caption: '',
                height: 'auto',
                width: '100%',
                autowidth: true,
                shrinkToFit: false,
                editurl: '',
                cellEdit: false,
                multiselect: false,
                scroll: true,
                scrollrows: false,
                scrollTimeout: 20,
                gridComplete: function() {
                    $('#WorkStatusGrid').find('td, th').css({
                        'padding': '10px 8px',
                        'font-size': '13px',
                        'border': '1px solid #dee2e6'
                    });
                    $('#WorkStatusGrid').find('th').css({
                        'background-color': '#f8f9fa',
                        'font-weight': '600',
                        'color': '#333'
                    });
                    $('#WorkStatusGrid').find('tr').hover(
                        function() { $(this).css('background-color', '#f8f9fa'); },
                        function() { $(this).css('background-color', ''); }
                    );
                },
                loadComplete: function(data) {
                    setTimeout(() => {
                        $('#WorkStatusGrid').find('td, th').css({
                            'padding': '10px 8px',
                            'font-size': '13px',
                            'border': '1px solid #dee2e6'
                        });
                    }, 100);
                }
            });
            
            $('#WorkStatusGrid').jqGrid('navGrid', '#WorkStatusPager', {
                edit: false,
                add: false,
                del: false,
                search: true,
                refresh: true,
                view: false,
                position: "left",
                cloneToTop: false
            });
            
            $('#WorkStatusGrid').jqGrid('filterToolbar', {
                searchOnEnter: true,
                defaultSearch: "cn"
            });
            
            // grid-container의 실제 너비에 맞춰 그리드 너비 설정
            setTimeout(() => {
                const gridContainer = $('#WorkStatusGrid').closest('.grid-container');
                if (gridContainer.length > 0) {
                    const containerWidth = gridContainer.width();
                    if (containerWidth > 0) {
                        $('#WorkStatusGrid').jqGrid('setGridWidth', containerWidth, false);
                    }
                }
            }, 200);
            
            // 창 크기 변경 시에도 그리드 너비 재조정
            $(window).on('resize', function() {
                setTimeout(() => {
                    const gridContainer = $('#WorkStatusGrid').closest('.grid-container');
                    if (gridContainer.length > 0) {
                        const containerWidth = gridContainer.width();
                        if (containerWidth > 0) {
                            $('#WorkStatusGrid').jqGrid('setGridWidth', containerWidth, false);
                        }
                    }
                }, 100);
            });
        } else {
            // 그리드 재구성 (컬럼 변경)
            $('#WorkStatusGrid').jqGrid('GridUnload');
            gridInitialized = false;
            renderGrid(data, month);
            return;
        }
        
        // 데이터 설정
        if (gridData.length > 0) {
            $('#WorkStatusGrid').jqGrid('clearGridData');
            $('#WorkStatusGrid').jqGrid('setGridParam', { data: gridData });
            $('#WorkStatusGrid').trigger('reloadGrid');
        } else {
            $('#WorkStatusGrid').jqGrid('clearGridData');
        }
        
    } catch (e) {
        console.error('그리드 렌더링 중 오류:', e);
        showError('그리드 렌더링 중 오류가 발생했습니다.');
    }
}

// EXCEL 내보내기
function exportToExcel() {
    try {
        // 그리드에서 데이터 가져오기
        const gridData = $('#WorkStatusGrid').jqGrid('getRowData');
        
        if (gridData.length === 0) {
            alert('내보낼 데이터가 없습니다.');
            return;
        }
        
        // CSV 형식으로 변환
        let csv = '';
        
        // 헤더
        const colNames = [];
        const colModel = $('#WorkStatusGrid').jqGrid('getGridParam', 'colModel');
        colModel.forEach(col => {
            colNames.push(col.name);
        });
        
        // 컬럼명을 표시명으로 변환
        const colNamesDisplay = [];
        colModel.forEach((col, index) => {
            const colNamesArray = $('#WorkStatusGrid').jqGrid('getGridParam', 'colNames');
            colNamesDisplay.push(colNamesArray[index] || col.name);
        });
        
        csv += colNamesDisplay.join(',') + '\n';
        
        // 데이터 행
        gridData.forEach(row => {
            const rowData = colNames.map(colName => {
                const value = row[colName] || '';
                const text = String(value).trim();
                // 쉼표나 따옴표가 있으면 따옴표로 감싸기
                return text.includes(',') || text.includes('"') 
                    ? `"${text.replace(/"/g, '""')}"` 
                    : text;
            });
            csv += rowData.join(',') + '\n';
        });
        
        // BOM 추가 (한글 깨짐 방지)
        const BOM = '\uFEFF';
        csv = BOM + csv;
        
        // Blob 생성 및 다운로드
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `지원사별_월근무현황_${currentYear}년${currentMonth}월.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('EXCEL 파일이 다운로드되었습니다.');
    } catch (error) {
        console.error('EXCEL 내보내기 중 오류:', error);
        alert('EXCEL 내보내기 중 오류가 발생했습니다.');
    }
}

// 전역 함수로 노출
window.initPage = initPage;
