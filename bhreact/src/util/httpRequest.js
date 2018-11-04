import $ from 'jquery'
import { message, Modal } from 'antd'

const SERVER_ERROR = '服务器通讯异常';
export default function (address, type = 'POST', params = {}, sucFuc, dispatch, loading = true) {
    let postfix = "";
    let urlPositfix = "";

    if (params.searchFields && params.searchFields.undefined) {
        params.searchFields = {};
    }

    let hostname = window.location.hostname;
    if ((hostname.indexOf("localhost") !== -1 || hostname.indexOf("0.0.0.0") !== -1) && window.location.port.charAt(0) === "3") {
        type = 'GET';
        postfix = ".json";
        urlPositfix = '../../server/';
    }

    // if (loading) {
    //     dispatch({
    //         type: 'LOADING',
    //         data: {
    //             show: true
    //         }
    //     });
    // }

    let ajaxParam = {
        type: type,
        url: urlPositfix + address + postfix + '?cacheId=' + (+new Date()),
        success: function (data) {
            // if (loading) {
            //     dispatch({
            //         type: 'LOADING',
            //         data: {
            //             show: false
            //         }
            //     });
            // }
            if (typeof data === 'string') {
                data = data === '' ? {} : JSON.parse(data);
            }

            if (data.developerMessage) {
                console.debug(data.developerMessage);
            }

            sucFuc(data);
        },
        error: function (xhr, errorType, error) {
            // if (loading) {
            //     dispatch({
            //         type: 'LOADING',
            //         data: {
            //             show: false
            //         }
            //     });
            // }
            if (xhr.status === 200) {
                sucFuc && sucFuc(xhr.responseText);
                return;
            }
            if (xhr.status === 302) {
                window.location.href = xhr.responseText;
                return;
            }

            // ** form errors
            if (xhr.status === 422) {
                Modal.error({
                    title: '提示',
                    content: xhr.responseJSON.message || SERVER_ERROR
                });

                return;
            }

            if (xhr.status !== 200) {
                message.error(SERVER_ERROR);
            }
        }
    };
    $.ajax(ajaxParam);
}
