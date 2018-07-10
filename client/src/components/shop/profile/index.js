import React from 'react'
import { Link } from 'react-router-dom'

const ProfileIndex = () => {
  return <div>
    <ul>
      <li>
        <Link to="/shop/drafts">Заказы</Link>
      </li>
      <li>
        <Link to="/shop/drafts">Мои черновики</Link>
      </li>
    </ul>
  </div>
}

export default ProfileIndex