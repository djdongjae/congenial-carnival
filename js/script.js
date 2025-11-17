// 메뉴 관리 시스템
class MenuManager {
    constructor() {
        this.menuData = null;
        this.userPermissions = null;
        this.navMenu = document.getElementById('nav-menu');
    }
    
    // 캐시 방지를 위한 타임스탬프 생성
    getTimestamp() {
        return new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
    }

    // 메뉴 데이터 로드
    async loadMenuData() {
        try {
            const timestamp = this.getTimestamp();
            const [menuResponse, permissionResponse] = await Promise.all([
                fetch(`data/menu-structure.json?_t=${timestamp}`),
                fetch(`data/user-permissions.json?_t=${timestamp}`)
            ]);
            
            if (!menuResponse.ok || !permissionResponse.ok) {
                throw new Error('메뉴 데이터를 로드할 수 없습니다.');
            }
            
            this.menuData = await menuResponse.json();
            this.userPermissions = await permissionResponse.json();
            
            this.renderMenu();
        } catch (error) {
            console.error('메뉴 로드 오류:', error);
            this.showErrorMessage('메뉴를 불러오는데 실패했습니다.');
        }
    }
    
    // 권한 확인
    hasPermission(requiredPermissions) {
        if (!this.userPermissions || !this.userPermissions.currentUser) {
            return false;
        }
        
        const userPermissions = this.userPermissions.currentUser.permissions || [];
        return requiredPermissions.some(permission => userPermissions.includes(permission));
    }
    
    // 메뉴 렌더링
    renderMenu() {
        if (!this.menuData || !this.userPermissions) return;
        
        this.navMenu.innerHTML = '';
        
        this.menuData.menus.forEach(menu => {
            if (this.hasPermission(menu.permissions)) {
                const menuElement = this.createMenuElement(menu);
                this.navMenu.appendChild(menuElement);
            }
        });
    }
    
    // 메뉴 요소 생성
    createMenuElement(menu) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        if (menu.children && menu.children.length > 0) {
            li.classList.add('has-children');
        }
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-link';
        link.setAttribute('data-page', menu.id);
        
        if (menu.icon) {
            link.innerHTML = `<span class="menu-icon">${menu.icon}</span>${menu.title}`;
        } else {
            link.textContent = menu.title;
        }
        
        // 메뉴 클릭 이벤트
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (menu.children && menu.children.length > 0) {
                // 하위 메뉴가 있는 경우 토글
                this.toggleSubmenu(li);
            } else {
                // 하위 메뉴가 없는 경우 탭 열기
                this.openMenuTab(menu);
            }
        });
        
        li.appendChild(link);
        
        // 하위 메뉴가 있는 경우
        if (menu.children && menu.children.length > 0) {
            const submenu = this.createSubmenu(menu.children);
            li.appendChild(submenu);
        }
        
        return li;
    }
    
    // 하위 메뉴 생성
    createSubmenu(children) {
        const ul = document.createElement('ul');
        ul.className = 'nav-submenu';
        
        children.forEach(child => {
            if (this.hasPermission(child.permissions)) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                // 하위 메뉴가 있는 경우 has-children 클래스 추가
                if (child.children && child.children.length > 0) {
                    li.classList.add('has-children');
                }
                
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'nav-link';
                link.setAttribute('data-page', child.id);
                
                if (child.icon) {
                    link.innerHTML = `<span class="menu-icon">${child.icon}</span>${child.title}`;
                } else {
                    link.textContent = child.title;
                }
                
                // 하위 메뉴 클릭 이벤트
                link.addEventListener('click', (e) => {
            e.preventDefault();
            
                    if (child.children && child.children.length > 0) {
                        // 하위 메뉴가 있는 경우 토글
                        this.toggleSubmenu(li);
        } else {
                        // 하위 메뉴가 없는 경우 탭 열기
                        this.openMenuTab(child);
                    }
                });
                
                li.appendChild(link);
                
                // 하위 메뉴가 있는 경우 재귀적으로 하위 메뉴 생성
                if (child.children && child.children.length > 0) {
                    const submenu = this.createSubmenu(child.children);
                    li.appendChild(submenu);
                }
                
                ul.appendChild(li);
            }
        });
        
        return ul;
    }
    
    // 하위 메뉴 토글
    toggleSubmenu(menuItem) {
        const submenu = menuItem.querySelector('.nav-submenu');
        
        if (submenu) {
            // 현재 메뉴만 토글 (다른 메뉴는 그대로 유지)
            menuItem.classList.toggle('expanded');
        }
    }
    
    // 메뉴 탭 열기
    openMenuTab(menu) {
        // 모든 메뉴에서 active 클래스 제거
        document.querySelectorAll('.nav-item.active').forEach(item => {
            item.classList.remove('active');
        });
            
            // 클릭된 메뉴에 active 클래스 추가
        const clickedLink = document.querySelector(`[data-page="${menu.id}"]`);
        if (clickedLink) {
            const menuItem = clickedLink.closest('.nav-item');
            menuItem.classList.add('active');
        }
        
        // 탭 매니저에 전달
        if (window.tabManager) {
            window.tabManager.openTab(menu.id, menu.title, menu.page);
        }
    }
    
    // 에러 메시지 표시
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                padding: 20px;
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
                border-radius: 4px;
                margin: 20px;
                text-align: center;
            ">
                <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
                ${message}
            </div>
        `;
        
        this.navMenu.appendChild(errorDiv);
    }
}

// 탭 관리 시스템
class TabManager {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.tabCounter = 0;
        this.tabsContainer = document.getElementById('tabs-container');
        this.tabContent = document.getElementById('tab-content');
        this.tabDropdown = null;
        this.favorites = this.loadFavorites(); // 즐겨찾기 목록 로드
        
        // 캐시 방지를 위한 타임스탬프 생성
        this.timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
        
        // 페이지 데이터는 MenuManager에서 로드됨
        this.pageUrls = {};
        this.pageNames = {};
        
        // 탭 드롭다운 메뉴 생성
        this.createTabDropdown();
        
        // 스크롤 이벤트 리스너 추가
        this.setupScrollListeners();
    }
    
    // 메뉴 데이터로부터 페이지 정보 설정
    setPageDataFromMenu(menuData) {
        const processMenu = (menu) => {
            if (menu.page) {
                this.pageUrls[menu.id] = menu.page;
                this.pageNames[menu.id] = menu.title;
            }
            if (menu.children && menu.children.length > 0) {
                menu.children.forEach(child => processMenu(child));
            }
        };
        
        if (menuData && menuData.menus) {
            menuData.menus.forEach(menu => processMenu(menu));
        }
    }
    
    // URL에 타임스탬프 추가 (기존 파라미터 유지)
    addTimestampToUrl(url, timestamp) {
        if (!url) return url;
        
        // URL에 이미 파라미터가 있는지 확인
        if (url.includes('?')) {
            // 기존 파라미터가 있으면 & 로 추가
            return `${url}&_t=${timestamp}`;
        } else {
            // 파라미터가 없으면 ? 로 추가
            return `${url}?_t=${timestamp}`;
        }
    }
    
    // 새 탭 생성 또는 기존 탭 활성화
    openTab(pageId, pageTitle, pageUrl) {
        // 이미 열린 탭이 있는지 확인
        const existingTab = this.tabs.find(tab => tab.pageName === pageId);
        
        if (existingTab) {
            // 기존 탭이 있으면 해당 탭으로 전환
            this.switchToTab(existingTab.id);
            return existingTab.id;
        } else {
            // 새 탭 생성
            return this.createTab(pageId, pageTitle, pageUrl);
        }
    }
    
    // 새 탭 생성
    createTab(pageId, pageTitle, pageUrl) {
        const tabId = `tab_${++this.tabCounter}`;
        
        if (!pageUrl) {
            this.showErrorMessage('해당 페이지를 찾을 수 없습니다.');
            return null;
        }
        
        // 탭 객체 생성
        const tab = {
            id: tabId,
            pageName: pageId,
            title: pageTitle,
            url: pageUrl,
            iframe: null,
            isLoaded: false
        };
        
        // 탭 헤더 생성
        const tabElement = this.createTabElement(tab);
        
        // iframe 생성
        const iframe = this.createIframe(tab);
        tab.iframe = iframe;
        
        // 탭 목록에 추가
        this.tabs.push(tab);
        
        // DOM에 추가
        this.tabsContainer.appendChild(tabElement);
        this.tabContent.appendChild(iframe);
        
        // 새 탭 활성화 (스크롤 포함)
        this.switchToTab(tabId, true);
        
        // 페이지 로드
        this.loadPageInTab(tab);
        
        // 스크롤 버튼 상태 업데이트
        setTimeout(() => {
            this.updateScrollButtons();
        }, 100);
        
        return tabId;
    }
    
    // 탭 요소 생성
    createTabElement(tab) {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab';
        tabElement.id = `tab_${tab.id}`;
        
        // 즐겨찾기 상태 확인 및 클래스 추가
        const isFavorite = this.favorites.includes(tab.id);
        if (isFavorite) {
            tabElement.classList.add('favorite');
        }
        
        tabElement.innerHTML = `
            <div class="tab-header-content">
                <div class="tab-title">
                    <span class="tab-title-text">${tab.title}</span>
                    <div class="tab-buttons">
                        <button class="tab-menu-btn" data-tab-id="${tab.id}" title="메뉴">⋮</button>
                        <button class="tab-close" data-tab-id="${tab.id}" title="닫기">×</button>
                    </div>
                </div>
            </div>
            <div class="tab-popup-menu" id="tab-popup-${tab.id}" style="display: none;">
                <span class="popup-icon-item" data-action="favorite" data-tab-id="${tab.id}" title="${isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}">${isFavorite ? '★' : '☆'}</span>
                <span class="popup-icon-item" data-action="refresh" data-tab-id="${tab.id}" title="새로고침">⟳</span>
                <span class="popup-icon-item" data-action="maximize" data-tab-id="${tab.id}" title="새 창에서 열기">⛶</span>
                <span class="popup-close-btn" data-tab-id="${tab.id}" title="메뉴 닫기">×</span>
            </div>
        `;
        
        // 탭 클릭 이벤트
        tabElement.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-buttons') && !e.target.closest('.tab-popup-menu')) {
                this.switchToTab(tab.id);
            }
        });
        
        // 메뉴 버튼 클릭 이벤트
        const menuBtn = tabElement.querySelector('.tab-menu-btn');
        menuBtn.addEventListener('click', (e) => {            
            e.stopPropagation();
            this.toggleTabPopupMenu(tab.id);
        });
        
        // 팝업 메뉴 아이콘 클릭 이벤트
        const popupItems = tabElement.querySelectorAll('.popup-icon-item');
        popupItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.dataset.action;
                const tabId = item.dataset.tabId;
                
                if (action) {
                    switch(action) {
                        case 'favorite':
                            this.toggleFavorite(tabId);
                            break;
                        case 'refresh':
                            this.refreshTab(tabId);
                            break;
                        case 'maximize':
                            this.openInNewWindow(tabId);
                            break;
                    }
                    
                    // 메뉴 닫기
                    this.hideAllTabPopupMenus();
                }
        });
    });
    
        // 닫기 버튼 클릭 이벤트
        const closeBtn = tabElement.querySelector('.tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tab.id);
        });
        
        // 초기 메뉴 버튼 상태 설정 (비활성 탭은 숨김)
        menuBtn.style.display = 'none';
        
        // 팝업 닫기 버튼 클릭 이벤트
        const popupCloseBtn = tabElement.querySelector('.popup-close-btn');
        popupCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideAllTabPopupMenus();
        });
        
        return tabElement;
    }
    
    // iframe 생성
    createIframe(tab) {
        const iframe = document.createElement('iframe');
        iframe.className = 'tab-frame';
        iframe.id = `frame_${tab.id}`;
        iframe.title = tab.title;
        
        return iframe;
    }
    
    // 새 창으로 열기 (전체 화면)
    openInNewWindow(tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;
        
        // 화면 해상도 가져오기
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        
        // 새 창에서 열기 (전체 화면, URL 숨김)
        const newWindow = window.open(
            this.addTimestampToUrl(tab.url, this.timestamp),
            '_blank',
            `width=${screenWidth},height=${screenHeight},left=0,top=0,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no,directories=no`
        );
        
        // 새 창이 차단되었을 경우 알림
        if (!newWindow) {
            alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
        } else {
            // 새 창이 열린 후 위치와 크기 조정
            setTimeout(() => {
                newWindow.moveTo(0, 0);
                newWindow.resizeTo(screenWidth, screenHeight);
                // 새 창에 포커스
                newWindow.focus();
            }, 100);
            
            // 새 창이 닫힐 때 기존 탭 새로고침
            this.monitorWindowClose(newWindow, tabId);
        }
    }
    
    // 새 창 닫힘 모니터링 및 탭 새로고침
    monitorWindowClose(newWindow, tabId) {
        const checkClosed = setInterval(() => {
            try {
                // 새 창이 닫혔는지 확인
                if (newWindow.closed) {
                    clearInterval(checkClosed);
                    // 기존 탭 새로고침
                    this.refreshTab(tabId);
                }
            } catch (error) {
                // 새 창이 다른 도메인으로 이동했거나 접근할 수 없는 경우
                clearInterval(checkClosed);
            }
        }, 1000); // 1초마다 확인
    }
    
    // 탭 새로고침
    refreshTab(tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;
        
        const iframe = document.getElementById(`frame_${tabId}`);
        if (iframe) {
            // 새로운 타임스탬프로 새로고침
            const newTimestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
            iframe.src = this.addTimestampToUrl(tab.url, newTimestamp);
        }
    }
    
    
    // 즐겨찾기 토글
    toggleFavorite(tabId) {
        const index = this.favorites.indexOf(tabId);
        
        if (index === -1) {
            // 즐겨찾기 추가
            this.favorites.push(tabId);
        } else {
            // 즐겨찾기 제거
            this.favorites.splice(index, 1);
        }
        
        // 로컬 스토리지에 저장
        this.saveFavorites();
        
        // 탭 버튼 업데이트
        this.updateFavoriteButton(tabId);
        
        // 드롭다운 메뉴 업데이트
        this.updateTabDropdown();
    }
    
    // 즐겨찾기 버튼 및 탭 스타일 업데이트
    updateFavoriteButton(tabId) {
        const tabElement = document.getElementById(`tab_${tabId}`);
        if (!tabElement) return;
        
        const isFavorite = this.favorites.includes(tabId);
        
        // 탭 배경색 업데이트
        if (isFavorite) {
            tabElement.classList.add('favorite');
        } else {
            tabElement.classList.remove('favorite');
        }
        
        // 팝업 메뉴의 즐겨찾기 업데이트
        const favoriteItem = tabElement.querySelector('.popup-icon-item[data-action="favorite"]');
        if (favoriteItem) {
            if (isFavorite) {
                favoriteItem.textContent = '★';
                favoriteItem.title = '즐겨찾기 해제';
            } else {
                favoriteItem.textContent = '☆';
                favoriteItem.title = '즐겨찾기';
            }
        }
    }
    
    // 탭 팝업 메뉴 토글
    toggleTabPopupMenu(tabId) {
        const popup = document.getElementById(`tab-popup-${tabId}`);
        const tabElement = document.getElementById(`tab_${tabId}`);
        
     


        if (!popup || !tabElement) {
            return;
        }
        
        // 현재 팝업이 이미 열려있는지 확인
        const isCurrentlyOpen = popup.style.display === 'block';
       
        // 현재 팝업이 열려있다면 닫기
        if (isCurrentlyOpen) {
            popup.style.display = 'none';
            return;
        }
        
       
      
        // 다른 모든 팝업 닫기
        this.hideAllTabPopupMenus();        
        // 팝업 위치 계산 및 표시       
        const tabRect = tabElement.getBoundingClientRect();        
        // 탭 아래쪽에 팝업 표시 (1px 아래)
        popup.style.position = 'fixed';
//        popup.style.top = `${tabRect.bottom + 1}px`;       
  //      popup.style.left = `${tabRect.left}px`;
        popup.style.zIndex = '10000';
        popup.style.display = 'flex';
        
    }
    
    // 특정 탭 팝업 메뉴 표시
    showTabPopupMenu(tabId) {
        const popup = document.getElementById(`tab-popup-${tabId}`);
        const tabElement = document.getElementById(`tab_${tabId}`);
        
        if (!popup || !tabElement) {
            return;
        }
        
        // 다른 모든 팝업 닫기
        this.hideAllTabPopupMenus();
        
        // 팝업 위치 계산 및 표시
        const tabRect = tabElement.getBoundingClientRect();
        
        // 탭 아래쪽에 팝업 표시 (1px 아래)
        popup.style.position = 'fixed';
        popup.style.top = `${tabRect.bottom + 1}px`;
        popup.style.left = `${tabRect.left}px`;
        popup.style.zIndex = '10000';
        popup.style.display = 'flex';
    }
    
    // 특정 탭 팝업 메뉴 숨기기
    hideTabPopupMenu(tabId) {
        const popup = document.getElementById(`tab-popup-${tabId}`);
        if (popup) {
            popup.style.display = 'none';
        }
    }
    
    // 모든 탭 팝업 메뉴 숨기기
    hideAllTabPopupMenus() {
        document.querySelectorAll('.tab-popup-menu').forEach(popup => {
            popup.style.display = 'none';
        });
    }
    
    // 즐겨찾기 로드 (로컬 스토리지)
    loadFavorites() {
        try {
            const saved = localStorage.getItem('tabFavorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('즐겨찾기 로드 실패:', error);
            return [];
        }
    }
    
    // 즐겨찾기 저장 (로컬 스토리지)
    saveFavorites() {
        try {
            localStorage.setItem('tabFavorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('즐겨찾기 저장 실패:', error);
        }
    }
    
    // 탭 전환
    switchToTab(tabId, shouldScroll = false) {
        // 모든 탭 비활성화
        this.tabs.forEach(tab => {
            const tabElement = document.getElementById(`tab_${tab.id}`);
            const frameElement = document.getElementById(`frame_${tab.id}`);
            
            if (tabElement) {
                tabElement.classList.remove('active');
                // 메뉴 버튼 숨기기
                const menuBtn = tabElement.querySelector('.tab-menu-btn');
                if (menuBtn) {
                    menuBtn.style.display = 'none';
                }
            }
            if (frameElement) frameElement.classList.remove('active');
        });
        
        // 선택된 탭 활성화
        const activeTab = this.tabs.find(tab => tab.id === tabId);
        if (activeTab) {
            const tabElement = document.getElementById(`tab_${tabId}`);
            const frameElement = document.getElementById(`frame_${tabId}`);
            
            if (tabElement) {
                tabElement.classList.add('active');
                // 메뉴 버튼 표시
                const menuBtn = tabElement.querySelector('.tab-menu-btn');
                if (menuBtn) {
                    menuBtn.style.display = 'flex';
                }
            }
            if (frameElement) frameElement.classList.add('active');
            
            this.activeTabId = tabId;
            
            // 새 탭 생성 시에만 스크롤 (기존 탭 전환 시에는 스크롤 안함)
            if (shouldScroll) {
                this.scrollToActiveTab();
            }
        }
    }
    
    // 탭 닫기
    closeTab(tabId) {
        const tabIndex = this.tabs.findIndex(tab => tab.id === tabId);
        if (tabIndex === -1) return;
        
        const tab = this.tabs[tabIndex];
        
        // DOM에서 제거
        const tabElement = document.getElementById(`tab_${tabId}`);
        const frameElement = document.getElementById(`frame_${tabId}`);
        
        if (tabElement) tabElement.remove();
        if (frameElement) frameElement.remove();
        
        // 배열에서 제거
        this.tabs.splice(tabIndex, 1);
        
        
        // 닫힌 탭이 활성 탭이었다면 다른 탭으로 전환
        if (this.activeTabId === tabId) {
            if (this.tabs.length > 0) {
                // 이전 탭이나 다음 탭으로 전환
                const newIndex = Math.min(tabIndex, this.tabs.length - 1);
                this.switchToTab(this.tabs[newIndex].id);
            } else {
                this.activeTabId = null;
            }
        }
        
        // 스크롤 버튼 상태 업데이트 (약간의 지연 후)
        setTimeout(() => {
            this.updateScrollButtons();
        }, 50);
    }
    
    // 모든 탭 닫기
    closeAllTabs() {
        const tabIds = [...this.tabs.map(tab => tab.id)];
        tabIds.forEach(tabId => this.closeTab(tabId));
    }
    
    // 탭에서 페이지 로드
    loadPageInTab(tab) {
        // 이미 로드된 경우 다시 로드하지 않음
        if (tab.isLoaded) {
            return;
        }
        
        const iframe = tab.iframe;
        
        // 로딩 상태 표시
        this.showLoadingInTab(tab.id);
        
        // HTTP 상태 코드 확인 (HEAD 요청으로 빠르게 확인)
        const pageUrl = this.addTimestampToUrl(tab.url, this.timestamp);
        
        // fetch HEAD 요청으로 상태 코드 확인
        fetch(pageUrl, { method: 'HEAD' })
            .then(response => {
                if (response.status === 404) {
                    // 404 상태 코드인 경우에만 404 페이지로 리다이렉트
                    iframe.src = 'pages/404.html';
                    this.hideLoadingInTab(tab.id);
                    tab.isLoaded = true;
                } else {
                    // 정상 응답(200) 또는 다른 상태 코드인 경우 iframe 로드
                    iframe.src = pageUrl;
                }
            })
            .catch(() => {
                // fetch가 실패한 경우 (CORS 등) GET 요청으로 다시 시도
                fetch(pageUrl, { method: 'GET' })
                    .then(response => {
                        if (response.status === 404) {
                            // 404 상태 코드인 경우에만 404 페이지로 리다이렉트
                            iframe.src = 'pages/404.html';
                            this.hideLoadingInTab(tab.id);
                            tab.isLoaded = true;
                        } else {
                            // 정상 응답인 경우 iframe 로드
                            iframe.src = pageUrl;
                        }
                    })
                    .catch(() => {
                        // GET 요청도 실패한 경우 iframe 로드 계속
                        // onload 이벤트에서 다시 확인
                        iframe.src = pageUrl;
                    });
            });
        
        // 로드 완료 이벤트
        iframe.onload = () => {
            // fetch로 확인하지 못한 경우를 대비해 페이지 내용도 확인
            // 하지만 서버 에러가 명확한 경우에만 처리
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (!iframeDoc) {
                    tab.isLoaded = true;
                    this.hideLoadingInTab(tab.id);
                    return;
                }
                
                const pageTitle = iframeDoc.title || '';
                const pageBody = iframeDoc.body;
                
                // 404 페이지가 이미 로드된 경우
                if (pageTitle.includes('404') || pageTitle.includes('찾을 수 없') || pageTitle.includes('그리드 페이지가 아닙니다')) {
                    this.hideLoadingInTab(tab.id);
                    tab.isLoaded = true;
                    return;
                }
                
                // 페이지가 정상적으로 로드된 경우 (제목이 있고 404 관련 키워드가 없는 경우)
                if (pageTitle && !pageTitle.includes('404') && !pageTitle.includes('Error')) {
                    tab.isLoaded = true;
                    this.hideLoadingInTab(tab.id);
                    return;
                }
                
                // body가 없거나 비어있는 경우, 서버 에러 페이지인지 확인
                if (!pageBody || !pageBody.innerHTML || pageBody.innerHTML.trim().length < 50) {
                    // 빈 페이지인 경우, 서버 에러가 아닐 수 있으므로 로드 완료로 간주
                    tab.isLoaded = true;
                    this.hideLoadingInTab(tab.id);
                    return;
                }
                
                const pageHtml = iframeDoc.documentElement.innerHTML || '';
                const bodyText = pageBody.innerText || pageBody.textContent || '';
                
                // 명확한 서버 에러 페이지인 경우에만 확인
                const errorKeywords = [
                    'Error code: 404',
                    'File not found',
                    'Nothing matches the given URI',
                    '404 Not Found',
                    'Not Found',
                    'The requested URL was not found',
                    'The page cannot be found',
                    'Page Not Found',
                    'Resource not found',
                    '404 - Page not found',
                    'The file you requested was not found',
                    'The requested resource was not found',
                    '404 - File or directory not found',
                    'HTTP Error 404',
                    'Error 404'
                ];
                
                // 서버 에러 키워드가 명확하게 포함되어 있는지 확인
                const hasServerError = errorKeywords.some(keyword => 
                    pageHtml.includes(keyword) ||
                    bodyText.includes(keyword) ||
                    pageTitle.includes(keyword)
                );
                
                // nginx나 Apache 에러 페이지인 경우 (제목이나 본문에 명확히 표시됨)
                const isWebServerError = (pageHtml.includes('nginx') || pageHtml.includes('Apache')) && 
                                         (pageHtml.includes('404') || bodyText.includes('404'));
                
                if (hasServerError || isWebServerError) {
                    // 명확한 서버 에러 페이지인 경우에만 404로 리다이렉트
                    iframe.src = 'pages/404.html';
                    this.hideLoadingInTab(tab.id);
                    return;
                }
                
                // 서버 에러가 아닌 경우 정상 페이지로 간주
                tab.isLoaded = true;
                this.hideLoadingInTab(tab.id);
            } catch (e) {
                // CORS 등으로 접근할 수 없는 경우 로드 완료로 간주
                tab.isLoaded = true;
                this.hideLoadingInTab(tab.id);
            }
        };
            
        // 에러 처리
        iframe.onerror = () => {
            this.hideLoadingInTab(tab.id);
            // 404 페이지로 리다이렉트
            iframe.src = 'pages/404.html';
        };
        
        // 타임아웃 체크는 제거 - fetch HEAD 요청으로 이미 상태 코드 확인
    }
    
    // 탭에 로딩 표시
    showLoadingInTab(tabId) {
        const frameElement = document.getElementById(`frame_${tabId}`);
        if (frameElement) {
            frameElement.style.background = 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)';
            frameElement.style.backgroundSize = '20px 20px';
            frameElement.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';
        }
    }
    
    // 탭에서 로딩 숨기기
    hideLoadingInTab(tabId) {
        const frameElement = document.getElementById(`frame_${tabId}`);
        if (frameElement) {
            frameElement.style.background = '#ffffff';
        }
    }
    
    // 탭 드롭다운 메뉴 생성
    createTabDropdown() {
        this.tabDropdown = document.createElement('div');
        this.tabDropdown.className = 'tab-dropdown';
        this.tabDropdown.id = 'tab-dropdown';
        
        // 드롭다운을 탭 헤더에 추가
        const tabHeader = document.querySelector('.tab-header');
        tabHeader.style.position = 'relative';
        tabHeader.appendChild(this.tabDropdown);
        
        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-hamburger') && !e.target.closest('.tab-dropdown')) {
                this.hideTabDropdown();
            }
        });
    }
    
    // 탭 드롭다운 메뉴 표시
    showTabDropdown() {
        this.updateTabDropdown();
        this.tabDropdown.classList.add('show');
    }
    
    // 탭 드롭다운 메뉴 숨기기
    hideTabDropdown() {
        this.tabDropdown.classList.remove('show');
    }
    
    // 탭 드롭다운 메뉴 업데이트
    updateTabDropdown() {
        this.tabDropdown.innerHTML = '';
        
        this.tabs.forEach(tab => {
            const item = document.createElement('div');
            item.className = 'tab-dropdown-item';
            if (tab.id === this.activeTabId) {
                item.classList.add('active');
            }
            
            // 즐겨찾기 상태 확인
            const isFavorite = this.favorites.includes(tab.id);
            
            item.innerHTML = `
                <span class="tab-title">${tab.title}</span>
                <div class="tab-buttons">
                    <button class="tab-favorite ${isFavorite ? 'active' : ''}" data-tab-id="${tab.id}" title="즐겨찾기">${isFavorite ? '★' : '☆'}</button>
                    <button class="tab-refresh" data-tab-id="${tab.id}" title="새로고침">⟳</button>
                    <button class="tab-maximize" data-tab-id="${tab.id}" title="새 창에서 열기">⛶</button>
                    <button class="tab-close" data-tab-id="${tab.id}" title="닫기">×</button>
            </div>
        `;
        
            // 탭 클릭 이벤트
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.tab-buttons')) {
                    this.switchToTab(tab.id);
                    this.hideTabDropdown();
                }
            });
            
            // 즐겨찾기 버튼 클릭 이벤트
            const favoriteBtn = item.querySelector('.tab-favorite');
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(tab.id);
            });
            
            // 새로고침 버튼 클릭 이벤트
            const refreshBtn = item.querySelector('.tab-refresh');
            refreshBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.refreshTab(tab.id);
            });
            
            // 새 창 열기 버튼 클릭 이벤트
            const newWindowBtn = item.querySelector('.tab-maximize');
            newWindowBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openInNewWindow(tab.id);
                this.hideTabDropdown();
            });
            
            // 닫기 버튼 클릭 이벤트
            const closeBtn = item.querySelector('.tab-close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(tab.id);
                this.updateTabDropdown();
            });
            
            this.tabDropdown.appendChild(item);
        });
    }
    
    // 스크롤 이벤트 리스너 설정
    setupScrollListeners() {
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');
        const hamburgerBtn = document.getElementById('tab-hamburger');
        
        // 왼쪽 스크롤 버튼
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollTabs(-200);
            });
        }
        
        // 오른쪽 스크롤 버튼
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 강제로 버튼 활성화
                this.forceEnableScrollButtons();
                
                this.scrollTabs(200);
            });
        }
        
        // 햄버거 메뉴 버튼
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showTabDropdown();
            });
        }
        
        // 탭 컨테이너 스크롤 이벤트
        if (this.tabsContainer) {
            this.tabsContainer.addEventListener('scroll', (e) => {
                this.updateScrollButtons();
            });
            
            // 초기 로드 시 스크롤 버튼 상태 업데이트
            setTimeout(() => {
                this.updateScrollButtons();
            }, 100);
            
            // 윈도우 리사이즈 시에도 업데이트
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.updateScrollButtons();
                }, 100);
            });
        }
    }
    
    // 탭 스크롤
    scrollTabs(delta) {
        if (this.tabsContainer) {
            const before = this.tabsContainer.scrollLeft;
            const maxScroll = this.tabsContainer.scrollWidth - this.tabsContainer.clientWidth;
            
            if (maxScroll > 0) {
                // 실제 스크롤 가능한 범위 내에서 스크롤
                const target = Math.max(0, Math.min(before + delta, maxScroll));
                this.tabsContainer.scrollLeft = target;
            }
            
            // 스크롤 후 버튼 상태 업데이트
            setTimeout(() => {
                this.updateScrollButtons();
            }, 50);
        }
    }
    
    // 스크롤 버튼 상태 업데이트
    updateScrollButtons() {
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');
        
        if (scrollLeftBtn && scrollRightBtn && this.tabsContainer) {
            const container = this.tabsContainer;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            
            // 실제 스크롤 가능 여부 확인
            const maxScroll = scrollWidth - clientWidth;
            const hasScrollableContent = maxScroll > 0;
            
            const canScrollLeft = hasScrollableContent && scrollLeft > 0;
            const canScrollRight = hasScrollableContent && scrollLeft < maxScroll;
            
            // 버튼 상태 업데이트
            scrollLeftBtn.disabled = !canScrollLeft;
            scrollRightBtn.disabled = !canScrollRight;
            
            // disabled 속성 강제 업데이트
            if (canScrollLeft) {
                scrollLeftBtn.removeAttribute('disabled');
            } else {
                scrollLeftBtn.setAttribute('disabled', 'disabled');
            }
            
            if (canScrollRight) {
                scrollRightBtn.removeAttribute('disabled');
            } else {
                scrollRightBtn.setAttribute('disabled', 'disabled');
            }
        }
    }
    
    // 스크롤 버튼 강제 활성화
    forceEnableScrollButtons() {
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');
        
        if (scrollLeftBtn && scrollRightBtn) {
            // 모든 속성 제거 후 활성화
            scrollLeftBtn.removeAttribute('disabled');
            scrollRightBtn.removeAttribute('disabled');
            scrollLeftBtn.disabled = false;
            scrollRightBtn.disabled = false;
            
            // CSS 클래스도 제거
            scrollLeftBtn.classList.remove('disabled');
            scrollRightBtn.classList.remove('disabled');
        }
    }
    
    // 활성 탭을 보이도록 스크롤
    scrollToActiveTab() {
        const activeTab = document.getElementById(`tab_${this.activeTabId}`);
        if (activeTab && this.tabsContainer) {
            // 탭 컨테이너 내에서만 스크롤 (페이지 전체 스크롤에 영향 없음)
            const tabRect = activeTab.getBoundingClientRect();
            const containerRect = this.tabsContainer.getBoundingClientRect();
            
            // 탭이 컨테이너 밖에 있는 경우만 스크롤
            if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
                const scrollLeft = activeTab.offsetLeft - (this.tabsContainer.offsetWidth / 2) + (activeTab.offsetWidth / 2);
                this.tabsContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // 에러 메시지 표시
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #dc3545;
                font-size: 16px;
                background: #f8d7da;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #f5c6cb;
                z-index: 1000;
            ">
                <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
                ${message}
            </div>
        `;
        
        this.tabContent.appendChild(errorDiv);
        
        // 3초 후 에러 메시지 자동 제거
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 3000);
    }
}

// 초기화 함수
async function initializeApp() {
    
    // 탭 매니저 초기화
    const tabManager = new TabManager();
    window.tabManager = tabManager; // 전역에서 접근 가능하도록 설정
    
    // 메뉴 매니저 초기화
    const menuManager = new MenuManager();
    
    // 메뉴 데이터 로드
    await menuManager.loadMenuData();
    
    // 메뉴 데이터를 TabManager에 설정
    tabManager.setPageDataFromMenu(menuManager.menuData);
    
    // 모든 탭 닫기 버튼
    const closeAllBtn = document.getElementById('close-all-tabs');
    if (closeAllBtn) {
        closeAllBtn.addEventListener('click', () => {
            tabManager.closeAllTabs();
        });
    }
    
    // 사용자 정보 드롭다운 토글
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const userInfo = document.querySelector('.user-info');
    
    if (dropdownArrow && userInfo) {
        userInfo.addEventListener('click', function() {
            dropdownArrow.classList.toggle('rotated');
        });
    }
    
    // 메뉴 토글 기능
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuToggle && sidebar && mainContent) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('expanded');
            
            // 버튼 아이콘 변경
            if (sidebar.classList.contains('hidden')) {
                menuToggle.textContent = '📂';
                menuToggle.title = '메뉴 열기';
            } else {
                menuToggle.textContent = '📁';
                menuToggle.title = '메뉴 닫기';
            }
        });
    }
    
    // 전역 클릭 이벤트: 탭 팝업 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tab-popup-menu') && !e.target.closest('.tab-menu-btn')) {
            tabManager.hideAllTabPopupMenus();
        }
    });
    
}

// DOM이 로드된 후 실행 또는 즉시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// 설정 아이콘 클릭 이벤트 (전역에서 실행)
    const settingsIcon = document.querySelector('.settings-icon');
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function() {
            // 설정 페이지로 이동 또는 설정 모달 표시
            console.log('설정 아이콘 클릭됨');
        });
    }

// 윈도우 크기 변경 시 레이아웃 조정
window.addEventListener('resize', function() {
    // 필요한 경우 레이아웃 조정 로직 구현
    console.log('윈도우 크기 변경됨');
});

// 페이지 언로드 시 정리 작업
window.addEventListener('beforeunload', function() {
    // 필요한 경우 정리 작업 수행
    console.log('페이지 언로드됨');
});
