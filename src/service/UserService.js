import axios from "axios";
import { GIT_AUTH_CODE_KEY } from 'utils/Constants';

 class UserService {

    static async getGitUsers({searchText}) {

    	const accessToken = await  UserService.getAuthToken();

	    let userDetails={};
        try {

        	if(!accessToken ){
		        userDetails = {
			        success: false,
			        totalCount: 0,
			        userList: [],
			        isInComplete: false,
			        message: 'Invalid Token',
		        };

		        return  userDetails;
	        }
            const userResponse = await axios({
                method: "get",
                url: `https://api.github.com/search/users?q=+location:${searchText}&sort=stars&order=asc&page=1&per_page=10`,
                // url: `https://api.github.com/search/hello?124`, to simulate Errors .
                headers: {
                    //Authorization: `Bearer aa424f6fcf3d631e3d2832c9220dcfa6afb74473`,
                    Authorization: `token ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            const {

                data: {
                    items: userList,
                    total_count: totalCount,
                    incomplete_results: isInComplete
                }
            } = userResponse;


            const userInfo = await this.getUserListInfo(userList)

            const formattedData = userInfo.map((item) => {

                const {
                    data: {
                        id,
                        login,
                        url,
                        bio,
                        avatar_url,
                        name,
                        company,
                        blog,
                        location,
                        email,
                    }

                } = item;

                return {
                    id,
                    login,
                    url,
                    bio,
                    avatar_url,
                    name,
                    company,
                    blog,
                    location,
                    email,
                }
            });
            userDetails = {
                success: true,
                totalCount,
                userList: formattedData,
                isInComplete,
                message: null
            };

            return userDetails;

        } catch (err) {
            userDetails = {
                success: false,
                totalCount: 0,
                userList: [],
                isInComplete: false,
                message: err.message || 'Service/Network Error.'
            };

            return userDetails;
        }
    }

    static getUserDetails(userConfig) {

        const {
            url: userDetailsUrl,
        } = userConfig;

        return axios({
            method: "get",
            url: userDetailsUrl,
            headers: {
                Authorization: `Bearer c4dbea732fe41bbee4f8e452772ce0a44294285f`,
                "Content-Type": "application/json"
            },
            auth: {
                user: 'c4dbea732fe41bbee4f8e452772ce0a44294285f',
                pass: 'x-oauth-basic',
                sendImmediately: true
            }
        });
    }

    static async getUserListInfo(userList = []) {
        try {
            const userDetails = userList.map(this.getUserDetails);

            return Promise.all(userDetails);
        } catch (err) {
            console.log('Network Error', err);
        }

    }


    static async getAuthToken (){

	   const authCode = localStorage.getItem(GIT_AUTH_CODE_KEY);

	   if(authCode) {
		   let data = new FormData()
		   data.append('client_id', 'c8d91cbd3f6ca1bd65bc');
		   data.append('client_secret', '69ae9024e06499f358022d8a341ae73afcfdb248');
		   data.append('code', authCode);

		   try {
			   const textResponse = await axios({
				   method: "post",
				   headers: {
						   'Content-Type': 'application/json',
						   'Accept': 'application/json'
				   },
				   url: `https://sph-cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`,

				   data: data,
				   transformResponse: [(data) => {
				   	return data;
				   }]
			   });

			   const {
				   access_token: accessToken ='',
			   } = JSON.parse(textResponse.data);
			   return accessToken
		   }catch (error) {
		   	localStorage.setItem(GIT_AUTH_CODE_KEY,'');
		   }
	   }

     }

}


export default UserService;
