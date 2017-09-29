
import colors from 'constants/colors';

export default {
    alignTextLeft: {
        action: 'alignTextLeft',
        icon: 'glyphicon glyphicon-align-left',
        text: '',
        className : 'text-left'
    },

    alignCenter: {
        action : 'alignTextCenter',
        icon: "glyphicon glyphicon-align-center",
        text : '',
        className: 'text-right'
    },

    alignTextRight: {
        action: 'alignTextRight',
        icon : 'glyphicon glyphicon-align-right',
        className: 'text-right'
    },

    remove: {
        action: 'remove',
        icon: 'glyphicon glyphicon-trash'
    },

    makeFontSmaller : {
        action: 'makeFontSmaller',
        text: '-'
    },

    makeFontLarger: {
        action: 'makeFontLarger',
        text: '+'
    },

    makeFontLight: {
        action: 'makeFontLight',
        text: 'a'
    },

    makeFontBold: {
        action: 'makeFontBold',
        text: 'a'
    },

    toggleTextColor: {
        action: 'toggleTextColor',
        icon : 'glyphicon glyphicon-text-color',
        className: (fillTextBox) => fillTextBox.fill === colors.WHITE ? colors.WHITE : colors.BLACK
    }
}
