import React, { useState, useEffect } from 'react';
import '../css/SettingsModal.css';

interface Props {
  onClose: () => void;
  onUsernameUpdate: (newUsername: string) => void;
}

export const SettingsModal: React.FC<Props> = ({ onClose, onUsernameUpdate }) => {
  const [activeTab, setActiveTab] = useState<'equalizer' | 'profile' | 'notifications'>('equalizer');

  const [username, setUsername] = useState(() => localStorage.getItem('muliPlay_username') || 'SmaddyJosh');
  
  const [eqValues, setEqValues] = useState(() => {
    const saved = localStorage.getItem('muliPlay_eq');
    return saved ? JSON.parse(saved) : {
      band60: 0, band230: 0, band910: 0, band3k: 0, band14k: 0
    };
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('muliPlay_notifications');
    return saved ? JSON.parse(saved) : {
      newReleases: true, playlistUpdates: false, emailAlerts: true
    };
  });

  useEffect(() => { localStorage.setItem('muliPlay_eq', JSON.stringify(eqValues)); }, [eqValues]);
  useEffect(() => { localStorage.setItem('muliPlay_notifications', JSON.stringify(notifications)); }, [notifications]);

  const handleSaveProfile = () => {
    localStorage.setItem('muliPlay_username', username);
    onUsernameUpdate(username);
  };

  const handleEqChange = (band: keyof typeof eqValues, value: string) => {
    setEqValues((prev: typeof eqValues) => ({ ...prev, [band]: parseInt(value) }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev: typeof notifications) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="settings-modal-overlay" onClick={handleBackdropClick}>
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'equalizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('equalizer')}
          >
            Equalizer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'equalizer' && (
            <div className="equalizer-settings">
              <h3 className="settings-section-title">Equalizer</h3>
              
              <div className="eq-presets">
                <button className="preset-btn" onClick={() => setEqValues({band60: 0, band230: 0, band910: 0, band3k: 0, band14k: 0})}>Flat</button>
                <button className="preset-btn" onClick={() => setEqValues({band60: 5, band230: 2, band910: 0, band3k: 2, band14k: 4})}>Pop</button>
                <button className="preset-btn" onClick={() => setEqValues({band60: 6, band230: 4, band910: -2, band3k: 2, band14k: 6})}>Rock</button>
                <button className="preset-btn" onClick={() => setEqValues({band60: 8, band230: 4, band910: 0, band3k: 2, band14k: 2})}>Bass Boost</button>
              </div>

              <div className="eq-sliders">
                <div className="eq-band">
                  <span className="eq-label">{eqValues.band60 > 0 ? `+${eqValues.band60}` : eqValues.band60}</span>
                  <input type="range" className="eq-slider" min="-12" max="12" step="1" value={eqValues.band60} onChange={(e) => handleEqChange('band60', e.target.value)} />
                  <span className="eq-label">60Hz</span>
                </div>
                <div className="eq-band">
                  <span className="eq-label">{eqValues.band230 > 0 ? `+${eqValues.band230}` : eqValues.band230}</span>
                  <input type="range" className="eq-slider" min="-12" max="12" step="1" value={eqValues.band230} onChange={(e) => handleEqChange('band230', e.target.value)} />
                  <span className="eq-label">230Hz</span>
                </div>
                <div className="eq-band">
                  <span className="eq-label">{eqValues.band910 > 0 ? `+${eqValues.band910}` : eqValues.band910}</span>
                  <input type="range" className="eq-slider" min="-12" max="12" step="1" value={eqValues.band910} onChange={(e) => handleEqChange('band910', e.target.value)} />
                  <span className="eq-label">910Hz</span>
                </div>
                <div className="eq-band">
                  <span className="eq-label">{eqValues.band3k > 0 ? `+${eqValues.band3k}` : eqValues.band3k}</span>
                  <input type="range" className="eq-slider" min="-12" max="12" step="1" value={eqValues.band3k} onChange={(e) => handleEqChange('band3k', e.target.value)} />
                  <span className="eq-label">3.6kHz</span>
                </div>
                <div className="eq-band">
                  <span className="eq-label">{eqValues.band14k > 0 ? `+${eqValues.band14k}` : eqValues.band14k}</span>
                  <input type="range" className="eq-slider" min="-12" max="12" step="1" value={eqValues.band14k} onChange={(e) => handleEqChange('band14k', e.target.value)} />
                  <span className="eq-label">14kHz</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-settings">
              <h3 className="settings-section-title">My Profile</h3>
              
              <div className="avatar-section">
                <div className="avatar-preview"></div>
                <button className="change-avatar-btn">Change Avatar</button>
              </div>

              <div className="input-group">
                <label>Username</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={{ flex: 1 }}
                  />
                  <button 
                    className="preset-btn" 
                    onClick={handleSaveProfile}
                    style={{ padding: '0 20px' }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notification-settings">
              <h3 className="settings-section-title">Notifications</h3>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">New Releases</span>
                  <span className="notification-desc">Get notified when followed artists release new music.</span>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={notifications.newReleases} onChange={() => toggleNotification('newReleases')} />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Playlist Updates</span>
                  <span className="notification-desc">Hear about new additions to followed playlists.</span>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={notifications.playlistUpdates} onChange={() => toggleNotification('playlistUpdates')} />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Email Notifications</span>
                  <span className="notification-desc">Receive occasional emails with recaps and news.</span>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={notifications.emailAlerts} onChange={() => toggleNotification('emailAlerts')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
