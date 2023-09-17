import React from "react";
import { Table } from "semantic-ui-react";

function BetHistory({ betHistory }) {
  return (
    <div>
      <div className="">
        <h3>Bet History</h3>
      </div>
      <Table color={"teal"} inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Bet Id</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>Wager</Table.HeaderCell>
            <Table.HeaderCell>Payout</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {betHistory.toReversed().map((bh) => {
            return (
              <Table.Row key={bh.timestamp}>
                <Table.Cell>{bh.betId}</Table.Cell>
                <Table.Cell>{bh.timestamp}</Table.Cell>
                <Table.Cell>{bh.wager}</Table.Cell>
                <Table.Cell>{bh.payout}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default BetHistory;
