import React from 'react'
import {Row, Col, List} from 'antd'
import Axios from 'axios'
import {response} from "express";
function VideoDetailPage() {

    useEffect(() =>{
        const videoId = props.match.params.videoId //App.js Route uri :  video/:videoId
        const variable = {videoId: videoId}
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){

                } else {
                    alert('Failed to get a video data')
                }
            })
    }, [input])

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding: '3rem rem' }}>
                    <video style={{width: '100%'}} src controls />

                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar
                            title
                            description
                            />
                    </List.Item>

                    {/* */}

                </div>

            </Col>
            <Col lg={6} xs={24}>
                Side Videos
            </Col>
        </Row>
    )
}

export default VideoDetailPage