import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.dummyData,
      expanded: {}
    };
  }

  dummyData = [
    {
      "firstName": "alice",
      "lastName": "adams",
      "age": 11,
      "comments": [],
    },
    {
      "firstName": "bob",
      "lastName": "brady",
      "age": 18,
      "comments": [
        "hello", "i like things that start with b"
      ]
    },
    {
      "firstName": "Another",
      "lastName": "User",
      "age": 15,
      "comments": []
    },
    {
      "firstName": "catherine",
      "lastName": "collins",
      "age": 22,
      "comments": [
        "just chiming in with things that start with c",
        "Mary Poppins does drugs",
        "Who is Donald anyway?"
      ]
    },
    {
      "firstName": "david",
      "lastName": "davidson",
      "age": 34,
      "comments": []
    },
  ]

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName"
            },
            {
              Header: "Last Name",
              accessor: "lastName"
            },
            {
              Header: "Age",
              accessor: "age",
              width: 50
            },
            {
              expander: true,
              Header: () => <strong>Comments</strong>,
              width: 100,
              Expander: ({ isExpanded, ...rest }) =>
              {
                // test your condition for Sub-Component here
                // I am using the presence of no comments
                if(rest.original.comments.length==0) {
                  return null;
                } else {
                  return (
                    <div>
                      {isExpanded
                        ? <span>&#x2299;</span>
                        : <span>&#x2295;</span>
                      }
                    </div>
                  );
                }
              },
              getProps: (state, rowInfo, column) => {
                // console.log('getProps:',{state,ri:rowInfo,column});
                if(rowInfo)
                {
                  // same test as above
                  if(rowInfo.original.comments.length == 0)
                  {
                    // hijack the onClick so it doesn't open
                    return {
                      onClick: () => {},
                    }
                  }
                }
                return {
                  className: 'show-pointer', 
                };
              },
              style: {
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              }
            }
          ]}
          onExpandedChange={(expanded, index, event) => {
            // console.log(index, expanded);
            // don't for get to save the 'expanded'
            // so it can be fed back in as a prop
            this.setState({expanded});            
          }}
          defaultPageSize={10}
          showPagination={false}
          className="-striped -highlight"
          expanded={this.state.expanded}
          SubComponent={row => {
            // this is the broken part

            // NOTE: you need to return your component if there a {}
            // and the correct semantics for the LI wrapper is UL (not DIV)
            return (
              <ul>
                {row.original.comments.map((item, i) => {
                  // console.log(item)
                  return <li key={i}>{item}</li>
                })}
              </ul>
            )
          }}
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
