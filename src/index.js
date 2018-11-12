import React from 'react'
import {css} from 'emotion'
import CoverField from './CoverField'
import RecordTitle from './RecordTitle'
import LinkToAnotherRecordField from '@cmds/link-to-another-record-field'
import NumberField from '@cmds/number-field'
import CheckboxField from '@cmds/checkbox-field'
import SingleLineTextField from '@cmds/single-line-text-field'
import AttachmentField from '@cmds/attachment-field'
import MultipleSelectField from '@cmds/multiple-select-field'

const fieldTypes = {
    multipleSelect: MultipleSelectField,
    linkToAnotherRecord: LinkToAnotherRecordField,
    checkbox: CheckboxField,
    singleLineText: SingleLineTextField,
    number: NumberField,
    attachment: AttachmentField
}

const connectors = {
    multipleSelect: value => value,
    checkbox: ({checked}) => ({
        value: checked
    }),
    singleLineText: ({text}) => ({
        value: text
    }),
    attachment: value => value,
    linkToAnotherRecord: value => value,
    number: ({number}) => ({
        value: number
    })
}

export default class RecordGalleryCard extends React.Component {

    render() {

        const {enableCoverField, fields} = this.props

        return (
            <div
                className={css`
                    background-color: #fff;
                    user-select: none;
                    width: 100%;
                    cursor: pointer;
                    border-radius: 6px;
                    box-shadow: 0 0 0 1px rgba(114,121,133,.3);
                    overflow: hidden;
                    padding-bottom: 10px;
                `}
            >
                {enableCoverField ? (
                    <CoverField
                        attachments={[
                            'https://placekitten.com/400/360?id=5',
                            'https://placekitten.com/400/360?id=4',
                            'https://placekitten.com/400/360?id=3',
                            'https://placekitten.com/400/360?id=2',
                            'https://placekitten.com/400/360?id=1'
                        ]}
                    />
                ) : null}
                <RecordTitle>
                    Record A
                </RecordTitle>
                {fields && fields.length ? fields.map(field => {

                    const Field = fieldTypes[field.typeId]
                    const connector = connectors[field.typeId]
                    const value = this.props.getValue({
                        fieldId: field.id
                    })

                    const props = connector(value)

                    return (
                        <div
                            key={field.id}
                            className={css`
                                padding-left: 16px;
                                padding-right: 16px;
                                padding-top: 8px;
                                padding-bottom: 4px;
                            `}
                        >
                            <div
                                className={css`
                                    margin-bottom: 4px;
                                    display: flex;
                                    align-items: center;
                                    color: #000;
                                `}
                            >
                                <div
                                    className={css`
                                        flex: 1 1 auto;
                                        min-width: 0;
                                        min-height: 0;
                                        font-weight: 600;
                                        max-width: 100%;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        font-size: 12px;
                                    `}
                                >
                                    {field.name}
                                </div>
                            </div>
                            <div>
                                <Field
                                    id={field.id}
                                    contextId={'recordGalleryCard'}
                                    roleId={'readOnly'}
                                    options={field.options}
                                    {...props}
                                />
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        )
    }
}