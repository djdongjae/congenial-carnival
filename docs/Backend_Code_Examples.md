# 백엔드 구현 코드 예시 (추정)

## 📝 현재 방식의 실제 구현 코드 (추정)

### 1. 전체 컨트롤러 구조

```java
@RestController
@RequestMapping("/api")
@Slf4j
public class QueryController {
    
    @Autowired
    private QueryExecutionService queryExecutionService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    /**
     * 모든 /api/* 엔드포인트를 처리하는 단일 컨트롤러
     * 
     * @param endpoint XML 파일명 (예: "employee", "beneficiary")
     * @param request 쿼리 요청 (query_ID, params)
     * @param httpRequest HTTP 요청 (토큰 추출용)
     * @return 쿼리 실행 결과
     */
    @PostMapping("/{endpoint}")
    public ResponseEntity<?> executeQuery(
            @PathVariable String endpoint,
            @RequestBody QueryRequest request,
            HttpServletRequest httpRequest) {
        
        try {
            // 1. 인증 검증
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "인증 토큰이 필요합니다."));
            }
            
            String token = authHeader.substring(7);
            if (!jwtTokenProvider.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "유효하지 않은 토큰입니다."));
            }
            
            // 2. 쿼리 실행
            QueryResponse response = queryExecutionService.executeQuery(
                endpoint, 
                request.getQuery_ID(), 
                request.getParams()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (QueryNotFoundException e) {
            log.error("쿼리를 찾을 수 없습니다: {}/{}", endpoint, request.getQuery_ID(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                    "status", "error", 
                    "message", "Query not found: " + request.getQuery_ID()
                ));
                
        } catch (Exception e) {
            log.error("쿼리 실행 중 오류 발생: {}/{}", endpoint, request.getQuery_ID(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "status", "error",
                    "message", "쿼리 실행 중 오류가 발생했습니다: " + e.getMessage()
                ));
        }
    }
}
```

---

### 2. 쿼리 실행 서비스

```java
@Service
@Slf4j
public class QueryExecutionService {
    
    @Autowired
    private QueryXmlLoader queryXmlLoader;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    /**
     * 쿼리 실행 메서드
     * 
     * @param endpoint XML 파일명
     * @param queryId 쿼리 ID (예: "Q010", "Q030")
     * @param params 파라미터 맵 (예: {"1": "20", "2": "0"})
     * @return 쿼리 실행 결과
     */
    public QueryResponse executeQuery(String endpoint, String queryId, Map<String, String> params) {
        try {
            // 1. XML에서 쿼리 로드
            String sql = queryXmlLoader.getQuery(endpoint, queryId);
            log.debug("쿼리 로드 완료: {}/{}, SQL: {}", endpoint, queryId, sql);
            
            // 2. 쿼리 타입 판단 (SELECT, INSERT, UPDATE, DELETE)
            QueryType queryType = determineQueryType(sql);
            
            // 3. 파라미터 바인딩
            BoundQuery boundQuery = bindParameters(sql, params);
            log.debug("파라미터 바인딩 완료: {}", boundQuery.getParameters());
            
            // 4. 쿼리 실행
            QueryResult result = executeBoundQuery(boundQuery, queryType);
            
            // 5. 응답 생성
            QueryResponse response = new QueryResponse();
            response.setStatus("success");
            response.setResults(List.of(result));
            
            return response;
            
        } catch (QueryNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("쿼리 실행 실패: {}/{}", endpoint, queryId, e);
            throw new QueryExecutionException("쿼리 실행 중 오류: " + e.getMessage(), e);
        }
    }
    
    /**
     * 쿼리 타입 판단
     */
    private QueryType determineQueryType(String sql) {
        String trimmedSql = sql.trim().toUpperCase();
        if (trimmedSql.startsWith("SELECT")) {
            return QueryType.SELECT;
        } else if (trimmedSql.startsWith("INSERT")) {
            return QueryType.INSERT;
        } else if (trimmedSql.startsWith("UPDATE")) {
            return QueryType.UPDATE;
        } else if (trimmedSql.startsWith("DELETE")) {
            return QueryType.DELETE;
        } else {
            throw new IllegalArgumentException("알 수 없는 쿼리 타입: " + sql.substring(0, 10));
        }
    }
    
    /**
     * 파라미터 바인딩 (위험한 방식)
     * 
     * 주의: 문자열 치환 방식이라 SQL 인젝션 위험!
     */
    private BoundQuery bindParameters(String sql, Map<String, String> params) {
        String resultSql = sql;
        List<Object> parameters = new ArrayList<>();
        int paramIndex = 1;
        
        // [1], [2] 형식 처리 (숫자 파라미터)
        while (resultSql.contains("[" + paramIndex + "]")) {
            String paramValue = params.get(String.valueOf(paramIndex));
            
            if (paramValue == null) {
                throw new IllegalArgumentException("파라미터 [" + paramIndex + "]가 제공되지 않았습니다.");
            }
            
            // SQL 인젝션 방지를 위한 이스케이프 (하지만 완벽하지 않음)
            String sanitized = sanitizeParameter(paramValue);
            
            // [1] → ? 로 치환
            resultSql = resultSql.replace("[" + paramIndex + "]", "?");
            parameters.add(sanitized);
            
            paramIndex++;
        }
        
        // '[1]' 형식 처리 (문자열 파라미터)
        paramIndex = 1;
        while (resultSql.contains("'[" + paramIndex + "]'")) {
            String paramValue = params.get(String.valueOf(paramIndex));
            
            if (paramValue != null) {
                String sanitized = sanitizeString(paramValue);
                resultSql = resultSql.replace("'[" + paramIndex + "]'", "'" + sanitized + "'");
            }
            
            paramIndex++;
        }
        
        return new BoundQuery(resultSql, parameters);
    }
    
    /**
     * SQL 인젝션 방지 (하지만 완벽하지 않음)
     */
    private String sanitizeParameter(String value) {
        if (value == null) {
            return null;
        }
        // 단순한 이스케이프만 처리 (위험!)
        return value.replace("'", "''")
                   .replace(";", "")
                   .replace("--", "")
                   .replace("/*", "")
                   .replace("*/", "");
    }
    
    private String sanitizeString(String value) {
        if (value == null) {
            return null;
        }
        return value.replace("'", "''")
                   .replace("\\", "\\\\");
    }
    
    /**
     * 바인딩된 쿼리 실행
     */
    private QueryResult executeBoundQuery(BoundQuery boundQuery, QueryType queryType) {
        QueryResult result = new QueryResult();
        
        switch (queryType) {
            case SELECT:
                // SELECT 쿼리 실행
                List<Map<String, Object>> rows = jdbcTemplate.queryForList(boundQuery.getSql());
                result.setSelectResults(rows);
                result.setTotalResults(rows.size());
                break;
                
            case INSERT:
            case UPDATE:
            case DELETE:
                // DML 쿼리 실행
                int affectedRows = jdbcTemplate.update(boundQuery.getSql(), 
                    boundQuery.getParameters().toArray());
                result.setAffectedRows(affectedRows);
                break;
        }
        
        return result;
    }
}

/**
 * 바인딩된 쿼리
 */
class BoundQuery {
    private String sql;
    private List<Object> parameters;
    
    public BoundQuery(String sql, List<Object> parameters) {
        this.sql = sql;
        this.parameters = parameters;
    }
    
    // getters, setters
}

/**
 * 쿼리 타입
 */
enum QueryType {
    SELECT, INSERT, UPDATE, DELETE
}
```

---

### 3. XML 로더

```java
@Component
@Slf4j
public class QueryXmlLoader {
    
    private final Map<String, Document> xmlCache = new ConcurrentHashMap<>();
    private final String XML_BASE_PATH = "/api/";
    
    /**
     * XML에서 쿼리 가져오기
     * 
     * @param endpoint XML 파일명 (예: "employee")
     * @param queryId 쿼리 ID (예: "Q010")
     * @return SQL 쿼리 문자열
     */
    public String getQuery(String endpoint, String queryId) {
        try {
            // 1. XML 파일 로드 (캐싱)
            Document doc = loadXmlFile(endpoint);
            
            // 2. queryId 태그 찾기
            // <queries><Q010>...</Q010></queries>
            NodeList nodes = doc.getElementsByTagName(queryId);
            
            if (nodes.getLength() == 0) {
                throw new QueryNotFoundException(
                    "Query " + queryId + " not found in " + endpoint + ".xml"
                );
            }
            
            // 3. 쿼리 텍스트 추출
            String query = nodes.item(0).getTextContent().trim();
            
            if (query.isEmpty()) {
                throw new QueryNotFoundException(
                    "Query " + queryId + " is empty in " + endpoint + ".xml"
                );
            }
            
            log.debug("쿼리 로드 성공: {}/{}, 길이: {}", endpoint, queryId, query.length());
            
            return query;
            
        } catch (QueryNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("쿼리 로드 실패: {}/{}", endpoint, queryId, e);
            throw new QueryLoadException(
                "Failed to load query: " + endpoint + "/" + queryId, e
            );
        }
    }
    
    /**
     * XML 파일 로드 (캐싱)
     */
    private Document loadXmlFile(String endpoint) {
        return xmlCache.computeIfAbsent(endpoint, key -> {
            try {
                String xmlPath = XML_BASE_PATH + key + ".xml";
                log.debug("XML 파일 로드: {}", xmlPath);
                
                InputStream is = getClass().getResourceAsStream(xmlPath);
                
                if (is == null) {
                    throw new FileNotFoundException(
                        "XML file not found: " + xmlPath
                    );
                }
                
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                // XXE 공격 방지
                factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
                factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
                factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
                
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document doc = builder.parse(is);
                
                log.info("XML 파일 로드 완료: {}", xmlPath);
                
                return doc;
                
            } catch (Exception e) {
                log.error("XML 파일 로드 실패: {}", key, e);
                throw new QueryLoadException("Failed to load XML: " + key, e);
            }
        });
    }
    
    /**
     * 캐시 초기화 (개발 모드에서 사용)
     */
    public void clearCache() {
        xmlCache.clear();
        log.info("XML 캐시 초기화 완료");
    }
}

/**
 * 쿼리를 찾을 수 없을 때 발생하는 예외
 */
class QueryNotFoundException extends RuntimeException {
    public QueryNotFoundException(String message) {
        super(message);
    }
}

/**
 * 쿼리 로드 실패 시 발생하는 예외
 */
class QueryLoadException extends RuntimeException {
    public QueryLoadException(String message, Throwable cause) {
        super(message, cause);
    }
}

/**
 * 쿼리 실행 실패 시 발생하는 예외
 */
class QueryExecutionException extends RuntimeException {
    public QueryExecutionException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

---

### 4. DTO 클래스

```java
/**
 * 쿼리 요청 DTO
 */
public class QueryRequest {
    @JsonProperty("query_ID")
    private String query_ID;
    
    private Map<String, String> params;
    
    public QueryRequest() {}
    
    public QueryRequest(String query_ID, Map<String, String> params) {
        this.query_ID = query_ID;
        this.params = params;
    }
    
    // getters, setters
    public String getQuery_ID() {
        return query_ID;
    }
    
    public void setQuery_ID(String query_ID) {
        this.query_ID = query_ID;
    }
    
    public Map<String, String> getParams() {
        return params;
    }
    
    public void setParams(Map<String, String> params) {
        this.params = params;
    }
}

/**
 * 쿼리 응답 DTO
 */
public class QueryResponse {
    private String status;
    private List<QueryResult> results;
    private String error;
    private String message;
    
    // getters, setters
}

/**
 * 쿼리 결과 DTO
 */
public class QueryResult {
    @JsonProperty("selectResults")
    private List<Map<String, Object>> selectResults;
    
    @JsonProperty("totalResults")
    private Integer totalResults;
    
    private Integer affectedRows;
    private String errorMessage;
    
    // getters, setters
}
```

---

### 5. JWT 토큰 제공자

```java
@Component
@Slf4j
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration:3600000}") // 1시간
    private long expiration;
    
    /**
     * 토큰 검증
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("유효하지 않은 JWT 토큰: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * 토큰에서 사용자명 추출
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        
        return claims.getSubject();
    }
}
```

---

## ⚠️ 현재 방식의 보안 취약점

### 1. SQL 인젝션 위험

```java
// 현재 방식 (위험!)
String sql = "SELECT * FROM employee WHERE name = '" + params.get("1") + "'";

// 공격 예시:
// params.get("1") = "' OR 1=1 --"
// 결과: SELECT * FROM employee WHERE name = '' OR 1=1 --'
// → 모든 데이터 노출!

// 올바른 방식 (Prepared Statement)
String sql = "SELECT * FROM employee WHERE name = ?";
jdbcTemplate.query(sql, params.get("1"));
```

### 2. 문자열 치환의 한계

```java
// sanitizeParameter 메서드는 완벽하지 않음
private String sanitizeParameter(String value) {
    return value.replace("'", "''")  // 이것만으로는 부족!
               .replace(";", "")
               .replace("--", "");
}

// 우회 가능:
// 1. 유니코드 사용: ' 대신 \u0027
// 2. 주석 우회: /* */ 사용
// 3. 함수 호출: CONCAT('a','b') 등
```

### 3. Prepared Statement 미사용

```java
// 현재 방식: 문자열 치환
resultSql = resultSql.replace("[" + paramIndex + "]", "?");
parameters.add(sanitized);

// 문제: 이미 문자열로 치환된 후 Prepared Statement 사용
// → 여전히 취약할 수 있음
```

---

## 🔄 RESTful API 전환 시 개선된 코드

### 1. 리소스별 컨트롤러

```java
@RestController
@RequestMapping("/api/employees")
@Slf4j
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    @GetMapping
    public ResponseEntity<PageResponse<EmployeeDto>> getEmployees(
            @RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int limit) {
        
        PageResponse<EmployeeDto> employees = employeeService.getEmployees(page, limit);
        return ResponseEntity.ok(employees);
    }
    
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request) {
        
        EmployeeDto employee = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/employees/" + employee.getId()))
            .body(employee);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @PathVariable @NotNull Long id,
            @Valid @RequestBody UpdateEmployeeRequest request) {
        
        EmployeeDto employee = employeeService.updateEmployee(id, request);
        return ResponseEntity.ok(employee);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable @NotNull Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 2. 서비스 레이어 (Prepared Statement 사용)

```java
@Service
@Transactional
@Slf4j
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public PageResponse<EmployeeDto> getEmployees(int page, int limit) {
        // Prepared Statement 사용 (안전!)
        String sql = """
            SELECT 
                e.employee_id AS id,
                e.name,
                e.birth_date AS birthDate,
                a.classification AS job,
                a.position,
                DATE_FORMAT(em.join_date, '%Y-%m-%d') AS hireDate,
                CASE 
                    WHEN em.rehire_same = 1 THEN '휴직'
                    WHEN em.rehire_same = 9 THEN '퇴사'
                    WHEN em.leave_date IS NOT NULL THEN '퇴사'
                    ELSE '재직'
                END AS status,
                COALESCE(e.mobile_phone, '') AS phone,
                COALESCE(acc.user_id, '') AS account
            FROM employee e
            LEFT JOIN affiliation a ON e.employee_id = a.employee_id
            LEFT JOIN employment em ON e.employee_id = em.employee_id
            LEFT JOIN account acc ON e.employee_id = acc.employee_id
            ORDER BY e.employee_id ASC
            LIMIT ? OFFSET ?
            """;
        
        // 안전한 파라미터 바인딩
        List<EmployeeDto> employees = jdbcTemplate.query(
            sql,
            new Object[]{limit, (page - 1) * limit},  // Prepared Statement
            new BeanPropertyRowMapper<>(EmployeeDto.class)
        );
        
        // 전체 개수 조회
        Integer total = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM employee",
            Integer.class
        );
        
        return new PageResponse<>(employees, total != null ? total : 0);
    }
    
    public EmployeeDto createEmployee(CreateEmployeeRequest request) {
        // 트랜잭션 내에서 여러 INSERT 처리
        String sql = """
            INSERT INTO employee (name, birth_date, mobile_phone, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
            """;
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, request.getName());          // 안전!
            ps.setDate(2, Date.valueOf(request.getBirthDate()));
            ps.setString(3, request.getPhone());
            return ps;
        }, keyHolder);
        
        Long employeeId = keyHolder.getKey().longValue();
        
        // 관련 테이블 INSERT
        insertEmployment(employeeId, request);
        insertAffiliation(employeeId, request);
        insertAccount(employeeId, request);
        
        return getEmployeeById(employeeId);
    }
    
    private void insertEmployment(Long employeeId, CreateEmployeeRequest request) {
        String sql = """
            INSERT INTO employment (employee_id, join_date, rehire_same, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
            """;
        
        jdbcTemplate.update(sql,
            employeeId,
            request.getHireDate(),
            Integer.parseInt(request.getStatus())
        );
    }
    
    // ...
}
```

---

## 📊 비교 요약

### 현재 방식 (추정)

```java
// 단일 컨트롤러
POST /api/{endpoint}
Body: { query_ID: "Q010", params: {"1": "20", "2": "0"} }

// 위험한 파라미터 바인딩
sql.replace("[1]", params.get("1"))  // SQL 인젝션 위험!
```

### RESTful API 방식

```java
// 리소스별 컨트롤러
GET /api/employees?page=1&limit=20

// 안전한 파라미터 바인딩
jdbcTemplate.query(sql, new Object[]{limit, offset})  // Prepared Statement
```

---

## 🎯 결론

현재 백엔드는 **단일 컨트롤러 + XML 기반 쿼리 로더 + 문자열 치환 바인딩** 구조로 추정됩니다.

이 구조의 문제점:
1. ❌ SQL 인젝션 취약
2. ❌ 유지보수 어려움
3. ❌ 테스트 불가능

RESTful API 전환 시:
1. ✅ Prepared Statement로 보안 강화
2. ✅ 표준 패턴으로 유지보수 용이
3. ✅ 단위/통합 테스트 가능

