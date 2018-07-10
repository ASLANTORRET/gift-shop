import React from 'react'
import { DRAFTS_QUERY } from '../../../queries/draft'

import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

const DraftList = ({ data: { loading, drafts} }) => {
  if (loading) {
    return <p>loading...</p>
  }
  return (
    <div className="container stylization maincont">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>дата создания</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { drafts.map((draft, index) => {
            return (
              <tr key={index}>
                <td><Link to={`/shop/draft/${draft._id}`}>{index + 1}</Link></td>
                <td>{ draft.createdAt }</td>
                <td></td>
              </tr>
            )
          })}

        </tbody>
      </table>

    </div>
  )
}

const withData = graphql(DRAFTS_QUERY)

export default withData(DraftList)