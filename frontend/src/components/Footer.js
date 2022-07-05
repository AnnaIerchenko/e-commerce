import React from 'react'
import '../styles/footer.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='f-container'>
      <div className="f-row">
        <div className="f-col">
        <img src="/images/logo/logo.png" alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
             nisi? Maxime minus consequuntur quo quibusdam laudantium cum 
          </p>
        </div>
        <div className="f-col">
          <h2>Quick links</h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
        <h2>Category</h2>
          <ul>
            <li>
              <NavLink to="/">Men</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Woman</NavLink>
            </li>
            <li>
              <NavLink to="/about">Kids</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
        <h2>Stay in touch with us</h2>
        <div className="socials">
          <a href="/"><img src="/images/socials/facebook.png" alt="" /></a>
          <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
          <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
          <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
          </div>
        </div>
      </div>
      <div className="f-copyrow">
        <p>&copy; 2022. AllRights reserved. Powered by Anna Ierchenko</p>
      </div>
    </div>
  )
}

export default Footer