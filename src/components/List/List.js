import React from 'react';
import ProgressDots from "components/ProgressDots/ProgressDots";
import ListItem from "components/ListItem/ListItem";


const List = ({
                  isLoading,
                  listItems
              }) => {
    return (
        <>
            {isLoading ? (<ProgressDots/>) : listItems.map((userInfo, idx) => {
                const {
                    id
                } = userInfo;
                return (<ListItem key={id} aUserCopy={userInfo}/>);
            })
            }
        </>
    )
}


export default List;
