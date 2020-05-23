import React, { useState } from "react";
import { CustomDropdown } from "../../shared/Dropdown/dropdown";
import { CustomCard } from "../../shared/Cards/Cards";
import Carpintero from "../../assets/img/carpintero.png";
import Pintor from "../../assets/img/pintor.png";
import Cerrajero from "../../assets/img/cerrajero.png";
import "./Catalogo.css";

const types = {
    Carpintero: 'Tablas',
    Pintor: 'Pinturas',
    Cerrajero: 'Llaves'
};

export const Catalogo = () =>{
    const [valueDropdown, setValueDropdown] = useState("");
    const [listOfPeople, setListOfPeople] =  useState([]);
    
    /*let useEffect = (() => {
         /**
          * Se hace el fetch donde guardare los usuarios por tipo: carpintero, pintor....
          * Se asegura que la data este formada 
          */
       // return () => {
        
         //   cleanup
        //}
    //}, [input])
    
    const selectedOption = (x) => {
        setValueDropdown(x);
    }

    const fetchPeople = () => {
        // fetch /valueDropDown
        // setListOfPeople(result)
        // types[valueDropdown]
    }

    return(
        <div className="grid-container">
            <div className="grid-item-header">
                <CustomDropdown 
                    id={"catalogoDropdown"} 
                    variant={"success"} 
                    placeHolder={"Buscar..."} 
                    items={["Carpintero", "Pintor", "Cerrajero"]}
                    className={"justify-content-center"}
                    handleFunction={selectedOption}
                    value={valueDropdown}
                />
            </div>
            {/* and lo tomo como un entonces */}
            {valueDropdown === 'Carpintero' && (
                <>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Carpintero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Carpintero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Carpintero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Carpintero}/></div>
                </>
            )}
            {valueDropdown === 'Pintor' && (
                <>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Pintor}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Pintor}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Pintor}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Pintor}/></div>
                </>
            )}
            {valueDropdown === 'Cerrajero' && (
                <>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Cerrajero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Cerrajero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Cerrajero}/></div>
                    <div className="grid-item"><CustomCard servicios={["24hrs, Urgencias"]} foto={Cerrajero}/></div>
                </>
            )}
            
            {/* listOfPeople.map(<div>) */}
        </div>
    )
}

/*
    1. Hacerlo un hook o un class based component
    2. Si aqui se hace el fetch a la base de datos, entonce
        crear un variable de estaod que guarde las personas 
    3. iterar sobre personas y crear un grid-item conteniendo <CustomCard>
        Por cada CustomCard le pasas la prop adecuada
*/