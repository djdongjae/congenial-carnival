// 개발모드 여부 설정 (true면 샘플 데이터 표출, false면 실제 API 통신)
const dev = true;

// 샘플 데이터 정의
const sampleData = [
    {
        no: 1,
        name: '홍길동',
        birthDate: '1990-01-01',
        job: '개발',
        position: '대리',
        hireDate: '2018-03-01',
        status: '퇴사',
        supportCount: 3,
        phone: '010-1234-5678',
        account: 'hong.gildong'
    },
    {
        no: 2,
        name: '김영희',
        birthDate: '1985-07-17',
        job: '기획',
        position: '과장',
        hireDate: '2015-11-15',
        status: '재직',
        supportCount: 5,
        phone: '010-2345-6789',
        account: 'kim.younghee'
    },
    {
        no: 3,
        name: '박철수',
        birthDate: '1979-02-22',
        job: '경리',
        position: '부장',
        hireDate: '2010-06-23',
        status: '재직',
        supportCount: 1,
        phone: '010-3456-7890',
        account: 'park.chulsu'
    },
    {
        no: 4,
        name: '이영수',
        birthDate: '1992-05-12',
        job: '디자인',
        position: '사원',
        hireDate: '2021-01-10',
        status: '휴직',
        supportCount: 2,
        phone: '010-4567-8901',
        account: 'lee.youngsoo'
    }
    // 필요시 추가...
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
            delete: 'Q050',   // 삭제 (공통 함수 자동 처리)
            hent: 'Q080',  // 추가 쿼리 예제
        },
        
      
        
        // 컬럼 정의 (컬럼명, 컬럼 모델)
        columns: {
            names: ['No', '직원명', '생년월일', '직무', '직위', '입사일', '고용상태', '지원사/대상자수', '휴대전화', '사용계정'],
            model: [
                { name: 'no', index: 'no', sorttype: "int", key: true, width: 60 },
                { name: 'name', index: 'name', editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'birthDate', index: 'birthDate', sorttype: "date", editable: true, editrules: { required: true }, search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], dataInit: function(elem) { $(elem).datepicker({ dateFormat: 'yy-mm-dd', showMonthAfterYear: true, yearSuffix: '년' }); } }, width: 100 },
                { name: 'job', index: 'job', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'position', index: 'position', editable: true, search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'hireDate', index: 'hireDate', sorttype: "date", editable: true, editrules: { required: true },search: true, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], dataInit: function(elem) { $(elem).datepicker({ dateFormat: 'yy-mm-dd', showMonthAfterYear: true, yearSuffix: '년' }); } }, width: 100 },
                { name: 'status', index: 'status', editable: true, editrules: { required: true },edittype: "select", editoptions: { value: "0:재직;1:휴직;9:퇴사" }, search: true, searchoptions: { sopt: ['eq', 'ne'], value: ":전체;0:재직;1:휴직;9:퇴사" }, width: 80 },
                { name: 'supportCount', index: 'supportCount', search: true, searchoptions: { sopt: ['cn'] }, width: 100 },
                { name: 'phone', index: 'phone', editable: true,  search: true, searchoptions: { sopt: ['cn'] }, width: 120 },
                { name: 'account', index: 'account', editable: true, editrules: { required: true },search: true, searchoptions: { sopt: ['cn'] }, width: 150 }
            ]
        },
        
          // 그리드 설정
          grid: {
            caption: "직원 목록",
            sortname: 'no',
            sortorder: "asc"
        },
        // 메시지 텍스트
        messages: {
            add: '직원 정보가 추가되었습니다.',
            edit: '직원 정보가 수정되었습니다.',
            delete: '직원 정보가 삭제되었습니다.',
            addError: '직원 정보 추가 중 오류가 발생했습니다: ',
            editError: '직원 정보 수정 중 오류가 발생했습니다: ',
            deleteError: '직원 정보 삭제 중 오류가 발생했습니다: '
        },
        
        // 데이터 변환 함수 (API 응답 -> 그리드 데이터)
        transformListItem: (item) => ({
            no: item.employee_id || item.no || '',
            name: item.name || '',
            birthDate: item.birthDate || '',
            job: item.job || '',
            position: item.position || '',
            hireDate: item.hireDate || '',
            status: item.status || '',
            supportCount: item.supportCount || '-',
            phone: item.phone || '',
            account: item.account || ''
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
                    '1': postdata.name || '',
                    '2': postdata.birthDate,
                    '3': postdata.phone || '',
                    '4': postdata.hireDate || '',
                    '5': postdata.status || '0',
                    '6': postdata.job || '',
                    '7': postdata.position || '',
                    '8': postdata.account || ''
                };
            } else if (oper === 'edit') {
                return {
                    '1': postdata.name || '',
                    '2': postdata.birthDate,
                    '3': postdata.phone || '',
                    '4': postdata.hireDate || '',
                    '5': postdata.status || '0',
                    '6': postdata.job || '',
                    '7': postdata.position || '',
                    '8': postdata.id || postdata.no || '',
                    '9': postdata.account || ''
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
            if (!data.name || String(data.name).trim() === '') missing.push('직원명');
            if (!data.birthDate || String(data.birthDate).trim() === '') missing.push('생년월일');
            if (operType === 'add' && (!data.phone || String(data.phone).trim() === '')) missing.push('휴대전화');
            const statusCode = String(data.status ?? '0');
            if (!['0','1','9'].includes(statusCode)) {
                throw new Error('상태값은 0(재직), 1(휴직), 9(퇴사)만 허용됩니다.');
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
