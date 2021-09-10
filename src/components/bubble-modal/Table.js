import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Bubble } from './Bubble'

export const Table = ({ bubbles }) => {
  return (
    <Grid
      columns={5}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        width: '90%'
      }}
    >
      {console.log('helllo')}
      {bubbles.map(bubbleType => (
        <Grid.Row
          style={{ padding: -40, paddingBottom: 0, paddingTop: 0 }}
          key={`bubble-type-${bubbleType[0]}`}
        >
          {bubbleType[1].map((bubble, index) => (
            <Grid.Column
              style={{ padding: 10 }}
              key={`bubble-${bubbleType[0]}-${index}`}
            >
              <Bubble index={index} data={bubble} />
            </Grid.Column>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  )
}
