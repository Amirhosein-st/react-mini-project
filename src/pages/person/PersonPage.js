import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { GiHumanTarget, GiWeight, GiHairStrands, GiSpaceship } from "react-icons/gi";
import { SiCmake, SiPlanetscale } from "react-icons/si";
import { FcEditImage, FcAddImage } from "react-icons/fc";
import { RiCarWashingFill } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaTransgenderAlt, FaTextHeight, FaChild, FaEye, FaFilm } from 'react-icons/fa'

import './PersonPage.css';
import Loader from '../../components/Loader/Loader';

const CardPage = ({ peopleData }) => {

    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person) => person.name === decodeURI(cardId));

    const getVehicles = useCallback(async () => {
        let promises = [];
        let vehicles = [];
        if (specificCard) {
            for (let vehicle of specificCard.vehicles) {
                promises.push(
                    await axios.get(vehicle)
                        .then((response) => {
                            vehicles.push(`Name: ${response.data.name} / Max Speed: ${response.data.max_atmosphering_speed} Km/h`);
                        })
                )
            }
            Promise.all(promises).then(() => setVehicles(vehicles))
        }
    }, [specificCard])

    const getStarships = useCallback(async () => {
        let promises = [];
        let starships = [];
        if (specificCard) {
            for (let starship of specificCard.starships) {
                promises.push(
                    await axios.get(starship)
                        .then((response) => {
                            starships.push(`Name: ${response.data.name} / Length: ${response.data.length} m`);
                        })
                )
            }
            Promise.all(promises).then(() => setStarships(starships))
        }
    }, [specificCard])

    const getFilms = useCallback(async () => {
        let promises = [];
        let films = [];
        if (specificCard) {
            for (let film of specificCard.films) {
                promises.push(
                    await axios.get(film)
                        .then((response) => {
                            films.push(`Name: ${response.data.title} / Director: ${response.data.director} / ${response.data.release_date}`);
                        })
                )
            }
            Promise.all(promises).then(() => setFilms(films))
        }
    }, [specificCard])

    useEffect(() => {
        getVehicles();
        getStarships();
        getFilms();
    }, [peopleData, getVehicles, getStarships, getFilms])

    useEffect(() => {
        setLoading(true);

        Promise.all([getVehicles(), getStarships(), getFilms()]).then(() =>
            setLoading(false)
        );
    }, [peopleData, getVehicles, getStarships, getFilms]);


    return (
        <div className='back-card-page'>
            {loading ? (
            <Loader /> 
            ) : (
                <>
            {specificCard ?
                <>
                    <p className='homepage-text'><Link className='homepage-text-card-page' to="/">All Cards</Link> / <span className='header-text-span-card-page'>{specificCard.name} Details</span></p>

                    <div className='card-box-individual'>
                        <div className='card-header-2'>
                            <p className='card-name-text'>{specificCard.name}</p>
                        </div>
                        <div className='card-info card-info-2'>

                            <div className='card-info-main'>

                                <div className='card-info-main-back'>

                                    <div className='card-info-main-left'>
                                        <h4 className='info-box-individual-3'>Personal information</h4>

                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><GiHumanTarget className='card-page-icon' />species</p>
                                            <p className='info-value-text'>{specificCard.species}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><SiCmake className='card-page-icon' />Birth Year</p>
                                            <p className='info-value-text'>{specificCard.birth_year}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><FaTransgenderAlt className='card-page-icon' />gender</p>
                                            <p className='info-value-text'>{specificCard.gender}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><SiPlanetscale className='card-page-icon' />planet</p>
                                            <p className='info-value-text'>{specificCard.homeworld}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><FaTextHeight className='card-page-icon' />HEIGHT</p>
                                            <p className='info-value-text'>{specificCard.height} cm</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><GiWeight className='card-page-icon' />WEIGHT</p>
                                            <p className='info-value-text'>{specificCard.mass} Kg</p>
                                        </div>

                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><GiHairStrands className='card-page-icon' />Hair Color</p>
                                            <p className='info-value-text'>{specificCard.hair_color}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><FaChild className='card-page-icon' />Skin Color</p>
                                            <p className='info-value-text'>{specificCard.skin_color}</p>
                                        </div>
                                        <div className='info-box-individual-2'>
                                            <p className='info-header-text'><FaEye className='card-page-icon' />eye color</p>
                                            <p className='info-value-text'>{specificCard.eye_color}</p>
                                        </div>
                                    </div>

                                    <div className='card-info-main-right'>

                                        <h4 className='info-box-individual-3'>VEHICLES <AiOutlineArrowRight /> {specificCard.vehicles.length}</h4>
                                        {specificCard.vehicles.length > 0 ?

                                            vehicles.map((vehicle) => (
                                                <div className='info-box-individual-2' key={vehicle}>
                                                    <p className='info-header-text'><RiCarWashingFill className='info-box-Vehicles-icon' />VEHICLE</p>
                                                    <p className='info-value-text-2'>{vehicle}</p>
                                                </div>

                                            ))
                                            :
                                            <div className='info-box-individual-2'>
                                                <p className='info-header-text'><RiCarWashingFill className='info-box-Vehicles-icon' />VEHICLE</p>
                                                <p className='info-value-text-2'>None</p>
                                            </div>
                                        }
                                        <br></br>

                                        <h4 className='info-box-individual-3'>STARSHIPS <AiOutlineArrowRight /> {specificCard.starships.length}</h4>
                                        {specificCard.starships.length > 0 ?
                                            starships.map((starship) => (
                                                <div className='info-box-individual-2' key={starship}>
                                                    <p className='info-header-text'><GiSpaceship className='card-page-icon' />STARSHIP</p>
                                                    <p className='info-value-text-2'>{starship}</p>
                                                </div>
                                            ))
                                            :
                                            <div className='info-box-individual-2'>
                                                <p className='info-header-text'><GiSpaceship className='card-page-icon' />STARSHIP</p>
                                                <p className='info-value-text-2'>None</p>
                                            </div>
                                        }
                                        <br></br>

                                        <h4 className='info-box-individual-3'>FILMS <AiOutlineArrowRight /> {specificCard.films.length}</h4>
                                        {specificCard.films.length > 0 ?
                                            films.map((film) => (
                                                <div className='info-box-individual-2' key={film}>
                                                    <p className='info-header-text'><FaFilm className='info-box-film-icon' />FILM</p>
                                                    <p className='info-value-text-2'>{film}</p>
                                                </div>
                                            ))
                                            :
                                            <div className='info-box-individual-2'>
                                                <p className='info-header-text'><FaFilm className='info-box-film-icon' />FILM</p>
                                                <p className='info-value-text'>None</p>
                                            </div>
                                        }
                                    </div>

                                </div>
                                <br></br>
                                <h4 className='info-box-individual' style={{ margin: '0', backgroundColor: ' #00a6ff2d' }}>DATE</h4>
                                <div className='info-box-individual'>
                                    <p className='info-header-text'><FcAddImage className='card-page-icon' />created</p>
                                    <p className='info-value-text'>{specificCard.created}</p>
                                </div>
                                <div className='info-box-individual'>
                                    <p className='info-header-text'><FcEditImage className='card-page-icon' />edited</p>
                                    <p className='info-value-text'>{specificCard.edited}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='span'>Amir-Hosein Safari</p>
                </> :
                <></>
            }
            </>
         )}
        </div >
    )
}

export default CardPage