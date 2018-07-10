
const locale = (state = {language: 'RU'}, { type, language }) => {
    switch( type ){
        case 'SET_LANGUAGE':
            return language
        default:
            return state
    }
}

export default locale