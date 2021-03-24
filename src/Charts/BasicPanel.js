import React, { useLayoutEffect, useEffect } from 'react'
import { Panel, Button } from 'appkit-react'
import BasicChartA from './BasicChartA'
import './BasicPanel.css'


function BasicPanel(props) {

    console.log('BasicPanel',props)

    return (
        <Panel
            title="Header"
            id={props.id}
            className="basic-panel"
            renderRight={() => {
                return (
                    <React.Fragment>
                        <Button size="sm" gray style={{ display: "inline-block" }}>  GRAY </Button>
                    </React.Fragment>
                );
            }}
        >
            {props.children}
        </Panel>
    )
}

export default BasicPanel

