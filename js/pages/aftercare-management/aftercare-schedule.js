// 사후관리 일정등록 페이지

// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 현재 선택된 월/년도
let currentDate = new Date(2025, 8, 1); // 2025년 9월 (월은 0부터 시작)

// 일정 데이터
let scheduleData = {
    '2025-09-01': [
        { service: '전화', recipient: '김현정', time: '10:00 - 10:05', duration: '05분' }
    ],
    '2025-09-03': [
        { service: '방문', recipient: '김현정', time: '14:00 - 15:30', duration: '90분' }
    ],
    '2025-09-05': [
        { service: '전화', recipient: '김현정', time: '09:30 - 09:35', duration: '05분' },
        { service: '상담', recipient: '김현정', time: '15:00 - 15:30', duration: '30분' }
    ],
    '2025-09-07': [
        { service: '전화', recipient: '김현정', time: '11:00 - 11:05', duration: '05분' }
    ],
    '2025-09-09': [
        { service: '방문', recipient: '김현정', time: '13:00 - 14:30', duration: '90분' }
    ],
    '2025-09-11': [
        { service: '전화', recipient: '김현정', time: '10:00 - 10:05', duration: '05분' }
    ],
    '2025-09-13': [
        { service: '전화', recipient: '김현정', time: '09:00 - 09:05', duration: '05분' },
        { service: '덕표연계지원', recipient: '김현정', time: '14:00 - 15:00', duration: '60분' }
    ],
    '2025-09-15': [
        { service: '전화', recipient: '김현정', time: '10:30 - 10:35', duration: '05분' }
    ],
    '2025-09-17': [
        { service: '방문', recipient: '김현정', time: '13:30 - 15:00', duration: '90분' }
    ],
    '2025-09-19': [
        { service: '전화', recipient: '김현정', time: '11:00 - 11:05', duration: '05분' },
        { service: '상담', recipient: '김현정', time: '15:30 - 16:00', duration: '30분' }
    ],
    '2025-09-21': [
        { service: '전화', recipient: '김현정', time: '09:30 - 09:35', duration: '05분' }
    ],
    '2025-09-23': [
        { service: '민지들프로그램', recipient: '김현정', time: '10:00 - 11:30', duration: '90분' }
    ],
    '2025-09-25': [
        { service: '전화', recipient: '김현정', time: '10:00 - 10:05', duration: '05분' }
    ],
    '2025-09-27': [
        { service: '방문', recipient: '김현정', time: '14:00 - 15:30', duration: '90분' }
    ],
    '2025-09-29': [
        { service: '전화', recipient: '김현정', time: '11:00 - 11:05', duration: '05분' }
    ]
};

// Mock 데이터: 사후관리 대상자
const mockBeneficiaries = [
    { id: 1, name: '김현정', birthDate: '55/10/19', gender: '여', category: '중점', status: '사후관리' },
    { id: 2, name: '이영숙', birthDate: '48/03/25', gender: '여', category: '일반', status: '사후관리' },
    { id: 3, name: '박순자', birthDate: '52/07/12', gender: '여', category: '중점', status: '사후관리' },
    { id: 4, name: '최미영', birthDate: '50/11/08', gender: '여', category: '일반', status: '사후관리' },
    { id: 5, name: '정수진', birthDate: '47/05/30', gender: '여', category: '중점', status: '사후관리' },
    { id: 6, name: '강은희', birthDate: '49/09/15', gender: '여', category: '일반', status: '사후관리' },
    { id: 7, name: '윤경희', birthDate: '51/02/20', gender: '여', category: '중점', status: '사후관리' },
    { id: 8, name: '임영희', birthDate: '53/06/05', gender: '여', category: '일반', status: '사후관리' }
];

// Mock 데이터: 제공서비스 목록
const mockServices = [
    { id: 1, name: '전화', code: 'CALL' },
    { id: 2, name: '방문', code: 'VISIT' },
    { id: 3, name: '상담', code: 'CONSULT' }
];

// Mock 데이터: 자원 목록
const mockResources = [
    { id: 1, name: '자원1' },
    { id: 2, name: '자원2' },
    { id: 3, name: '자원3' }
];

// 대상자 그리드 초기화
function initBeneficiaryGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['', '대상자', '생년월일', '성별', '구분', '상태'],
            colModel: [
                {
                    name: 'checkbox',
                    index: 'checkbox',
                    width: 30,
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<input type="checkbox" class="beneficiary-checkbox" data-beneficiary-id="' + rowObject.id + '">';
                    }
                },
                { name: 'name', index: 'name', width: 100, sortable: true },
                { name: 'birthDate', index: 'birthDate', width: 100, sortable: true },
                { name: 'gender', index: 'gender', width: 60 },
                { name: 'category', index: 'category', width: 80 },
                { name: 'status', index: 'status', width: 100 }
            ],
            rowNum: 1000,
            pager: false,
            sortname: 'name',
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
        
        // grid-container의 실제 너비에 맞춰 그리드 너비 설정
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
        const dataList = mockBeneficiaries.map((item, index) => ({
            id: item.id || 'b_' + index,
            name: item.name || '',
            birthDate: item.birthDate || '',
            gender: item.gender || '',
            category: item.category || '',
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

// 달력 위젯 초기화
function initCalendar() {
    try {
        $('#calendarWidget').datepicker({
            dateFormat: 'yy.mm',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            showMonthAfterYear: true,
            yearSuffix: '년',
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            firstDay: 0,
            showOtherMonths: true,
            selectOtherMonths: true,
            onClose: function(dateText, inst) {
                const month = inst.selectedMonth + 1;
                const year = inst.selectedYear;
                currentDate = new Date(year, month - 1, 1);
                $(this).datepicker('setDate', currentDate);
                updateMonthDisplay();
                renderScheduleGrid();
            },
            onChangeMonthYear: function(year, month, inst) {
                currentDate = new Date(year, month - 1, 1);
                updateMonthDisplay();
                renderScheduleGrid();
                // 날짜 선택 후 달력 닫기
                setTimeout(() => {
                    $(inst.input).datepicker('hide');
                }, 100);
            },
            beforeShow: function(input, inst) {
                // 달력이 열릴 때 현재 선택된 월로 설정
                inst.selectedYear = currentDate.getFullYear();
                inst.selectedMonth = currentDate.getMonth();
            }
        });
        
        // 달력 스타일 커스터마이징
        $(document).on('DOMNodeInserted', function(e) {
            if ($(e.target).hasClass('ui-datepicker')) {
                $('.ui-datepicker').css({
                    'font-size': '13px',
                    'border-radius': '8px',
                    'box-shadow': '0 4px 6px rgba(0,0,0,0.1)'
                });
                $('.ui-datepicker-header').css({
                    'background': '#007bff',
                    'color': '#fff',
                    'border-radius': '8px 8px 0 0',
                    'padding': '10px'
                });
                $('.ui-datepicker-prev, .ui-datepicker-next').css({
                    'background': 'rgba(255,255,255,0.2)',
                    'border-radius': '4px',
                    'cursor': 'pointer'
                });
                $('.ui-datepicker-prev:hover, .ui-datepicker-next:hover').css({
                    'background': 'rgba(255,255,255,0.3)'
                });
                $('.ui-datepicker-calendar th').css({
                    'background': '#f8f9fa',
                    'font-weight': '600',
                    'padding': '8px'
                });
                $('.ui-datepicker-calendar td a').css({
                    'padding': '8px',
                    'border-radius': '4px'
                });
                $('.ui-datepicker-calendar td a.ui-state-active').css({
                    'background': '#007bff',
                    'color': '#fff',
                    'font-weight': '600'
                });
                $('.ui-datepicker-calendar td a.ui-state-hover').css({
                    'background': '#e9ecef'
                });
                $('.ui-datepicker-calendar td.ui-datepicker-week-end a').css({
                    'color': '#dc3545'
                });
            }
        });
        
        // 초기 날짜 설정
        $('#calendarWidget').datepicker('setDate', currentDate);
        $('#calendarWidget').val(currentDate.getFullYear() + '.' + String(currentDate.getMonth() + 1).padStart(2, '0'));
        
        // 월 표시 업데이트
        updateMonthDisplay();
    } catch (e) {
        console.error('달력 초기화 중 오류:', e);
    }
}

// 월 표시 업데이트
function updateMonthDisplay() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    $('#currentMonth').text(year + '.' + month);
}

// 주간 서비스 그리드 렌더링
function renderScheduleGrid() {
    try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        
        // 요일 배열 (일요일부터)
        const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const weekdaysShort = ['일', '월', '화', '수', '목', '금', '토'];
        
        let html = '<table style="width: 100%; border-collapse: collapse; border: 1px solid #dee2e6; font-size: 13px;">';
        
        // 헤더: 주간서비스
        html += '<thead>';
        html += '<tr style="background-color: #f8f9fa;">';
        html += '<th style="padding: 12px 8px; border: 1px solid #dee2e6; width: 80px; text-align: center; font-weight: 600; color: #333;">CP</th>';
        html += '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: center; font-weight: 600; color: #333;">주간일정</th>';
        for (let i = 0; i < 7; i++) {
            html += '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: center; position: relative; font-weight: 600; color: #333;">';
            html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
            html += '<span>' + weekdays[i] + '</span>';
            html += '<div style="display: flex; gap: 5px; align-items: center;">';
            html += '<span style="font-size: 11px; color: #666;">CP</span>';
            html += '<button class="btn-remove-weekday" data-weekday="' + i + '" style="background: none; border: none; cursor: pointer; font-size: 14px; color: #dc3545; padding: 2px 5px; border-radius: 3px;" title="요일 삭제">X</button>';
            html += '</div>';
            html += '</div>';
            html += '</th>';
        }
        html += '</tr>';
        html += '</thead>';
        
        // 날짜 그리드
        html += '<tbody>';
        let currentDateNum = 1;
        let weekNum = 0;
        
        // 첫 주 (빈 셀 포함)
        html += '<tr>';
        html += '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; vertical-align: top; background-color: #f8f9fa;">';
        html += '<input type="checkbox" class="week-cp-checkbox" data-week="' + weekNum + '" style="cursor: pointer;">';
        html += '</td>';
        html += '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; vertical-align: top; background-color: #f8f9fa;">';
        html += '<button class="btn-remove-week" data-week="' + weekNum + '" style="background: none; border: none; cursor: pointer; font-size: 14px; color: #dc3545; padding: 4px 8px; border-radius: 3px;" title="주 삭제">X</button>';
        html += '</td>';
        
        for (let day = 0; day < 7; day++) {
            if (day < firstDay) {
                html += '<td style="padding: 8px; border: 1px solid #dee2e6; min-height: 120px; vertical-align: top; background-color: #f8f9fa;"></td>';
            } else {
                const dateStr = formatDate(year, month, currentDateNum);
                html += renderDayCell(currentDateNum, dateStr, weekNum);
                currentDateNum++;
            }
        }
        html += '</tr>';
        
        // 나머지 주들
        while (currentDateNum <= daysInMonth) {
            weekNum++;
            html += '<tr>';
            html += '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; vertical-align: top; background-color: #f8f9fa;">';
            html += '<input type="checkbox" class="week-cp-checkbox" data-week="' + weekNum + '" style="cursor: pointer;">';
            html += '</td>';
            html += '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: center; vertical-align: top; background-color: #f8f9fa;">';
            html += '<button class="btn-remove-week" data-week="' + weekNum + '" style="background: none; border: none; cursor: pointer; font-size: 14px; color: #dc3545; padding: 4px 8px; border-radius: 3px;" title="주 삭제">X</button>';
            html += '</td>';
            
            for (let day = 0; day < 7; day++) {
                if (currentDateNum > daysInMonth) {
                    html += '<td style="padding: 8px; border: 1px solid #dee2e6; min-height: 120px; vertical-align: top; background-color: #f8f9fa;"></td>';
                } else {
                    const dateStr = formatDate(year, month, currentDateNum);
                    html += renderDayCell(currentDateNum, dateStr, weekNum);
                    currentDateNum++;
                }
            }
            html += '</tr>';
        }
        
        html += '</tbody>';
        html += '</table>';
        
        $('#scheduleGrid').html(html);
        
        // 이벤트 바인딩
        bindScheduleEvents();
    } catch (e) {
        console.error('주간 서비스 그리드 렌더링 중 오류:', e);
    }
}

// 날짜 셀 렌더링
function renderDayCell(dateNum, dateStr, weekNum) {
    const isHoliday = isHolidayDate(dateStr);
    const daySchedules = scheduleData[dateStr] || [];
    const dayOfWeek = new Date(dateStr).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 일요일 또는 토요일
    const cellBgColor = isWeekend ? (dayOfWeek === 0 ? '#fff5f5' : '#f0f8ff') : '#ffffff';
    
    let html = '<td style="padding: 8px; border: 1px solid #dee2e6; min-height: 120px; vertical-align: top; position: relative; background-color: ' + cellBgColor + ';">';
    html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding-bottom: 5px; border-bottom: 1px solid #e9ecef;">';
    html += '<span style="font-weight: 600; font-size: 14px; ' + (isWeekend ? 'color: #dc3545;' : 'color: #333;') + '">' + dateNum + '</span>';
    html += '<div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">';
    html += '<button class="btn-add-schedule" data-date="' + dateStr + '" style="padding: 4px 8px; font-size: 11px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; white-space: nowrap; font-weight: 500;">추가</button>';
    html += '<button class="btn-save-day" data-date="' + dateStr + '" style="padding: 4px 8px; font-size: 11px; background-color: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; white-space: nowrap; font-weight: 500;">저장</button>';
    html += '<input type="checkbox" class="day-cp-checkbox" data-date="' + dateStr + '" style="margin: 0; cursor: pointer; width: 16px; height: 16px;">';
    html += '</div>';
    html += '</div>';
    
    // 공휴일 표시
    if (isHoliday) {
        html += '<div style="color: #dc3545; font-weight: 600; margin-bottom: 8px; font-size: 12px; padding: 4px; background-color: #fff5f5; border-radius: 3px; text-align: center;">광복절</div>';
    }
    
    // 일정 목록
    html += '<div class="schedule-list" data-date="' + dateStr + '" style="min-height: 60px;">';
    if (daySchedules.length === 0) {
        html += '<div style="color: #999; font-size: 11px; text-align: center; padding: 10px;">일정 없음</div>';
    } else {
        daySchedules.forEach((schedule, index) => {
            html += '<div class="schedule-item" style="margin-bottom: 6px; padding: 6px 8px; background-color: #e9ecef; border-left: 3px solid #007bff; border-radius: 4px; font-size: 12px; cursor: pointer; transition: background-color 0.2s;" title="클릭하여 삭제" onmouseover="this.style.backgroundColor=\'#dee2e6\'" onmouseout="this.style.backgroundColor=\'#e9ecef\'">';
            html += '<div style="font-weight: 600; color: #333; margin-bottom: 2px;">' + schedule.service + ' ' + schedule.recipient + '</div>';
            html += '<div style="color: #666; font-size: 11px;">' + schedule.time + ' (' + schedule.duration + ')</div>';
            html += '</div>';
        });
    }
    html += '</div>';
    
    html += '</td>';
    return html;
}

// 날짜 포맷팅 (YYYY-MM-DD)
function formatDate(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return year + '-' + m + '-' + d;
}

// 공휴일 체크 (예시: 광복절)
function isHolidayDate(dateStr) {
    // 2025-09-15 광복절
    return dateStr === '2025-09-15';
}

// 일정 그리드 이벤트 바인딩
function bindScheduleEvents() {
    // 추가 버튼
    $('.btn-add-schedule').off('click').on('click', function(e) {
        e.stopPropagation();
        const dateStr = $(this).data('date');
        addScheduleToDate(dateStr);
    });
    
    // 저장 버튼
    $('.btn-save-day').off('click').on('click', function(e) {
        e.stopPropagation();
        const dateStr = $(this).data('date');
        saveDaySchedule(dateStr);
    });
    
    // 일정 항목 클릭하여 삭제
    $('.schedule-item').off('click').on('click', function(e) {
        e.stopPropagation();
        if (confirm('이 일정을 삭제하시겠습니까?')) {
            const dateStr = $(this).closest('.schedule-list').data('date');
            const scheduleIndex = $(this).index();
            if (scheduleData[dateStr] && scheduleData[dateStr][scheduleIndex]) {
                scheduleData[dateStr].splice(scheduleIndex, 1);
                if (scheduleData[dateStr].length === 0) {
                    delete scheduleData[dateStr];
                }
                renderScheduleGrid();
            }
        }
    });
    
    // 요일 제거 버튼
    $('.btn-remove-weekday').off('click').on('click', function(e) {
        e.stopPropagation();
        const weekday = $(this).data('weekday');
        if (confirm('이 요일의 모든 일정을 삭제하시겠습니까?')) {
            removeWeekdaySchedules(weekday);
        }
    });
    
    // 주 제거 버튼
    $('.btn-remove-week').off('click').on('click', function(e) {
        e.stopPropagation();
        const week = $(this).data('week');
        if (confirm('이 주의 모든 일정을 삭제하시겠습니까?')) {
            removeWeekSchedules(week);
        }
    });
}

// 선택된 날짜에 일정 추가
function addScheduleToDate(dateStr) {
    try {
        const serviceName = $('#serviceName').val().trim();
        const resourceName = $('#resourceName').val().trim();
        const startTime = $('#startTime').val().trim();
        const endTime = $('#endTime').val().trim();
        const selectedBeneficiary = $('.beneficiary-checkbox:checked').first();
        
        if (!serviceName) {
            alert('제공서비스를 선택해주세요.');
            return;
        }
        
        if (!selectedBeneficiary.length) {
            alert('대상자를 선택해주세요.');
            return;
        }
        
        const beneficiaryRowId = selectedBeneficiary.data('beneficiary-id');
        const beneficiaryData = $('#BeneficiaryGrid').jqGrid('getRowData', beneficiaryRowId);
        const beneficiaryName = beneficiaryData ? beneficiaryData.name : '';
        
        if (!beneficiaryName) {
            alert('대상자 정보를 가져올 수 없습니다.');
            return;
        }
        
        if (!startTime || !endTime) {
            alert('시간을 입력해주세요.');
            return;
        }
        
        // 시간 차이 계산 (분)
        const start = parseTime(startTime);
        const end = parseTime(endTime);
        const duration = calculateDuration(start, end);
        
        if (duration <= 0) {
            alert('종료 시간은 시작 시간보다 늦어야 합니다.');
            return;
        }
        
        // 일정 추가
        if (!scheduleData[dateStr]) {
            scheduleData[dateStr] = [];
        }
        
        // 시간 포맷 변환 (HH:MM)
        const startTimeFormatted = startTime.substring(0, 5);
        const endTimeFormatted = endTime.substring(0, 5);
        
        scheduleData[dateStr].push({
            service: serviceName,
            recipient: beneficiaryName,
            time: startTimeFormatted + ' - ' + endTimeFormatted,
            duration: String(duration).padStart(2, '0') + '분'
        });
        
        // 그리드 다시 렌더링
        renderScheduleGrid();
        
        // 입력 필드 초기화 (시간은 기본값으로 리셋)
        $('#serviceName').val('');
        $('#resourceName').val('');
        $('#startTime').val('10:00');
        $('#endTime').val('10:05');
        
        if (typeof showMessage === 'function') {
            showMessage('일정이 추가되었습니다.');
        } else {
            alert('일정이 추가되었습니다.');
        }
    } catch (e) {
        console.error('일정 추가 중 오류:', e);
        alert('일정 추가 중 오류가 발생했습니다.');
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

// 날짜별 일정 저장
function saveDaySchedule(dateStr) {
    try {
        if (!scheduleData[dateStr] || scheduleData[dateStr].length === 0) {
            alert('저장할 일정이 없습니다.');
            return;
        }
        
        if (typeof showMessage === 'function') {
            showMessage('일정이 저장되었습니다.');
        } else {
            alert('일정이 저장되었습니다.');
        }
    } catch (e) {
        console.error('일정 저장 중 오류:', e);
        alert('일정 저장 중 오류가 발생했습니다.');
    }
}

// 요일별 일정 삭제
function removeWeekdaySchedules(weekday) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    let dateNum = 1;
    if (weekday < firstDay) {
        dateNum += (7 - firstDay) + weekday;
    } else {
        dateNum += (weekday - firstDay);
    }
    
    while (dateNum <= daysInMonth) {
        const dateStr = formatDate(year, month, dateNum);
        if (scheduleData[dateStr]) {
            delete scheduleData[dateStr];
        }
        dateNum += 7;
    }
    
    renderScheduleGrid();
}

// 주별 일정 삭제
function removeWeekSchedules(week) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const startDate = week * 7 - firstDay + 1;
    const endDate = Math.min(startDate + 6, daysInMonth);
    
    for (let dateNum = Math.max(1, startDate); dateNum <= endDate; dateNum++) {
        const dateStr = formatDate(year, month, dateNum);
        if (scheduleData[dateStr]) {
            delete scheduleData[dateStr];
        }
    }
    
    renderScheduleGrid();
}

// 제공서비스 찾기 버튼 이벤트
function bindServiceSearch() {
    $('#btnSearchService').off('click').on('click', function() {
        // 서비스 선택 팝업 (간단한 예시)
        const serviceOptions = mockServices.map(s => s.name).join('\n');
        const selectedService = prompt('서비스를 선택하세요:\n' + serviceOptions);
        if (selectedService) {
            $('#serviceName').val(selectedService);
        }
    });
}

// 자원 선택 (드롭다운)
function bindResourceSelect() {
    $('#resourceName').off('focus').on('focus', function() {
        // 자원 선택 팝업 (간단한 예시)
        const resourceOptions = mockResources.map(r => r.name).join('\n');
        const selectedResource = prompt('자원을 선택하세요:\n' + resourceOptions);
        if (selectedResource) {
            $('#resourceName').val(selectedResource);
        }
    });
}

// 버튼 이벤트 바인딩
function bindButtonEvents() {
    // 저장 버튼
    $('#btnSave').off('click').on('click', function() {
        if (confirm('모든 일정을 저장하시겠습니까?')) {
            saveAllSchedules();
        }
    });
    
    // PDF 버튼
    $('#btnPDF').off('click').on('click', function() {
        alert('PDF 다운로드 기능 (구현 예정)');
    });
    
    // EXCEL 버튼
    $('#btnEXCEL').off('click').on('click', function() {
        alert('EXCEL 다운로드 기능 (구현 예정)');
    });
    
    // 중복삭제 버튼
    $('#btnDeleteDuplicates').off('click').on('click', function() {
        if (confirm('중복된 일정을 삭제하시겠습니까?')) {
            deleteDuplicateSchedules();
        }
    });
    
    // 전체삭제 버튼
    $('#btnDeleteAll').off('click').on('click', function() {
        if (confirm('모든 일정을 삭제하시겠습니까?')) {
            scheduleData = {};
            renderScheduleGrid();
            if (typeof showMessage === 'function') {
                showMessage('모든 일정이 삭제되었습니다.');
            } else {
                alert('모든 일정이 삭제되었습니다.');
            }
        }
    });
}

// 모든 일정 저장
function saveAllSchedules() {
    try {
        const totalSchedules = Object.values(scheduleData).reduce((sum, arr) => sum + arr.length, 0);
        if (totalSchedules === 0) {
            alert('저장할 일정이 없습니다.');
            return;
        }
        
        if (typeof showMessage === 'function') {
            showMessage('모든 일정이 저장되었습니다.');
        } else {
            alert('모든 일정이 저장되었습니다.');
        }
    } catch (e) {
        console.error('일정 저장 중 오류:', e);
        alert('일정 저장 중 오류가 발생했습니다.');
    }
}

// 중복 일정 삭제
function deleteDuplicateSchedules() {
    try {
        let deletedCount = 0;
        Object.keys(scheduleData).forEach(dateStr => {
            const schedules = scheduleData[dateStr];
            const uniqueSchedules = [];
            const seen = new Set();
            
            schedules.forEach(schedule => {
                const key = schedule.service + '|' + schedule.recipient + '|' + schedule.time;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueSchedules.push(schedule);
                } else {
                    deletedCount++;
                }
            });
            
            if (uniqueSchedules.length === 0) {
                delete scheduleData[dateStr];
            } else {
                scheduleData[dateStr] = uniqueSchedules;
            }
        });
        
        renderScheduleGrid();
        
        if (typeof showMessage === 'function') {
            showMessage(deletedCount + '개의 중복 일정이 삭제되었습니다.');
        } else {
            alert(deletedCount + '개의 중복 일정이 삭제되었습니다.');
        }
    } catch (e) {
        console.error('중복 일정 삭제 중 오류:', e);
        alert('중복 일정 삭제 중 오류가 발생했습니다.');
    }
}

// 페이지 초기화 함수
function initAftercareSchedule() {
    try {
        // 대상자 그리드 초기화
        initBeneficiaryGrid();
        
        // 달력 초기화
        initCalendar();
        
        // 주간 서비스 그리드 렌더링
        renderScheduleGrid();
        
        // 이벤트 바인딩
        bindServiceSearch();
        bindResourceSelect();
        bindButtonEvents();
        
        // 창 크기 변경 시 그리드 재조정
        $(window).on('resize', function() {
            setTimeout(() => {
                const gridContainer = $('#BeneficiaryGrid').closest('.grid-container');
                if (gridContainer.length > 0) {
                    const containerWidth = gridContainer.width();
                    if (containerWidth > 0) {
                        $('#BeneficiaryGrid').jqGrid('setGridWidth', containerWidth, false);
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
window.initAftercareSchedule = initAftercareSchedule;

