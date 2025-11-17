// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 현재 선택된 대상자 정보
let currentBeneficiary = null;
let currentYear = 2025;
let currentMonth = 8;

// ==========================================
// 샘플 데이터 정의
// ==========================================
// 생활지원사별로 그룹화된 구조
const sampleWorkerData = [
    {
        workerId: 1,
        workerName: '김지원',
        beneficiaries: [
            {
                id: 1,
                beneficiaryId: 1,
                no: 1,
                beneficiaryName: '김대상',
                birthDate: '49/01/01',
                gender: '남',
                planCount: 9,
                actualCount: 9
            }
        ]
    },
    {
        workerId: 2,
        workerName: '나지원',
        beneficiaries: [
            {
                id: 2,
                beneficiaryId: 2,
                no: 1,
                beneficiaryName: '이대상',
                birthDate: '50/05/15',
                gender: '여',
                planCount: 19,
                actualCount: 16
            }
        ]
    },
    {
        workerId: 3,
        workerName: '박지원',
        beneficiaries: [
            {
                id: 3,
                beneficiaryId: 1, // 김대상과 동일한 대상자
                no: 1,
                beneficiaryName: '김대상',
                birthDate: '49/01/01',
                gender: '남',
                planCount: 16,
                actualCount: 19
            },
            {
                id: 4,
                beneficiaryId: 4,
                no: 2,
                beneficiaryName: '최대상',
                birthDate: '52/03/20',
                gender: '여',
                planCount: 17,
                actualCount: 16
            }
        ]
    },
    {
        workerId: 4,
        workerName: '이지원',
        beneficiaries: [
            {
                id: 5,
                beneficiaryId: 5,
                no: 1,
                beneficiaryName: '정대상',
                birthDate: '48/07/10',
                gender: '남',
                planCount: 14,
                actualCount: 14
            }
        ]
    }
];

const sampleBeneficiaryData = {
    1: {
        id: 1,
        name: '김대상',
        gender: '남',
        birthDate: '49/01/01',
        address: '경기도 용인시 주소주소주소주소주소가 나옴',
        services: [
            { name: '방문', planTime: 190, planCount: 4, actualTime: 130, actualCount: 3 },
            { name: '전화', planTime: 30, planCount: 6, actualTime: 28, actualCount: 6 },
            { name: '의료연계지원', planTime: 0, planCount: 4, actualTime: 0, actualCount: 3 },
            { name: '인지활동프로그램', planTime: 30, planCount: 6, actualTime: 28, actualCount: 6 }
        ],
        memos: [
            { id: 1, date: '2025-05-12', author: '김명', content: '방문 주 1회로 변경하고, 전화안부 자주 드리기로 함' }
        ],
        performanceDetails: [
            {
                id: 1,
                date: '2025-08-01',
                planDate: '2025-08-01 (금)',
                planTime: '09:00~10:00',
                planDuration: 60,
                actualDate: '2025-08-01',
                actualStart: '08:57',
                actualEnd: '10:00',
                actualDuration: 63,
                serviceName: '방문 - 안전/안부, 말벗, 정보제공'
            },
            {
                id: 2,
                date: '2025-08-14',
                planDate: '2025-08-14(목)',
                planTime: '12:00~13:00',
                planDuration: 60,
                actualDate: '2025-08-01',
                actualStart: '11:56',
                actualEnd: '13:00',
                actualDuration: 64,
                serviceName: '방문 - 인지활동프로그램 학습현황보기'
            },
            {
                id: 3,
                date: '2025-08-15',
                planDate: '2025-08-15(금)',
                planTime: '14:00~15:00',
                planDuration: 60,
                actualDate: '',
                actualStart: '',
                actualEnd: '',
                actualDuration: '',
                serviceName: '방문 - 안전/안부, 말벗'
            },
            {
                id: 4,
                date: '2025-08-20',
                planDate: '2025-08-20(수)',
                planTime: '10:00~10:30',
                planDuration: 30,
                actualDate: '',
                actualStart: '',
                actualEnd: '',
                actualDuration: '',
                serviceName: '전화 - 안부 확인'
            }
        ]
    },
    2: {
        id: 2,
        name: '이대상',
        gender: '여',
        birthDate: '50/05/15',
        address: '서울시 강남구 테헤란로 123',
        services: [
            { name: '방문', planTime: 240, planCount: 6, actualTime: 200, actualCount: 5 },
            { name: '전화', planTime: 45, planCount: 8, actualTime: 42, actualCount: 8 }
        ],
        memos: [],
        performanceDetails: []
    },
    3: {
        id: 3,
        name: '김대상',
        gender: '남',
        birthDate: '49/01/01',
        address: '경기도 용인시 주소주소주소주소주소가 나옴',
        services: [
            { name: '방문', planTime: 180, planCount: 4, actualTime: 200, actualCount: 5 }
        ],
        memos: [],
        performanceDetails: []
    },
    4: {
        id: 4,
        name: '최대상',
        gender: '여',
        birthDate: '52/03/20',
        address: '부산시 해운대구 해운대해변로 264',
        services: [
            { name: '방문', planTime: 120, planCount: 3, actualTime: 110, actualCount: 3 }
        ],
        memos: [],
        performanceDetails: []
    },
    5: {
        id: 5,
        name: '정대상',
        gender: '남',
        birthDate: '48/07/10',
        address: '대전시 유성구 대학로 291',
        services: [
            { name: '방문', planTime: 180, planCount: 4, actualTime: 180, actualCount: 4 }
        ],
        memos: [],
        performanceDetails: []
    }
};

// ==========================================
// callAPI 함수 오버라이드 (dev=true 시 샘플 데이터 반환)
// ==========================================
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
        // 생활지원사 목록 조회
        return {
            results: [{
                selectResults: sampleWorkerData,
                totalResults: sampleWorkerData.length
            }],
            status: 'success'
        };
    } else if (queryId === 'Q020') {
        // 대상자 정보 조회
        const beneficiaryId = params.beneficiaryId || params.id;
        const data = sampleBeneficiaryData[beneficiaryId] || sampleBeneficiaryData[1];
        return {
            results: [{
                selectResults: [data],
                totalResults: 1
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
// 이 파일에서는 getPageConfig와 getGridConfigs를 정의합니다.

function getPageConfig() {
    return {
        // API 엔드포인트 (페이지 파일명 자동 사용)
        apiEndpoint: getPagePrefix(),
        
        // 쿼리 ID 설정
        queries: {
            list: 'Q010',      // 생활지원사 목록 조회
            detail: 'Q020',    // 대상자 정보 조회
            add: 'Q030',       // 추가
            edit: 'Q040',      // 수정
            delete: 'Q050'     // 삭제
        },
        
        // 메시지 텍스트
        messages: {
            memo: {
                add: '메모가 저장되었습니다.',
                delete: '메모가 삭제되었습니다.',
                addError: '메모 저장 중 오류가 발생했습니다.',
                deleteError: '메모 삭제 중 오류가 발생했습니다.',
                selectBeneficiary: '대상자를 선택해주세요.',
                emptyContent: '메모 내용을 입력해주세요.'
            },
            performance: {
                save: '실적이 저장되었습니다.',
                delete: '실적이 삭제되었습니다.',
                copy: '실적 복사 기능은 준비 중입니다.',
                saveError: '실적 저장 중 오류가 발생했습니다.',
                deleteError: '실적 삭제 중 오류가 발생했습니다.',
                confirmSave: '저장하시겠습니까?',
                confirmDelete: '실적을 삭제하시겠습니까?'
            },
            memoConfirm: {
                delete: '메모를 삭제하시겠습니까?'
            }
        }
    };
}

function getGridConfigs() {
    return {
        // 생활지원사 그리드 설정
        workerGrid: {
            columns: {
                names: ['생활지원사', 'workerId'],
                model: [
            { 
                name: 'workerName', 
                index: 'workerName', 
                width: 90, 
                align: 'left',
                sortable: true
            },
            { 
                name: 'workerId', 
                index: 'workerId', 
                hidden: true,
                width: 0
            }
                ]
            },
            grid: {
        width: '100%',
        height: 300,
        rowNum: 100,
        pager: '#WorkerPager',
        viewrecords: true,
        caption: '',
        multiselect: false,
        cellEdit: false,
                scroll: false
            }
        },
        
        // 대상자 그리드 설정
        beneficiaryGrid: {
            columns: {
                names: ['No', '대상자', '생년월일', '성별', '실적등록'],
                model: [
            { name: 'no', index: 'no', width: 60, align: 'center', sortable: true },
            { name: 'beneficiaryName', index: 'beneficiaryName', width: 100, align: 'center', sortable: true },
            { name: 'birthDate', index: 'birthDate', width: 100, align: 'center', sortable: true },
            { name: 'gender', index: 'gender', width: 60, align: 'center', sortable: true },
            { 
                name: 'performance', 
                index: 'performance', 
                width: 100, 
                align: 'center',
                sortable: false,
                formatter: function(cellvalue, options, rowObject) {
                    const planCount = rowObject.planCount || 0;
                    const actualCount = rowObject.actualCount || 0;
                    const isMatch = planCount === actualCount;
                            const bgColor = isMatch ? '#ffeb3b' : '#4caf50';
                    return '<span style="background-color: ' + bgColor + '; padding: 4px 10px; border-radius: 4px; font-weight: bold; display: inline-block; min-width: 50px; text-align: center;">' + actualCount + '/' + planCount + '</span>';
                }
            }
                ]
            },
            grid: {
        width: '100%',
        height: 300,
        rowNum: 100,
        pager: '#BeneficiaryPager',
        viewrecords: true,
        caption: '',
                multiselect: false
            }
        },
        
        // 제공서비스 그리드 설정
        serviceComparisonGrid: {
            columns: {
                names: ['서비스명', '계획-제공시간', '계획-횟수', '실적-제공시간', '실적-횟수'],
                model: [
            { 
                name: 'serviceName', 
                index: 'serviceName', 
                width: 150, 
                align: 'center',
                sortable: true
            },
            { 
                name: 'planTime', 
                index: 'planTime', 
                width: 120, 
                align: 'center',
                sortable: true,
                formatter: function(cellvalue) {
                    return cellvalue + '분';
                }
            },
            { 
                name: 'planCount', 
                index: 'planCount', 
                width: 100, 
                align: 'center',
                sortable: true,
                formatter: function(cellvalue) {
                    return cellvalue + '회';
                }
            },
            { 
                name: 'actualTime', 
                index: 'actualTime', 
                width: 120, 
                align: 'center',
                sortable: true,
                formatter: function(cellvalue, options, rowObject) {
                    const planMatch = rowObject.planTime === rowObject.actualTime && rowObject.planCount === rowObject.actualCount;
                    const color = planMatch ? '#000' : '#007bff';
                    return '<span style="color: ' + color + ';">' + cellvalue + '분</span>';
                }
            },
            { 
                name: 'actualCount', 
                index: 'actualCount', 
                width: 100, 
                align: 'center',
                sortable: true,
                formatter: function(cellvalue, options, rowObject) {
                    const planMatch = rowObject.planTime === rowObject.actualTime && rowObject.planCount === rowObject.actualCount;
                    const color = planMatch ? '#000' : '#007bff';
                    return '<span style="color: ' + color + ';">' + cellvalue + '회</span>';
                }
            }
                ]
            },
            grid: {
        width: '100%',
        height: 150,
        rowNum: 100,
        pager: '#ServiceComparisonPager',
        viewrecords: false,
        caption: '',
        multiselect: false,
        scroll: false,
        hidegrid: false
            }
        },
        
        // 메모관리 그리드 설정
        memoGrid: {
            columns: {
                names: ['No', '작성일', '작성자', '내용', '삭제'],
                model: [
            { name: 'no', index: 'no', width: 60, align: 'center', sortable: true },
            { name: 'date', index: 'date', width: 100, align: 'center', sortable: true },
            { name: 'author', index: 'author', width: 100, align: 'center', sortable: true },
            { name: 'content', index: 'content', width: 400, align: 'left', sortable: false },
            { 
                name: 'actions', 
                index: 'actions', 
                width: 80, 
                align: 'center',
                sortable: false,
                formatter: function(cellvalue, options, rowObject) {
                    return '<button class="btn-delete-memo" data-id="' + rowObject.id + '" style="padding: 3px 8px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 3px; font-size: 12px;">삭제</button>';
                }
            }
                ]
            },
            grid: {
        width: '100%',
        height: 200,
        rowNum: 100,
        pager: '#MemoPager',
        viewrecords: false,
        caption: '',
        multiselect: false,
        scroll: false,
        hidegrid: false,
        emptyrecords: '등록된 메모가 없습니다.'
            }
        },
        
        // 상세 실적등록 그리드 설정
        performanceDetailGrid: {
            columns: {
                names: ['일자', '계획', '실적', '서비스명', '관리'],
                model: [
            { 
                name: 'date', 
                index: 'date', 
                width: 120, 
                align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    return rowObject.planDate || cellvalue;
                }
            },
            { 
                name: 'plan', 
                index: 'plan', 
                width: 200, 
                align: 'center',
                sortable: false,
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.planDate && rowObject.planTime) {
                        return rowObject.planDate + ' ' + rowObject.planTime + ' (' + (rowObject.planDuration || 0) + '분)';
                    }
                    return '';
                }
            },
            { 
                name: 'actual', 
                index: 'actual', 
                width: 300, 
                align: 'center',
                sortable: false,
                formatter: function(cellvalue, options, rowObject) {
                    const actualDate = rowObject.actualDate || '';
                    const actualStart = rowObject.actualStart || '';
                    const actualEnd = rowObject.actualEnd || '';
                    const actualDuration = rowObject.actualDuration || '';
                    const rowId = rowObject.id;
                    
                    return `
                        <div style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                            <input type="text" class="actual-date-input" data-id="${rowId}" value="${actualDate}" placeholder="날짜" style="width: 100px; padding: 4px; border: 1px solid #ddd; border-radius: 3px;" />
                            <span class="calendar-icon" data-id="${rowId}" style="cursor: pointer; color: #007bff; font-size: 16px;">📅</span>
                            <input type="text" class="actual-start-input" data-id="${rowId}" value="${actualStart}" placeholder="시작" style="width: 60px; padding: 4px; border: 1px solid #ddd; border-radius: 3px;" />
                            <span>~</span>
                            <input type="text" class="actual-end-input" data-id="${rowId}" value="${actualEnd}" placeholder="종료" style="width: 60px; padding: 4px; border: 1px solid #ddd; border-radius: 3px;" />
                            <input type="number" class="actual-duration-input" data-id="${rowId}" value="${actualDuration}" placeholder="분" style="width: 50px; padding: 4px; border: 1px solid #ddd; border-radius: 3px;" />
                        </div>
                    `;
                }
            },
            { 
                name: 'serviceName', 
                index: 'serviceName', 
                width: 300,
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.serviceName && rowObject.serviceName.includes('인지활동프로그램')) {
                        return cellvalue + ' <a href="#" class="learning-status-link" style="color: #007bff; text-decoration: underline;">학습현황보기 ></a>';
                    }
                    return cellvalue || '';
                }
            },
            { 
                name: 'actions', 
                index: 'actions', 
                width: 200, 
                align: 'center',
                sortable: false,
                formatter: function(cellvalue, options, rowObject) {
                    return `
                        <button class="btn-journal" data-id="${rowObject.id}" style="padding: 3px 8px; margin: 2px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 3px; font-size: 12px;">일지</button>
                        <button class="btn-save" data-id="${rowObject.id}" style="padding: 3px 8px; margin: 2px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 3px; font-size: 12px;">저장</button>
                        <button class="btn-copy" data-id="${rowObject.id}" style="padding: 3px 8px; margin: 2px; cursor: pointer; background: #ffc107; color: black; border: none; border-radius: 3px; font-size: 12px;">복사</button>
                        <button class="btn-delete" data-id="${rowObject.id}" style="padding: 3px 8px; margin: 2px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 3px; font-size: 12px;">삭제</button>
                    `;
                }
            }
                ]
            },
            grid: {
        width: '100%',
        height: 400,
        rowNum: 100,
        pager: '#PerformanceDetailPager',
        viewrecords: true,
        caption: ''
            }
        }
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 공통 헬퍼 함수
// ==========================================

// 그리드 초기화 헬퍼 함수
function initSimpleGrid(gridId, config) {
    $(gridId).jqGrid({
        datatype: 'local',
        colNames: config.columns.names,
        colModel: config.columns.model,
        ...config.grid
    });
}

// 그리드 데이터 업데이트 헬퍼 함수
function updateGridData(gridId, data) {
    $(gridId).jqGrid('clearGridData');
    $(gridId).jqGrid('setGridParam', { datatype: 'local', data: data });
    $(gridId).trigger('reloadGrid');
}

// 그리드 클릭 스타일 적용 헬퍼 함수
function applyGridClickStyle(gridId) {
    $(gridId + ' tbody tr.jqgrow').css('cursor', 'pointer');
}

// ==========================================
// 그리드 초기화 함수
// ==========================================

// 생활지원사 그리드 초기화
function initWorkerGrid() {
    const configs = getGridConfigs();
    const config = configs.workerGrid;
    
    // 기존 그리드가 있으면 제거
    if ($('#WorkerGrid').length > 0) {
        try {
            $('#WorkerGrid').jqGrid('GridUnload');
        } catch (e) {
            console.log('그리드 제거 중 오류 (무시 가능):', e);
        }
    }
    
    $('#WorkerGrid').jqGrid({
        datatype: 'local',
        colNames: config.columns.names,
        colModel: config.columns.model,
        ...config.grid,
        onSelectRow: function(rowid, status, e) {
            try {
                const rowData = $('#WorkerGrid').jqGrid('getRowData', rowid);
                const workerId = rowData.workerId || rowid;
                if (workerId) {
                    loadBeneficiaryGrid(parseInt(workerId));
                }
            } catch (e) {
                console.error('생활지원사 선택 중 오류:', e);
            }
        },
        loadComplete: function(data) {
            applyGridClickStyle('#WorkerGrid');
            
            // 이벤트 리스너 다시 바인딩
            $('#WorkerGrid').off('click', 'tr.jqgrow').on('click', 'tr.jqgrow', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const rowid = $(this).attr('id');
                if (rowid) {
                    try {
                        const rowData = $('#WorkerGrid').jqGrid('getRowData', rowid);
                        const workerId = rowData.workerId || rowid;
                        if (workerId) {
                            $('#WorkerGrid').jqGrid('setSelection', rowid);
                            loadBeneficiaryGrid(parseInt(workerId));
                        }
                    } catch (err) {
                        console.error('클릭 이벤트 처리 중 오류:', err);
                    }
                }
            });
            
            // 데이터 로드 완료 후 첫 번째 행 자동 선택
            if (data && data.rows && data.rows.length > 0) {
                const firstRowId = data.rows[0].id;
                setTimeout(() => {
                    $('#WorkerGrid').jqGrid('setSelection', firstRowId);
                }, 200);
            }
        },
        gridComplete: function() {
            // 그리드 완성 후에도 행에 클릭 가능한 스타일 추가
            $('#WorkerGrid tbody tr.jqgrow').css('cursor', 'pointer');
        }
    });
}

// 대상자 그리드 초기화
function initBeneficiaryGrid() {
    const configs = getGridConfigs();
    const config = configs.beneficiaryGrid;
    
    $('#BeneficiaryGrid').jqGrid({
        datatype: 'local',
        colNames: config.columns.names,
        colModel: config.columns.model,
        ...config.grid,
        onSelectRow: function(rowid, status, e) {
            try {
                const rowData = $('#BeneficiaryGrid').jqGrid('getRowData', rowid);
                let beneficiaryId = rowData.beneficiaryId;
                
                if (!beneficiaryId || beneficiaryId === '' || beneficiaryId === 'undefined') {
                    beneficiaryId = rowid;
                }
                
                if (beneficiaryId && beneficiaryId !== 'undefined') {
                    const id = parseInt(beneficiaryId);
                    if (!isNaN(id)) {
                        loadBeneficiaryData(id);
                    }
                }
            } catch (e) {
                console.error('대상자 선택 중 오류:', e);
            }
        },
        loadComplete: function(data) {
            applyGridClickStyle('#BeneficiaryGrid');
            
            // 이벤트 리스너 다시 바인딩
            $('#BeneficiaryGrid').off('click', 'tr.jqgrow').on('click', 'tr.jqgrow', function(e) {
                const rowid = $(this).attr('id');
                if (rowid) {
                    try {
                        $('#BeneficiaryGrid').jqGrid('setSelection', rowid);
                    } catch (err) {
                        console.error('대상자 클릭 이벤트 처리 중 오류:', err);
                    }
                }
            });
            
            // 데이터 로드 완료 후 첫 번째 행 자동 선택
            if (data && data.rows && data.rows.length > 0) {
                const firstRowId = data.rows[0].id;
                setTimeout(() => {
                    $('#BeneficiaryGrid').jqGrid('setSelection', firstRowId);
                    // setSelection이 onSelectRow를 호출하므로 여기서는 추가 호출 불필요
                }, 200);
            } else {
                // 대상자가 없을 때 그리드 초기화
                clearServiceComparisonGrid();
                clearMemoGrid();
                updatePerformanceDetailGrid([]);
                $('#beneficiaryName').text('');
                $('#beneficiaryAddress').text('');
            }
        },
        gridComplete: function() {
            // 그리드 완성 후에도 행에 클릭 가능한 스타일 추가
            $('#BeneficiaryGrid tbody tr.jqgrow').css('cursor', 'pointer');
        }
    });
}

// 제공서비스 그리드 초기화
function initServiceComparisonGrid() {
    const configs = getGridConfigs();
    initSimpleGrid('#ServiceComparisonGrid', configs.serviceComparisonGrid);
}

// 메모관리 그리드 초기화
function initMemoGrid() {
    const configs = getGridConfigs();
    initSimpleGrid('#MemoGrid', configs.memoGrid);
}

// 상세 실적등록 그리드 초기화
function initPerformanceDetailGrid() {
    const configs = getGridConfigs();
    initSimpleGrid('#PerformanceDetailGrid', configs.performanceDetailGrid);
}

// ==========================================
// 그리드 데이터 로드 함수
// ==========================================

// 생활지원사 그리드 로드
async function loadWorkerGrid(workerId = null) {
    try {
        const config = getPageConfig();
        const params = {
            year: currentYear,
            month: currentMonth
        };
        
        if (workerId) {
            params.workerId = workerId;
        }
        
        const result = await callAPI(config.apiEndpoint, config.queries.list, params);
        
        let workerData = [];
        if (result && result.results && result.results[0]) {
            workerData = result.results[0].selectResults || [];
        } else {
            // 개발 모드: 샘플 데이터 사용
            workerData = sampleWorkerData;
        }
        
        // workerId가 지정된 경우 해당 생활지원사만 필터링
        if (workerId) {
            workerData = workerData.filter(item => item.workerId === parseInt(workerId));
        }
        
        // 생활지원사 그리드 데이터 준비
        const gridData = workerData.map(worker => ({
            id: worker.workerId.toString(),
            workerId: worker.workerId,
            workerName: worker.workerName
        }));
        
        // 총 계획/실적 계산
        let totalPlan = 0;
        let totalActual = 0;
        workerData.forEach(worker => {
            worker.beneficiaries.forEach(beneficiary => {
                totalPlan += beneficiary.planCount || 0;
                totalActual += beneficiary.actualCount || 0;
            });
        });
        
        $('#totalPlan').text(totalPlan);
        $('#totalActual').text(totalActual);
        
        // 그리드에 데이터 설정
        updateGridData('#WorkerGrid', gridData);
        
        // loadComplete에서 자동 선택되므로 여기서는 제거
    } catch (e) {
        console.error('생활지원사 그리드 로드 중 오류:', e);
        showError('생활지원사 목록을 불러올 수 없습니다.');
    }
}

// 대상자 그리드 로드
async function loadBeneficiaryGrid(workerId) {
    try {
        if (!workerId) {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
            return;
        }
        
        const config = getPageConfig();
        const params = {
            year: currentYear,
            month: currentMonth,
            workerId: workerId
        };
        
        const result = await callAPI(config.apiEndpoint, config.queries.list, params);
        
        let workerData = [];
        if (result && result.results && result.results[0]) {
            workerData = result.results[0].selectResults || [];
        } else {
            // 개발 모드: 샘플 데이터 사용
            workerData = sampleWorkerData;
        }
        
        // 해당 생활지원사의 데이터 찾기
        const worker = workerData.find(w => w.workerId === parseInt(workerId));
        
        if (!worker || !worker.beneficiaries) {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
            return;
        }
        
        // 대상자 그리드 데이터 준비
        const gridData = worker.beneficiaries.map(beneficiary => ({
            id: beneficiary.id,
            beneficiaryId: beneficiary.beneficiaryId,
            no: beneficiary.no,
            beneficiaryName: beneficiary.beneficiaryName,
            birthDate: beneficiary.birthDate,
            gender: beneficiary.gender,
            planCount: beneficiary.planCount,
            actualCount: beneficiary.actualCount
        }));
        
        // 그리드에 데이터 설정
        updateGridData('#BeneficiaryGrid', gridData);
        
        // loadComplete에서 자동 선택되므로 여기서는 제거
    } catch (e) {
        console.error('대상자 그리드 로드 중 오류:', e);
        showError('대상자 목록을 불러올 수 없습니다.');
    }
}

// 대상자 데이터 로드
async function loadBeneficiaryData(beneficiaryId) {
    try {
        if (!beneficiaryId) {
            clearServiceComparisonGrid();
            clearMemoGrid();
            updatePerformanceDetailGrid([]);
            $('#beneficiaryName').text('');
            $('#beneficiaryAddress').text('');
            currentBeneficiary = null;
            return;
        }
        
        const config = getPageConfig();
        const result = await callAPI(config.apiEndpoint, config.queries.detail, {
            beneficiaryId: beneficiaryId,
            year: currentYear,
            month: currentMonth
        });
        
        if (result && result.results && result.results[0] && result.results[0].selectResults && result.results[0].selectResults[0]) {
            const data = result.results[0].selectResults[0];
            currentBeneficiary = data;
            
            // 대상자 정보 표시
            $('#beneficiaryName').text(data.name + '(' + data.gender + ') ' + data.birthDate);
            $('#beneficiaryAddress').text(data.address || '');
            
            // 제공서비스 그리드 업데이트
            updateServiceComparisonGrid(data.services || []);
            
            // 메모 그리드 업데이트
            updateMemoGrid(data.memos || []);
            
            // 상세 실적등록 그리드 업데이트
            updatePerformanceDetailGrid(data.performanceDetails || []);
        } else {
            clearServiceComparisonGrid();
            clearMemoGrid();
            updatePerformanceDetailGrid([]);
            $('#beneficiaryName').text('');
            $('#beneficiaryAddress').text('');
            currentBeneficiary = null;
        }
    } catch (e) {
        console.error('대상자 데이터 로드 중 오류:', e);
        showError('대상자 정보를 불러올 수 없습니다: ' + e.message);
        // 오류 시에도 그리드 초기화
        clearServiceComparisonGrid();
        clearMemoGrid();
        updatePerformanceDetailGrid([]);
        $('#beneficiaryName').text('');
        $('#beneficiaryAddress').text('');
        currentBeneficiary = null;
    }
}

// ==========================================
// 그리드 업데이트 함수
// ==========================================

// 빈 메모 그리드 표시
function clearMemoGrid() {
    updateGridData('#MemoGrid', []);
}

// 빈 제공서비스 그리드 표시
function clearServiceComparisonGrid() {
    updateGridData('#ServiceComparisonGrid', []);
}

// 제공서비스 그리드 업데이트
function updateServiceComparisonGrid(services) {
    const gridData = services.map((service, index) => ({
        id: index + 1,
        serviceName: service.name,
        planTime: service.planTime || 0,
        planCount: service.planCount || 0,
        actualTime: service.actualTime || 0,
        actualCount: service.actualCount || 0
    }));
    
    updateGridData('#ServiceComparisonGrid', gridData);
}

// 메모 그리드 업데이트
function updateMemoGrid(memos) {
    // 최신 메모가 위에 오도록 역순 정렬
    const sortedMemos = [...memos].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const gridData = sortedMemos.map((memo, index) => ({
        id: memo.id || index + 1,
        no: index + 1,
        date: memo.date,
        author: memo.author,
        content: memo.content,
        memoId: memo.id
    }));
    
    updateGridData('#MemoGrid', gridData);
    
    // 메모가 없을 때 메시지 표시
    if (gridData.length === 0) {
        $('#MemoGrid').jqGrid('setGridParam', {
            emptyrecords: '등록된 메모가 없습니다.'
        });
    }
}

// 상세 실적등록 그리드 업데이트
function updatePerformanceDetailGrid(performanceDetails) {
    const gridData = performanceDetails.map(item => ({
        id: item.id,
        date: item.date,
        planDate: item.planDate,
        planTime: item.planTime,
        planDuration: item.planDuration,
        actualDate: item.actualDate,
        actualStart: item.actualStart,
        actualEnd: item.actualEnd,
        actualDuration: item.actualDuration,
        serviceName: item.serviceName
    }));
    
    updateGridData('#PerformanceDetailGrid', gridData);
}

// ==========================================
// 모달 및 이벤트 핸들러 함수
// ==========================================

// 메모 모달 열기
function openMemoModal() {
    const config = getPageConfig();
    if (!currentBeneficiary) {
        showMessage(config.messages.memo.selectBeneficiary);
        return;
    }
    
    $('#memoAuthor').text('나지원'); // 로그인한 사용자 이름
    $('#memoBeneficiary').text(currentBeneficiary.name + '(' + currentBeneficiary.gender + ') ' + currentBeneficiary.birthDate + ' ' + (currentBeneficiary.address || ''));
    $('#memoContent').val('');
    $('#memoModal').fadeIn();
}

// 메모 모달 닫기
function closeMemoModal() {
    $('#memoModal').fadeOut();
}

// 메모 저장
async function saveMemo() {
    const config = getPageConfig();
    try {
        const content = $('#memoContent').val().trim();
        if (!content) {
            showMessage(config.messages.memo.emptyContent);
            return;
        }
        
        // TODO: API 호출하여 저장
        // 개발 모드에서는 로컬 데이터에 추가
        if (currentBeneficiary && dev) {
            if (!currentBeneficiary.memos) {
                currentBeneficiary.memos = [];
            }
            const today = new Date();
            const todayStr = today.getFullYear() + '-' + 
                           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                           String(today.getDate()).padStart(2, '0');
            currentBeneficiary.memos.push({
                id: Date.now(),
                date: todayStr,
                author: '나지원',
                content: content
            });
            updateMemoGrid(currentBeneficiary.memos);
        }
        
        showMessage(config.messages.memo.add);
        closeMemoModal();
    } catch (e) {
        console.error('메모 저장 중 오류:', e);
        showError(config.messages.memo.addError);
    }
}

// 메모 삭제
async function deleteMemo(memoId) {
    const config = getPageConfig();
    if (!confirm(config.messages.memoConfirm.delete)) {
        return;
    }
    
    try {
        // TODO: API 호출하여 삭제
        if (currentBeneficiary && currentBeneficiary.memos && dev) {
            currentBeneficiary.memos = currentBeneficiary.memos.filter(m => m.id !== memoId);
            updateMemoGrid(currentBeneficiary.memos);
        }
        
        const config = getPageConfig();
        showMessage(config.messages.memo.delete);
    } catch (e) {
        console.error('메모 삭제 중 오류:', e);
        const config = getPageConfig();
        showError(config.messages.memo.deleteError);
    }
}

// 업무일지 모달 열기
function openWorkJournalModal(performanceId) {
    // TODO: 업무일지 데이터 로드
    $('#workJournalContent').html('<p>업무일지 기능은 준비 중입니다.</p>');
    $('#workJournalModal').fadeIn();
}

// 업무일지 모달 닫기
function closeWorkJournalModal() {
    $('#workJournalModal').fadeOut();
}

// 실적 저장
async function savePerformance(performanceId) {
    const config = getPageConfig();
    if (!confirm(config.messages.performance.confirmSave)) {
        return;
    }
    
    try {
        // TODO: API 호출하여 저장
        showMessage(config.messages.performance.save);
    } catch (e) {
        console.error('실적 저장 중 오류:', e);
        showError(config.messages.performance.saveError);
    }
}

// 실적 복사
function copyPerformance(performanceId) {
    const config = getPageConfig();
    // TODO: 실적 복사 기능 구현
    showMessage(config.messages.performance.copy);
}

// 실적 삭제
async function deletePerformance(performanceId) {
    const config = getPageConfig();
    if (!confirm(config.messages.performance.confirmDelete)) {
        return;
    }
    
    try {
        // TODO: API 호출하여 삭제
        showMessage(config.messages.performance.delete);
        if (currentBeneficiary) {
            loadBeneficiaryData(currentBeneficiary.id);
        }
    } catch (e) {
        console.error('실적 삭제 중 오류:', e);
        showError(config.messages.performance.deleteError);
    }
}

// ==========================================
// 페이지 초기화
// ==========================================

function initPerformanceRegistration() {
    // URL 파라미터에서 년/월 정보 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');
    const month = urlParams.get('month');
    const workerId = urlParams.get('workerId');
    const workerName = urlParams.get('workerName');
    const beneficiaryId = urlParams.get('beneficiaryId');
    
    if (year) currentYear = parseInt(year);
    if (month) currentMonth = parseInt(month);
    
    // 날짜 표시 업데이트
    $('#currentDate').text(currentYear + '.' + String(currentMonth).padStart(2, '0'));
    
    // 생활지원사 이름이 있으면 제목에 표시
    if (workerName) {
        $('h2').text('계획관리 > 지원사별 실적등록 - ' + decodeURIComponent(workerName));
    }
    
    // 그리드 초기화 (약간의 지연을 두고 초기화)
    setTimeout(() => {
        initWorkerGrid();
        initBeneficiaryGrid();
        initServiceComparisonGrid();
        initMemoGrid();
        initPerformanceDetailGrid();
        
        // 생활지원사 그리드 로드 (workerId가 있으면 해당 생활지원사만)
        loadWorkerGrid(workerId ? parseInt(workerId) : null);
    }, 300);
    
    // 특정 대상자가 지정된 경우 해당 데이터 로드
    if (beneficiaryId) {
        setTimeout(() => {
            loadBeneficiaryData(parseInt(beneficiaryId));
        }, 500);
    }
    
    // 이벤트 리스너 등록
    $(document).on('click', '#addMemoBtn', openMemoModal);
    $(document).on('click', '#closeMemoModal', closeMemoModal);
    $(document).on('click', '#saveMemoBtn', saveMemo);
    $(document).on('click', '.btn-delete-memo', function() {
        const memoId = parseInt($(this).data('id'));
        deleteMemo(memoId);
    });
    
    // 대상자 선택 해제 시 그리드 초기화
    $(document).on('click', '.beneficiary-row', function() {
        // 선택 해제 시 그리드 초기화는 필요 없음
    });
    
    $(document).on('click', '#closeWorkJournalModal', closeWorkJournalModal);
    $(document).on('click', '.btn-journal', function() {
        const performanceId = parseInt($(this).data('id'));
        openWorkJournalModal(performanceId);
    });
    $(document).on('click', '.btn-save', function() {
        const performanceId = parseInt($(this).data('id'));
        savePerformance(performanceId);
    });
    $(document).on('click', '.btn-copy', function() {
        const performanceId = parseInt($(this).data('id'));
        copyPerformance(performanceId);
    });
    $(document).on('click', '.btn-delete', function() {
        const performanceId = parseInt($(this).data('id'));
        deletePerformance(performanceId);
    });
    
    $(document).on('click', '.learning-status-link', function(e) {
        e.preventDefault();
        showMessage('인지활동프로그램 학습현황 페이지는 준비 중입니다.');
    });
    
    // 날짜 입력 필드에 datepicker 추가 (동적으로 생성된 요소에 대해서도)
    $(document).on('focus', '.actual-date-input', function() {
        if (!$(this).hasClass('hasDatepicker')) {
            $(this).datepicker({
                dateFormat: 'yy-mm-dd',
                showMonthAfterYear: true,
                yearSuffix: '년',
                changeMonth: true,
                changeYear: true
            });
        }
    });
    
    // 캘린더 아이콘 클릭 시 datepicker 열기
    $(document).on('click', '.calendar-icon', function() {
        const rowId = $(this).data('id');
        const $dateInput = $('.actual-date-input[data-id="' + rowId + '"]');
        if (!$dateInput.hasClass('hasDatepicker')) {
            $dateInput.datepicker({
                dateFormat: 'yy-mm-dd',
                showMonthAfterYear: true,
                yearSuffix: '년',
                changeMonth: true,
                changeYear: true
            });
        }
        $dateInput.datepicker('show');
    });
    
    // 모달 배경 클릭 시 닫기
    $('#memoModal').on('click', function(e) {
        if ($(e.target).attr('id') === 'memoModal') {
            closeMemoModal();
        }
    });
    
    $('#workJournalModal').on('click', function(e) {
        if ($(e.target).attr('id') === 'workJournalModal') {
            closeWorkJournalModal();
        }
    });
}

// ==========================================
// 페이지별 추가 쿼리 호출 예제
// ==========================================

// 예제: 추가 쿼리 호출 함수
async function callQuery(id) {
    try {
        const config = getPageConfig();
        const params = {
            '1': id.toString()
        };
        const result = await callPageQuery(config.apiEndpoint, 'Q080', params);
        if (result) {
            showMessage('처리되었습니다.');
        }
    } catch (e) {
        console.error('쿼리 호출 중 오류:', e);
    }
}

// ==========================================
// 전역 함수로 노출
// ==========================================

window.initPerformanceRegistration = initPerformanceRegistration;

