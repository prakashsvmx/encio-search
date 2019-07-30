import React from 'react';
import {Input} from 'components/Input/Input';
import List from 'components/List/List';
import {
    Button,
    CenteredContainer,
    ErrorMessage,
    H4,
    InfoMessage,
    SearchBar,
    SearchResultsView,
    SearchView
} from 'components/StyledComponents/StyledComponents';
import GitAuthUtils from 'service/GitAuthUtils';

class GitHubUserSearch extends React.PureComponent {
    state = {
        lookupLocation: 'Kyiv',
    };

    componentDidMount() {
        // this.getApiResult();
        const authCode = GitAuthUtils.getUrlParam('code','');
        if(!authCode){
            GitAuthUtils.authorizeGitHub();
        } else {
            localStorage.setItem('git_auth_code', authCode);
        }

    }


    getApiResult = () => {

        const {
            actions: {
                getApiData
            }
        } = this.props;

        const {
            lookupLocation,
        } = this.state;

        if(lookupLocation) {
            getApiData({
                actionType: 'GET_GIT_USER_LIST',
                searchText: lookupLocation,
            });
        }
    }

    updateSearchText = (e) => {

        const {
            target: {
                value: searchText,
            }
        } = e;
        this.setState({lookupLocation: searchText});

    }


    render() {

        const {
            lookupLocation,
        } = this.state;

        const {
            apiDataLoading,
            gitHubUsers: {
                success,
                totalCount = 0,
                currentPage = 1,
                userList = [],
                // isInComplete, ?
                message = ''
            }
        } = this.props;

        const isAuthorized = localStorage.getItem('git_auth_code');

        return (
            <SearchView>

               <CenteredContainer>
                   {!isAuthorized &&
                        <Button onClick={this.authorizeGitHub}>Login with GitHub</Button>
                   }
                    </CenteredContainer>

                {isAuthorized && (
                  <>
                    <SearchBar>
                        <Input type="text" placeholder="enter a location" value={lookupLocation} disabled={apiDataLoading}
                               onChange={this.updateSearchText}></Input>
                        <Button onClick={this.getApiResult} disabled={apiDataLoading}>Search</Button>
                    </SearchBar>
                    {(success === false) && <ErrorMessage>Error: {message}</ErrorMessage>}
                    <InfoMessage>{totalCount > 0 && !apiDataLoading ? (`displaying ${currentPage * 10} of ${totalCount} users.`) : ''} </InfoMessage>

                    <SearchResultsView>
                        <List isLoading={apiDataLoading} listItems={userList}/>
                    </SearchResultsView>

                  </>
                )
                }

            </SearchView>
        )
    }
}


export default GitHubUserSearch;
