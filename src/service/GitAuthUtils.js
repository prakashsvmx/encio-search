/**
 * @author prakash
 * @copyright 2019 ServiceMax
 */

export default  class GitAuthUtils {


	static authorizeGitHub = () => {
		window.location='https://github.com/login/oauth/authorize?client_id=c8d91cbd3f6ca1bd65bc&allow_signup=true&scope=user,repo&redirect_uri=https://encio-search.herokuapp.com/index.html';
	}

	static  getUrlVars =()=>{
		const vars = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	static getUrlParam = (parameter, defaultvalue)=> {
		var urlparameter = defaultvalue;
		if(window.location.href.indexOf(parameter) > -1){
			urlparameter = this.getUrlVars()[parameter];
		}
		return urlparameter;
	}

}
