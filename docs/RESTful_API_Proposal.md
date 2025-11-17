# RESTful API 전환 제안서
## Query ID 기반 → RESTful API 개선 방안

---

## 📊 현황 분석

### 현재 구조의 문제점 (실제 코드 기준)

#### 1. **보안 취약점 (Critical)**
```xml
<!-- 현재 방식: SQL 구조가 프론트엔드에 노출 -->
<Q030>
INSERT INTO employee (
    name, birthDate, mobile_phone, ...
) VALUES ('[1]', '[2]', '[3]', ...);
</Q030>
```
- **테이블명, 컬럼명, 관계 구조 노출**
- **SQL 인젝션 위험** (문자열 치환 방식)
- **보안 감사 시 감점 요인**

#### 2. **개발 생산성 저하**
```javascript
// 현재: 각 페이지마다 200+ 줄의 설정 코드 필요
// 발견된 페이지: 9개 이상
// - employee.js (250줄)
// - beneficiary-registration.js (500+줄)
// - 각 페이지마다 동일한 패턴 반복

transformInputData: (postdata, oper) => {
    if (oper === 'add') {
        return {
            '1': postdata.name || '',      // 의미 불명확
            '2': postdata.birthDate,       // 숫자만으로 추측 불가
            '3': postdata.phone || '',
            // ... 매 페이지마다 작성 필요
        };
    }
}
```

#### 3. **유지보수 비용 증가**
- **새 기능 추가 시**: 3-4개 파일 수정 필요
  - XML 쿼리 파일
  - 프론트엔드 쿼리 ID 매핑
  - 파라미터 변환 로직
  - 데이터 변환 로직
- **버그 수정 시**: 영향 범위 파악 어려움
- **신입 개발자 온보딩**: 학습 곡선 가파름

---

## 💰 비즈니스 영향 분석

### 예상 개선 효과

| 항목 | 현재 방식 | RESTful API | 개선율 |
|------|-----------|-------------|--------|
| **신규 페이지 개발 시간** | 1-2일 | 0.5일 | **50-75% ↓** |
| **버그 수정 시간** | 2-4시간 | 0.5-1시간 | **50-75% ↓** |
| **신입 개발자 온보딩** | 2-3주 | 3-5일 | **60-70% ↓** |
| **보안 이슈 발생 가능성** | 높음 | 낮음 | **80% ↓** |
| **API 문서 작성 시간** | 수동 (2시간/페이지) | 자동 (5분) | **95% ↓** |

### 인력/시간 절감 효과 (연간 추정)

**현재 프로젝트 기준:**
- 관리 페이지: **9개 이상**
- 신규 페이지 추가: 연간 **20-30개** 예상
- 각 페이지별 개발 시간 절감: **0.5-1.5일**

**연간 절감 시간:**
```
(0.5일 × 30개 페이지) + (버그 수정 시간 절감)
= 최소 15일 + 추가 유지보수 시간
≈ 약 1개월 인건비 절감
```

---

## 🔄 RESTful API 전환 방안

### Before (현재 방식)

```javascript
// 1. 쿼리 ID 정의
queries: {
    list: 'Q010',
    add: 'Q030',
    edit: 'Q040',
    delete: 'Q050'
}

// 2. 파라미터 변환 (200+ 줄)
transformInputData: (postdata, oper) => {
    if (oper === 'add') {
        return {
            '1': postdata.name || '',
            '2': postdata.birthDate,
            '3': postdata.phone || '',
            // ... 8개 이상의 파라미터 매핑
        };
    }
    // ...
}

// 3. 데이터 변환
transformListItem: (item) => ({
    no: item.employee_id || item.no || '',
    name: item.name || '',
    // ... 10개 이상의 필드 매핑
})

// 4. API 호출
await callAPI('employee', 'Q010', { '1': '20', '2': '0' });
```

### After (RESTful API)

```javascript
// 1. 단순한 API 호출
// GET /api/employees?page=1&limit=20
const employees = await fetch('/api/employees?page=1&limit=20');

// 2. POST /api/employees (자동 직렬화)
await fetch('/api/employees', {
    method: 'POST',
    body: JSON.stringify({
        name: postdata.name,
        birthDate: postdata.birthDate,
        phone: postdata.phone
        // 의미가 명확한 파라미터
    })
});

// 3. PUT /api/employees/:id
await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
});

// 4. DELETE /api/employees/:id
await fetch(`/api/employees/${id}`, {
    method: 'DELETE'
});
```

### 코드 라인 수 비교

| 항목 | 현재 방식 | RESTful API | 감소율 |
|------|-----------|-------------|--------|
| **페이지별 설정 파일** | 200-500줄 | 50-100줄 | **60-80% ↓** |
| **파라미터 변환 로직** | 100-200줄 | 0-20줄 | **90% ↓** |
| **데이터 변환 로직** | 50-100줄 | 10-20줄 | **80% ↓** |

---

## 🛡️ 보안 강화 효과

### 현재 방식의 보안 위험

1. **SQL 구조 노출**
   - 테이블명, 컬럼명이 프론트엔드 코드에 노출
   - 공격자가 데이터베이스 구조 파악 가능

2. **SQL 인젝션 위험**
   ```xml
   VALUES ('[1]', '[2]', '[3]', ...)  <!-- 문자열 치환 -->
   ```
   - 파라미터 바인딩 없이 문자열 치환 사용 시 취약

3. **정보 유출**
   - 비즈니스 로직이 SQL 쿼리로 노출
   - 내부 프로세스 추측 가능

### RESTful API 보안 강화

1. **구조 은폐**: 테이블명, 컬럼명이 응답에만 노출
2. **파라미터 바인딩**: Prepared Statement 필수 사용
3. **검증 로직**: 서버 측에서 통합 관리
4. **권한 관리**: API 레벨에서 세밀한 제어 가능

---

## 📈 확장성 및 표준 준수

### 산업 표준 준수

- ✅ **RESTful API**: HTTP 표준 방법론
- ✅ **OpenAPI/Swagger**: 자동 문서화
- ✅ **REST Client 도구**: Postman, Insomnia 등 즉시 사용 가능
- ✅ **모바일 앱 연동**: 동일 API로 재사용
- ✅ **타사 시스템 연동**: 표준 방식으로 용이

### 개발 생태계 활용

```javascript
// OpenAPI 자동 생성 예시
// GET /api/employees
// POST /api/employees
// PUT /api/employees/{id}
// DELETE /api/employees/{id}

// → Swagger UI로 자동 문서화
// → 프론트엔드 코드 자동 생성 가능
// → API 테스트 자동화
```

---

## 🚀 전환 로드맵

### Phase 1: 핵심 API 전환 (2주)
- [ ] 직원 관리 API
- [ ] 수급자 관리 API
- [ ] 공통 CRUD 패턴 정립

### Phase 2: 확장 전환 (2-3주)
- [ ] 나머지 7개 페이지 API 전환
- [ ] 레거시 코드와 병행 운영 (하위 호환성 유지)

### Phase 3: 최적화 (1주)
- [ ] 레거시 코드 제거
- [ ] 문서화 완료
- [ ] 팀 교육

**총 예상 기간: 5-6주**
**현재 방식 유지 시 예상 추가 비용: 연간 1개월 이상**

---

## 💡 결론 및 권장사항

### 즉시 전환을 권장하는 이유

1. **신규 프로젝트**: 전환 비용이 최소
2. **장기 유지보수**: 시간이 지날수록 전환 비용 증가
3. **보안 강화**: 보안 이슈 예방에 비용 대비 효과 큼
4. **개발 생산성**: 즉각적인 생산성 향상
5. **팀 역량 강화**: 표준 기술 스택 습득

### 리스크 최소화 방안

- ✅ **점진적 전환**: 레거시와 병행 운영 가능
- ✅ **하위 호환성**: 기존 코드와 함께 동작
- ✅ **검증된 방식**: 산업 표준 사용
- ✅ **기존 코드 재사용**: 공통 함수 구조 유지 가능

---

## 📞 다음 단계

1. **POC (Proof of Concept)**: 1개 페이지로 검증 (1주)
2. **효과 측정**: 개발 시간, 코드 품질 비교
3. **팀 리뷰**: 검증 결과 공유 및 의견 수렴
4. **전면 전환 결정**: POC 성공 시 전면 적용

---

**작성일**: 2024년
**제안자**: 개발팀
**검토 필요 사항**: POC 진행 후 최종 결정

