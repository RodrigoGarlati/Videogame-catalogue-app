import React from "react";
import './Card.css'

const altImgUrl = "https://cdn.shopify.com/s/files/1/0396/8794/6394/products/Purple_7ed3f1c3-d059-4818-b149-846368ed9984_800x.png?v=1598832362"

export default function Card(props){
    return(
        <div className="card">
            <div className="card-text">
                <h3 className="card-title">{props.title}</h3>
                <div className="card-info">
                    <label className="info-label">{props.infoTitle}</label>
                    <span className="info-text">{props.info}</span>
                </div>
            </div>
            <img src={props.image || altImgUrl} alt={'game image'} className="card-image"></img>
        </div>
    )
}