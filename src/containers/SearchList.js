import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getApiData} from 'store/actionCreators'
import GitHubUserSearch from "components/GitHubUserSearch/GitHubUserSearch";

const mapStateToProps = (state) => {
    const {
        httpRequestStatus: {
            apiDataLoading
        },
        gitHubUsers
    } = state;
    return {
        apiDataLoading,
        gitHubUsers
    }
}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getApiData,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GitHubUserSearch);
