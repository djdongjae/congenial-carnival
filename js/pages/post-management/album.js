// 개발모드 여부 설정
const dev = true;

// 샘플 데이터
const sampleStats = {
    totalAlbums: 12,
    totalPhotos: 342,
    todayPhotos: 8,
    totalSize: 1250
};

const sampleAlbums = [
    {
        id: 1,
        name: '2024년 신년 행사',
        description: '2024년 신년 행사 사진입니다.',
        date: '2024-01-01',
        tags: ['행사', '신년', '복지관'],
        photoCount: 45,
        thumbnail: 'https://via.placeholder.com/300x200?text=신년행사',
        createdAt: '2024-01-01 10:00',
        updatedAt: '2024-01-01 15:30'
    },
    {
        id: 2,
        name: '정기 모임',
        description: '월간 정기 모임 사진입니다.',
        date: '2024-01-10',
        tags: ['모임', '정기'],
        photoCount: 32,
        thumbnail: 'https://via.placeholder.com/300x200?text=정기모임',
        createdAt: '2024-01-10 14:00',
        updatedAt: '2024-01-10 16:00'
    },
    {
        id: 3,
        name: '건강검진',
        description: '정기 건강검진 행사 사진입니다.',
        date: '2024-01-15',
        tags: ['건강', '검진'],
        photoCount: 28,
        thumbnail: 'https://via.placeholder.com/300x200?text=건강검진',
        createdAt: '2024-01-15 09:00',
        updatedAt: '2024-01-15 12:00'
    },
    {
        id: 4,
        name: '복지관 견학',
        description: '복지관 견학 사진입니다.',
        date: '2024-01-12',
        tags: ['견학', '외부'],
        photoCount: 35,
        thumbnail: 'https://via.placeholder.com/300x200?text=견학',
        createdAt: '2024-01-12 11:00',
        updatedAt: '2024-01-12 14:30'
    }
];

let currentAlbums = [];
let currentFilter = {
    search: '',
    date: ''
};

// API 호출 함수
async function fetchStats() {
    if (dev) {
        console.log('[DEV MODE] 앨범 통계 조회');
        return sampleStats;
    }
    
    try {
        const result = await callAPI('album', 'Q010', {});
        if (result && result.results && result.results[0]) {
            return {
                totalAlbums: result.results[0].total_albums || 0,
                totalPhotos: result.results[0].total_photos || 0,
                todayPhotos: result.results[0].today_photos || 0,
                totalSize: result.results[0].total_size || 0
            };
        }
        return sampleStats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error);
        return sampleStats;
    }
}

async function fetchAlbums() {
    if (dev) {
        console.log('[DEV MODE] 앨범 목록 조회');
        return sampleAlbums;
    }
    
    try {
        const result = await callAPI('album', 'Q020', {});
        if (result && result.results && result.results[0]) {
            return result.results[0].selectResults || [];
        }
        return sampleAlbums;
    } catch (error) {
        console.error('앨범 조회 중 오류:', error);
        return sampleAlbums;
    }
}

// 통계 표시
function displayStats(stats) {
    document.getElementById('total-albums').textContent = stats.totalAlbums || 0;
    document.getElementById('total-photos').textContent = stats.totalPhotos || 0;
    document.getElementById('today-photos').textContent = stats.todayPhotos || 0;
    document.getElementById('total-size').textContent = stats.totalSize || 0;
}

// 앨범 목록 표시
function displayAlbums(albums) {
    const albumsGrid = document.getElementById('albums-grid');
    if (!albumsGrid) return;
    
    if (albums.length === 0) {
        albumsGrid.innerHTML = '<div class="empty-state">등록된 앨범이 없습니다.</div>';
        document.getElementById('result-count').textContent = '총 0개';
        return;
    }
    
    // 날짜순 정렬 (최신순)
    const sortedAlbums = [...albums].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    
    albumsGrid.innerHTML = sortedAlbums.map(album => `
        <div class="album-card" data-id="${album.id}">
            <div class="album-thumbnail">
                <img src="${album.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${album.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'" />
                <div class="album-overlay">
                    <button class="btn-overlay" onclick="viewAlbum(${album.id})" title="보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-overlay" onclick="editAlbum(${album.id})" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-overlay" onclick="deleteAlbum(${album.id})" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="photo-count-badge">
                    <i class="fas fa-image"></i> ${album.photoCount || 0}
                </div>
            </div>
            <div class="album-info">
                <h3 class="album-name">${album.name}</h3>
                <p class="album-description">${album.description || ''}</p>
                <div class="album-meta">
                    <span class="album-date"><i class="fas fa-calendar"></i> ${album.date || album.createdAt.split(' ')[0]}</span>
                    ${album.tags && album.tags.length > 0 ? `<div class="album-tags">${album.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('result-count').textContent = `총 ${albums.length}개`;
}

// 검색
function searchAlbums() {
    const searchInput = document.getElementById('search-input');
    currentFilter.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// 필터
function filterAlbums() {
    const dateFilter = document.getElementById('date-filter');
    currentFilter.date = dateFilter.value;
    applyFilters();
}

// 필터 적용
function applyFilters() {
    let filtered = [...currentAlbums];
    
    if (currentFilter.search) {
        filtered = filtered.filter(album => 
            album.name.toLowerCase().includes(currentFilter.search) ||
            (album.description && album.description.toLowerCase().includes(currentFilter.search)) ||
            (album.tags && album.tags.some(tag => tag.toLowerCase().includes(currentFilter.search)))
        );
    }
    
    if (currentFilter.date) {
        const today = new Date();
        filtered = filtered.filter(album => {
            const albumDate = new Date(album.date || album.createdAt);
            switch (currentFilter.date) {
                case 'today':
                    return albumDate.toDateString() === today.toDateString();
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return albumDate >= weekAgo;
                case 'month':
                    return albumDate.getMonth() === today.getMonth() && albumDate.getFullYear() === today.getFullYear();
                case 'year':
                    return albumDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        });
    }
    
    displayAlbums(filtered);
}

// 검색 초기화
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('date-filter').value = '';
    currentFilter = { search: '', date: '' };
    displayAlbums(currentAlbums);
}

// 새로고침
async function refreshAlbums() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const albums = await fetchAlbums();
        currentAlbums = albums;
        displayAlbums(albums);
        
        // 업로드 모달의 앨범 목록도 업데이트
        updateUploadAlbumList();
        
        console.log('앨범 목록이 새로고침되었습니다.');
    } catch (error) {
        console.error('새로고침 중 오류:', error);
    }
}

// 앨범 생성
function createAlbum() {
    document.getElementById('modal-title').textContent = '앨범 만들기';
    document.getElementById('album-form').reset();
    document.getElementById('album-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('album-form').setAttribute('data-mode', 'add');
    document.getElementById('album-form').removeAttribute('data-id');
    document.getElementById('album-modal').style.display = 'block';
}

// 앨범 수정
function editAlbum(id) {
    const album = currentAlbums.find(a => a.id === id);
    if (!album) return;
    
    document.getElementById('modal-title').textContent = '앨범 수정';
    document.getElementById('album-name').value = album.name || '';
    document.getElementById('album-description').value = album.description || '';
    document.getElementById('album-date').value = album.date || album.createdAt.split(' ')[0];
    document.getElementById('album-tags').value = album.tags ? album.tags.join(', ') : '';
    
    document.getElementById('album-form').setAttribute('data-mode', 'edit');
    document.getElementById('album-form').setAttribute('data-id', id);
    document.getElementById('album-modal').style.display = 'block';
}

// 앨범 보기
function viewAlbum(id) {
    const album = currentAlbums.find(a => a.id === id);
    if (!album) return;
    
    alert(`${album.name} 앨범을 보는 기능은 추후 구현 예정입니다.\n사진 수: ${album.photoCount}개`);
}

// 앨범 삭제
async function deleteAlbum(id) {
    if (!confirm('정말로 이 앨범을 삭제하시겠습니까?\n앨범에 포함된 모든 사진도 함께 삭제됩니다.')) return;
    
    try {
        if (dev) {
            console.log('[DEV MODE] 앨범 삭제:', id);
            currentAlbums = currentAlbums.filter(a => a.id !== id);
            displayAlbums(currentAlbums);
            alert('앨범이 삭제되었습니다. (개발모드)');
            return;
        }
        
        const result = await callAPI('album', 'Q050', { '1': id });
        if (result && result.status === 'success') {
            await refreshAlbums();
            alert('앨범이 삭제되었습니다.');
        } else {
            alert('앨범 삭제 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('앨범 삭제 중 오류:', error);
        alert('앨범 삭제 중 오류가 발생했습니다.');
    }
}

// 앨범 저장
async function saveAlbum() {
    const form = document.getElementById('album-form');
    const mode = form.getAttribute('data-mode');
    const id = form.getAttribute('data-id');
    
    const data = {
        name: document.getElementById('album-name').value.trim(),
        description: document.getElementById('album-description').value.trim(),
        date: document.getElementById('album-date').value,
        tags: document.getElementById('album-tags').value.split(',').map(t => t.trim()).filter(t => t)
    };
    
    if (!data.name) {
        alert('앨범명은 필수 입력 항목입니다.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 앨범 저장:', mode, data);
            if (mode === 'add') {
                const newId = Math.max(...currentAlbums.map(a => a.id), 0) + 1;
                const newAlbum = {
                    id: newId,
                    ...data,
                    photoCount: 0,
                    thumbnail: 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(data.name),
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                };
                currentAlbums.push(newAlbum);
                displayAlbums(currentAlbums);
            } else {
                const index = currentAlbums.findIndex(a => a.id == id);
                if (index !== -1) {
                    currentAlbums[index] = {
                        ...currentAlbums[index],
                        ...data,
                        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };
                    displayAlbums(currentAlbums);
                }
            }
            closeModal();
            updateUploadAlbumList();
            alert(`앨범이 ${mode === 'add' ? '생성' : '수정'}되었습니다. (개발모드)`);
            return;
        }
        
        const queryId = mode === 'add' ? 'Q030' : 'Q040';
        const params = mode === 'add' 
            ? {
                '1': data.name,
                '2': data.description || '',
                '3': data.date || '',
                '4': data.tags.join(',')
            }
            : {
                '1': id,
                '2': data.name,
                '3': data.description || '',
                '4': data.date || '',
                '5': data.tags.join(',')
            };
        
        const result = await callAPI('album', queryId, params);
        if (result && result.status === 'success') {
            closeModal();
            await refreshAlbums();
            alert(`앨범이 ${mode === 'add' ? '생성' : '수정'}되었습니다.`);
        } else {
            alert(`앨범 ${mode === 'add' ? '생성' : '수정'} 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error('앨범 저장 중 오류:', error);
        alert(`앨범 ${mode === 'add' ? '생성' : '수정'} 중 오류가 발생했습니다.`);
    }
}

// 사진 업로드
function uploadPhotos() {
    updateUploadAlbumList();
    document.getElementById('upload-photos').value = '';
    document.getElementById('upload-preview').innerHTML = '';
    document.getElementById('upload-modal').style.display = 'block';
}

// 업로드 모달 닫기
function closeUploadModal() {
    document.getElementById('upload-modal').style.display = 'none';
    document.getElementById('upload-photos').value = '';
    document.getElementById('upload-preview').innerHTML = '';
}

// 업로드 앨범 목록 업데이트
function updateUploadAlbumList() {
    const select = document.getElementById('upload-album');
    if (!select) return;
    
    select.innerHTML = '<option value="">앨범을 선택하세요</option>' +
        currentAlbums.map(album => 
            `<option value="${album.id}">${album.name} (${album.photoCount}장)</option>`
        ).join('');
}

// 업로드 미리보기
document.addEventListener('DOMContentLoaded', function() {
    const uploadPhotos = document.getElementById('upload-photos');
    if (uploadPhotos) {
        uploadPhotos.addEventListener('change', function(e) {
            const preview = document.getElementById('upload-preview');
            if (!preview) return;
            
            preview.innerHTML = '';
            const files = Array.from(e.target.files);
            
            files.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('div');
                        img.className = 'preview-item';
                        img.innerHTML = `
                            <img src="${e.target.result}" alt="미리보기 ${index + 1}" />
                            <span>${file.name}</span>
                            <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
                        `;
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
});

// 업로드 실행
async function doUpload() {
    const albumId = document.getElementById('upload-album').value;
    const files = document.getElementById('upload-photos').files;
    
    if (!albumId) {
        alert('앨범을 선택해주세요.');
        return;
    }
    
    if (files.length === 0) {
        alert('사진을 선택해주세요.');
        return;
    }
    
    try {
        if (dev) {
            console.log('[DEV MODE] 사진 업로드:', albumId, files.length);
            const album = currentAlbums.find(a => a.id == albumId);
            if (album) {
                album.photoCount += files.length;
                album.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
                displayAlbums(currentAlbums);
            }
            closeUploadModal();
            alert(`${files.length}장의 사진이 업로드되었습니다. (개발모드)`);
            return;
        }
        
        // 실제 업로드 로직은 FormData 사용
        const formData = new FormData();
        formData.append('albumId', albumId);
        Array.from(files).forEach((file, index) => {
            formData.append(`photo${index}`, file);
        });
        
        const result = await callAPI('album', 'Q060', formData);
        if (result && result.status === 'success') {
            closeUploadModal();
            await refreshAlbums();
            alert(`${files.length}장의 사진이 업로드되었습니다.`);
        } else {
            alert('사진 업로드 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('사진 업로드 중 오류:', error);
        alert('사진 업로드 중 오류가 발생했습니다.');
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('album-modal').style.display = 'none';
    document.getElementById('album-form').reset();
}

// 전역 함수로 노출
window.searchAlbums = searchAlbums;
window.resetSearch = resetSearch;
window.filterAlbums = filterAlbums;
window.createAlbum = createAlbum;
window.editAlbum = editAlbum;
window.viewAlbum = viewAlbum;
window.deleteAlbum = deleteAlbum;
window.saveAlbum = saveAlbum;
window.uploadPhotos = uploadPhotos;
window.closeUploadModal = closeUploadModal;
window.doUpload = doUpload;
window.closeModal = closeModal;
window.refreshAlbums = refreshAlbums;

// 모달 외부 클릭 닫기
document.addEventListener('DOMContentLoaded', function() {
    const modals = ['album-modal', 'upload-modal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    if (modalId === 'album-modal') {
                        closeModal();
                    } else {
                        closeUploadModal();
                    }
                }
            });
        }
    });
});

// 페이지 초기화
async function initPage() {
    try {
        const stats = await fetchStats();
        displayStats(stats);
        
        const albums = await fetchAlbums();
        currentAlbums = albums;
        displayAlbums(albums);
        updateUploadAlbumList();
    } catch (error) {
        console.error('페이지 초기화 중 오류:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

