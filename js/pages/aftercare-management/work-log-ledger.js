// 사후관리 업무일지 대장 페이지

// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// Mock 데이터: 지원사 목록
const mockSupporters = [
    { id: 1, name: '김명희' },
    { id: 2, name: '김영희' },
    { id: 3, name: '이수진' },
    { id: 4, name: '박지혜' },
    { id: 5, name: '최은영' }
];

// Mock 데이터: 대상자 목록
const mockBeneficiaries = [
    { id: 1, name: '김현정' },
    { id: 2, name: '이영숙' },
    { id: 3, name: '박순자' },
    { id: 4, name: '최미영' },
    { id: 5, name: '정수진' },
    { id: 6, name: '강은희' },
    { id: 7, name: '윤경희' },
    { id: 8, name: '임영희' }
];

// Mock 데이터: 업무일지 목록
const mockWorkLogs = [
    {
        id: 1,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-11',
        startTime: '10:00',
        endTime: '10:06',
        duration: 6,
        beneficiaryName: '김현정',
        beneficiaryId: 1,
        birthDate: '1955-10-19',
        gender: '여',
        age: 70,
        serviceName: '전화-안부 확인',
        workDetails: '부산 따님덕에서 잘 지내고 계신다고 집생각이 간절하시지만 혼자 오실 염두는 안 나시고 추석 연휴에나 자녀분들이랑 해서 오셨다가 그때는 집에서 생활 하실까 한다고 하시며 안전과 안부에 특별한 이상은 없으시다고 하셔 늘 건강하게 지내시고 식사도 잘 챙겨 드시라고 인사드렸다'
    },
    {
        id: 2,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-12',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        beneficiaryName: '이영숙',
        beneficiaryId: 2,
        birthDate: '1948-03-25',
        gender: '여',
        age: 77,
        serviceName: '방문-일상생활 지원',
        workDetails: '방문 시 대상자께서 건강 상태 양호하며 식사 도와드리고 청소 보조 진행. 외출 가능 상태 확인. 다음 방문 일정 안내'
    },
    {
        id: 3,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-13',
        startTime: '09:30',
        endTime: '09:35',
        duration: 5,
        beneficiaryName: '박순자',
        beneficiaryId: 3,
        birthDate: '1952-07-12',
        gender: '여',
        age: 73,
        serviceName: '전화-안전/안부 확인',
        workDetails: '전화 상담 시 안전 및 안부 확인 완료. 건강 상태 양호하며 특별한 이상 없음'
    },
    {
        id: 4,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-14',
        startTime: '15:00',
        endTime: '16:00',
        duration: 60,
        beneficiaryName: '최미영',
        beneficiaryId: 4,
        birthDate: '1950-11-08',
        gender: '여',
        age: 75,
        serviceName: '덕표연계지원-상담 및 정보 제공',
        workDetails: '덕표연계지원 상담 진행. 대상자께서 필요한 정보 제공 및 지원 서비스 안내. 가족 상담 요청 확인'
    },
    {
        id: 5,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-15',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        beneficiaryName: '정수진',
        beneficiaryId: 5,
        birthDate: '1947-05-30',
        gender: '여',
        age: 78,
        serviceName: '민지들프로그램-그룹 활동 참여',
        workDetails: '민지들프로그램 그룹 활동 참여. 대상자께서 적극적으로 참여하시며 다른 참여자들과 좋은 교감 나누심. 활동 후 건강 상태 점검 완료'
    },
    {
        id: 6,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-16',
        startTime: '11:00',
        endTime: '11:05',
        duration: 5,
        beneficiaryName: '김현정',
        beneficiaryId: 1,
        birthDate: '1955-10-19',
        gender: '여',
        age: 70,
        serviceName: '전화-안전/안부 확인',
        workDetails: '전화로 안전 및 안부 확인. 건강 상태 양호하며 식사 잘 챙겨 드시고 있다고 하심'
    },
    {
        id: 7,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-17',
        startTime: '13:00',
        endTime: '14:30',
        duration: 90,
        beneficiaryName: '강은희',
        beneficiaryId: 6,
        birthDate: '1949-09-15',
        gender: '여',
        age: 76,
        serviceName: '방문-일상생활 지원, 청소 보조',
        workDetails: '방문 시 일상생활 지원 및 청소 보조 진행. 대상자께서 건강 상태 양호하며 식사도 잘 드시고 계심. 다음 방문 일정 안내'
    },
    {
        id: 8,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-18',
        startTime: '10:00',
        endTime: '10:05',
        duration: 5,
        beneficiaryName: '윤경희',
        beneficiaryId: 7,
        birthDate: '1951-02-20',
        gender: '여',
        age: 74,
        serviceName: '전화-안전/안부, 정보제공',
        workDetails: '전화 상담 시 안전 및 안부 확인 완료. 필요한 정보 제공 및 지원 서비스 안내'
    },
    {
        id: 9,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-19',
        startTime: '14:00',
        endTime: '15:00',
        duration: 60,
        beneficiaryName: '임영희',
        beneficiaryId: 8,
        birthDate: '1953-06-05',
        gender: '여',
        age: 72,
        serviceName: '상담-심리상담 및 정서 지원',
        workDetails: '심리상담 및 정서 지원 진행. 대상자께서 고민 상담 요청하여 상세 상담 진행. 정서적 지원 제공 및 추가 상담 일정 안내'
    },
    {
        id: 10,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-20',
        startTime: '10:00',
        endTime: '10:40',
        duration: 40,
        beneficiaryName: '정수진',
        beneficiaryId: 5,
        birthDate: '1947-05-30',
        gender: '여',
        age: 78,
        serviceName: '건강관리-건강상태 점검 및 관리',
        workDetails: '건강 상태 점검 및 관리 진행. 혈압 측정 및 건강 상태 확인 완료. 건강 상태 양호하며 약 복용 확인'
    },
    {
        id: 11,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-21',
        startTime: '11:00',
        endTime: '11:05',
        duration: 5,
        beneficiaryName: '김현정',
        beneficiaryId: 1,
        birthDate: '1955-10-19',
        gender: '여',
        age: 70,
        serviceName: '전화-안전/안부 확인',
        workDetails: '전화로 안전 및 안부 확인. 건강 상태 양호하며 특별한 이상 없음'
    },
    {
        id: 12,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-22',
        startTime: '15:00',
        endTime: '15:30',
        duration: 30,
        beneficiaryName: '이영숙',
        beneficiaryId: 2,
        birthDate: '1948-03-25',
        gender: '여',
        age: 77,
        serviceName: '방문-일상생활 지원, 식사 보조',
        workDetails: '방문 시 일상생활 지원 및 식사 보조 진행. 대상자께서 건강 상태 양호하며 식사 잘 드시고 계심'
    },
    {
        id: 13,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-23',
        startTime: '10:00',
        endTime: '10:05',
        duration: 5,
        beneficiaryName: '박순자',
        beneficiaryId: 3,
        birthDate: '1952-07-12',
        gender: '여',
        age: 73,
        serviceName: '전화-안전/안부, 말벗',
        workDetails: '전화 상담 시 안전 및 안부 확인 완료. 대상자와 대화 나누며 정서적 지원 제공'
    },
    {
        id: 14,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-24',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        beneficiaryName: '최미영',
        beneficiaryId: 4,
        birthDate: '1950-11-08',
        gender: '여',
        age: 75,
        serviceName: '민지들프로그램-그룹 활동 참여',
        workDetails: '민지들프로그램 그룹 활동 참여. 대상자께서 적극적으로 참여하시며 프로그램 활동 완료'
    },
    {
        id: 15,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-25',
        startTime: '10:00',
        endTime: '10:05',
        duration: 5,
        beneficiaryName: '정수진',
        beneficiaryId: 5,
        birthDate: '1947-05-30',
        gender: '여',
        age: 78,
        serviceName: '전화-안전/안부, 정보제공',
        workDetails: '전화 상담 시 안전 및 안부 확인 완료. 필요한 정보 제공 및 지원 서비스 안내'
    }
];

// 현재 선택된 검색 조건
let currentSearchParams = {
    startDate: '',
    endDate: '',
    supporterId: '',
    beneficiaryId: ''
};

// 나이 계산 함수
function calculateAge(birthDate) {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// 날짜 초기화 (현재 월 1일 ~ 말일)
function initDateRange() {
    // 11월로 설정
    const year = 2025;
    const month = 10; // 11월 (0부터 시작하므로 10)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDateStr = formatDateInput(firstDay);
    const endDateStr = formatDateInput(lastDay);
    
    $('#startDate').val(startDateStr);
    $('#endDate').val(endDateStr);
    
    currentSearchParams.startDate = startDateStr;
    currentSearchParams.endDate = endDateStr;
}

// 날짜 포맷팅 (YYYY-MM-DD)
function formatDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

// 지원사 드롭다운 초기화
function initSupporterDropdown() {
    const select = $('#selectSupporter');
    select.empty();
    select.append('<option value="">전체</option>');
    
    mockSupporters.forEach(supporter => {
        select.append(`<option value="${supporter.id}">${supporter.name}</option>`);
    });
}

// 대상자 드롭다운 초기화
function initBeneficiaryDropdown() {
    const select = $('#selectBeneficiary');
    select.empty();
    select.append('<option value="">전체</option>');
    
    mockBeneficiaries.forEach(beneficiary => {
        select.append(`<option value="${beneficiary.id}">${beneficiary.name}</option>`);
    });
}

// 업무일지 그리드 초기화
function initWorkLogGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['지원사', '일자', '시작', '종료', '소요(분)', '대상자명', '생년월일', '성별', '나이', '서비스명', '업무내용', '관리'],
            colModel: [
                { name: 'supporter', index: 'supporter', width: 100, sortable: true, align: 'center' },
                { name: 'date', index: 'date', width: 110, sortable: true, align: 'center', sorttype: 'date' },
                { name: 'startTime', index: 'startTime', width: 80, sortable: true, align: 'center' },
                { name: 'endTime', index: 'endTime', width: 80, sortable: true, align: 'center' },
                { 
                    name: 'duration', 
                    index: 'duration', 
                    width: 90, 
                    sortable: true, 
                    align: 'center',
                    sorttype: 'int',
                    formatter: function(cellvalue) {
                        return (cellvalue || 0) + '분';
                    }
                },
                { name: 'beneficiaryName', index: 'beneficiaryName', width: 100, sortable: true },
                { name: 'birthDate', index: 'birthDate', width: 110, sortable: true, align: 'center', sorttype: 'date' },
                { name: 'gender', index: 'gender', width: 60, sortable: true, align: 'center' },
                { 
                    name: 'age', 
                    index: 'age', 
                    width: 70, 
                    sortable: true, 
                    align: 'center',
                    sorttype: 'int',
                    formatter: function(cellvalue) {
                        return (cellvalue || '') + '세';
                    }
                },
                { name: 'serviceName', index: 'serviceName', width: 180, sortable: true },
                { 
                    name: 'workDetails', 
                    index: 'workDetails', 
                    width: 400, 
                    sortable: false,
                    formatter: function(cellvalue) {
                        if (!cellvalue) return '';
                        // 내용이 길어도 전체 보이도록 처리
                        return '<div style="white-space: normal; word-wrap: break-word; line-height: 1.5; padding: 5px 0;">' + cellvalue + '</div>';
                    }
                },
                {
                    name: 'actions',
                    index: 'actions',
                    width: 80,
                    align: 'center',
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="btn-edit-worklog" data-worklog-id="' + rowObject.id + '" style="padding: 5px 12px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; white-space: nowrap;">수정</button>';
                    }
                }
            ],
            rowNum: 20,
            rowList: [10, 20, 30, 50, 100],
            pager: '#WorkLogPager',
            sortname: 'date',
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
                $('#WorkLogGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#WorkLogGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#WorkLogGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 업무내용 컬럼 높이 자동 조정
                $('#WorkLogGrid').find('td[aria-describedby="WorkLogGrid_workDetails"]').each(function() {
                    $(this).css('vertical-align', 'top');
                });
                
                // 수정 버튼 이벤트
                $('.btn-edit-worklog').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const workLogId = $(this).data('worklog-id');
                    const rowData = $('#WorkLogGrid').jqGrid('getRowData', workLogId);
                    openWorkLogEditPopup(workLogId, rowData);
                });
            }
        };

        $('#WorkLogGrid').jqGrid(gridConfig);
        
        $('#WorkLogGrid').jqGrid('navGrid', '#WorkLogPager', {
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
            const gridContainer = $('#WorkLogGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#WorkLogGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadWorkLogList();
    } catch (e) {
        console.error('업무일지 그리드 초기화 중 오류:', e);
        if (typeof showError === 'function') {
            showError('업무일지 그리드 초기화 중 오류가 발생했습니다.');
        }
    }
}

// 업무일지 목록 로드
function loadWorkLogList() {
    try {
        // 검색 조건에 맞는 데이터 필터링
        let filteredData = mockWorkLogs.filter(log => {
            // 날짜 필터
            if (currentSearchParams.startDate && log.date < currentSearchParams.startDate) {
                return false;
            }
            if (currentSearchParams.endDate && log.date > currentSearchParams.endDate) {
                return false;
            }
            
            // 지원사 필터
            if (currentSearchParams.supporterId && log.supporterId != currentSearchParams.supporterId) {
                return false;
            }
            
            // 대상자 필터
            if (currentSearchParams.beneficiaryId && log.beneficiaryId != currentSearchParams.beneficiaryId) {
                return false;
            }
            
            return true;
        });
        
        const dataList = filteredData.map((item) => ({
            id: item.id,
            supporter: item.supporter || '',
            date: item.date || '',
            startTime: item.startTime || '',
            endTime: item.endTime || '',
            duration: item.duration || 0,
            beneficiaryName: item.beneficiaryName || '',
            birthDate: item.birthDate || '',
            gender: item.gender || '',
            age: item.age || '',
            serviceName: item.serviceName || '',
            workDetails: item.workDetails || ''
        }));
        
        if (dataList.length > 0) {
            $('#WorkLogGrid').jqGrid('clearGridData');
            $('#WorkLogGrid').jqGrid('setGridParam', { data: dataList });
            $('#WorkLogGrid').trigger('reloadGrid');
        } else {
            $('#WorkLogGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('업무일지 목록 조회 중 오류:', e);
    }
}

// 업무일지 수정 팝업 열기
function openWorkLogEditPopup(workLogId, rowData) {
    try {
        const modal = $('#workLogEditModal');
        const content = $('#workLogEditContent');
        
        // 해당 업무일지 데이터 찾기
        const workLogData = mockWorkLogs.find(log => log.id == workLogId);
        if (!workLogData) {
            alert('업무일지 데이터를 찾을 수 없습니다.');
            return;
        }
        
        // 업무일지 수정 폼 생성
        let html = '<div style="padding: 10px;">';
        html += '<div style="margin-bottom: 20px;">';
        html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">';
        
        // 좌측: 기본 정보
        html += '<div>';
        html += '<h4 style="font-size: 1rem; font-weight: 600; color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #dee2e6;">기본 정보</h4>';
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">지원사</label>';
        html += '<input type="text" id="editSupporter" value="' + (workLogData.supporter || '') + '" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">일자</label>';
        html += '<input type="date" id="editDate" value="' + (workLogData.date || '') + '" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">시간</label>';
        html += '<div style="display: flex; gap: 10px; align-items: center;">';
        html += '<input type="time" id="editStartTime" value="' + (workLogData.startTime || '') + '" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">';
        html += '<span>~</span>';
        html += '<input type="time" id="editEndTime" value="' + (workLogData.endTime || '') + '" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">';
        html += '</div>';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">소요시간</label>';
        html += '<input type="text" id="editDuration" value="' + (workLogData.duration || 0) + '분" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        html += '</div>';
        
        // 우측: 대상자 정보
        html += '<div>';
        html += '<h4 style="font-size: 1rem; font-weight: 600; color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #dee2e6;">대상자 정보</h4>';
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">대상자명</label>';
        html += '<input type="text" id="editBeneficiaryName" value="' + (workLogData.beneficiaryName || '') + '" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">생년월일</label>';
        html += '<input type="text" id="editBirthDate" value="' + (workLogData.birthDate || '') + '" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">성별</label>';
        html += '<input type="text" id="editGender" value="' + (workLogData.gender || '') + '" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 12px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">나이</label>';
        html += '<input type="text" id="editAge" value="' + (workLogData.age || '') + '세" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f8f9fa;">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        // 하단: 서비스 정보 및 업무내용
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">서비스명</label>';
        html += '<input type="text" id="editServiceName" value="' + (workLogData.serviceName || '') + '" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">';
        html += '</div>';
        
        html += '<div style="margin-bottom: 20px;">';
        html += '<label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500; color: #333;">업무내용</label>';
        html += '<textarea id="editWorkDetails" style="width: 100%; min-height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; resize: vertical;">' + (workLogData.workDetails || '') + '</textarea>';
        html += '</div>';
        
        html += '<div style="display: flex; justify-content: flex-end; gap: 10px; padding-top: 15px; border-top: 1px solid #dee2e6;">';
        html += '<button id="btnSaveWorkLogEdit" style="padding: 10px 25px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;">저장</button>';
        html += '<button id="btnCancelWorkLogEdit" style="padding: 10px 25px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;">취소</button>';
        html += '</div>';
        html += '</div>';
        
        content.html(html);
        modal.css('display', 'flex');
        
        // 시간 변경 시 소요시간 자동 계산
        $('#editStartTime, #editEndTime').off('change').on('change', function() {
            const startTime = $('#editStartTime').val();
            const endTime = $('#editEndTime').val();
            if (startTime && endTime) {
                const start = parseTime(startTime);
                const end = parseTime(endTime);
                const duration = calculateDuration(start, end);
                $('#editDuration').val(duration + '분');
            }
        });
        
        // 저장 버튼 이벤트
        $('#btnSaveWorkLogEdit').off('click').on('click', function() {
            saveWorkLogEdit(workLogId);
        });
        
        // 취소 버튼 이벤트
        $('#btnCancelWorkLogEdit').off('click').on('click', function() {
            closeWorkLogEditPopup();
        });
        
    } catch (e) {
        console.error('업무일지 수정 팝업 열기 중 오류:', e);
        alert('업무일지 수정 팝업을 열 수 없습니다.');
    }
}

// 업무일지 수정 팝업 닫기
function closeWorkLogEditPopup() {
    $('#workLogEditModal').css('display', 'none');
}

// 업무일지 수정 저장
function saveWorkLogEdit(workLogId) {
    try {
        const date = $('#editDate').val();
        const startTime = $('#editStartTime').val();
        const endTime = $('#editEndTime').val();
        const serviceName = $('#editServiceName').val().trim();
        const workDetails = $('#editWorkDetails').val().trim();
        
        if (!date) {
            alert('일자를 입력해주세요.');
            return;
        }
        
        if (!startTime || !endTime) {
            alert('시작 시간과 종료 시간을 입력해주세요.');
            return;
        }
        
        if (!serviceName) {
            alert('서비스명을 입력해주세요.');
            return;
        }
        
        // 시간 계산
        const start = parseTime(startTime);
        const end = parseTime(endTime);
        const duration = calculateDuration(start, end);
        
        // 실제로는 API 호출
        // mockWorkLogs 업데이트
        const workLogIndex = mockWorkLogs.findIndex(log => log.id == workLogId);
        if (workLogIndex !== -1) {
            mockWorkLogs[workLogIndex].date = date;
            mockWorkLogs[workLogIndex].startTime = startTime;
            mockWorkLogs[workLogIndex].endTime = endTime;
            mockWorkLogs[workLogIndex].duration = duration;
            mockWorkLogs[workLogIndex].serviceName = serviceName;
            mockWorkLogs[workLogIndex].workDetails = workDetails;
        }
        
        // 그리드 새로고침
        loadWorkLogList();
        
        // 팝업 닫기
        closeWorkLogEditPopup();
        
        if (typeof showMessage === 'function') {
            showMessage('업무일지가 저장되었습니다.');
        } else {
            alert('업무일지가 저장되었습니다.');
        }
    } catch (e) {
        console.error('업무일지 저장 중 오류:', e);
        alert('업무일지 저장 중 오류가 발생했습니다.');
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

// 검색 실행
function performSearch() {
    currentSearchParams.startDate = $('#startDate').val();
    currentSearchParams.endDate = $('#endDate').val();
    currentSearchParams.supporterId = $('#selectSupporter').val();
    currentSearchParams.beneficiaryId = $('#selectBeneficiary').val();
    
    loadWorkLogList();
}

// 버튼 이벤트 바인딩
function bindButtonEvents() {
    // 검색 버튼
    $('#btnSearch').off('click').on('click', function() {
        performSearch();
    });
    
    // Enter 키로 검색
    $('#startDate, #endDate, #selectSupporter, #selectBeneficiary').off('keypress').on('keypress', function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });
    
    // 팝업 외부 클릭 시 닫기
    $('#workLogEditModal').off('click').on('click', function(e) {
        if ($(e.target).attr('id') === 'workLogEditModal') {
            closeWorkLogEditPopup();
        }
    });
    
    // 팝업 닫기 버튼
    $('#btnCloseWorkLogEdit').off('click').on('click', function() {
        closeWorkLogEditPopup();
    });
}

// 페이지 초기화 함수
function initWorkLogLedger() {
    try {
        // 날짜 범위 초기화
        initDateRange();
        
        // 드롭다운 초기화
        initSupporterDropdown();
        initBeneficiaryDropdown();
        
        // 그리드 초기화
        initWorkLogGrid();
        
        // 버튼 이벤트 바인딩
        bindButtonEvents();
        
        // 창 크기 변경 시 그리드 재조정
        $(window).on('resize', function() {
            setTimeout(() => {
                const gridContainer = $('#WorkLogGrid').closest('.grid-container');
                if (gridContainer.length > 0) {
                    const containerWidth = gridContainer.width();
                    if (containerWidth > 0) {
                        $('#WorkLogGrid').jqGrid('setGridWidth', containerWidth, false);
                    }
                }
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
window.initWorkLogLedger = initWorkLogLedger;

