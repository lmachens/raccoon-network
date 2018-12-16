module.exports = {
  manifest_version: 1,
  type: 'WebApp',
  meta: {
    name: 'Raccoon Network',
    version: '1.0.0',
    'minimum-overwolf-version': '0.109.1',
    author: 'Leon Machens',
    icon: 'assets/logo.png',
    icon_gray: 'assets/logo.png',
    launcher_icon: 'assets/favicon.ico',
    description: ''
  },
  permissions: ['FileSystem', 'GameInfo', 'Hotkeys', 'Media', 'VideoCaptureSettings'],
  data: {
    game_targeting: {
      type: 'all'
    },
    game_events: [5426],
    start_window: 'main',
    windows: {
      main: {
        file: 'main.html',
        transparent: true,
        resizable: true,
        show_in_taskbar: true,
        desktop_only: true,
        native_window: true,
        size: {
          width: 410,
          height: 700
        },
        min_size: {
          width: 410,
          height: 600
        },
        max_size: {
          width: 1000,
          height: 900
        }
      }
    },
    'extra-objects': {},
    externally_connectable: {
      matches: []
    },
    hotkeys: {
      replay_save: {
        title: 'Save replay',
        'action-type': 'custom',
        default: 'Shift+F12'
      }
    },
    launch_events: [
      {
        event: 'AllGamesLaunch',
        event_data: {
          game_ids: [],
          wait_for_stable_framerate: 30
        },
        start_minimized: true
      }
    ]
  }
};
