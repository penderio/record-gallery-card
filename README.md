# RecordGalleryCard

[![npm package][npm-badge]][npm]

Used for displaying a record as a gallery card.	

## Getting started

````
npm install @cmds/record-gallery-card --save
````

### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| id | String | ✓ | Unique id for the instance of this record |
| name | String | ✓ | Name for the record |
| coverAttachments | Array | | Each attachment be displayed in a the card's cover as a carousel |
| coverFitTypeId | CoverFitType | | Either `crop` or `fit`. The images inside the cover will be either covered or contained, respectively |
| coverEnabled | Boolean | ✓ | Whether the cover should be displayed or not |
| fields | Array | ✓ | Single line of text to be displayed / edited |
| visibleFieldOrder | Array | ✓ | A list of ids for the fields that need to be displayed and in which order |
| fieldHeightGetter | Function | ✓ | Responsible for returning the height for the field |
| fieldRenderer | Function | ✓ | Responsible for rendering a field given it's configuration: `({recordId: string, index: number, field: object}): jsx` [Learn more](#fieldRenderer) |

#### fieldRenderer

Responsible for rendering a field given it's configuration.

```jsx harmony
import SingleLineTextField from '@cmds/single-line-text-field'
// import all other fields that need to be supported...

const renderers = {
    singleLineText: ({props}) => (
        <SingleLineTextField
            {...props}
            text={'Luke Skywalker'}
            onChange={({id, text}) => {
                
                // store new value
            }}
        />
    ),
    // and all other fields that need to be supported
}

function fieldRenderer({id, index, field, props}) {

    const renderer = renderers[field.typeId]
    
    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }
    
    /**
     * Note — props already contains properties
     * related to the context in which the field
     * gets rendered.
     * 
     * {
     *      id: 'fld1', // the field's id
     *      contextId: 'recordGalleryCard',
     *      roleId: 'readOnly'
     * }
     */
    
    return renderer({ 
        id, 
        field,
        props
    })
}
```

### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/record-gallery-card.svg
[npm]: https://www.npmjs.org/package/@cmds/record-gallery-card
