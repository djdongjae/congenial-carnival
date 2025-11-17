// Grid 페이지 전용 JavaScript 모듈
// grid.html에서 사용하는 초기화 및 데이터 관리
// commonGrid.js의 공통 기능을 활용

// 샘플 데이터
var gridData = [
    { id: 1, name: "김철수", department: "개발팀", position: "팀장", salary: 6000, email: "kim@company.com", phone: "010-1234-5678", hireDate: "2020-01-15", status: "활성" },
    { id: 2, name: "이영희", department: "개발팀", position: "주임", salary: 4500, email: "lee@company.com", phone: "010-2345-6789", hireDate: "2021-03-20", status: "활성" },
    { id: 3, name: "박민수", department: "기획팀", position: "팀장", salary: 5500, email: "park@company.com", phone: "010-3456-7890", hireDate: "2019-07-10", status: "활성" },
    { id: 4, name: "정수진", department: "기획팀", position: "대리", salary: 4000, email: "jung@company.com", phone: "010-4567-8901", hireDate: "2022-02-14", status: "활성" },
    { id: 5, name: "최동현", department: "디자인팀", position: "팀장", salary: 5200, email: "choi@company.com", phone: "010-5678-9012", hireDate: "2018-11-05", status: "활성" },
    { id: 6, name: "한미영", department: "디자인팀", position: "주임", salary: 3800, email: "han@company.com", phone: "010-6789-0123", hireDate: "2021-09-08", status: "활성" },
    { id: 7, name: "윤태호", department: "마케팅팀", position: "팀장", salary: 4800, email: "yoon@company.com", phone: "010-7890-1234", hireDate: "2020-05-22", status: "활성" },
    { id: 8, name: "강지은", department: "마케팅팀", position: "대리", salary: 4200, email: "kang@company.com", phone: "010-8901-2345", hireDate: "2022-01-10", status: "활성" },
    { id: 9, name: "임성우", department: "개발팀", position: "대리", salary: 4300, email: "lim@company.com", phone: "010-9012-3456", hireDate: "2021-12-03", status: "비활성" },
    { id: 10, name: "송하나", department: "기획팀", position: "주임", salary: 3900, email: "song@company.com", phone: "010-0123-4567", hireDate: "2022-06-15", status: "비활성" },
    { id: 11, name: "김철수2", department: "개발팀", position: "팀장", salary: 6000, email: "kim@company.com", phone: "010-1234-5678", hireDate: "2020-01-15", status: "활성" },
    { id: 12, name: "이영희2", department: "개발팀", position: "주임", salary: 4500, email: "lee@company.com", phone: "010-2345-6789", hireDate: "2021-03-20", status: "활성" },
    { id: 13, name: "박민수2", department: "기획팀", position: "팀장", salary: 5500, email: "park@company.com", phone: "010-3456-7890", hireDate: "2019-07-10", status: "활성" },
    { id: 14, name: "정수진2", department: "기획팀", position: "대리", salary: 4000, email: "jung@company.com", phone: "010-4567-8901", hireDate: "2022-02-14", status: "활성" },
    { id: 15, name: "최동현2", department: "디자인팀", position: "팀장", salary: 5200, email: "choi@company.com", phone: "010-5678-9012", hireDate: "2018-11-05", status: "활성" },
    { id: 16, name: "한미영2", department: "디자인팀", position: "주임", salary: 3800, email: "han@company.com", phone: "010-6789-0123", hireDate: "2021-09-08", status: "활성" },
    { id: 17, name: "윤태호2", department: "마케팅팀", position: "팀장", salary: 4800, email: "yoon@company.com", phone: "010-7890-1234", hireDate: "2020-05-22", status: "활성" },
    { id: 18, name: "강지은2", department: "마케팅팀", position: "대리", salary: 4200, email: "kang@company.com", phone: "010-8901-2345", hireDate: "2022-01-10", status: "활성" },
    { id: 19, name: "임성우2", department: "개발팀", position: "대리", salary: 4300, email: "lim@company.com", phone: "010-9012-3456", hireDate: "2021-12-03", status: "비활성" },
    { id: 20, name: "송하나2", department: "기획팀", position: "주임", salary: 3900, email: "song@company.com", phone: "010-0123-4567", hireDate: "2022-06-15", status: "비활성" }
];



// 그리드 초기화
function initMainGrid() {
    try {
        console.log('그리드 초기화 시작...');

        // 그리드 컨테이너 생성 (표준화된 함수 사용)
        if (!CommonGrid.ensureGridContainer('#MainGrid', '#MainPager')) {
            return;
        }

        // 저장된 그리드 설정 로드 (표준화된 함수 사용)
        const gridSettings = CommonGrid.loadGridSettings();
        const savedWidths = gridSettings.widths;
        const savedOrder = gridSettings.order;
        const savedVisibility = gridSettings.visibility;



        // 기본 컬럼 정의
        const defaultColNames = ['ID', '이름', '부서', '직급', '급여(만원)', '이메일', '전화번호', '입사일', '상태'];
        const defaultColModel = [
            { name: 'id', index: 'id', sorttype: "int", key: true, width: 60 },
            { name: 'name', index: 'name', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
            { name: 'department', index: 'department', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
            { name: 'position', index: 'position', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 80 },
            { name: 'salary', index: 'salary', sorttype: "int", formatter: 'currency', formatoptions: { prefix: '₩', thousandsSeparator: ',', suffix: '만원', decimalPlaces: 0 }, search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] }, width: 120 },
            { name: 'email', index: 'email', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 180 },
            { name: 'phone', index: 'phone', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
            { name: 'hireDate', index: 'hireDate', sorttype: "date", search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], dataInit: function (elem) { $(elem).datepicker({ dateFormat: 'yy-mm-dd', showMonthAfterYear: true, yearSuffix: '년' }); } }, width: 100 },
            { name: 'status', index: 'status', editable: true, edittype: "select", editoptions: { value: "활성:활성;비활성:비활성" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;활성:활성;비활성:비활성" }, width: 80 }
        ];

        // 컬럼 모델 처리 (표준화된 함수 사용)
        const processedColumns = CommonGrid.processColumnModel(
            defaultColNames,
            defaultColModel,
            savedWidths,
            savedOrder,
            savedVisibility
        );
        const colNames = processedColumns.colNames;
        const colModel = processedColumns.colModel;

        // 그리드 설정
        const gridConfig = {
            data: gridData,
            datatype: "local",
            colNames: colNames,
            colModel: colModel,
            rowNum: 15,
            rowList: [5, 10, 20, 50],
            pager: '#MainPager',
            sortname: 'id',
            sortorder: "asc",
            viewrecords: true,
            caption: "직원 정보 관리",
            height: 500,
            width: CommonGrid.getGridWidth(),
            // editurl 추가 (navGrid의 edit, add, del 기능을 위해 필요)
            editurl: 'clientArray',
            // 셀 편집 이벤트도 추가
            cellEdit: false, // 기본적으로 셀 편집 비활성화
            afterEditCell: function (rowid, cellname, value, iRow, iCol) {
                console.log('셀 편집 시작:', { rowid, cellname, value });
            },
            afterSaveCell: function (rowid, cellname, value, iRow, iCol) {
                console.log('셀 저장 완료:', { rowid, cellname, value });
                // 데이터 업데이트
                const employeeIndex = gridData.findIndex(emp => emp.id.toString() === rowid.toString());
                if (employeeIndex !== -1) {
                    gridData[employeeIndex][cellname] = value;
                    setTimeout(() => updateStats(), 100);
                    showMessage(`셀이 수정되었습니다: ${cellname} = ${value}`);
                }
            },
            multiselect: true,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
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
            },
            onSelectRow: function (id) {
                updateStats();
            },
            onSelectAll: function (aRowids, status) {
                updateStats();
            },
            afterInsertRow: function (rowid, rowdata, rowelem) {
                updateStats();
            },
            afterDeleteRow: function (rowid, status) {
                updateStats();
            },
            loadComplete: function (data) {
                // 그리드 데이터 로드 완료 후 통계 업데이트
                setTimeout(() => {
                    updateStats();
                }, 50);
            }
        };

        // 공통 그리드 초기화 사용
        const success = initCommonGrid('#MainGrid', '#MainPager', gridConfig);

        if (success) {
            console.log('그리드 초기화 완료');



            // 그리드 DOM 상태 확인
            setTimeout(() => {
                const gridElement = $("#MainGrid");
                const pagerElement = $("#MainPager");
                //   window.commonGridInstance.autoResize();
            }, 500);
        } else {
            console.error('그리드 초기화 실패');
        }

    } catch (e) {
        console.error('그리드 초기화 중 오류 발생:', e);
        showError('그리드 초기화 중 오류가 발생했습니다: ' + e.message);
    }
}

// 통계 업데이트
function updateStats() {
    try {
        // 그리드가 존재하는지 확인

        const gridElement = $("#MainGrid");
        if (!gridElement.length) {
            // 그리드 요소가 없으면 조용히 리턴 (경고 메시지 제거)
            return;
        }

        // jqGrid가 초기화되었는지 확인
        if (!gridElement.jqGrid || typeof gridElement.jqGrid !== 'function') {
            // jqGrid가 아직 초기화되지 않았으면 조용히 리턴 (경고 메시지 제거)
            return;
        }

        // 그리드가 완전히 로드되었는지 확인
        try {
            var totalRows = gridElement.jqGrid('getGridParam', 'reccount');
            var gridData = gridElement.jqGrid('getGridParam', 'data');

            // 데이터가 유효한지 확인
            if (totalRows === undefined || totalRows === null || !Array.isArray(gridData)) {
                // 데이터가 아직 준비되지 않았으면 조용히 리턴
                return;
            }

            var activeRows = gridData.filter(function (row) {
                return row && row.status === "활성";
            }).length;

            var totalSalary = gridData.reduce(function (sum, row) {
                return sum + (parseInt(row.salary) || 0);
            }, 0);
            var avgSalary = totalRows > 0 ? Math.round(totalSalary / totalRows) : 0;

            var departments = [...new Set(gridData.map(function (row) {
                return row ? row.department : '';
            }).filter(dept => dept && dept.trim() !== ''))].length;

            // 통계 요소가 존재하는지 확인 후 업데이트
            if ($("#totalEmployees").length) $("#totalEmployees").text(totalRows);
            if ($("#activeEmployees").length) $("#activeEmployees").text(activeRows);
            if ($("#avgSalary").length) $("#avgSalary").text(avgSalary);
            if ($("#departments").length) $("#departments").text(departments);

        } catch (gridError) {
            // 그리드 메서드 호출 중 오류 발생 시 조용히 리턴
            return;
        }

    } catch (e) {
        // 예상치 못한 오류 발생 시에만 콘솔에 기록
        console.error('통계 업데이트 중 예상치 못한 오류:', e);
        // 오류 발생 시 기본값 설정
        if ($("#totalEmployees").length) $("#totalEmployees").text('0');
        if ($("#activeEmployees").length) $("#activeEmployees").text('0');
        if ($("#avgSalary").length) $("#avgSalary").text('0');
        if ($("#departments").length) $("#departments").text('0');
    }
}

// 행 추가
function addRow() {
    // jqGrid가 로드되었는지 확인
    if (typeof $ === 'undefined' || !$("#MainGrid").length) {
        showError('jqGrid가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    // jqGrid의 내장 추가 기능 사용 (Ajax 방식)
    $("#MainGrid").jqGrid('editGridRow', 'new', {
        closeAfterAdd: true,
        reloadAfterSubmit: false,
        afterSubmit: function (response, postdata) {
            // Ajax 처리 결과에 따른 메시지 표시
            if (response[0] === true) {
                showMessage(response[1] || "새 직원이 추가되었습니다.");
                updateStats();
            } else {
                showError(response[1] || "직원 추가 중 오류가 발생했습니다.");
            }
            return response;
        }
    });
}

// 행 수정
function editRow() {
    // jqGrid가 로드되었는지 확인
    if (typeof $ === 'undefined' || !$("#MainGrid").length) {
        showError('jqGrid가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    var selectedRowId = $("#MainGrid").jqGrid('getGridParam', 'selrow');
    if (!selectedRowId) {
        showError("수정할 행을 선택해주세요.");
        return;
    }

    // filterToolbar에서 편집 버튼을 누르면 editRow() 함수 호출
    console.log('editRow() 함수 호출됨 - 선택된 행 ID:', selectedRowId);

    // 선택된 행을 편집 모드로 열기
    $("#MainGrid").jqGrid('editGridRow', selectedRowId, {
        closeAfterEdit: true,
        reloadAfterSubmit: false,
        afterSubmit: function (response, postdata) {
            // Ajax 처리 결과에 따른 메시지 표시

            if (response[0] === true) {
                showMessage(response[1] || "직원 정보가 수정되었습니다.");
                updateStats();
            } else {
                showError(response[1] || "직원 정보 수정 중 오류가 발생했습니다.");
            }
            return response;
        }
    });
}

// 행 삭제
function deleteRow() {
    // jqGrid가 로드되었는지 확인
    if (typeof $ === 'undefined' || !$("#MainGrid").length) {
        showError('jqGrid가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    var selectedRowIds = $("#MainGrid").jqGrid('getGridParam', 'selarrrow');
    if (selectedRowIds.length === 0) {
        showError("삭제할 행을 선택해주세요.");
        return;
    }

    if (confirm("선택된 " + selectedRowIds.length + "명의 직원을 삭제하시겠습니까?")) {
        // jqGrid의 내장 삭제 기능 사용 (Ajax 방식)
        selectedRowIds.forEach(function (id) {
            $("#MainGrid").jqGrid('delGridRow', id, {
                reloadAfterSubmit: false,
                afterSubmit: function (response, postdata) {
                    // Ajax 처리 결과에 따른 메시지 표시
                    if (response[0] === true) {
                        showMessage(response[1] || "직원이 삭제되었습니다.");
                        updateStats();
                    } else {
                        showError(response[1] || "직원 삭제 중 오류가 발생했습니다.");
                    }
                    return response;
                }
            });
        });
    }
}

// 그리드 새로고침
function refreshGrid() {
    if (window.commonGridInstance) {
        window.commonGridInstance.refreshGrid();
    } else {
        showError('그리드가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
    }
}

// 데이터 내보내기 (Excel 형식) - 공통 함수 사용
function exportData() {
    if (window.commonGridInstance) {
        // 그리드 caption을 자동으로 사용
        window.commonGridInstance.exportData();
    } else {
        showError('그리드가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
    }
}

// 단축키 도움말 표시 함수
function showShortcutHelp() {
    if (window.keyboardShortcuts && window.keyboardShortcuts.showShortcutHelp) {
        window.keyboardShortcuts.showShortcutHelp();
    } else {
        showMessage("단축키 시스템이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
    }
}

// 단축키 테스트 함수
function testShortcuts() {
    if (window.keyboardShortcuts) {
        // 그리드 포커스 강제 설정 (테스트용)
        window.keyboardShortcuts.isGridFocused = true;
        showMessage("그리드 포커스를 강제로 활성화했습니다. Ins, Del, M, F 키를 테스트해보세요.");
    } else {
        // 단축키 시스템 강제 초기화
        if (typeof KeyboardShortcuts !== 'undefined') {
            window.keyboardShortcuts = new KeyboardShortcuts();
            showMessage("단축키 시스템을 강제로 초기화했습니다.");
        } else {
            showError("단축키 시스템을 초기화할 수 없습니다.");
        }
    }
}

// 셀 직접 수정 토글 함수
function toggleCellEdit() {
    try {
        const gridElement = $("#MainGrid");
        if (!gridElement.length) {
            showError('그리드가 아직 로드되지 않았습니다.');
            return;
        }

        // 현재 셀 편집 모드 확인
        const isCellEditMode = gridElement.jqGrid('getGridParam', 'cellEdit');

        if (isCellEditMode) {
            // 셀 편집 모드 해제
            gridElement.jqGrid('setGridParam', { cellEdit: false });
            $("#cellEditBtn").html('<i class="fas fa-edit"></i> 직접수정').removeClass('btn-success').addClass('btn-info');
            showMessage('셀 직접 수정 모드가 해제되었습니다.');
        } else {
            // 셀 편집 모드 활성화
            gridElement.jqGrid('setGridParam', { cellEdit: true });
            $("#cellEditBtn").html('<i class="fas fa-check"></i> 수정완료').removeClass('btn-info').addClass('btn-success');
            showMessage('셀 직접 수정 모드가 활성화되었습니다. 셀을 클릭하여 편집하세요.');
        }
    } catch (e) {
        console.error('셀 편집 모드 토글 중 오류:', e);
        showError('셀 편집 모드 변경 중 오류가 발생했습니다.');
    }
}

// 기존 Ajax 처리 함수들은 더 이상 사용하지 않음 (editRow, addRow, deleteRow 직접 호출 방식 사용)

// 실제 서버 연동을 위한 Ajax 함수들 (참고용)
function sendAjaxRequest(url, method, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(data),
        timeout: 10000, // 10초 타임아웃 설정
        success: function (response) {
            if (successCallback) successCallback(response);
        },
        error: function (xhr, status, error) {
            console.error('Ajax 요청 실패:', { status, error, xhr });

            // 상세한 오류 정보 제공
            let errorMessage = '요청 처리 중 오류가 발생했습니다.';

            if (status === 'timeout') {
                errorMessage = '서버 응답 시간이 초과되었습니다.';
            } else if (status === 'error') {
                if (xhr.status === 0) {
                    errorMessage = '서버에 연결할 수 없습니다. (ERR_CONNECTION_RESET)';
                } else if (xhr.status === 404) {
                    errorMessage = '요청한 리소스를 찾을 수 없습니다.';
                } else if (xhr.status >= 500) {
                    errorMessage = '서버 내부 오류가 발생했습니다.';
                } else {
                    errorMessage = `HTTP ${xhr.status}: ${error}`;
                }
            }

            console.error('상세 오류:', errorMessage);
            if (errorCallback) errorCallback(xhr, status, error, errorMessage);
        }
    });
}

// 서버 연동 예시 (주석 처리된 참고용 코드)
/*
function handleAddRowServer(rowid, postdata) {
    return new Promise((resolve, reject) => {
        sendAjaxRequest(
            '/api/employees', 
            'POST', 
            postdata,
            function(response) {
                resolve([true, '새 직원이 추가되었습니다.', response.id]);
            },
            function(error) {
                resolve([false, '서버 오류: 직원 추가에 실패했습니다.', '']);
            }
        );
    });
}
*/