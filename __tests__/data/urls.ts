export const urls = {
    auth: '/#/login',
    users: {
        list: '/#/users',
        create: '/#/users/create'
    },
    labels: {
        list: '/#/labels',
        create: '/#/labels/create'
    },
    statuses: {
        list: '/#/task_statuses',
        create: '/#/task_statuses/create'
    },
    tasks: {
        board: '/#/tasks',
        create: '/#/tasks/create',
        items: (id: number) => '/#/tasks/' + id
    }
} as const;
