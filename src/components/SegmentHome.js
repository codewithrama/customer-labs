import React, { useState } from 'react';
import '../styles/SegmentHome.css';
import icon from '../images/back.png';
import greenradio from '../images/radio button -green.png';
import redradio from '../images/radio button -red.png';
import remove from '../images/remove.png';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const GreenHeaderPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState('');

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleAddSchema = () => {
    if (selectedOption && !selectedSchemas.includes(selectedOption)) {
      setSelectedSchemas((prevSchemas) => [...prevSchemas, selectedOption]);
      setSelectedOption('');
    }
  };

  const handleRemoveSchema = (schemaToRemove) => {
    setSelectedSchemas((prevSchemas) =>
      prevSchemas.filter((schema) => schema !== schemaToRemove)
    );
  };

  const handleDropdownChange = (event, schema) => {
    const updatedSchemas = selectedSchemas.map((item) =>
      item === schema ? event.target.value : item
    );
    setSelectedSchemas(updatedSchemas);
  };

  const createPayload = () => {
    return {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema]: schemaOptions.find((option) => option.value === schema)?.label })),
    };
  };

  const handleSaveSegment = () => {
    const payload = createPayload();
    webApi(payload);
  };

  const webApi = (payload) => {
    const apiUrl = 'https://webhook.site/dc535a79-f6ee-419e-86ef-0d1511a579cc';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <header className='header'>
        <h3>
          <img src={icon} alt='Back' className='img' />
          View Audience{' '}
        </h3>
      </header>

      <main className='main'>
        <button className='save' onClick={handleButtonClick}>
          Save Segment
        </button>
      </main>

      {isPopupOpen && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <header className='header'>
              <h3>
                <button className='closeicon' onClick={handlePopupClose}>
                  <img src={icon} alt='Back' className='img' />
                </button>
                Saving Segment
              </h3>
            </header>

            <main className='main'>
              <p>Enter the name of your Segment</p>
              <input
                type='text'
                className='input'
                placeholder='Name of the Segment'
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />

              <p>To save your segment, you need to add the schemas to build a query</p>

              <div className='selectedfields'>
                {selectedSchemas.map((schema) => (
                  <div key={schema} className='selected-field'>
                    <select
                      value={schema}
                      onChange={(e) => handleDropdownChange(e, schema)}
                    >
                      {schemaOptions
                        .filter((option) => !selectedSchemas.includes(option.value) || option.value === schema)
                        .map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>

                    <button
                      className='remove'
                      onClick={() => handleRemoveSchema(schema)}
                    >
                      <img src={remove} alt='remove' className='removeicon' />
                    </button>
                  </div>
                ))}
              </div>

              <label htmlFor='schemaDropdown'>Add schema to segment:</label>
              <select
                id='schemaDropdown'
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value=''>Select an option</option>
                {schemaOptions
                  .filter((option) => !selectedSchemas.includes(option.value))
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>

              <button
                className='add'
                onClick={() => {
                  handleAddSchema();
                }}
              >
                + Add new schema
              </button>
            </main>

            <footer className='footer'>
              <button className='segment' onClick={handleSaveSegment}>
                Save the Segment
              </button>
              <button className='cancel' onClick={handlePopupClose}>
                cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHeaderPage;
