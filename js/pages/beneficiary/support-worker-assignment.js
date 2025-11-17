// 생활지원사 배정 페이지 - life-support-worker.js 형식으로 재구성

// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// Mock 데이터: 생활지원사 목록
const mockWorkers = [
    { id: 1, name: '김영희', assignedCount: 16 },
    { id: 2, name: '나숙희', assignedCount: 12 },
    { id: 3, name: '문미희', assignedCount: 8 },
    { id: 4, name: '박지혜', assignedCount: 15 },
    { id: 5, name: '이수진', assignedCount: 10 }
];

// Mock 데이터: 대상자 목록
const mockBeneficiaries = [
    { id: 1, name: '김대상', category: '일반', birthDate: '1936-01-01', gender: '여', age: 89, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로58', landline: '02-1234-5678', phone: '010-1234-5001', workerId: 1, checked: false },
    { id: 2, name: '나대상', category: '일반', birthDate: '1940-05-15', gender: '남', age: 84, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로100', landline: '02-1234-5679', phone: '010-1234-5002', workerId: 1, checked: false },
    { id: 3, name: '홍대상', category: '중점', birthDate: '1935-08-20', gender: '여', age: 90, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로58, 기흥IC', landline: '02-1234-5680', phone: '010-1234-5003', workerId: 2, checked: true },
    { id: 4, name: '이대상', category: '일반', birthDate: '1942-03-10', gender: '남', age: 83, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로200', landline: '02-1234-5681', phone: '010-1234-5004', workerId: 1, checked: false },
    { id: 5, name: '김소상', category: '중점', birthDate: '1938-11-25', gender: '여', age: 87, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로100', landline: '02-1234-5682', phone: '010-1234-5005', workerId: 2, checked: true },
    { id: 6, name: '박대상', category: '일반', birthDate: '1941-07-30', gender: '남', age: 84, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로300', landline: '02-1234-5683', phone: '010-1234-5006', workerId: 3, checked: false },
    { id: 7, name: '최대상', category: '일반', birthDate: '1939-02-14', gender: '여', age: 86, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로150', landline: '02-1234-5684', phone: '010-1234-5007', workerId: 1, checked: false },
    { id: 8, name: '황소상', category: '중점', birthDate: '1937-09-18', gender: '남', age: 88, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로400', landline: '02-1234-5685', phone: '010-1234-5008', workerId: 2, checked: false },
    { id: 9, name: '정대상', category: '일반', birthDate: '1943-12-05', gender: '여', age: 82, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로200', landline: '02-1234-5686', phone: '010-1234-5009', workerId: 3, checked: false },
    { id: 10, name: '강대상', category: '일반', birthDate: '1940-04-22', gender: '남', age: 85, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로500', landline: '02-1234-5687', phone: '010-1234-5010', workerId: 4, checked: false },
    { id: 11, name: '조대상', category: '일반', birthDate: '1938-06-11', gender: '여', age: 87, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로250', landline: '02-1234-5688', phone: '010-1234-5011', workerId: 1, checked: false },
    { id: 12, name: '윤대상', category: '일반', birthDate: '1941-10-28', gender: '남', age: 84, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로600', landline: '02-1234-5689', phone: '010-1234-5012', workerId: 4, checked: false },
    { id: 13, name: '임대상', category: '중점', birthDate: '1936-03-15', gender: '여', age: 89, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로300', landline: '02-1234-5690', phone: '010-1234-5013', workerId: 5, checked: false },
    { id: 14, name: '한대상', category: '일반', birthDate: '1939-08-07', gender: '남', age: 86, dong: '신갈동', address: '경기도 용인시 기흥구 신갈로700', landline: '02-1234-5691', phone: '010-1234-5014', workerId: 3, checked: false },
    { id: 15, name: '신대상', category: '일반', birthDate: '1942-01-19', gender: '여', age: 83, dong: '구갈동', address: '경기도 용인시 기흥구 기흥로350', landline: '02-1234-5692', phone: '010-1234-5015', workerId: 5, checked: false }
];

// 필터링된 대상자 목록 (검색용)
let filteredBeneficiaries = [...mockBeneficiaries];

// 현재 선택된 생활지원사 ID
let selectedWorkerId = null;

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
    return age.toString();
}

// 생활지원사 그리드 초기화 (life-support-worker.js 스타일)
function initWorkerGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['이름', '액션'],
            colModel: [
                { 
                    name: 'name', 
                    index: 'name', 
                    align: 'left', 
                    search: true, 
                    searchoptions: { sopt: ['cn'] },
                    width: 120
                },
                {
                    name: 'actions',
                    index: 'actions',
                    sortable: false,
                    width: 250,
                    formatter: function(cellvalue, options, rowObject) {
                        const assignedCount = rowObject.assignedCount || 0;
                        return '<div style="padding: 5px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">' +
                            '<button class="btn-assign btn btn-sm btn-primary" data-worker-id="' + rowObject.id + '" style="padding: 4px 8px; font-size: 12px;">배정</button>' +
                            '<button class="btn-map btn btn-sm btn-info" data-worker-id="' + rowObject.id + '" style="padding: 4px 8px; font-size: 12px;">지도</button>' +
                            '<span style="font-size: 12px; color: #666;">등록 ' + assignedCount + '명</span>' +
                            '<label style="margin-left: 5px; display: flex; align-items: center; gap: 3px; font-size: 12px; cursor: pointer;">' +
                            '<input type="checkbox" class="worker-map-checkbox" data-worker-id="' + rowObject.id + '"> 지도</label>' +
                            '</div>';
                    }
                }
            ],
            rowNum: 1000,
            rowList: [10, 20, 30, 50],
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
            onSelectRow: function(id) {
                const rowData = $('#WorkerGrid').jqGrid('getRowData', id);
                if (rowData && rowData.id) {
                    selectedWorkerId = parseInt(rowData.id);
                    filterBeneficiariesByWorker(selectedWorkerId);
                    $('#WorkerGrid tr').removeClass('selected-row');
                    $('#WorkerGrid tr#' + id).addClass('selected-row');
                }
            },
            loadComplete: function(data) {
                if (data && data.rows && data.rows.length > 0) {
                    const firstRowId = data.rows[0].id;
                    setTimeout(() => {
                        $('#WorkerGrid').jqGrid('setSelection', firstRowId);
                    }, 100);
                }
            },
            gridComplete: function() {
                // 열 간격 넓게 설정
                $('#WorkerGrid').find('td, th').css({
                    'padding': '12px 8px'
                });
                
                // 배정 버튼 이벤트
                $('.btn-assign').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const workerId = $(this).data('worker-id');
                    const worker = mockWorkers.find(w => w.id === workerId);
                    alert('주소 검색 팝업(05_03_002) 및 생활지원사 등록 팝업(05_03_003) 오픈\n생활지원사: ' + worker.name);
                });
                
                // 지도 버튼 이벤트
                $('.btn-map').off('click').on('click', function(e) {
                    e.stopPropagation();
                    const workerId = $(this).data('worker-id');
                    const worker = mockWorkers.find(w => w.id === workerId);
                    alert('지도 팝업 오픈\n생활지원사: ' + worker.name + '\n생활지원사 자택 주소 위치 표시');
                });
            }
        };

        $('#WorkerGrid').jqGrid(gridConfig);
        
        // grid-container의 실제 너비에 맞춰 그리드 너비 설정
        setTimeout(() => {
            const gridContainer = $('#WorkerGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#WorkerGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        loadWorkerList();
    } catch (e) {
        console.error('생활지원사 그리드 초기화 중 오류:', e);
        showError('생활지원사 그리드 초기화 중 오류가 발생했습니다.');
    }
}

// 생활지원사 목록 로드
function loadWorkerList() {
    try {
        const dataList = mockWorkers.map((item, index) => ({
            id: item.id || 'w_' + index,
            name: item.name || '',
            assignedCount: item.assignedCount || 0
        }));
        
        if (dataList.length > 0) {
            $('#WorkerGrid').jqGrid('clearGridData');
            $('#WorkerGrid').jqGrid('setGridParam', { data: dataList });
            $('#WorkerGrid').trigger('reloadGrid');
            setTimeout(() => {
                const firstRowId = dataList[0].id;
                if (firstRowId) {
                    $('#WorkerGrid').jqGrid('setSelection', firstRowId);
                }
            }, 200);
        } else {
            $('#WorkerGrid').jqGrid('clearGridData');
        }
    } catch (e) {
        console.error('생활지원사 목록 조회 중 오류:', e);
        showError('생활지원사 목록 조회 중 오류가 발생했습니다.');
    }
}

// 선택된 생활지원사에 따라 대상자 필터링
function filterBeneficiariesByWorker(workerId) {
    if (!workerId) {
        filteredBeneficiaries = [...mockBeneficiaries];
    } else {
        filteredBeneficiaries = mockBeneficiaries.filter(b => b.workerId === workerId);
    }
    refreshBeneficiaryGrid();
}

// 대상자 그리드 초기화 (life-support-worker.js 스타일)
function initBeneficiaryGrid() {
    try {
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: ['', '이름', '구분', '생년월일', '성별', '나이', '행정동', '주소', '일반전화', '휴대전화'],
            colModel: [
                {
                    name: 'checkbox',
                    index: 'checkbox',
                    width: 30,
                    sortable: false,
                    formatter: function(cellvalue, options, rowObject) {
                        return '<input type="checkbox" class="beneficiary-checkbox" data-beneficiary-id="' + rowObject.id + '" ' + (rowObject.checked ? 'checked' : '') + '>';
                    }
                },
                { name: 'name', index: 'name', width: 80, sortable: true, search: true, searchoptions: { sopt: ['cn'] } },
                { 
                    name: 'category', 
                    index: 'category',
                    width: 60,
                    formatter: function(cellvalue) {
                        return cellvalue || '';
                    }
                },
                { name: 'birthDate', index: 'birthDate', width: 100, sortable: true, sorttype: "date", search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } },
                { name: 'gender', index: 'gender', width: 50, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;남:남;여:여" } },
                { 
                    name: 'age', 
                    index: 'age',
                    width: 50, 
                    sortable: true,
                    sorttype: "int",
                    formatter: function(cellvalue, options, rowObject) {
                        if (rowObject.birthDate) {
                            return calculateAge(rowObject.birthDate);
                        }
                        return cellvalue || '';
                    }
                },
                { name: 'dong', index: 'dong', width: 80, search: true, searchoptions: { sopt: ['cn'] } },
                { name: 'address', index: 'address', width: 250, search: true, searchoptions: { sopt: ['cn'] } },
                { name: 'landline', index: 'landline', width: 120, search: true, searchoptions: { sopt: ['cn'] } },
                { name: 'phone', index: 'phone', width: 120, search: true, searchoptions: { sopt: ['cn'] } }
            ],
            rowNum: 20,
            rowList: [10, 20, 30, 50],
            pager: '#BeneficiaryPager',
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
                // 열 간격 넓게 설정
                $('#BeneficiaryGrid').find('td, th').css({
                    'padding': '12px 8px'
                });
                
                // 체크박스 이벤트
                $('.beneficiary-checkbox').off('change').on('change', function(e) {
                    e.stopPropagation();
                    const beneficiaryId = parseInt($(this).data('beneficiary-id'));
                    const beneficiary = filteredBeneficiaries.find(b => b.id === beneficiaryId);
                    if (beneficiary) {
                        beneficiary.checked = $(this).is(':checked');
                    }
                    
                    // 전체 선택 체크박스 업데이트
                    updateSelectAllCheckbox();
                });
                
                // 전체 선택 체크박스 동기화
                updateSelectAllCheckbox();
            }
        };

        $('#BeneficiaryGrid').jqGrid(gridConfig);
        
        $('#BeneficiaryGrid').jqGrid('navGrid', '#BeneficiaryPager', {
            edit: false,
            add: false,
            del: false,
            search: true,
            refresh: true,
            view: false,
            position: "left",
            cloneToTop: false
        });

        $('#BeneficiaryGrid').jqGrid('filterToolbar', {
            searchOnEnter: true,
            defaultSearch: "cn"
        });

        // grid-container의 실제 너비에 맞춰 그리드 너비 설정 및 열 간격 설정
        setTimeout(() => {
            // 열 간격 넓게 설정
            $('#BeneficiaryGrid').find('td, th').css({
                'padding': '12px 8px'
            });
            
            const gridContainer = $('#BeneficiaryGrid').closest('.grid-container');
            if (gridContainer.length > 0) {
                const containerWidth = gridContainer.width();
                if (containerWidth > 0) {
                    $('#BeneficiaryGrid').jqGrid('setGridWidth', containerWidth, false);
                }
            }
        }, 200);

        refreshBeneficiaryGrid();
    } catch (e) {
        console.error('대상자 그리드 초기화 중 오류:', e);
        showError('대상자 그리드 초기화 중 오류가 발생했습니다.');
    }
}

// 대상자 그리드 새로고침
function refreshBeneficiaryGrid() {
    try {
        const dataList = filteredBeneficiaries.map((item, index) => ({
            id: item.id || 'b_' + index,
            name: item.name || '',
            category: item.category || '',
            birthDate: item.birthDate || '',
            gender: item.gender || '',
            age: item.age || '',
            dong: item.dong || '',
            address: item.address || '',
            landline: item.landline || '',
            phone: item.phone || '',
            checked: item.checked || false
        }));
        
        if (dataList.length > 0) {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
            $('#BeneficiaryGrid').jqGrid('setGridParam', { data: dataList });
            $('#BeneficiaryGrid').trigger('reloadGrid');
            
            // 그리드 새로고침 후 열 간격 재적용
            setTimeout(() => {
                $('#BeneficiaryGrid').find('td, th').css({
                    'padding': '12px 8px'
                });
            }, 100);
        } else {
            $('#BeneficiaryGrid').jqGrid('clearGridData');
        }
        
        // 전체 대상자 수 업데이트
        $('#totalBeneficiaries').text('등록 ' + filteredBeneficiaries.length + '명');
    } catch (e) {
        console.error('대상자 그리드 새로고침 중 오류:', e);
    }
}

// 전체 선택 체크박스 업데이트
function updateSelectAllCheckbox() {
    const allChecked = filteredBeneficiaries.length > 0 && 
                       filteredBeneficiaries.every(b => b.checked);
    const someChecked = filteredBeneficiaries.some(b => b.checked);
    $('#selectAll').prop('checked', allChecked);
    $('#selectAll').prop('indeterminate', someChecked && !allChecked);
}

// 검색 기능
function performSearch() {
    const workerName = $('#searchWorker').val().trim().toLowerCase();
    const beneficiaryName = $('#searchBeneficiary').val().trim().toLowerCase();
    
    filteredBeneficiaries = mockBeneficiaries.filter(b => {
        const matchesWorker = !workerName || 
            (b.workerId && mockWorkers.find(w => w.id === b.workerId && w.name.toLowerCase().includes(workerName)));
        const matchesBeneficiary = !beneficiaryName || b.name.toLowerCase().includes(beneficiaryName);
        return matchesWorker && matchesBeneficiary;
    });
    
    refreshBeneficiaryGrid();
}

// 그리드 초기화 함수 (life-support-worker.js 스타일)
function initGrids() {
    try {
        // 생활지원사 그리드 초기화
        initWorkerGrid();
        
        // 대상자 그리드 초기화
        initBeneficiaryGrid();
        
        // 검색 버튼 이벤트
        $('#btnSearch').off('click').on('click', function() {
            performSearch();
        });
        
        // Enter 키로 검색
        $('#searchWorker, #searchBeneficiary').off('keypress').on('keypress', function(e) {
            if (e.which === 13) {
                performSearch();
            }
        });
        
        // 전체 선택 체크박스 이벤트
        $('#selectAll').off('change').on('change', function() {
            const isChecked = $(this).is(':checked');
            filteredBeneficiaries.forEach(b => {
                b.checked = isChecked;
            });
            
            refreshBeneficiaryGrid();
        });
        
        // 대상자 전체 지도 버튼
        $('#btnAllMap').off('click').on('click', function() {
            alert('대상자 전체 지도 팝업 오픈\n등록된 대상자가 전체 지도에 표시됨');
        });
        
        // 생활지원사 변경 버튼
        $('#btnChangeWorker').off('click').on('click', function() {
            const selectedBeneficiaries = filteredBeneficiaries.filter(b => b.checked);
            if (selectedBeneficiaries.length === 0) {
                alert('변경할 대상자를 선택해주세요.');
                return;
            }
            alert('생활지원사 변경 팝업(05_03_003) 오픈\n선택된 대상자: ' + selectedBeneficiaries.length + '명\n여러 명 동시 변경 가능');
        });
        
        // 창 크기 변경 시에도 그리드 너비 재조정
        $(window).on('resize', function() {
            setTimeout(() => {
                const workerGridContainer = $('#WorkerGrid').closest('.grid-container');
                if (workerGridContainer.length > 0) {
                    const containerWidth = workerGridContainer.width();
                    if (containerWidth > 0) {
                        $('#WorkerGrid').jqGrid('setGridWidth', containerWidth, false);
                    }
                }
                
                const beneficiaryGridContainer = $('#BeneficiaryGrid').closest('.grid-container');
                if (beneficiaryGridContainer.length > 0) {
                    const containerWidth = beneficiaryGridContainer.width();
                    if (containerWidth > 0) {
                        $('#BeneficiaryGrid').jqGrid('setGridWidth', containerWidth, false);
                    }
                }
            }, 100);
        });
        
    } catch (e) {
        console.error('그리드 초기화 중 오류 발생:', e);
        showError('그리드 초기화 중 오류가 발생했습니다: ' + e.message);
    }
}

// 전역 함수로 노출
window.initGrids = initGrids;
