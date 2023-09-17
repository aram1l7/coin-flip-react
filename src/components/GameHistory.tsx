import React from "react";
import { Header, Table } from "semantic-ui-react";

export function GameHistory({ gameHistory }) {
  return (
    <div className="">
      <div className="">
        <h3>Game History</h3>
      </div>

      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Game Id</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {gameHistory.toReversed().map((gh) => (
            <Table.Row key={gh.timestamp}>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    {gh.gameId} : {gh.timestamp}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{gh.simulationResult.toString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
