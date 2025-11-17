// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의 (이미지 순서대로 정확히 재배열)
const sampleData = [
    // 생활교육 > 정신건강분야 (이미지에서 첫 번째로 보임)
    {
        category: '생활교육',
        item: '정신건강분야',
        subItem: '',
        no: 5,
        detailItem: '인지활동프로그램',
        caseTotal: 207,
        casePriority: 9,
        caseGeneral: 198,
        caseUrgent: 0,
        beneficiaryTotal: 98,
        beneficiaryPriority: 4,
        beneficiaryGeneral: 94,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '생활교육',
        item: '정신건강분야',
        subItem: '',
        no: '',
        detailItem: '관 소계',
        caseTotal: 207,
        casePriority: 9,
        caseGeneral: 198,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 3.61,
        rowType: 'category-subtotal'
    },
    // 안전지원 > 방문 안전지원
    {
        category: '안전지원',
        item: '방문 안전지원',
        subItem: '',
        no: 1,
        detailItem: '방문-안전.안부+말벗+생활안전점검+정보제공',
        caseTotal: 1243,
        casePriority: 0,
        caseGeneral: 1243,
        caseUrgent: 0,
        beneficiaryTotal: 551,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 551,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '안전지원',
        item: '방문 안전지원',
        subItem: '',
        no: 2,
        detailItem: '방문-안전.안부+말벗+정보제공',
        caseTotal: 4,
        casePriority: 0,
        caseGeneral: 4,
        caseUrgent: 0,
        beneficiaryTotal: 2,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 2,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '안전지원',
        item: '방문 안전지원',
        subItem: '항 소계',
        no: '',
        detailItem: '항 소계',
        caseTotal: 1247,
        casePriority: 0,
        caseGeneral: 1247,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 21.72,
        rowType: 'item-subtotal'
    },
    // 안전지원 > 전화 안전지원
    {
        category: '안전지원',
        item: '전화 안전지원',
        subItem: '',
        no: 3,
        detailItem: '전화-안전.안부+정보제공',
        caseTotal: 3,
        casePriority: 2,
        caseGeneral: 1,
        caseUrgent: 0,
        beneficiaryTotal: 3,
        beneficiaryPriority: 2,
        beneficiaryGeneral: 1,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '안전지원',
        item: '전화 안전지원',
        subItem: '',
        no: 4,
        detailItem: '전화-안전.안부+정보제공+말벗',
        caseTotal: 2921,
        casePriority: 135,
        caseGeneral: 2786,
        caseUrgent: 0,
        beneficiaryTotal: 688,
        beneficiaryPriority: 41,
        beneficiaryGeneral: 647,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '안전지원',
        item: '전화 안전지원',
        subItem: '항 소계',
        no: '',
        detailItem: '항 소계',
        caseTotal: 2924,
        casePriority: 137,
        caseGeneral: 2787,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 50.94,
        rowType: 'item-subtotal'
    },
    // 안전지원 전체 관 소계
    {
        category: '안전지원',
        item: '관 소계',
        subItem: '',
        no: '',
        detailItem: '관 소계',
        caseTotal: 4171,
        casePriority: 137,
        caseGeneral: 4034,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 72.67,
        rowType: 'category-subtotal'
    },
    // 일상생활지원 > 방문 일상생활지원
    {
        category: '일상생활지원',
        item: '방문 일상생활지원',
        subItem: '',
        no: 6,
        detailItem: '방문-일상생활 지원, 청소 보조',
        caseTotal: 156,
        casePriority: 135,
        caseGeneral: 21,
        caseUrgent: 0,
        beneficiaryTotal: 78,
        beneficiaryPriority: 68,
        beneficiaryGeneral: 10,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '일상생활지원',
        item: '방문 일상생활지원',
        subItem: '',
        no: 7,
        detailItem: '방문-일상생활 지원, 식사 보조',
        caseTotal: 50,
        casePriority: 47,
        caseGeneral: 3,
        caseUrgent: 0,
        beneficiaryTotal: 25,
        beneficiaryPriority: 23,
        beneficiaryGeneral: 2,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '일상생활지원',
        item: '방문 일상생활지원',
        subItem: '항 소계',
        no: '',
        detailItem: '항 소계',
        caseTotal: 206,
        casePriority: 182,
        caseGeneral: 24,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 3.59,
        rowType: 'item-subtotal'
    },
    // 일상생활지원 전체 관 소계
    {
        category: '일상생활지원',
        item: '관 소계',
        subItem: '',
        no: '',
        detailItem: '관 소계',
        caseTotal: 206,
        casePriority: 182,
        caseGeneral: 24,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 3.59,
        rowType: 'category-subtotal'
    },
    // 사회참여 > 방문 사회참여
    {
        category: '사회참여',
        item: '방문 사회참여',
        subItem: '',
        no: 8,
        detailItem: '민지들프로그램-그룹 활동 참여',
        caseTotal: 145,
        casePriority: 8,
        caseGeneral: 137,
        caseUrgent: 0,
        beneficiaryTotal: 48,
        beneficiaryPriority: 3,
        beneficiaryGeneral: 45,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '사회참여',
        item: '방문 사회참여',
        subItem: '',
        no: 9,
        detailItem: '바둑교실-그룹 활동 참여',
        caseTotal: 62,
        casePriority: 1,
        caseGeneral: 61,
        caseUrgent: 0,
        beneficiaryTotal: 31,
        beneficiaryPriority: 1,
        beneficiaryGeneral: 30,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '사회참여',
        item: '방문 사회참여',
        subItem: '항 소계',
        no: '',
        detailItem: '항 소계',
        caseTotal: 207,
        casePriority: 9,
        caseGeneral: 198,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 3.61,
        rowType: 'item-subtotal'
    },
    // 사회참여 전체 관 소계
    {
        category: '사회참여',
        item: '관 소계',
        subItem: '',
        no: '',
        detailItem: '관 소계',
        caseTotal: 207,
        casePriority: 9,
        caseGeneral: 198,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 3.61,
        rowType: 'category-subtotal'
    },
    // 건강관리 > 방문 건강관리
    {
        category: '건강관리',
        item: '방문 건강관리',
        subItem: '',
        no: 10,
        detailItem: '건강관리-건강상태 점검 및 관리',
        caseTotal: 98,
        casePriority: 85,
        caseGeneral: 13,
        caseUrgent: 0,
        beneficiaryTotal: 49,
        beneficiaryPriority: 43,
        beneficiaryGeneral: 6,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '건강관리',
        item: '방문 건강관리',
        subItem: '',
        no: 11,
        detailItem: '건강관리-약 복용 확인 및 관리',
        caseTotal: 45,
        casePriority: 38,
        caseGeneral: 7,
        caseUrgent: 0,
        beneficiaryTotal: 23,
        beneficiaryPriority: 19,
        beneficiaryGeneral: 4,
        beneficiaryUrgent: 0,
        rowType: 'detail'
    },
    {
        category: '건강관리',
        item: '방문 건강관리',
        subItem: '항 소계',
        no: '',
        detailItem: '항 소계',
        caseTotal: 143,
        casePriority: 123,
        caseGeneral: 20,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 2.49,
        rowType: 'item-subtotal'
    },
    // 건강관리 전체 관 소계
    {
        category: '건강관리',
        item: '관 소계',
        subItem: '',
        no: '',
        detailItem: '관 소계',
        caseTotal: 143,
        casePriority: 123,
        caseGeneral: 20,
        caseUrgent: 0,
        beneficiaryTotal: 0,
        beneficiaryPriority: 0,
        beneficiaryGeneral: 0,
        beneficiaryUrgent: 0,
        serviceRatio: 2.49,
        rowType: 'category-subtotal'
    }
];

// 전역 변수
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // 1-12
let gridInitialized = false;
let currentCategory = 'performance'; // 'plan' or 'performance'

// 페이지 초기화 함수
function initPage() {
    initializeMonthButtons();
    initializeEventListeners();
    updateYearDisplay();
    loadData(); // 데이터 로드
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
    
    // 구분 라디오 버튼
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', () => {
            currentCategory = radio.value;
            loadData();
        });
    });
    
    // EXCEL 내보내기 버튼
    document.getElementById('excel-export').addEventListener('click', exportToExcel);
}

// 년도 표시 업데이트
function updateYearDisplay() {
    document.getElementById('current-year').textContent = currentYear;
}

// 데이터 로드
async function loadData() {
    try {
        const year = currentYear;
        const month = currentMonth;
        const category = currentCategory;
        
        let data;
        
        if (dev) {
            // 개발 모드: 샘플 데이터 사용
            data = [...sampleData];
            
            // 전체 합계 계산
            const grandTotal = data.reduce((sum, item) => {
                if (item.rowType === 'detail') {
                    return sum + (parseInt(item.caseTotal) || 0);
                }
                return sum;
            }, 0);
            
            // 전체 합계 행 추가
            data.unshift({
                category: '합계',
                item: '',
                subItem: '',
                no: '',
                detailItem: '합계',
                caseTotal: grandTotal,
                casePriority: data.reduce((sum, item) => sum + (parseInt(item.casePriority) || 0), 0),
                caseGeneral: data.reduce((sum, item) => sum + (parseInt(item.caseGeneral) || 0), 0),
                caseUrgent: 0,
                beneficiaryTotal: 0,
                beneficiaryPriority: 0,
                beneficiaryGeneral: 0,
                beneficiaryUrgent: 0,
                serviceRatio: 100.00,
                rowType: 'grand-total'
            });
            
            // 서비스 비율 계산
            data.forEach(item => {
                if (item.rowType === 'detail' || item.rowType === 'item-subtotal' || item.rowType === 'category-subtotal') {
                    if (item.caseTotal && item.caseTotal > 0 && grandTotal > 0) {
                        item.serviceRatio = parseFloat(((item.caseTotal / grandTotal) * 100).toFixed(2));
                    }
                }
            });
        } else {
            // 실제 API 호출
            const params = {
                '1': year.toString(),
                '2': month.toString(),
                '3': category
            };
            
            const result = await callPageQuery('monthly-service-status', 'Q010', params);
            data = result?.results?.[0]?.selectResults || [];
        }
        
        renderGrid(data);
    } catch (error) {
        console.error('데이터 로드 중 오류:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// 서비스 비율 계산 (간단하게)
function calculateServiceRatio(itemTotal, grandTotal) {
    if (!grandTotal || grandTotal === 0) return 0;
    return parseFloat(((itemTotal / grandTotal) * 100).toFixed(2));
}

// 셀 병합 처리 (관, 항, 목 컬럼)
function mergeCells() {
    try {
        const grid = $('#ServiceStatusGrid');
        const allRows = grid.jqGrid('getRowData');
        
        // No는 첫 번째 컬럼이므로 category는 인덱스 1, item는 인덱스 2, subItem는 인덱스 3
        // 관(category) 컬럼 병합 (인덱스 1)
        mergeColumnCells(grid, 'category', 1);
        
        // 항(item) 컬럼 병합 (인덱스 2)
        mergeColumnCells(grid, 'item', 2);
        
        // 목(subItem) 컬럼 병합 (인덱스 3)
        mergeColumnCells(grid, 'subItem', 3);
        
    } catch (e) {
        console.error('셀 병합 중 오류:', e);
    }
}

// 특정 컬럼의 셀 병합 처리 (개선된 버전)
function mergeColumnCells(grid, columnName, columnIndex) {
    const allRows = grid.jqGrid('getRowData');
    if (!allRows || allRows.length === 0) return;
    
    // 먼저 모든 병합을 제거하고 다시 시작
    grid.find('td').removeAttr('rowspan').show();
    
    let i = 0;
    
    while (i < allRows.length) {
        const currentRow = allRows[i];
        const currentValue = String(currentRow[columnName] || '').trim();
        const currentRowType = currentRow.rowType;
        const currentRowId = currentRow.id || String(i + 1);
        
        // 소계 행이나 전체 합계 행은 건너뛰기
        if (currentRowType === 'grand-total' || currentRowType === 'item-subtotal' || currentRowType === 'category-subtotal') {
            i++;
            continue;
        }
        
        // 현재 값이 비어있으면 건너뛰기
        if (!currentValue || currentValue === '') {
            i++;
            continue;
        }
        
        // 같은 값을 가진 연속된 행 찾기
        let spanCount = 1;
        let j = i + 1;
        
        while (j < allRows.length) {
            const nextRow = allRows[j];
            const nextValue = String(nextRow[columnName] || '').trim();
            const nextRowType = nextRow.rowType;
            
            // 소계 행이나 전체 합계 행이면 중단
            if (nextRowType === 'grand-total' || nextRowType === 'item-subtotal' || nextRowType === 'category-subtotal') {
                break;
            }
            
            // 값이 같으면 병합 대상
            if (nextValue === currentValue && nextValue !== '') {
                spanCount++;
            } else {
                break;
            }
            j++;
        }
        
        // 병합이 필요한 경우 (2개 이상)
        if (spanCount > 1) {
            const firstRowElement = grid.find('tr#' + currentRowId);
            
            if (firstRowElement.length > 0) {
                const firstCell = firstRowElement.find('td').eq(columnIndex);
                
                if (firstCell.length > 0 && !firstCell.attr('rowspan')) {
                    // rowspan 속성 추가
                    firstCell.attr('rowspan', spanCount);
                    
                    // 병합된 셀의 스타일 조정
                    firstCell.css({
                        'vertical-align': 'middle',
                        'text-align': 'center'
                    });
                    
                    // 나머지 행의 해당 셀 숨기기
                    for (let k = 1; k < spanCount; k++) {
                        const nextIndex = i + k;
                        if (nextIndex < allRows.length) {
                            const nextRowId = allRows[nextIndex].id || String(nextIndex + 1);
                            const nextRowElement = grid.find('tr#' + nextRowId);
                            if (nextRowElement.length > 0) {
                                const cell = nextRowElement.find('td').eq(columnIndex);
                                if (cell.length > 0) {
                                    cell.hide();
                                }
                            }
                        }
                    }
                }
            }
        }
        
        i += spanCount;
    }
}

// 그리드 렌더링
function renderGrid(data) {
    try {
        const colNames = [
            'No', '관', '항', '목', '제목',
            '계', '중점', '일반', '긴급',  // 대상자 유형별 건수
            '계', '중점', '일반', '긴급',  // 대상자 유형별 대상자수
            '서비스 비율(%)'
        ];
        
        const colModel = [
            { name: 'no', index: 'no', width: 60, sortable: false, align: 'center', 
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.rowType === 'grand-total' || rowObject.rowType === 'item-subtotal' || rowObject.rowType === 'category-subtotal') return '';
                    return cellvalue || '';
                }
            },
            { name: 'category', index: 'category', width: 120, sortable: false, align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.rowType === 'grand-total') return cellvalue || '';
                    if (rowObject.rowType === 'category-subtotal') return cellvalue || '';
                    return cellvalue || '';
                }
            },
            { name: 'item', index: 'item', width: 150, sortable: false, align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.rowType === 'grand-total') return '';
                    if (rowObject.rowType === 'category-subtotal' && cellvalue === '관 소계') return '';
                    if (rowObject.rowType === 'item-subtotal' && cellvalue === '관 소계') return '';
                    if (rowObject.rowType === 'item-subtotal' && cellvalue === '항 소계') return '';
                    return cellvalue || '';
                }
            },
            { name: 'subItem', index: 'subItem', width: 100, sortable: false, align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.rowType === 'grand-total') return '';
                    if (rowObject.rowType === 'category-subtotal') return '';
                    if (rowObject.rowType === 'item-subtotal' && cellvalue === '항 소계') return '항 소계';
                    return cellvalue || '';
                }
            },
            { name: 'detailItem', index: 'detailItem', width: 300, sortable: true, align: 'left' },
            // 대상자 유형별 건수
            { name: 'caseTotal', index: 'caseTotal', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'casePriority', index: 'casePriority', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'caseGeneral', index: 'caseGeneral', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'caseUrgent', index: 'caseUrgent', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            // 대상자 유형별 대상자수
            { name: 'beneficiaryTotal', index: 'beneficiaryTotal', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'beneficiaryPriority', index: 'beneficiaryPriority', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'beneficiaryGeneral', index: 'beneficiaryGeneral', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            { name: 'beneficiaryUrgent', index: 'beneficiaryUrgent', width: 90, sortable: true, sorttype: "int", align: 'center', formatter: function(cellvalue) { 
                const val = parseInt(cellvalue) || 0;
                return val > 0 ? val.toLocaleString() : ''; 
            }},
            // 서비스 비율
            { name: 'serviceRatio', index: 'serviceRatio', width: 130, sortable: true, sorttype: "float", align: 'center', formatter: function(cellvalue, options, rowObject) {
                // 모든 행에 서비스 비율 표시 (값이 있을 때만)
                if (cellvalue !== undefined && cellvalue !== null && cellvalue !== '' && cellvalue !== 0) {
                    const ratio = parseFloat(cellvalue);
                    if (!isNaN(ratio) && ratio > 0) {
                        return ratio.toFixed(2) + '%';
                    }
                }
                // 0이거나 값이 없으면 빈 문자열 반환
                return '';
            }}
        ];
        
        // 그리드 데이터 변환 (데이터 타입 명확히 지정)
        const gridData = data.map((item, index) => {
            // 숫자 값 변환 (NaN 체크)
            const safeParseInt = (val) => {
                const num = parseInt(val);
                return isNaN(num) ? 0 : num;
            };
            
            const safeParseFloat = (val) => {
                if (val === undefined || val === null || val === '') return null;
                const num = parseFloat(val);
                return isNaN(num) ? null : num;
            };
            
            const rowData = {
                id: index + 1,
                category: String(item.category || ''),
                item: String(item.item || ''),
                subItem: String(item.subItem || ''),
                no: (item.no !== undefined && item.no !== null && item.no !== '') ? String(item.no) : '',
                detailItem: String(item.detailItem || ''),
                caseTotal: safeParseInt(item.caseTotal),
                casePriority: safeParseInt(item.casePriority),
                caseGeneral: safeParseInt(item.caseGeneral),
                caseUrgent: safeParseInt(item.caseUrgent),
                beneficiaryTotal: safeParseInt(item.beneficiaryTotal),
                beneficiaryPriority: safeParseInt(item.beneficiaryPriority),
                beneficiaryGeneral: safeParseInt(item.beneficiaryGeneral),
                beneficiaryUrgent: safeParseInt(item.beneficiaryUrgent),
                serviceRatio: safeParseFloat(item.serviceRatio),
                rowType: String(item.rowType || 'detail')
            };
            
            return rowData;
        });
        
        if (!gridInitialized) {
            // 그리드 초기화
            $('#ServiceStatusGrid').jqGrid({
                datatype: 'local',
                data: gridData,
                colNames: colNames,
                colModel: colModel,
                rowNum: 50,
                rowList: [20, 30, 50, 100],
                pager: '#ServiceStatusPager',
                sortname: '',
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
                    $('#ServiceStatusGrid').find('td, th').css({
                        'padding': '10px 8px',
                        'font-size': '13px',
                        'border': '1px solid #dee2e6'
                    });
                    $('#ServiceStatusGrid').find('th').css({
                        'background-color': '#f8f9fa',
                        'font-weight': '600',
                        'color': '#333'
                    });
                    $('#ServiceStatusGrid').find('tr').hover(
                        function() { $(this).css('background-color', '#f8f9fa'); },
                        function() { 
                            const rowData = $('#ServiceStatusGrid').jqGrid('getRowData', this.id);
                            if (rowData.rowType === 'grand-total' || rowData.rowType === 'item-subtotal' || rowData.rowType === 'category-subtotal') {
                                $(this).css('background-color', '#f0f0f0');
                            } else {
                                $(this).css('background-color', ''); 
                            }
                        }
                    );
                    
                    // 행 타입별 스타일 적용 및 셀 병합
                    setTimeout(() => {
                        const gridData = $('#ServiceStatusGrid').jqGrid('getRowData');
                        gridData.forEach((row, index) => {
                            const rowId = row.id || (index + 1);
                            const rowElement = $('#ServiceStatusGrid').find('tr#' + rowId);
                            if (row.rowType === 'grand-total' || row.rowType === 'item-subtotal' || row.rowType === 'category-subtotal') {
                                rowElement.css({
                                    'background-color': '#f0f0f0',
                                    'font-weight': '600'
                                });
                            }
                        });
                        
                        // 셀 병합 처리 (관, 항, 목 컬럼)
                        mergeCells();
                    }, 150);
                },
                loadComplete: function(data) {
                    setTimeout(() => {
                        $('#ServiceStatusGrid').find('td, th').css({
                            'padding': '10px 8px',
                            'font-size': '13px',
                            'border': '1px solid #dee2e6'
                        });
                    }, 100);
                }
            });
            
            $('#ServiceStatusGrid').jqGrid('navGrid', '#ServiceStatusPager', {
                edit: false,
                add: false,
                del: false,
                search: true,
                refresh: true,
                view: false,
                position: "left",
                cloneToTop: false
            });
            
            $('#ServiceStatusGrid').jqGrid('filterToolbar', {
                searchOnEnter: true,
                defaultSearch: "cn"
            });
            
            // grid-container의 실제 너비에 맞춰 그리드 너비 설정
            setTimeout(() => {
                const gridContainer = $('#ServiceStatusGrid').closest('.grid-container');
                if (gridContainer.length > 0) {
                    const containerWidth = gridContainer.width();
                    if (containerWidth > 0) {
                        $('#ServiceStatusGrid').jqGrid('setGridWidth', containerWidth, false);
                    }
                }
            }, 200);
            
            // 창 크기 변경 시에도 그리드 너비 재조정
            $(window).on('resize', function() {
                setTimeout(() => {
                    const gridContainer = $('#ServiceStatusGrid').closest('.grid-container');
                    if (gridContainer.length > 0) {
                        const containerWidth = gridContainer.width();
                        if (containerWidth > 0) {
                            $('#ServiceStatusGrid').jqGrid('setGridWidth', containerWidth, false);
                        }
                    }
                }, 100);
            });
            
            gridInitialized = true;
        }
        
        // 데이터 설정
        if (gridData.length > 0) {
            if (gridInitialized) {
                $('#ServiceStatusGrid').jqGrid('clearGridData');
                $('#ServiceStatusGrid').jqGrid('setGridParam', { 
                    datatype: 'local',
                    data: gridData 
                });
                $('#ServiceStatusGrid').trigger('reloadGrid');
            }
            // gridInitialized가 false면 이미 위에서 초기화할 때 데이터가 설정됨
        } else {
            $('#ServiceStatusGrid').jqGrid('clearGridData');
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
        const gridData = $('#ServiceStatusGrid').jqGrid('getRowData');
        
        if (gridData.length === 0) {
            alert('내보낼 데이터가 없습니다.');
            return;
        }
        
        // CSV 형식으로 변환
        let csv = '';
        
        // 헤더 (그룹화된 헤더 표현)
        const colNamesArray = $('#ServiceStatusGrid').jqGrid('getGridParam', 'colNames');
        csv += colNamesArray.slice(0, 5).join(',') + ','; // No, 관, 항, 목, 세목
        csv += '"대상자 유형별 건수",,,,,'; // 건수 그룹
        csv += '"대상자 유형별 대상자수",,,,,'; // 대상자수 그룹
        csv += '서비스 비율(%)' + '\n';
        csv += ',,,,,'; // 빈 공간
        csv += '계,중점,일반,긴급,'; // 건수 세부 컬럼
        csv += '계,중점,일반,긴급,'; // 대상자수 세부 컬럼
        csv += '' + '\n';
        
        // 데이터 행
        gridData.forEach(row => {
            const rowData = [
                row.no || '',
                row.category || '',
                row.item || '',
                row.subItem || '',
                row.detailItem || '',
                row.caseTotal || '',
                row.casePriority || '',
                row.caseGeneral || '',
                row.caseUrgent || '',
                row.beneficiaryTotal || '',
                row.beneficiaryPriority || '',
                row.beneficiaryGeneral || '',
                row.beneficiaryUrgent || '',
                row.serviceRatio ? row.serviceRatio + '%' : ''
            ];
            
            const rowString = rowData.map(cell => {
                const text = String(cell).trim();
                return text.includes(',') || text.includes('"') 
                    ? `"${text.replace(/"/g, '""')}"` 
                    : text;
            }).join(',');
            csv += rowString + '\n';
        });
        
        // BOM 추가 (한글 깨짐 방지)
        const BOM = '\uFEFF';
        csv = BOM + csv;
        
        // Blob 생성 및 다운로드
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `서비스현황_월별_${currentYear}년${currentMonth}월_${currentCategory === 'plan' ? '계획' : '실적'}.csv`);
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

