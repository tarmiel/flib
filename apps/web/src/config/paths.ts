export const APP_PATH = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    resources: {
      path: '',
      getHref: () => '/app',
    },
    resource: {
      path: 'resources/:resourceId',
      getHref: (id: string | number) => `/app/resources/${id}`,
    },
    savedResources: {
      path: 'resources/saved',
      getHref: () => `/app/resources/saved`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
    dashboard: {
      root: {
        path: '/app/dashboard',
        getHref: () => '/app/dashboard',
      },
      stats: {
        path: 'stats',
        getHref: () => `/app/dashboard/stats`,
      },
      resources: {
        path: 'resources',
        getHref: () => `/app/dashboard/resources`,
      },
      uploadResource: {
        path: 'resources/upload',
        getHref: () => `/app/dashboard/resources/upload`,
      },
      editResource: {
        path: 'resources/:resourceId/edit',
        getHref: (id: string | number) => `/app/dashboard/resources/${id}/edit`,
      },
      users: {
        path: 'users',
        getHref: () => `/app/dashboard/users`,
      },
    },
  },
} as const;
