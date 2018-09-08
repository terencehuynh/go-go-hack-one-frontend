import React, { Component } from "react";
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ListItem from "./ListItem";


class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchResponseData: {},
      queryStringShow: ""
    }
  }

  // TODO: Replace this with the call in another component.
  // TODO: Call the url of the deployment and not local host?
  replaceMeLater = () => {
    this.setState({ loading: true });
    // Find all patents for an org with these details.
    const queryParams = {
      uid: "my-user-id",
      entityQueryType: "patent", // "patent" or "organisation".
      queryName: "Google",  // Organisation name.
      queryAcn: 999999999,  // 9 digit ACN.
      queryAbn: 99999999999 // 11 digit ABN.
    };
    axios.get("http://localhost:3000/search", {
      params: {
        ...queryParams
      }})
      .then((successResponse) => {
        // Parse response.
        console.log("start");
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

        const queryStringInfo = [];
        if (queryParams.entityQueryType === "patent") {
          queryStringInfo.push("show me patents for")
        } else {
          queryStringInfo.push("show me data for")
        }
        if (queryParams.queryName !== undefined && queryParams.queryName !== "") {
          queryStringInfo.push("name: " + queryParams.queryName)
        }

        if (queryParams.queryAbn !== undefined && queryParams.queryAbn !== 0) {
          queryStringInfo.push("ABN: " + queryParams.queryAbn)
        }

        if (queryParams.queryAcn !== undefined && queryParams.queryAcn !== "") {
          queryStringInfo.push("ACN: " + queryParams.queryAcn)
        }

        const suffix = queryStringInfo.slice(1);
        let queryStringShow = queryStringInfo[0] + " "  + suffix.join(" or ");

        this.setState({ searchResponseData: responseData, loading: false, queryStringShow: queryStringShow })
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
        >
          {this.state.queryStringShow.length > 0 ?
            <div>Results for {this.state.queryStringShow}</div> :
            <div>Get Results!</div>}
        </div>
        <div style={{ justifyContent: 'center', display: 'flex'}}>
          <BarLoader
            color={'#36D7B7'}
            size={50}
            width={300}
            loading={this.state.loading}
          />
          {
            Object.keys(this.state.searchResponseData).length > 0 && this.state.loading === false ?
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
