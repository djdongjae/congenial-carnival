// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의 (employee.js 형식)
const sampleData = [
    { id: 1, socialWorkerId: 1, name: '김영희', birthDate: '1970-10-28', phone: '010-1234-5678', gender: '여', age: 55, registrationDate: '1970-10-28', endDate: '1970-10-28', beneficiary: '16명' },
    { id: 2, socialWorkerId: 1, name: '나영희', birthDate: '1970-01-01', phone: '010-5678-9101', gender: '남', age: 55, registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '18명' },
    { id: 3, socialWorkerId: 2, name: '박영희', birthDate: '1975-05-15', phone: '010-1111-2222', gender: '여', age: 50, registrationDate: '2020-01-01', endDate: '', beneficiary: '10명' },
    { id: 4, socialWorkerId: 3, name: '김영희', birthDate: '1970-10-28', phone: '010-1234-5678', gender: '여', age: 55, registrationDate: '1970-10-28', endDate: '1970-10-28', beneficiary: '16명' },
    { id: 5, socialWorkerId: 3, name: '나영희', birthDate: '1970-01-01', phone: '010-5678-9101', gender: '남', age: 55, registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '18명' },
    { id: 6, socialWorkerId: 3, name: '박영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 7, socialWorkerId: 3, name: '손영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 8, socialWorkerId: 3, name: '정영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 9, socialWorkerId: 3, name: '차영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 10, socialWorkerId: 3, name: '최영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 11, socialWorkerId: 3, name: '홍영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' },
    { id: 12, socialWorkerId: 3, name: '황영희', birthDate: '1970-01-01', phone: '', gender: '', age: '', registrationDate: '1970-01-01', endDate: '1970-01-01', beneficiary: '' }
];

// 전담사회복지사 샘플 데이터 (특수 로직용)
const sampleSocialWorkers = [
    { id: 1, no: 1, name: '김영희' },
    { id: 2, no: 2, name: '나숙희' },
    { id: 3, no: 3, name: '문미희' }
];

// 전담사회복지사별 생활지원사 데이터 (특수 로직용)
const sampleLifeSupportWorkersBySocialWorker = {
    1: sampleData.filter(item => item.socialWorkerId === 1),
    2: sampleData.filter(item => item.socialWorkerId === 2),
    3: sampleData.filter(item => item.socialWorkerId === 3)
};

// 현재 선택된 전담사회복지사 ID
let selectedSocialWorkerId = null;

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
        // 전담사회복지사 목록 조회 (특수 로직)
        if (endpoint === 'life-support-worker') {
            return {
                results: [{
                    selectResults: sampleSocialWorkers,
                    totalResults: sampleSocialWorkers.length
                }],
                status: 'success'
            };
        }
        // 생활지원사 목록 조회 (일반)
        return {
            results: [{
                selectResults: sampleData,
                totalResults: sampleData.length
            }],
            status: 'success'
        };
    } else if (queryId === 'Q020') {
        // 생활지원사 목록 조회 (특수 로직 - 전담사회복지사별)
        const socialWorkerId = params['1'] || selectedSocialWorkerId;
        const workers = sampleLifeSupportWorkersBySocialWorker[socialWorkerId] || [];
        return {
            results: [{
                selectResults: workers,
                totalResults: workers.length
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
        // list, add, edit, delete는 공통 함수에서 자동 처리됩니다.
        
        queries: {
            list: 'Q010',      // 목록 조회 (공통 함수 자동 처리)
            add: 'Q030',       // 추가 (공통 함수 자동 처리)
            edit: 'Q040',      // 수정 (공통 함수 자동 처리)
            delete: 'Q050'   // 삭제 (공통 함수 자동 처리)
        },
        
      
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['전담사회복지사', '생활지원사', '생년월일', '연락처', '성별', '나이', '등록일', '종료일', '대상자'],
            model: [
                {
                    name: 'socialWorkerId',
                    index: 'socialWorkerId',
                    editable: true,
                    editrules: { required: true },
                    edittype: "select",
                    editoptions: {
                        value: getSocialWorkerSelectOptions()
                    },
                    formatter: function(cellvalue, options, rowObject) {
                        if (!cellvalue) return '';
                        const socialWorkerId = parseInt(cellvalue);
                        return getSocialWorkerName(socialWorkerId) || cellvalue;
                    },
                    search: true,
                    searchoptions: { 
                        sopt: ['eq', 'ne'], 
                        value: getSocialWorkerSearchOptions()
                    },
                    width: 120
                },
                { name: 'name', index: 'name', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'birthDate', index: 'birthDate', sorttype: "date", editable: true, editrules: { required: true }, 
                    editoptions: {
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        }
                    },
                    search: true, 
                    searchoptions: { 
                        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], 
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        } 
                    }, 
                    width: 100
                },
                { name: 'phone', index: 'phone', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { 
                    name: 'gender', 
                    index: 'gender', 
                    editable: true, 
                    editrules: { required: true }, 
                    edittype: "select", 
                    editoptions: { value: "남:남;여:여" }, 
                    search: true, 
                    searchoptions: { sopt: ['eq', 'ne'], value: ":전체;남:남;여:여" }, 
                    width: 80
                },
                { name: 'age', index: 'age', editable: true, editrules: { required: true }, sorttype: "int", search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] }, width: 60 },
                { name: 'registrationDate', index: 'registrationDate', sorttype: "date", editable: true, editrules: { required: true },
                    editoptions: {
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        }
                    },
                    search: true, 
                    searchoptions: { 
                        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], 
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        } 
                    }, 
                    width: 100
                },
                { name: 'endDate', index: 'endDate', sorttype: "date", editable: true, editrules: { required: true },
                    editoptions: {
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        }
                    },
                    search: true, 
                    searchoptions: { 
                        sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], 
                        dataInit: function(elem) { 
                            $(elem).datepicker({ 
                                dateFormat: 'yy-mm-dd', 
                                showMonthAfterYear: true, 
                                yearSuffix: '년' 
                            }); 
                        } 
                    }, 
                    width: 100
                },
                { name: 'beneficiary', index: 'beneficiary', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 80 }
            ]
        },
        
          // 그리드 설정
          grid: {
            sortname: 'id',
            sortorder: "asc"
        },
        // 메시지 텍스트
        messages: {
            add: '생활지원사 정보가 추가되었습니다.',
            edit: '생활지원사 정보가 수정되었습니다.',
            delete: '생활지원사 정보가 삭제되었습니다.',
            addError: '생활지원사 정보 추가 중 오류가 발생했습니다: ',
            editError: '생활지원사 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '생활지원사 정보 삭제 중 오류가 발생했습니다: '
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => ({
            id: item.id || '',
            socialWorkerId: item.socialWorkerId || '',
            name: item.name || '',
            birthDate: item.birthDate || '',
            phone: item.phone || '',
            gender: item.gender || '',
            age: item.age || '',
            registrationDate: item.registrationDate || '',
            endDate: item.endDate || '',
            beneficiary: item.beneficiary || ''
        }),
        

         // 목록 조회 파라미터 구성 함수
         buildListParams: (page, rows) => ({
            '1': rows.toString(),
            '2': ((page - 1) * rows).toString()
        }),

        // 데이터 변환 함수 (입력 데이터 -> API 파라미터)
        transformInputData: (postdata, oper) => { 
            
            // 전담사회복지사 ID 확인
            const socialWorkerId = postdata.socialWorkerId || selectedSocialWorkerId;
            
            // 작업별 파라미터 구성
            if (oper === 'add') {
                return {
                    '1': socialWorkerId.toString(),
                    '2': postdata.name || '',
                    '3': postdata.birthDate || '',
                    '4': postdata.phone || '',
                    '5': postdata.gender || '',
                    '6': postdata.age || '',
                    '7': postdata.registrationDate || '',
                    '8': postdata.endDate || '',
                    '9': postdata.beneficiary || ''
                };
            } else if (oper === 'edit') {
                return {
                    '1': postdata.id || postdata.no || '',
                    '2': socialWorkerId.toString(),
                    '3': postdata.name || '',
                    '4': postdata.birthDate || '',
                    '5': postdata.phone || '',
                    '6': postdata.gender || '',
                    '7': postdata.age || '',
                    '8': postdata.registrationDate || '',
                    '9': postdata.endDate || '',
                    '10': postdata.beneficiary || ''
                };
            } else if (oper === 'del') {
                return {
                    '1': postdata.id || postdata.no || ''
                };
            }
            return {};
        },
        
        // 벨리데이션 함수
        validate: (operType, data) => {
            const missing = [];
            if (!data.socialWorkerId || String(data.socialWorkerId).trim() === '') missing.push('전담사회복지사');
            if (!data.name || String(data.name).trim() === '') missing.push('생활지원사 이름');
            if (!data.birthDate || String(data.birthDate).trim() === '') missing.push('생년월일');
            if (!data.phone || String(data.phone).trim() === '') missing.push('연락처');
            if (!data.gender || String(data.gender).trim() === '') missing.push('성별');
            if (!data.age || String(data.age).trim() === '') missing.push('나이');
            if (!data.registrationDate || String(data.registrationDate).trim() === '') missing.push('등록일');
            if (!data.endDate || String(data.endDate).trim() === '') missing.push('종료일');
            if (!data.beneficiary || String(data.beneficiary).trim() === '') missing.push('대상자');
            if (missing.length > 0) {
                throw new Error('필수 항목 누락: ' + missing.join(', '));
            }
        }
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 특수 로직: 전담사회복지사 그리드 및 연동 기능
// ==========================================

// 전담사회복지사 그리드 초기화
function initSocialWorkerGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['No', '이름'],
            colModel: [
                { name: 'no', index: 'no', sorttype: "int", key: true, align: 'center', search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } },
                { name: 'name', index: 'name', align: 'left', search: true, searchoptions: { sopt: ['cn'] } }
            ],
            rowNum: 20,
            rowList: [10, 20, 30, 50],
            pager: '#SocialWorkerPager',
            sortname: 'no',
            sortorder: "asc",
            viewrecords: true,
            caption: "",
            height: 500,
            width: 300,
            editurl: '',
            cellEdit: false,
            multiselect: false,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            onSelectRow: function(id) {
                const rowData = $('#SocialWorkerGrid').jqGrid('getRowData', id);
                if (rowData && rowData.no) {
                    selectedSocialWorkerId = parseInt(rowData.no);
                    loadLifeSupportWorkerListBySocialWorker(selectedSocialWorkerId);
                    $('#SocialWorkerGrid tr').removeClass('selected-row');
                    $('#SocialWorkerGrid tr#' + id).addClass('selected-row');
                }
            },
            loadComplete: function(data) {
                if (data && data.rows && data.rows.length > 0) {
                    const firstRowId = data.rows[0].id;
                    setTimeout(() => {
                        $('#SocialWorkerGrid').jqGrid('setSelection', firstRowId);
                    }, 100);
                }
            }
        };

        $('#SocialWorkerGrid').jqGrid(gridConfig);
        
        $('#SocialWorkerGrid').jqGrid('navGrid', '#SocialWorkerPager', {
            edit: false,
            add: false,
            del: false,
            search: false,
            refresh: true,
            view: false,
            position: "left",
            cloneToTop: false
        });

        $('#SocialWorkerGrid').jqGrid('filterToolbar', {
            searchOnEnter: true,
            defaultSearch: "cn"
        });

        // grid-container의 실제 너비에 맞춰 그리드 너비 설정
        setTimeout(() => {
            const gridContainer = $('#SocialWorkerGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    // 그리드 너비를 컨테이너 너비에 맞춤
                    $('#SocialWorkerGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadSocialWorkerList();
    } catch (e) {
        console.error('전담사회복지사 그리드 초기화 중 오류:', e);
        showError('전담사회복지사 그리드 초기화 중 오류가 발생했습니다.');
    }
}

// 전담사회복지사 목록 로드
async function loadSocialWorkerList() {
    try {
        const result = await callAPI('life-support-worker', 'Q010', {});
        
        let dataList = [];
        
        if (result && result.results && Array.isArray(result.results) && result.results.length > 0) {
            const firstResult = result.results[0];
            if (firstResult.selectResults && Array.isArray(firstResult.selectResults)) {
                dataList = firstResult.selectResults.map((item, index) => ({
                    id: item.id || item.no || 'sw_' + index,
                    no: item.no || item.id || '',
                    name: item.name || ''
                }));
            }
        }
        
        if (dataList.length > 0) {
            $('#SocialWorkerGrid').jqGrid('clearGridData');
            $('#SocialWorkerGrid').jqGrid('setGridParam', { data: dataList });
            $('#SocialWorkerGrid').trigger('reloadGrid');
            setTimeout(() => {
                const firstRowId = dataList[0].id;
                if (firstRowId) {
                    $('#SocialWorkerGrid').jqGrid('setSelection', firstRowId);
                }
            }, 200);
        } else {
            $('#SocialWorkerGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('전담사회복지사 목록 조회 중 오류:', e);
        showError('전담사회복지사 목록 조회 중 오류가 발생했습니다.');
    }
}

// 전담사회복지사별 생활지원사 목록 로드 (특수 로직)
async function loadLifeSupportWorkerListBySocialWorker(socialWorkerId) {
    try {
        if (!socialWorkerId) {
            $('#MainGrid').jqGrid('clearGridData');
            return;
        }

        const result = await callAPI('life-support-worker', 'Q020', { '1': socialWorkerId.toString() });
        
        let dataList = [];
        
        if (result && result.results && Array.isArray(result.results) && result.results.length > 0) {
            const firstResult = result.results[0];
            if (firstResult.selectResults && Array.isArray(firstResult.selectResults)) {
                const config = window.getPageConfig();
                dataList = firstResult.selectResults.map(item => config.transformListItem(item));
            }
        }
        
        if (dataList.length > 0) {
            $('#MainGrid').jqGrid('clearGridData');
            $('#MainGrid').jqGrid('setGridParam', { data: dataList });
            $('#MainGrid').trigger('reloadGrid');
        } else {
            $('#MainGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('생활지원사 목록 조회 중 오류:', e);
        showError('생활지원사 목록 조회 중 오류가 발생했습니다.');
    }
}

// 전담사회복지사 이름 가져오기
function getSocialWorkerName(socialWorkerId) {
    if (!socialWorkerId) return '';
    try {
        const allData = $('#SocialWorkerGrid').jqGrid('getRowData');
        const found = allData.find(row => {
            const no = parseInt(row.no);
            return no === socialWorkerId;
        });
        if (found && found.name) {
            return found.name;
        }
        const sampleWorker = sampleSocialWorkers.find(sw => sw.no === socialWorkerId || sw.id === socialWorkerId);
        if (sampleWorker && sampleWorker.name) {
            return sampleWorker.name;
        }
    } catch (e) {
        console.error('전담사회복지사 이름 가져오기 오류:', e);
    }
    return '';
}

// 전담사회복지사 select 옵션 생성
function getSocialWorkerSelectOptions() {
    try {
        let options = "";
        if ($('#SocialWorkerGrid').length > 0) {
            const allData = $('#SocialWorkerGrid').jqGrid('getRowData');
            allData.forEach(row => {
                const id = row.no || row.id;
                const name = row.name || '';
                if (id && name) {
                    options += id + ":" + name + ";";
                }
            });
        }
        sampleSocialWorkers.forEach(sw => {
            const id = sw.no || sw.id;
            const name = sw.name || '';
            if (id && name && !options.includes(id + ":")) {
                options += id + ":" + name + ";";
            }
        });
        return options || "1:김영희;2:나숙희;3:문미희;";
    } catch (e) {
        console.error('전담사회복지사 select 옵션 생성 오류:', e);
        return "1:김영희;2:나숙희;3:문미희;";
    }
}

// 전담사회복지사 검색 옵션 생성
function getSocialWorkerSearchOptions() {
    try {
        let options = ":전체;";
        if ($('#SocialWorkerGrid').length > 0) {
            const allData = $('#SocialWorkerGrid').jqGrid('getRowData');
            allData.forEach(row => {
                const id = row.no || row.id;
                const name = row.name || '';
                if (id && name) {
                    options += id + ":" + name + ";";
                }
            });
        }
        sampleSocialWorkers.forEach(sw => {
            const id = sw.no || sw.id;
            const name = sw.name || '';
            if (id && name && !options.includes(id + ":")) {
                options += id + ":" + name + ";";
            }
        });
        return options || ":전체;1:김영희;2:나숙희;3:문미희;";
    } catch (e) {
        console.error('전담사회복지사 검색 옵션 생성 오류:', e);
        return ":전체;1:김영희;2:나숙희;3:문미희;";
    }
}

// 메인 그리드 초기화 함수 (특수 로직 포함)
// commonGrid.js의 initMainGrid를 오버라이드하여 전담사회복지사 그리드도 함께 초기화
const originalInitMainGrid = window.initMainGrid;
window.initMainGrid = function() {
    try {
        // 전담사회복지사 그리드 초기화 (특수 로직)
        initSocialWorkerGrid();
        
        // 생활지원사 그리드 초기화 (commonGrid.js 사용)
        if (originalInitMainGrid && typeof originalInitMainGrid === 'function') {
            originalInitMainGrid();
        }
        
        // 생활지원사 그리드 커스터마이징 (전담사회복지사 select 동적 업데이트)
        setTimeout(() => {
            customizeLifeSupportWorkerGrid();
            // 창 크기 변경 시에도 그리드 너비 재조정
            $(window).on('resize', function() {
                setTimeout(() => {
                    const gridContainer = $('#MainGrid').closest('.grid-container');
                    if (gridContainer.length > 0) {
                        const containerWidth = gridContainer.width();
                        if (containerWidth > 0) {
                            $('#MainGrid').jqGrid('setGridWidth', containerWidth, false);
                        }
                    }
                }, 100);
            });
        }, 800);
        
    } catch (e) {
        console.error('그리드 초기화 중 오류 발생:', e);
        showError('그리드 초기화 중 오류가 발생했습니다: ' + e.message);
    }
};

// 생활지원사 그리드 커스터마이징 (전담사회복지사 select 동적 업데이트)
function customizeLifeSupportWorkerGrid() {
    try {
        // grid-container의 실제 너비에 맞춰 그리드 너비 설정
        const gridContainer = $('#MainGrid').closest('.grid-container');
        if (gridContainer.length > 0) {
            const containerWidth = gridContainer.width();
            if (containerWidth > 0) {
                // 그리드 너비를 컨테이너 너비에 맞춤
                $('#MainGrid').jqGrid('setGridWidth', containerWidth, false);
            }
        }
        
        // 스크롤 활성화 및 autowidth 비활성화 (컬럼 너비 유지)
        $('#MainGrid').jqGrid('setGridParam', { 
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            autowidth: false  // 고정 너비 사용
        });
        
        // 그리드 초기화 후 컬럼 너비 명시적으로 설정 (localStorage 저장값 무시)
        const config = window.getPageConfig();
        if (config && config.columns && config.columns.model) {
            config.columns.model.forEach((colModel) => {
                if (colModel.width) {
                    try {
                        // setColProp로 컬럼 너비 설정
                        $('#MainGrid').jqGrid('setColProp', colModel.name, { width: colModel.width });
                    } catch (e) {
                        console.warn(`컬럼 ${colModel.name} 너비 설정 실패:`, e);
                    }
                }
            });
        }
        
        // 그리드 너비 재조정 (컬럼 너비 합계에 맞춤)
        setTimeout(() => {
            const gridContainer = $('#MainGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    // 그리드 너비를 컨테이너 너비에 맞춤 (컬럼 너비는 유지)
                    $('#MainGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
            
            // 컬럼 너비 재적용 (localStorage 저장값 덮어쓰기)
            if (config && config.columns && config.columns.model) {
                config.columns.model.forEach((colModel) => {
                    if (colModel.width) {
                        try {
                            // DOM 직접 조작으로도 설정 (강제 적용)
                            const gridId = 'MainGrid';
                            const colName = colModel.name;
                            const headerCol = $(`#${gridId}`).find(`th[aria-describedby="${gridId}_${colName}"]`);
                            if (headerCol.length > 0) {
                                headerCol.css('width', colModel.width + 'px');
                            }
                            const dataCols = $(`#${gridId}`).find(`td[aria-describedby="${gridId}_${colName}"]`);
                            dataCols.css('width', colModel.width + 'px');
                        } catch (e) {
                            console.warn(`컬럼 ${colModel.name} DOM 너비 설정 실패:`, e);
                        }
                    }
                });
            }
        }, 200);
        
        // navGrid의 edit/add 옵션 커스터마이징을 위해
        // commonGrid.js에서 이미 navGrid를 설정했으므로, 
        // edit/add 다이얼로그가 열릴 때 select 옵션을 동적으로 업데이트
        $(document).on('click', '#MainPager .ui-pg-button[title*="Add"], #MainPager .ui-pg-button[title*="추가"]', function() {
            setTimeout(() => {
                const socialWorkerSelect = $('select[name="socialWorkerId"]');
                if (socialWorkerSelect.length > 0) {
                    const options = getSocialWorkerSelectOptions();
                    socialWorkerSelect.empty();
                    options.split(';').forEach(opt => {
                        if (opt.trim()) {
                            const [value, text] = opt.split(':');
                            if (value && text) {
                                socialWorkerSelect.append($('<option></option>').val(value).text(text));
                            }
                        }
                    });
                    if (selectedSocialWorkerId) {
                        socialWorkerSelect.val(selectedSocialWorkerId.toString());
                    }
                }
            }, 100);
        });
        
        $(document).on('click', '#MainPager .ui-pg-button[title*="Edit"], #MainPager .ui-pg-button[title*="수정"]', function() {
            setTimeout(() => {
                const socialWorkerSelect = $('select[name="socialWorkerId"]');
                if (socialWorkerSelect.length > 0) {
                    const options = getSocialWorkerSelectOptions();
                    socialWorkerSelect.empty();
                    options.split(';').forEach(opt => {
                        if (opt.trim()) {
                            const [value, text] = opt.split(':');
                            if (value && text) {
                                socialWorkerSelect.append($('<option></option>').val(value).text(text));
                            }
                        }
                    });
                }
            }, 100);
        });
        
        // 저장 후 전담사회복지사별 목록 새로고침
        const originalOnDataSaved = $('#MainGrid').jqGrid('getGridParam', 'onDataSaved');
        $('#MainGrid').jqGrid('setGridParam', {
            onDataSaved: function(oper, postdata) {
                // 원래 onDataSaved 호출
                if (originalOnDataSaved && typeof originalOnDataSaved === 'function') {
                    originalOnDataSaved(oper, postdata);
                }
                
                // 전담사회복지사별 목록 새로고침
                const savedSocialWorkerId = postdata.socialWorkerId || selectedSocialWorkerId;
                if (savedSocialWorkerId) {
                    selectedSocialWorkerId = parseInt(savedSocialWorkerId);
                    loadLifeSupportWorkerListBySocialWorker(selectedSocialWorkerId);
                    // 전담사회복지사 그리드에서도 선택 업데이트
                    const allData = $('#SocialWorkerGrid').jqGrid('getRowData');
                    const foundRow = allData.find(row => parseInt(row.no) === selectedSocialWorkerId);
                    if (foundRow) {
                        const rowId = $('#SocialWorkerGrid').find('tr').filter(function() {
                            const data = $('#SocialWorkerGrid').jqGrid('getRowData', $(this).attr('id'));
                            return data && parseInt(data.no) === selectedSocialWorkerId;
                        }).first().attr('id');
                        if (rowId) {
                            $('#SocialWorkerGrid').jqGrid('setSelection', rowId);
                        }
                    }
                }
            }
        });
        
    } catch (e) {
        console.error('생활지원사 그리드 커스터마이징 중 오류:', e);
    }
}

// commonGrid.js의 loadDataList를 오버라이드하여 전담사회복지사별 필터링
const originalLoadDataList = window.loadDataList;
if (typeof originalLoadDataList === 'function') {
    window.loadDataList = async function(page = 1, rows = 20) {
        // 전담사회복지사가 선택되어 있으면 Q020 사용
        if (selectedSocialWorkerId) {
            await loadLifeSupportWorkerListBySocialWorker(selectedSocialWorkerId);
        } else {
            // 선택되지 않았으면 일반 목록 조회 (하지만 빈 목록)
            $('#MainGrid').jqGrid('clearGridData');
        }
    };
}
