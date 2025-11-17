// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 현재 조회일자 (기본값: 오늘)
let currentInquiryDate = new Date().toISOString().split('T')[0];

// 샘플 데이터 정의
const sampleData = [
    {
        no: 1,
        welfareWorker: '강정주',
        supportWorker: '이양숙',
        supportWorkerId: 1,
        dailyPlan: 17,
        dailyExecuted: 16,
        dailyPending: 1,
        weeklyPlan: 17,
        weeklyExecuted: 16,
        weeklyPending: 1,
        firstScheduleTime: '08:59',
        lastTime: '15:17',
        lastWorkLocation: '인천광역시 중구 율목로32번길 15-1(율목동)'
    },
    {
        no: 2,
        welfareWorker: '강정주',
        supportWorker: '정순임',
        supportWorkerId: 2,
        dailyPlan: 10,
        dailyExecuted: 10,
        dailyPending: 0,
        weeklyPlan: 50,
        weeklyExecuted: 48,
        weeklyPending: 2,
        firstScheduleTime: '09:00',
        lastTime: '16:30',
        lastWorkLocation: '인천광역시 중구 참외전로123번길 45'
    },
    {
        no: 3,
        welfareWorker: '김영희',
        supportWorker: '박민수',
        supportWorkerId: 3,
        dailyPlan: 15,
        dailyExecuted: 14,
        dailyPending: 1,
        weeklyPlan: 75,
        weeklyExecuted: 73,
        weeklyPending: 2,
        firstScheduleTime: '08:30',
        lastTime: '17:00',
        lastWorkLocation: '인천광역시 남동구 구월로456번길 78'
    },
    {
        no: 4,
        welfareWorker: '김영희',
        supportWorker: '최지영',
        supportWorkerId: 4,
        dailyPlan: 12,
        dailyExecuted: 12,
        dailyPending: 0,
        weeklyPlan: 60,
        weeklyExecuted: 60,
        weeklyPending: 0,
        firstScheduleTime: '09:15',
        lastTime: '16:45',
        lastWorkLocation: '인천광역시 남동구 인주대로789번길 12'
    },
    {
        no: 5,
        welfareWorker: '이철수',
        supportWorker: '한소희',
        supportWorkerId: 5,
        dailyPlan: 20,
        dailyExecuted: 18,
        dailyPending: 2,
        weeklyPlan: 100,
        weeklyExecuted: 95,
        weeklyPending: 5,
        firstScheduleTime: '08:00',
        lastTime: '18:00',
        lastWorkLocation: '인천광역시 부평구 부평대로321번길 56'
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
        // 목록 조회 - 조회일자 필터링 (샘플에서는 무시)
        let filteredData = [...sampleData];
        
        // 사회복지사 필터 적용
        if (params.welfareWorker && params.welfareWorker !== '전체') {
            filteredData = filteredData.filter(item => item.welfareWorker === params.welfareWorker);
        }
        
        return {
            results: [{
                selectResults: filteredData,
                totalResults: filteredData.length
            }],
            status: 'success'
        };
    } else if (queryId === 'Q020') {
        // 사회복지사 목록 조회
        const welfareWorkers = [...new Set(sampleData.map(item => item.welfareWorker))];
        return {
            results: [{
                selectResults: welfareWorkers.map(name => ({ welfareWorker: name })),
                totalResults: welfareWorkers.length
            }],
            status: 'success'
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
            list: 'Q010',      // 생활지원사 목록 조회
            welfareWorkerList: 'Q020'  // 사회복지사 목록 조회
        },
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['사회복지사', 'No', '지원사', '계획', '실행', '대기', '계획', '실행', '대기', '첫일정 시간', '최종시간', '업무 최종 위치'],
            model: [
                { name: 'welfareWorker', index: 'welfareWorker', width: 120, align: 'center', sortable: true, search: true, searchoptions: { sopt: ['cn'] } },
                { name: 'no', index: 'no', sorttype: "int", width: 60, align: 'center', sortable: true },
                { name: 'supportWorker', index: 'supportWorker', width: 100, align: 'center', sortable: true, search: true, searchoptions: { sopt: ['cn'] },
                    formatter: function(cellvalue, options, rowObject) {
                        return '<a href="#" class="support-worker-link" data-worker-id="' + rowObject.supportWorkerId + '" style="color: #007bff; text-decoration: underline; cursor: pointer;">' + cellvalue + '</a>';
                    }
                },
                { name: 'dailyPlan', index: 'dailyPlan', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'dailyExecuted', index: 'dailyExecuted', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'dailyPending', index: 'dailyPending', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'weeklyPlan', index: 'weeklyPlan', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'weeklyExecuted', index: 'weeklyExecuted', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'weeklyPending', index: 'weeklyPending', width: 70, align: 'center', sortable: true,
                    formatter: function(cellvalue) {
                        return '<div style="text-align: center;">' + (cellvalue || 0) + '</div>';
                    }
                },
                { name: 'firstScheduleTime', index: 'firstScheduleTime', width: 100, align: 'center', sortable: true, search: false },
                { name: 'lastTime', index: 'lastTime', width: 100, align: 'center', sortable: true, search: false },
                { name: 'lastWorkLocation', index: 'lastWorkLocation', width: 300, align: 'left', sortable: true, search: true, searchoptions: { sopt: ['cn'] } }
            ]
        },
        
        // 그리드 설정
        grid: {
            caption: "생활지원사 모니터링",
            sortname: 'no',
            sortorder: "asc",
            grouping: false,  // 셀 병합을 위해 grouping 비활성화
            shrinkToFit: true  // 컬럼 너비를 그리드 너비에 맞춤
        },
        
        // 메시지 텍스트
        messages: {
            loadError: '목록 조회 중 오류가 발생했습니다.',
            noData: '조회된 데이터가 없습니다.'
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => ({
            no: item.no || '',
            welfareWorker: item.welfareWorker || '',
            supportWorker: item.supportWorker || '',
            supportWorkerId: item.supportWorkerId || '',
            dailyPlan: item.dailyPlan || 0,
            dailyExecuted: item.dailyExecuted || 0,
            dailyPending: item.dailyPending || 0,
            weeklyPlan: item.weeklyPlan || 0,
            weeklyExecuted: item.weeklyExecuted || 0,
            weeklyPending: item.weeklyPending || 0,
            firstScheduleTime: item.firstScheduleTime || '',
            lastTime: item.lastTime || '',
            lastWorkLocation: item.lastWorkLocation || '-'
        }),
        
        // 목록 조회 파라미터 구성 함수
        buildListParams: (page, rows) => {
            const inquiryDate = $('#inquiryDate').val() || currentInquiryDate;
            const welfareWorker = $('#welfareWorkerSelect').val() || '전체';
            return {
                inquiryDate: inquiryDate,
                welfareWorker: welfareWorker,
                '1': rows.toString(),
                '2': ((page - 1) * rows).toString()
            };
        }
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 페이지 초기화
// ==========================================

// 페이지 초기화 함수
function initPage() {
    // jQuery가 로드될 때까지 대기
    if (typeof jQuery === 'undefined' || typeof $ === 'undefined') {
        setTimeout(initPage, 100);
        return;
    }
    
    // 조회일자 기본값 설정 (오늘 날짜)
    $('#inquiryDate').val(currentInquiryDate);
    
    // 날짜 선택기 초기화
    $('#inquiryDate').datepicker({
        dateFormat: 'yy-mm-dd',
        showMonthAfterYear: true,
        yearSuffix: '년',
        changeMonth: true,
        changeYear: true,
        onSelect: function(dateText) {
            currentInquiryDate = dateText;
            // 날짜 변경 시 리스트 재조회
            loadMonitoringData();
        }
    });
    
    // 사회복지사 목록 로드
    loadWelfareWorkerList();
    
    // 검색 버튼 클릭 이벤트
    $('#searchBtn').off('click').on('click', function() {
        loadMonitoringData();
    });
    
    // 그리드 초기화 후 서브헤더 추가 및 지원사 링크 이벤트 바인딩
    setTimeout(() => {
        const grid = $('#MainGrid');
        
        if (grid.length === 0) {
            return;
        }
        
        // 서브헤더 추가 (당일일정, 주간일정)
        addSubHeaders();
        
        // 그리드 너비 조정
        adjustGridWidth();
        
        // 초기 데이터 로드 후 셀 병합 적용
        setTimeout(() => {
            mergeCellsHierarchical('#MainGrid', 'welfareWorker', []);
            // 그리드 너비 재조정 (여러 번 시도)
            adjustGridWidth();
            setTimeout(() => {
                adjustGridWidth();
            }, 200);
        }, 100);
        
        // 윈도우 리사이즈 시 그리드 너비 재조정
        $(window).off('resize.supportWorkerMonitoring').on('resize.supportWorkerMonitoring', function() {
            setTimeout(() => {
                adjustGridWidth();
            }, 100);
        });
        
        // loadComplete에 지원사 링크 이벤트 바인딩 추가
        const originalLoadComplete = grid.jqGrid('getGridParam', 'loadComplete');
        grid.jqGrid('setGridParam', {
            loadComplete: function(data) {
                if (originalLoadComplete && typeof originalLoadComplete === 'function') {
                    originalLoadComplete.call(this, data);
                }
                // 서브헤더 재추가 및 셀 병합
                setTimeout(() => {
                    addSubHeaders();
                    // 사회복지사 컬럼 셀 병합
                    mergeCellsHierarchical('#MainGrid', 'welfareWorker', []);
                    // 그리드 너비 재조정
                    adjustGridWidth();
                    setTimeout(() => {
                        adjustGridWidth();
                    }, 100);
                    bindSupportWorkerLinks();
                }, 50);
            }
        });
        
        // 초기 데이터 로드
        loadMonitoringData();
    }, 300);
}

// 전역 함수로 노출
window.initPage = initPage;

// 그리드 너비 조정 함수
function adjustGridWidth() {
    try {
        const $grid = $('#MainGrid');
        if ($grid.length === 0) return;
        
        // 그리드 컨테이너 찾기 (#gridContainer 또는 부모 요소)
        let $gridContainer = $('#gridContainer');
        if ($gridContainer.length === 0) {
            $gridContainer = $grid.closest('div[style*="border: 1px solid"]');
        }
        if ($gridContainer.length === 0) {
            $gridContainer = $grid.parent();
        }
        
        if ($gridContainer.length > 0) {
            // 컨테이너의 실제 너비 계산 (패딩 포함한 내부 너비)
            const containerWidth = $gridContainer.innerWidth();
            
            if (containerWidth > 0 && containerWidth < 20000) { // 유효한 너비인지 확인
                // shrinkToFit을 true로 설정하여 컬럼 너비가 그리드 너비에 맞춰지도록 함
                $grid.jqGrid('setGridParam', { 
                    shrinkToFit: true,
                    autowidth: false
                });
                
                // 그리드 너비 설정
                $grid.jqGrid('setGridWidth', containerWidth, true);
                
                // jqGrid 래퍼 요소 찾기 및 너비 조정
                const $gbox = $('#gbox_MainGrid');
                const $gview = $('#gview_MainGrid');
                
                if ($gbox.length > 0) {
                    $gbox.css({
                        'width': '100%',
                        'max-width': '100%',
                        'box-sizing': 'border-box',
                        'overflow': 'hidden'
                    });
                }
                
                if ($gview.length > 0) {
                    $gview.css({
                        'width': '100%',
                        'max-width': '100%',
                        'box-sizing': 'border-box',
                        'overflow': 'hidden'
                    });
                }
                
                // 그리드 컨테이너도 overflow 처리
                $gridContainer.css({
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                });
            }
        }
    } catch (e) {
        console.error('그리드 너비 조정 중 오류:', e);
    }
}

// 사회복지사 목록 로드
async function loadWelfareWorkerList() {
    try {
        const config = getPageConfig();
        const result = await callAPI(config.apiEndpoint, config.queries.welfareWorkerList, {});
        
        let welfareWorkerList = ['전체'];
        if (result && result.results && Array.isArray(result.results) && result.results.length > 0) {
            const firstResult = result.results[0];
            if (firstResult.selectResults && Array.isArray(firstResult.selectResults)) {
                welfareWorkerList = ['전체', ...firstResult.selectResults.map(item => item.welfareWorker)];
            }
        }
        
        const $select = $('#welfareWorkerSelect');
        $select.empty();
        welfareWorkerList.forEach(name => {
            $select.append($('<option>', { value: name, text: name }));
        });
        
    } catch (e) {
        console.error('사회복지사 목록 조회 중 오류:', e);
    }
}

// 모니터링 데이터 로드
async function loadMonitoringData() {
    try {
        // loadDataList 공통 함수 사용
        await loadDataList(1, 20);
        
        // 지원사 링크 클릭 이벤트 바인딩
        setTimeout(() => {
            bindSupportWorkerLinks();
        }, 100);
        
    } catch (e) {
        console.error('목록 조회 중 오류:', e);
        showError(getPageConfig().messages.loadError);
    }
}

// 서브헤더 추가 함수 (당일일정, 주간일정)
function addSubHeaders() {
    const $grid = $('#MainGrid');
    const $header = $grid.find('.ui-jqgrid-htable thead');
    
    if ($header.length === 0) {
        return; // 헤더가 없으면 리턴
    }
    
    // 기존 서브헤더 제거
    $header.find('.sub-header-row').remove();
    
    // 기존 헤더 행 (첫 번째 또는 유일한 tr)
    const $mainHeaderRow = $header.find('tr').first();
    
    if ($mainHeaderRow.length === 0) {
        return;
    }
    
    // 서브헤더 행 생성
    const $subHeaderRow = $('<tr class="sub-header-row"></tr>');
    
    // 컬럼 인덱스 추적
    let colIndex = 0;
    $mainHeaderRow.find('th').each(function() {
        const $th = $(this);
        const colspan = parseInt($th.attr('colspan') || '1', 10);
        let subColspan = 1;
        let text = '';
        
        // 당일일정 그룹 (인덱스 3, 4, 5 -> 계획, 실행, 대기)
        if (colIndex === 3) {
            subColspan = 3;
            text = '당일일정';
        }
        // 주간일정 그룹 (인덱스 6, 7, 8 -> 계획, 실행, 대기)
        else if (colIndex === 6) {
            subColspan = 3;
            text = '주간일정';
        }
        // 나머지 컬럼은 빈 셀 (단, colspan만큼)
        else {
            subColspan = colspan;
        }
        
        const $subTh = $('<th class="sub-header" style="text-align: center; background: #f0f0f0; border: 1px solid #ddd; font-weight: bold;"></th>');
        if (subColspan > 1) {
            $subTh.attr('colspan', subColspan);
        }
        if (text) {
            $subTh.text(text);
        }
        $subHeaderRow.append($subTh);
        
        colIndex += colspan;
    });
    
    // 서브헤더 행을 메인 헤더 행 다음에 추가
    $mainHeaderRow.after($subHeaderRow);
}

// 지원사 링크 클릭 이벤트 바인딩
function bindSupportWorkerLinks() {
    $('.support-worker-link').off('click').on('click', function(e) {
        e.preventDefault();
        const workerId = $(this).data('worker-id');
        if (workerId) {
            // 지원사 상세 정보 페이지로 이동하거나 모달 표시
            console.log('지원사 ID:', workerId);
            // TODO: 지원사 상세 정보 표시 로직 구현
        }
    });
}

// 계층적 셀 병합 함수 (사회복지사 컬럼)
function mergeCellsHierarchical(gridId, columnName, parentColumnNames = []) {
    try {
        const $grid = $(gridId);
        const rows = $grid.find('tr.jqgrow');
        const gridIdStr = gridId.replace('#', '');
        
        if (rows.length === 0) return;
        
        let currentValue = null;
        let currentParentValues = {};
        let startRow = null;
        let spanCount = 0;
        
        rows.each(function(rowIndex) {
            const $row = $(this);
            const $cell = $row.find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
            
            if ($cell.length === 0) return true;
            
            // 이미 rowspan이 있는 셀은 건너뛰기 (이미 병합된 셀)
            if ($cell.attr('rowspan')) {
                return true;
            }
            
            const cellValue = $cell.text().trim();
            
            // 상위 계층 값들 확인
            let parentValues = {};
            let parentChanged = false;
            parentColumnNames.forEach(parentCol => {
                const $parentCell = $row.find(`td[aria-describedby="${gridIdStr}_${parentCol}"]`);
                if ($parentCell.length > 0) {
                    const parentValue = $parentCell.text().trim();
                    parentValues[parentCol] = parentValue;
                    if (currentParentValues[parentCol] !== parentValue) {
                        parentChanged = true;
                    }
                }
            });
            
            // 상위 계층이 바뀌거나 값이 바뀌면 병합 시작
            // 빈 값은 무시하고 병합하지 않음
            if (cellValue === '') {
                return true; // 빈 값은 병합하지 않음
            }
            
            if (parentChanged || currentValue === null || cellValue !== currentValue) {
                // 이전 그룹 병합
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
                // 새로운 그룹 시작
                currentValue = cellValue;
                currentParentValues = parentValues;
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
        console.error('컬럼 병합 중 오류:', e);
    }
}


