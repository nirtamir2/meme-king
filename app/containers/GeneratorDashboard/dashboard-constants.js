import Dropzone from 'components/DropZone/DropZone';
import helpers from 'helpers/helpers';
import globalConstants from 'constants/global';
import WebViewService from 'services/webViewService'

export default {
    buttons: {
        closeGenerator: {
            icon: 'EXIT',
            className: '',
            getLabel: () => 'יציאה',
            onClick: 'closeGenerator',
            show: () => helpers.isMobile() && !WebViewService.isWebView
        },
        addTextLine: {
            icon: 'PLUS',
            className: '',
            getLabel: () => 'טקסט',
            onClick: 'addTextLine',
            show: () => true
        },
        sendImageToCropper: {
            icon: 'SCISSORS',
            className: '',
            getLabel: () => 'חיתוך',
            onClick: 'sendImageToCropper',
            show: ({ isCleanSlateState }) => !isCleanSlateState
        },
        uploadFiles: {
            icon: 'PICTURE',
            componentClass: Dropzone,
            getLabel: () => ' תמונות',
            onDrop: 'uploadFiles',
            show: () => true
        },
        toggleItemsArea: {
            icon: 'SUNGLASSES',
            className: '',
            getLabel: () => ' פריטים',
            onClick: 'toggleItemsArea',
            show: () => true
        },
        changeFormat: {
            icon: 'RETWEET',
            className: '',
            getLabel: ({ format }) => format === globalConstants.format.normal ? ' דאנק ' : " רגיל",
            onClick: 'changeFormat',
            show: ({ isCleanSlateState }) => !isCleanSlateState
        },
        download: {
            icon: 'DOWNLOAD',
            className: '',
            getLabel: () => 'הורדה',
            onClick: 'download',
            show: () => true

        },
    }
}