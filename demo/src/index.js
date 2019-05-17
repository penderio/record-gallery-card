import React, { Component } from 'react'
import { render } from 'react-dom'
import sample from 'lodash/sample'
import { css, injectGlobal } from 'emotion'
import CheckboxField from '@pndr/checkbox-field'
import AttachmentField from '@pndr/attachment-field'
import LongTextField from '@pndr/long-text-field'
import SingleLineTextField from '@pndr/single-line-text-field'
import SingleSelectField from '@pndr/single-select-field'
import MultipleSelectField from '@pndr/multiple-select-field'
import NumberField from '@pndr/number-field'
import LinkToAnotherRecordField from '@pndr/link-to-another-record-field'
import RecordGalleryCard from '../../src'
import { Canvas, Heading, Paragraph, Box } from '@pndr/demo-utils'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        margin: 0;   
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

const generateAttachment = (i) => {

    const cat = sample(['wanderlust', 'water', 'canada', 'mountain', 'beach'])

    return {
        id: `att${i}`,
        typeId: 'image/jpeg',
        filename: `${cat} ${i}`,
        thumbnails: {
            small: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            medium: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            large: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
        },
        url: `https://source.unsplash.com/random/400x360?${cat}`
    }
}

const coverAttachments = [
    generateAttachment(1),
    generateAttachment(2),
    generateAttachment(3),
    generateAttachment(4),
    generateAttachment(5),
].map(attachment => attachment.thumbnails.medium.url)

const fieldRenderer = empty => ({ id, field, props }) => {

    const renderers = {
        singleLineText: ({ props, cell }) => (
            <SingleLineTextField
                {...props}
                text={empty ? null : cell.text}
            />
        ),
        longText: ({ props, cell }) => (
            <LongTextField
                {...props}
                longText={empty ? null : cell.longText}
            />
        ),
        checkbox: ({ props, cell }) => (
            <CheckboxField
                {...props}
                checked={cell.checked}
            />
        ),
        attachment: ({ props, cell }) => (
            <AttachmentField
                {...props}
                attachments={empty ? null : cell.attachments}
            />
        ),
        linkToAnotherRecord: ({ props, cell }) => (
            <LinkToAnotherRecordField
                {...props}
                recordCount={empty ? null : cell.records.length}
                recordGetter={({ index }) => {
                    return cell.records[index]
                }}
                recordRenderer={() => null}
            />
        ),
        multipleSelect: ({ props, field, cell }) => (
            <MultipleSelectField
                {...props}
                optionIds={empty ? null : cell.optionIds}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        singleSelect: ({ props, field, cell }) => (
            <SingleSelectField
                {...props}
                optionId={empty ? null : cell.optionId}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        number: ({ props, field, cell }) => (
            <NumberField
                {...props}
                number={empty ? null : cell.number}
                allowNegativeNumbers={field.options.allowNegativeNumbers}
                numberFormatId={field.options.numberFormatId}
                precisionId={field.options.precisionId}
            />
        )
    }

    const renderer = renderers[field.typeId]

    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }

    const cell = CELLS[field.id]

    return renderer({
        id,
        field,
        props,
        cell
    })
}

const FIELDS = [{
    id: 'fld1',
    name: 'Name',
    typeId: 'singleLineText'
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
        numberFormatId: 'decimal',
        allowNegativeNumbers: false,
        precisionId: '2'
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
        coloredOptions: true,
        optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
        options: [
            {
                id: 'opt1',
                colorId: 'blue.base',
                name: 'Blue'
            },
            {
                id: 'opt2',
                colorId: 'green.base',
                name: 'Green'
            },
            {
                id: 'opt3',
                colorId: 'red.base',
                name: 'Red'
            },
            {
                id: 'opt4',
                colorId: 'yellow.base',
                name: 'Yellow'
            },
            {
                id: 'opt5',
                colorId: 'indigo.base',
                name: 'Indigo'
            },
            {
                id: 'opt6',
                colorId: 'purple.base',
                name: 'Purple'
            }
        ]
    }
}, {
    id: 'fld7',
    name: 'Color',
    typeId: 'singleSelect',
    options: {
        coloredOptions: true,
        optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
        options: [
            {
                id: 'opt1',
                colorId: 'blue.base',
                name: 'Blue'
            },
            {
                id: 'opt2',
                colorId: 'green.base',
                name: 'Green'
            },
            {
                id: 'opt3',
                colorId: 'red.base',
                name: 'Red'
            },
            {
                id: 'opt4',
                colorId: 'yellow.base',
                name: 'Yellow'
            },
            {
                id: 'opt5',
                colorId: 'indigo.base',
                name: 'Indigo'
            },
            {
                id: 'opt6',
                colorId: 'purple.base',
                name: 'Purple'
            }
        ]
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
}]

const CELLS = {
    'fld1': {
        text: 'Luke Skywalker'
    },
    'fld2': {
        checked: true
    },
    'fld3': {
        attachments: [{
            id: 'att1',
            typeId: 'video/ogg',
            filename: 'Video',
            thumbnails: null,
            url: 'https://www.w3schools.com/html/mov_bbb.ogg'
        }, {
            id: 'att2',
            typeId: 'audio/mpeg',
            filename: 'Audio',
            thumbnails: null,
            url: 'https://dl.airtable.com/AILblIU3RJfJTtudwUE8_%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97'
        }, generateAttachment(3), {
            id: 'att4',
            typeId: 'image/gif',
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
        }]
    },
    'fld4': {
        number: 32.25
    },
    'fld5': {
        records: [{
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
        }]
    },
    'fld6': {
        optionIds: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6']
    },
    'fld7': {
        optionId: 'opt5'
    },
    'fld8': {
        longText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'fld9': {
        text: 'Greatest Jedi the galaxy has ever known.'
    },
    'fld10': {
        attachments: [
            generateAttachment(1),
            generateAttachment(2),
            generateAttachment(3),
            generateAttachment(4),
            generateAttachment(5),
        ]
    }
}


const fieldHeightGetter = ({ field }) => {

    const FIELD_HEIGHTS = {
        attachment: 30,
        autonumber: 22,
        checkbox: 22,
        multipleCollaborator: 22,
        collaborator: 22,
        createdCollaborator: 22,
        createdTime: 22,
        date: 22,
        linkToAnotherRecord: 22,
        longText: 78,
        multipleSelect: 22,
        number: 22,
        singleLineText: 22,
        singleSelect: 22,
        updatedTime: 22
    }

    return FIELD_HEIGHTS[field.typeId]
}

class Demo extends Component {
    render() {
        return <Canvas>
            <Heading>
                With cover and multiple fields
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        coverFitTypeId={'crop'}
                        coverAttachments={coverAttachments}
                        coverEnabled={true}
                        fields={FIELDS}
                        visibleFieldOrder={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9']}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                With cover and empty values
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        coverFitTypeId={'crop'}
                        coverAttachments={coverAttachments}
                        coverEnabled={true}
                        fields={FIELDS}
                        visibleFieldOrder={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9']}
                        fieldRenderer={fieldRenderer(true)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                Cover with no attachments
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        fields={FIELDS}
                        coverEnabled={true}
                        visibleFieldOrder={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9']}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                Cover with one attachment
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        coverFitTypeId={'crop'}
                        coverAttachments={[
                            coverAttachments[0]
                        ]}
                        coverEnabled={true}
                        fields={FIELDS}
                        visibleFieldOrder={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9']}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                Cover with fit type set to fit
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        coverFitTypeId={'fit'}
                        coverAttachments={coverAttachments}
                        coverEnabled={true}
                        fields={FIELDS}
                        visibleFieldOrder={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9']}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                Cover and no fields
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        coverFitTypeId={'crop'}
                        coverAttachments={coverAttachments}
                        coverEnabled={true}
                        fields={FIELDS}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
            <Heading>
                Without fields and without cover
            </Heading>
            <Box>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        id={'rec1'}
                        onClick={({ id }) => {
                            alert(`Clicked the record`)
                        }}
                        name={'Luke Skywalker'}
                        fields={FIELDS}
                        fieldRenderer={fieldRenderer(false)}
                        fieldHeightGetter={fieldHeightGetter}
                    />
                </div>
            </Box>
        </Canvas>
    }
}

render(<Demo />, document.querySelector('#demo'))
