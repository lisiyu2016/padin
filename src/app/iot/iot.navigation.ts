import { environment } from 'environments/environment';

export const DefaultIotModuleNavigation = [
  {
    icon: 'icon-projects_other',
    title: 'Projects',
    permissions: ['PROJECTS::VIEW'],
    class: 'project',
    auth: true,
    children: [
      {
        link: '/project/create',
        icon: '',
        title: 'Create a project',
        permissions: ['PROJECTS::VIEW'],
        auth: true,
        class: 'project-create'
      },
      {
        link: '/projects',
        icon: '',
        title: 'Projects List',
        permissions: ['PROJECTS::VIEW'],
        auth: true,
        class: 'project-list',
      }
    ]
  },
  {
    icon: 'icon-location_searching',
    title: 'Locations',
    class: 'location',
    children: [
      {
        link: '/location/new',
        icon: '',
        title: 'Create a location',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'location-create'
      },
      {
        link: '/locations',
        icon: '',
        title: 'View Locations',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'location-list'
      },
    ]
  },
  {
    icon: 'icon-visibility',
    title: 'Monitoring',
    class: 'monitoring',
    children: [
      {
        link: '/monitoring/manage-contacts',
        icon: '',
        title: 'Manage contacts',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'manage-contacts'
      },
    ]
  },
  {
    title: 'Integration',
    icon: 'icon-link',
    children: [
      {
        link: '/token',
        icon: 'icon-settings',
        title: 'Access tokens',
        class: 'settings',
        auth: true
      },
      {
        // link: '/docs',
        icon: 'icon-help',
        title: 'documents',
        class: 'docs',
        children: [
          {
            title: 'Introduction',
            class: 'docs-introduction',
            link: '/docs'
          },
          {
            title: 'Restful API',
            class: 'docs-restful-api',
            link: '/docs/restful-api'
          },
          {
            title: 'Sending information',
            class: 'docs-sending-information',
            link: '/docs/sending-information-over-https'
          },

        ]
      },
    ]
  },
  ! environment.production ? {
    icon: 'icon-fingerprint',
    title: 'Experimental',
    class: 'experimental',
    children: [
      {
        link: '/experimental',
        title: 'Introduction',
        class: 'introduction',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
      },
      {
        link: '/gps',
        icon: '',
        title: 'GPS Location',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'gps-location'
      },
    ]
  } : null,
];
