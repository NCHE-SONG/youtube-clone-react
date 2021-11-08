import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId //App.js Route uri :  video/:videoId
    const [VideoDetail, setVideoDetail] = useState([])


    const variable = {videoId: videoId}

    useEffect(() =>{
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.videoDetail)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('Failed to get a video Info')
                }
            })
    }, [])

    if(VideoDetail.writer){
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem rem' }}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.url}`} controls />

                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
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

    return "loading..."



}

export default VideoDetailPage