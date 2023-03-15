import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { FaFilm, FaSearch } from 'react-icons/fa'
import { GiSpaceship } from 'react-icons/gi'
import { RiCarWashingFill } from 'react-icons/ri'
import { SiPlanetscale } from 'react-icons/si'

import './Home.css';
import Loader from '../../components/Loader/Loader';

const HomePage = ({ peopleData }) => {
    
    const [search, setSearch] = useState('');

    const [peopleData2, setPeopleData2] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await axios.get(`https://swapi.dev/api/people/?search=${search}`)
            .then((response) => {
                var peopleCopy = response.data.results;
                let promises = [];
                for (let person of peopleCopy) {
                    promises.push(

                        axios.get(person.homeworld)
                            .then((response) => {
                                person.homeworld = response.data.name;
                            }),

                        person.species.length > 0 ?
                            axios.get(person.species[0])
                                .then((response) => {
                                    person.species = response.data.name;
                                })
                            : person.species = 'Human'
                    )
                }
                Promise.all(promises).then(() => { setPeopleData2(peopleCopy) });
            })
            .catch((error) => {
                alert('error loading data')
            })
    }

    useEffect(() => {
        setLoading(true);
      
        const currentPage = localStorage.getItem('currentPage') || 1;
      
        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
          .then((response) => {
            setPeopleData2(response.data.results);
            setLoading(false);
          })
          .catch((error) => {
            alert('You Are Offline');
          });
      }, []);
      
      
      useEffect(() => {
        setPeopleData2(peopleData);
      }, [peopleData]);
      

    const [loading, setLoading] = useState(true);


    return (
        <div style={{ marginBottom: '80px' }}>
            <p className='homepage-text'>All Cards / <span className='header-text-span'>Select a card</span></p>

            <div className='main-search-box'>
                <form onSubmit={handleSearch}>
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                        <FaSearch className='search-icon' onClick={handleSearch} />
                    </div>
                </form>
            </div>

            <div className='back-cards'>
                {loading ? ( 
                <Loader /> 
                 ) : (
                    <>
                <div className='main-card-box'>

                    {peopleData2.length > 0 ?
                        peopleData2.map((person) => (
                            <li key={person.name} style={{ listStyleType: "none" }}>
                                <div className='card-box'>

                                    <div className='card-header'>
                                        <Link className='card-header-link' to={`/${person.name}`}>
                                            <p className='card-name-text'>{person.name}</p>
                                        </Link>
                                    </div>

                                    <div className='card-info'>

                                        <div className='card-info-header'>
                                        </div>

                                        <div className='card-info-main'>
                                            <div className='info-box'>
                                                <p className='info-header-text'><SiPlanetscale className='card-page-icon' />HOMEWORLD</p>
                                                <p className='info-value-text'>{person.homeworld}</p>
                                            </div>

                                            <div className='info-box'>
                                                <p className='info-header-text'><RiCarWashingFill className='info-box-Vehicles-icon' />VEHICLES</p>
                                                <p className='info-value-text'>{person.vehicles.length}</p>
                                            </div>

                                            <div className='info-box'>
                                                <p className='info-header-text'><GiSpaceship className='card-page-icon' />STARSHIPS</p>
                                                <p className='info-value-text'>{person.starships.length}</p>
                                            </div>

                                            <div className='info-box'>
                                                <p className='info-header-text'><FaFilm className='info-box-film-icon' />FILMS</p>
                                                <p className='info-value-text'>{person.films.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) :
                        <></>
                    }
                </div>
    </>)}
            </div>
        </div>
    )
}

export default HomePage