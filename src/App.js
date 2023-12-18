import { useState, useRef, useEffect } from 'react';
import Places from './Components/Places';
import { AVAILABLE_PLACES } from './data';
import DeleteConfirmation from './Components/DeleteConfirmation';
import Modal from './Components/Modal';
import { sortPlacesByDistance } from './loc';



function App() {
  const modal = useRef();
  let selectedPlace = "";
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const [locationPlaces, setLocationplaces] = useState([])

  function handelSelectedPlace(id) {
   

    let data = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    if (data.some((item) => item.id === id)) {
      localStorage.setItem('selectedPlaces', JSON.stringify(data))
    }
    else {
      let updatePlace = AVAILABLE_PLACES.find(item => item.id === id)

      localStorage.setItem('selectedPlaces', JSON.stringify([updatePlace, ...data]))
      

    }
   setSelectedPlaces(JSON.parse(localStorage.getItem('selectedPlaces')) || [])


  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedArray = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude)
      setLocationplaces(sortedArray)
    })
    setSelectedPlaces(JSON.parse(localStorage.getItem('selectedPlaces')) || [])

  }, [])

  

  function handelRemoveSelectedPlace(id) {
    modal.current.open();
    selectedPlace = id;

  }
  function handleStopRemovePlace() {
    modal.current.close();
  }
  function handleRemovePlace() {
    let data = JSON.parse(localStorage.getItem('selectedPlaces')).filter(item=>item.id!==selectedPlace);
    setSelectedPlaces(data)
    localStorage.setItem('selectedPlaces', JSON.stringify(data))
     modal.current.close();
  }
  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <Places heading="I'd like to visit ..." title="Select the places you would like to visit below." place={selectedPlaces} choosePlace={handelRemoveSelectedPlace} />
      <Places heading="Available Places" title="Sorting data according to you current location..." place={locationPlaces} choosePlace={handelSelectedPlace} />

    </>
  );
}

export default App;
