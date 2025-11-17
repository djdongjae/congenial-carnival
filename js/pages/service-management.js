// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의 (서비스 분류 테이블)
const sampleData = [
    {
        no: 1,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '활동',
        detail: '안전·안부확인',
        subDetail: '',
        duration: '10분',
        operationType: '참여',
        provideCycle: '주1회',
        frequency: '주1회'
    },
    {
        no: 2,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '활동',
        detail: '심리안정',
        subDetail: '',
        duration: '10분',
        operationType: '',
        provideCycle: '주1회',
        frequency: '주1회'
    },
    {
        no: 3,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '활동',
        detail: '생활안전점검',
        subDetail: '',
        duration: '10분',
        operationType: '',
        provideCycle: '주1회',
        frequency: '주1회'
    },
    {
        no: 4,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '활동',
        detail: '일반',
        subDetail: '',
        duration: '10분',
        operationType: '',
        provideCycle: '주1회',
        frequency: '주1회'
    },
    {
        no: 5,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '전화',
        detail: '입실',
        subDetail: '',
        duration: '5분',
        operationType: '',
        provideCycle: '주3회',
        frequency: '주2회'
    },
    {
        no: 6,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '전화',
        detail: '퇴실',
        subDetail: '',
        duration: '5분',
        operationType: '',
        provideCycle: '주3회',
        frequency: '주2회'
    },
    {
        no: 7,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '전화',
        detail: '일반',
        subDetail: '',
        duration: '5분',
        operationType: '',
        provideCycle: '주3회',
        frequency: '주2회'
    },
    {
        no: 8,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: '정보',
        detail: '일반',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 9,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: 'ICT',
        detail: 'ICT 관리·교육',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 10,
        serviceDivision: '직접서비스',
        category: '안전지원',
        type: 'ICT',
        detail: 'ICT 안전 인프라관리',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 11,
        serviceDivision: '직접서비스',
        category: '사회참여',
        type: '사회관계 향상',
        detail: '여가활동',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 12,
        serviceDivision: '직접서비스',
        category: '사회참여',
        type: '사회관계 향상',
        detail: '공동체활동',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 13,
        serviceDivision: '직접서비스',
        category: '사회참여',
        type: '사회관계 향상',
        detail: '문화활동',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 14,
        serviceDivision: '직접서비스',
        category: '성문화',
        type: '자존감',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 15,
        serviceDivision: '직접서비스',
        category: '성문화',
        type: '감정조절',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 16,
        serviceDivision: '직접서비스',
        category: '성문화',
        type: '정서교육',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 17,
        serviceDivision: '직접서비스',
        category: '성문화',
        type: '성교육',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 18,
        serviceDivision: '직접서비스',
        category: '성문화',
        type: '보건교육',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 19,
        serviceDivision: '직접서비스',
        category: '정보교육',
        type: '정보화교육',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 20,
        serviceDivision: '직접서비스',
        category: '일상생활 지원',
        type: '이동활동지원',
        detail: '기사제공',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 21,
        serviceDivision: '직접서비스',
        category: '일상생활 지원',
        type: '식사지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 22,
        serviceDivision: '직접서비스',
        category: '일상생활 지원',
        type: '생활지원',
        detail: '청소지원',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 23,
        serviceDivision: '직접서비스',
        category: '일상생활 지원',
        type: '생활지원',
        detail: '세탁지원',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 24,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '주거개선사업 지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 25,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '주거환경개선 지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 26,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '주택임대료 지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 27,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '의료서비스',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 28,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '건강지원사업',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 29,
        serviceDivision: '연계서비스',
        category: '연계서비스',
        type: '간호사 지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 30,
        serviceDivision: '특화서비스',
        category: '특화서비스',
        type: '개별서비스',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 31,
        serviceDivision: '특화서비스',
        category: '특화서비스',
        type: '맞춤형 사례관리',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 32,
        serviceDivision: '돌봄서비스',
        category: '방문상담',
        type: '계약체결',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 33,
        serviceDivision: '돌봄서비스',
        category: '방문상담',
        type: '일반상담 및 지원',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 34,
        serviceDivision: '돌봄서비스',
        category: '정서지원',
        type: '가족상담',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 35,
        serviceDivision: '돌봄서비스',
        category: '정서지원',
        type: '전화상담',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 36,
        serviceDivision: '돌봄서비스',
        category: '정서지원',
        type: '전화방문',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    },
    {
        no: 37,
        serviceDivision: '돌봄서비스',
        category: '정서지원',
        type: '연락망교육',
        detail: '',
        subDetail: '',
        duration: '',
        operationType: '',
        provideCycle: '',
        frequency: ''
    }
];

// callAPI 함수 오버라이드 (dev=true 시 샘플 데이터 반환)
const originalCallAPI = window.callAPI;
window.callAPI = async function(endpoint, queryId, params = {}) {
    if (!dev) {
        if (typeof originalCallAPI === 'function') {
            return await originalCallAPI(endpoint, queryId, params);
        }
        throw new Error('callAPI 원본 함수가 정의되어 있지 않습니다.');
    }

    console.log('[DEV MODE] API 호출:', endpoint, queryId, params);

    if (queryId === 'Q010') {
        return {
            results: [
                {
                    selectResults: sampleData,
                    totalResults: sampleData.length
                }
            ],
            status: 'success'
        };
    } else if (queryId === 'Q030' || queryId === 'Q040' || queryId === 'Q050') {
        return {
            status: 'success',
            message: '개발모드에서는 실제 저장되지 않습니다.'
        };
    }

    return {
        status: 'success',
        results: [
            {
                selectResults: [],
                totalResults: 0
            }
        ],
        message: '개발모드 샘플'
    };
};

// ==========================================
// 페이지별 커스터마이즈 설정 (여기만 수정하면 됨)
// ==========================================

function getPageConfig() {
    return {
        apiEndpoint: getPagePrefix(),
        queries: {
            list: 'Q010',
            add: 'Q030',
            edit: 'Q040',
            delete: 'Q050',
            hent: 'Q080'
        },
        columns: {
            names: [
                '',
                '구분',
                '대분류',
                '중분류',
                '소분류',
                '세부분류',
                '쇼유시간',
                '제공주기-중점',
                '제공주기-일반'
            ],
            model: [
                { name: 'no', index: 'no', sorttype: 'int', key: true, hidden: true, search: false },
                { name: 'serviceDivision', index: 'serviceDivision', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'category', index: 'category', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 130 },
                { name: 'type', index: 'type', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 140 },
                { name: 'detail', index: 'detail', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 150 },
                { name: 'subDetail', index: 'subDetail', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 150 },
                { name: 'duration', index: 'duration', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'provideCycle', index: 'provideCycle', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 140 },
                { name: 'frequency', index: 'frequency', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 140 }
            ]
        },
        grid: {
            caption: '서비스 목록',
            sortname: 'no',
            sortorder: 'asc'
        },
        messages: {
            add: '서비스 정보가 추가되었습니다.',
            edit: '서비스 정보가 수정되었습니다.',
            delete: '서비스 정보가 삭제되었습니다.',
            addError: '서비스 정보 추가 중 오류가 발생했습니다: ',
            editError: '서비스 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '서비스 정보 삭제 중 오류가 발생했습니다: '
        },
        transformListItem: (item) => ({
            no: item.service_id || item.no || '',
            serviceDivision: item.serviceDivision || item.division || '',
            category: item.category || '',
            type: item.type || item.middleCategory || '',
            detail: item.detail || item.minorCategory || '',
            subDetail: item.subDetail || item.detailCategory || '',
            duration: item.duration || item.requiredTime || '',
            provideCycle: item.provideCycle || item.provisionCycle || '',
            frequency: item.frequency || item.cycle || ''
        }),
        buildListParams: (page, rows) => ({
            '1': rows.toString(),
            '2': ((page - 1) * rows).toString()
        }),
        transformInputData: (postdata, oper) => {
            const baseParams = {
                '1': postdata.serviceDivision || '',
                '2': postdata.category || '',
                '3': postdata.type || '',
                '4': postdata.detail || '',
                '5': postdata.subDetail || '',
                '6': postdata.duration || '',
                '7': postdata.provideCycle || '',
                '8': postdata.frequency || ''
            };

            if (oper === 'add') {
                return baseParams;
            }

            if (oper === 'edit') {
                return {
                    ...baseParams,
                    '9': postdata.id || postdata.no || ''
                };
            }

            if (oper === 'del') {
                return {
                    '1': postdata.id || postdata.no || ''
                };
            }

            return {};
        },
        validate: (operType, data) => {
            const missing = [];

            if (!data.serviceDivision || String(data.serviceDivision).trim() === '') {
                missing.push('서비스구분');
            }

            if (!data.type || String(data.type).trim() === '') {
                missing.push('중분류');
            }

            if (missing.length > 0) {
                throw new Error('필수 항목 누락: ' + missing.join(', '));
            }
        }
    };
}

// getPageConfig를 전역 변수로 노출
window.getPageConfig = getPageConfig;


const mergeTargetColumns = ['serviceDivision', 'category', 'type', 'detail', 'subDetail'];

function mergeServiceGridCells() {
    const grid = $('#MainGrid');
    if (!grid || grid.length === 0) {
        return;
    }

    mergeTargetColumns.forEach((columnName, index) => mergeColumnCells(grid, columnName, index));
}

function normalizeCellValue(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return String(value).trim();
}

function hasSameGroup(baseRow, compareRow, columnIndex) {
    for (let i = 0; i <= columnIndex; i += 1) {
        const columnName = mergeTargetColumns[i];
        if (normalizeCellValue(baseRow[columnName]) !== normalizeCellValue(compareRow[columnName])) {
            return false;
        }
    }
    return true;
}

function mergeColumnCells(grid, columnName, columnIndex) {
    const gridId = grid.attr('id');
    if (!gridId) {
        return;
    }

    const dataIds = grid.jqGrid('getDataIDs');
    if (!dataIds || dataIds.length === 0) {
        return;
    }

    const cellSelector = (rowId) =>
        grid.find(`tr#${rowId} td[aria-describedby="${gridId}_${columnName}"]`);

    // 초기화: 이전 병합 정보 제거
    dataIds.forEach((rowId) => {
        const cell = cellSelector(rowId);
        if (cell && cell.length) {
            cell.removeAttr('rowspan');
            cell.css('display', '');
        }
    });

    let startIndex = 0;
    while (startIndex < dataIds.length) {
        const startRowId = dataIds[startIndex];
        const startCell = cellSelector(startRowId);
        if (!startCell || startCell.length === 0) {
            startIndex += 1;
            continue;
        }

        const baseRow = grid.jqGrid('getRowData', startRowId) || {};
        const baseText = normalizeCellValue(baseRow[columnName]);
        if (baseText === '') {
            startIndex += 1;
            continue;
        }

        let spanCount = 1;
        let inspectIndex = startIndex + 1;

        while (inspectIndex < dataIds.length) {
            const currentRowId = dataIds[inspectIndex];
            const currentRow = grid.jqGrid('getRowData', currentRowId) || null;
            if (!currentRow) {
                break;
            }

            const currentCell = cellSelector(currentRowId);
            if (!currentCell || currentCell.length === 0) {
                break;
            }

            if (!hasSameGroup(baseRow, currentRow, columnIndex)) {
                break;
            }

            spanCount += 1;
            inspectIndex += 1;
        }

        if (spanCount > 1) {
            startCell.attr('rowspan', spanCount);
            for (let hideIndex = startIndex + 1; hideIndex < startIndex + spanCount; hideIndex += 1) {
                const hiddenCell = cellSelector(dataIds[hideIndex]);
                if (hiddenCell && hiddenCell.length) {
                    hiddenCell.css('display', 'none');
                }
            }
        }

        startIndex += spanCount;
    }
}

const originalInitMainGrid = window.initMainGrid;
window.initMainGrid = function() {
    const result = typeof originalInitMainGrid === 'function'
        ? originalInitMainGrid()
        : undefined;

    const bindMergeHandler = () => {
        const grid = $('#MainGrid');
        if (!grid.length) {
            return false;
        }

        grid.off('jqGridGridComplete.serviceMerge')
            .on('jqGridGridComplete.serviceMerge', function() {
                mergeServiceGridCells();
            });

        return true;
    };

    if (!bindMergeHandler()) {
        // 그리드가 아직 생성되지 않았다면 약간의 지연 후 다시 시도
        setTimeout(bindMergeHandler, 100);
    }
    return result;
};
// ==========================================
// 페이지별 추가 쿼리 호출 예제
// ==========================================

async function callQuery(id) {
    try {
        const params = {
            '1': id.toString()
        };
        const result = await callPageQuery('service', 'hent', params);
        if (result) {
            showMessage('처리되었습니다.');
        }
    } catch (e) {
        console.error('쿼리 호출 중 오류:', e);
    }
}

