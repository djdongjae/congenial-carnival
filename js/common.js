// ============================================
// 전역 설정 (Global Configuration)
// ============================================
// API 서버 URL (환경별로 수정 가능)
window.API_BASE_URL = 'https://talk2-api.silveredu.net';

// ============================================
// 동적 리소스 로딩 함수들
// ============================================
// 동적 타임스탬프 생성 함수
function generateTimestamp() {
    return new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
}

// CSS 동적 로드 함수
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href + '?_t=' + generateTimestamp();
    document.head.appendChild(link);
}

// JS 동적 로드 함수 (Promise 기반)
function loadJS(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src + '?_t=' + generateTimestamp();
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 공통 리소스 로드 함수 (Bootstrap, FontAwesome, jQuery, jqGrid)
async function loadCommonResources() {
    try {
        // CSS 파일들 로드 (루트 기준 절대 경로 사용)
        loadCSS('/css/common.css');
        loadCSS('/libs/bootstrap/css/bootstrap.min.css');
        loadCSS('/libs/fontawesome/css/all.min.css');
        loadCSS('/libs/jquery-ui/css/jquery-ui.css');
        loadCSS('/libs/jqgrid/css/ui.jqgrid.css');

        // JS 파일들을 순차적으로 로드 (루트 기준 절대 경로 사용)
        await loadJS('/libs/jquery/jquery-1.11.0.min.js');
        await loadJS('/libs/jquery-ui/js/jquery-ui.js');
        await loadJS('/libs/bootstrap/js/bootstrap.bundle.min.js');
        await loadJS('/libs/jqgrid/js/grid.locale-kr.js');
        await loadJS('/libs/jqgrid/js/jquery.jqGrid.min.js');

        console.log('공통 리소스 로드 완료');
        return true;
    } catch (error) {
        console.error('공통 리소스 로드 중 오류 발생:', error);
        return false;
    }
}

// 중복 실행 방지
if (window.commonJsInitialized) {
    // 이미 초기화되었다면 아무것도 하지 않음
} else {
    window.commonJsInitialized = true;

    // 메시지 표시 함수들
    function showMessage(message, duration = 3000) {
        // Bootstrap이 로드되지 않은 경우 간단한 알림 사용
        if (typeof bootstrap === 'undefined') {
            alert('✅ ' + message);
            return;
        }

        // 기존 토스트 개수 확인하여 위치 계산
        const existingToasts = document.querySelectorAll('.custom-toast');
        const topPosition = 20 + (existingToasts.length * 70); // 각 토스트마다 70px씩 아래로

        // 커스텀 토스트 메시지 생성
        const toastId = 'toast-' + Date.now();
        const toastHtml = `
    <div id="${toastId}" class="custom-toast align-items-center text-white border-0" role="alert" style="
        position: fixed;
        top: ${topPosition}px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background-color: #198754;
        color: white;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
    ">
        <div class="d-flex align-items-center">
            <i class="fas fa-check-circle me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close btn-close-white ms-auto" onclick="document.getElementById('${toastId}').remove()"></button>
        </div>
    </div>
    `;

        // Toast 추가
        document.body.insertAdjacentHTML('beforeend', toastHtml);
        const toastElement = document.getElementById(toastId);

        // 애니메이션으로 표시
        setTimeout(() => {
            toastElement.style.opacity = '1';
            toastElement.style.transform = 'translateX(0)';
        }, 10);

        // 지정된 시간 후 자동 제거
        setTimeout(() => {
            toastElement.style.opacity = '0';
            toastElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toastElement && toastElement.parentNode) {
                    toastElement.remove();
                    // 다른 토스트들의 위치 재조정
                    adjustToastPositions();
                }
            }, 300);
        }, duration);
    }

    function showError(message, duration = 5000) {
        // Bootstrap이 로드되지 않은 경우 간단한 알림 사용
        if (typeof bootstrap === 'undefined') {
            alert('❌ ' + message);
            return;
        }

        // 기존 토스트 개수 확인하여 위치 계산
        const existingToasts = document.querySelectorAll('.custom-toast');
        const topPosition = 20 + (existingToasts.length * 70); // 각 토스트마다 70px씩 아래로

        // 커스텀 토스트 메시지 생성
        const toastId = 'toast-' + Date.now();
        const toastHtml = `
    <div id="${toastId}" class="custom-toast align-items-center text-white border-0" role="alert" style="
        position: fixed;
        top: ${topPosition}px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background-color: #dc3545;
        color: white;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
    ">
        <div class="d-flex align-items-center">
            <i class="fas fa-exclamation-circle me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close btn-close-white ms-auto" onclick="document.getElementById('${toastId}').remove()"></button>
        </div>
    </div>
    `;

        // Toast 추가
        document.body.insertAdjacentHTML('beforeend', toastHtml);
        const toastElement = document.getElementById(toastId);

        // 애니메이션으로 표시
        setTimeout(() => {
            toastElement.style.opacity = '1';
            toastElement.style.transform = 'translateX(0)';
        }, 10);

        // 지정된 시간 후 자동 제거
        setTimeout(() => {
            toastElement.style.opacity = '0';
            toastElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toastElement && toastElement.parentNode) {
                    toastElement.remove();
                    // 다른 토스트들의 위치 재조정
                    adjustToastPositions();
                }
            }, 300);
        }, duration);
    }

    // 토스트 위치 재조정 함수
    function adjustToastPositions() {
        const toasts = document.querySelectorAll('.custom-toast');
        toasts.forEach((toast, index) => {
            const newTopPosition = 20 + (index * 70);
            toast.style.top = newTopPosition + 'px';
        });
    }

    // 단축키 관리 시스템
    class KeyboardShortcuts {
        constructor() {
            this.isGridFocused = false;
            this.currentActiveTab = null;
            this.init();
        }

        init() {
            // 전역 키보드 이벤트 리스너 등록
            document.addEventListener('keydown', this.handleGlobalShortcuts.bind(this), true);

            // 그리드 포커스 감지를 위한 이벤트 리스너
            this.setupGridFocusDetection();

            // 탭 변경 감지
            this.setupTabChangeDetection();
        }

        // 전역 단축키 처리
        handleGlobalShortcuts(event) {
            const { altKey, ctrlKey, shiftKey, key, target } = event;

            // 입력 필드에서는 브라우저 기본 동작 방지하지 않음
            const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true';

            if (altKey) {
                switch (key.toLowerCase()) {
                    case 'r':
                        if (!isInputField) {
                            event.preventDefault();
                            this.refreshCurrentTab();
                        }
                        break;
                    case 'b':
                        if (!isInputField) {
                            event.preventDefault();
                            this.toggleFavorite();
                        }
                        break;
                    case 'o':
                        if (!isInputField) {
                            event.preventDefault();
                            this.openInNewWindow();
                        }
                        break;
                    case ';':
                    case ':':
                        if (!isInputField) {
                            event.preventDefault();
                            this.showTabPopupMenu();
                        }
                        break;
                }
            }


            // 그리드가 포커스된 상태에서의 단축키
            if (this.isGridFocused && !altKey && !isInputField) {
                this.handleGridShortcuts(event);
            }
        }

        // 그리드 단축키 처리
        handleGridShortcuts(event) {
            const { key } = event;

            switch (key) {
                case 'Insert':
                    event.preventDefault();
                    this.addRow();
                    break;
                case 'Delete':
                    event.preventDefault();
                    this.deleteRow();
                    break;
                case 'm':
                case 'M':
                    event.preventDefault();
                    this.editRow();
                    break;
                case 's':
                case 'S':
                    event.preventDefault();
                    this.openSearch();
                    break;
            }
        }

        // 그리드 포커스 감지 설정
        setupGridFocusDetection() {
            // 그리드 요소에 포커스 이벤트 추가
            document.addEventListener('click', (event) => {
                const gridElement = event.target.closest('#employeeGrid, .ui-jqgrid, .ui-jqgrid-btable, .ui-jqgrid-hbox');
                this.isGridFocused = !!gridElement;
            });

            // 키보드 이벤트에서도 그리드 포커스 상태 확인
            document.addEventListener('keydown', (event) => {
                const activeElement = document.activeElement;
                const gridElement = activeElement.closest('#employeeGrid, .ui-jqgrid, .ui-jqgrid-btable, .ui-jqgrid-hbox');
                this.isGridFocused = !!gridElement;
            });
        }

        // 탭 변경 감지 설정
        setupTabChangeDetection() {
            // tabManager 로드 대기
            this.waitForTabManager();

            // 즉시 활성 탭 찾기 (초기 로드 시)
            this.findActiveTab();

            // 주기적으로 활성 탭 찾기 (탭 변경 시)
            setInterval(() => {
                this.findActiveTab();
            }, 500);
        }

        // 활성 탭 찾기
        findActiveTab() {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab) {
                if (this.currentActiveTab !== activeTab.id) {
                    this.currentActiveTab = activeTab.id;
                }
            } else {
                // 활성 탭이 없으면 첫 번째 탭을 활성 탭으로 설정
                const firstTab = document.querySelector('.tab');
                if (firstTab && !this.currentActiveTab) {
                    this.currentActiveTab = firstTab.id;
                }
            }
        }

        // tabManager 로드 대기
        waitForTabManager() {
            const checkTabManager = setInterval(() => {
                if (window.tabManager) {
                    clearInterval(checkTabManager);
                    // tabManager가 로드된 후 활성 탭 찾기
                    setTimeout(() => {
                        const activeTab = document.querySelector('.tab.active');
                        if (activeTab) {
                            this.currentActiveTab = activeTab.id;
                        }
                    }, 100);
                }
            }, 100);

            // 10초 후에도 tabManager가 없으면 중단
            setTimeout(() => {
                clearInterval(checkTabManager);
            }, 10000);
        }

        // 전역 단축키 액션들
        refreshCurrentTab() {
            if (this.currentActiveTab && window.tabManager && window.tabManager.refreshTab) {
                const tabId = this.currentActiveTab.replace('tab_', '');
                window.tabManager.refreshTab(tabId);
            } else {
                // 기본 새로고침
                window.location.reload();
            }
        }


        openInNewWindow() {
            if (this.currentActiveTab && window.tabManager && window.tabManager.openInNewWindow) {
                const tabId = this.currentActiveTab.replace('tab_', '');
                window.tabManager.openInNewWindow(tabId);
            } else {
                // 대체 동작: 현재 페이지를 새 창에서 열기
                window.open(window.location.href, '_blank', 'width=1920,height=1080,fullscreen=yes');
            }
        }

        toggleFavorite() {
            if (this.currentActiveTab && window.tabManager && window.tabManager.toggleFavorite) {
                const tabId = this.currentActiveTab.replace('tab_', '');
                window.tabManager.toggleFavorite(tabId);
            } else {
                // 대체 동작: 즐겨찾기 토글 시뮬레이션
                showMessage('즐겨찾기 기능을 사용하려면 탭이 활성화되어야 합니다.');
            }
        }

        showTabPopupMenu() {
            if (this.currentActiveTab && window.tabManager && window.tabManager.toggleTabPopupMenu) {
                const tabId = this.currentActiveTab.replace('tab_', '');
                window.tabManager.toggleTabPopupMenu(tabId);
            } else {
                // 대체 동작: 팝업 메뉴 시뮬레이션
                showMessage('탭 메뉴를 사용하려면 탭이 활성화되어야 합니다.');
            }
        }


        // 그리드 단축키 액션들
        addRow() {
            if (typeof window.addEmployee === 'function') {
                window.addEmployee();
            } else if (typeof window.addRow === 'function') {
                window.addRow();
            }
        }

        deleteRow() {
            if (typeof window.deleteEmployee === 'function') {
                window.deleteEmployee();
            } else if (typeof window.deleteRow === 'function') {
                window.deleteRow();
            }
        }

        editRow() {
            if (typeof window.editEmployee === 'function') {
                window.editEmployee();
            } else if (typeof window.editRow === 'function') {
                window.editRow();
            }
        }

        openSearch() {
            // jqGrid 검색 창 열기
            if (typeof $ !== 'undefined' && $('#employeeGrid').length > 0) {
                $('#employeeGrid').jqGrid('searchGrid', {
                    caption: "고급 검색",
                    Find: "검색",
                    Reset: "초기화"
                });
            }
        }

        // 단축키 도움말 표시
        showShortcutHelp() {
            const helpText = `
📋 단축키 도움말

전역 단축키:
• Alt+R: 새로고침
• Alt+B: 즐겨찾기
• Alt+O: 새창 열기
• Alt+;: 기능 팝업

그리드 단축키 (그리드 포커스 시):
• Ins: 행 추가
• Del: 행 삭제
• M: 행 수정
• F: 검색창 열기
        `;
            showMessage(helpText);
        }
    }

    // 단축키 시스템 초기화 함수
    function initializeKeyboardShortcuts() {
        // 이미 초기화되었다면 중복 초기화 방지
        if (window.keyboardShortcuts) {
            return;
        }

        // jQuery와 TabManager가 모두 로드될 때까지 대기
        const checkResources = setInterval(() => {
            if (typeof $ !== 'undefined' && window.tabManager) {
                clearInterval(checkResources);
                window.keyboardShortcuts = new KeyboardShortcuts();
            }
        }, 100);

        // 30초 후 타임아웃 (더 길게 설정)
        setTimeout(() => {
            clearInterval(checkResources);
            if (!window.keyboardShortcuts) {
                window.keyboardShortcuts = new KeyboardShortcuts();
            }
        }, 30000);
    }

    // 페이지 로드 완료 후 단축키 시스템 초기화
    document.addEventListener('DOMContentLoaded', function () {
        initializeKeyboardShortcuts();
    });

    // 즉시 초기화도 시도 (DOMContentLoaded가 이미 발생했을 경우)
    if (document.readyState !== 'loading') {
        initializeKeyboardShortcuts();
    }

} // 중복 실행 방지 블록 끝

// API 토큰 관리 (전역)
window.accessToken = null;

// 로그인 API 호출하여 accessToken 획득
async function loginAPI() {
    try {
        const loginUrl = `${window.API_BASE_URL}/auth/login`;

        const response = await fetch(loginUrl, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Accept': 'application/json',
            }
        });

        // 응답 텍스트를 먼저 읽어서 확인
        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`로그인 실패: ${response.status} - ${responseText}`);
        }

        // JSON 파싱 시도
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error('로그인 JSON 파싱 실패:', parseError);
            console.error('원본 응답:', responseText);
            throw new Error(`서버 응답이 유효한 JSON이 아닙니다: ${responseText.substring(0, 100)}`);
        }

        if (data && data.accessToken) {
            window.accessToken = data.accessToken;
            return data.accessToken;
        } else {
            throw new Error('accessToken을 받지 못했습니다.');
        }

    } catch (e) {
        console.error('로그인 중 오류:', e);
        showError('로그인 중 오류가 발생했습니다: ' + e.message);
        return null;
    }
}

// API 호출 함수 (공통)
async function callAPI(endpoint, queryId, params = {}) {
    try {
        // 토큰이 없으면 먼저 로그인
        if (!window.accessToken) {
            await loginAPI();
        }

        if (!window.accessToken) {
            throw new Error('토큰을 획득할 수 없습니다.');
        }

        const apiUrl = `${window.API_BASE_URL}/api/${endpoint}`;

        const requestData = {
            query_ID: queryId,
            params: params
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.accessToken}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // 응답 텍스트를 먼저 읽어서 확인
        const responseText = await response.text();

        // 응답에 에러 메시지가 포함되어 있는지 확인
        if (responseText.includes('Query not found') ||
            responseText.includes('Error:') ||
            responseText.includes('not found')) {
            throw new Error(`서버 오류: ${responseText}`);
        }

        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.status} - ${responseText}`);
        }

        // JSON 파싱 시도
        let data;
        try {
            data = JSON.parse(responseText);

            // 파싱된 데이터에도 에러가 있는지 확인
            if (data && (data.error || data.message || data.errorMessage)) {
                throw new Error(`서버 오류: ${data.error || data.message || data.errorMessage}`);
            }
            // results 배열 내 errorMessage 검사
            if (data && Array.isArray(data.results)) {
                const err = data.results.find(r => r && (r.errorMessage || r.error || r.message));
                if (err) {
                    throw new Error(`서버 오류: ${err.errorMessage || err.error || err.message}`);
                }
            }
        } catch (parseError) {
            // JSON 파싱 실패 시에도 에러 메시지인 경우 처리
            if (parseError instanceof SyntaxError) {
                console.error('JSON 파싱 실패:', parseError);
                console.error('원본 응답:', responseText);
                throw new Error(`서버 응답 오류: ${responseText}`);
            } else {
                throw parseError;
            }
        }

        return data;

    } catch (e) {
        console.error('API 호출 중 오류:', e);
        showError('API 호출 중 오류가 발생했습니다: ' + e.message);
        return null;
    }
}
