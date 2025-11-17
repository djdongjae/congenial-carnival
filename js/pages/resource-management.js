// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleData = [
    {
        no: 1,
        resourceName: '실버에듀넷',
        domain: '기업',
        contact: '031-000-0000',
        managerName: '홍길동',
        address: '경기도 용인시 기흥구 기흥로58 기흥ict밸리',
        serviceName: '생활용품지원',
        serviceConnection: '4건',
        registrationDate: '2025-08-05'
    },
    {
        no: 2,
        resourceName: '파리바게트기흥점',
        domain: '기업',
        contact: '010-1234-5678',
        managerName: '홍길동',
        address: '경기도 용인시 기흥구 기흥로58 기흥ict텔리',
        serviceName: '식료품지원',
        serviceConnection: '1건',
        registrationDate: '2023-07-01'
    },
    {
        no: 3,
        resourceName: 'GS25기흥ICT밸리점',
        domain: '기업',
        contact: '010-1234-5678',
        managerName: '홍길동',
        address: '경기도 용인시 기흥구 기흥로58 기흥ict벨리',
        serviceName: '',
        serviceConnection: '등록',
        registrationDate: '2023-07-01'
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
                totalResults: sampleData.length
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
            names: ['No', '자원명', '영역', '연락체', '담당자명', '주소', '서비스명', '서비스연결', '등록일자'],
            model: [
                { name: 'no', index: 'no', sorttype: "int", key: true, width: 60 },
                { name: 'resourceName', index: 'resourceName', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 150 },
                { name: 'domain', index: 'domain', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'contact', index: 'contact', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'managerName', index: 'managerName', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'address', index: 'address', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 250 },
                { name: 'serviceName', index: 'serviceName', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 150 },
                { 
                    name: 'serviceConnection', 
                    index: 'serviceConnection', 
                    editable: false, 
                    search: true, 
                    searchoptions: { sopt: ['cn'] }, 
                    width: 100,
                    formatter: function(cellvalue, options, rowObject) {
                        const resourceId = rowObject.no || '';
                        const count = cellvalue && cellvalue !== '등록' ? cellvalue : '0건';
                        return `<a href="javascript:void(0)" class="service-connection-link" data-resource-id="${resourceId}" style="color: #007bff; text-decoration: underline; cursor: pointer;">${count}</a>`;
                    }
                },
                { 
                    name: 'registrationDate', 
                    index: 'registrationDate', 
                    editable: true, 
                    editrules: { required: true }, 
                    edittype: 'text',
                    editoptions: {
                        dataInit: function(elem) {
                            $(elem).datepicker({
                                dateFormat: 'yy-mm-dd',
                                changeMonth: true,
                                changeYear: true,
                                showButtonPanel: true
                            });
                        }
                    },
                    search: true, 
                    searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] }, 
                    width: 120 
                }
            ]
        },
        
          // 그리드 설정
          grid: {
            caption: "자원 목록",
            sortname: 'no',
            sortorder: "asc"
        },
        // 메시지 텍스트
        messages: {
            add: '자원 정보가 추가되었습니다.',
            edit: '자원 정보가 수정되었습니다.',
            delete: '자원 정보가 삭제되었습니다.',
            addError: '자원 정보 추가 중 오류가 발생했습니다: ',
            editError: '자원 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '자원 정보 삭제 중 오류가 발생했습니다: '
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => ({
            no: item.resource_id || item.no || '',
            resourceName: item.resourceName || '',
            domain: item.domain || '',
            contact: item.contact || '',
            managerName: item.managerName || '',
            address: item.address || '',
            serviceName: item.serviceName || '',
            serviceConnection: item.serviceConnection || '',
            registrationDate: item.registrationDate || ''
        }),
        

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
                    '1': postdata.resourceName || '',
                    '2': postdata.domain || '',
                    '3': postdata.contact || '',
                    '4': postdata.managerName || '',
                    '5': postdata.address || '',
                    '6': postdata.serviceName || '',
                    '7': postdata.registrationDate || ''
                };
            } else if (oper === 'edit') {
                return {
                    '1': postdata.resourceName || '',
                    '2': postdata.domain || '',
                    '3': postdata.contact || '',
                    '4': postdata.managerName || '',
                    '5': postdata.address || '',
                    '6': postdata.serviceName || '',
                    '7': postdata.registrationDate || '',
                    '8': postdata.no || '' // Key for update
                };
            } else if (oper === 'del') {
                return {
                    '1': postdata.no || '' // Key for delete
                };
            }
            return {};
        },
        
        // 벨리데이션 함수
        validate: (operType, data) => {
            const missing = [];
            if (!data.resourceName || String(data.resourceName).trim() === '') missing.push('자원명');
            if (!data.domain || String(data.domain).trim() === '') missing.push('영역');
            if (!data.contact || String(data.contact).trim() === '') missing.push('연락체');
            if (!data.managerName || String(data.managerName).trim() === '') missing.push('담당자명');
            if (!data.address || String(data.address).trim() === '') missing.push('주소');
            if (!data.registrationDate || String(data.registrationDate).trim() === '') missing.push('등록일자');
            if (missing.length > 0) {
                throw new Error('필수 항목 누락: ' + missing.join(', '));
            }
        }
        
       
    };
}

// getPageConfig를 전역 변수로 노출 (commonGrid.js의 공통 함수들이 사용)
window.getPageConfig = getPageConfig;

// ==========================================
// 서비스 연결 팝업 기능
// ==========================================

// 자원관리 및 서비스 내역 팝업 열기
function openResourceDetailModal(resourceId) {
    try {
        // 모달 표시
        $('#resourceDetailModal').show();
        
        // 현재 자원 ID 저장
        $('#resourceDetailModal').data('resourceId', resourceId);
        
        // 자원 정보 로드
        loadResourceDetail(resourceId);
        
        // 연결된 서비스 목록 로드
        loadConnectedServices(resourceId);
        
    } catch (e) {
        console.error('자원관리 팝업 열기 중 오류:', e);
        showError('자원관리 팝업을 열 수 없습니다.');
    }
}

// 자원관리 및 서비스 내역 팝업 닫기
function closeResourceDetailModal() {
    $('#resourceDetailModal').hide();
}

// 자원 정보 로드
async function loadResourceDetail(resourceId) {
    try {
        // 실제로는 API를 호출해야 하지만, 여기서는 그리드에서 데이터 가져오기
        const rowData = $('#MainGrid').jqGrid('getRowData', resourceId);
        
        if (rowData) {
            $('#clientName').val(rowData.resourceName || '');
            $('#representativeName').val(rowData.managerName || '');
            $('#contactPerson').val(rowData.managerName || '');
            $('#contactNumber').val(rowData.contact || '');
            $('#domain').val(rowData.domain || '');
            $('#address').val(rowData.address || '');
        }
        
    } catch (e) {
        console.error('자원 정보 로드 중 오류:', e);
    }
}

// 연결된 서비스 목록 로드
async function loadConnectedServices(resourceId) {
    try {
        // 실제로는 API를 호출해야 하지만, 여기서는 샘플 데이터 사용
        const connectedServices = [
            { no: 1, serviceName: '생활용품지원', startDate: '2025-01-01', endDate: '' }
        ];
        
        const tbody = $('#connectedServiceList');
        tbody.empty();
        
        if (connectedServices.length === 0) {
            tbody.append('<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">연결된 서비스가 없습니다.</td></tr>');
        } else {
            connectedServices.forEach((service, index) => {
                const row = `
                    <tr>
                        <td style="padding: 10px; text-align: center; border: 1px solid #dee2e6;">${service.no}</td>
                        <td style="padding: 10px; text-align: center; border: 1px solid #dee2e6;">${service.serviceName}</td>
                        <td style="padding: 10px; text-align: center; border: 1px solid #dee2e6;">${service.startDate}</td>
                        <td style="padding: 10px; text-align: center; border: 1px solid #dee2e6;">${service.endDate || '-'}</td>
                        <td style="padding: 10px; text-align: center; border: 1px solid #dee2e6;">
                            <button class="edit-service-btn" data-service-id="${service.no}" style="padding: 4px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">수정</button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        }
        
    } catch (e) {
        console.error('연결된 서비스 목록 로드 중 오류:', e);
    }
}

// 서비스 연결 팝업 열기 (자원관리 팝업에서 호출)
function openServiceConnectionModal() {
    try {
        const resourceId = $('#resourceDetailModal').data('resourceId');
        
        if (!resourceId) {
            showMessage('자원 정보를 불러올 수 없습니다.');
            return;
        }
        
        // 모달 표시
        $('#serviceConnectionModal').show();
        
        // 현재 자원 ID 저장
        $('#serviceConnectionModal').data('resourceId', resourceId);
        
        // 검색 입력창 초기화
        $('#serviceSearchInput').val('');
        $('#selectedServiceName').hide().text('');
        
        // 날짜 초기화
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + 
                        String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                        String(today.getDate()).padStart(2, '0');
        $('#serviceStartDate').val(todayStr);
        $('#serviceEndDate').val('');
        $('#noEndDateCheck').prop('checked', false);
        
        // 서비스 검색 그리드 초기화 (있는 경우 제거 후 재생성)
        if ($('#ServiceConnectionGrid').length > 0) {
            $('#ServiceConnectionGrid').jqGrid('GridUnload');
        }
        
        // 서비스 검색 그리드 초기화
        initServiceConnectionGrid();
        
    } catch (e) {
        console.error('서비스 연결 팝업 열기 중 오류:', e);
        showError('서비스 연결 팝업을 열 수 없습니다.');
    }
}

// 서비스 연결 팝업 닫기
function closeServiceConnectionModal() {
    $('#serviceConnectionModal').hide();
    if ($('#ServiceConnectionGrid').length > 0) {
        $('#ServiceConnectionGrid').jqGrid('GridUnload');
    }
}

// 서비스 검색 그리드 초기화
function initServiceConnectionGrid() {
    try {
        $('#ServiceConnectionGrid').jqGrid({
            datatype: 'local',
            data: [],
            colNames: ['대분류', '중분류', '소분류', '세부분류', '소요시간(분)', '주기', '일반', '선택'],
            colModel: [
                { name: 'category', index: 'category', width: 120 },
                { name: 'majorCategory', index: 'majorCategory', width: 100 },
                { name: 'middleCategory', index: 'middleCategory', width: 120 },
                { name: 'minorCategory', index: 'minorCategory', width: 150 },
                { name: 'requiredTime', index: 'requiredTime', width: 100 },
                { name: 'provisionCycle', index: 'provisionCycle', width: 100 },
                { name: 'targetGroup', index: 'targetGroup', width: 80 },
                { 
                    name: 'select', 
                    index: 'select', 
                    width: 80,
                    align: 'center',
                    formatter: function(cellvalue, options, rowObject) {
                        return '<button class="select-service-btn" data-service-id="' + (rowObject.no || '') + '" style="padding: 4px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">선택</button>';
                    }
                }
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#ServiceConnectionPager',
            sortname: 'category',
            sortorder: 'asc',
            viewrecords: true,
            caption: '',
            height: 400,
            width: '100%',
            multiselect: false
        });
        
        // 검색 버튼 클릭 이벤트
        $('#serviceSearchBtn').off('click').on('click', function() {
            searchServices();
        });
        
        // 검색 입력창 엔터키 이벤트
        $('#serviceSearchInput').off('keypress').on('keypress', function(e) {
            if (e.which === 13) {
                searchServices();
            }
        });
        
        // 선택 버튼 클릭 이벤트 (동적 생성되므로 이벤트 위임 사용)
        $(document).off('click', '.select-service-btn').on('click', '.select-service-btn', function() {
            const serviceId = $(this).data('service-id');
            selectService(serviceId);
        });
        
        // 적용 버튼 클릭 이벤트
        $('#applyServiceBtn').off('click').on('click', function() {
            applyService();
        });
        
        // 종료일 없음 체크박스 이벤트
        $('#noEndDateCheck').off('change').on('change', function() {
            if ($(this).prop('checked')) {
                $('#serviceEndDate').val('').prop('disabled', true);
            } else {
                $('#serviceEndDate').prop('disabled', false);
            }
        });
        
        // 날짜 선택기 초기화
        $('#serviceStartDate, #serviceEndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true
        });
        
    } catch (e) {
        console.error('서비스 검색 그리드 초기화 중 오류:', e);
    }
}

// 서비스 검색
async function searchServices() {
    try {
        const searchKeyword = $('#serviceSearchInput').val().trim();
        
        if (!searchKeyword) {
            showMessage('서비스명을 입력해주세요.');
            return;
        }
        
        // 서비스 목록 조회 (service-management.js의 샘플 데이터 사용)
        // 실제로는 API를 호출해야 하지만, 여기서는 샘플 데이터 사용
        const serviceData = await getServiceList(searchKeyword);
        
        if (serviceData && serviceData.length > 0) {
            $('#ServiceConnectionGrid').jqGrid('clearGridData');
            $('#ServiceConnectionGrid').jqGrid('setGridParam', { data: serviceData });
            $('#ServiceConnectionGrid').trigger('reloadGrid');
            
            $('#serviceSearchCount').text(`'${searchKeyword}'으로 검색한 서비스 결과 ${serviceData.length}건`);
        } else {
            $('#ServiceConnectionGrid').jqGrid('clearGridData');
            $('#serviceSearchCount').text(`'${searchKeyword}'으로 검색한 서비스 결과 0건`);
            showMessage('검색 결과가 없습니다.');
        }
        
    } catch (e) {
        console.error('서비스 검색 중 오류:', e);
        showError('서비스 검색 중 오류가 발생했습니다.');
    }
}

// 서비스 목록 가져오기 (개발 모드)
async function getServiceList(keyword) {
    // 실제로는 API를 호출해야 하지만, 여기서는 service-management.js의 샘플 데이터 사용
    // 간단한 검색 로직으로 필터링
    const sampleServices = [
        { no: 1, category: '안전지원', majorCategory: '방문', middleCategory: '안전확인', minorCategory: '안전·안부확인', detailedContent: '', requiredTime: 10, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 2, category: '안전지원', majorCategory: '방문', middleCategory: '안전확인', minorCategory: '정보제공', detailedContent: '', requiredTime: 5, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 3, category: '안전지원', majorCategory: '방문', middleCategory: '안전확인', minorCategory: '생활안전점검', detailedContent: '', requiredTime: 15, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 4, category: '안전지원', majorCategory: '방문', middleCategory: '안전확인', minorCategory: '말벗', detailedContent: '', requiredTime: 30, provisionCycle: '주3회', targetGroup: '전체' },
        { no: 5, category: '사회참여', majorCategory: '방문', middleCategory: '사회관계 향상', minorCategory: '', detailedContent: '여가활동', requiredTime: 60, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 6, category: '생활교육', majorCategory: '방문', middleCategory: '자조모임', minorCategory: '', detailedContent: '', requiredTime: 120, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 7, category: '일상생활 지원', majorCategory: '방문', middleCategory: '이동활동지원', minorCategory: '', detailedContent: '', requiredTime: 60, provisionCycle: '주1회', targetGroup: '전체' },
        { no: 8, category: '일상생활 지원', majorCategory: '방문', middleCategory: '가사지원', minorCategory: '', detailedContent: '', requiredTime: 120, provisionCycle: '주2회', targetGroup: '전체' }
    ];
    
    // 키워드로 필터링
    const filtered = sampleServices.filter(service => {
        const searchText = keyword.toLowerCase();
        return (service.category && service.category.toLowerCase().includes(searchText)) ||
               (service.majorCategory && service.majorCategory.toLowerCase().includes(searchText)) ||
               (service.middleCategory && service.middleCategory.toLowerCase().includes(searchText)) ||
               (service.minorCategory && service.minorCategory.toLowerCase().includes(searchText)) ||
               (service.detailedContent && service.detailedContent.toLowerCase().includes(searchText));
    });
    
    return filtered;
}

// 서비스 선택
function selectService(serviceId) {
    try {
        const rowData = $('#ServiceConnectionGrid').jqGrid('getRowData', serviceId);
        if (!rowData || !rowData.category) {
            showMessage('서비스를 선택할 수 없습니다.');
            return;
        }
        
        // 선택한 서비스명 표시 (세부분류 또는 소분류 사용)
        const serviceName = rowData.minorCategory || rowData.middleCategory || rowData.category;
        $('#selectedServiceName').text(serviceName).show();
        
        // 선택한 서비스 ID 저장
        $('#serviceConnectionModal').data('selectedServiceId', serviceId);
        $('#serviceConnectionModal').data('selectedServiceData', rowData);
        
    } catch (e) {
        console.error('서비스 선택 중 오류:', e);
        showError('서비스를 선택할 수 없습니다.');
    }
}

// 서비스 적용
async function applyService() {
    try {
        const resourceId = $('#serviceConnectionModal').data('resourceId');
        const selectedServiceId = $('#serviceConnectionModal').data('selectedServiceId');
        const selectedServiceData = $('#serviceConnectionModal').data('selectedServiceData');
        
        if (!selectedServiceId || !selectedServiceData) {
            showMessage('서비스를 선택해 주세요.');
            return;
        }
        
        const startDate = $('#serviceStartDate').val();
        if (!startDate) {
            showMessage('시작일을 선택해주세요.');
            return;
        }
        
        const endDate = $('#noEndDateCheck').prop('checked') ? '' : $('#serviceEndDate').val();
        
        // 실제로는 API를 호출하여 서비스 연결 저장
        // 여기서는 개발 모드이므로 메시지만 표시
        console.log('서비스 연결:', {
            resourceId: resourceId,
            serviceId: selectedServiceId,
            serviceData: selectedServiceData,
            startDate: startDate,
            endDate: endDate
        });
        
        showMessage('서비스가 연결되었습니다.');
        
        // 팝업 닫기
        closeServiceConnectionModal();
        
        // 연결된 서비스 목록 새로고침
        const detailResourceId = $('#resourceDetailModal').data('resourceId');
        if (detailResourceId) {
            loadConnectedServices(detailResourceId);
        }
        
    } catch (e) {
        console.error('서비스 적용 중 오류:', e);
        showError('서비스 적용 중 오류가 발생했습니다.');
    }
}

// 그리드 초기화 후 이벤트 리스너 등록
const originalInitMainGrid = window.initMainGrid;
window.initMainGrid = function() {
    if (originalInitMainGrid && typeof originalInitMainGrid === 'function') {
        originalInitMainGrid();
    }
    
    // 서비스 연결 링크 클릭 이벤트 (자원관리 팝업 열기)
    setTimeout(() => {
        $(document).off('click', '.service-connection-link').on('click', '.service-connection-link', function() {
            const resourceId = $(this).data('resource-id');
            openResourceDetailModal(resourceId);
        });
        
        // 자원관리 팝업 닫기 버튼
        $('#closeResourceDetailModal').off('click').on('click', function() {
            closeResourceDetailModal();
        });
        
        // 자원관리 팝업 배경 클릭 시 닫기
        $('#resourceDetailModal').off('click').on('click', function(e) {
            if ($(e.target).attr('id') === 'resourceDetailModal') {
                closeResourceDetailModal();
            }
        });
        
        // 자원관리 팝업에서 서비스연결 버튼 클릭 이벤트
        $('#openServiceConnectionBtn').off('click').on('click', function() {
            openServiceConnectionModal();
        });
        
        // 서비스 연결 팝업 닫기 버튼
        $('#closeServiceConnectionModal').off('click').on('click', function() {
            closeServiceConnectionModal();
        });
        
        // 서비스 연결 팝업 배경 클릭 시 닫기
        $('#serviceConnectionModal').off('click').on('click', function(e) {
            if ($(e.target).attr('id') === 'serviceConnectionModal') {
                closeServiceConnectionModal();
            }
        });
        
        // 자원관리 팝업 저장 버튼
        $('#saveResourceBtn').off('click').on('click', function() {
            saveResourceDetail();
        });
    }, 500);
};

// 자원 정보 저장
async function saveResourceDetail() {
    try {
        const resourceId = $('#resourceDetailModal').data('resourceId');
        
        // 필수 항목 검증
        const clientName = $('#clientName').val().trim();
        const representativeName = $('#representativeName').val().trim();
        const contactPerson = $('#contactPerson').val().trim();
        const contactNumber = $('#contactNumber').val().trim();
        const domain = $('#domain').val();
        const address = $('#address').val().trim();
        
        if (!clientName || !representativeName || !contactPerson || !contactNumber || !domain || !address) {
            showMessage('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        // 실제로는 API를 호출하여 저장
        console.log('자원 정보 저장:', {
            resourceId: resourceId,
            clientName: clientName,
            representativeName: representativeName,
            contactPerson: contactPerson,
            contactNumber: contactNumber,
            domain: domain,
            address: address
        });
        
        showMessage('자원 정보가 저장되었습니다.');
        
        // 팝업 닫기
        closeResourceDetailModal();
        
        // 그리드 새로고침
        if (typeof loadDataList === 'function') {
            loadDataList(1, 20);
        }
        
    } catch (e) {
        console.error('자원 정보 저장 중 오류:', e);
        showError('자원 정보 저장 중 오류가 발생했습니다.');
    }
}

