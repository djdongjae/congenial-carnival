// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 현재 선택된 지원사 ID
let selectedWorkerId = null;

// 현재 조회일자 (기본값: 오늘)
let currentInquiryDate = new Date().toISOString().split('T')[0];

// 샘플 데이터 정의
const sampleLocationData = [
    {
        id: 1,
        welfareWorker: '강전담',
        supportWorker: '권지원',
        supportWorkerId: 1,
        beneficiary: '박대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '09:00',
        workLocation: '경기도 인천시 안정길123',
        error: '150',
        hasJournal: true,
        journalId: 1
    },
    {
        id: 2,
        welfareWorker: '강전담',
        supportWorker: '권지원',
        supportWorkerId: 1,
        beneficiary: '박대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '10:00',
        workLocation: '경기도 인천시 안정길123',
        error: '150',
        hasJournal: false,
        journalId: null
    },
    {
        id: 3,
        welfareWorker: '강전담',
        supportWorker: '나지원',
        supportWorkerId: 2,
        beneficiary: '박대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '10:30:14',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '3,151',
        hasJournal: true,
        journalId: 2
    },
    {
        id: 4,
        welfareWorker: '강전담',
        supportWorker: '나지원',
        supportWorkerId: 2,
        beneficiary: '박대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '11:30:27',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '3,151',
        hasJournal: false,
        journalId: null
    },
    {
        id: 5,
        welfareWorker: '강전담',
        supportWorker: '나지원',
        supportWorkerId: 2,
        beneficiary: '최대상',
        service: '전화',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '11:32:05',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '2,801',
        hasJournal: false,
        journalId: null
    },
    {
        id: 6,
        welfareWorker: '강전담',
        supportWorker: '나지원',
        supportWorkerId: 2,
        beneficiary: '최대상',
        service: '전화',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '11:36:09',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '2,801',
        hasJournal: false,
        journalId: null
    },
    {
        id: 7,
        welfareWorker: '강전담',
        supportWorker: '동지원',
        supportWorkerId: 3,
        beneficiary: '유대상',
        service: '정기회의(주)',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '09:00',
        workLocation: '경기도 인천시 안정길123',
        error: '150',
        hasJournal: false,
        journalId: null
    },
    {
        id: 8,
        welfareWorker: '강전담',
        supportWorker: '동지원',
        supportWorkerId: 3,
        beneficiary: '유대상',
        service: '정기회의(주)',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '10:00',
        workLocation: '경기도 인천시 안정길123',
        error: '150',
        hasJournal: false,
        journalId: null
    },
    {
        id: 9,
        welfareWorker: '강전담',
        supportWorker: '박지원',
        supportWorkerId: 4,
        beneficiary: '정대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '10:30:14',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '3,151',
        hasJournal: true,
        journalId: 3
    },
    {
        id: 10,
        welfareWorker: '강전담',
        supportWorker: '박지원',
        supportWorkerId: 4,
        beneficiary: '정대상',
        service: '방문',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '11:30:27',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '3,151',
        hasJournal: false,
        journalId: null
    },
    {
        id: 11,
        welfareWorker: '강전담',
        supportWorker: '송지원',
        supportWorkerId: 5,
        beneficiary: '최대상',
        service: '전화',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '시작',
        time: '11:32:05',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '2,801',
        hasJournal: false,
        journalId: null
    },
    {
        id: 12,
        welfareWorker: '강전담',
        supportWorker: '송지원',
        supportWorkerId: 5,
        beneficiary: '최대상',
        service: '전화',
        beneficiaryAddress: '경기도 인천시 안정길122 7-10 (제니아파트) 1동 907호',
        category: '종료',
        time: '11:36:09',
        workLocation: '경기도 인천시 안정길473 (주안동)',
        error: '2,801',
        hasJournal: false,
        journalId: null
    },
    {
        id: 13,
        welfareWorker: '강전담',
        supportWorker: '이지원',
        supportWorkerId: 6,
        beneficiary: '단체',
        service: '정기회의(주)',
        beneficiaryAddress: '-',
        category: '시작',
        time: '09:00',
        workLocation: '경기도 인천시 안정길123',
        error: '-',
        hasJournal: false,
        journalId: null
    },
    {
        id: 14,
        welfareWorker: '강전담',
        supportWorker: '이지원',
        supportWorkerId: 6,
        beneficiary: '단체',
        service: '정기회의(주)',
        beneficiaryAddress: '-',
        category: '종료',
        time: '10:00',
        workLocation: '경기도 인천시 안정길123',
        error: '-',
        hasJournal: false,
        journalId: null
    },    
    {
        id: 15,
        welfareWorker: '나전담',
        supportWorker: '이이이',
        supportWorkerId: 7,
        beneficiary: '단체',
        service: '정기회의(주)',
        beneficiaryAddress: '-',
        category: '시작',
        time: '09:00',
        workLocation: '경기도 인천시 안정길123',
        error: '-',
        hasJournal: false,
        journalId: null
    },
    {
        id: 16,
        welfareWorker: '나전담',
        supportWorker: '이이이',
        supportWorkerId: 7,
        beneficiary: '단체',
        service: '정기회의(주)',
        beneficiaryAddress: '-',
        category: '종료',
        time: '10:00',
        workLocation: '경기도 인천시 안정길123',
        error: '-',
        hasJournal: false,
        journalId: null
    }
];

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
        // 목록 조회 - 날짜 필터링
        const inquiryDate = params.inquiryDate || currentInquiryDate;
        const filteredData = sampleLocationData.filter(item => {
            // 날짜별 필터링 로직 (샘플에서는 모든 데이터 반환)
            return true;
        });
        
        return {
            results: [{
                selectResults: filteredData,
                totalResults: filteredData.length
            }],
            status: 'success'
        };
    } else if (queryId === 'Q020') {
        // 업무일지 조회
        const journalId = params.journalId;
        return {
            results: [{
                selectResults: [{
                    id: journalId,
                    content: '업무일지 내용입니다.\n\n방문 내용:\n- 대상자 상태 확인\n- 서비스 제공\n- 일상 생활 지원',
                    date: currentInquiryDate,
                    workerName: '나지원',
                    beneficiaryName: '박대상'
                }]
            }],
            status: 'success'
        };
    } else if (queryId === 'Q030') {
        // 진행상황 조회
        const workerId = params.workerId;
        
        // 선택된 지원사의 대상자별 진행상황 데이터
        const progressData = [
            {
                beneficiaryName: '이양숙',
                serviceName: '방문',
                phone: '010-6302-1403',
                address: '경기도 용인시 기흥로 기흥로 58(기흥IC..',
                planTime: '09:00~10:00',
                planDuration: '60분',
                planStatus: '완료',
                actualTime: '08:54~9:58',
                actualDuration: '64분',
                actualStatus: '완료'
            },
            {
                beneficiaryName: '이양숙',
                serviceName: '방문',
                phone: '010-6302-1403',
                address: '경기도 용인시 기흥로 기흥로 58(기흥IC..',
                planTime: '10:00~11:00',
                planDuration: '60분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '이양숙',
                serviceName: '방문',
                phone: '010-6302-1403',
                address: '경기도 용인시 기흥로 기흥로 58(기흥IC..',
                planTime: '11:00~12:00',
                planDuration: '60분',
                planStatus: '진행중',
                actualTime: '11:01~',
                actualDuration: '60분',
                actualStatus: '진행중'
            },
            {
                beneficiaryName: '이양숙',
                serviceName: '방문',
                phone: '010-6302-1403',
                address: '경기도 용인시 기흥로 기흥로 58(기흥IC..',
                planTime: '14:00~15:00',
                planDuration: '60분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '09:00~09:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '10:00~10:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '11:00~11:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '14:00~14:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '15:00~15:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '김대상',
                serviceName: '전화',
                phone: '010-1234-5678',
                address: '경기도 용인시 기흥구 기흥로58',
                planTime: '16:00~16:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '나대상',
                serviceName: '전화',
                phone: '010-2345-6789',
                address: '경기도 용인시 기흥구 신갈로100',
                planTime: '09:00~09:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '나대상',
                serviceName: '전화',
                phone: '010-2345-6789',
                address: '경기도 용인시 기흥구 신갈로100',
                planTime: '10:00~10:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '나대상',
                serviceName: '전화',
                phone: '010-2345-6789',
                address: '경기도 용인시 기흥구 신갈로100',
                planTime: '11:00~11:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '나대상',
                serviceName: '전화',
                phone: '010-2345-6789',
                address: '경기도 용인시 기흥구 신갈로100',
                planTime: '14:00~14:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            },
            {
                beneficiaryName: '나대상',
                serviceName: '전화',
                phone: '010-2345-6789',
                address: '경기도 용인시 기흥구 신갈로100',
                planTime: '15:00~15:05',
                planDuration: '5분',
                planStatus: '미진행',
                actualTime: '',
                actualDuration: '',
                actualStatus: ''
            }
        ];
        
        return {
            results: [{
                selectResults: progressData
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
// 이 파일에서는 getPageConfig를 정의합니다.

function getPageConfig() {
    return {
        // API 엔드포인트 (페이지 파일명 자동 사용)
        apiEndpoint: getPagePrefix(),
        
        // 쿼리 ID 설정
        queries: {
            list: 'Q010',      // 위치 목록 조회
            journal: 'Q020',   // 업무일지 조회
            progress: 'Q030'   // 진행상황 조회
        },
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['선택', '복지사', '지원사', '대상자', '서비스', '대상자주소', '구분', '시간', '업무위치(주소)', '오차(M)', '일지', 'supportWorkerId'],
            model: [
            { 
                name: 'select', 
                index: 'select', 
                width: 50, 
                align: 'center',
                sortable: false,
                search: false,
                formatter: function(cellvalue, options, rowObject) {
                    return '<input type="checkbox" class="worker-checkbox" data-worker-id="' + rowObject.supportWorkerId + '" style="cursor: pointer;">';
                }
            },
            { 
                name: 'welfareWorker', 
                index: 'welfareWorker', 
                width: 100, 
                align: 'center',
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn'] },
            },
            { 
                name: 'supportWorker', 
                index: 'supportWorker', 
                width: 100, 
                align: 'center',
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn'] },
            },
            { 
                name: 'beneficiary', 
                index: 'beneficiary', 
                width: 100, 
                align: 'center', 
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn'] },
            },
            { 
                name: 'service', 
                index: 'service', 
                width: 120, 
                align: 'center', 
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn'] },
            },
            { 
                name: 'beneficiaryAddress', 
                index: 'beneficiaryAddress', 
                width: 300, 
                align: 'left', 
                sortable: false,
                search: true,
                searchoptions: { sopt: ['cn'] },
            },
            { 
                name: 'category', 
                index: 'category', 
                width: 60, 
                align: 'center', 
                sortable: false,
                search: true,
                searchoptions: { sopt: ['eq', 'ne'], value: ":전체;시작:시작;종료:종료" }
            },
            { 
                name: 'time', 
                index: 'time', 
                width: 100, 
                align: 'center', 
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge'] }
            },
            { 
                name: 'workLocation', 
                index: 'workLocation', 
                width: 250, 
                align: 'left', 
                sortable: false,
                search: true,
                searchoptions: { sopt: ['cn'] }
            },
            { 
                name: 'error', 
                index: 'error', 
                width: 80, 
                align: 'center', 
                sortable: true,
                search: true,
                searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge'] }
            },
            { 
                name: 'actions', 
                index: 'actions', 
                width: 80, 
                align: 'center',
                sortable: false,
                search: false,
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.hasJournal) {
                        return '<button class="btn-journal" data-journal-id="' + rowObject.journalId + '" style="padding: 4px 8px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 3px; font-size: 12px;">일지</button>';
                    }
                    return '';
                }
            },
            { name: 'supportWorkerId', index: 'supportWorkerId', hidden: true, search: false }
            ]
        },
        
        // 그리드 설정
        grid: {
            width: '100%',
            height: 'auto',
            rowNum: 1000,
            pager: '#LocationPager',
            viewrecords: true,
            caption: '',
            multiselect: false,
            grouping: false,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            shrinkToFit: true,
            search: true,
            searchoptions: {
                sopt: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                closeOnEscape: true,
                closeAfterSearch: true,
                multipleSearch: true,
                multipleGroup: true,
                showQuery: true,
                caption: "고급 검색",
                Find: "검색",
                Reset: "초기화",
                odata: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                groupOps: [{ op: "AND", text: "그리고" }, { op: "OR", text: "또는" }]
            }
        },
        
        // 메시지 텍스트
        messages: {
            excelExport: 'Excel 파일로 다운로드되었습니다.',
            excelExportError: 'Excel 다운로드 중 오류가 발생했습니다.',
            loadError: '위치 데이터를 불러올 수 없습니다.',
            journalError: '업무일지를 불러올 수 없습니다.',
            progressError: '진행상황을 불러올 수 없습니다.'
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => ({
            id: item.id || '',
            select: '',
            welfareWorker: item.welfareWorker || '',
            supportWorker: item.supportWorker || '',
            supportWorkerId: item.supportWorkerId || '',
            beneficiary: item.beneficiary || '',
            service: item.service || '',
            beneficiaryAddress: item.beneficiaryAddress || '',
            category: item.category || '',
            time: item.time || '',
            workLocation: item.workLocation || '',
            error: item.error || '',
            hasJournal: item.hasJournal || false,
            journalId: item.journalId || null
        }),
        
        // 목록 조회 파라미터 구성 함수
        buildListParams: (inquiryDate) => ({
            inquiryDate: inquiryDate || currentInquiryDate
        })
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 공통 헬퍼 함수
// ==========================================

// 그리드 데이터 업데이트 헬퍼 함수
function updateGridData(gridId, data) {
    $(gridId).jqGrid('clearGridData');
    $(gridId).jqGrid('setGridParam', { datatype: 'local', data: data });
    $(gridId).trigger('reloadGrid');
}

// ==========================================
// 그리드 초기화 함수
// ==========================================

// 위치 그리드 초기화
function initLocationGrid() {
    const config = getPageConfig();
    
    $('#LocationGrid').jqGrid({
        datatype: 'local',
        colNames: config.columns.names,
        colModel: config.columns.model,
        ...config.grid,
        loadComplete: function(data) {
            // 일지 버튼 이벤트 바인딩
            $('.btn-journal').off('click').on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const journalId = $(this).data('journal-id');
                if (journalId) {
                    showWorkJournal(journalId);
                }
            });
            
            // 체크박스 이벤트 바인딩 및 지원사별 그룹화
            setupWorkerCheckboxes();
            
            // 물결표(~) 제거
            $('#LocationGrid .ui-search-operands').hide();
            $('#LocationGrid .ui-search-input').each(function() {
                const $input = $(this);
                if ($input.prev('.ui-search-operands').length > 0) {
                    $input.prev('.ui-search-operands').hide();
                }
            });
            
            // 컬럼 병합 적용 (체크박스는 마지막에 병합)
            setTimeout(() => {
                mergeCellsHierarchical('#LocationGrid', 'welfareWorker', []);
                mergeCellsHierarchical('#LocationGrid', 'supportWorker', ['welfareWorker']);
                mergeCellsHierarchical('#LocationGrid', 'beneficiary', ['welfareWorker', 'supportWorker']);
                mergeCellsHierarchical('#LocationGrid', 'service', ['welfareWorker', 'supportWorker', 'beneficiary']);
                mergeCellsHierarchical('#LocationGrid', 'beneficiaryAddress', ['welfareWorker', 'supportWorker', 'beneficiary']);
                // 체크박스 병합은 다른 병합 후에 실행
                setTimeout(() => {
                    mergeWorkerCheckboxes();
                }, 50);
            }, 100);
        },
        gridComplete: function() {
            // 물결표(~) 제거
            $('#LocationGrid .ui-search-operands').hide();
            $('#LocationGrid .ui-search-input').each(function() {
                const $input = $(this);
                if ($input.prev('.ui-search-operands').length > 0) {
                    $input.prev('.ui-search-operands').hide();
                }
            });
        }
    });
    
    // 네비게이션 바 추가 (검색 버튼 제외)
    $('#LocationGrid').jqGrid('navGrid', '#LocationPager', {
        edit: false,
        add: false,
        del: false,
        search: false,
        refresh: true,
        view: false,
        position: "left",
        refreshtext: "새로고침"
    });
    
    // 필터 툴바 추가 (각 컬럼 헤더 아래 검색 필드)
    $('#LocationGrid').jqGrid('filterToolbar', {
        searchOnEnter: true,
        defaultSearch: "cn",
        stringResult: true,
        searchOperators: false
    });
    
    // 물결표(~) 완전히 제거
    setTimeout(() => {
        $('#LocationGrid .ui-search-operands').remove();
        $('#LocationGrid .ui-search-input').each(function() {
            const $input = $(this);
            const $prev = $input.prev();
            if ($prev.hasClass('ui-search-operands')) {
                $prev.remove();
            }
        });
        // CSS로도 숨김
        $('#LocationGrid .ui-search-operands').css('display', 'none !important');
    }, 200);
    
    // 필터 툴바 검색 후 병합 재적용
    $('#LocationGrid').on('jqGridAfterGridComplete', function() {
        setTimeout(() => {
            mergeCellsHierarchical('#LocationGrid', 'welfareWorker', []);
            mergeCellsHierarchical('#LocationGrid', 'supportWorker', ['welfareWorker']);
            mergeCellsHierarchical('#LocationGrid', 'beneficiary', ['welfareWorker', 'supportWorker']);
            mergeCellsHierarchical('#LocationGrid', 'service', ['welfareWorker', 'supportWorker', 'beneficiary']);
            mergeCellsHierarchical('#LocationGrid', 'beneficiaryAddress', ['welfareWorker', 'supportWorker', 'beneficiary']);
            // 체크박스 병합은 다른 병합 후에 실행
            setTimeout(() => {
                mergeWorkerCheckboxes();
                setupWorkerCheckboxes(); // 체크박스 이벤트 재바인딩
            }, 50);
        }, 100);
    });
}

// ==========================================
// 그리드 데이터 로드 함수
// ==========================================

// 그리드 데이터 로드
async function loadLocationData() {
    try {
        const config = getPageConfig();
        const params = config.buildListParams(currentInquiryDate);
        const result = await callAPI(config.apiEndpoint, config.queries.list, params);
        
        if (result && result.results && result.results[0]) {
            const dataList = result.results[0].selectResults || [];
            
            // 데이터 변환 및 rowspan 계산
            const processedData = processGridData(dataList.map(item => config.transformListItem(item)));
            
            updateGridData('#LocationGrid', processedData);
        }
    } catch (e) {
        console.error('위치 데이터 로드 중 오류:', e);
        const config = getPageConfig();
        showError(config.messages.loadError);
    }
}

// 컬럼 병합 함수 (service-management.js 방식)
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


// 체크박스 설정 (지원사별로 병합)
function setupWorkerCheckboxes() {
    // 모든 체크박스 이벤트 제거 후 재바인딩
    // 병합 후에는 보이는 체크박스만 이벤트 바인딩
    $('.worker-checkbox').off('change').on('change', function(e) {
        e.stopPropagation();
        const $checkbox = $(this);
        const workerId = $checkbox.data('worker-id');
        const isChecked = $checkbox.is(':checked');
        
        // 같은 지원사의 모든 체크박스 상태 동기화 (보이는 것과 숨겨진 것 모두)
        $('.worker-checkbox[data-worker-id="' + workerId + '"]').prop('checked', isChecked);
        
        if (isChecked) {
            // 다른 지원사의 모든 체크박스 해제
            $('.worker-checkbox').not('[data-worker-id="' + workerId + '"]').prop('checked', false);
            
            // 선택된 지원사 ID 저장
            selectedWorkerId = workerId;
        } else {
            // 체크 해제 시 선택 해제
            selectedWorkerId = null;
        }
    });
}

// 지원사 체크박스 병합 (같은 지원사의 행들은 같은 체크박스 공유)
// 복지사 > 지원사 계층 구조를 고려하여 병합
// 각 지원사별로 체크박스는 하나만 존재하도록 보장
function mergeWorkerCheckboxes() {
    try {
        const gridId = '#LocationGrid';
        const gridIdStr = 'LocationGrid';
        const columnName = 'select';
        const rows = $(gridId + ' tbody tr.jqgrow');
        
        if (rows.length === 0) return;
        
        // 먼저 모든 rowspan 제거 (재병합을 위해)
        rows.find(`td[aria-describedby="${gridIdStr}_${columnName}"]`).each(function() {
            const $cell = $(this);
            if ($cell.attr('rowspan')) {
                $cell.removeAttr('rowspan');
            }
        });
        
        let currentWelfareWorker = null;
        let currentWorkerId = null;
        let startRow = null;
        let spanCount = 0;
        
        rows.each(function(rowIndex) {
            const $row = $(this);
            const rowId = $row.attr('id');
            if (!rowId) return true;
            
            const rowData = $('#LocationGrid').jqGrid('getRowData', rowId);
            const welfareWorker = String(rowData.welfareWorker || '');
            const workerId = String(rowData.supportWorkerId || '');
            
            // 복지사와 지원사가 모두 같아야 같은 그룹
            const isNewGroup = (currentWelfareWorker !== welfareWorker || currentWorkerId !== workerId);
            
            if (isNewGroup) {
                // 이전 그룹 처리
                if (startRow !== null && spanCount > 1) {
                    const $startCell = $(rows[startRow]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
                    if ($startCell.length > 0) {
                        $startCell.attr('rowspan', spanCount);
                        // 중간 셀들 제거
                        for (let i = startRow + 1; i < startRow + spanCount; i++) {
                            const $removeCell = $(rows[i]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
                            if ($removeCell.length > 0) {
                                $removeCell.remove();
                            }
                        }
                    }
                }
                
                // 새 그룹 시작
                currentWelfareWorker = welfareWorker;
                currentWorkerId = workerId;
                startRow = rowIndex;
                spanCount = 1;
            } else {
                // 같은 복지사와 지원사
                spanCount++;
            }
        });
        
        // 마지막 그룹 처리
        if (startRow !== null && spanCount > 1) {
            const $startCell = $(rows[startRow]).find(`td[aria-describedby="${gridIdStr}_${columnName}"]`);
            if ($startCell.length > 0) {
                $startCell.attr('rowspan', spanCount);
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
        console.error('체크박스 병합 중 오류:', e);
    }
}

// 그리드 데이터 처리 (복지사/지원사 그룹화, 정렬)
function processGridData(dataList) {
    // 요구사항에 따른 정렬:
    // 1. 복지사, 지원사 가나다순으로 정렬
    // 2. 대상자는 시작 시간순으로 정렬
    
    // 복지사 > 지원사 > 대상자 시작 시간순으로 정렬
    const sortedData = [...dataList].sort((a, b) => {
        // 1. 복지사 가나다순
        if (a.welfareWorker !== b.welfareWorker) {
            return a.welfareWorker.localeCompare(b.welfareWorker, 'ko');
        }
        // 2. 지원사 가나다순
        if (a.supportWorker !== b.supportWorker) {
            return a.supportWorker.localeCompare(b.supportWorker, 'ko');
        }
        // 3. 대상자 시작 시간순 (같은 대상자면 시작 시간으로 정렬)
        // 같은 대상자 내에서 시작 시간 기준으로 정렬
        if (a.beneficiary !== b.beneficiary) {
            // 대상자가 다르면 대상자 이름으로 정렬하지 않고, 시작 시간으로 정렬
            // 하지만 같은 지원사 내에서는 대상자의 시작 시간순으로 정렬해야 함
            // 시작 시간을 기준으로 정렬 (시작 시간이 빠른 것이 먼저)
            return a.time.localeCompare(b.time);
        }
        // 같은 대상자면 시작/종료 구분 (시작이 종료보다 먼저)
        if (a.category !== b.category) {
            if (a.category === '시작') return -1;
            if (b.category === '시작') return 1;
        }
        // 같은 구분이면 시간순
        return a.time.localeCompare(b.time);
    });
    
    // 추가: 대상자별로 시작 시간을 기준으로 정렬
    // 같은 지원사 내에서 대상자들을 시작 시간순으로 정렬
    const workerGroups = {};
    sortedData.forEach(item => {
        const key = item.welfareWorker + '|' + item.supportWorker;
        if (!workerGroups[key]) {
            workerGroups[key] = [];
        }
        workerGroups[key].push(item);
    });
    
    // 각 지원사 그룹별로 대상자 시작 시간 기준으로 재정렬
    const finalSorted = [];
    Object.keys(workerGroups).sort().forEach(key => {
        const group = workerGroups[key];
        // 대상자별로 그룹화
        const beneficiaryGroups = {};
        group.forEach(item => {
            if (!beneficiaryGroups[item.beneficiary]) {
                beneficiaryGroups[item.beneficiary] = [];
            }
            beneficiaryGroups[item.beneficiary].push(item);
        });
        
        // 대상자별 시작 시간을 찾아서 정렬
        const beneficiaryStarts = {};
        Object.keys(beneficiaryGroups).forEach(beneficiary => {
            const startItem = beneficiaryGroups[beneficiary].find(item => item.category === '시작');
            if (startItem) {
                beneficiaryStarts[beneficiary] = startItem.time;
            } else {
                // 시작이 없으면 첫 번째 아이템의 시간 사용
                beneficiaryStarts[beneficiary] = beneficiaryGroups[beneficiary][0].time;
            }
        });
        
        // 대상자 시작 시간순으로 정렬
        const sortedBeneficiaries = Object.keys(beneficiaryGroups).sort((a, b) => {
            return beneficiaryStarts[a].localeCompare(beneficiaryStarts[b]);
        });
        
        // 정렬된 대상자 순서대로 데이터 추가
        sortedBeneficiaries.forEach(beneficiary => {
            const items = beneficiaryGroups[beneficiary];
            // 같은 대상자 내에서는 시작이 종료보다 먼저
            items.sort((a, b) => {
                if (a.category !== b.category) {
                    if (a.category === '시작') return -1;
                    if (b.category === '시작') return 1;
                }
                return a.time.localeCompare(b.time);
            });
            finalSorted.push(...items);
        });
    });
    
    const finalSortedData = finalSorted.length > 0 ? finalSorted : sortedData;
    
    // 데이터 정렬 후 반환 (병합은 loadComplete에서 처리)
    return finalSortedData;
}

// 업무일지 표시
// ==========================================
// 모달 및 이벤트 핸들러 함수
// ==========================================

// 업무일지 표시
async function showWorkJournal(journalId) {
    try {
        const config = getPageConfig();
        const result = await callAPI(config.apiEndpoint, config.queries.journal, {
            journalId: journalId
        });
        
        if (result && result.results && result.results[0] && result.results[0].selectResults && result.results[0].selectResults[0]) {
            const journal = result.results[0].selectResults[0];
            
            const contentHtml = `
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px;">작성일</label>
                    <div style="padding: 8px; background: #f9f9f9; border-radius: 4px;">${journal.date}</div>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px;">지원사</label>
                    <div style="padding: 8px; background: #f9f9f9; border-radius: 4px;">${journal.workerName}</div>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px;">대상자</label>
                    <div style="padding: 8px; background: #f9f9f9; border-radius: 4px;">${journal.beneficiaryName}</div>
                </div>
                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px;">내용</label>
                    <textarea id="journalContentEdit" style="width: 100%; height: 300px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; resize: vertical; font-family: inherit;">${journal.content || ''}</textarea>
                </div>
                <div style="text-align: center;">
                    <button id="saveJournalBtn" style="padding: 10px 30px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: bold; margin-right: 10px;">저장</button>
                    <button id="cancelJournalBtn" style="padding: 10px 30px; cursor: pointer; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: bold;">취소</button>
                </div>
            `;
            
            $('#workJournalContent').html(contentHtml);
            $('#workJournalModal').show();
            
            // 저장 버튼 이벤트
            $('#saveJournalBtn').off('click').on('click', function() {
                const content = $('#journalContentEdit').val();
                // 저장 로직 (실제 API 호출)
                showMessage('업무일지가 저장되었습니다.');
                $('#workJournalModal').hide();
            });
            
            // 취소 버튼 이벤트
            $('#cancelJournalBtn').off('click').on('click', function() {
                $('#workJournalModal').hide();
            });
        }
    } catch (e) {
        console.error('업무일지 로드 중 오류:', e);
        const config = getPageConfig();
        showError(config.messages.journalError);
    }
}

// 진행상황 표시
async function showProgressStatus() {
    if (!selectedWorkerId) {
        alert('지원사를 선택해 주세요');
        return;
    }
    
    try {
        const config = getPageConfig();
        const result = await callAPI(config.apiEndpoint, config.queries.progress, {
            workerId: selectedWorkerId
        });
        
        if (result && result.results && result.results[0] && result.results[0].selectResults && result.results[0].selectResults.length > 0) {
            const beneficiaries = result.results[0].selectResults;
            
            let tableHtml = `
                <table style="width: 100%; border-collapse: collapse; border-spacing: 0; margin: 0;">
                    <thead>
                        <tr style="background: #e9ecef;">
                            <th colspan="5" style="padding: 8px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; background: #e9ecef;">대상자 정보</th>
                            <th colspan="3" style="padding: 8px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; background: #e9ecef;">계획</th>
                            <th colspan="3" style="padding: 8px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; background: #e9ecef;">실적</th>
                        </tr>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">No</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">대상자명</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">서비스명</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">전화번호</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">주소</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">진행시간</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">소요시간</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">상태</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">진행시간</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">소요시간</th>
                            <th style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-weight: bold; font-size: 13px;">상태</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            beneficiaries.forEach((item, index) => {
                const planStatus = item.planStatus || '미진행';
                const actualStatus = item.actualStatus || '';
                const planStatusColor = planStatus === '완료' ? '#000000' : (planStatus === '진행중' ? '#dc3545' : '#007bff');
                const actualStatusColor = actualStatus === '완료' ? '#000000' : (actualStatus === '진행중' ? '#dc3545' : '#000000');
                
                tableHtml += `
                    <tr>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${index + 1}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.beneficiaryName || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.serviceName || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.phone || ''}</td>
                        <td style="padding: 6px; text-align: left; border: 1px solid #dee2e6; font-size: 13px;">${item.address || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.planTime || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.planDuration || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px; color: ${planStatusColor};">${planStatus}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.actualTime || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px;">${item.actualDuration || ''}</td>
                        <td style="padding: 6px; text-align: center; border: 1px solid #dee2e6; font-size: 13px; color: ${actualStatusColor};">${actualStatus}</td>
                    </tr>
                `;
            });
            
            tableHtml += `
                    </tbody>
                </table>
            `;
            
            $('#progressStatusContent').html(tableHtml);
            $('#progressStatusModal').show();
        }
    } catch (e) {
        console.error('진행상황 로드 중 오류:', e);
        const config = getPageConfig();
        showError(config.messages.progressError);
    }
}

// Excel 내보내기
function exportToExcel() {
    try {
        const config = getPageConfig();
        
        if (!selectedWorkerId) {
            showMessage('다운로드할 지원사를 선택해 주세요.');
            return;
        }
        
        const allData = $('#LocationGrid').jqGrid('getRowData');
        const selectedData = allData.filter(row => row.supportWorkerId == selectedWorkerId);
        
        if (selectedData.length === 0) {
            showMessage('다운로드할 데이터가 없습니다.');
            return;
        }
        
        // Excel 내보내기 (간단한 방법)
        let csvContent = '\uFEFF'; // UTF-8 BOM
        const headers = ['복지사', '지원사', '대상자', '서비스', '대상자주소', '구분', '시간', '업무위치(주소)', '오차(M)'];
        csvContent += headers.join(',') + '\n';
        
        selectedData.forEach(row => {
            const rowData = [
                row.welfareWorker || '',
                row.supportWorker || '',
                row.beneficiary || '',
                row.service || '',
                '"' + (row.beneficiaryAddress || '').replace(/"/g, '""') + '"',
                row.category || '',
                row.time || '',
                '"' + (row.workLocation || '').replace(/"/g, '""') + '"',
                row.error || ''
            ];
            csvContent += rowData.join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', '생활지원사_위치조회_' + currentInquiryDate + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage(config.messages.excelExport);
    } catch (e) {
        console.error('Excel 다운로드 중 오류:', e);
        const config = getPageConfig();
        showError(config.messages.excelExportError);
    }
}

// ==========================================
// 페이지 초기화
// ==========================================

// 페이지 초기화
function initSupportWorkerLocation() {
    try {
        // 조회일자 초기화 (오늘 날짜)
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
                loadLocationData();
            }
        });
        
        // 캘린더 아이콘 클릭 이벤트
        $('#calendarIcon').on('click', function() {
            $('#inquiryDate').datepicker('show');
        });
        
        // 진행상황 버튼 이벤트
        $('#btnProgressStatus').on('click', function() {
            showProgressStatus();
        });
        
        // EXCEL 버튼 이벤트
        $('#btnExcel').on('click', function() {
            exportToExcel();
        });
        
        // 모달 닫기 이벤트
        $('#closeWorkJournalModal').on('click', function() {
            $('#workJournalModal').hide();
        });
        
        $('#closeProgressStatusModal').on('click', function() {
            $('#progressStatusModal').hide();
        });
        
        // 모달 배경 클릭 시 닫기
        $('#workJournalModal').on('click', function(e) {
            if ($(e.target).attr('id') === 'workJournalModal') {
                $(this).hide();
            }
        });
        
        $('#progressStatusModal').on('click', function(e) {
            if ($(e.target).attr('id') === 'progressStatusModal') {
                $(this).hide();
            }
        });
        
        // 그리드 초기화
        initLocationGrid();
        
        // 데이터 로드
        loadLocationData();
        
    } catch (e) {
        console.error('페이지 초기화 중 오류:', e);
        showError('페이지 초기화 중 오류가 발생했습니다.');
    }
}

// ==========================================
// 전역 함수로 노출
// ==========================================

window.initSupportWorkerLocation = initSupportWorkerLocation;
