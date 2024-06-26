import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

const SortDropdown = ({ handleSort }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    handleSort(order);
  };

  return (
    <Dropdown style={{ textAlign: 'right'}}>
      <Dropdown.Toggle variant="info" id="dropdown-basic" style={{ marginBottom: '20px' }}>
        <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAmountDown : faSortAmountUp} /> Сортувати за:
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortOrderChange('asc')}>Ціною (за зростанням)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOrderChange('desc')}>Ціною (за спаданням)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOrderChange('asc')}>Датою (за зростанням)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOrderChange('desc')}>Датою (за спаданням)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
