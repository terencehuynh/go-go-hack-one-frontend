import React, { Component } from "react";
import axios from 'axios';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ListItem from "./ListItem";


class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchResponseData: {}
    }
  }

  // TODO: Replace this with the call in another component.
  // TODO: Call the url of the deployment and not local host?
  replaceMeLater = () => {
    this.setState({ loading: true });
    axios.get("http://localhost:3000/search", {
      // Find all patents for an org with these details.
      params: {
        uid: "my-user-id",
        entityQueryType: "patent", // "patent" or "organisation".
        queryName: "Google",  // Organisation name.
        queryAcn: 999999999,  // 9 digit ACN.
        queryAbn: 99999999999 // 11 digit ABN.
      }})
      .then((successResponse) => {
        // Parse response.
        console.log("start")
        let responseData = {};
        const searchResponses = successResponse.data;
        console.log(searchResponses);
        for (var i = 0; i < searchResponses.length; i++) {
          const entityId = searchResponses[i].entity_id;
          if (!(entityId in responseData)) {
            responseData[entityId] = {};
          }
          if (!(searchResponses[i].name in responseData[entityId])) {
            responseData[entityId][searchResponses[i].name] = searchResponses[i].attribute_value;
          }
        }
        console.log(responseData);
        this.setState({ searchResponseData: responseData, loading: false })
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      })

  };

  render() {
    return (
      <section className="section" style={{}}>
        <div
          style={{ textAlign: 'center'}}
          onClick={this.replaceMeLater}
        >Get Results!
        </div>
        <div style={{ justifyContent: 'center', display: 'flex'}}>
          <PacmanLoader
            color={'#36D7B7'}
            size={50}
            loading={this.state.loading}
          />
          {
            Object.keys(this.state.searchResponseData).length > 0 ?
              <ListGroup>
                {Object.keys(this.state.searchResponseData).map((k, i) =>
                  <ListItem key={i} dataObject={this.state.searchResponseData[k]}/>
                  )}
              </ListGroup> : null
          }
        </div>
      </section>
    );
  }
}


export default Results;
