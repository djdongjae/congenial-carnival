// 공통 그리드 기능 모듈
// 다른 프로그램에서도 재사용 가능한 표준화된 그리드 기능들

// 그리드 설정 관리 클래스
class CommonGrid {
    constructor(gridId, pagerId, pagePrefix) {
        if (!pagePrefix) {
            throw new Error('pagePrefix는 필수 파라미터입니다.');
        }
        this.gridId = gridId;
        this.pagerId = pagerId;
        this.gridElement = $(gridId);
        this.pagerElement = $(pagerId);
        this.isInitializing = false; // 그리드 초기화 중인지 확인하는 플래그
        this.pagePrefix = pagePrefix; // 페이지별 localStorage 키 접두사
    }
    
    // 컬럼 크기 저장 함수
    saveColumnWidths() {
        // 그리드 초기화 중이면 저장하지 않음
        if (this.isInitializing) {
            return;
        }
        
        try {
            const colWidths = {};
            const colModel = this.gridElement.jqGrid('getGridParam', 'colModel');
            
           
            
            if (colModel && Array.isArray(colModel)) {
                // DOM에서 실제 컬럼 크기 가져오기
                $('.ui-jqgrid-hdiv th').each(function(index) {
                    if (colModel[index] && colModel[index].name) {
                        const actualWidth = $(this).outerWidth();
                        if (actualWidth > 0) {
                            colWidths[colModel[index].name] = actualWidth;
                        }
                    }
                });
                
                // 저장된 크기가 있으면 localStorage에 저장
                if (Object.keys(colWidths).length > 0) {
                    localStorage.setItem(`${this.pagePrefix}_grid_column_widths`, JSON.stringify(colWidths));
                } else {
                    console.warn('저장할 컬럼 크기가 없습니다.');
                }
            } else {
                console.warn('colModel을 가져올 수 없습니다.');
            }
        } catch (e) {
            console.error('컬럼 크기 저장 중 오류:', e);
        }
    }

    // 컬럼 크기 복원 함수
    restoreColumnWidths() {
        const savedWidths = localStorage.getItem(`${this.pagePrefix}_grid_column_widths`);
        

        if (savedWidths) {
            try {
                const colWidths = JSON.parse(savedWidths);
                return colWidths;
            } catch (e) {
                console.error('컬럼 크기 복원 중 오류:', e);
            }
        }
        return null;
    }

    // 컬럼 너비 적용 헬퍼 함수 (정적 함수)
    static applyColumnWidth(colModel, savedWidths, defaultWidth) {
        return savedWidths && savedWidths[colModel.name] ? savedWidths[colModel.name] : defaultWidth;
    }

    // 컬럼 모델에 저장된 너비 적용하는 헬퍼 함수 (정적 함수)
    static applySavedWidthsToColModel(colModelArray, savedWidths) {
        return colModelArray.map(col => {
            if (col && col.name) {
                return {
                    ...col,
                    width: CommonGrid.applyColumnWidth(col, savedWidths, col.width || 100)
                };
            }
            return col;
        });
    }

    // 그리드 너비 계산 함수 (정적 함수)
    static getGridWidth() {
        try {
            // iframe 내부에서는 현재 윈도우(iframe)의 너비 사용
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            // 그리드 컨테이너의 패딩/마진 고려하여 계산
            const containerPadding = 140; // 좌우 패딩
            const gridWidth = windowWidth - containerPadding;
            // iframe 너비를 그대로 사용
            return Math.max(gridWidth, 600);
        } catch (e) {
            console.warn('그리드 너비 계산 중 오류, 기본값 1200px 사용:', e);
            return 1200; // 기본값
        }
    }

    // 그리드 컨테이너 생성 함수 (정적 함수)
    static ensureGridContainer(gridId, pagerId, containerClass = '.grid-container') {
        try {
            if (!$(gridId).length) {
                // 부모 요소를 찾아서 다시 생성
                const gridContainer = $(containerClass);
                if (gridContainer.length > 0) {
                    gridContainer.html(`<table id="${gridId.replace('#', '')}"></table><div id="${pagerId.replace('#', '')}"></div>`);
                    return true;
                } else {
                    console.error('그리드 컨테이너의 부모 요소를 찾을 수 없습니다.');
                    return false;
                }
            }
            return true;
        } catch (e) {
            console.error('그리드 컨테이너 생성 중 오류:', e);
            return false;
        }
    }

    // localStorage에서 그리드 설정 읽기 함수 (정적 함수)
    static loadGridSettings() {
        try {
            const savedWidths = localStorage.getItem('grid_column_widths') ? JSON.parse(localStorage.getItem('grid_column_widths')) : null;
            const savedOrder = localStorage.getItem('grid_column_order') ? JSON.parse(localStorage.getItem('grid_column_order')) : null;
            const savedVisibility = localStorage.getItem('grid_column_visibility') ? JSON.parse(localStorage.getItem('grid_column_visibility')) : null;
            
            return {
                widths: savedWidths,
                order: savedOrder,
                visibility: savedVisibility
            };
        } catch (e) {
            console.error('그리드 설정 로드 중 오류:', e);
            return {
                widths: null,
                order: null,
                visibility: null
            };
        }
    }

    // 컬럼 모델 처리 함수 (정적 함수) - 너비, 순서, 표시/숨김 설정 적용
    static processColumnModel(defaultColNames, defaultColModel, savedWidths, savedOrder, savedVisibility) {
        try {
            // 1. 저장된 너비를 컬럼 모델에 적용
            let colModel = defaultColModel;
            if (savedWidths && typeof CommonGrid !== 'undefined') {
                colModel = CommonGrid.applySavedWidthsToColModel(defaultColModel, savedWidths);
            }
            
            // 2. searchoptions.dataInit이 있으면 editoptions.dataInit에도 자동 복사
            colModel = colModel.map(col => {
                if (col && col.editable && col.searchoptions && col.searchoptions.dataInit) {
                    // editoptions가 없으면 생성
                    if (!col.editoptions) {
                        col.editoptions = {};
                    }
                    // editoptions.dataInit이 없으면 searchoptions.dataInit 복사
                    if (!col.editoptions.dataInit) {
                        col.editoptions.dataInit = col.searchoptions.dataInit;
                    }
                }
                return col;
            });
            
            // 3. 저장된 컬럼 순서와 표시/숨김 설정 적용
            let colNames = defaultColNames;
            
            if (savedOrder && Array.isArray(savedOrder)) {
                
                // 컬럼 이름과 모델을 저장된 순서로 재정렬
                colNames = savedOrder.map(colName => {
                    const index = defaultColModel.findIndex(col => col.name === colName);
                    return index !== -1 ? defaultColNames[index] : colName;
                });
                
                colModel = savedOrder.map(colName => {
                    const col = defaultColModel.find(c => c.name === colName);
                    if (col) {
                        // 저장된 표시/숨김 설정 적용
                        if (savedVisibility && savedVisibility[colName] === false) {
                            col.hidden = true;
                        } else {
                            col.hidden = false;
                        }
                    }
                    return col;
                }).filter(col => col); // undefined 제거
            } else if (savedVisibility) {
                // 순서는 변경하지 않고 표시/숨김만 적용
                colModel = colModel.map(col => {
                    if (savedVisibility[col.name] === false) {
                        col.hidden = true;
                    } else {
                        col.hidden = false;
                    }
                    return col;
                });
            }
            
            return {
                colNames: colNames,
                colModel: colModel
            };
        } catch (e) {
            console.error('컬럼 모델 처리 중 오류:', e);
            return {
                colNames: defaultColNames,
                colModel: defaultColModel
            };
        }
    }

    // 컬럼 순서 저장 함수
    saveColumnOrder(columnOrder) {
        try {
            // 유효한 컬럼명만 필터링하여 저장
            const validOrder = columnOrder.filter(colName => colName && colName.trim() !== '');
            localStorage.setItem(`${this.pagePrefix}_grid_column_order`, JSON.stringify(validOrder));
        } catch (e) {
            console.error('컬럼 순서 저장 중 오류:', e);
        }
    }

    // 컬럼 순서 복원 함수
    restoreColumnOrder() {
        const savedOrder = localStorage.getItem(`${this.pagePrefix}_grid_column_order`);
        if (savedOrder) {
            try {
                const colOrder = JSON.parse(savedOrder);
                // 유효한 컬럼명만 필터링하여 반환
                return colOrder.filter(colName => colName && colName.trim() !== '');
            } catch (e) {
                console.error('컬럼 순서 복원 중 오류:', e);
            }
        }
        return null;
    }

    // 컬럼 표시/숨김 저장 함수
    saveColumnVisibility() {
        try {
            const colVisibility = {};
            const colModel = this.gridElement.jqGrid('getGridParam', 'colModel');
            
            if (colModel && Array.isArray(colModel)) {
                colModel.forEach(col => {
                    if (col && col.name && col.name.trim() !== '') {
                        colVisibility[col.name] = !col.hidden;
                    }
                });
            }
            
            localStorage.setItem(`${this.pagePrefix}_grid_column_visibility`, JSON.stringify(colVisibility));
        } catch (e) {
            console.error('컬럼 표시/숨김 저장 중 오류:', e);
        }
    }

    // 컬럼 표시/숨김 복원 함수
    restoreColumnVisibility() {
        const savedVisibility = localStorage.getItem(`${this.pagePrefix}_grid_column_visibility`);
        if (savedVisibility) {
            try {
                const colVisibility = JSON.parse(savedVisibility);
                return colVisibility;
            } catch (e) {
                console.error('컬럼 표시/숨김 복원 중 오류:', e);
            }
        }
        return null;
    }

    // 컬럼 설정 초기화 함수
    resetColumnSettings() {
        if (confirm('컬럼 순서와 표시/숨김 설정을 기본값으로 초기화하시겠습니까?')) {
            try {
                // localStorage에서 컬럼 설정 제거
                localStorage.removeItem(`${this.pagePrefix}_grid_column_order`);
                localStorage.removeItem(`${this.pagePrefix}_grid_column_visibility`);
                localStorage.removeItem(`${this.pagePrefix}_grid_column_widths`); // 크기도 함께 초기화
                
                // 안전한 그리드 새로고침
                try {
                    if (this.gridElement.length > 0 && this.gridElement.jqGrid) {
                        this.gridElement.trigger('reloadGrid');
                    }
                } catch (reloadError) {
                    console.error('그리드 새로고침 중 오류:', reloadError);
                    // 오류 발생 시 페이지 새로고침으로 대체
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
                
                showMessage('컬럼 설정이 초기화되었습니다.', 3000);
            } catch (e) {
                console.error('컬럼 설정 초기화 중 오류:', e);
                showError('컬럼 설정 초기화 중 오류가 발생했습니다.');
            }
        }
    }

    // 컬럼 크기 초기화 함수
    resetColumnWidths() {
        if (confirm('컬럼 크기를 기본값으로 초기화하시겠습니까?')) {
            
            try {
                // localStorage에서 컬럼 크기 설정 제거
                localStorage.removeItem(`${this.pagePrefix}_grid_column_widths`);

                // 그리드 완전 재초기화
                try {
                    if (this.gridElement.length > 0 && this.gridElement.jqGrid) {
                        
                        // 그리드 파괴
                        this.gridElement.jqGrid('GridDestroy');
                        this.gridElement.empty();
                        
                        // 테이블 요소와 페이저 다시 생성
                        const parentElement = this.gridElement.parent();
                        parentElement.html('<table id="' + this.gridId.substring(1) + '"></table><div id="' + this.pagerId.substring(1) + '"></div>');
                        
                        // 약간의 지연 후 그리드 재초기화
                        setTimeout(() => {
                            if (window.initMainGrid) {
                                window.initMainGrid();
                            } else {
                                console.error('initMainGrid 함수를 찾을 수 없습니다.');
                                // initMainGrid가 없으면 페이지 새로고침으로 대체
                                window.location.reload();
                            }
                        }, 200);
                    }
                } catch (reloadError) {
                    console.error('그리드 재초기화 중 오류:', reloadError);
                    // 오류 발생 시 페이지 새로고침으로 대체
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
                
                showMessage('컬럼 크기가 초기화되었습니다.', 3000);
            } catch (e) {
                console.error('컬럼 크기 초기화 중 오류:', e);
                showError('컬럼 크기 초기화 중 오류가 발생했습니다.');
            }
        }
    }

    // 컬럼 선택기 표시 함수
    showColumnSelector() {
        const colModel = this.gridElement.jqGrid('getGridParam', 'colModel');
        const colNames = this.gridElement.jqGrid('getGridParam', 'colNames');
        
        if (!colModel || !Array.isArray(colModel)) {
            showError('그리드 정보를 가져올 수 없습니다.');
            return;
        }
        
        let html = '<div class="column-selector-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; justify-content: center; align-items: center;">';
        html += '<div style="background: white; padding: 20px; border-radius: 8px; min-width: 400px; max-height: 500px; overflow-y: auto;">';
        html += '<h3 style="margin-top: 0;">컬럼 설정</h3>';
        html += '<p style="margin: 10px 0; color: #666; font-size: 14px;">체크박스로 표시/숨김 설정, 드래그로 순서 변경</p>';
        html += '<div id="columnList" style="margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; padding: 10px; min-height: 200px;">';
        
        // 현재 컬럼 순서대로 표시 (Column0 제외)
        colModel.forEach((col, index) => {
            if (col && col.name && col.name !== 'cb') { // cb는 체크박스 컬럼
                const colNameDisplay = colNames && colNames[index] ? colNames[index] : col.name;
                const isHidden = col.hidden || false;
                
                // 모든 컬럼을 표시 (숨겨진 컬럼도 포함)
                html += `<div class="column-item" data-col="${col.name}" style="display: flex; align-items: center; padding: 8px; margin: 4px 0; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: move;">`;
                html += `<span style="margin-right: 10px; color: #666;">⋮⋮</span>`;
                html += `<input type="checkbox" ${!isHidden ? 'checked' : ''} data-col="${col.name}" style="margin-right: 10px;">`;
                html += `<span>${colNameDisplay}</span>`;
                html += '</div>';
            }
        });
        
        html += '</div>';
        html += '<div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 15px;">';
        html += '<div style="text-align: left; margin-bottom: 10px;">';
        html += '<button id="columnSelectorReset" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;">크기 초기화</button>';
        html += '</div>';
        html += '<div style="text-align: right;">';
        html += '<button id="columnSelectorCancel" style="margin-right: 10px; padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px;">취소</button>';
        html += '<button id="columnSelectorApply" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px;">적용</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        // 기존 모달 제거
        $('.column-selector-modal').remove();
        
        // 새 모달 추가
        $('body').append(html);
        
        // 드래그 앤 드롭 기능 추가
        this.makeSortable();
        
        // 이벤트 핸들러
        $('#columnSelectorCancel').click(() => {
            $('.column-selector-modal').remove();
        });
        
        $('#columnSelectorApply').click(() => {
            this.applyColumnSettings();
        });
        
        $('#columnSelectorReset').click(() => {
            this.resetColumnWidthsInModal();
        });
    }

    // 드래그 앤 드롭 기능 구현
    makeSortable() {
        const columnList = document.getElementById('columnList');
        if (!columnList) {
            console.warn('columnList 요소를 찾을 수 없습니다.');
            return;
        }
        
        let draggedElement = null;
        
        // 드래그 시작
        columnList.addEventListener('dragstart', function(e) {
            if (e.target.classList.contains('column-item')) {
                draggedElement = e.target;
                e.target.style.opacity = '0.5';
                e.target.classList.add('dragging');
            }
        });
        
        // 드래그 중
        columnList.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        // 드롭
        columnList.addEventListener('drop', function(e) {
            e.preventDefault();
            if (!draggedElement) return;
            
            const afterElement = this.getDragAfterElement(columnList, e.clientY);
            if (afterElement == null) {
                columnList.appendChild(draggedElement);
            } else {
                columnList.insertBefore(draggedElement, afterElement);
            }
            
        }.bind(this));
        
        // 드래그 종료
        columnList.addEventListener('dragend', function(e) {
            if (e.target.classList.contains('column-item')) {
                e.target.style.opacity = '1';
                e.target.classList.remove('dragging');
            }
            draggedElement = null;
        });
        
        // 모든 컬럼 아이템을 드래그 가능하게 설정
        setTimeout(() => {
            document.querySelectorAll('.column-item').forEach(item => {
                item.draggable = false;
                item.style.cursor = 'default';
            });
        }, 100);
    }

    // 드래그 위치 계산
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.column-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 컬럼 설정 적용
    applyColumnSettings() {
        const colModel = this.gridElement.jqGrid('getGridParam', 'colModel');
        
        if (!colModel || !Array.isArray(colModel)) {
            showError('그리드 정보를 가져올 수 없습니다.');
            return;
        }
        
        const newOrder = [];
        const visibilitySettings = {};
        
        // 새로운 순서와 표시/숨김 설정 수집
        document.querySelectorAll('.column-item').forEach(item => {
            const colName = item.getAttribute('data-col');
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (colName && checkbox) {
                newOrder.push(colName);
                visibilitySettings[colName] = checkbox.checked;
            }
        });
        

         // 컬럼 표시/숨김 적용
         colModel.forEach(col => {
            if (col && col.name) {
                const shouldShow = visibilitySettings[col.name];
                
                try {
                    if (shouldShow === true) {
                        // 체크박스가 체크된 경우 - 표시
                        this.gridElement.jqGrid('showCol', col.name);
                    } else if (shouldShow === false) {
                        // 체크박스가 해제된 경우 - 숨김
                        this.gridElement.jqGrid('hideCol', col.name);
                    }
                } catch (error) {
                    console.error(`컬럼 ${col.name} 표시/숨김 처리 중 오류:`, error);
                }
            }
        });

        this.autoResize();
        
        // 컬럼 순서 변경 (안전한 방법 - 저장만 하고 다음 로드 시 적용)

        
        if (newOrder.length > 0 && false) {
            // 컬럼 순서를 localStorage에 저장 (다음 페이지 로드 시 적용됨)
            this.saveColumnOrder(newOrder);


            try {
                if (this.gridElement.length > 0 && this.gridElement.jqGrid) {
                    
                    // 그리드 파괴
                    this.gridElement.jqGrid('GridDestroy');
                    this.gridElement.empty();
                    
                    // 테이블 요소와 페이저 다시 생성
                    const parentElement = this.gridElement.parent();
                    parentElement.html('<table id="' + this.gridId.substring(1) + '"></table><div id="' + this.pagerId.substring(1) + '"></div>');
                    
                    // 약간의 지연 후 그리드 재초기화
                    setTimeout(() => {
                        if (window.initMainGrid) {
                            window.initMainGrid();
                        } else {
                            console.error('initMainGrid 함수를 찾을 수 없습니다.');
                            // initMainGrid가 없으면 페이지 새로고침으로 대체
                            window.location.reload();
                        }
                    }, 200);
                   
                }
            } catch (reloadError) {
                console.error('그리드 재초기화 중 오류:', reloadError);
                // 오류 발생 시 페이지 새로고침으로 대체
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }


        }
        
       
       
        
        // 컬럼 표시/숨김 설정 저장 (다음 페이지 로드 시 적용됨)
        this.saveColumnVisibility();
        
        // 모달 제거
        $('.column-selector-modal').remove();
        showMessage('컬럼 설정이 적용되었습니다.', 2000);
    }

    // 컬럼 크기 조정 이벤트 설정
    setupColumnResizeEvents() {
        
        // 1. 마우스 이벤트 (문서 전체에서)
        $(document).on('mouseup', '.ui-jqgrid-hdiv', function() {
            setTimeout(() => {                
                if (window.commonGridInstance && !window.commonGridInstance.isInitializing) {
                    window.commonGridInstance.saveColumnWidths();
                }
            }, 100);
        });
        
        // 2. jqGrid 내장 이벤트
        $(this.gridId).jqGrid('setGridParam', {
            onColResize: function(columnIndex, newWidth) {
                if (window.commonGridInstance && !window.commonGridInstance.isInitializing) {
                    setTimeout(() => {
                        window.commonGridInstance.saveColumnWidths();
                    }, 50);
                }
            }
        });
        
        // 3. 그리드 헤더에 직접 이벤트 추가
        $(this.gridId + ' .ui-jqgrid-hdiv').on('mouseup', function() {
            setTimeout(() => {
                if (window.commonGridInstance && !window.commonGridInstance.isInitializing) {
                    window.commonGridInstance.saveColumnWidths();
                }
            }, 100);
        });
        
        // 4. 페이지를 떠날 때 컬럼 크기 저장
        $(window).on('beforeunload', function() {
            if (window.commonGridInstance && !window.commonGridInstance.isInitializing) {
                window.commonGridInstance.saveColumnWidths();
            } else {
            }
        });
        
        
        // 컬럼 헤더 구분선 동적 적용
        setTimeout(() => {
            // 컬럼 헤더 테두리 적용
            $('.ui-jqgrid-sortable').css({
                'border-right': '3px solid #fc0202 !important'
            });
            $('.ui-jqgrid-sortable:last-child').css({
                'border-right': 'none !important'
            });
            
            // 리사이즈 핸들 구분선 적용
            $('.ui-jqgrid-resize').css({
                'border-left': '1px solid #000000 !important',
                'background-color': '#000000 !important',
                'width': '1px !important'
            });
            
        }, 500);
    }

    // 모달 내에서 컬럼 크기 초기화 함수
    resetColumnWidthsInModal() {
        if (confirm('컬럼 크기를 기본값으로 초기화하시겠습니까?')) {
            try {
                // localStorage에서 컬럼 크기 설정 제거
                localStorage.removeItem(`${this.pagePrefix}_grid_column_widths`);
                
                // 그리드 완전 재초기화
                try {
                    if (this.gridElement.length > 0 && this.gridElement.jqGrid) {
                        
                        // 그리드 파괴
                        this.gridElement.jqGrid('GridDestroy');
                        this.gridElement.empty();
                        
                        // 테이블 요소와 페이저 다시 생성
                        const parentElement = this.gridElement.parent();
                        parentElement.html('<table id="' + this.gridId.substring(1) + '"></table><div id="' + this.pagerId.substring(1) + '"></div>');
                        
                        // 약간의 지연 후 그리드 재초기화
                        setTimeout(() => {
                            if (window.initMainGrid) {
                                window.initMainGrid();
                            } else {
                                console.error('initMainGrid 함수를 찾을 수 없습니다.');
                                // initMainGrid가 없으면 페이지 새로고침으로 대체
                                window.location.reload();
                            }
                        }, 200);
                       
                    }
                } catch (reloadError) {
                    console.error('그리드 재초기화 중 오류:', reloadError);
                    // 오류 발생 시 페이지 새로고침으로 대체
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
                
                showMessage('컬럼 크기가 초기화되었습니다.', 3000);
            } catch (e) {
                console.error('컬럼 크기 초기화 중 오류:', e);
                showError('컬럼 크기 초기화 중 오류가 발생했습니다.');
            }
        }
    }

    // 그리드 새로고침
    refreshGrid() {
        if (this.gridElement.length > 0 && this.gridElement.jqGrid) {
            this.gridElement.trigger('reloadGrid');
            showMessage("그리드가 새로고침되었습니다.");
        } else {
            showError('그리드가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        }
    }

    // 그리드 크기 자동 조절
    autoResize() {
        try {
            const containerWidth = $('.grid-container').width();
            if (containerWidth > 0) {
                this.gridElement.setGridWidth(containerWidth, true);
            }
        } catch (e) {
            console.error('그리드 크기 조절 중 오류:', e);
            this.gridElement.trigger('reloadGrid');
        }
    }

    // 데이터 내보내기 (Excel 형식)
    exportData(fileName = null, colNames = null, data = null) {
        try {
            // 그리드에서 데이터 가져오기
            const gridData = data || this.gridElement.jqGrid('getGridParam', 'data');
            const gridColNames = colNames || this.gridElement.jqGrid('getGridParam', 'colNames');
            const gridColModel = this.gridElement.jqGrid('getGridParam', 'colModel');
            
            // 그리드 caption을 기본 파일명으로 사용
            const gridCaption = this.gridElement.jqGrid('getGridParam', 'caption');
            const finalFileName = fileName || gridCaption || '데이터목록';
            
            if (!gridData || !Array.isArray(gridData)) {
                showError('내보낼 데이터가 없습니다.');
                return;
            }
            
            // HTML Table 생성
            const table = document.createElement('table');
            table.style.borderCollapse = 'collapse';
            table.style.width = '100%';
            
            // 헤더 행 생성
            const headerRow = document.createElement('tr');
            headerRow.style.backgroundColor = '#f8f9fa';
            headerRow.style.fontWeight = 'bold';
            
            // 체크박스 컬럼 제외하고 컬럼명 추출
            const filteredColModel = gridColModel ? gridColModel.filter(col => 
                col.name && col.name !== 'cb' && col.name !== 'rn' // cb: 체크박스, rn: 행 번호
            ) : [];
            
            // 컬럼명 사용 (colNames가 있으면 사용, 없으면 colModel에서 추출)
            const headers = gridColNames ? 
                gridColNames.filter((name, index) => {
                    const col = gridColModel[index];
                    return col && col.name && col.name !== 'cb' && col.name !== 'rn';
                }) : 
                filteredColModel.map(col => col.label || col.name);
            
            headers.forEach(function(header) {
                const th = document.createElement('th');
                th.textContent = header;
                th.style.border = '1px solid #dee2e6';
                th.style.padding = '12px 8px';
                th.style.textAlign = 'center';
                th.style.backgroundColor = '#e9ecef';
                th.style.fontWeight = 'bold';
                th.style.color = '#495057';
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
            
            // 데이터 행 생성
            gridData.forEach(function(row, index) {
                const tr = document.createElement('tr');
                tr.style.backgroundColor = (index % 2 === 0) ? '#ffffff' : '#f8f9fa';
                
                // 체크박스 컬럼 제외하고 데이터 추출
                const rowData = filteredColModel.map(col => {
                    if (col.name && row[col.name] !== undefined) {
                        return row[col.name];
                    }
                    return '';
                });
                
                rowData.forEach(function(cellData, cellIndex) {
                    const td = document.createElement('td');
                    td.textContent = cellData || '';
                    td.style.border = '1px solid #dee2e6';
                    td.style.padding = '8px';
                    td.style.textAlign = 'left';
                    td.style.verticalAlign = 'middle';
                    tr.appendChild(td);
                });
                
                table.appendChild(tr);
            });
            
            // Excel 파일 생성
            const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset="utf-8">
                <meta name="ExcelFormat" content="Excel.Sheet">
                <meta name="ProgId" content="Excel.Sheet">
                <style>
                    .title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 20px; color: #333; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #dee2e6; padding: 8px; }
                    th { background-color: #e9ecef; font-weight: bold; text-align: center; }
                    tr:nth-child(even) { background-color: #f8f9fa; }
                    .number { text-align: right; }
                </style>
            </head>
            <body>
                <div class="title">${finalFileName}</div>
                ${table.outerHTML}
            </body>
            </html>`;
            
            // Blob 생성 및 다운로드
            const blob = new Blob([htmlContent], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", finalFileName + "_" + new Date().toISOString().split('T')[0] + ".xls");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
            
            showMessage("데이터가 Excel 파일로 내보내졌습니다.");
        } catch (e) {
            console.error('데이터 내보내기 중 오류:', e);
            showError('데이터 내보내기 중 오류가 발생했습니다.');
        }
    }
}

// 전역 변수로 그리드 인스턴스 저장
window.commonGridInstance = null;

// 그리드 초기화 헬퍼 함수
function initCommonGrid(gridId, pagerId, gridConfig, pagePrefix = null) {
    try {
        
        
        // 그리드 인스턴스 생성 (pagePrefix가 null이면 실패)
        if (!pagePrefix) {
            throw new Error('pagePrefix는 필수 파라미터입니다.');
        }
        window.commonGridInstance = new CommonGrid(gridId, pagerId, pagePrefix);
        
        // 그리드 초기화 시작 플래그 설정
        window.commonGridInstance.isInitializing = true;
        
        const savedWidths = window.commonGridInstance.restoreColumnWidths();
        
        const savedOrder = window.commonGridInstance.restoreColumnOrder();
        
        // jQuery UI 달력 한글 설정
        if ($.datepicker) {
            $.datepicker.setDefaults({
                dateFormat: 'yy-mm-dd',
                dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                showMonthAfterYear: true,
                yearSuffix: '년',
                changeMonth: true,
                changeYear: true,
                yearRange: '1900:2100', // 년도 범위 제한 없음 (넓은 범위 설정)
                showButtonPanel: true,
                currentText: '오늘',
                closeText: '닫기',
                prevText: '이전',
                nextText: '다음',
                todayText: '오늘',
                clearText: '지우기'
            });
            
            // 년도 선택을 팝업 방식으로 변경하기 위한 커스텀 처리
            // 년도 selectbox 숨기기 및 년도 버튼으로 교체
            
            // datepicker가 열릴 때마다 년도 selectbox를 버튼으로 교체
            function replaceYearSelectWithButton() {
                $('.ui-datepicker-year').each(function() {
                    const $yearSelect = $(this);
                    const datepicker = $yearSelect.closest('.ui-datepicker');
                    
                    // 이미 교체되었는지 확인
                    if (datepicker.find('.year-button-clickable').length > 0) {
                        // 년도 값 업데이트만
                        const yearValue = $yearSelect.val() || new Date().getFullYear();
                        const yearButton = datepicker.find('.year-button-clickable');
                        yearButton.text(yearValue);
                        return;
                    }
                    
                    // 년도 selectbox 숨기기
                    $yearSelect.hide();
                    
                    // 현재 년도 값 가져오기
                    const yearValue = $yearSelect.val() || new Date().getFullYear();
                    const yearText = yearValue;
                    
                    // 년도 버튼 생성 (selectbox를 대체)
                    const yearButton = $('<button type="button" class="year-button-clickable">' + yearText + '</button>');
                    yearButton.css({
                        background: '#f6f6f6',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        fontSize: '1em',
                        margin: '1px 0',
                        color: '#333',
                        fontWeight: 'normal'
                    });
                    
                    // 년도 버튼 hover 효과
                    yearButton.on('mouseenter', function() {
                        $(this).css({
                            background: '#e6f3ff',
                            borderColor: '#0078a3'
                        });
                    });
                    yearButton.on('mouseleave', function() {
                        $(this).css({
                            background: '#f6f6f6',
                            borderColor: '#ccc'
                        });
                    });
                    
                    // 년도 selectbox 위치에 버튼 삽입
                    $yearSelect.after(yearButton);
                    
                    // input 참조 가져오기
                    const input = datepicker.data('datepicker-input') || 
                                 $('input.hasDatepicker').filter(function() {
                                     return $(this).datepicker('widget')[0] === datepicker[0];
                                 }).first();
                    
                    if (input.length > 0) {
                        // 년도 버튼 클릭 이벤트
                        yearButton.on('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const currentYear = parseInt($yearSelect.val()) || new Date().getFullYear();
                            showYearPicker(datepicker, input, currentYear);
                        });
                    }
                });
            }
            
            // datepicker 인스턴스에 input 참조 저장
            $(document).on('focus', 'input.hasDatepicker', function() {
                const $this = $(this);
                const datepicker = $this.datepicker('widget');
                if (datepicker.length > 0) {
                    datepicker.data('datepicker-input', $this);
                }
            });
            
            // datepicker가 열릴 때마다 년도 selectbox를 버튼으로 교체
            $(document).on('click focus', 'input.hasDatepicker', function() {
                setTimeout(() => {
                    replaceYearSelectWithButton();
                }, 50);
            });
            
            // datepicker 내부에서 년도가 변경될 때 버튼 텍스트 업데이트
            $(document).on('change', '.ui-datepicker-year', function() {
                const $yearSelect = $(this);
                const datepicker = $yearSelect.closest('.ui-datepicker');
                const yearButton = datepicker.find('.year-button-clickable');
                if (yearButton.length > 0) {
                    const yearValue = $yearSelect.val() || new Date().getFullYear();
                    yearButton.text(yearValue);
                }
            });
            
            // datepicker의 외부 클릭 감지 함수를 오버라이드하여
            // 년도 선택 팝업이 열려 있을 때는 datepicker가 닫히지 않도록 함
            const originalCheckExternalClick = $.datepicker._checkExternalClick;
            $.datepicker._checkExternalClick = function(event) {
                // 년도 선택 팝업이 열려 있는지 확인
                if ($('.year-picker-popup').length > 0) {
                    // 년도 선택 팝업 내부 클릭인 경우 datepicker를 닫지 않음
                    const $target = $(event.target);
                    if ($target.closest('.year-picker-popup').length > 0) {
                        return; // datepicker를 닫지 않음
                    }
                }
                // 원래 함수 호출
                return originalCheckExternalClick.apply(this, arguments);
            };
        }
        
        // 년도 선택 팝업 함수
        function showYearPicker(datepicker, input, currentYear) {
            // 기존 팝업 제거
            $('.year-picker-popup').remove();
            
            // 년도 버튼 위치 찾기
            const yearButton = datepicker.find('.year-button-clickable');
            if (yearButton.length === 0) return;
            
            // 년도 선택 팝업 생성 (div로 명확히 생성)
            const popup = $('<div class="year-picker-popup"></div>');
            popup.css({
                position: 'absolute',
                zIndex: 10001,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                width: '320px',
                maxHeight: '350px',
                overflowY: 'auto'
            });
            
            // 현재 년도 기준으로 년도 목록 생성 (100년 단위로 표시)
            const startYear = Math.max(1900, currentYear - 50);
            const endYear = Math.min(2100, currentYear + 50);
            
            // 제목
            const title = $('<div style="font-weight: bold; margin-bottom: 10px; text-align: center; font-size: 14px;">년도 선택</div>');
            popup.append(title);
            
            // 년도 입력 필드
            const yearInput = $('<input type="number" class="year-input" value="' + currentYear + '" min="1900" max="2100" />');
            yearInput.css({
                width: '100%',
                padding: '5px',
                marginBottom: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '3px',
                boxSizing: 'border-box'
            });
            popup.append(yearInput);
            
            // 빠른 선택 버튼들
            const quickButtons = $('<div class="year-quick-buttons"></div>');
            quickButtons.css({
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '5px',
                marginBottom: '10px'
            });
            
            const quickRanges = [
                { label: '1900-1950', start: 1900, end: 1950 },
                { label: '1950-2000', start: 1950, end: 2000 },
                { label: '2000-2050', start: 2000, end: 2050 },
                { label: '2050-2100', start: 2050, end: 2100 }
            ];
            
            quickRanges.forEach(range => {
                const btn = $('<button type="button" class="year-range-btn">' + range.label + '</button>');
                btn.css({
                    padding: '5px 8px',
                    fontSize: '11px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                });
                btn.on('mouseenter', function() {
                    $(this).css('background', '#e6f3ff');
                });
                btn.on('mouseleave', function() {
                    $(this).css('background', '#f5f5f5');
                });
                btn.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showYearList(popup, yearInput, range.start, range.end, input, datepicker);
                });
                quickButtons.append(btn);
            });
            popup.append(quickButtons);
            
            // 년도 목록 영역
            const yearList = $('<div class="year-list"></div>');
            yearList.css({
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '5px'
            });
            popup.append(yearList);
            
            // 년도 입력 후 엔터키 처리
            yearInput.on('keypress', function(e) {
                if (e.which === 13) {
                    const year = parseInt($(this).val());
                    if (year >= 1900 && year <= 2100) {
                        selectYear(input, datepicker, year);
                        popup.remove();
                        $(document).off('click.yearpicker');
                    }
                }
            });
            
            // 년도 목록 표시 (현재 년도 기준 ±10년)
            showYearList(popup, yearInput, currentYear - 10, currentYear + 10, input, datepicker);
            
            // 팝업을 먼저 body에 추가 (높이/너비 계산을 위해)
            $('body').append(popup);
            
            // 팝업 위치 설정: 년도 버튼 위에 표시
            const yearButtonOffset = yearButton.offset();
            const yearButtonHeight = yearButton.outerHeight();
            const popupHeight = popup.outerHeight();
            const popupWidth = popup.outerWidth();
            
            // 년도 버튼 위에 표시 (기본 위치)
            let topPosition = yearButtonOffset.top - popupHeight - 5;
            let leftPosition = yearButtonOffset.left;
            
            // 화면 위로 나가는 경우 년도 버튼 아래에 표시
            if (topPosition < 0) {
                topPosition = yearButtonOffset.top + yearButtonHeight + 5;
            }
            
            // 화면 밖으로 나가는 경우 조정
            const windowWidth = $(window).width();
            if (leftPosition + popupWidth > windowWidth) {
                leftPosition = windowWidth - popupWidth - 10;
            }
            if (leftPosition < 0) {
                leftPosition = 10;
            }
            
            popup.css({
                top: topPosition + 'px',
                left: leftPosition + 'px'
            });
            
            // 팝업 외부 클릭 시 닫기
            $(document).on('click.yearpicker', function(e) {
                // 년도 선택 팝업 내부 클릭이거나 년도 버튼 클릭인 경우 무시
                if ($(e.target).closest('.year-picker-popup, .year-button-clickable').length) {
                    // datepicker가 닫히지 않도록 이벤트 전파 차단
                    e.stopPropagation();
                    return;
                }
                // datepicker 내부 클릭인 경우 무시 (datepicker가 닫히지 않도록)
                if ($(e.target).closest('.ui-datepicker').length) {
                    return;
                }
                // 그 외의 경우 팝업 닫기
                popup.remove();
                $(document).off('click.yearpicker');
            });
            
            // 년도 선택 팝업 내부 클릭 시 datepicker가 닫히지 않도록 처리
            popup.on('click', function(e) {
                e.stopPropagation();
            });
        }
        
        // 년도 목록 표시 함수
        function showYearList(popup, yearInput, startYear, endYear, input, datepicker) {
            const yearList = popup.find('.year-list');
            yearList.empty();
            
            for (let year = startYear; year <= endYear; year++) {
                const yearBtn = $('<button type="button" class="year-btn">' + year + '</button>');
                yearBtn.css({
                    padding: '5px',
                    fontSize: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    background: '#fff',
                    cursor: 'pointer'
                });
                yearBtn.on('mouseenter', function() {
                    $(this).css('background', '#e6f3ff');
                });
                yearBtn.on('mouseleave', function() {
                    $(this).css('background', '#fff');
                });
                yearBtn.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const selectedYear = parseInt($(this).text());
                    selectYear(input, datepicker, selectedYear);
                    popup.remove();
                    $(document).off('click.yearpicker');
                });
                yearList.append(yearBtn);
            }
        }
        
        // 년도 선택 함수
        function selectYear(input, datepicker, year) {
            if (!input.length) return;
            
            // datepicker 인스턴스 가져오기
            const inst = $.datepicker._getInst(input[0]);
            if (!inst) return;
            
            // datepicker가 현재 열려있는지 확인
            const wasVisible = datepicker.is(':visible');
            
            // 현재 날짜 가져오기
            const currentDate = input.datepicker('getDate');
            let newDate;
            if (currentDate) {
                newDate = new Date(currentDate);
                newDate.setFullYear(year);
            } else {
                const today = new Date();
                newDate = new Date(year, today.getMonth(), today.getDate());
            }
            
            // datepicker 인스턴스의 선택된 년도/월/일 업데이트
            inst.selectedYear = year;
            inst.selectedMonth = newDate.getMonth();
            inst.selectedDay = newDate.getDate();
            
            // 현재 표시 중인 월/년도 업데이트 (datepicker 캘린더가 해당 년도/월을 표시하도록)
            inst.drawYear = year;
            inst.drawMonth = newDate.getMonth();
            
            // 현재 년도/월도 업데이트 (날짜 선택 시 올바른 년도가 사용되도록)
            inst.currentYear = year;
            inst.currentMonth = newDate.getMonth();
            
            // datepicker가 열린 상태를 유지하기 위해 _datepickerShowing 플래그 설정
            const wasShowing = $.datepicker._datepickerShowing;
            $.datepicker._datepickerShowing = wasVisible || wasShowing;
            
            // datepicker 위젯을 다시 그리기
            $.datepicker._updateDatepicker(inst);
            
            // input 필드의 날짜도 업데이트 (setDate를 호출하되 datepicker를 닫지 않도록)
            // setDate를 호출하면 datepicker가 닫힐 수 있으므로, 즉시 다시 열기
            input.datepicker('setDate', newDate);
            
            // datepicker가 여전히 열려있는지 확인하고, 닫혔다면 다시 열기
            // 즉시 확인하고 다시 열기
            setTimeout(() => {
                if (!datepicker.is(':visible') && wasVisible) {
                    // datepicker를 다시 열기
                    input.datepicker('show');
                }
            }, 0);
            
            // 약간의 추가 지연 후 다시 확인 (내부 처리 시간 고려)
            setTimeout(() => {
                if (!datepicker.is(':visible') && wasVisible) {
                    input.datepicker('show');
                }
                // 년도 버튼 다시 교체 (datepicker가 다시 그려질 수 있으므로)
                replaceYearSelectWithButton();
            }, 50);
            
            // 년도 selectbox 값 업데이트 (jQuery UI 내부 동기화를 위해)
            const yearSelect = datepicker.find('.ui-datepicker-year');
            if (yearSelect.length > 0) {
                yearSelect.val(year);
            }
            
            // 년도 버튼 텍스트 업데이트
            const yearButton = datepicker.find('.year-button-clickable');
            if (yearButton.length > 0) {
                yearButton.text(year);
            }
        }

        // 그리드 초기화
        $(gridId).jqGrid(gridConfig);
        
        // jqGrid가 생성하는 인라인 스타일 제거
        setTimeout(() => {
            const gridView = $(gridId.replace('#', '#gview_'));
            if (gridView.length > 0) {
                gridView.removeAttr('style');
            }
            
            const headerDiv = $(gridId).find('.ui-jqgrid-hdiv');
            const bodyDiv = $(gridId).find('.ui-jqgrid-bdiv');
            
            if (headerDiv.length > 0) {
                headerDiv.removeAttr('style');
            }
            
            if (bodyDiv.length > 0) {
                bodyDiv.removeAttr('style');
            }
        }, 50);

        // 저장된 컬럼 너비 적용 (그리드 초기화 후)
        if (savedWidths && Object.keys(savedWidths).length > 0) {
            setTimeout(() => {
                // 방법 1: setColProp 사용
                Object.keys(savedWidths).forEach(colName => {
                    if (savedWidths[colName] && savedWidths[colName] > 0) {
                        try {
                            $(gridId).jqGrid('setColProp', colName, 'width', savedWidths[colName]);
                        } catch (e) {
                            console.warn(`컬럼 ${colName} 너비 적용 실패 (setColProp):`, e);
                        }
                    }
                });
                
                // 방법 2: DOM 직접 조작
                setTimeout(() => {
                    Object.keys(savedWidths).forEach(colName => {
                        if (savedWidths[colName] && savedWidths[colName] > 0) {
                            try {
                                // 헤더 컬럼 너비 설정
                                const headerCol = $(gridId).find(`th[aria-describedby="${gridId.replace('#', '')}_${colName}"]`);
                                if (headerCol.length > 0) {
                                    headerCol.css('width', savedWidths[colName] + 'px');
                                }
                                
                                // 데이터 컬럼 너비 설정
                                const dataCols = $(gridId).find(`td[aria-describedby="${gridId.replace('#', '')}_${colName}"]`);
                                dataCols.css('width', savedWidths[colName] + 'px');
                                
                            } catch (e) {
                                console.warn(`DOM 직접 조작 실패 (컬럼 ${colName}):`, e);
                            }
                        }
                    });
                }, 200);
                
            }, 100);
        }
        
        // 네비게이션 바 추가
        // editurl이 실제 서버 URL인지 클라이언트 측 처리인지 판단
        const editurl = gridConfig.editurl;
        // 'local', 'clientArray' 또는 함수는 클라이언트 측 처리로 간주
        // 하지만 onSaveData 콜백이 있으면 API 저장 사용
        const useClientSideEditing = gridConfig.useClientSideEditing || 
            typeof editurl === 'function' ||
            (typeof editurl === 'string' && editurl !== '' && 
             editurl !== 'local' &&
             !editurl.match(/^(https?:\/\/|\/)/)); // http://, https://, /로 시작하지 않으면 클라이언트 측 처리
        
        const navGridOptions = {
            edit: true,
            add: true,
            del: true,  
            search: true,
            refresh: true,
            view: true,
            position: "left",
            cloneToTop: true
        };
        
        // 저장 콜백 함수 확인 (gridConfig.onSaveData 또는 gridConfig.saveDataFunction)
        const saveDataFunction = gridConfig.onSaveData || gridConfig.saveDataFunction;
        const onDataSaved = gridConfig.onDataSaved || gridConfig.onAfterSave; // 저장 후 콜백
        const onDataSaveError = gridConfig.onDataSaveError || gridConfig.onSaveError; // 저장 실패 콜백
        
        // editurl이 빈 문자열이거나 'local'인 경우에도 onSaveData가 있으면 API 저장 사용
        // API 저장 콜백이 있는 경우
        if (saveDataFunction && typeof saveDataFunction === 'function') {
            $(gridId).jqGrid('navGrid', pagerId, navGridOptions,
                // editOptions (수정)
                {
                    closeAfterEdit: true,
                    reloadAfterSubmit: false,
                    beforeSubmit: function(postdata, formid) {
                        const self = this;
                        // Ensure primary key is present in postdata
                        try {
                            const rowId = $(gridId).jqGrid('getGridParam', 'selrow');
                            if (rowId && !postdata.id) {
                                postdata.id = rowId;
                            }
                            if (!postdata.no && rowId) {
                                const rowData = $(gridId).jqGrid('getRowData', rowId);
                                if (rowData && rowData.no) {
                                    postdata.no = rowData.no;
                                }
                            }
                        } catch (e) {
                            // ignore
                        }
                        // 공통 닫기 함수
                        const closeEditDialog = () => {
                                const gridIdOnly = gridId.replace('#', '');
                                const editModal = $('#editmod' + gridIdOnly);
                                const editDialog = editModal.closest('.ui-jqdialog');
                                
                              
								if (editDialog.length > 0) {
									// jQuery UI dialog 위젯으로 초기화된 경우에만 안전하게 닫기
									if ((typeof editDialog.dialog === 'function') && (editDialog.data('ui-dialog') || editDialog.hasClass('ui-dialog-content'))) {
										editDialog.dialog('close');
									} else {
										// 닫기 버튼 클릭 시도
										const closeBtn = $('.ui-jqdialog-titlebar-close', editDialog);
                                        
										if (closeBtn.length > 0) {
											closeBtn.trigger('click');
										} else {
											// 직접 제거
											editDialog.remove();
										}
									}
                                }
                                // 편집 모드 종료
                                const selRow = $(gridId).jqGrid('getGridParam', 'selrow');
                                if (selRow) { try { $(gridId).jqGrid('restoreRow', selRow); } catch (e) {} }
                        };
                        // API를 통한 수정 처리 (비동기)
                        Promise.resolve(saveDataFunction('edit', postdata))
                            .then(() => { if (onDataSaved) { onDataSaved('edit', postdata); } })
                            .catch((error) => { if (onDataSaveError) { onDataSaveError('edit', postdata, error); } })
                            .finally(() => { setTimeout(closeEditDialog, 100); });
                        return [false]; // 요청 차단, 수동 처리
                    }
                },
                // addOptions (추가)
                {
                    closeAfterAdd: false,
                    reloadAfterSubmit: false,
                    beforeSubmit: function(postdata, formid) {
                        const resetAddForm = () => {
                            const gridIdOnly = gridId.replace('#', '');
                            const form = $('#FrmGrid_' + gridIdOnly);
                            if (form.length > 0) {
                                if (form[0] && typeof form[0].reset === 'function') {
                                    form[0].reset();
                                }
                                // 보조적으로 값 초기화
                                $('input[type="text"], input[type="number"], input[type="tel"], input[type="date"], input[type="email"], textarea', form).val('');
                                $('input[type="checkbox"]', form).prop('checked', false);
                                $('select', form).prop('selectedIndex', 0).trigger('change');
                                if ($.fn.datepicker) {
                                    $('input.hasDatepicker', form).each(function(){ try { $(this).datepicker('setDate', null); } catch(e){} });
                                }
                            }
                        };
                        // API를 통한 추가 처리 (비동기)
                        Promise.resolve(saveDataFunction('add', postdata))
                            .then(() => { if (onDataSaved) { onDataSaved('add', postdata); } })
                            .catch((error) => { if (onDataSaveError) { onDataSaveError('add', postdata, error); } })
                            .finally(() => { setTimeout(resetAddForm, 100); });
                        return [false]; // 요청 차단, 수동 처리
                    }
                },
                // delOptions (삭제)
                {
                    reloadAfterSubmit: false,
                    beforeSubmit: function(postdata, formid) {
                        // API를 통한 삭제 처리 (비동기)
                        const rowId = (postdata && postdata.id) ? postdata.id : postdata;
                        const delData = { id: rowId, no: rowId };
                        const closeDelDialog = () => {
                            const gridIdOnly = gridId.replace('#', '');
                            const delModal = $('#delmod' + gridIdOnly);
                            const delDialog = delModal.closest('.ui-jqdialog');
                            if (delDialog.length > 0) {
                                if ((typeof delDialog.dialog === 'function') && (delDialog.data('ui-dialog') || delDialog.hasClass('ui-dialog-content'))) {
                                    delDialog.dialog('close');
                                } else {
                                    const closeBtn = $('.ui-jqdialog-titlebar-close', delDialog);
                                    if (closeBtn.length > 0) { closeBtn.trigger('click'); } else { delDialog.remove(); }
                                }
                            }
                        };
                        Promise.resolve(saveDataFunction('del', delData))
                            .then(() => { if (onDataSaved) { onDataSaved('del', delData); } })
                            .catch((error) => { if (onDataSaveError) { onDataSaveError('del', delData, error); } })
                            .finally(() => { setTimeout(closeDelDialog, 100); });
                        return [false]; // 요청 차단, 수동 처리
                    }
                }
            );
        }
        // 클라이언트 측 편집 사용 시 편집 옵션 추가 (서버 요청 방지)
        else if (useClientSideEditing) {
            $(gridId).jqGrid('navGrid', pagerId, navGridOptions,
                // editOptions (세 번째 인자)
                {
                    closeAfterEdit: true,
                    reloadAfterSubmit: false,
                    afterSubmit: function(response, postdata) {
                        // 클라이언트 측 편집 사용 시 서버 요청 없이 즉시 성공 반환
                        return [true, "", ""];
                    }
                },
                // addOptions (네 번째 인자)
                {
                    closeAfterAdd: true,
                    reloadAfterSubmit: false,
                    afterSubmit: function(response, postdata) {
                        // 클라이언트 측 편집 사용 시 서버 요청 없이 즉시 성공 반환
                        return [true, "", ""];
                    }
                },
                // delOptions (다섯 번째 인자)
                {
                    reloadAfterSubmit: false,
                    afterSubmit: function(response, postdata) {
                        // 클라이언트 측 편집 사용 시 서버 요청 없이 즉시 성공 반환
                        return [true, "", ""];
                    }
                }
            );
        } else {
            // 일반 서버 요청 사용 시 기본 navGrid 호출
            $(gridId).jqGrid('navGrid', pagerId, navGridOptions);
        }
        
        // 페이지네이션 설정 (별도로 추가)
        $(gridId).jqGrid('navGrid', pagerId, {
            pgbuttons: true,
            pgtext: "페이지 {0} / {1}",
            pginput: true,
            recordtext: "총 {0}개 중 {1}~{2}개 표시",
            emptyrecords: "표시할 데이터가 없습니다."
        });
        
        // 컬럼 선택기 버튼 추가
        $(gridId).jqGrid('navButtonAdd', pagerId, {
            caption: "컬럼",
            title: "컬럼 표시/숨김 및 순서 설정",
            buttonicon: "ui-icon-calculator",
            onClickButton: function() {
                window.commonGridInstance.showColumnSelector();
            }
        });
        
        // Excel 내보내기 버튼 추가
        $(gridId).jqGrid('navButtonAdd', pagerId, {
            caption: "Excel",
            title: "Excel 파일로 내보내기",
            buttonicon: "ui-icon-document",
            onClickButton: function() {
                window.commonGridInstance.exportData();
            }
        });
        
        // 기본 필터 툴바 추가
        $(gridId).jqGrid('filterToolbar', {
            searchOnEnter: true,
            defaultSearch: "cn"
        });
         
        

        /*
        // 그리드 제목에 크기초기화 아이콘 추가
        setTimeout(() => {
            const gridTitle = $('.ui-jqgrid-title');
            if (gridTitle.length > 0) {
                gridTitle.css({
                    'position': 'relative',
                    'text-align': 'center',
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'font-size': '18px',
                    'font-weight': 'bold'
                });
                
                // 기존 크기초기화 아이콘 제거
                $('.column-width-reset-icon').remove();
                
                // 크기초기화 아이콘 추가 (제목 앞에)
                const resetIcon = $('<span class="column-width-reset-icon" title="컬럼 크기 초기화" style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #007bff; font-size: 18px; padding: 8px; border-radius: 4px; background: transparent; border: none; transition: all 0.2s; display: inline-block; line-height: 1;">⤢</span>');
                
                resetIcon.hover(
                    function() { $(this).css({'background': '#007bff', 'color': 'white', 'border-radius': '4px'}); },
                    function() { $(this).css({'background': 'transparent', 'color': '#007bff'}); }
                );
                
                resetIcon.click(function() {
                    window.commonGridInstance.resetColumnWidths();
                });
                
                gridTitle.prepend(resetIcon);
            }
        }, 500); */
        
        // 창 크기 변경 시 그리드 크기 자동 조절
        $(window).on('resize', function() {
            if (window.commonGridInstance) {
                setTimeout(() => {
                    window.commonGridInstance.autoResize();
                }, 100);
            }
        });
        
        // 그리드 초기화 완료 후 이벤트 리스너 등록
        setTimeout(() => {
            if (window.commonGridInstance) {
                window.commonGridInstance.setupColumnResizeEvents();
            }
        }, 1000);
        
        // 그리드 초기화 완료 플래그 해제
        if (window.commonGridInstance) {
            window.commonGridInstance.isInitializing = false;
        }
        
        return true;
        
    } catch (e) {
        console.error('공통 그리드 초기화 중 오류 발생:', e);
        showError('그리드 초기화 중 오류가 발생했습니다: ' + e.message);
        return false;
    }
}

// ============================================
// 공통 페이지 초기화 함수들
// ============================================

// 현재 로드된 스크립트 파일명에서 페이지 접두사 추출
function getPagePrefix() {
    let pagePrefix = '';
    try {
        const scripts = document.querySelectorAll('script[src*="pages/"]');
        if (scripts.length > 0) {
            const scriptSrc = scripts[scripts.length - 1].src;
            let fileName = scriptSrc.split('/').pop();
            fileName = fileName.split('?')[0];
            pagePrefix = fileName.replace('.js', '').replace('.min', '');
        }
    } catch (e) {
        console.warn('페이지 접두사 추출 실패:', e);
    }
    return pagePrefix;
}

// 그리드 초기화 (공통 함수 - getPageConfig를 전역에서 가져옴)
function initMainGrid() {
    try {
        // 전역 getPageConfig 함수 확인
        if (typeof window.getPageConfig !== 'function') {
            throw new Error('getPageConfig 함수가 정의되지 않았습니다. 페이지별 스크립트에서 getPageConfig를 window.getPageConfig로 정의해야 합니다.');
        }
        
        const config = window.getPageConfig();
        
        // 그리드 컨테이너 생성 (표준화된 함수 사용)
        if (!CommonGrid.ensureGridContainer('#MainGrid', '#MainPager')) {
            return;
        }
        
        // 저장된 그리드 설정 로드 (페이지 파일명 기반 localStorage 키 사용)
        const pagePrefix = config.apiEndpoint; // apiEndpoint가 페이지 파일명과 동일
        const savedWidths = localStorage.getItem(`${pagePrefix}_grid_column_widths`) ? JSON.parse(localStorage.getItem(`${pagePrefix}_grid_column_widths`)) : null;
        const savedOrder = localStorage.getItem(`${pagePrefix}_grid_column_order`) ? JSON.parse(localStorage.getItem(`${pagePrefix}_grid_column_order`)) : null;
        const savedVisibility = localStorage.getItem(`${pagePrefix}_grid_column_visibility`) ? JSON.parse(localStorage.getItem(`${pagePrefix}_grid_column_visibility`)) : null;
        
        // 컬럼 모델 처리 (표준화된 함수 사용)
        const processedColumns = CommonGrid.processColumnModel(
            config.columns.names, 
            config.columns.model, 
            savedWidths, 
            savedOrder, 
            savedVisibility
        );
        
        // 그리드 설정
        const gridConfig = {
            data: [],
            datatype: "local",
            colNames: processedColumns.colNames,
            colModel: processedColumns.colModel,
            rowNum: 20,
            rowList: [10, 20, 30, 50],
            pager: '#MainPager',
            sortname: config.grid.sortname,
            sortorder: config.grid.sortorder,
            viewrecords: true,
            caption: config.grid.caption,
            height: 500,
            width: CommonGrid.getGridWidth(),
            editurl: '',
            cellEdit: false,
            multiselect: true,
            scroll: true,
            scrollrows: false,
            scrollTimeout: 20,
            search: false,
            // config.grid의 모든 추가 속성을 그리드 설정에 병합 (grouping, groupingView 등)
            ...(config.grid.grouping !== undefined && { grouping: config.grid.grouping }),
            ...(config.grid.groupingView && { groupingView: config.grid.groupingView }),
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
            onSelectRow: function(id) {},
            onSelectAll: function(aRowids, status) {},
            onSaveData: (oper, postdata) => saveData(oper, postdata),
            onDataSaved: function(oper, postdata) {
                const msgMap = {
                    'add': config.messages.add,
                    'edit': config.messages.edit,
                    'del': config.messages.delete
                };
                showMessage(msgMap[oper] || '처리되었습니다.');
                loadDataList(1, 20);
            },
            onDataSaveError: function(oper, postdata, error) {
                const msgMap = {
                    'add': config.messages.addError,
                    'edit': config.messages.editError,
                    'del': config.messages.deleteError
                };
                showError((msgMap[oper] || '오류가 발생했습니다: ') + error.message);
            }
        };
        
        // 공통 그리드 초기화 사용
        const success = initCommonGrid('#MainGrid', '#MainPager', gridConfig, pagePrefix);
        
        if (success) {
            loadDataList(1, 20);
        } else {
            console.error('그리드 초기화 실패');
        }
        
    } catch (e) {
        console.error('그리드 초기화 중 오류 발생:', e);
        showError('그리드 초기화 중 오류가 발생했습니다: ' + e.message);
    }
}

// 데이터 목록 조회 (공통 함수)
async function loadDataList(page = 1, rows = 20) {
    try {
        if (typeof window.getPageConfig !== 'function') {
            throw new Error('getPageConfig 함수가 정의되지 않았습니다.');
        }
        
        const config = window.getPageConfig();
        const params = config.buildListParams(page, rows);
        const result = await callAPI(config.apiEndpoint, config.queries.list, params);
        
        let dataList = [];
        
        if (result && result.results && Array.isArray(result.results) && result.results.length > 0) {
            const firstResult = result.results[0];
            if (firstResult.selectResults && Array.isArray(firstResult.selectResults)) {
                dataList = firstResult.selectResults.map(item => config.transformListItem(item));
            }
        }
        
        if (dataList.length > 0) {
            $('#MainGrid').jqGrid('clearGridData');
            $('#MainGrid').jqGrid('setGridParam', { data: dataList });
            $('#MainGrid').trigger('reloadGrid');
          //  showMessage(`검색 결과 ${dataList.length}건을 불러왔습니다.`);
        } else {
            $('#MainGrid').jqGrid('clearGridData');
            showMessage('조회된 데이터가 없습니다.');
        }
        
    } catch (e) {
        console.error('목록 조회 중 오류:', e);
        showError('목록 조회 중 오류가 발생했습니다.');
    }
}

// 데이터 저장 (추가/수정/삭제) (공통 함수)
async function saveData(oper, postdata) {
    try {
        if (typeof window.getPageConfig !== 'function') {
            throw new Error('getPageConfig 함수가 정의되지 않았습니다.');
        }
        
        const config = window.getPageConfig();
        
        // 벨리데이션
        if (oper !== 'del') {
            config.validate(oper, postdata);
        }

        // 쿼리 ID 및 파라미터 구성
        const queryMap = {
            'add': config.queries.add,
            'edit': config.queries.edit,
            'del': config.queries.delete
        };
        const queryId = queryMap[oper];
        if (!queryId) {
            throw new Error('알 수 없는 작업 유형입니다.');
        }
        
        const params = config.transformInputData(postdata, oper);
        const result = await callAPI(config.apiEndpoint, queryId, params);
        
        if (result && result.status === 'success') {
            return result;
        } else {
            throw new Error(result?.message || '저장 중 오류가 발생했습니다.');
        }
        
    } catch (e) {
        console.error('데이터 저장 중 오류:', e);
        throw e;
    }
}

// ============================================
// 페이지별 추가 쿼리 호출 함수
// ============================================
// config의 queries에 정의된 추가 쿼리를 호출할 수 있는 범용 함수
// 사용 예: 
//   - callPageQuery('sample', 'hent', { '1': 'param1' })  // 엔드포인트 지정
//   - callPageQuery(null, 'hent', { '1': 'param1' })  // 엔드포인트 생략시 config.apiEndpoint 사용

async function callPageQuery(endpoint = null, queryKey, params = {}) {
    try {
        if (typeof window.getPageConfig !== 'function') {
            throw new Error('getPageConfig 함수가 정의되지 않았습니다.');
        }
        
        const config = window.getPageConfig();
        
        // queries 객체에서 쿼리 ID 찾기
        if (!config.queries || !config.queries[queryKey]) {
            throw new Error(`쿼리 키 '${queryKey}'가 config.queries에 정의되지 않았습니다.`);
        }
        
        const queryId = config.queries[queryKey];
        
        // 엔드포인트 결정: 파라미터로 전달된 경우 사용, 없으면 config의 apiEndpoint 사용
        const apiEndpoint = endpoint || config.apiEndpoint;
        
        const result = await callAPI(apiEndpoint, queryId, params);
        
        return result;
        
    } catch (e) {
        console.error(`페이지 쿼리 호출 중 오류 (${queryKey}):`, e);
        showError(`쿼리 호출 중 오류가 발생했습니다: ${e.message}`);
        throw e;
    }
}
