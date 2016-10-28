import cookie from 'cookie';
function getLocale() {
	if (process.env.BROWSER){
		if(cookie.parse(document.cookie).locale){
			return 'locale'
		}
		return 'en'
	}
}



export {getLocale}