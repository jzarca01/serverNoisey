import React, {Component} from 'react';
import * as superagent from 'superagent';
import 'isomorphic-fetch';
import {LineChart} from 'react-d3';

export default class extends Component {

  static async getInitialProps ({ req }) {
    if (req) {
      // If `req` is defined, we're rendering on the server and should use
      // MongoDB directly. You could also use the REST API, but that's slow
      // and inelegant.
      const { db } = req
      // Note that `db` above comes from express middleware
      const list = await db.collection('devices').find().sort({ createdAt: -1 })
        .toArray()
      return { list }
    }

    // Otherwise, we're rendering on the client and need to use the API
    const { list } = await superagent.get('http://localhost:3000/api')
      .then(res => res.body)
    return { list }
  }

  constructor() {
    super();
    this.state= {
      test: "Coucou list"
    };
  }

  render() {
        var test = this.props.list;
        var lineData = [
          { 
            name: 'series1',
            values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
            strokeWidth: 3,
            strokeDashArray: "5,5",
          },
          {
            name: 'series2',
            values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
          },
          {
            name: 'series3',
            values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
          } 
        ];
        return (
            <div>
              {JSON.stringify(test)}
              <LineChart
                data={lineData}
                width={600}
                height={300}
              />
            </div>
        );
  }

  /* ... */
}