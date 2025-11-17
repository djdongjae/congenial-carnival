// 사후관리 실적등록 페이지

// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 현재 선택된 월/년도
let currentDate = new Date(2025, 8, 1); // 2025년 9월

// 선택된 생활지원사
let selectedWorker = {
    id: 1,
    name: '김영희'
};

// Mock 데이터: 사후관리 대상자
const mockBeneficiaries = [
    { id: 1, no: 1, name: '김현정', birthDate: '55/10/19', gender: '여', status: '사후관리' },
    { id: 2, no: 2, name: '이영숙', birthDate: '48/03/25', gender: '여', status: '사후관리' },
    { id: 3, no: 3, name: '박순자', birthDate: '52/07/12', gender: '여', status: '사후관리' },
    { id: 4, no: 4, name: '최미영', birthDate: '50/11/08', gender: '여', status: '사후관리' },
    { id: 5, no: 5, name: '정수진', birthDate: '47/05/30', gender: '여', status: '사후관리' },
    { id: 6, no: 6, name: '강은희', birthDate: '49/09/15', gender: '여', status: '사후관리' },
    { id: 7, no: 7, name: '윤경희', birthDate: '51/02/20', gender: '여', status: '사후관리' },
    { id: 8, no: 8, name: '임영희', birthDate: '53/06/05', gender: '여', status: '사후관리' }
];

// Mock 데이터: 제공서비스 집계
const mockServiceSummary = [
    { service: '방문', planTime: '120분', planCount: '4회', performanceTime: '115분', performanceCount: '4회' },
    { service: '전화', planTime: '45분', planCount: '9회', performanceTime: '48분', performanceCount: '9회' },
    { service: '덕표연계지원', planTime: '60분', planCount: '2회', performanceTime: '58분', performanceCount: '2회' },
    { service: '민지들프로그램', planTime: '90분', planCount: '3회', performanceTime: '92분', performanceCount: '3회' },
    { service: '상담', planTime: '30분', planCount: '2회', performanceTime: '32분', performanceCount: '2회' },
    { service: '건강관리', planTime: '40분', planCount: '1회', performanceTime: '38분', performanceCount: '1회' }
];

// Mock 데이터: 메모
const mockMemos = [
    { id: 1, no: 1, writeDate: '2025-09-15', writer: '김평행', content: '방문 주 1회로 변경하고, 전화안부 자주 드리기로 함' },
    { id: 2, no: 2, writeDate: '2025-09-12', writer: '이영희', content: '건강 상태 양호. 다음 주 약 복용 확인 필요' },
    { id: 3, no: 3, writeDate: '2025-09-10', writer: '박지원', content: '가족 상담 완료. 추가 지원 서비스 검토 중' },
    { id: 4, no: 4, writeDate: '2025-09-08', writer: '최수진', content: '전화 상담 시 기분 좋아하심. 정기 전화 일정 유지' },
    { id: 5, no: 5, writeDate: '2025-09-05', writer: '정민수', content: '방문 시 외출 가능 상태 확인. 주 2회 방문 권장' },
    { id: 6, no: 6, writeDate: '2025-09-03', writer: '강영호', content: '건강검진 결과 양호. 다음 달 재검 예정' },
    { id: 7, no: 7, writeDate: '2025-09-01', writer: '윤서연', content: '가족 상담 요청. 담당자 변경 필요' }
];

// Mock 데이터: 실적 상세
const mockPerformanceData = [
    { id: 1, date: '2025-09-11', dateDisplay: '2025-09-11 (목)', plan: '10:00~10:05(5분)', providedDate: '2025-09-11', startTime: '09:57', endTime: '10:03', duration: 6, serviceName: '전화 - 안전/안부, 말벗, 정보제공' },
    { id: 2, date: '2025-09-12', dateDisplay: '2025-09-12 (금)', plan: '14:00~14:30(30분)', providedDate: '2025-09-12', startTime: '14:02', endTime: '14:28', duration: 26, serviceName: '방문 - 일상생활 지원, 식사 보조' },
    { id: 3, date: '2025-09-13', dateDisplay: '2025-09-13 (토)', plan: '11:00~11:05(5분)', providedDate: '2025-09-13', startTime: '10:58', endTime: '11:04', duration: 6, serviceName: '전화 - 안전/안부, 말벗' },
    { id: 4, date: '2025-09-14', dateDisplay: '2025-09-14 (일)', plan: '15:00~16:00(60분)', providedDate: '2025-09-14', startTime: '15:05', endTime: '16:02', duration: 57, serviceName: '덕표연계지원 - 상담 및 정보 제공' },
    { id: 5, date: '2025-09-15', dateDisplay: '2025-09-15 (월)', plan: '09:00~10:30(90분)', providedDate: '2025-09-15', startTime: '09:03', endTime: '10:32', duration: 89, serviceName: '민지들프로그램 - 그룹 활동 참여' },
    { id: 6, date: '2025-09-16', dateDisplay: '2025-09-16 (화)', plan: '10:00~10:05(5분)', providedDate: '2025-09-16', startTime: '10:01', endTime: '10:06', duration: 5, serviceName: '전화 - 안전/안부 확인' },
    { id: 7, date: '2025-09-17', dateDisplay: '2025-09-17 (수)', plan: '13:00~13:30(30분)', providedDate: '2025-09-17', startTime: '13:02', endTime: '13:31', duration: 29, serviceName: '방문 - 일상생활 지원, 청소 보조' },
    { id: 8, date: '2025-09-18', dateDisplay: '2025-09-18 (목)', plan: '11:00~11:05(5분)', providedDate: '2025-09-18', startTime: '10:59', endTime: '11:05', duration: 6, serviceName: '전화 - 안전/안부, 정보제공' },
    { id: 9, date: '2025-09-19', dateDisplay: '2025-09-19 (금)', plan: '14:00~15:00(60분)', providedDate: '2025-09-19', startTime: '14:03', endTime: '15:01', duration: 58, serviceName: '상담 - 심리상담 및 정서 지원' },
    { id: 10, date: '2025-09-20', dateDisplay: '2025-09-20 (토)', plan: '10:00~10:40(40분)', providedDate: '2025-09-20', startTime: '10:02', endTime: '10:40', duration: 38, serviceName: '건강관리 - 건강상태 점검 및 관리' },
    { id: 11, date: '2025-09-21', dateDisplay: '2025-09-21 (일)', plan: '11:00~11:05(5분)', providedDate: '2025-09-21', startTime: '11:01', endTime: '11:06', duration: 5, serviceName: '전화 - 안전/안부 확인' },
    { id: 12, date: '2025-09-22', dateDisplay: '2025-09-22 (월)', plan: '15:00~15:30(30분)', providedDate: '2025-09-22', startTime: '15:02', endTime: '15:29', duration: 27, serviceName: '방문 - 일상생활 지원, 식사 보조' },
    { id: 13, date: '2025-09-23', dateDisplay: '2025-09-23 (화)', plan: '10:00~10:05(5분)', providedDate: '2025-09-23', startTime: '10:00', endTime: '10:05', duration: 5, serviceName: '전화 - 안전/안부, 말벗' },
    { id: 14, date: '2025-09-24', dateDisplay: '2025-09-24 (수)', plan: '14:00~15:30(90분)', providedDate: '2025-09-24', startTime: '14:03', endTime: '15:32', duration: 89, serviceName: '민지들프로그램 - 그룹 활동 참여' },
    { id: 15, date: '2025-09-25', dateDisplay: '2025-09-25 (목)', plan: '11:00~11:05(5분)', providedDate: '2025-09-25', startTime: '10:58', endTime: '11:04', duration: 6, serviceName: '전화 - 안전/안부, 정보제공' }
];

// 대상자 그리드 초기화
function initBeneficiaryGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['No', '대상자', '생년월일', '성별', '상태'],
            colModel: [
                { name: 'no', index: 'no', width: 50, sortable: true, align: 'center' },
                { name: 'name', index: 'name', width: 100, sortable: true },
                { name: 'birthDate', index: 'birthDate', width: 100, sortable: true },
                { name: 'gender', index: 'gender', width: 60, align: 'center' },
                { name: 'status', index: 'status', width: 100, align: 'center' }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'no',
            sortorder: "asc",
            viewrecords: true,
            caption: "",
            height: 'auto',
            width: '100%',
            editurl: '',
            cellEdit: false,
            multiselect: false,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            gridComplete: function() {
                $('#BeneficiaryGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#BeneficiaryGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#BeneficiaryGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
            }
        };

        $('#BeneficiaryGrid').jqGrid(gridConfig);
        
        setTimeout(() => {
            const gridContainer = $('#BeneficiaryGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#BeneficiaryGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadBeneficiaryList();
    } catch (e) {
        console.error('대상자 그리드 초기화 중 오류:', e);
        if (typeof showError === 'function') {
            showError('대상자 그리드 초기화 중 오류가 발생했습니다.');
        }
    }
}

// 대상자 목록 로드
function loadBeneficiaryList() {
    try {
        const dataList = mockBeneficiaries.map((item) => ({
            id: item.id,
            no: item.no,
            name: item.name || '',
            birthDate: item.birthDate || '',
            gender: item.gender || '',
            status: item.status || ''
        }));
        
        if (dataList.length > 0) {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
            $('#BeneficiaryGrid').jqGrid('setGridParam', { data: dataList });
            $('#BeneficiaryGrid').trigger('reloadGrid');
        } else {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('대상자 목록 조회 중 오류:', e);
    }
}

// 제공서비스 집계 그리드 초기화
function initServiceSummaryGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['제공서비스', '계획 제공시간', '계획 횟수', '실적 제공시간', '실적 횟수'],
            colModel: [
                { name: 'service', index: 'service', width: 160, sortable: true },
                { 
                    name: 'planTime', 
                    index: 'planTime', 
                    width: 110, 
                    align: 'center',
                    formatter: function(cellvalue) {
                        return cellvalue || '-';
                    }
                },
                { 
                    name: 'planCount', 
                    index: 'planCount', 
                    width: 90, 
                    align: 'center',
                    formatter: function(cellvalue) {
                        return cellvalue || '-';
                    }
                },
                { 
                    name: 'performanceTime', 
                    index: 'performanceTime', 
                    width: 110, 
                    align: 'center',
                    formatter: function(cellvalue) {
                        return cellvalue || '-';
                    }
                },
                { 
                    name: 'performanceCount', 
                    index: 'performanceCount', 
                    width: 90, 
                    align: 'center',
                    formatter: function(cellvalue) {
                        return cellvalue || '-';
                    }
                }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'service',
            sortorder: "asc",
            viewrecords: true,
            caption: "",
            height: 'auto',
            width: '100%',
            editurl: '',
            cellEdit: false,
            multiselect: false,
            gridComplete: function() {
                $('#ServiceSummaryGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#ServiceSummaryGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#ServiceSummaryGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 병합된 헤더 표시
                updateServiceSummaryHeader();
            }
        };

        $('#ServiceSummaryGrid').jqGrid(gridConfig);
        
        setTimeout(() => {
            const gridContainer = $('#ServiceSummaryGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#ServiceSummaryGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadServiceSummary();
    } catch (e) {
        console.error('제공서비스 집계 그리드 초기화 중 오류:', e);
        if (typeof showError === 'function') {
            showError('제공서비스 집계 그리드 초기화 중 오류가 발생했습니다.');
        }
    }
}

// 제공서비스 집계 로드
function loadServiceSummary() {
    try {
        const dataList = mockServiceSummary.map((item, index) => ({
            id: index + 1,
            service: item.service || '',
            planTime: item.planTime || '-',
            planCount: item.planCount || '-',
            performanceTime: item.performanceTime || '-',
            performanceCount: item.performanceCount || '-'
        }));
        
        if (dataList.length > 0) {
            $('#ServiceSummaryGrid').jqGrid('clearGridData');
            $('#ServiceSummaryGrid').jqGrid('setGridParam', { data: dataList });
            $('#ServiceSummaryGrid').trigger('reloadGrid');
        } else {
            $('#ServiceSummaryGrid').jqGrid('clearGridData');
        }
        
        // 헤더 재구성
        setTimeout(() => {
            updateServiceSummaryHeader();
        }, 300);
    } catch (e) {
        console.error('제공서비스 집계 조회 중 오류:', e);
    }
}

// 제공서비스 집계 헤더 업데이트
function updateServiceSummaryHeader() {
    try {
        const grid = $('#ServiceSummaryGrid');
        const headerTable = grid.find('thead');
        
        // 기존 헤더 행 찾기
        const existingRow = headerTable.find('tr').first();
        if (existingRow.length > 0) {
            const existingHeaders = existingRow.find('th');
            
            // 두 번째 헤더 행이 없으면 추가
            if (headerTable.find('tr').length === 1) {
                // 첫 번째 행의 헤더 텍스트 수정 및 병합 속성 추가
                existingHeaders.eq(0).attr('rowspan', '2').text('제공서비스');
                
                // 두 번째 행 추가 (병합된 헤더)
                const row2 = $('<tr></tr>');
                row2.append('<th colspan="2" style="text-align: center; border: 1px solid #dee2e6; background-color: #e9ecef; padding: 10px; font-weight: 600; font-size: 13px;">계획</th>');
                row2.append('<th colspan="2" style="text-align: center; border: 1px solid #dee2e6; background-color: #e9ecef; padding: 10px; font-weight: 600; font-size: 13px;">실적</th>');
                headerTable.append(row2);
                
                // 기존 헤더 텍스트 수정 및 스타일 적용
                existingHeaders.eq(0).css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'font-size': '13px'
                });
                existingHeaders.eq(1).text('제공시간').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'font-size': '13px'
                });
                existingHeaders.eq(2).text('횟수').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'font-size': '13px'
                });
                existingHeaders.eq(3).text('제공시간').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'font-size': '13px'
                });
                existingHeaders.eq(4).text('횟수').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'font-size': '13px'
                });
            }
        }
    } catch (e) {
        console.error('제공서비스 집계 헤더 업데이트 중 오류:', e);
    }
}

// 메모관리 그리드 초기화
function initMemoGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['No', '작성일', '작성자', '내용', '메모', '삭제'],
            colModel: [
                { name: 'no', index: 'no', width: 50, sortable: true, align: 'center' },
                { name: 'writeDate', index: 'writeDate', width: 110, sortable: true, align: 'center' },
                { name: 'writer', index: 'writer', width: 100, sortable: true },
                { name: 'content', index: 'content', width: 220, sortable: true },
                {
                    name: 'memo',
                    index: 'memo',
                    width: 80,
                    align: 'center',
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="btn-memo" data-memo-id="' + rowObject.id + '" style="padding: 4px 12px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">메모</button>';
                    }
                },
                {
                    name: 'delete',
                    index: 'delete',
                    width: 80,
                    align: 'center',
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="btn-delete-memo" data-memo-id="' + rowObject.id + '" style="padding: 4px 12px; background-color: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">삭제</button>';
                    }
                }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'writeDate',
            sortorder: "desc",
            viewrecords: true,
            caption: "",
            height: 'auto',
            width: '100%',
            editurl: '',
            cellEdit: false,
            multiselect: false,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            gridComplete: function() {
                $('#MemoGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#MemoGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#MemoGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 메모 버튼 이벤트
                $('.btn-memo').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const memoId = $(this).data('memo-id');
                    const rowData = $('#MemoGrid').jqGrid('getRowData', memoId);
                    openMemoPopup(rowData);
                });
                
                // 삭제 버튼 이벤트
                $('.btn-delete-memo').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const memoId = $(this).data('memo-id');
                    if (confirm('이 메모를 삭제하시겠습니까?')) {
                        deleteMemo(memoId);
                    }
                });
            }
        };

        $('#MemoGrid').jqGrid(gridConfig);
        
        setTimeout(() => {
            const gridContainer = $('#MemoGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#MemoGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadMemoList();
    } catch (e) {
        console.error('메모관리 그리드 초기화 중 오류:', e);
        if (typeof showError === 'function') {
            showError('메모관리 그리드 초기화 중 오류가 발생했습니다.');
        }
    }
}

// 메모 목록 로드
function loadMemoList() {
    try {
        const dataList = mockMemos.map((item) => ({
            id: item.id,
            no: item.no,
            writeDate: item.writeDate || '',
            writer: item.writer || '',
            content: item.content || ''
        }));
        
        if (dataList.length > 0) {
            $('#MemoGrid').jqGrid('clearGridData');
            $('#MemoGrid').jqGrid('setGridParam', { data: dataList });
            $('#MemoGrid').trigger('reloadGrid');
        } else {
            $('#MemoGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('메모 목록 조회 중 오류:', e);
    }
}

// 메모 팝업 열기
function openMemoPopup(memoData) {
    alert('메모 상세 팝업\n작성일: ' + memoData.writeDate + '\n작성자: ' + memoData.writer + '\n내용: ' + memoData.content);
}

// 메모 삭제
function deleteMemo(memoId) {
    try {
        // 실제로는 API 호출
        if (typeof showMessage === 'function') {
            showMessage('메모가 삭제되었습니다.');
        } else {
            alert('메모가 삭제되었습니다.');
        }
        loadMemoList();
    } catch (e) {
        console.error('메모 삭제 중 오류:', e);
        alert('메모 삭제 중 오류가 발생했습니다.');
    }
}

// 실적 상세 그리드 초기화
function initPerformanceGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['일자', '계획', '제공일', '시작', '종료', '소요(분)', '일지', '서비스명', '권리'],
            colModel: [
                { name: 'dateDisplay', index: 'dateDisplay', width: 130, sortable: true, align: 'center' },
                { name: 'plan', index: 'plan', width: 130, sortable: true, align: 'center' },
                { name: 'providedDate', index: 'providedDate', width: 110, sortable: true, align: 'center' },
                { 
                    name: 'startTime', 
                    index: 'startTime', 
                    width: 90, 
                    align: 'center',
                    editable: true,
                    edittype: 'text',
                    editoptions: {
                        dataInit: function(elem) {
                            $(elem).attr('type', 'time');
                            $(elem).css('width', '100%');
                            $(elem).css('padding', '4px');
                            $(elem).css('font-size', '13px');
                        }
                    }
                },
                { 
                    name: 'endTime', 
                    index: 'endTime', 
                    width: 90, 
                    align: 'center',
                    editable: true,
                    edittype: 'text',
                    editoptions: {
                        dataInit: function(elem) {
                            $(elem).attr('type', 'time');
                            $(elem).css('width', '100%');
                            $(elem).css('padding', '4px');
                            $(elem).css('font-size', '13px');
                        }
                    }
                },
                { 
                    name: 'duration', 
                    index: 'duration', 
                    width: 90, 
                    align: 'center',
                    formatter: function(cellvalue) {
                        return (cellvalue || '0') + '분';
                    }
                },
                {
                    name: 'log',
                    index: 'log',
                    width: 70,
                    align: 'center',
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="btn-work-log" data-performance-id="' + rowObject.id + '" style="padding: 5px 10px; background-color: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; white-space: nowrap;">일지</button>';
                    }
                },
                { 
                    name: 'serviceName', 
                    index: 'serviceName', 
                    width: 280, 
                    sortable: true,
                    editable: true,
                    edittype: 'text',
                    editoptions: {
                        size: 30
                    }
                },
                {
                    name: 'actions',
                    index: 'actions',
                    width: 220,
                    align: 'center',
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">' +
                            '<button class="btn-save-performance" data-performance-id="' + rowObject.id + '" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; white-space: nowrap;">저장</button>' +
                            '<button class="btn-copy-performance" data-performance-id="' + rowObject.id + '" style="padding: 5px 10px; background-color: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; white-space: nowrap;">복사</button>' +
                            '<button class="btn-delete-performance" data-performance-id="' + rowObject.id + '" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; white-space: nowrap;">삭제</button>' +
                            '</div>';
                    }
                }
            ],
            rowNum: 20,
            rowList: [10, 20, 30, 50],
            pager: '#PerformancePager',
            sortname: 'dateDisplay',
            sortorder: "desc",
            viewrecords: true,
            caption: "",
            height: 'auto',
            width: '100%',
            editurl: '',
            cellEdit: false,
            multiselect: false,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            gridComplete: function() {
                $('#PerformanceGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#PerformanceGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#PerformanceGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 일지 버튼 이벤트
                $('.btn-work-log').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const performanceId = $(this).data('performance-id');
                    const rowData = $('#PerformanceGrid').jqGrid('getRowData', performanceId);
                    openWorkLogPopup(rowData);
                });
                
                // 저장 버튼 이벤트
                $('.btn-save-performance').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const performanceId = $(this).data('performance-id');
                    const rowData = $('#PerformanceGrid').jqGrid('getRowData', performanceId);
                    savePerformance(performanceId, rowData);
                });
                
                // 복사 버튼 이벤트
                $('.btn-copy-performance').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const performanceId = $(this).data('performance-id');
                    copyPerformance(performanceId);
                });
                
                // 삭제 버튼 이벤트
                $('.btn-delete-performance').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const performanceId = $(this).data('performance-id');
                    if (confirm('이 실적을 삭제하시겠습니까?')) {
                        deletePerformance(performanceId);
                    }
                });
            }
        };

        $('#PerformanceGrid').jqGrid(gridConfig);
        
        $('#PerformanceGrid').jqGrid('navGrid', '#PerformancePager', {
            edit: false,
            add: false,
            del: false,
            search: true,
            refresh: true,
            view: false,
            position: "left",
            cloneToTop: false
        });

        setTimeout(() => {
            const gridContainer = $('#PerformanceGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#PerformanceGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadPerformanceList();
    } catch (e) {
        console.error('실적 상세 그리드 초기화 중 오류:', e);
        if (typeof showError === 'function') {
            showError('실적 상세 그리드 초기화 중 오류가 발생했습니다.');
        }
    }
}

// 실적 목록 로드
function loadPerformanceList() {
    try {
        const dataList = mockPerformanceData.map((item) => ({
            id: item.id,
            dateDisplay: item.dateDisplay || '',
            plan: item.plan || '',
            providedDate: item.providedDate || '',
            startTime: item.startTime || '',
            endTime: item.endTime || '',
            duration: item.duration || 0,
            serviceName: item.serviceName || ''
        }));
        
        if (dataList.length > 0) {
            $('#PerformanceGrid').jqGrid('clearGridData');
            $('#PerformanceGrid').jqGrid('setGridParam', { data: dataList });
            $('#PerformanceGrid').trigger('reloadGrid');
        } else {
            $('#PerformanceGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('실적 목록 조회 중 오류:', e);
    }
}

// 작업일지 팝업 열기
function openWorkLogPopup(performanceData) {
    try {
        const modal = $('#workLogModal');
        const content = $('#workLogContent');
        
        // 작업일지 내용 생성
        let html = '<div style="padding: 20px;">';
        html += '<div style="margin-bottom: 15px;"><strong>일자:</strong> ' + (performanceData.dateDisplay || '') + '</div>';
        html += '<div style="margin-bottom: 15px;"><strong>제공일:</strong> ' + (performanceData.providedDate || '') + '</div>';
        html += '<div style="margin-bottom: 15px;"><strong>서비스명:</strong> ' + (performanceData.serviceName || '') + '</div>';
        html += '<div style="margin-bottom: 15px;"><strong>시간:</strong> ' + (performanceData.startTime || '') + ' ~ ' + (performanceData.endTime || '') + '</div>';
        html += '<div style="margin-bottom: 15px;"><strong>소요시간:</strong> ' + (performanceData.duration || 0) + '분</div>';
        html += '<div style="margin-bottom: 15px;"><strong>작업일지 내용:</strong></div>';
        html += '<textarea id="workLogText" style="width: 100%; min-height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="작업일지 내용을 입력하세요..."></textarea>';
        html += '<div style="margin-top: 15px; text-align: right;">';
        html += '<button id="btnSaveWorkLog" style="padding: 8px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">저장</button>';
        html += '<button id="btnCancelWorkLog" style="padding: 8px 20px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">취소</button>';
        html += '</div>';
        html += '</div>';
        
        content.html(html);
        modal.css('display', 'flex');
        
        // 저장 버튼 이벤트
        $('#btnSaveWorkLog').off('click').on('click', function() {
            const workLogText = $('#workLogText').val();
            // 실제로는 API 호출
            if (typeof showMessage === 'function') {
                showMessage('작업일지가 저장되었습니다.');
            } else {
                alert('작업일지가 저장되었습니다.');
            }
            closeWorkLogPopup();
        });
        
        // 취소 버튼 이벤트
        $('#btnCancelWorkLog').off('click').on('click', function() {
            closeWorkLogPopup();
        });
    } catch (e) {
        console.error('작업일지 팝업 열기 중 오류:', e);
        alert('작업일지 팝업을 열 수 없습니다.');
    }
}

// 작업일지 팝업 닫기
function closeWorkLogPopup() {
    $('#workLogModal').css('display', 'none');
}

// 실적 저장
function savePerformance(performanceId, rowData) {
    try {
        // 시작/종료 시간으로 소요 시간 자동 계산
        if (rowData.startTime && rowData.endTime) {
            const start = parseTime(rowData.startTime);
            const end = parseTime(rowData.endTime);
            const duration = calculateDuration(start, end);
            
            // 그리드에 소요 시간 업데이트
            $('#PerformanceGrid').jqGrid('setCell', performanceId, 'duration', duration);
        }
        
        // 실제로는 API 호출
        if (typeof showMessage === 'function') {
            showMessage('실적이 저장되었습니다.');
        } else {
            alert('실적이 저장되었습니다.');
        }
        
        // 제공서비스 집계 업데이트
        updateServiceSummary();
    } catch (e) {
        console.error('실적 저장 중 오류:', e);
        alert('실적 저장 중 오류가 발생했습니다.');
    }
}

// 시간 파싱 (HH:MM -> 분)
function parseTime(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    return parseInt(parts[0] || 0) * 60 + parseInt(parts[1] || 0);
}

// 시간 차이 계산 (분)
function calculateDuration(start, end) {
    if (end < start) {
        end += 24 * 60; // 다음날로 넘어가는 경우
    }
    return end - start;
}

// 실적 복사
function copyPerformance(performanceId) {
    try {
        const rowData = $('#PerformanceGrid').jqGrid('getRowData', performanceId);
        
        // 새로운 행 추가
        const newRowData = {
            id: 'new_' + Date.now(),
            dateDisplay: rowData.dateDisplay,
            plan: rowData.plan,
            providedDate: rowData.providedDate || '',
            startTime: '',
            endTime: '',
            duration: 0,
            serviceName: rowData.serviceName
        };
        
        $('#PerformanceGrid').jqGrid('addRowData', newRowData.id, newRowData, 'first');
        
        if (typeof showMessage === 'function') {
            showMessage('실적이 복사되었습니다.');
        } else {
            alert('실적이 복사되었습니다.');
        }
    } catch (e) {
        console.error('실적 복사 중 오류:', e);
        alert('실적 복사 중 오류가 발생했습니다.');
    }
}

// 실적 삭제
function deletePerformance(performanceId) {
    try {
        $('#PerformanceGrid').jqGrid('delRowData', performanceId);
        
        if (typeof showMessage === 'function') {
            showMessage('실적이 삭제되었습니다.');
        } else {
            alert('실적이 삭제되었습니다.');
        }
        
        // 제공서비스 집계 업데이트
        updateServiceSummary();
    } catch (e) {
        console.error('실적 삭제 중 오류:', e);
        alert('실적 삭제 중 오류가 발생했습니다.');
    }
}

// 제공서비스 집계 업데이트
function updateServiceSummary() {
    try {
        // 실적 데이터에서 집계 계산
        const allRows = $('#PerformanceGrid').jqGrid('getRowData');
        
        // 서비스별 집계
        const serviceSummary = {};
        allRows.forEach(row => {
            if (row.serviceName && row.duration) {
                const serviceType = getServiceType(row.serviceName);
                if (!serviceSummary[serviceType]) {
                    serviceSummary[serviceType] = { totalTime: 0, count: 0 };
                }
                serviceSummary[serviceType].totalTime += parseInt(row.duration) || 0;
                serviceSummary[serviceType].count += 1;
            }
        });
        
        // 집계 데이터 업데이트
        const serviceSummaryData = mockServiceSummary.map(item => {
            const summary = serviceSummary[item.service] || { totalTime: 0, count: 0 };
            return {
                ...item,
                performanceTime: summary.totalTime > 0 ? summary.totalTime + '분' : '-',
                performanceCount: summary.count > 0 ? summary.count + '회' : '-'
            };
        });
        
        // 그리드 업데이트
        const dataList = serviceSummaryData.map((item, index) => ({
            id: index + 1,
            service: item.service || '',
            planTime: item.planTime || '-',
            planCount: item.planCount || '-',
            performanceTime: item.performanceTime || '-',
            performanceCount: item.performanceCount || '-'
        }));
        
        $('#ServiceSummaryGrid').jqGrid('clearGridData');
        $('#ServiceSummaryGrid').jqGrid('setGridParam', { data: dataList });
        $('#ServiceSummaryGrid').trigger('reloadGrid');
        
        setTimeout(() => {
            updateServiceSummaryHeader();
        }, 200);
    } catch (e) {
        console.error('제공서비스 집계 업데이트 중 오류:', e);
    }
}

// 서비스명에서 서비스 유형 추출
function getServiceType(serviceName) {
    if (!serviceName) return '';
    if (serviceName.includes('전화')) return '전화';
    if (serviceName.includes('방문')) return '방문';
    if (serviceName.includes('덕표연계')) return '덕표연계지원';
    if (serviceName.includes('민지들')) return '민지들프로그램';
    return '';
}

// 월 표시 업데이트
function updateMonthDisplay() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    $('#currentMonth').text(year + '.' + month);
}

// 버튼 이벤트 바인딩
function bindButtonEvents() {
    // 닫기 버튼
    $('#btnClose').off('click').on('click', function() {
        if (confirm('페이지를 닫으시겠습니까?')) {
            window.close();
        }
    });
    
    // 작업일지 팝업 닫기 버튼
    $('#btnCloseWorkLog').off('click').on('click', function() {
        closeWorkLogPopup();
    });
    
    // 팝업 외부 클릭 시 닫기
    $('#workLogModal').off('click').on('click', function(e) {
        if ($(e.target).attr('id') === 'workLogModal') {
            closeWorkLogPopup();
        }
    });
}

// 페이지 초기화 함수
function initAftercarePerformance() {
    try {
        // 월 표시 업데이트
        updateMonthDisplay();
        
        // 대상자 그리드 초기화
        initBeneficiaryGrid();
        
        // 제공서비스 집계 그리드 초기화
        initServiceSummaryGrid();
        
        // 메모관리 그리드 초기화
        initMemoGrid();
        
        // 실적 상세 그리드 초기화
        initPerformanceGrid();
        
        // 버튼 이벤트 바인딩
        bindButtonEvents();
        
        // 창 크기 변경 시 그리드 재조정
        $(window).on('resize', function() {
            setTimeout(() => {
                const grids = ['BeneficiaryGrid', 'ServiceSummaryGrid', 'MemoGrid', 'PerformanceGrid'];
                grids.forEach(gridId => {
                    const gridContainer = $('#' + gridId).closest('.grid-container');
                    if (gridContainer.length > 0) {
                        const containerWidth = gridContainer.width();
                        if (containerWidth > 0) {
                            $('#' + gridId).jqGrid('setGridWidth', containerWidth, false);
                        }
                    }
                });
            }, 100);
        });
        
    } catch (e) {
        console.error('페이지 초기화 중 오류 발생:', e);
        if (typeof showError === 'function') {
            showError('페이지 초기화 중 오류가 발생했습니다: ' + e.message);
        } else {
            alert('페이지 초기화 중 오류가 발생했습니다: ' + e.message);
        }
    }
}

// 전역 함수로 노출
window.initAftercarePerformance = initAftercarePerformance;

