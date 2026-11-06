// ==========================================================================
// Spotify Fixed Music Widget Controller
// Manages bottom pill toggle, expanded compact drawer, PKCE OAuth, & player
// ==========================================================================

import {
  initiateSpotifyLogin,
  handleSpotifyCallback,
  isAuthenticated,
  fetchUserProfile,
  fetchUserPlaylists,
  logoutSpotify,
} from '../services/spotify.js';

export const initSpotifyWidget = async () => {
  const pill = document.getElementById('spotifyPill');
  const drawer = document.getElementById('spotifyDrawer');
  const closeBtn = document.getElementById('spotifyCloseBtn');
  const logoutBtn = document.getElementById('spotifyLogoutBtn');
  const userAvatar = document.getElementById('spotifyUserAvatar');
  const userName = document.getElementById('spotifyUserName');
  const userStatus = document.getElementById('spotifyUserStatus');
  const playerContainer = document.getElementById('spotifyPlayerContainer');
  const iframe = document.getElementById('spotifyPlayerIframe');
  const playlistsSection = document.getElementById('spotifyPlaylistsSection');
  const pillLabel = document.getElementById('spotifyPillLabel');

  if (!pill || !drawer || !closeBtn || !iframe || !playlistsSection) return;

  let activePlaylistId = null;
  let userPlaylists = [];

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

  // Close when clicking outside drawer & pill
  document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : [];
    const isInside = path.includes(drawer) || path.includes(pill);
    if (drawer.classList.contains('is-open') && !isInside) {
      closeDrawer();
    }
  });

  // 2. Play a specific playlist in the compact embedded player
  const playPlaylist = (playlist) => {
    activePlaylistId = playlist.id;
    if (playerContainer) playerContainer.style.display = 'block';
    iframe.src = `https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`;
    pillLabel.textContent = `${playlist.name}`;

    // Highlight active item in DOM
    const items = playlistsSection.querySelectorAll('.spotify-drawer__item');
    items.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.id === playlist.id);
    });
  };

  // 3. Render User Playlist List
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
            <div class="item-desc">${p.description ? p.description.slice(0, 36) + '...' : count}</div>
          </div>
          <button class="item-play-btn" aria-label="Play ${p.name}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </li>
      `;
    });

    html += `</ul>`;
    playlistsSection.innerHTML = html;

    // Attach click listeners to play playlists
    const items = playlistsSection.querySelectorAll('.spotify-drawer__item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const pId = item.dataset.id;
        const found = playlists.find((p) => p.id === pId);
        if (found) playPlaylist(found);
      });
    });
  };

  // 4. Render Logged-Out / Connect View (Clean, compact, no dummy playlists or settings)
  const renderConnectView = () => {
    if (userAvatar) userAvatar.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (playerContainer) playerContainer.style.display = 'none';
    iframe.src = '';

    userName.textContent = 'Spotify';
    userStatus.textContent = 'Not Connected';
    userStatus.style.color = '#94a3b8';
    pillLabel.textContent = 'Spotify Playlists';

    playlistsSection.innerHTML = `
      <div class="spotify-drawer__login-prompt">
        <svg class="spotify-big-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.215.353-.675.466-1.028.25-2.817-1.722-6.363-2.112-10.539-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.568-1.045 8.49-.607 11.656 1.33.353.216.466.676.25 1.038zm1.467-3.264c-.27.44-.849.578-1.288.307-3.226-1.982-8.143-2.556-11.958-1.398-.497.15-1.027-.132-1.178-.63-.15-.497.132-1.027.63-1.178 4.364-1.325 9.775-.688 13.487 1.592.44.27.578.848.307 1.288zm.126-3.41c-3.868-2.297-10.248-2.508-13.942-1.387-.593.18-1.221-.157-1.4-.75-.181-.594.156-1.222.75-1.402 4.246-1.289 11.287-1.042 15.748 1.605.534.317.708 1.011.391 1.545-.316.533-1.01.708-1.547.39z"/>
        </svg>
        <h3 class="prompt-title">Connect Spotify</h3>
        <p class="prompt-desc">
          Sign in to Spotify to load and listen to your personal playlists directly in this player.
        </p>
        <button class="btn-connect-spotify" id="connectSpotifyBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.215.353-.675.466-1.028.25-2.817-1.722-6.363-2.112-10.539-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.568-1.045 8.49-.607 11.656 1.33.353.216.466.676.25 1.038zm1.467-3.264c-.27.44-.849.578-1.288.307-3.226-1.982-8.143-2.556-11.958-1.398-.497.15-1.027-.132-1.178-.63-.15-.497.132-1.027.63-1.178 4.364-1.325 9.775-.688 13.487 1.592.44.27.578.848.307 1.288zm.126-3.41c-3.868-2.297-10.248-2.508-13.942-1.387-.593.18-1.221-.157-1.4-.75-.181-.594.156-1.222.75-1.402 4.246-1.289 11.287-1.042 15.748 1.605.534.317.708 1.011.391 1.545-.316.533-1.01.708-1.547.39z"/>
          </svg>
          <span>Connect with Spotify</span>
        </button>
      </div>
    `;

    // Connect button click
    document.getElementById('connectSpotifyBtn')?.addEventListener('click', () => {
      initiateSpotifyLogin();
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

    // Fetch User's Real Playlists
    userPlaylists = await fetchUserPlaylists(30);

    if (userPlaylists && userPlaylists.length > 0) {
      renderPlaylists(userPlaylists, 'Your Playlists');
      playPlaylist(userPlaylists[0]);
    } else {
      if (playerContainer) playerContainer.style.display = 'none';
      playlistsSection.innerHTML = `
        <div class="spotify-drawer__empty">
          <p>No playlists found in your Spotify account.</p>
        </div>
      `;
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
