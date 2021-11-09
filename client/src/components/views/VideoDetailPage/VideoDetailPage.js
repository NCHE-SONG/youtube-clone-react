import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import {useParams} from "react-router-dom";

function VideoDetailPage() {

    const params = useParams();
    const videoId = params.videoId //App.js Route uri :  video/:videoId
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() =>{
        Axios.post('/api/video/getVideoDetail', {videoId : videoId})
            .then(response => {
                if(response.data.success){
                    setVideoDetail(response.data.video)
                } else {
                    alert('Failed to get a video info')
                }
            })
    }, [])

    return (
        VideoDetail.writer ?
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem rem' }}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* Comments */}

                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo videoId={videoId} />
                </Col>
            </Row>
            : <div>"loading..."</div>
    )

}

export default VideoDetailPage