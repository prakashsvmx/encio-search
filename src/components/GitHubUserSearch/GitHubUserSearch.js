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
import { GIT_AUTH_CODE_KEY } from 'utils/Constants';

class GitHubUserSearch extends React.PureComponent {
    state = {
        lookupLocation: 'Kyiv',
        isAuthenticated:false,
    };

    componentDidMount() {
       // this.getApiResult();
        const authCode = GitAuthUtils.getUrlParam('code','');
        if(!authCode){
            GitAuthUtils.authorizeGitHub();
        } else {
            localStorage.setItem(GIT_AUTH_CODE_KEY, authCode);
            this.setState({
                isAuthenticated: true,
            });
        }

        window.addEventListener('storage', this.onAuthCodeChange, false);


    }
    componentWillUnmount () {
        window.removeEventListener('storage', this.onAuthCodeChange, false);
    }

    onAuthCodeChange = (
      {
        key,         // name of the property set, changed etc.
        oldValue,     // old value of property before change
        newValue,
        }
    ) => {


        if(key ===GIT_AUTH_CODE_KEY && newValue && oldValue !== newValue){

                this.setState({
                    isAuthenticated: true,
                })
            }else {
                this.setState({
                    isAuthenticated: false,
                }, () => {
                    const uri = window.location.toString();
                    let clean_uri = uri;
                    if (uri.indexOf("?") > 0) {
                        clean_uri = uri.substring(0, uri.indexOf("?"));
                    }
                    window.location.replace(clean_uri);
                });
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
            isAuthenticated,
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

        const isAuthorized = isAuthenticated;

        return (
            <SearchView>

               <CenteredContainer>
                   {!isAuthorized &&
                        <Button onClick={this.authorizeGitHub}>Login with GitHub</Button>
                   }
                    </CenteredContainer>

                {isAuthorized && (
                  <>
                  <CenteredContainer>
                      <H4>Github User Search</H4>
                  </CenteredContainer>
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
