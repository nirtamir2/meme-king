import React from 'react';

export default () => (
    <div className="box-generator-skeleton col-lg-5 col-xs-12">
        <div className="flex space-between btns-wrapper visible-mobile-flex">
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />

        </div>
        <div className="meme-text-fields-container">
            <div className=" meme-text-field">
                <div className="item input-field"/>
                <div className="item buttons-field"/>
            </div>

            <div className="meme-text-field">
                <div className=" item input-field"/>
                <div className="item buttons-field"/>
            </div>
        </div>

        <div className="hidden-mobile">
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
            <div className="item generator-btn-field" />
        </div>


    </div>
)