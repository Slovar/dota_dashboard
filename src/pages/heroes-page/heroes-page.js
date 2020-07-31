import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchHeroes} from "../../store/action-creators";

import HeroGrid from "../../components/hero-components/hero-grid";
import Loading from "../../components/loading";
import Breadcrumbs from "../../components/breadcrumbs";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import PropTypes from 'prop-types';

import "./heroes-page.css"


const HeroesPage = ({heroes, loading, error}) => {

    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Heroes",
                    isActive: true
                },
            ]}/>
            {loading ? <Loading/> : <HeroGrid heroes={heroes}/>}
        </div>
    );
}

HeroesPage.propTypes = {
    heroes: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
}


/**
 * Wrapper for HeroPage component
 */
const HeroPageContainer = () => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const heroes = useSelector(state => state.heroes);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    useEffect(() => fetchHeroes(openDotaService, dispatch), []);

    return (
        <HeroesPage
            heroes={heroes}
            error={error || null}
            loading={loading}
        />
    );
}


export default HeroPageContainer;