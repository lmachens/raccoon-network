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
  permissions: [],
  data: {
    game_targeting: {
      type: 'all'
    },
    start_window: 'main',
    windows: {
      main: {
        file: 'main.html',
        transparent: true,
        resizable: true,
        show_in_taskbar: true,
        size: {
          width: 400,
          height: 700
        },
        min_size: {
          width: 400,
          height: 500
        }
      }
    },
    'extra-objects': {},
    externally_connectable: {
      matches: []
    },
    launch_events: [
      {
        event: 'AllGamesLaunch',
        event_data: {
          game_ids: [],
          wait_for_stable_framerate: 30
        },
        start_minimized: false
      }
    ]
  }
};
