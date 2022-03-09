import React from 'react';
import ScrollableList from 'react-scrollable-list';

const PollList = () => {

    let PollList = [];
    for (let i = 0; i < 50; i++) {
        PollList.push({id: i, content: i});
    }

    //const mainList = polls.map(poll => <h2>{poll}</h2>);

    return (
        <div style={{height: '100px', overflow: 'auto'}}>
            <ScrollableList
                listItems={PollList}
                heightOfItem={30}
                maxItemsToRender={50}
                style={{background: 'black', padding: '50px'}}
            />
        </div>
    )
}

export default PollList;