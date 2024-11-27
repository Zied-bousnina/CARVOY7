import React from 'react';
import { Button, Tooltip } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserTie } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onRefresh, onAddRequest, onTabChange }) => (
<div className="header">
  <h3 className="mb-0">Liste de toutes les missions</h3>
  <Button className="float-right" onClick={onRefresh}>
    {/* <Tooltip label='refresh data ' fontSize='md'>
      <i className="fas fa-sync-alt" />
    </Tooltip> */}
  </Button>
  <Button className="float-right" onClick={onAddRequest}>
    Créer une mission
    <i className="ml-2 fas fa-arrow-right" />
  </Button>
  <Button className="float-right" onClick={() => onTabChange("partner")}>
    {/* <Tooltip label='By Partners' fontSize='md'>
      <i className="fas fa-users" />
    </Tooltip> */}
  </Button>
  <Button className="float-right" onClick={() => onTabChange("Admin")}>


  </Button>
</div>
);

export default Header;