import React, { Component } from 'react';
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClusterNames, dbName, collNames } from '../../config';
import Error from '../Error';

export default class UpdateStockButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        updatedStock: false,
        updateError: undefined,
    };
  }

  updateStock() {
    const itemId = this.props.item._id;
    const newStock = this.props.item.stock === 0 ? Math.floor(Math.random() * (30 - 1)) + 1 : 0; 

    const db = this.props.client
      .getServiceClient(
        RemoteMongoClient.factory,
        stitchClusterNames.products
      )
      .db(dbName);

    this.props.clientAuthenticated
      .then(() =>
        db
          .collection(collNames.item)
          .updateOne({ _id: itemId }, { $set: { stock: newStock }})
      )
      .then(response => {
        const { matchedCount, modifiedCount } = response;
        if(matchedCount && modifiedCount) {
            this.setState({
                updatedStock: true,
                updateError: null
            });
            this.props.doAfterUpdateStock();
        }
      })
      .catch(err => {
        this.setState({
            updatedStock: false,
            updateError: err
        });
        console.error(err);
      });
  }

  render() {
    const item = this.props.item;

    if (!item) {
      return null;
    }

    if (!this.state.updateError) {
        if (!this.state.updatedStock) {
            return (
                <button className="update-stock covert-button" onClick={() => this.updateStock()}>Update Stock</button>
            );
        } else {
            return (
                <button disabled className="update-stock covert-button success">Updated Stock</button>
            );
        }
    } else {
      return (
        <Error
          className="update-stock"
          message={'Error while updating stock!'}
          error={this.state.updateError}
          display={'small'}
        />
      );
    }
  }
}
