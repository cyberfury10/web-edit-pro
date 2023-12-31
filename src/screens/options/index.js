import React, { useEffect, useState } from 'react';
import { Divider, Tooltip } from '@mui/material';
import Panel from './components/panel';
import FindAndReplaceRow from './components/find-and-replace-panel-row'
import UrlPanelRow from './components/url-panel-row'
import { FIND_AND_REPLACE_PANEL, URL_PANEL } from './constants';
import { saveExtensionData, getExtensionData } from "../../content/content";

function OptionsScreen(props) {
    const [websites, setWebsites] = useState([])
    const [findAndReplace, setFindAndReplace] = useState([])

    useEffect(() => {
        getExtensionData("websites", (data = []) => setWebsites(data))
        getExtensionData("findAndReplace", (data = []) => setFindAndReplace(data))

    }, [])

    const updateWebsites = (data, writeToStorage) => {
        setWebsites(data)
        if (writeToStorage) {
            saveExtensionData("websites", data)
        }
    }

    const updateFindAndReplaceList = (data, writeToStorage) => {
        setFindAndReplace(data)
        if (writeToStorage) {
            saveExtensionData("findAndReplace", data)
        }
    }

    const urlPanelProps = {
        widthClass: 'thirty-percent-width',
        headerClass: 'url-panel-header',
        titleComponent: <Tooltip title={<span>Add Websites below to perform find & replace only on those websites</span>}>
            <div className='header-title'>  Websites</div>
        </Tooltip>,
        noDataComponent: <div className='no-data'>
            <p>No entries present !</p>
            <p>Find & Replace will be applied on all websites. </p>
            <p>Click (+) to add websites, so that replace is performed only on them</p>
            <p>(or)</p>
            <p>Use "Bulk edit" under menu to add multi entries</p>
            <br/>
            <p>Note- Please enter the inputs using the correct cases, as the application is case-sensitive</p>
        </div>,
        newObject: {
            isEnabled: true,
            hostName: '',
        },
        type: URL_PANEL,

    }

    const findAndReplacePanelProps = {
        widthClass: 'hundred-percent-width',
        headerClass: 'find-replace-panel-header',
        titleComponent: <>
            <div className='header-title'> Find </div>
            <div className='header-title'> Replace </div>
        </>,
        noDataComponent: <div className='no-data'>
            <p>No entries present !</p>
            <p>Click (+) below to add some text</p>
            <p>(or)</p>
            <p>Use "Bulk edit" under menu to add multi entries</p>
            <br/>
            <p>Note- Please enter the inputs using the correct cases, as the application is case-sensitive</p>
        </div>,
        newObject: {
            isEnabled: true,
            find: '',
            replace: '',
        },
        type: FIND_AND_REPLACE_PANEL,
    }


    return (
        <>
            <div className='options-screen'>
                <Panel data={websites} setData={updateWebsites} Row={UrlPanelRow} extraProps={urlPanelProps} />
                <Divider className='divider' orientation="vertical" flexItem />
                <Panel data={findAndReplace} setData={updateFindAndReplaceList} Row={FindAndReplaceRow} extraProps={findAndReplacePanelProps} />
            </div>

        </>
    );
}

export default OptionsScreen;