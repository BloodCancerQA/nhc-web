export default [
    {
        path: '/',
        component: '@/pages/faq/layout',
        routes: [
            {
                index: true,
                path: '/Hodgkin',
                component: '@/pages/faq/hodgkin'
            },
            {
                path: '/non_Hodgkin',
                component: '@/pages/faq/nonHodgkin'
            },
            {
                path: '/Lymphoma_forum',
                component: '@/pages/faq/lymphoma'
            },
            {
                path: '/Others',
                component: '@/pages/faq/others'
            },
        ]
    }
];
