import axios from 'axios'
import { Notification,MessageBox } from 'element-ui'

const init = function () {
    console.log('init');
    console.log(process.env.VUE_APP_API_BASE_URL);
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

    headers();
    errors();
};

function headers() {
    axios.defaults.headers.common['Accept'] = 'application/json';
}

function errors() {
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const {data} = response;


        return data;
    }, function (error) {
        console.log(error);
        const {status} = error.response;
        // Notification.close();
        console.log(status);
        switch (status) {
            case 301:
                return alertError("登录信息失效，请刷新或者重新打开页面", error);
                break;


            default:
                Notification.error("服务器错误，请稍候重试");
                break;
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}

function alertError(msg, error) {
    return new Promise(function (resolve, reject) {
        MessageBox.alert(msg, '错误', {
            callback: () => {
                return reject(error);
            }
        });
    })

}

export default {
    init: init
};