import React from 'react';
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react';
import roundHomeWork from '@iconify/icons-ic/round-home-work';
import roundHotel from '@iconify/icons-ic/round-hotel';

import './sidebar.css';

const SideNav = props => {
  return (    
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <Icon icon={roundHomeWork} className="icon"/>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/project" className="nav-link">
              <Icon icon={roundHomeWork} className="icon"/>
              Project
            </NavLink>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
            <Icon icon={roundHotel} className="icon"/>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideNav;