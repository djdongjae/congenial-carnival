// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

/**
 * 표피 효과 깊이
 * 델타 = sqrt(2 / (w * k * 이타))
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// 샘플 데이터 정의 (이미지 기반)
const sampleData = [
    {
        no: 1,
        name: '김대표',
        birthDate: '1937-01-21',
        gender: '여',
        age: 88,
        landline: '02-3444-2222',
        phone: '010-1234-5678',
        management: '일반',
        worker: '김영희',
        status: 'CS',
        statusTooltip: '',
        emergency: 'Y',
        address: '경기도 용인시 기흥구 기흥로58'
    },
    {
        no: 2,
        name: '박상무',
        birthDate: '1947-01-21',
        gender: '여',
        age: 78,
        landline: '02-3444-2222',
        phone: '010-1234-5678',
        management: '중점',
        worker: '김영희',
        status: '장기부재',
        statusTooltip: '장기부재 (2024-12-31)',
        emergency: 'N',
        address: '경기도 용인시 기흥구 기흥로58'
    },
    {
        no: 3,
        name: '임전무',
        birthDate: '1942-11-18',
        gender: '여',
        age: 82,
        landline: '02-3444-2222',
        phone: '010-1234-5678',
        management: '일반',
        worker: '김영희',
        status: '조기종료',
        statusTooltip: '조기종료 (2025-02-05)',
        emergency: 'N',
        address: '경기도 용인시 기흥구 기흥로58'
    },
    {
        no: 4,
        name: '이전담',
        birthDate: '1936-07-19',
        gender: '남',
        age: 89,
        landline: '02-3444-2222',
        phone: '010-1234-5678',
        management: '일반',
        worker: '김영희',
        status: '입원',
        statusTooltip: '팔골질로 병원 입원 - 유비에스 병원',
        emergency: 'N',
        address: '경기도 용인시 기흥구 기흥로58'
    },
    {
        no: 5,
        name: '최사복',
        birthDate: '1956-09-18',
        gender: '남',
        age: 68,
        landline: '',
        phone: '',
        management: '',
        worker: '',
        status: '사후관리',
        statusTooltip: '',
        emergency: '',
        address: ''
    },
    {
        no: 6,
        name: '서전담',
        birthDate: '1945-03-28',
        gender: '여',
        age: 80,
        landline: '',
        phone: '',
        management: '',
        worker: '',
        status: '',
        statusTooltip: '',
        emergency: '',
        address: ''
    },
    {
        no: 7,
        name: '김생활',
        birthDate: '1929-03-14',
        gender: '여',
        age: 96,
        landline: '',
        phone: '',
        management: '',
        worker: '',
        status: '',
        statusTooltip: '',
        emergency: '',
        address: ''
    },
    {
        no: 8,
        name: '이생활',
        birthDate: '1944-08-05',
        gender: '여',
        age: 80,
        landline: '',
        phone: '',
        management: '',
        worker: '',
        status: '',
        statusTooltip: '',
        emergency: '',
        address: ''
    },
    {
        no: 9,
        name: '박생활',
        birthDate: '1952-07-07',
        gender: '남',
        age: 73,
        landline: '',
        phone: '',
        management: '',
        worker: '',
        status: '',
        statusTooltip: '',
        emergency: '',
        address: ''
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
        return {
            results: [{
                selectResults: sampleData,
                totalResults: 245, // 전체 245명
                inUseResults: 200  // 이용 200명
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
            delete: 'Q050',   // 삭제 (공통 함수 자동 처리)
            hent: 'Q080',  // 추가 쿼리 예제
        },
        
      
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['No.', '대상자명', '생년월일', '성별', '나이', '일반전화', '휴대전화', '관리', '담당지원사', '이용상태', '응급', '주소'],
            model: [
                { name: 'no', index: 'no', sorttype: "int", key: true, width: 60 },
                { name: 'name', index: 'name', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100, sortable: true },
                { name: 'birthDate', index: 'birthDate', sorttype: "date", editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], dataInit: function(elem) { $(elem).datepicker({ dateFormat: 'yy-mm-dd', showMonthAfterYear: true, yearSuffix: '년' }); } }, width: 100, sortable: true },
                { name: 'gender', index: 'gender', editable: true, edittype: "select", editoptions: { value: "남:남;여:여" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;남:남;여:여" }, width: 60 },
                { name: 'age', index: 'age', sorttype: "int", width: 60, sortable: true },
                { name: 'landline', index: 'landline', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'phone', index: 'phone', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'management', index: 'management', editable: true, edittype: "select", editoptions: { value: "일반:일반;중점:중점" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;일반:일반;중점:중점" }, width: 80 },
                { name: 'worker', index: 'worker', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'status', index: 'status', editable: true, edittype: "select", editoptions: { value: "CS:CS;장기부재:장기부재;조기종료:조기종료;입원:입원;사후관리:사후관리" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;CS:CS;장기부재:장기부재;조기종료:조기종료;입원:입원;사후관리:사후관리" }, width: 100, formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.statusTooltip && rowObject.statusTooltip !== '') {
                        return '<span title="' + rowObject.statusTooltip + '">' + (cellvalue || '') + '</span>';
                    }
                    return cellvalue || '';
                }},
                { name: 'emergency', index: 'emergency', editable: true, edittype: "select", editoptions: { value: "Y:Y;N:N" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;Y:Y;N:N" }, width: 60 },
                { name: 'address', index: 'address', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 200 }
            ]
        },
        
          // 그리드 설정
          grid: {
            caption: "대상자 관리",
            sortname: 'no',
            sortorder: "asc"
        },
        // 메시지 텍스트
        messages: {
            add: '대상자 정보가 추가되었습니다.',
            edit: '대상자 정보가 수정되었습니다.',
            delete: '대상자 정보가 삭제되었습니다.',
            addError: '대상자 정보 추가 중 오류가 발생했습니다: ',
            editError: '대상자 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '대상자 정보 삭제 중 오류가 발생했습니다: '
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => {
            // 나이 계산 함수
            const calculateAge = (birthDate) => {
                if (!birthDate) return '';
                const birth = new Date(birthDate);
                const today = new Date();
                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
                return age.toString();
            };
            
            const birthDate = item.birthDate || '';
            const calculatedAge = birthDate ? calculateAge(birthDate) : (item.age || '');
            return {
                no: item.beneficiary_id || item.no || '',
                name: item.name || '',
                birthDate: birthDate,
                gender: item.gender || '',
                age: calculatedAge,
                landline: item.landline || '',
                phone: item.phone || '',
                management: item.management || '',
                worker: item.worker || '',
                status: item.status || '',
                statusTooltip: item.statusTooltip || '',
                emergency: item.emergency || '',
                address: item.address || ''
            };
        },
        

         // 목록 조회 파라미터 구성 함수
         buildListParams: (page, rows) => ({
            '1': rows.toString(),
            '2': ((page - 1) * rows).toString()
        }),

        // 데이터 변환 함수 (입력 데이터 -> API 파라미터)
        transformInputData: (postdata, oper) => { 
            
            // 작업별 파라미터 구성
            if (oper === 'add') {
                return {
                    '1': postdata.name || '',
                    '2': postdata.birthDate || '',
                    '3': postdata.gender || '',
                    '4': postdata.landline || '',
                    '5': postdata.phone || '',
                    '6': postdata.management || '',
                    '7': postdata.worker || '',
                    '8': postdata.status || '',
                    '9': postdata.emergency || '',
                    '10': postdata.address || ''
                };
            } else if (oper === 'edit') {
                return {
                    '1': postdata.id || postdata.no || '',
                    '2': postdata.name || '',
                    '3': postdata.birthDate || '',
                    '4': postdata.gender || '',
                    '5': postdata.landline || '',
                    '6': postdata.phone || '',
                    '7': postdata.management || '',
                    '8': postdata.worker || '',
                    '9': postdata.status || '',
                    '10': postdata.emergency || '',
                    '11': postdata.address || ''
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
            if (!data.name || String(data.name).trim() === '') missing.push('대상자명');
            if (!data.birthDate || String(data.birthDate).trim() === '') missing.push('생년월일');
            if (!data.gender || String(data.gender).trim() === '') missing.push('성별');
            if (!['남','여'].includes(String(data.gender))) {
                throw new Error('성별은 남 또는 여만 허용됩니다.');
            }
            if (missing.length > 0) {
                throw new Error('필수 항목 누락: ' + missing.join(', '));
            }
        }
        
       
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 그리드 커스터마이징 (life-support-worker.js 스타일)
// ==========================================

// commonGrid.js의 initMainGrid를 오버라이드하여 커스터마이징
const originalInitMainGrid = window.initMainGrid;
window.initMainGrid = function() {
    try {
        // 원래 initMainGrid 호출
        if (originalInitMainGrid && typeof originalInitMainGrid === 'function') {
            originalInitMainGrid();
        }
        
        // 그리드 커스터마이징 (열 간격 넓게, 스타일 통일)
        setTimeout(() => {
            customizeBeneficiaryGrid();
            
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

// 대상자 그리드 커스터마이징 (열 간격 넓게, 스타일 통일)
function customizeBeneficiaryGrid() {
    try {
        // grid-container의 실제 너비에 맞춰 그리드 너비 설정
        const gridContainer = $('#MainGrid').closest('.grid-container');
        if (gridContainer.length > 0) {
            const containerWidth = gridContainer.width();
            if (containerWidth > 0) {
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
            
            // 열 간격 넓게 설정
            $('#MainGrid').find('td, th').css({
                'padding': '12px 8px'
            });
            
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
        
        // 그리드 완료 후 열 간격 넓게 설정 (gridComplete 이벤트 활용)
        const originalGridComplete = $('#MainGrid').jqGrid('getGridParam', 'gridComplete');
        $('#MainGrid').jqGrid('setGridParam', {
            gridComplete: function() {
                // 원래 gridComplete 호출
                if (originalGridComplete && typeof originalGridComplete === 'function') {
                    originalGridComplete();
                }
                
                // 열 간격 넓게 설정
                $('#MainGrid').find('td, th').css({
                    'padding': '12px 8px'
                });
            }
        });
        
        // 데이터 로드 완료 후에도 열 간격 재적용
        const originalLoadComplete = $('#MainGrid').jqGrid('getGridParam', 'loadComplete');
        $('#MainGrid').jqGrid('setGridParam', {
            loadComplete: function(data) {
                // 원래 loadComplete 호출
                if (originalLoadComplete && typeof originalLoadComplete === 'function') {
                    originalLoadComplete(data);
                }
                
                // 열 간격 넓게 재적용
                setTimeout(() => {
                    $('#MainGrid').find('td, th').css({
                        'padding': '12px 8px'
                    });
                }, 100);
            }
        });
        
    } catch (e) {
        console.error('대상자 그리드 커스터마이징 중 오류:', e);
    }
}

// ==========================================
// 페이지별 추가 쿼리 호출 예제
// ==========================================
 

 async function callQuery(id) {
     try {
         const params = {
             '1': id.toString()
         };
         const result = await callPageQuery('sample','hent', params);  //sample.xml에서 
         if (result) {
             showMessage('처리되었습니다.');
         }
     } catch (e) {
         console.error('쿼리 호출 중 오류:', e);
     }
 }
