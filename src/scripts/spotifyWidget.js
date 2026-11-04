// ==========================================================================
// Spotify Fixed Music Widget Controller
// Manages bottom pill toggle, expanded drawer, PKCE OAuth, & IFrame player
// ==========================================================================

import {
  initiateSpotifyLogin,
  handleSpotifyCallback,
  isAuthenticated,
  fetchUserProfile,
  fetchUserPlaylists,
  logoutSpotify,
  getClientId,
  setClientId,
  DEMO_PLAYLISTS,
} from '../services/spotify.js';

export const initSpotifyWidget = async () => {
  const pill = document.getElementById('spotifyPill');
  const drawer = document.getElementById('spotifyDrawer');
  const closeBtn = document.getElementById('spotifyCloseBtn');
  const logoutBtn = document.getElementById('spotifyLogoutBtn');
  const userAvatar = document.getElementById('spotifyUserAvatar');
  const userName = document.getElementById('spotifyUserName');
  const userStatus = document.getElementById('spotifyUserStatus');
  const iframe = document.getElementById('spotifyPlayerIframe');
  const playlistsSection = document.getElementById('spotifyPlaylistsSection');
  const pillLabel = document.getElementById('spotifyPillLabel');

  if (!pill || !drawer || !closeBtn || !iframe || !playlistsSection) return;

  let activePlaylistId = DEMO_PLAYLISTS[0].id;
  let userPlaylists = [];
  let isDemoMode = false;

  // 1. Toggle Drawer Open / Close
  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    pill.classList.add('is-active');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    pill.classList.remove('is-active');
  };

  pill.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);

  // Close when clicking outside on mobile/desktop
  document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : [];
    const isInside = path.includes(drawer) || path.includes(pill);
    if (drawer.classList.contains('is-open') && !isInside) {
      closeDrawer();
    }
  });

  // 2. Play a specific playlist in the embedded player
  const playPlaylist = (playlist) => {
    activePlaylistId = playlist.id;
    iframe.src = `https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`;
    pillLabel.textContent = `Playing: ${playlist.name}`;

    // Highlight active item in DOM
    const items = playlistsSection.querySelectorAll('.spotify-drawer__item');
    items.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.id === playlist.id);
    });
  };

  // 3. Render Playlist List
  const renderPlaylists = (playlists, title = 'Your Playlists') => {
    let html = `
      <div class="spotify-drawer__section-title">
        <span>${title} (${playlists.length})</span>
      </div>
      <ul class="spotify-drawer__list">
    `;

    playlists.forEach((p) => {
      const cover = p.images?.[0]?.url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop';
      const count = p.tracks?.total ? `${p.tracks.total} tracks` : 'Playlist';
      const isActive = p.id === activePlaylistId ? 'is-active' : '';

      html += `
        <li class="spotify-drawer__item ${isActive}" data-id="${p.id}">
          <img src="${cover}" alt="${p.name}" class="item-cover" loading="lazy" />
          <div class="item-meta">
            <div class="item-title">${p.name}</div>
            <div class="item-desc">${p.description ? p.description.slice(0, 45) + '...' : count}</div>
          </div>
          <button class="item-play-btn" aria-label="Play ${p.name}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </li>
      `;
    });

    html += `</ul>`;
    playlistsSection.innerHTML = html;

    // Attach click listeners
    const items = playlistsSection.querySelectorAll('.spotify-drawer__item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const pId = item.dataset.id;
        const found = playlists.find((p) => p.id === pId);
        if (found) playPlaylist(found);
      });
    });
  };

  // 4. Render Logged-Out / Connect View
  const renderConnectView = () => {
    userAvatar.style.display = 'none';
    logoutBtn.style.display = 'none';
    userName.textContent = 'Spotify Library';
    userStatus.textContent = 'Guest / Offline';
    userStatus.style.color = '#94a3b8';

    playlistsSection.innerHTML = `
      <div class="spotify-drawer__login-prompt">
        <svg class="spotify-big-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.215.353-.675.466-1.028.25-2.817-1.722-6.363-2.112-10.539-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.568-1.045 8.49-.607 11.656 1.33.353.216.466.676.25 1.038zm1.467-3.264c-.27.44-.849.578-1.288.307-3.226-1.982-8.143-2.556-11.958-1.398-.497.15-1.027-.132-1.178-.63-.15-.497.132-1.027.63-1.178 4.364-1.325 9.775-.688 13.487 1.592.44.27.578.848.307 1.288zm.126-3.41c-3.868-2.297-10.248-2.508-13.942-1.387-.593.18-1.221-.157-1.4-.75-.181-.594.156-1.222.75-1.402 4.246-1.289 11.287-1.042 15.748 1.605.534.317.708 1.011.391 1.545-.316.533-1.01.708-1.547.39z"/>
        </svg>
        <h3 class="prompt-title">Connect Your Spotify</h3>
        <p class="prompt-desc">
          Authorize your Spotify account to load and play your personal playlists right here without leaving this page.
        </p>

        <button class="btn-connect-spotify" id="connectSpotifyBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.215.353-.675.466-1.028.25-2.817-1.722-6.363-2.112-10.539-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.568-1.045 8.49-.607 11.656 1.33.353.216.466.676.25 1.038zm1.467-3.264c-.27.44-.849.578-1.288.307-3.226-1.982-8.143-2.556-11.958-1.398-.497.15-1.027-.132-1.178-.63-.15-.497.132-1.027.63-1.178 4.364-1.325 9.775-.688 13.487 1.592.44.27.578.848.307 1.288zm.126-3.41c-3.868-2.297-10.248-2.508-13.942-1.387-.593.18-1.221-.157-1.4-.75-.181-.594.156-1.222.75-1.402 4.246-1.289 11.287-1.042 15.748 1.605.534.317.708 1.011.391 1.545-.316.533-1.01.708-1.547.39z"/>
          </svg>
          <span>Connect with Spotify</span>
        </button>

        <button class="btn-preview-demo" id="previewDemoBtn">
          Browse Demo Playlists
        </button>

        <div class="client-settings">
          <button class="settings-toggle" id="settingsToggle">Client ID Settings ⚙️</button>
          <div class="settings-panel" id="settingsPanel">
            <input type="text" id="clientIdInput" placeholder="Enter Spotify Client ID" value="${getClientId()}" />
            <button class="btn-save-id" id="saveClientIdBtn">Save Client ID</button>
          </div>
        </div>
      </div>
    `;

    // Connect button
    document.getElementById('connectSpotifyBtn')?.addEventListener('click', () => {
      initiateSpotifyLogin();
    });

    // Preview demo button
    document.getElementById('previewDemoBtn')?.addEventListener('click', () => {
      isDemoMode = true;
      userStatus.textContent = 'Demo / Curated Mode';
      userStatus.style.color = '#c084fc';
      renderPlaylists(DEMO_PLAYLISTS, 'Curated Developer Playlists');
    });

    // Client ID settings
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const clientIdInput = document.getElementById('clientIdInput');
    const saveClientIdBtn = document.getElementById('saveClientIdBtn');

    settingsToggle?.addEventListener('click', () => {
      settingsPanel?.classList.toggle('is-visible');
    });

    saveClientIdBtn?.addEventListener('click', () => {
      const val = clientIdInput?.value;
      setClientId(val);
      alert('Spotify Client ID saved!');
      settingsPanel?.classList.remove('is-visible');
    });
  };

  // 5. Load User Data when Authenticated
  const loadUserData = async () => {
    userStatus.textContent = 'Loading...';
    userStatus.style.color = '#1db954';

    const profile = await fetchUserProfile();
    if (!profile) {
      renderConnectView();
      return;
    }

    // Render User Header
    userName.textContent = profile.display_name || 'Spotify User';
    userStatus.textContent = 'Connected';
    userStatus.style.color = '#1db954';

    if (profile.images?.[0]?.url) {
      userAvatar.src = profile.images[0].url;
      userAvatar.style.display = 'block';
    }

    logoutBtn.style.display = 'block';

    // Fetch Playlists
    userPlaylists = await fetchUserPlaylists(25);

    if (userPlaylists.length > 0) {
      renderPlaylists(userPlaylists, 'Your Playlists');
      // Set first playlist as initial player item
      playPlaylist(userPlaylists[0]);
    } else {
      playlistsSection.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #94a3b8; font-family: var(--font-body);">
          <p>No playlists found in your account.</p>
          <button class="btn-preview-demo" id="fallbackDemoBtn">Explore Demo Playlists</button>
        </div>
      `;
      document.getElementById('fallbackDemoBtn')?.addEventListener('click', () => {
        renderPlaylists(DEMO_PLAYLISTS, 'Curated Playlists');
      });
    }
  };

  // 6. Handle Disconnect / Logout
  logoutBtn.addEventListener('click', () => {
    logoutSpotify();
    renderConnectView();
  });

  // 7. Check for OAuth callback code in URL
  const callbackResult = await handleSpotifyCallback();
  if (callbackResult.success) {
    openDrawer();
    await loadUserData();
    return;
  }

  // 8. Initial state check
  if (isAuthenticated()) {
    await loadUserData();
  } else {
    renderConnectView();
  }
};
