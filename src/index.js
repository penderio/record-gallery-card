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
import SingleSelectField from '@cmds/single-select-field'
import LongTextField from '@cmds/long-text-field'

const fieldTypes = {
    longText: LongTextField,
    singleSelect: SingleSelectField,
    multipleSelect: MultipleSelectField,
    linkToAnotherRecord: LinkToAnotherRecordField,
    checkbox: CheckboxField,
    singleLineText: SingleLineTextField,
    number: NumberField,
    attachment: AttachmentField
}

const valueParsers = {
    longText: value => ({
        value
    }),
    singleSelect: value => ({
        optionId: value
    }),
    multipleSelect: value => ({
        optionIds: value
    }),
    checkbox: value => ({
        value
    }),
    singleLineText: value => ({
        value
    }),
    attachment: value => ({
        attachments: value
    }),
    linkToAnotherRecord: value => ({
        records: value
    }),
    number: value => ({
        value
    })
}

const heights = {
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

export default class RecordGalleryCard extends React.Component {

    render() {

        const {primaryFieldId, valueGetter, coverFieldId, fieldConfig, fields = []} = this.props

        const fieldsById = fieldConfig.reduce((result, field) => {
            result[field.id] = field
            return result
        }, {})

        const name = valueGetter({fieldId: primaryFieldId})
        const coverFieldCell = valueGetter({fieldId: coverFieldId})

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
                {coverFieldCell ? (
                    <CoverField
                        attachments={coverFieldCell}
                    />
                ) : null}
                <RecordTitle>
                    {name}
                </RecordTitle>
                {fields.map(id => {

                    const field = fieldsById[id]

                    if (!field) {
                        throw new Error(`Field with id ${id} not found`)
                    }

                    const Field = fieldTypes[field.typeId]
                    const valueParser = valueParsers[field.typeId]
                    const height = heights[field.typeId]
                    const value = valueGetter({fieldId: field.id})

                    const props = valueParser(value)

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
                            <div
                                style={{
                                    height
                                }}
                            >
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
                })}
            </div>
        )
    }
}