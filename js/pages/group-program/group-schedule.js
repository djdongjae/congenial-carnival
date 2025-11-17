// 단체프로그램 일정등록 페이지

// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// Mock 데이터: 지원사 목록
const mockSupporters = [
    { id: 1, name: '김명희' },
    { id: 2, name: '김영희' },
    { id: 3, name: '이수진' },
    { id: 4, name: '박지혜' },
    { id: 5, name: '최은영' },
    { id: 6, name: '홍지원' }
];

// Mock 데이터: 대상자 목록
const mockBeneficiaries = [
    { id: 1, name: '김지원', birthDate: '1947-01-01', gender: '여', age: 78, category: '중점', supporter: '홍지원' },
    { id: 2, name: '나지원', birthDate: '1940-02-02', gender: '남', age: 85, category: '일반', supporter: '홍지원' },
    { id: 3, name: '박지원', birthDate: '1938-03-03', gender: '여', age: 87, category: '일반', supporter: '홍지원' },
    { id: 4, name: '성지원', birthDate: '1930-04-04', gender: '여', age: 95, category: '일반', supporter: '홍지원' },
    { id: 5, name: '유지월', birthDate: '1948-05-05', gender: '남', age: 77, category: '일반', supporter: '홍지원' },
    { id: 6, name: '이지원', birthDate: '1950-06-06', gender: '남', age: 75, category: '일반', supporter: '홍지원' },
    { id: 7, name: '임지원', birthDate: '1949-07-07', gender: '여', age: 76, category: '중점', supporter: '홍지원' },
    { id: 8, name: '장지원', birthDate: '1947-08-08', gender: '여', age: 78, category: '일반', supporter: '홍지원' },
    { id: 9, name: '최지원', birthDate: '1946-09-09', gender: '남', age: 79, category: '일반', supporter: '홍지원' },
    { id: 10, name: '홍지원', birthDate: '1944-10-10', gender: '남', age: 81, category: '일반', supporter: '홍지원' },
    { id: 11, name: '김대상', birthDate: '1948-01-01', gender: '여', age: 77, category: '일반', supporter: '홍지원' },
    { id: 12, name: '이대상', birthDate: '1945-02-15', gender: '남', age: 80, category: '일반', supporter: '홍지원' },
    { id: 13, name: '박대상', birthDate: '1943-03-20', gender: '여', age: 82, category: '중점', supporter: '홍지원' },
    { id: 14, name: '최대상', birthDate: '1941-04-25', gender: '남', age: 84, category: '일반', supporter: '홍지원' },
    { id: 15, name: '정대상', birthDate: '1939-05-30', gender: '여', age: 86, category: '일반', supporter: '홍지원' },
    { id: 16, name: '강대상', birthDate: '1937-06-05', gender: '남', age: 88, category: '일반', supporter: '홍지원' },
    { id: 17, name: '윤대상', birthDate: '1935-07-10', gender: '여', age: 90, category: '일반', supporter: '홍지원' },
    { id: 18, name: '임대상', birthDate: '1933-08-15', gender: '남', age: 92, category: '일반', supporter: '홍지원' },
    { id: 19, name: '한대상', birthDate: '1931-09-20', gender: '여', age: 94, category: '일반', supporter: '홍지원' },
    { id: 20, name: '조대상', birthDate: '1929-10-25', gender: '남', age: 96, category: '일반', supporter: '홍지원' }
];

// Mock 데이터: 직원 목록
const mockStaff = [
    { id: 1, name: '김지원', birthDate: '1980-01-01', position: '시설장' },
    { id: 2, name: '나지원', birthDate: '1980-02-02', position: '중간관리자' },
    { id: 3, name: '박지원', birthDate: '1980-03-03', position: '중간관리자' },
    { id: 4, name: '성지원', birthDate: '1980-04-04', position: '전담사회복지사' },
    { id: 5, name: '유지월', birthDate: '1980-05-05', position: '전담사회복지사' },
    { id: 6, name: '이지원', birthDate: '1980-06-06', position: '생활지원사' },
    { id: 7, name: '임지원', birthDate: '1980-07-07', position: '생활지원사' },
    { id: 8, name: '장지원', birthDate: '1980-08-08', position: '생활지원사' },
    { id: 9, name: '최지원', birthDate: '1980-09-09', position: '생활지원사' },
    { id: 10, name: '홍지원', birthDate: '1980-10-10', position: '생활지원사' },
    { id: 11, name: '김직원', birthDate: '1979-01-01', position: '생활지원사' },
    { id: 12, name: '이직원', birthDate: '1979-02-02', position: '생활지원사' },
    { id: 13, name: '박직원', birthDate: '1979-03-03', position: '생활지원사' },
    { id: 14, name: '최직원', birthDate: '1979-04-04', position: '생활지원사' },
    { id: 15, name: '정직원', birthDate: '1979-05-05', position: '생활지원사' },
    { id: 16, name: '강직원', birthDate: '1979-06-06', position: '생활지원사' },
    { id: 17, name: '윤직원', birthDate: '1979-07-07', position: '생활지원사' },
    { id: 18, name: '임직원', birthDate: '1979-08-08', position: '생활지원사' },
    { id: 19, name: '한직원', birthDate: '1979-09-09', position: '생활지원사' },
    { id: 20, name: '조직원', birthDate: '1979-10-10', position: '생활지원사' },
    { id: 21, name: '황지원', birthDate: '1979-01-01', position: '생활지원사' }
];

// Mock 데이터: 자원 목록
const mockResources = [
    { id: 1, name: '강당' },
    { id: 2, name: '회의실' },
    { id: 3, name: '운동실' },
    { id: 4, name: '도서관' },
    { id: 5, name: '야외정원' }
];

// Mock 데이터: 일정 목록
const mockSchedules = [
    {
        id: 1,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-01',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        beneficiaryName: '김지원',
        beneficiaryId: 1,
        birthDate: '1947-01-01',
        gender: '여',
        age: 78,
        serviceName: '단체프로그램-건강체조',
        workDetails: '건강체조 프로그램 진행. 대상자들이 적극적으로 참여하며 건강 증진 활동 완료'
    },
    {
        id: 2,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-02',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        beneficiaryName: '나지원',
        beneficiaryId: 2,
        birthDate: '1940-02-02',
        gender: '남',
        age: 85,
        serviceName: '단체프로그램-요리교실',
        workDetails: '요리교실 프로그램 진행. 대상자들이 함께 요리를 만들며 정서적 교류와 즐거움을 나눔'
    },
    {
        id: 3,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-03',
        startTime: '09:30',
        endTime: '11:00',
        duration: 90,
        beneficiaryName: '박지원',
        beneficiaryId: 3,
        birthDate: '1938-03-03',
        gender: '여',
        age: 87,
        serviceName: '단체프로그램-음악치료',
        workDetails: '음악치료 프로그램 진행. 노래와 리듬을 통한 정서적 지원 및 즐거움 제공'
    },
    {
        id: 4,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-04',
        startTime: '13:00',
        endTime: '14:30',
        duration: 90,
        beneficiaryName: '성지원',
        beneficiaryId: 4,
        birthDate: '1930-04-04',
        gender: '여',
        age: 95,
        serviceName: '단체프로그램-미술치료',
        workDetails: '미술치료 프로그램 진행. 대상자들이 그림을 그리며 창의적 표현과 정서적 안정감을 느낌'
    },
    {
        id: 5,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-05',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        beneficiaryName: '유지월',
        beneficiaryId: 5,
        birthDate: '1948-05-05',
        gender: '남',
        age: 77,
        serviceName: '단체프로그램-독서모임',
        workDetails: '독서모임 프로그램 진행. 대상자들이 함께 책을 읽고 이야기를 나누며 정서적 교류'
    },
    {
        id: 6,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-06',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        beneficiaryName: '이지원',
        beneficiaryId: 6,
        birthDate: '1950-06-06',
        gender: '남',
        age: 75,
        serviceName: '단체프로그램-건강강좌',
        workDetails: '건강강좌 프로그램 진행. 건강 관리에 대한 정보 제공 및 질의응답 진행'
    },
    {
        id: 7,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-07',
        startTime: '09:00',
        endTime: '10:30',
        duration: 90,
        beneficiaryName: '임지원',
        beneficiaryId: 7,
        birthDate: '1949-07-07',
        gender: '여',
        age: 76,
        serviceName: '단체프로그램-놀이치료',
        workDetails: '놀이치료 프로그램 진행. 다양한 놀이 활동을 통한 즐거움과 정서적 지원 제공'
    },
    {
        id: 8,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-08',
        startTime: '13:30',
        endTime: '15:00',
        duration: 90,
        beneficiaryName: '장지원',
        beneficiaryId: 8,
        birthDate: '1947-08-08',
        gender: '여',
        age: 78,
        serviceName: '단체프로그램-원예치료',
        workDetails: '원예치료 프로그램 진행. 식물을 가꾸며 생명의 소중함과 성취감을 느낌'
    },
    {
        id: 9,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-09',
        startTime: '10:30',
        endTime: '12:00',
        duration: 90,
        beneficiaryName: '최지원',
        beneficiaryId: 9,
        birthDate: '1946-09-09',
        gender: '남',
        age: 79,
        serviceName: '단체프로그램-동요부르기',
        workDetails: '동요부르기 프로그램 진행. 옛 동요를 함께 부르며 추억과 즐거움을 나눔'
    },
    {
        id: 10,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-10',
        startTime: '14:30',
        endTime: '16:00',
        duration: 90,
        beneficiaryName: '홍지원',
        beneficiaryId: 10,
        birthDate: '1944-10-10',
        gender: '남',
        age: 81,
        serviceName: '단체프로그램-요가',
        workDetails: '요가 프로그램 진행. 가벼운 운동을 통한 건강 증진 및 스트레스 해소'
    },
    {
        id: 11,
        supporter: '김영희',
        supporterId: 2,
        date: '2025-11-11',
        startTime: '09:00',
        endTime: '10:30',
        duration: 90,
        beneficiaryName: '김대상',
        beneficiaryId: 11,
        birthDate: '1948-01-01',
        gender: '여',
        age: 77,
        serviceName: '단체프로그램-건강체조',
        workDetails: '건강체조 프로그램 진행. 대상자들이 적극적으로 참여하며 건강 증진 활동 완료'
    },
    {
        id: 12,
        supporter: '이수진',
        supporterId: 3,
        date: '2025-11-12',
        startTime: '13:00',
        endTime: '14:30',
        duration: 90,
        beneficiaryName: '이대상',
        beneficiaryId: 12,
        birthDate: '1945-02-15',
        gender: '남',
        age: 80,
        serviceName: '단체프로그램-요리교실',
        workDetails: '요리교실 프로그램 진행. 대상자들이 함께 요리를 만들며 정서적 교류와 즐거움을 나눔'
    },
    {
        id: 13,
        supporter: '박지혜',
        supporterId: 4,
        date: '2025-11-13',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        beneficiaryName: '박대상',
        beneficiaryId: 13,
        birthDate: '1943-03-20',
        gender: '여',
        age: 82,
        serviceName: '단체프로그램-음악치료',
        workDetails: '음악치료 프로그램 진행. 노래와 리듬을 통한 정서적 지원 및 즐거움 제공'
    },
    {
        id: 14,
        supporter: '최은영',
        supporterId: 5,
        date: '2025-11-14',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        beneficiaryName: '최대상',
        beneficiaryId: 14,
        birthDate: '1941-04-25',
        gender: '남',
        age: 84,
        serviceName: '단체프로그램-미술치료',
        workDetails: '미술치료 프로그램 진행. 대상자들이 그림을 그리며 창의적 표현과 정서적 안정감을 느낌'
    },
    {
        id: 15,
        supporter: '김명희',
        supporterId: 1,
        date: '2025-11-15',
        startTime: '09:30',
        endTime: '11:00',
        duration: 90,
        beneficiaryName: '정대상',
        beneficiaryId: 15,
        birthDate: '1939-05-30',
        gender: '여',
        age: 86,
        serviceName: '단체프로그램-독서모임',
        workDetails: '독서모임 프로그램 진행. 대상자들이 함께 책을 읽고 이야기를 나누며 정서적 교류'
    }
];

// 현재 선택된 검색 조건
let currentSearchParams = {
    startDate: '',
    endDate: '',
    supporterId: '',
    beneficiaryId: ''
};

// 팝업에서 선택된 직원 ID 목록
let selectedStaffIds = [];
// 팝업에서 선택된 대상자 ID 목록
let selectedParticipantIds = [];

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
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
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

// 자원 드롭다운 초기화
function initResourceDropdown() {
    const select = $('#selectResource');
    select.empty();
    select.append('<option value="">선택하세요</option>');
    
    mockResources.forEach(resource => {
        select.append(`<option value="${resource.id}">${resource.name}</option>`);
    });
}

// 시간 차이 계산 (분 단위)
function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return 0;
    
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    
    if (end < start) {
        // 다음날인 경우
        end.setDate(end.getDate() + 1);
    }
    
    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / 60000);
    
    return diffMinutes;
}

// 일정 그리드 초기화
function initScheduleGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['지원사', '일자', '시작', '종료', '소요(분)', '대상자명', '생년월일', '성별', '나이', '서비스명', '업무내용', '관리'],
            colModel: [
                { name: 'supporter', index: 'supporter', width: 100, sortable: true, align: 'center' },
                { name: 'date', index: 'date', width: 110, sortable: true, align: 'center', sorttype: 'date' },
                { name: 'startTime', index: 'startTime', width: 80, sortable: false, align: 'center' },
                { name: 'endTime', index: 'endTime', width: 80, sortable: false, align: 'center' },
                { name: 'duration', index: 'duration', width: 90, sortable: true, sorttype: 'int', align: 'center', 
                    formatter: function(cellvalue) {
                        return cellvalue || 0;
                    }
                },
                { name: 'beneficiaryName', index: 'beneficiaryName', width: 100, sortable: true, align: 'center' },
                { name: 'birthDate', index: 'birthDate', width: 110, sortable: false, align: 'center' },
                { name: 'gender', index: 'gender', width: 60, sortable: false, align: 'center' },
                { name: 'age', index: 'age', width: 60, sortable: false, align: 'center' },
                { name: 'serviceName', index: 'serviceName', width: 200, sortable: true, align: 'left' },
                { name: 'workDetails', index: 'workDetails', width: 500, sortable: false, align: 'left',
                    formatter: function(cellvalue) {
                        if (!cellvalue) return '';
                        // 내용이 길어도 전체 보이도록 처리
                        return '<div style="white-space: normal; word-wrap: break-word; line-height: 1.5; padding: 5px 0;">' + cellvalue + '</div>';
                    }
                },
                { name: 'actions', index: 'actions', width: 80, sortable: false, align: 'center',
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="btn-edit" data-id="' + rowObject.id + '" style="padding: 4px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">수정</button>';
                    }
                }
            ],
            rowNum: 50,
            rowList: [20, 30, 50, 100],
            pager: '#SchedulePager',
            sortname: 'date',
            sortorder: 'desc',
            viewrecords: true,
            caption: '',
            height: 'auto',
            width: '100%',
            autowidth: true,
            shrinkToFit: false,
            scroll: true,
            gridComplete: function() {
                $('#ScheduleGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#ScheduleGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#ScheduleGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 업무내용 컬럼 높이 자동 조정
                $('#ScheduleGrid').find('td[aria-describedby="ScheduleGrid_workDetails"]').each(function() {
                    $(this).css('vertical-align', 'top');
                });
                
                // 수정 버튼 이벤트 바인딩
                $('#ScheduleGrid').find('.btn-edit').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const scheduleId = $(this).data('id');
                    openScheduleEditModal(scheduleId);
                });
            },
            loadComplete: function(data) {
                setTimeout(() => {
                    $('#ScheduleGrid').find('td, th').css({
                        'padding': '10px 8px',
                        'font-size': '13px',
                        'border': '1px solid #dee2e6'
                    });
                }, 100);
            }
        };
        
        $('#ScheduleGrid').jqGrid(gridConfig);
    } catch (error) {
        console.error('일정 그리드 초기화 중 오류:', error);
    }
}

// 직원 선택 그리드 초기화
function initStaffGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['', 'NO', '성명', '생년월일', '직위'],
            colModel: [
                { name: 'checkbox', index: 'checkbox', width: 30, sortable: false, align: 'center',
                    formatter: function(cellvalue, options, rowObject) {
                        const checked = selectedStaffIds.includes(rowObject.id) ? 'checked' : '';
                        return '<input type="checkbox" class="staff-checkbox" data-id="' + rowObject.id + '" ' + checked + '>';
                    }
                },
                { name: 'no', index: 'no', width: 50, sortable: false, align: 'center', formatter: 'integer' },
                { name: 'name', index: 'name', width: 120, sortable: true, align: 'left' },
                { name: 'birthDate', index: 'birthDate', width: 120, sortable: false, align: 'center' },
                { name: 'position', index: 'position', width: 150, sortable: true, align: 'left' }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'name',
            sortorder: 'asc',
            viewrecords: false,
            caption: '',
            height: '100%',
            width: '100%',
            autowidth: false,
            shrinkToFit: true,
            scroll: 1,
            scrollrows: true,
            gridComplete: function() {
                // 그리드 높이 조정
                const container = $('#staffGridContainer');
                if (container.length > 0) {
                    const containerHeight = container.height();
                    const headerHeight = 40; // 헤더 높이 추정
                    const paddingHeight = 30; // 패딩 높이
                    const gridHeight = containerHeight - paddingHeight;
                    if (gridHeight > 0) {
                        $('#StaffGrid').jqGrid('setGridHeight', gridHeight);
                    }
                }
                
                $('#StaffGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#StaffGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#StaffGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 체크박스 변경 이벤트
                $('#StaffGrid').find('.staff-checkbox').on('change', function() {
                    const staffId = parseInt($(this).data('id'));
                    if ($(this).is(':checked')) {
                        if (!selectedStaffIds.includes(staffId)) {
                            selectedStaffIds.push(staffId);
                        }
                    } else {
                        selectedStaffIds = selectedStaffIds.filter(id => id !== staffId);
                    }
                    updateStaffCount();
                });
            },
            loadComplete: function(data) {
                setTimeout(() => {
                    // 그리드 높이 다시 조정
                    const container = $('#staffGridContainer');
                    if (container.length > 0) {
                        const containerHeight = container.height();
                        const paddingHeight = 30;
                        const gridHeight = containerHeight - paddingHeight;
                        if (gridHeight > 0) {
                            $('#StaffGrid').jqGrid('setGridHeight', gridHeight);
                        }
                    }
                    
                    $('#StaffGrid').find('td, th').css({
                        'padding': '10px 8px',
                        'font-size': '13px',
                        'border': '1px solid #dee2e6'
                    });
                }, 100);
            }
        };
        
        $('#StaffGrid').jqGrid(gridConfig);
        
        // 직원 데이터 로드
        loadStaffData();
    } catch (error) {
        console.error('직원 그리드 초기화 중 오류:', error);
    }
}

// 대상자 선택 그리드 초기화
function initParticipantGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['', 'NO', '성명', '생년월일', '성별', '나이', '구분', '지원사'],
            colModel: [
                { name: 'checkbox', index: 'checkbox', width: 30, sortable: false, align: 'center',
                    formatter: function(cellvalue, options, rowObject) {
                        const checked = selectedParticipantIds.includes(rowObject.id) ? 'checked' : '';
                        return '<input type="checkbox" class="participant-checkbox" data-id="' + rowObject.id + '" ' + checked + '>';
                    }
                },
                { name: 'no', index: 'no', width: 50, sortable: false, align: 'center', formatter: 'integer' },
                { name: 'name', index: 'name', width: 120, sortable: true, align: 'left' },
                { name: 'birthDate', index: 'birthDate', width: 120, sortable: false, align: 'center' },
                { name: 'gender', index: 'gender', width: 60, sortable: false, align: 'center' },
                { name: 'age', index: 'age', width: 60, sortable: false, align: 'center' },
                { name: 'category', index: 'category', width: 80, sortable: false, align: 'center' },
                { name: 'supporter', index: 'supporter', width: 100, sortable: false, align: 'left' }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'name',
            sortorder: 'asc',
            viewrecords: false,
            caption: '',
            height: '100%',
            width: '100%',
            autowidth: false,
            shrinkToFit: true,
            scroll: 1,
            scrollrows: true,
            gridComplete: function() {
                // 그리드 높이 조정
                const container = $('#participantGridContainer');
                if (container.length > 0) {
                    const containerHeight = container.height();
                    const headerHeight = 40; // 헤더 높이 추정
                    const paddingHeight = 30; // 패딩 높이
                    const gridHeight = containerHeight - paddingHeight;
                    if (gridHeight > 0) {
                        $('#ParticipantGrid').jqGrid('setGridHeight', gridHeight);
                    }
                }
                
                $('#ParticipantGrid').find('td, th').css({
                    'padding': '10px 8px',
                    'font-size': '13px',
                    'border': '1px solid #dee2e6'
                });
                $('#ParticipantGrid').find('th').css({
                    'background-color': '#f8f9fa',
                    'font-weight': '600',
                    'color': '#333'
                });
                $('#ParticipantGrid').find('tr').hover(
                    function() { $(this).css('background-color', '#f8f9fa'); },
                    function() { $(this).css('background-color', ''); }
                );
                
                // 체크박스 변경 이벤트
                $('#ParticipantGrid').find('.participant-checkbox').on('change', function() {
                    const participantId = parseInt($(this).data('id'));
                    if ($(this).is(':checked')) {
                        if (!selectedParticipantIds.includes(participantId)) {
                            selectedParticipantIds.push(participantId);
                        }
                    } else {
                        selectedParticipantIds = selectedParticipantIds.filter(id => id !== participantId);
                    }
                    updateParticipantCount();
                });
            },
            loadComplete: function(data) {
                setTimeout(() => {
                    // 그리드 높이 다시 조정
                    const container = $('#participantGridContainer');
                    if (container.length > 0) {
                        const containerHeight = container.height();
                        const paddingHeight = 30;
                        const gridHeight = containerHeight - paddingHeight;
                        if (gridHeight > 0) {
                            $('#ParticipantGrid').jqGrid('setGridHeight', gridHeight);
                        }
                    }
                    
                    $('#ParticipantGrid').find('td, th').css({
                        'padding': '10px 8px',
                        'font-size': '13px',
                        'border': '1px solid #dee2e6'
                    });
                }, 100);
            }
        };
        
        $('#ParticipantGrid').jqGrid(gridConfig);
        
        // 대상자 데이터 로드
        loadParticipantData();
    } catch (error) {
        console.error('대상자 그리드 초기화 중 오류:', error);
    }
}

// 직원 데이터 로드
function loadStaffData() {
    try {
        const gridData = mockStaff.map((staff, index) => ({
            id: staff.id,
            no: index + 1,
            name: staff.name,
            birthDate: staff.birthDate,
            position: staff.position
        }));
        
        $('#StaffGrid').jqGrid('clearGridData');
        $('#StaffGrid').jqGrid('setGridParam', {
            datatype: 'local',
            data: gridData
        });
        $('#StaffGrid').trigger('reloadGrid');
    } catch (error) {
        console.error('직원 데이터 로드 중 오류:', error);
    }
}

// 대상자 데이터 로드
function loadParticipantData() {
    try {
        const gridData = mockBeneficiaries.map((beneficiary, index) => ({
            id: beneficiary.id,
            no: index + 1,
            name: beneficiary.name,
            birthDate: beneficiary.birthDate,
            gender: beneficiary.gender,
            age: beneficiary.age,
            category: beneficiary.category,
            supporter: beneficiary.supporter
        }));
        
        $('#ParticipantGrid').jqGrid('clearGridData');
        $('#ParticipantGrid').jqGrid('setGridParam', {
            datatype: 'local',
            data: gridData
        });
        $('#ParticipantGrid').trigger('reloadGrid');
    } catch (error) {
        console.error('대상자 데이터 로드 중 오류:', error);
    }
}

// 직원수 업데이트
function updateStaffCount() {
    const count = selectedStaffIds.length;
    $('#staffCount').val(count);
}

// 대상자수 업데이트
function updateParticipantCount() {
    const count = selectedParticipantIds.length;
    $('#participantCount').val(count);
}

// 일정 데이터 로드
function loadScheduleData() {
    try {
        let data = [...mockSchedules];
        
        // 검색 필터 적용
        if (currentSearchParams.startDate) {
            data = data.filter(item => item.date >= currentSearchParams.startDate);
        }
        if (currentSearchParams.endDate) {
            data = data.filter(item => item.date <= currentSearchParams.endDate);
        }
        if (currentSearchParams.supporterId) {
            data = data.filter(item => item.supporterId == currentSearchParams.supporterId);
        }
        if (currentSearchParams.beneficiaryId) {
            data = data.filter(item => item.beneficiaryId == currentSearchParams.beneficiaryId);
        }
        
        // 그리드 데이터 변환
        const gridData = data.map(item => ({
            id: item.id,
            supporter: item.supporter,
            date: item.date,
            startTime: item.startTime,
            endTime: item.endTime,
            duration: item.duration,
            beneficiaryName: item.beneficiaryName,
            birthDate: item.birthDate,
            gender: item.gender,
            age: item.age,
            serviceName: item.serviceName,
            workDetails: item.workDetails
        }));
        
        $('#ScheduleGrid').jqGrid('clearGridData');
        $('#ScheduleGrid').jqGrid('setGridParam', {
            datatype: 'local',
            data: gridData
        });
        $('#ScheduleGrid').trigger('reloadGrid');
    } catch (error) {
        console.error('일정 데이터 로드 중 오류:', error);
        alert('일정 데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// 검색 실행
function performSearch() {
    currentSearchParams.startDate = $('#startDate').val() || '';
    currentSearchParams.endDate = $('#endDate').val() || '';
    currentSearchParams.supporterId = $('#selectSupporter').val() || '';
    currentSearchParams.beneficiaryId = $('#selectBeneficiary').val() || '';
    
    loadScheduleData();
}

// 일정등록 팝업 열기
function openScheduleEditModal(scheduleId) {
    // 기존 일정 수정인 경우
    if (scheduleId) {
        const schedule = mockSchedules.find(s => s.id === scheduleId);
        if (schedule) {
            $('#scheduleDate').val(schedule.date);
            $('#serviceName').val(schedule.serviceName);
            $('#scheduleContent').val(schedule.workDetails);
            $('#startTime').val(schedule.startTime);
            $('#endTime').val(schedule.endTime);
            $('#durationMinutes').val(schedule.duration);
            // TODO: 선택된 직원과 대상자 설정
        }
    } else {
        // 새 일정 등록인 경우
        const today = new Date();
        $('#scheduleDate').val(formatDateInput(today));
        $('#serviceName').val('');
        $('#scheduleContent').val('');
        $('#startTime').val('10:00');
        $('#endTime').val('11:30');
        $('#durationMinutes').val(90);
        selectedStaffIds = [];
        selectedParticipantIds = [];
        updateStaffCount();
        updateParticipantCount();
    }
    
    // 팝업 표시
    $('#scheduleEditModal').css('display', 'flex');
    
    // 팝업이 표시된 후 그리드 높이 재계산
    setTimeout(() => {
        // 그리드 새로고침
        $('#StaffGrid').trigger('reloadGrid');
        $('#ParticipantGrid').trigger('reloadGrid');
        
        // 그리드 높이 재계산
        setTimeout(() => {
            const staffContainer = $('#staffGridContainer');
            if (staffContainer.length > 0) {
                const staffContainerHeight = staffContainer.height();
                const staffPaddingHeight = 30;
                const staffGridHeight = staffContainerHeight - staffPaddingHeight;
                if (staffGridHeight > 0) {
                    $('#StaffGrid').jqGrid('setGridHeight', staffGridHeight);
                }
            }
            
            const participantContainer = $('#participantGridContainer');
            if (participantContainer.length > 0) {
                const participantContainerHeight = participantContainer.height();
                const participantPaddingHeight = 30;
                const participantGridHeight = participantContainerHeight - participantPaddingHeight;
                if (participantGridHeight > 0) {
                    $('#ParticipantGrid').jqGrid('setGridHeight', participantGridHeight);
                }
            }
        }, 200);
    }, 100);
}

// 일정등록 팝업 닫기
function closeScheduleEditModal() {
    $('#scheduleEditModal').css('display', 'none');
}

// 일정 저장
function saveSchedule() {
    try {
        const scheduleData = {
            date: $('#scheduleDate').val(),
            serviceName: $('#serviceName').val(),
            content: $('#scheduleContent').val(),
            resourceId: $('#selectResource').val(),
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val(),
            duration: parseInt($('#durationMinutes').val()) || 0,
            staffIds: selectedStaffIds,
            participantIds: selectedParticipantIds
        };
        
        // 유효성 검사
        if (!scheduleData.date) {
            alert('일자를 선택해주세요.');
            return;
        }
        if (!scheduleData.serviceName) {
            alert('제공서비스를 입력해주세요.');
            return;
        }
        if (selectedStaffIds.length === 0) {
            alert('직원을 최소 1명 이상 선택해주세요.');
            return;
        }
        if (selectedParticipantIds.length === 0) {
            alert('대상자를 최소 1명 이상 선택해주세요.');
            return;
        }
        
        if (dev) {
            // 개발 모드: 콘솔에 출력
            console.log('일정 저장:', scheduleData);
            alert('일정이 저장되었습니다.');
            closeScheduleEditModal();
            loadScheduleData();
        } else {
            // 실제 API 호출
            // TODO: API 호출 구현
        }
    } catch (error) {
        console.error('일정 저장 중 오류:', error);
        alert('일정 저장 중 오류가 발생했습니다.');
    }
}

// 페이지 초기화
function initGroupSchedule() {
    try {
        // 날짜 초기화
        initDateRange();
        
        // 드롭다운 초기화
        initSupporterDropdown();
        initBeneficiaryDropdown();
        initResourceDropdown();
        
        // 그리드 초기화
        initScheduleGrid();
        initStaffGrid();
        initParticipantGrid();
        
        // 데이터 로드
        loadScheduleData();
        
        // 이벤트 바인딩
        $('#btnSearch').on('click', performSearch);
        $('#btnAddSchedule').on('click', function() {
            openScheduleEditModal(null);
        });
        $('#btnCloseScheduleEdit').on('click', closeScheduleEditModal);
        $('#btnSaveSchedule').on('click', saveSchedule);
        
        // 시간 변경 시 소요시간 자동 계산
        $('#startTime, #endTime').on('change', function() {
            const startTime = $('#startTime').val();
            const endTime = $('#endTime').val();
            if (startTime && endTime) {
                const duration = calculateDuration(startTime, endTime);
                $('#durationMinutes').val(duration);
            }
        });
        
        // 서비스 검색 버튼
        $('#btnSearchService').on('click', function() {
            const serviceName = $('#serviceName').val();
            if (serviceName) {
                // TODO: 서비스 검색 로직 구현
                alert('서비스 검색 기능은 구현 중입니다.');
            } else {
                alert('서비스명을 입력해주세요.');
            }
        });
        
        // 창 크기 변경 시 그리드 높이 재계산
        $(window).on('resize', function() {
            if ($('#scheduleEditModal').is(':visible')) {
                setTimeout(() => {
                    const staffContainer = $('#staffGridContainer');
                    if (staffContainer.length > 0) {
                        const staffContainerHeight = staffContainer.height();
                        const staffPaddingHeight = 30;
                        const staffGridHeight = staffContainerHeight - staffPaddingHeight;
                        if (staffGridHeight > 0) {
                            $('#StaffGrid').jqGrid('setGridHeight', staffGridHeight);
                        }
                    }
                    
                    const participantContainer = $('#participantGridContainer');
                    if (participantContainer.length > 0) {
                        const participantContainerHeight = participantContainer.height();
                        const participantPaddingHeight = 30;
                        const participantGridHeight = participantContainerHeight - participantPaddingHeight;
                        if (participantGridHeight > 0) {
                            $('#ParticipantGrid').jqGrid('setGridHeight', participantGridHeight);
                        }
                    }
                }, 100);
            }
        });
        
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

