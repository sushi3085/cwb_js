module.exports = {
    bubble : {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "hello"
                    },
                    {
                        "type": "text",
                        "text": "world"
                    }
                ]
            }
        }
    },

    massgg : {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "First bubble"
                            }
                        ]
                    }
                },
                {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Second bubble"
                            }
                        ]
                    }
                }
            ]
        }
    }
}