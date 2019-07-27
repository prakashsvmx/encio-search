import styled from "styled-components";


export const Button = styled.button`
    border: 1px solid gray;
    height: 3em;
    outline: 0;
    font-size: 16px;
    margin-left: 1em;
    min-width: 120px;
    border-radius: 23px;
    
`;

export const SearchBar = styled.div`
display:flex;
align-items:center;
justify-content:center;
padding:5px;
`;

export const Avatar = styled.div`
display:flex;
align-items:'center;
justify-content:center;
`;


export const SearchView = styled.div`
export display:flex;
    flex-flow: column;
        align-items: center;
    justify-content: center;
`;

export const SearchResultsView = styled.div`
display:flex;
    flex-flow: column;
  height: calc(100vh - 8em);
    overflow: auto;
    flex: 1;
    min-width: 380px;
    margin-top: 1em;
     margin-bottom: 1em;
`;
export const UserInfo = styled.div`
display:flex;
flex-flow: column;
   align-items: flex-start;
   padding-left:20px;
`;

export const InfoMessage = styled.div`
display:flex;
flex-flow: column;
   align-items: flex-start;
   font-size:12px;
`;


export const ErrorMessage = styled.div`
display:flex;
flex-flow: column;
   align-items: flex-start;
   font-size:12px;
   color:red;
   padding:20px;
   font-weight:400;
   font-size:20px
   text-align:center;
   align-items:center;
   
`;
export const UserBio = styled.div`
display:flex;
text-align:left;
font-size:12px;
line-height: 20pt;
padding-left: 3px
`;

export const H4 = styled.h4`
color: #3c3c3c;
margin:0;
padding:4px;
`;


export const ListItemWrapper = styled.div`
display:flex;
flex:1;
align-items:center;
padding: 1em;
border-bottom: 1px solid #f3f2f2;

`;


export const CenteredContainer = styled.div`
display:flex;
justify-content:center;
align-items: center;
`;

export const UserLocation = styled.div`
display:flex;
align-items: center;
justify-content:left;
line-height: 20pt;
`;

export const UserLocationText = styled.div`
padding-left:5px;
font-size:10px;
`;

export const UserLoginName = styled.a`
padding-left:5px
font-size:16px;
line-height: 20pt;
`;

export const UserDisplayName = styled.a`
padding-left:5px;
font-size:14px;
line-height: 20pt;
`;
