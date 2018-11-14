import React, {Component} from 'react'
import {render} from 'react-dom'
import {css, injectGlobal} from 'emotion'

import RecordGalleryCard from '../../src'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
`

const log = (name) => (args) => {
    alert(`
name: ${name}
see logs for more info
    `)
    console.log({
        name,
        args
    })
}


const COVER_FIELD_VALUE = [{
    id: 'att1',
    mimeType: 'image/jpeg',
    filename: `Image`,
    thumbnails: {
        small: {
            url: 'https://placekitten.com/400/360?id=1'
        },
        medium: {
            url: 'https://placekitten.com/400/360?id=1'
        },
        large: {
            url: 'https://placekitten.com/400/360?id=1'
        },
    },
    url: 'https://placekitten.com/400/360?id=1'
}, {
    id: 'att2',
    mimeType: 'image/jpeg',
    filename: `Image`,
    thumbnails: {
        small: {
            url: 'https://placekitten.com/400/360?id=2'
        },
        medium: {
            url: 'https://placekitten.com/400/360?id=2'
        },
        large: {
            url: 'https://placekitten.com/400/360?id=2'
        },
    },
    url: 'https://placekitten.com/400/360?id=2'
}, {
    id: 'att3',
    mimeType: 'image/jpeg',
    filename: `Image`,
    thumbnails: {
        small: {
            url: 'https://placekitten.com/400/360?id=3'
        },
        medium: {
            url: 'https://placekitten.com/400/360?id=3'
        },
        large: {
            url: 'https://placekitten.com/400/360?id=3'
        },
    },
    url: 'https://placekitten.com/400/360?id=3'
}, {
    id: 'att4',
    mimeType: 'image/jpeg',
    filename: `Image`,
    thumbnails: {
        small: {
            url: 'https://placekitten.com/400/360?id=4'
        },
        medium: {
            url: 'https://placekitten.com/400/360?id=4'
        },
        large: {
            url: 'https://placekitten.com/400/360?id=4'
        },
    },
    url: 'https://placekitten.com/400/360?id=4'
}, {
    id: 'att5',
    mimeType: 'image/jpeg',
    filename: `Image`,
    thumbnails: {
        small: {
            url: 'https://placekitten.com/400/360?id=5'
        },
        medium: {
            url: 'https://placekitten.com/400/360?id=5'
        },
        large: {
            url: 'https://placekitten.com/400/360?id=5'
        },
    },
    url: 'https://placekitten.com/400/360?id=5'
}]

class Viewport extends React.Component {

    render() {

        return (
            <div
                className={css`
                    background-color: #e9ebee;
                    padding: 20px;
                `}
            >
                {this.props.children}
            </div>
        )
    }
}

class Demo extends Component {
    render() {
        return <div>
            <h1>RecordGalleryCard Demo</h1>
            <h3>
                No fields & no cover field
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        primaryFieldId={'fld1'}
                        coverFieldId={null}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}

                    />
                </div>
            </Viewport>
            <h3>
                Cover field & no fields
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        coverFieldId={'fld2'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}
                    />
                </div>
            </Viewport>
            <h3>
                All fields
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        coverFieldId={'fld10'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText',
                            options: {
                                defaultValue: null
                            }
                        }, {
                            id: 'fld2',
                            name: 'Published',
                            typeId: 'checkbox'
                        }, {
                            id: 'fld3',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }, {
                            id: 'fld4',
                            name: 'Revenue',
                            typeId: 'number',
                            options: {
                                numberFormat: 'decimal',
                                allowNegativeNumbers: false,
                                precision: 2
                            }
                        }, {
                            id: 'fld5',
                            name: 'Squad',
                            typeId: 'linkToAnotherRecord'
                        }, {
                            id: 'fld6',
                            name: 'Colors',
                            typeId: 'multipleSelect',
                            options: {
                                options: [{
                                    id: 'opt1',
                                    colorId: 'blue.base',
                                    name: 'Blue'
                                }, {
                                    id: 'opt2',
                                    colorId: 'green.base',
                                    name: 'Green'
                                }, {
                                    id: 'opt3',
                                    colorId: 'red.base',
                                    name: 'Red'
                                }, {
                                    id: 'opt4',
                                    colorId: 'yellow.base',
                                    name: 'Yellow'
                                }, {
                                    id: 'opt5',
                                    colorId: 'indigo.base',
                                    name: 'Indigo'
                                }, {
                                    id: 'opt6',
                                    colorId: 'purple.base',
                                    name: 'Purple'
                                }]
                            }
                        }, {
                            id: 'fld7',
                            name: 'Color',
                            typeId: 'singleSelect',
                            options: {
                                options: [{
                                    id: 'opt1',
                                    colorId: 'blue.base',
                                    name: 'Blue'
                                }, {
                                    id: 'opt2',
                                    colorId: 'green.base',
                                    name: 'Green'
                                }, {
                                    id: 'opt3',
                                    colorId: 'red.base',
                                    name: 'Red'
                                }, {
                                    id: 'opt4',
                                    colorId: 'yellow.base',
                                    name: 'Yellow'
                                }, {
                                    id: 'opt5',
                                    colorId: 'indigo.base',
                                    name: 'Indigo'
                                }, {
                                    id: 'opt6',
                                    colorId: 'purple.base',
                                    name: 'Purple'
                                }]
                            }
                        }, {
                            id: 'fld8',
                            name: 'Notes',
                            typeId: 'longText'
                        }, {
                            id: 'fld9',
                            name: 'Description',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld10',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        fieldVisibility={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9', 'fld10']}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                'fld1': 'Luke Skywalker',
                                'fld2': true,
                                'fld3': [{
                                    id: '1',
                                    mimeType: 'video/ogg',
                                    filename: 'Video',
                                    thumbnails: null,
                                    url: 'https://www.w3schools.com/html/mov_bbb.ogg'
                                }, {
                                    id: '2',
                                    mimeType: 'audio/mpeg',
                                    filename: 'Audio',
                                    thumbnails: null,
                                    url: 'https://dl.airtable.com/AILblIU3RJfJTtudwUE8_%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97'
                                }, {
                                    id: '3',
                                    mimeType: 'image/jpeg',
                                    filename: `Image`,
                                    thumbnails: {
                                        small: {
                                            url: 'https://placekitten.com/200/300'
                                        },
                                        medium: {
                                            url: 'https://placekitten.com/200/300'
                                        },
                                        large: {
                                            url: 'https://placekitten.com/200/300'
                                        },
                                    },
                                    url: 'https://placekitten.com/200/300'
                                }, {
                                    id: '4',
                                    mimeType: 'image/gif',
                                    filename: 'GIF',
                                    thumbnails: {
                                        small: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                        medium: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                        large: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                    },
                                    url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                }],
                                'fld4': 32.25,
                                'fld5': [{
                                    id: 'rec1',
                                    name: 'Luke Skywalker'
                                }, {
                                    id: 'rec2',
                                    name: 'Leia Organa'
                                }, {
                                    id: 'rec3',
                                    name: 'Han Solo'
                                }, {
                                    id: 'rec4',
                                    name: 'Jar Jar Binks'
                                }],
                                'fld6': ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
                                'fld7': 'opt5',
                                'fld8': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                                'fld9': 'Greatest Jedi the galaxy has ever known.',
                                'fld10': COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}
                    />
                </div>
            </Viewport>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
