import React, { useLayoutEffect, useEffect } from 'react'
import { Panel, Button } from 'appkit-react'
import BasicChartA from './BasicChartA'
import './BasicPanel.css'


function BasicPanel() {
    return (
        <Panel
            title="Header"
            className="a-increase-child-color-level-by-1"
            renderRight={() => {
                return (
                    <React.Fragment>
                        <Button size="sm" gray style={{ display: "inline-block" }}>  GRAY </Button>
                    </React.Fragment>
                );
            }}
        >
            <BasicChartA></BasicChartA>
        </Panel>
    )
}

export default BasicPanel

