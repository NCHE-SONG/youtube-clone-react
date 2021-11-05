import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <Title level={2}> Recommended </Title>
            <br />
            <Row gutter={[32, 16]}>

                {renderCards}

            </Row>

        </div>
    )
}

export default LandingPage
