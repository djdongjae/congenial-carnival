# 백엔드 구조 분석 및 추정

## 🔍 프론트엔드 요청 패턴 분석

### 요청 형식
```javascript
POST https://talk2-api.silveredu.net/api/employee
Headers:
  Authorization: Bearer {token}
  Content-Type: application/json

Body:
{
  "query_ID": "Q010",
  "params": {
    "1": "20",    // LIMIT
    "2": "0"      // OFFSET
  }
}
```

### 응답 형식
```json
{
  "status": "success",
  "results": [{
    "selectResults": [...],
    "totalResults": 100
  }]
}
```

---

## 🏗️ 추정되는 Spring Boot 구조

### 1. 단일 컨트롤러 패턴 (가능성 높음)

```java
@RestController
@RequestMapping("/api")
public class QueryController {
    
    @Autowired
    private QueryService queryService;
    
    @PostMapping("/{endpoint}")
    public ResponseEntity<QueryResponse> executeQuery(
            @PathVariable String endpoint,
            @RequestBody QueryRequest request,
            HttpServletRequest httpRequest) {
        
        // 1. 인증 검증
        String token = httpRequest.getHeader("Authorization");
        // ... 토큰 검증 로직
        
        // 2. 엔드포인트와 쿼리 ID로 XML 파일 찾기
        // 예: endpoint="employee", query_ID="Q010"
        // → "api/employee.xml" 파일에서 "<Q010>" 태그 찾기
        
        // 3. 쿼리 실행
        QueryResponse response = queryService.executeQuery(
            endpoint, 
            request.getQuery_ID(), 
            request.getParams()
        );
        
        return ResponseEntity.ok(response);
    }
}
```

**특징:**
- 모든 `/api/*` 엔드포인트를 하나의 컨트롤러가 처리
- `endpoint` 파라미터로 XML 파일 경로 결정
- `query_ID`로 XML 내부 쿼리 찾기

---

### 2. QueryService (쿼리 실행 서비스)

```java
@Service
public class QueryService {
    
    @Autowired
    private QueryXmlLoader queryXmlLoader;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public QueryResponse executeQuery(String endpoint, String queryId, Map<String, String> params) {
        try {
            // 1. XML에서 쿼리 가져오기
            String sql = queryXmlLoader.getQuery(endpoint, queryId);
            
            // 2. 파라미터 바인딩
            // [1], [2], ... → ? 로 치환
            sql = bindParameters(sql, params);
            
            // 3. 쿼리 실행
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
            
            // 4. 응답 형식으로 변환
            QueryResponse response = new QueryResponse();
            response.setStatus("success");
            response.setResults(List.of(
                new QueryResult(results, results.size())
            ));
            
            return response;
            
        } catch (Exception e) {
            QueryResponse response = new QueryResponse();
            response.setStatus("error");
            response.setError(e.getMessage());
            return response;
        }
    }
    
    private String bindParameters(String sql, Map<String, String> params) {
        // [1] → ? 로 치환
        String result = sql;
        int paramIndex = 1;
        
        while (result.contains("[" + paramIndex + "]")) {
            String paramValue = params.get(String.valueOf(paramIndex));
            if (paramValue != null) {
                // SQL 인젝션 방지를 위한 이스케이프 처리
                result = result.replace("[" + paramIndex + "]", 
                    sanitizeParameter(paramValue));
            }
            paramIndex++;
        }
        
        // '[1]' 형식 처리 (문자열 파라미터)
        paramIndex = 1;
        while (result.contains("'[" + paramIndex + "]'")) {
            String paramValue = params.get(String.valueOf(paramIndex));
            if (paramValue != null) {
                result = result.replace("'[" + paramIndex + "]'", 
                    "'" + sanitizeString(paramValue) + "'");
            }
            paramIndex++;
        }
        
        return result;
    }
    
    private String sanitizeParameter(String value) {
        // SQL 인젝션 방지
        return value.replace("'", "''");
    }
    
    private String sanitizeString(String value) {
        // 문자열 파라미터 이스케이프
        return value.replace("'", "''");
    }
}
```

**특징:**
- XML에서 쿼리를 로드
- 파라미터 바인딩 처리
- JdbcTemplate으로 쿼리 실행
- **문제점**: 문자열 치환 방식이라 SQL 인젝션 위험

---

### 3. QueryXmlLoader (XML 파서)

```java
@Component
public class QueryXmlLoader {
    
    private Map<String, Document> xmlCache = new ConcurrentHashMap<>();
    
    public String getQuery(String endpoint, String queryId) {
        try {
            // 1. XML 파일 로드 (캐싱)
            Document doc = loadXmlFile(endpoint);
            
            // 2. queryId 태그 찾기
            // <queries><Q010>...</Q010></queries>
            NodeList nodes = doc.getElementsByTagName(queryId);
            if (nodes.getLength() == 0) {
                throw new QueryNotFoundException("Query " + queryId + " not found in " + endpoint);
            }
            
            // 3. 쿼리 텍스트 추출
            String query = nodes.item(0).getTextContent().trim();
            
            return query;
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to load query: " + endpoint + "/" + queryId, e);
        }
    }
    
    private Document loadXmlFile(String endpoint) {
        return xmlCache.computeIfAbsent(endpoint, key -> {
            try {
                // resources/api/{endpoint}.xml 파일 로드
                InputStream is = getClass()
                    .getResourceAsStream("/api/" + key + ".xml");
                
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                return builder.parse(is);
                
            } catch (Exception e) {
                throw new RuntimeException("Failed to load XML: " + key, e);
            }
        });
    }
}
```

**특징:**
- XML 파일을 메모리에 캐싱
- DOM 파서로 쿼리 추출
- `resources/api/` 디렉토리에 XML 파일 저장

---

### 4. DTO 클래스

```java
// 요청 DTO
public class QueryRequest {
    private String query_ID;
    private Map<String, String> params;
    
    // getters, setters
}

// 응답 DTO
public class QueryResponse {
    private String status;
    private List<QueryResult> results;
    private String error;
    private String message;
    
    // getters, setters
}

public class QueryResult {
    private List<Map<String, Object>> selectResults;
    private Integer totalResults;
    private String errorMessage;
    
    // getters, setters
}
```

---

### 5. 인증 처리 (JWT)

```java
@Component
public class AuthenticationFilter implements Filter {
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                        FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader("Authorization");
        
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            
            if (jwtTokenProvider.validateToken(token)) {
                String username = jwtTokenProvider.getUsernameFromToken(token);
                // SecurityContext에 사용자 정보 저장
                // ...
            }
        }
        
        chain.doFilter(request, response);
    }
}
```

---

### 6. 프로젝트 구조 (추정)

```
src/main/java/com/silveredu/talk2/
├── controller/
│   └── QueryController.java          # 단일 컨트롤러
├── service/
│   └── QueryService.java             # 쿼리 실행 로직
├── repository/
│   ├── QueryXmlLoader.java           # XML 파서
│   └── QueryRepository.java          # 데이터베이스 접근 (선택적)
├── dto/
│   ├── QueryRequest.java
│   ├── QueryResponse.java
│   └── QueryResult.java
├── config/
│   ├── JwtTokenProvider.java
│   └── SecurityConfig.java
└── Talk2Application.java

src/main/resources/
├── api/
│   ├── employee.xml
│   ├── beneficiary.xml
│   └── ... (다른 XML 파일들)
└── application.yml
```

---

## ⚠️ 현재 구조의 문제점

### 1. SQL 인젝션 위험 (Critical)

```java
// 현재 방식 (위험)
String sql = "SELECT * FROM employee WHERE name = '" + params.get("1") + "'";
// params.get("1") = "' OR 1=1 --" 입력 시
// → SELECT * FROM employee WHERE name = '' OR 1=1 --'

// 올바른 방식
String sql = "SELECT * FROM employee WHERE name = ?";
jdbcTemplate.query(sql, params.get("1"));
```

**문제:**
- 문자열 치환 방식 사용
- Prepared Statement 미사용
- SQL 인젝션 취약

### 2. 파라미터 바인딩 복잡성

```java
// [1], [2] 같은 숫자 기반 파라미터
// 의미 파악 어려움
// 타입 안정성 없음
```

### 3. 에러 처리 부족

```java
// 쿼리 실행 실패 시
// 구체적인 에러 메시지 부족
// 디버깅 어려움
```

### 4. 테스트 어려움

```java
// XML 파일 의존
// 통합 테스트 작성 복잡
// 단위 테스트 어려움
```

---

## 🔄 RESTful API로 전환 시 개선 구조

### 1. 리소스별 컨트롤러

```java
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    @GetMapping
    public ResponseEntity<PageResponse<EmployeeDto>> getEmployees(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit) {
        
        PageResponse<EmployeeDto> employees = employeeService.getEmployees(page, limit);
        return ResponseEntity.ok(employees);
    }
    
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody CreateEmployeeRequest request) {
        EmployeeDto employee = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(employee);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @PathVariable Long id,
            @RequestBody UpdateEmployeeRequest request) {
        
        EmployeeDto employee = employeeService.updateEmployee(id, request);
        return ResponseEntity.ok(employee);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 2. 서비스 레이어

```java
@Service
@Transactional
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private EmploymentRepository employmentRepository;
    
    @Autowired
    private AffiliationRepository affiliationRepository;
    
    public PageResponse<EmployeeDto> getEmployees(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Employee> employees = employeeRepository.findAll(pageable);
        
        List<EmployeeDto> dtos = employees.getContent().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
        
        return new PageResponse<>(dtos, employees.getTotalElements());
    }
    
    public EmployeeDto createEmployee(CreateEmployeeRequest request) {
        // 트랜잭션 처리
        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setBirthDate(request.getBirthDate());
        // ...
        
        employee = employeeRepository.save(employee);
        
        // 관련 테이블도 함께 저장
        Employment employment = new Employment();
        employment.setEmployeeId(employee.getId());
        employmentRepository.save(employment);
        
        return toDto(employee);
    }
    
    private EmployeeDto toDto(Employee employee) {
        // Entity → DTO 변환
        return EmployeeDto.builder()
            .id(employee.getId())
            .name(employee.getName())
            // ...
            .build();
    }
}
```

### 3. 리포지토리 (JPA/MyBatis)

```java
// JPA 방식
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.status = :status")
    List<Employee> findByStatus(@Param("status") String status);
}

// 또는 MyBatis 방식
@Mapper
public interface EmployeeMapper {
    List<Employee> selectEmployees(@Param("page") int page, @Param("limit") int limit);
    void insertEmployee(Employee employee);
    void updateEmployee(Employee employee);
    void deleteEmployee(Long id);
}
```

---

## 📊 구조 비교

| 항목 | 현재 방식 | RESTful API |
|------|-----------|-------------|
| **컨트롤러** | 단일 QueryController | 리소스별 컨트롤러 |
| **쿼리 관리** | XML 파일 | Service/Repository |
| **파라미터 바인딩** | 문자열 치환 | Prepared Statement |
| **보안** | ⚠️ 취약 | ✅ 안전 |
| **타입 안정성** | ❌ 없음 | ✅ 강력 |
| **테스트** | 어려움 | 용이 |
| **유지보수** | 어려움 | 쉬움 |

---

## 🎯 결론

### 현재 백엔드 구조 추정

1. **단일 컨트롤러 패턴**: `/api/*` 모든 엔드포인트를 하나의 컨트롤러가 처리
2. **XML 기반 쿼리 관리**: `resources/api/*.xml` 파일에서 쿼리 로드
3. **문자열 치환 바인딩**: `[1]`, `[2]` 같은 파라미터를 문자열로 치환 (SQL 인젝션 위험)
4. **JdbcTemplate 사용**: MyBatis보다 JdbcTemplate 사용 가능성 높음

### 전환 필요성

현재 구조는:
- ❌ SQL 인젝션 취약
- ❌ 유지보수 어려움
- ❌ 테스트 불가능
- ❌ 타입 안정성 부족

RESTful API로 전환 시:
- ✅ 보안 강화 (Prepared Statement)
- ✅ 유지보수 용이 (표준 패턴)
- ✅ 테스트 가능 (단위/통합 테스트)
- ✅ 타입 안정성 (DTO, Validation)

