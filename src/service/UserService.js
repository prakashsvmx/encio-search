import axios from "axios";

 class UserService {

    static async getGitUsers({searchText}) {
        try {
            const userResponse = await axios({
                method: "get",
                url: `https://api.github.com/search/users?q=+location:${searchText}&sort=stars&order=asc&page=1&per_page=10`,
                // url: `https://api.github.com/search/hello?124`, to simulate Errors .
                headers: {
                    Authorization: `Bearer c4dbea732fe41bbee4f8e452772ce0a44294285f`,
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
            const userDetails = {
                success: true,
                totalCount,
                userList: formattedData,
                isInComplete,
                message: null
            };

            return userDetails;

        } catch (err) {
            const userDetails = {
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

}


export default UserService;
