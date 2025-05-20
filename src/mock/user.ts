export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: () => ({
            code: 0,
            message: 'success',
            data: {
                token: 'token-20250519',
                username: 'admin'
            }
        })
    }
]