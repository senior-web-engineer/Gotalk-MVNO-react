import './down-header.scss';
import React from "react";
import { useSelector } from 'react-redux';

export default function DownHeader({addClass}) {
    const generalSettings = useSelector(state => state.generalSettingsReducer.generalSettings);
    if(!generalSettings?.showTopSlogan) {
        return null;
    }

    return (
        <div className={`down-header ${addClass}`}>
            <div className="down-header-block" dangerouslySetInnerHTML={{
                __html: generalSettings.topSlogan
            }} />
        </div>
    );
}
