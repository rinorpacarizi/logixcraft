import React from "react";
import { Button, Grid } from "semantic-ui-react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <Grid className="main-grid">
      <Grid.Column>
        <Grid.Row>
          <label>Check your orders</label>
          <Grid.Column className="inner-row-columns">
            <Button color="pink" icon="table">
              Orders
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <label>See Reports</label>
          <Grid.Column className="inner-row-columns">
            <Button color="blue" icon="chart bar">
              Reports
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column>
        
          <Grid.Row>
            <label>Order Products</label>
            <Grid.Column className="inner-row-columns">
              <Button color="violet" icon="shop">
                Products
              </Button>
            </Grid.Column>
          </Grid.Row>
        <Grid.Row>
          <label>Edit Profile</label>
          <Grid.Column className="inner-row-columns">
            <Button color="green" icon="chart bar">
              Profile
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
