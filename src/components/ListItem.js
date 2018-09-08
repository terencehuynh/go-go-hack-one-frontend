import React from "react";
import { ListGroupItem } from 'reactstrap';

const ListItem = (props) => {
  const { dataObject } = props;
  const dataKeys = Object.keys(dataObject);
  dataKeys.sort();
  return (
    <ListGroupItem >

      <div style={{ display: 'flex'}}>
        {dataKeys.map((k) => (<p><b>{k}:</b> {dataObject[k] }&nbsp;</p>))}
      </div>
    </ListGroupItem>
  );
};

export default ListItem;
