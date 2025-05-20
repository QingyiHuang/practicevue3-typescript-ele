import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const http: AxiosInstance = axios.create({
    baseURL: '/',
    timeout: 3000
})
// 生成一个唯一标志根据url+method
const getRequstKey = (config: InternalAxiosRequestConfig) => {
    return [config.url, config.method].join('&')
}
// 一个用来存储当前正在请求的接口
const pendingRequests = new Map()
// 请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 如果当前请求里面有这么个数据，那么 我们需要取消请求并重新发送
    const key = getRequstKey(config)
    if (pendingRequests.has(key)) {
        pendingRequests.get(key)?.()// 执行cancel
        pendingRequests.delete(key)
    }
    config.cancelToken = new axios.CancelToken(cancel => {
        pendingRequests.set(key, cancel)
    })
    return config
}, (error: AxiosError) => {
    return Promise.reject(error)
})
http.interceptors.response.use((response: AxiosResponse) => {
    const { code, data } = response.data
    if (code === 0) {
        return data
    }
}, (err: AxiosError) => {
    if (err.message) {
        console.log(err.message)
    }
    return Promise.reject(err)
})
// 存储待取消的请求
const cancelAllRequest = () => {
    pendingRequests?.forEach(item => {
        item?.()
    })
    pendingRequests.clear()
}

const post = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return http({
        method: 'post',
        url,
        ...config
    })
}
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return http({
        method: 'get',
        url,
        ...config
    })
}
export default {
    post,
    get,
    cancelAllRequest
}