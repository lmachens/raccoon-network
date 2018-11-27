module.exports = {
  manifest_version: 1,
  type: 'WebApp',
  meta: {
    name: 'Raccoon Network',
    version: '0.23.0',
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
        transparent: false,
        resizable: false,
        show_in_taskbar: true,
        desktop_only: true,
        size: {
          width: 680,
          height: 420
        },
        min_size: {
          width: 680,
          height: 420
        },
        max_size: {
          width: 680,
          height: 420
        },
        start_position: {
          Top: 100,
          Left: 300
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
