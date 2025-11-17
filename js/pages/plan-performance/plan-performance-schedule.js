// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleData = [
    // 강지원 전담사회복지사 그룹
    {
        id: 1,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '김영희',
        targetCount: { focused: 2, general: 14 },
        planCount: 165,
        actualCount: 161,
        groupPlanCount: 16,
        scheduleMemo: '김진순 어르신 장기부재 8/3~'
    },
    {
        id: 2,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '나숙회',
        targetCount: { focused: 1, general: 15 },
        planCount: 288,
        actualCount: 288,
        groupPlanCount: 16,
        scheduleMemo: ''
    },
    {
        id: 3,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '문미희',
        targetCount: { focused: 1, general: 16 },
        planCount: 336,
        actualCount: 305,
        groupPlanCount: 17,
        scheduleMemo: ''
    },
    {
        id: 4,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '박순옥',
        targetCount: { focused: 2, general: 12 },
        planCount: 123,
        actualCount: 79,
        groupPlanCount: 14,
        scheduleMemo: ''
    },
    {
        id: 5,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '김인경',
        targetCount: { focused: 2, general: 12 },
        planCount: 258,
        actualCount: 258,
        groupPlanCount: 14,
        scheduleMemo: ''
    },
    {
        id: 6,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '장선희',
        targetCount: { focused: 2, general: 12 },
        planCount: 139,
        actualCount: 120,
        groupPlanCount: 14,
        scheduleMemo: ''
    },
    {
        id: 7,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '조은숙',
        targetCount: { focused: 0, general: 0 },
        planCount: 16,
        actualCount: 16,
        groupPlanCount: 0,
        scheduleMemo: ''
    },
    {
        id: 8,
        socialWorkerName: '강지원',
        lifeSupportWorkerName: '이경순',
        targetCount: { focused: 0, general: 0 },
        planCount: 28,
        actualCount: 28,
        groupPlanCount: 0,
        scheduleMemo: ''
    },
    // 나지원 전담사회복지사 그룹
    {
        id: 9,
        socialWorkerName: '나지원',
        lifeSupportWorkerName: '홍길동',
        targetCount: { focused: 3, general: 10 },
        planCount: 200,
        actualCount: 200,
        groupPlanCount: 15,
        scheduleMemo: ''
    },
    {
        id: 10,
        socialWorkerName: '나지원',
        lifeSupportWorkerName: '이영희',
        targetCount: { focused: 2, general: 13 },
        planCount: 250,
        actualCount: 245,
        groupPlanCount: 16,
        scheduleMemo: '정기 방문 일정 조정 필요'
    }
];

// callAPI 함수 오버라이드 (dev=true 시 샘플 데이터 반환)
const originalCallAPI = window.callAPI;
window.callAPI = async function(endpoint, queryId, params = {}) {
    if (!dev) {
        // dev=false이면 원래 callAPI 함수 호출
        return await originalCallAPI(endpoint, queryId, params);
    }
    
    // dev=true이면 샘플 데이터 반환
    console.log('[DEV MODE] API 호출:', endpoint, queryId, params);
    
    // 쿼리 ID에 따라 다른 샘플 데이터 반환
    if (queryId === 'Q010') {
        // 목록 조회
        let filteredData = [...sampleData];
        
        // 필터 적용
        if (params.socialWorkerName) {
            filteredData = filteredData.filter(item => item.socialWorkerName === params.socialWorkerName);
        }
        if (params.lifeSupportWorkerName) {
            filteredData = filteredData.filter(item => 
                item.lifeSupportWorkerName.includes(params.lifeSupportWorkerName)
            );
        }
        
        return {
            results: [{
                selectResults: filteredData,
                totalResults: filteredData.length
            }],
            status: 'success'
        };
    } else if (queryId === 'Q030' || queryId === 'Q040' || queryId === 'Q050') {
        // 추가/수정/삭제
        return {
            status: 'success',
            message: '개발모드에서는 실제 저장되지 않습니다.'
        };
    } else {
        // 기타 쿼리
        return {
            status: 'success',
            results: [{
                selectResults: [],
                totalResults: 0
            }],
            message: '개발모드 샘플'
        };
    }
};

// ==========================================
// 페이지별 커스터마이즈 설정 (여기만 수정하면 됨)
// ==========================================
// 공통 함수들은 commonGrid.js에 정의되어 있습니다.
// 이 파일에서는 getPageConfig만 정의하면 됩니다.

function getPageConfig() {
    return {
        // API 엔드포인트 (페이지 파일명 자동 사용)
        apiEndpoint: getPagePrefix(),
        
        // 쿼리 ID 설정
        queries: {
            list: 'Q010',      // 목록 조회
            add: 'Q030',       // 추가
            edit: 'Q040',      // 수정
            delete: 'Q050',    // 삭제
        },
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['No', '전담사회복지사', '생활지원사', '대상자(중점)', '대상자(일반)', '계획', '실적', '단체PM 계획', '일정메모'],
            model: [
                { name: 'no', index: 'no', sorttype: "int", key: true, width: 60 },
                { name: 'socialWorkerName', index: 'socialWorkerName', width: 120, search: true, searchoptions: { sopt: ['cn'] } },
                { name: 'lifeSupportWorkerName', index: 'lifeSupportWorkerName', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'targetCountFocused', index: 'targetCountFocused', width: 80, align: 'center' },
                { name: 'targetCountGeneral', index: 'targetCountGeneral', width: 80, align: 'center' },
                { name: 'planCount', index: 'planCount', width: 80, align: 'center', formatter: function(cellvalue, options, rowObject) {
                    // 계획과 실적이 일치하지 않으면 빨간색
                    if (rowObject.planCount !== rowObject.actualCount) {
                        return '<span style="color: #ff0000; font-weight: bold;">' + cellvalue + '</span>';
                    }
                    // 일치하면 검정색
                    return '<span style="color: #000000;">' + cellvalue + '</span>';
                }},
                { name: 'actualCount', index: 'actualCount', width: 80, align: 'center', formatter: function(cellvalue, options, rowObject) {
                    // 계획과 실적이 일치하지 않으면 빨간색
                    if (rowObject.planCount !== rowObject.actualCount) {
                        return '<span style="color: #ff0000; font-weight: bold;">' + cellvalue + '</span>';
                    }
                    // 일치하면 검정색
                    return '<span style="color: #000000;">' + cellvalue + '</span>';
                }},
                { name: 'groupPlanCount', index: 'groupPlanCount', width: 100, align: 'center' },
                { name: 'scheduleMemo', index: 'scheduleMemo', width: 200, formatter: function(cellvalue, options, rowObject) {
                    // 원본 값을 data 속성에 저장
                    const originalValue = cellvalue || '';
                    if (originalValue && originalValue.length > 20) {
                        return '<span class="schedule-memo-link" data-id="' + rowObject.id + '" data-memo="' + originalValue.replace(/"/g, '&quot;') + '" style="cursor: pointer; color: #007bff; text-decoration: underline;">' + originalValue.substring(0, 20) + '...</span>';
                    } else if (originalValue) {
                        return '<span class="schedule-memo-link" data-id="' + rowObject.id + '" data-memo="' + originalValue.replace(/"/g, '&quot;') + '" style="cursor: pointer; color: #007bff; text-decoration: underline;">' + originalValue + '</span>';
                    }
                    return '';
                }}
            ]
        },
        
        // 그리드 설정
        grid: {
            caption: "계획/실적관리",
            sortname: 'socialWorkerName',
            sortorder: "asc"
        },
        
        // 메시지 텍스트
        messages: {
            add: '계획/실적 정보가 추가되었습니다.',
            edit: '계획/실적 정보가 수정되었습니다.',
            delete: '계획/실적 정보가 삭제되었습니다.',
            addError: '계획/실적 정보 추가 중 오류가 발생했습니다: ',
            editError: '계획/실적 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '계획/실적 정보 삭제 중 오류가 발생했습니다: '
        },
        
        // 데이터 변환 함수
        transformListItem: (item) => {
            return {
                id: item.id || 0,
                no: item.id || 0,
                socialWorkerName: item.socialWorkerName || '',
                lifeSupportWorkerName: item.lifeSupportWorkerName || '',
                targetCountFocused: item.targetCount?.focused || 0,
                targetCountGeneral: item.targetCount?.general || 0,
                planCount: item.planCount || 0,
                actualCount: item.actualCount || 0,
                groupPlanCount: item.groupPlanCount || 0,
                scheduleMemo: item.scheduleMemo || ''
            };
        },
        
        // 목록 조회 파라미터 생성
        buildListParams: (page = 1, rows = 20) => {
            const params = {
                page: page,
                rows: rows,
                year: currentYear || 2025,
                month: currentMonth || 8
            };
            
            // 필터 파라미터 추가
            const socialWorkerFilter = $('#socialWorkerFilter').val();
            if (socialWorkerFilter) {
                params.socialWorkerName = socialWorkerFilter;
            }
            
            const lifeSupportWorkerSearch = $('#lifeSupportWorkerSearch').val();
            if (lifeSupportWorkerSearch) {
                params.lifeSupportWorkerName = lifeSupportWorkerSearch;
            }
            
            return params;
        },
        
        // 입력 데이터 변환 함수
        transformInputData: (operType, data) => {
            return {
                id: data.id || 0,
                socialWorkerName: data.socialWorkerName || '',
                lifeSupportWorkerName: data.lifeSupportWorkerName || '',
                targetCount: {
                    focused: parseInt(data.targetCountFocused) || 0,
                    general: parseInt(data.targetCountGeneral) || 0
                },
                planCount: parseInt(data.planCount) || 0,
                actualCount: parseInt(data.actualCount) || 0,
                groupPlanCount: parseInt(data.groupPlanCount) || 0,
                scheduleMemo: data.scheduleMemo || '',
                year: currentYear || 2025,
                month: currentMonth || 8
            };
        },
        
        // 벨리데이션 함수
        validate: (operType, data) => {
            const missing = [];
            
            if (!data.lifeSupportWorkerName || String(data.lifeSupportWorkerName).trim() === '') {
                missing.push('생활지원사 이름');
            }
            
            if (missing.length > 0) {
                throw new Error('필수 항목 누락: ' + missing.join(', '));
            }
        }
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// 년/월 선택 변수
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1; // 0-11이므로 +1

// 페이지 로드 후 초기화
$(document).ready(function() {
    // 년도 드롭다운 생성 (현재 년도 + 이전 5개년도)
    const yearSelect = $('<select>').attr('id', 'yearSelect').css({
        padding: '5px 10px',
        margin: '0 10px'
    });
    const currentYearValue = today.getFullYear();
    for (let year = currentYearValue; year >= currentYearValue - 5; year--) {
        yearSelect.append($('<option>').val(year).text(year + '년').prop('selected', year === currentYearValue));
    }
    $('#yearDisplay').replaceWith(yearSelect);
    
    // 년도 선택 변경 이벤트
    $('#yearSelect').on('change', function() {
        currentYear = parseInt($(this).val());
        updateYearButtons();
        loadDataList(1, 20);
    });
    
    // 년도 선택 버튼
    $('#prevYearBtn').on('click', function() {
        if (!$(this).prop('disabled')) {
            currentYear--;
            $('#yearSelect').val(currentYear);
            updateYearButtons();
            loadDataList(1, 20);
        }
    });
    
    $('#nextYearBtn').on('click', function() {
        if (!$(this).prop('disabled')) {
            currentYear++;
            $('#yearSelect').val(currentYear);
            updateYearButtons();
            loadDataList(1, 20);
        }
    });
    
    // 년도 버튼 상태 업데이트 함수
    function updateYearButtons() {
        const currentYearValue = today.getFullYear();
        const minYear = currentYearValue - 5;
        
        // 이전 년도 버튼: 현재 년도가 최소 년도일 때 비활성화
        if (currentYear <= minYear) {
            $('#prevYearBtn').prop('disabled', true).css('opacity', '0.5');
        } else {
            $('#prevYearBtn').prop('disabled', false).css('opacity', '1');
        }
        
        // 다음 년도 버튼: 현재 년도가 오늘 년도일 때 비활성화
        if (currentYear >= currentYearValue) {
            $('#nextYearBtn').prop('disabled', true).css('opacity', '0.5');
        } else {
            $('#nextYearBtn').prop('disabled', false).css('opacity', '1');
        }
    }
    
    // 초기 년도 버튼 상태 설정
    updateYearButtons();
    
    // 월 탭 생성 (오늘 날짜의 월을 디폴트로 선택)
    for (let i = 1; i <= 12; i++) {
        const monthTab = $('<button>')
            .text(i + '월')
            .css({
                padding: '5px 10px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                background: i === currentMonth ? '#007bff' : '#fff',
                color: i === currentMonth ? '#fff' : '#000'
            })
            .on('click', function() {
                currentMonth = i;
                $('#monthTabs button').css({ background: '#fff', color: '#000' });
                $(this).css({ background: '#007bff', color: '#fff' });
                loadDataList(1, 20);
            });
        $('#monthTabs').append(monthTab);
    }
    
    // 현재 년도와 월을 초기값으로 설정
    $('#yearSelect').val(currentYear);
    
    // 검색 버튼
    $('#searchBtn').on('click', function() {
        loadDataList(1, 20);
    });
    
    // 엔터키로 검색
    $('#lifeSupportWorkerSearch').on('keypress', function(e) {
        if (e.which === 13) {
            loadDataList(1, 20);
        }
    });
    
    // 전담사회복지사 필터 초기화
    const socialWorkerNames = [...new Set(sampleData.map(item => item.socialWorkerName))];
    socialWorkerNames.forEach(name => {
        $('#socialWorkerFilter').append($('<option>').val(name).text(name));
    });
    
    // 일정메모 클릭 이벤트
    $(document).on('click', '.schedule-memo-link', function() {
        const rowId = $(this).data('id');
        const memoText = $(this).data('memo') || ''; // data 속성에서 원본 메모 가져오기
        
        // 그리드에서 행 데이터 가져오기
        const rowData = $('#MainGrid').jqGrid('getRowData', rowId);
        
        // 원본 메모 텍스트를 rowData에 설정
        if (memoText) {
            rowData.scheduleMemo = memoText;
        }
        
        openScheduleMemoModal(rowData);
    });
    
    // 일정엑셀등록 버튼
    $('#excelRegisterBtn').on('click', function() {
        alert('일정엑셀등록 기능은 준비 중입니다.');
    });
    
    // 그리드 초기화 후 셀 병합 적용
    // initMainGrid 함수가 실행된 후에 그리드에 loadComplete 이벤트 바인딩
    setTimeout(() => {
        $('#MainGrid').on('jqGridLoadComplete', function() {
            setTimeout(() => {
                mergeCells('#MainGrid', 'socialWorkerName');
            }, 100);
        });
        
        // 초기 로드 시에도 셀 병합 적용
        setTimeout(() => {
            mergeCells('#MainGrid', 'socialWorkerName');
        }, 1000);
    }, 100);
});

// 셀 병합 함수 (같은 값이 연속으로 있을 때 세로 병합)
function mergeCells(gridId, columnName) {
    try {
        const $grid = $(gridId);
        const rows = $grid.find('tr.jqgrow');
        const gridIdStr = gridId.replace('#', '');
        const startRowIndex = 0; // 헤더 행 제외
        
        if (rows.length === 0) return;
        
        let currentValue = null;
        let startRow = null;
        let spanCount = 0;
        
        rows.each(function(rowIndex) {
            if (rowIndex < startRowIndex) return true;
            
            const $row = $(this);
            const $cell = $row.find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
            
            if ($cell.length === 0) return true;
            
            const cellValue = $cell.text().trim();
            
            if (currentValue === null || cellValue !== currentValue) {
                // 새로운 값이 시작됨
                if (startRow !== null && spanCount > 1) {
                    // 이전 셀 병합
                    const $startCell = $(rows[startRow]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
                    if ($startCell.length > 0) {
                        $startCell.attr('rowspan', spanCount);
                        $startCell.css('vertical-align', 'middle');
                        // 중간 셀들 제거
                        for (let i = startRow + 1; i < startRow + spanCount; i++) {
                            const $removeCell = $(rows[i]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
                            if ($removeCell.length > 0) {
                                $removeCell.remove();
                            }
                        }
                    }
                }
                // 새로운 그룹 시작
                currentValue = cellValue;
                startRow = rowIndex;
                spanCount = 1;
            } else {
                // 같은 값이 계속됨
                spanCount++;
            }
        });
        
        // 마지막 그룹 처리
        if (startRow !== null && spanCount > 1) {
            const $startCell = $(rows[startRow]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
            if ($startCell.length > 0) {
                $startCell.attr('rowspan', spanCount);
                $startCell.css('vertical-align', 'middle');
                // 중간 셀들 제거
                for (let i = startRow + 1; i < startRow + spanCount; i++) {
                    const $removeCell = $(rows[i]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
                    if ($removeCell.length > 0) {
                        $removeCell.remove();
                    }
                }
            }
        }
    } catch (e) {
        console.error('셀 병합 중 오류:', e);
    }
}

// HTML 태그 제거 함수
function stripHtmlTags(html) {
    if (!html) return '';
    // HTML 태그 제거
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// 일정메모 모달 열기
function openScheduleMemoModal(rowData) {
    // 메모 내용에서 HTML 태그 제거
    const memoText = stripHtmlTags(rowData.scheduleMemo || '');
    
    // 모달 HTML 생성 (이미지와 동일한 형식)
    const modalHtml = `
        <div id="scheduleMemoModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 8px; width: 600px; max-width: 90%; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: bold;">메모</h2>
                    <button id="closeMemoModal" style="cursor: pointer; background: none; border: none; font-size: 24px; color: #666; padding: 0; width: 30px; height: 30px; line-height: 30px;">×</button>
                </div>
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">작성자</label>
                    <div style="padding: 8px; background: #f9f9f9; border-radius: 4px;">${rowData.socialWorkerName || '나지원'}</div>
                </div>
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">대상자</label>
                    <div style="padding: 8px; background: #f9f9f9; border-radius: 4px; line-height: 1.6;">
                        ${rowData.lifeSupportWorkerName || ''} 
                        ${rowData.targetCountFocused ? '(중점: ' + rowData.targetCountFocused + ', 일반: ' + rowData.targetCountGeneral + ')' : ''}
                    </div>
                </div>
                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">메모내용</label>
                    <textarea id="memoContent" style="width: 100%; height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; resize: vertical; font-family: inherit;">${memoText}</textarea>
                </div>
                <div style="text-align: center;">
                    <button id="saveMemoBtn" style="padding: 10px 30px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: bold;">저장</button>
                </div>
            </div>
        </div>
    `;
    
    // 기존 모달 제거
    $('#scheduleMemoModal').remove();
    
    // 모달 추가
    $('body').append(modalHtml);
    $('#scheduleMemoModal').fadeIn();
    
    // 모달 닫기
    $('#closeMemoModal, #cancelMemoBtn').on('click', function() {
        $('#scheduleMemoModal').fadeOut(function() {
            $(this).remove();
        });
    });
    
    // 저장
    $('#saveMemoBtn').on('click', function() {
        const memoContent = $('#memoContent').val();
        // TODO: API 호출하여 저장
        // 일단 로컬에서 그리드 데이터 업데이트
        const rowId = rowData.id;
        if (rowId) {
            const updatedData = $('#MainGrid').jqGrid('getRowData', rowId);
            updatedData.scheduleMemo = memoContent;
            $('#MainGrid').jqGrid('setRowData', rowId, updatedData);
        }
        showMessage('일정메모가 저장되었습니다.');
        $('#scheduleMemoModal').fadeOut(function() {
            $(this).remove();
            // 셀 병합 다시 적용
            setTimeout(() => {
                mergeCells('#MainGrid', 'socialWorkerName');
            }, 100);
        });
    });
}

